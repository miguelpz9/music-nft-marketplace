import {ethers, providers} from "ethers";
import axios from "axios";
import abi from '../constants/abi.json'
import collectionAbi from '../constants/collectionAbi.json'

  const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");
  //const coreAddress = process.env.NEXT_CORE_CONTRACT_ADDRESS; 
  const coreContract = new ethers.Contract("0xdb00e9b461162197f839515f8d388db6ffc63285", abi, provider);

export const fetchAllArtists = async () =>{
    let tempArray;
    try{
      tempArray = await coreContract.fetchAllArtists();
      console.log(tempArray);
      let items = await Promise.all(
        tempArray.map(async (i) => {
          const meta = await axios.get(i.URI);
          console.log("META", meta);
          let artist = {
            address: i.adr,
            name: meta.data.name,
            social: meta.data.social,
            description: meta.data.description,
            image: meta.data.pfp,
            cover: meta.data.cover,
            collections: i.collections,
            verified: i.verified,
            initialized: i.initialized
          }
          console.log(artist);
          return artist;
        })
      );
      return items;
    }catch(err){
        console.log(err);
        return 0;
    }
}

export const fetchAllCollections = async () =>{
    let tempArray;
    try{
      tempArray = await coreContract.fetchAllCollections();
      console.log(tempArray);
      let items = await Promise.all(
        tempArray.map(async (i) => {
          const meta = await axios.get(i.URI);
          let artist = {
            address: i.adr,
            creator: i.creator,
            name: meta.name,
            social: meta.social,
            description: meta.description,
            image: meta.pfp,
            cover: meta.cover,
          }
          console.log(artist);
          return artist;
        })
      );
      return items;
    }catch(err){
        console.log(err);
        return 0;
    } 
}

export const fetchArtistCollections = async (Address) =>{
    try{
      const tempArray = await coreContract.fetchArtistCollections(Address);
     //console.log("fetchArtCols", tempArray);
      let items = await Promise.all(
        tempArray.map(async (i) => {
          const meta = await axios.get(i.URI);
          let artist = {
            address: i.adr,
            creator: i.creator,
            name: meta.name,
            social: meta.social,
            description: meta.description,
            image: meta.pfp,
            cover: meta.cover,
          }
          console.log(artist);
          return artist;
        })
      );
      return items;
    }catch(err){
        console.log(err);
        return 0;
    } 
}

export const fetchArtistSingles = async (Address) =>{
    try{
        const singlesAdr = await coreContract.getSinglesCollection(Address);
        console.log("ASAF", singlesAdr.toString());
        const collection = new ethers.Contract(singlesAdr , collectionAbi , provider);
        let tempItems = await collection.fetchAllItems();
        //console.log(tempItems);
          let items = await Promise.all(
            tempItems.map(async (i) => {
              if(i.tokenId == 0){
                return;
              }
              const meta = await axios.get(i.URI);
              // returns the price, value in ETHER. i.e 0.01 ether
              let currency;
              if(i.currency === 1){
                currency = "BNB";
              }else if(i.currency === 2){
                currency = "BUSD";
              } else if(i.currency === 3) {
                currency = "MUZI";
              } else{
                currency = "BNB";
              }
              let price = ethers.utils.formatUnits(i.price.toString(), "ether");
              let item = {
                price,
                id: i.tokenId.toNumber(),
                name: meta.data.name,
                creator: i.creator,
                file: meta.data.file,
                image: meta.data.image,
                type: meta.data.type,
                description: meta.data.description,
                owner: i.owner,
                isListed: i.listed,
                price,
                currency,
                royalties: i.royalties.toNumber(),
                features: meta.data.attributes,
              };
              //console.log(item);
              return item;
            })
          );
          return items;
        }catch(err){
            console.log(err);
            return 0;
        } 
}

