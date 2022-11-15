// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

interface INusic {
    function getRoyalty(uint256) external view returns (uint256);
}

contract NusicMarketPlace {
    address public owner;
    uint256 public marketFee = 25 * 10**17;
    uint256 public hundred = 100 * 10**18;
    uint256 public listingFee;
    uint256 public saleCounter;

    mapping(address => uint256) public currentSaleCounter;
    mapping(uint256 => Listing) public getListing;
    mapping(uint256 => Bid) public getBid;

    mapping(address => bool) public ERC20TokenList;
    mapping(address => uint256) public ERC20TokenAmount;

    mapping(uint256 => address) public currentTokenOwners;
    mapping(uint256 => address) public originalTokenOwners;

    INusic Nusic = INusic(0xa047f950D201E0aAfFFB8E4BdAe5a6052a7424cC);
    ERC721 NusicContract = ERC721(0xa047f950D201E0aAfFFB8E4BdAe5a6052a7424cC);

    struct Listing {
        uint256 tokenId;
        uint256 askPrice;
        bool isAuction;
        uint256 auctionExpiresOn;
        ERC20 ERC20Token;
    }

    struct Bid {
        address bidder;
        uint256 bidAmount;
    }

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "NOT OWNER");
        _;
    }

    function list(
        uint256 _tokenId,
        uint256 _askPrice,
        bool _isAuction,
        uint256 _auctionExpiresOn,
        ERC20 _ERC20Token
    ) public payable {
        require(msg.value >= listingFee, "LISTING FEE INVALID");
        address erc20 = address(_ERC20Token);

        if (erc20 != address(0)) {
            require(ERC20TokenList[erc20], "INVALID ERC20 TOKEN ADDRESS");
        }

        Listing memory listing = Listing({
            tokenId: _tokenId,
            askPrice: _askPrice,
            isAuction: _isAuction,
            auctionExpiresOn: _auctionExpiresOn,
            ERC20Token: _ERC20Token
        });

        /* Before calling transferFrom, from frontends we call approve 
        to give this contract to call transferFrom function */

        NusicContract.transferFrom(msg.sender, address(this), listing.tokenId);

        if (originalTokenOwners[_tokenId] == address(0)) {
            originalTokenOwners[_tokenId] = msg.sender;
        }
        currentTokenOwners[_tokenId] = msg.sender;

        getListing[saleCounter] = listing;
        currentSaleCounter[msg.sender] = saleCounter++;
    }

    function buyListing(uint256 listingId) public payable {
        Listing memory listing = getListing[listingId];

        address creator = originalTokenOwners[listing.tokenId];

        require(creator != address(0), "ZERO ADDRESS");

        address currentOwner = currentTokenOwners[listing.tokenId];
        uint256 askPrice = listing.askPrice;
        uint256 royalty = Nusic.getRoyalty(listing.tokenId);

        uint256 marketFeeAmount = (askPrice * marketFee) / hundred;

        askPrice -= marketFeeAmount;
        uint256 creatorFee = (askPrice * royalty) / hundred;
        askPrice -= creatorFee;

        if (address(listing.ERC20Token) == address(0)) {
            require(msg.value >= listing.askPrice, "INSUFFICIENT FUNDS");

            (bool sent1, ) = payable(creator).call{value: creatorFee}("");
            (bool sent2, ) = payable(currentOwner).call{value: askPrice}("");

            require(sent1 && sent2, "TX FAILED");
        }
        // Currency is ERC20
        else {
            /* Before calling transferFrom, from frontends we call approve 
               to give this contract to call transferFrom function */

            require(
                ERC20TokenList[address(listing.ERC20Token)],
                "INVALID ERC20 TOKEN ADDRESS"
            );

            ERC20TokenAmount[address(listing.ERC20Token)] = marketFeeAmount;

            listing.ERC20Token.transferFrom(msg.sender, creator, creatorFee);
            listing.ERC20Token.transferFrom(msg.sender, currentOwner, askPrice);
        }

        NusicContract.transferFrom(address(this), msg.sender, listing.tokenId);

        currentTokenOwners[listing.tokenId] = msg.sender;

        delete getListing[listingId];
    }

    function createBid(uint256 listingId) public payable {
        Listing memory listing = getListing[listingId];

        Bid memory bid = getBid[listingId];

        require(msg.value >= listing.askPrice, "INVALID BID");
        require(msg.value > bid.bidAmount, "BID MORE");

        if (bid.bidder != address(0)) {
            (bool sent, ) = payable(bid.bidder).call{value: bid.bidAmount}("");
        }

        bid.bidder = msg.sender;
        bid.bidAmount = msg.value;

        getBid[listingId] = bid;
    }

    function claimAuction(uint256 listingId) public {
        Listing memory listing = getListing[listingId];
        Bid memory bid = getBid[listingId];

        require(
            block.timestamp > listing.auctionExpiresOn,
            "auction not ended"
        );

        require(msg.sender == bid.bidder, "NOT WINNER");

        NusicContract.transferFrom(address(this), msg.sender, listing.tokenId);

        delete getListing[listingId];
        delete getBid[listingId];
    }

    function cancelListing(uint256 listingId) public {
        Listing memory listing = getListing[listingId];

        address currentOwner = currentTokenOwners[listing.tokenId];

        require(msg.sender == currentOwner, "Unauthorized");

        NusicContract.transferFrom(address(this), msg.sender, listing.tokenId);

        delete getListing[listingId];
    }

    function withdraw() public onlyOwner {
        (bool hs, ) = payable(owner).call{value: address(this).balance}("");
        require(hs, "WITHDRAW_ERROR");
    }

    function setOwner(address _newOwner) public onlyOwner {
        owner = _newOwner;
    }

    function setERC20Token(address _ERC20TokenAddress) public onlyOwner {
        require(_ERC20TokenAddress != address(0), "Invalid Token");
        ERC20TokenList[_ERC20TokenAddress] = true;
    }

    function setListingFee(uint256 _newListingFee) public onlyOwner {
        listingFee = _newListingFee;
    }

    function withdrawERC20Token(address _ERC20TokenAddress) public onlyOwner {
        require(_ERC20TokenAddress != address(0), "Invalid Token");
        ERC20(_ERC20TokenAddress).transferFrom(
            address(this),
            owner,
            ERC20TokenAmount[_ERC20TokenAddress]
        );
    }

    function setMarketFee(uint256 _newMarketFee) public onlyOwner {
        marketFee = _newMarketFee;
    }
}
