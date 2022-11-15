import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage, db } from "./firebase";
import ethereum_address from 'ethereum-address';

import {
  getDoc,
  setDoc,
  doc,
  getDocs,
  query,
  collectionGroup,
  where,
  collection,
  updateDoc,
  arrayUnion,
  orderBy,
  limit
} from "firebase/firestore";

export const defaultUserData = {
  name: "",
  description: "",
  social: "",
  coverImage: null,
  media: null,
  isPremium: false,
  isInitialised: false,
};

export const getExtension = (filename) => {
  return filename.substring(filename.lastIndexOf("."));
};

export const truncateAddress = (address) => {
  if (!address) return "No Account";
  const match = address.match(
    /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
  );
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const uploadFile = async (path, file, filename) => {
  const storageRef = ref(storage, `${path}/${filename}`);
  await uploadBytes(storageRef, file).catch((error) => console.log(error));
  return await getDownloadURL(storageRef).catch((error) => console.log(error));
};

export const getOrCreateUser = async (address) => {
  const userRef = doc(db, "users", address);

  return await getDoc(userRef).then(async (snapshot) => {
    if (snapshot.exists()) return snapshot.data();

    await setDoc(doc(db, "activities", address), {
      owner: address,
      list: [],
      sales: [],
      bids: [],
    });

    return await setDoc(userRef, defaultUserData)
      .then(() => defaultUserData)
      .catch((error) => console.log("get or create error"));
  });
};

export const getUser = async (id) => {
  if (ethereum_address.isAddress(id)) {
    return await getDocs(query(collection(db, "users"), where("address", "==", id)))
    .then((snapshot) => {
        let items = [];
        snapshot.forEach(doc => {
          console.log(doc.data());
          items.push(doc.data());
        })
        console.log("0", items[0]);
        if(items[0] !== undefined){
          return items[0];
        } else {
          return 0;
        }
    })
    .catch((error) => {
      console.log(error);
      return 0;
    });
  }
  else {
    return await getDoc(doc(db, "users", id)).then(async (snapshot) => {
      if (snapshot.exists()) return snapshot.data();
      return 0;
    });
  }
};

export const usernameExists = async (id) => {
    return await getDoc(doc(db, "users", id)).then(async (snapshot) => {
      console.log("USERNAMEEXISTS: ", snapshot.exists());
      if (snapshot.exists()) return true;
      return false;
    });
};

export const addressExists = async (id) => {
  return await getDocs(query(collection(db, "users"), where("address", "==", id)))
    .then(async (snapshot) => {
      console.log("ADDRESSEXISTS: ", snapshot);
      if (snapshot.exists()) return true;
      return false;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};

export const getSingles = async (id) => {
  return await getDoc(doc(db, "singles", id))
    .then((snapshot) => snapshot.data())
    .catch((error) => console.log(error));
};

export const getFloorPrice = async (cid) => {
  // db.collection("singles")
  // .where("collectionId", "==", cid)
  // .orderBy("price", "desc")
  // .limit(1)
  // .get()
  // .then(snap => {
  //     snap.forEach(doc => {
  //         console.log("SNAP", doc.data());
  //     });
  // });
  return await getDocs(query(collection(db, "singles"), where("collectionId", "==", cid)))
    .then((snapshot) => {
      if(snapshot !== undefined){
        let items = [];
        console.log("INSIDE SNAPSHOT: ", cid);
        snapshot.forEach(doc => {
          console.log("ERROR INSIDE SNAPSHOT: ", doc.data());
          let item = doc.data();
          if(item.listingId !== -1 && item.currencyName === "BNB"){
            items.push(item);
          }
        })
        if(items.length > 0){
          console.log("INSIDE SNAPSHOT LENGTH: ", items.length);
          //items.sort((a, b) => a.askPrice < b.askPrice ? -1 : (a.askPrice > b.askPrice ? 1 : 0));
          items.sort((a, b) => a.askPrice - b.askPrice);
          items.forEach((e) => {
              console.log(`NFTNFTNFT;::: ${e.name} ${e.askPrice} ${e.listingId}`);
          });

          console.log("LOWEST PRICE: ", items[0]);
          // console.log("0", items[0]);
          if(items[0].askPrice !== undefined){
            return items[0].askPrice;
          } else {
            console.log("INSIDE SNAPSHOT LENGTH: ", items.length);
            return 0;
          }
        } else{
          return 0;
        }
      } else{
        return 0;
      }
    })
    .catch((error) => console.log(error));
};

export const getVolume = async (cid) => {
  // db.collection("singles")
  // .where("collectionId", "==", cid)
  // .orderBy("price", "desc")
  // .limit(1)
  // .get()
  // .then(snap => {
  //     snap.forEach(doc => {
  //         console.log("SNAP", doc.data());
  //     });
  // });
  return await getDocs(query(collection(db, "singles"), where("collectionId", "==", cid)))
    .then((snapshot) => {
      let items = [];
      let volume = 0;
      snapshot.forEach(doc => {
        console.log(doc.data());
        items.push(doc.data());
      })
      items.forEach(item => {
        if(item.itemActivity.sales.length > 0){
          for(let i = 0; i < item.itemActivity.sales.length; i++){
            if(item.itemActivity.sales[i].currency === "BNB"){
              volume += parseFloat(item.itemActivity.sales[i].price);
            }
          }
        }
      })
      
      return volume;
    })
    .catch((error) => console.log(error));
};

export const getTop10Collections = async () => {
  let collections = [];
  await getDocs(query(collection(db, "nftCollections")))
    .then(async (snapshot) => {
      snapshot.forEach(async doc => {
        console.log(doc.id);
        let info = doc.data();
        let tempVol = await getVolume(info.id);
        console.log("TEMPORAL VOLUME: ", tempVol);
        collections.push({
          ...info,
          volume: tempVol
        });
        collections.push({
          ...info,
          volume: tempVol
        });
      })
    })
    .catch((error) => {console.log(error)});
  // collections.sort((a, b) => a.volume < b.volume ? -1 : (a.volume > b.volume ? 1 : 0));
  // console.log("SORTED: ", collections);
  if(collections.length >= 10) {
    let temp10 = [];
    for(let i = 0; i < 10; i++){
      temp10.push(collections[i]);
    }
    return temp10;
  } else {
    return collections;
  }
};

export const getSinglesByAdress = async (address) => {
  return await getDocs(query(collection(db, "singles"), where("creator", "==", address), where("collectionId", "==", null)))
    .then((snapshot) => {
      let items = [];
      snapshot.forEach(doc => {
      console.log(doc.data());
      items.push(doc.data());
      })
      return items;
    })
    .catch((error) => console.log(error));
};

export const getSinglesByCollection = async (cid) => {
  return await getDocs(query(collection(db, "singles"), where("collectionId", "==", cid)))
    .then((snapshot) => {
      let items = [];
      snapshot.forEach(doc => {
      console.log(doc.data());
      items.push(doc.data());
      })
      return items;
    })
    .catch((error) => console.log(error));
};

export const getPremiumUsers = async () => {
  return await getDocs(query(collection(db, "users"), where("isPremium", "==", true)))
    .then((snapshot) => {
      let items = [];
      snapshot.forEach(doc => {
      console.log(doc.id);
      let info = doc.data();
      info = {
        ...info,
        address: doc.id
      }
      items.push(info);
      })
      return items;
    })
    .catch((error) => {return 0});
};

export const getUsers = async () => {
  return await getDocs(query(collection(db, "users")))
    .then((snapshot) => {
      let items = [];
      snapshot.forEach(doc => {
      console.log(doc.id);
      let info = doc.data();
      info = {
        ...info,
        address: doc.id
      }
      items.push(info);
      })
      return items;
    })
    .catch((error) => {return 0});
};

export const getNews = async () => {
  return await getDocs(query(collection(db, "news"),  limit(5)))
    .then((snapshot) => {
      let items = [];
      snapshot.forEach(doc => {
        console.log(doc.id);
        let info = doc.data();
        items.push(info);
      })
      if(items.length !== 0){
        return items;
      } else{
        return 0;
      }
    })
    .catch((error) => {return 0});
};

// export const getCols = async () => {
//   return await getDocs(query(collection(db, "nftCollections"),  limit(10)))
//     .then(async (snapshot) => {
//       let items = [];
//       snapshot.forEach(async doc => {
//         console.log(doc.id);
//         let info = doc.data();
//         let volume = await getVolume(info.id);
//         console.log("VOLUME FROM ", info.id, " : ", volume);
//         let floor = await getFloorPrice(info.id);
//         console.log("floor FROM ", info.id, " : ", floor);
//         items.push({
//           ...info,
//           volume,
//           floor
//         });
//         console.log("HOMEPAGE COLLECTIONS: ", items);
//         console.log("HOMEPAGE COLLECTION: ", info);
//       })
//       if(items.length !== 0){
//         console.log("HOMEPAGE COLLECTIONS: ", items);
//         return items;
//       } else{
//         return 0;
//       }
//     })
//     .catch((error) => {return 0});
// };

export const getCols = async () => {
  return await getDocs(query(collection(db, "nftCollections"),  limit(10)))
    .then(async (snapshot) => {
      let items = [];
      snapshot.forEach(async doc => {
        console.log(doc.id);
        let info = doc.data();
        // let volume = await getVolume(info.id);
        // console.log("VOLUME FROM ", info.id, " : ", volume);
        // let floor = await getFloorPrice(info.id);
        // console.log("floor FROM ", info.id, " : ", floor);
        // items.push({
        //   ...info,
        //   volume,
        //   floor
        // });
        // console.log("HOMEPAGE COLLECTIONS: ", items);
        // console.log("HOMEPAGE COLLECTION: ", info);
        items.push(info);
      })
      if(items.length !== 0){
        console.log("HOMEPAGE COLLECTIONS: ", items);
        return items;
      } else{
        return 0;
      }
    })
    .catch((error) => {return 0});
};

export const getCollectedByAdress = async (address) => {
  return await getDocs(query(collection(db, "singles"), where("owner", "==", address)))
    .then((snapshot) => {
      let items = [];
      snapshot.forEach(doc => {
      console.log(doc.data());
      items.push(doc.data());
      })
      return items;
    })
    .catch((error) => console.log(error));
};

export const getCollectionsByAdress = async (address) => {
  return await getDocs(query(collection(db, "nftCollections"), where("owner", "==", address)))
    .then((snapshot) => {
      let items = [];
      snapshot.forEach(doc => {
      console.log(doc.data());
      items.push(doc.data());
      })
      return items;
    })
    .catch((error) => console.log(error));
};

export const getSearchResults = async (text) => {
  const q1 = query(
    collection(db, "users"),
    where("name", ">=", text.toUpperCase()),
    where("name", "<=", text.toLowerCase() + "~")
  );
  const q2 = query(
    collection(db, "singles"),
    where("name", ">=", text.toUpperCase()),
    where("name", "<=", text.toLowerCase() + "~")
  );
  const q3 = query(
    collection(db, "singles"),
    where("category", ">=", text.toUpperCase()),
    where("category", "<=", text.toLowerCase() + "~")
  );
  const q4 = query(
    collection(db, "nftCollections"),
    where("name", ">=", text.toUpperCase()),
    where("name", "<=", text.toLowerCase() + "~")
  );

  const [users, singlesByName, singlesByCategory, nftCollections] =
    await Promise.all([
      executeSearch(q1),
      executeSearch(q2),
      executeSearch(q3),
      executeSearch(q4),
    ]);

  return {
    users: users.filter((x) =>
      x.name.toLowerCase().includes(text.toLowerCase())
    ),
    singlesByName: singlesByName.filter((x) =>
      x.name.toLowerCase().includes(text.toLowerCase())
    ),
    singlesByCategory: singlesByCategory.filter((x) =>
      x.category.toLowerCase().includes(text.toLowerCase())
    ),
    nftCollections: nftCollections.filter((x) =>
      x.name.toLowerCase().includes(text.toLowerCase())
    ),
  };
};

export const getCategoryNfts = async (text) => {
  const q = query(
    collection(db, "singles"),
    where("categories", "array-contains", text.toLowerCase())
  );

  const [nfts] =
    await Promise.all([
      executeSearch(q),
    ]);

  console.log("CATEGORY", nfts);
  return nfts;
};

export const executeSearch = async (_query) => {
  return await getDocs(_query)
    .then((snapshot) => snapshot.docs.map((d) => d.data()))
    .catch((error) => console.log(error));
};

export const getCollection = async (collectionId) => {
  return await getDoc(doc(db, "nftCollections", collectionId))
    .then((snapshot) => {
      let item = snapshot.data();
      console.log("ITEMMM", item);
      return item;
    })
    .catch((error) => console.log(error));
};

export const addOwnerToCollections = async (collectionId, address) => {
  await updateDoc(doc(db, "nftCollections", collectionId), {
    owners: arrayUnion(address),
  }).catch((error) => console.log(error));
};