export const fetchFavouriteItems = async (Address) =>{
    try{
        const cols = await coreContract.getCollectionsAdrs();
        console.log(cols.toString());
        let favItems = {};
        for(let i = 0; i < cols.length; i++){
          let tempItems = await coreContract.getUserFavourites(Address, cols[i]);
          console.log(tempItems);
          favItems[cols[i]] = tempItems; 
        }
        console.log(favItems);
        let favObjects = [];
        let currentIndex = 0;
        for(let i = 0; i < cols.length; i++){
          if(favItems[cols[i]].length > 0){
            const collection = new ethers.Contract(cols[i] , collectionAbi , provider);
            for(let j = 0; j < favItems[cols[i]].length; j++){
              if(favItems[cols[i]][j] != 0 && favItems[cols[i]][j] != undefined){
                console.log(favItems[cols[i]][j].toString());
                let response = await collection.fetchItemById(favItems[cols[i]][j].toString());
                console.log(response);
                favObjects[currentIndex] = response;
                currentIndex++;
              }
            }
            //NEEDS INTEGRATE API IN PAGES, DEPLOY TEST CONTRACTS WITH EVENTS, MORALIS DB, S3 BUCKET AND GO LIVE
          }
        }
        //console.log(favObjects);
          let items = await Promise.all(
            favObjects.map(async (i) => {
              if(i.tokenId == 0){
                return;
              }
              //console.log(i);
              const meta = await axios.get(i.URI);
              // returns the price, value in ETHER. i.e 0.01 ether
              let currency;
              if(i.currency === 1){
                currency = "BNB";
              }else if(i.currency === 2){
                currency = "BUSD";
              } else if(i.currency === 3) {
                currency = "MUZI";
              } else{
                currency = "BNB";
              }
              let price = ethers.utils.formatUnits(i.price.toString(), "ether");
              let item = {
                price,
                id: i.tokenId.toNumber(),
                name: meta.data.name,
                creator: i.creator,
                file: meta.data.file,
                image: meta.data.image,
                type: meta.data.type,
                description: meta.data.description,
                owner: i.owner,
                isListed: i.listed,
                price,
                currency,
                royalties: i.royalties.toNumber(),
                features: meta.data.attributes,
              };
              //console.log(item);
              return item;
            })
          );
          return items;
        }catch(err){
            console.log(err);
            return 0;
        } 
}

export const fetchOwnedItems = async (Address) =>{
    let ownedItems = [];
    try{
      const cols = await coreContract.getCollectionsAdrs();
      console.log(cols.toString());
      let currentIndex = 0;
      for(let i = 0; i < cols.length; i++){
        const collection = new ethers.Contract(cols[i] , collectionAbi , provider);
        let tempItems = await collection.fetchOwnedItems(Address);
        for(let j = 0; j < tempItems.length; j++){
          ownedItems[currentIndex] = tempItems[j];
          currentIndex++;
        }     
      }
      console.log(ownedItems);
      let items = await Promise.all(
        ownedItems.map(async (i) => {
          if(i.tokenId == 0){
            return;
          }
          const meta = await axios.get(i.URI);
          // returns the price, value in ETHER. i.e 0.01 ether
          let currency;
              if(i.currency === 1){
                currency = "BNB";
              }else if(i.currency === 2){
                currency = "BUSD";
              } else if(i.currency === 3) {
                currency = "MUZI";
              } else{
                currency = "BNB";
              }
          let price = ethers.utils.formatUnits(i.price.toString(), "ether");
          let item = {
            price,
            id: i.tokenId.toNumber(),
            name: meta.data.name,
            creator: i.creator,
            collection: i.collection,
            file: meta.data.file,
            image: meta.data.image,
            type: meta.data.type,
            description: meta.data.description,
            owner: i.owner,
            isListed: i.listed,
            price,
            currency,
            royalties: i.royalties.toNumber(),
            features: meta.data.attributes,
          };
          console.log(item);
          return item;
        })
      );
      return items;
    }catch(err){
        console.log(err);
        return 0;
    } 
}

export const fetchPremiumArtists = async () =>{
    try{
      const tempArray = await coreContract.fetchPremiumArtists();
      console.log("agfg", tempArray);
      let items = await Promise.all(
        tempArray.map(async (i) => {
            try{
                const meta = await axios.get(i.URI);
                console.log("META", meta);
                let artist = {
                  address: i.adr,
                  name: meta.data.name,
                  social: meta.data.social,
                  description: meta.data.description,
                  image: meta.data.image,
                  cover: meta.data.cover,
                  collections: i.collections,
                  verified: i.verified,
                  initialized: i.initialized
                }
                console.log(artist);
                return artist;
            }catch(err){
                let artist = {
                  address: i.adr,
                  collections: i.collections,
                  verified: i.verified,
                  initialized: i.initialized
                }
                console.log(err,  artist);
                return artist;
            }
        })
      );
    //   const test = [{
    //     address: '0xSnoop',
    //     name: 'Snoop Dog',
    //     social: '@snoopdog',
    //     description:'Some awesome artist amigoss, you should check them out',
    //     image: 'https://cdn.britannica.com/63/103163-050-F26733EB/Snoop-Dogg.jpg',
    //     cover: 'https://cdn.britannica.com/63/103163-050-F26733EB/Snoop-Dogg.jpg',
    //     collections: ['0x', '0x'],
    //     verified: true,
    //     exists: true
    // },{
    //     address: '0xSnoop',
    //     name: 'Snoop Dog',
    //     social: '@snoopdog',
    //     description:'Some awesome artist amigoss, you should check them out',
    //     image: 'https://cdn.britannica.com/63/103163-050-F26733EB/Snoop-Dogg.jpg',
    //     cover: 'https://cdn.britannica.com/63/103163-050-F26733EB/Snoop-Dogg.jpg',
    //     collections: ['0x', '0x'],
    //     verified: true,
    //     exists: true
    // }];
    console.log(items);
      return items;
    }catch(err){
        console.log(err);
        return 0;
    } 
}

