import { Contract, providers, utils } from "ethers";
import toast from "react-hot-toast";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "./firebase";
import { addOwnerToCollections } from "./helpers";

import { RPC_NETWORK_URLS } from "./connectors";
import { nusicABI, nusicAddress } from "../smartContract/nusicABI&Address.js";
import {
  nusicMarketPlaceABI,
  nusicMarketPlaceAddress,
} from "../smartContract/NusicMarketPlaceABI&Address";
import { BUSDABI, BUSDAddress } from "../smartContract/busdAddress&ABI";

export const getContract = async (address, abi, library, chainId) => {
  if (!library) return;

  if (library.connection.url !== "metamask") {
    library.provider.http.connection.url = RPC_NETWORK_URLS[chainId];
  }

  const web3Provider = new providers.Web3Provider(await library.provider);
  return new Contract(address, abi, web3Provider.getSigner());
};

export const getHighestBidder = (singles) => {
  if (!singles.isAuction || Date.now() < new Date(singles.auctionExpiresOn))
    return;

  return [...singles.bids]
    .sort((a, b) => parseFloat(b.bidAmount) - parseFloat(a.bidAmount))
    .at(0);
};

export const createListing = async (
  library,
  chainId,
  account,
  singles,
  askPrice,
  currency,
  isAuction,
  auctionPeriod
) => {
  console.log(currency);
  if (!askPrice) return;
  if (isAuction && !auctionPeriod) return;

  const nusicContract = await getContract(
    nusicAddress,
    nusicABI,
    library,
    chainId
  );

  const nusicMarketPlaceContract = await getContract(
    nusicMarketPlaceAddress,
    nusicMarketPlaceABI,
    library,
    chainId
  );

  const auctionTimestamp = isAuction
    ? new Date(Date.now() + 86400000 * auctionPeriod).getTime()
    : 0;

  try {
    await (
      await nusicContract.approve(nusicMarketPlaceAddress, singles.tokenId)
    ).wait();

    console.log(askPrice)

    await (
      await nusicMarketPlaceContract.list(
        singles.tokenId,
        utils.parseEther(askPrice),
        isAuction,
        auctionTimestamp,
        currency.address
      )
    ).wait();

    const listingId = parseInt(
      await nusicMarketPlaceContract.currentSaleCounter(account)
    );

    const timestamp = new Date().getTime();

    const newSingles = {
      ...singles,
      listingId,
      isAuction,
      askPrice,
      currencyName: currency.name,
      ERC20TokenAddress: currency.address,
      auctionExpiresOn: auctionTimestamp,
      itemActivity: {
        ...singles.itemActivity,
        list: [
          ...singles.itemActivity.list,
          {
            price: askPrice,
            currency: currency.name,
            from: account,
            to: null,
            timestamp,
          },
        ],
      },
    };

    await updateDoc(doc(db, "singles", singles.id), {
      ...newSingles,
      // Track item listing activity
      itemActivity: {
        ...singles.itemActivity,
        list: arrayUnion({
          price: askPrice,
          currency: currency.name,
          from: account,
          to: null,
          timestamp,
        }),
      },
    });
    toast.success("You successfully listed your singles");
    // Track user listing activity
    await updateDoc(doc(db, "activities", account), {
      list: arrayUnion({
        item: {
          id: singles.id,
          tokenId: singles.tokenId,
          name: singles.name,
        },
        price: askPrice,
        currency: currency.name,
        quantity: 1,
        from: account,
        to: null,
        timestamp,
      }),
    });

    toast.success("You successfully listed your singles");

    return newSingles;
  } catch (err) {
    console.error(err);
    //toast.error("Something Went Wrong");
    return singles;
  }
};