export const fetchArtistById = async (id) =>{
    try{
    //   const tempArray = await coreContract.fetchPremiumArtists();
    //   console.log(tempArray);
    //   let items = await Promise.all(
    //     tempArray.map(async (i) => {
    //       const meta = await axios.get(i.URI);
    //       let artist = {
    //         address: i.adr,
    //         name: meta.name,
    //         social: meta.social,
    //         description: meta.description,
    //         image: meta.pfp,
    //         cover: meta.cover,
    //         collections: i.collections,
    //         verified: i.verified,
    //         initialized: i.initialized
    //       }
    //       console.log(artist);
    //       return artist;
    //     })
    //   );
        const test = [{
            address: '0xSnoop',
            name: 'Snoop Dog',
            social: '@snoopdog',
            description:'Some awesome artist amigoss, you should check them out',
            image: 'https://cdn.britannica.com/63/103163-050-F26733EB/Snoop-Dogg.jpg',
            cover: 'https://cdn.britannica.com/63/103163-050-F26733EB/Snoop-Dogg.jpg',
            collections: ['0x', '0x'],
            verified: true,
            exists: true
        },{
            address: '0xSnoop',
            name: 'Snoop Dog',
            social: '@snoopdog',
            description:'Some awesome artist amigoss, you should check them out',
            image: 'https://cdn.britannica.com/63/103163-050-F26733EB/Snoop-Dogg.jpg',
            cover: 'https://cdn.britannica.com/63/103163-050-F26733EB/Snoop-Dogg.jpg',
            collections: ['0x', '0x'],
            verified: true,
            exists: true
        }];
        console.log("TEST LOG");
        console.log(test[id]);
      return test[id];
    }catch(err){
        console.log(err);
        return 0;
    } 
}

export const fetchArtistByAddress = async (adr) =>{
    try{
      console.log("JAGSBF", adr);
      const i = await coreContract.getArtist(adr);
      console.log("JAGSBF", i);
      const meta = await axios.get(i.URI);
      let artist = {
        address: i.adr,
        name: meta.data.name,
        social: meta.data.social,
        description: meta.data.description,
        image: meta.data.pfp,
        cover: meta.data.cover,
        collections: i.collections,
        verified: i.verified,
        initialized: i.initialized
      }
        // const test = {'0x2D0B4b501C8522E049A86184D2e0CE52bcAdA63F' : {
        //     address: '0x2D0B4b501C8522E049A86184D2e0CE52bcAdA63F',
        //     name: 'Snoop Dog',
        //     social: '@snoopdog',
        //     description:'Some awesome artist amigoss, you should check them out',
        //     image: 'https://cdn.britannica.com/63/103163-050-F26733EB/Snoop-Dogg.jpg',
        //     cover: 'https://cdn.britannica.com/63/103163-050-F26733EB/Snoop-Dogg.jpg',
        //     collections: ['0x', '0x'],
        //     verified: true,
        //     exists: true
        // },'0xCb9e9e39543f4a5D1d3D4c5F44E87eda487aAFe8' : {
        //     address: '0xCb9e9e39543f4a5D1d3D4c5F44E87eda487aAFe8',
        //     name: 'Snoop Dog2',
        //     social: '@snoopdog2',
        //     description:'Some awesome artist amigoss, you should check them out2',
        //     image: 'https://cdn.britannica.com/63/103163-050-F26733EB/Snoop-Dogg.jpg',
        //     cover: 'https://cdn.britannica.com/63/103163-050-F26733EB/Snoop-Dogg.jpg',
        //     collections: ['0x', '0x'],
        //     verified: true,
        //     exists: true
        // }};
        // console.log("TEST LOG");
        // console.log(test[adr]);
      return artist;
    }catch(err){
        console.log(err);
        return 0;
    } 
}

export const fetchCollectionByAddress = async (adr) =>{
  try{
    const i = await coreContract.getCollection(adr);
    console.log(i);
    const meta = await axios.get(i.URI);
    let artist = {
      address: i.adr,
      creator: i.creator,
      name: meta.name,
      social: meta.social,
      description: meta.description,
      image: meta.pfp,
      cover: meta.cover,
    }
    console.log(artist);

      // const test = {'0x2D0B4b501C8522E049A86184D2e0CE52bcAdA63F' : {
      //     address: '0x2D0B4b501C8522E049A86184D2e0CE52bcAdA63F',
      //     name: 'Snoop Dog',
      //     social: '@snoopdog',
      //     description:'Some awesome artist amigoss, you should check them out',
      //     image: 'https://cdn.britannica.com/63/103163-050-F26733EB/Snoop-Dogg.jpg',
      //     cover: 'https://cdn.britannica.com/63/103163-050-F26733EB/Snoop-Dogg.jpg',
      //     collections: ['0x', '0x'],
      //     verified: true,
      //     exists: true
      // },'0xCb9e9e39543f4a5D1d3D4c5F44E87eda487aAFe8' : {
      //     address: '0xCb9e9e39543f4a5D1d3D4c5F44E87eda487aAFe8',
      //     name: 'Snoop Dog2',
      //     social: '@snoopdog2',
      //     description:'Some awesome artist amigoss, you should check them out2',
      //     image: 'https://cdn.britannica.com/63/103163-050-F26733EB/Snoop-Dogg.jpg',
      //     cover: 'https://cdn.britannica.com/63/103163-050-F26733EB/Snoop-Dogg.jpg',
      //     collections: ['0x', '0x'],
      //     verified: true,
      //     exists: true
      // }};
      // console.log("TEST LOG");
      //console.log(test[adr]);
    return artist;
  }catch(err){
      console.log(err);
      return 0;
  } 
}

export const fetchItemByAddressAndId = async (adr, id) =>{
  try{
    const collection = new ethers.Contract(adr, collectionAbi , provider);
    const i =  await collection.fetchItemById(id);
    console.log("afaw", i);
    if(i.tokenId == 0){
      return;
    }
    const meta = await axios.get(i.URI);
    let currency;
    if(i.currency === 1){
      currency = "BNB";
    }else if(i.currency === 2){
      currency = "BUSD";
    } else if(i.currency === 3) {
      currency = "MUZI";
    } else{
      currency = "BNB";
    }
    let price = ethers.utils.formatUnits(i.price.toString(), "ether");
    let item = {
      price,
      id: i.tokenId.toNumber(),
      name: meta.data.name,
      creator: i.creator,
      collection: i.collection,
      file: meta.data.file,
      image: meta.data.image,
      type: meta.data.type,
      description: meta.data.description,
      owner: i.owner,
      isListed: i.listed,
      price,
      currency,
      royalties: i.royalties.toNumber(),
      features: meta.data.attributes,
    };
    console.log(item);
      // const test = {'0x2D0B4b501C8522E049A86184D2e0CE52bcAdA63F' : {
      //     address: '0x2D0B4b501C8522E049A86184D2e0CE52bcAdA63F',
      //     name: 'Snoop Dog',
      //     social: '@snoopdog',
      //     description:'Some awesome artist amigoss, you should check them out',
      //     image: 'https://cdn.britannica.com/63/103163-050-F26733EB/Snoop-Dogg.jpg',
      //     cover: 'https://cdn.britannica.com/63/103163-050-F26733EB/Snoop-Dogg.jpg',
      //     collections: ['0x', '0x'],
      //     verified: true,
      //     exists: true
      // },'0xCb9e9e39543f4a5D1d3D4c5F44E87eda487aAFe8' : {
      //     address: '0xCb9e9e39543f4a5D1d3D4c5F44E87eda487aAFe8',
      //     name: 'Snoop Dog2',
      //     social: '@snoopdog2',
      //     description:'Some awesome artist amigoss, you should check them out2',
      //     image: 'https://cdn.britannica.com/63/103163-050-F26733EB/Snoop-Dogg.jpg',
      //     cover: 'https://cdn.britannica.com/63/103163-050-F26733EB/Snoop-Dogg.jpg',
      //     collections: ['0x', '0x'],
      //     verified: true,
      //     exists: true
      // }};
      // console.log("TEST LOG");
      // console.log(test[adr]);
    return item;
  }catch(err){
      console.log(err);
      return 0;
  } 
}