export const buyListing = async (library, chainId, account, singles) => {
  console.log(singles);
  const nusicMarketPlaceContract = await getContract(
    nusicMarketPlaceAddress,
    nusicMarketPlaceABI,
    library,
    chainId
  );

  const BUSDContract = await getContract(
    BUSDAddress,
    BUSDABI,
    library,
    chainId
  );

  const timestamp = new Date().getTime();

  const newSingles = {
    ...singles,
    owner: account,
    listingId: -1,
    askPrice: "0",
    itemActivity: {
      ...singles.itemActivity,
      sales: [
        ...singles.itemActivity.sales,
        {
          price: singles.askPrice,
          from: singles.owner,
          to: account,
          timestamp,
        },
      ],
    },
  };

  let valueSent = singles.askPrice;
  console.log("PRICE: ", valueSent)

  try {
    if (
      singles.ERC20TokenAddress !==
      "0x0000000000000000000000000000000000000000"
    ) {
      await (
        await BUSDContract.approve(
          nusicMarketPlaceAddress,
          utils.parseEther(singles.askPrice)
        )
      ).wait();
      valueSent = "0";
    }

    await (
      await nusicMarketPlaceContract.buyListing(singles.listingId, {
        value: utils.parseEther(valueSent),
      })
    ).wait();

    // Track item buying activity
    await updateDoc(doc(db, "singles", singles.id), {
      ...newSingles,
      itemActivity: {
        ...singles.itemActivity,
        sales: arrayUnion({
          currency: singles.currencyName,
          price: singles.askPrice,
          from: singles.owner,
          to: account,
          timestamp,
        }),
      },
    });

    // Add owners to collections, to find unique owner in particular collections
    singles.collectionId &&
      (await addOwnerToCollections(singles.collectionId, account));

    toast.success("Now you own", singles.tokenId);

    // Track user buying activity
    await updateDoc(doc(db, "activities", account), {
      sales: arrayUnion({
        item: {
          id: singles.id,
          tokenId: singles.tokenId,
          name: singles.name,
          media: singles.media,
        },
        price: singles.askPrice,
        quantity: 1,
        from: singles.owner,
        to: account,
        timestamp,
      }),
    });

    return newSingles;
  } catch (err) {
    console.log(err);
    toast.error("Something Went Wrong");
    return singles;
  }
};

export const createBid = async (
  library,
  chainId,
  account,
  singles,
  bidAmount
) => {
  const nusicMarketPlaceContract = await getContract(
    nusicMarketPlaceAddress,
    nusicMarketPlaceABI,
    library,
    chainId
  );

  if (bidAmount < singles.askPrice) {
    toast.error("Bidding amount is less then asking amount");
    return singles;
  }

  if (Date.now() > new Date(singles.auctionExpiresOn)) {
    toast.error("Auction ended");
    return singles;
  }

  const bidder = getHighestBidder(singles);
  const timestamp = new Date().getTime();

  if (bidder && bidAmount < bidder.bidAmount) {
    toast.error(`Bid more than ${t.bidAmount}`);
    return singles;
  }

  const newSingles = {
    ...singles,
    itemActivity: {
      ...singles.itemActivity,
      bids: [
        ...singles.itemActivity.bids,
        {
          price: bidAmount,
          from: account,
          to: null,
          timestamp,
        },
      ],
    },
  };

  try {
    await (
      await nusicMarketPlaceContract.createBid(singles.listingId, {
        value: utils.parseEther(bidAmount),
      })
    ).wait();

    // Track item bidding activity
    await updateDoc(doc(db, "singles", singles.id), {
      ...newSingles,
      itemActivity: {
        ...singles.itemActivity,
        bids: arrayUnion({
          price: bidAmount,
          from: account,
          to: null,
          timestamp,
        }),
      },
    });

    // Track user bidding activity
    await updateDoc(doc(db, "activities", account), {
      bids: arrayUnion({
        item: {
          id: singles.id,
          tokenId: singles.tokenId,
          name: singles.name,
          media: singles.media,
        },
        price: bidAmount,
        quantity: 1,
        from: account,
        to: null,
        timestamp,
      }),
    });

    return newSingles;
  } catch (err) {
    console.log(err);
    toast.error("Something Went Wrong");
    return singles;
  }
};

export const claimAuction = async ( library, chainId, singles ) => {
  const nusicMarketPlaceContract = await getContract(
    nusicMarketPlaceAddress,
    nusicMarketPlaceABI,
    library,
    chainId
  );

  const newSingles = {
    ...singles,
    isAuctionClaimed: true,
  };

  try {
    await (
      await nusicMarketPlaceContract.claimAuction(singles.listingId)
    ).wait();

    await updateDoc(doc(db, "singles", singles.id), newSingles);

    toast.success("Auction claimed successfully");

    return newSingles;
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong");
    return singles;
  }
};

export const cancelListing = async (library, chainId, singles) => {
  console.log(singles);
  const nusicMarketPlaceContract = await getContract(
    nusicMarketPlaceAddress,
    nusicMarketPlaceABI,
    library,
    chainId
  );

  const newSingles = {
    ...singles,
    listingId: -1,
  };

  try {
    await (
      await nusicMarketPlaceContract.cancelListing(singles.listingId)
    ).wait();

    await updateDoc(doc(db, "singles", singles.id), newSingles);

    toast.success("Cancel listing successfully");

    return newSingles;
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong");
    return singles;
  }
};
