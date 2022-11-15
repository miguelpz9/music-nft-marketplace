import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import CollectionHeader from '../components/CollectionHeader/CollectionHeader'
import CollectionSub from '../components/CollectionSub/CollectionSub'
import TopColBar from '../components/TopColBar/TopColBar'
import CollectionSection from '../components/CollectionSection/CollectionSection'
import { getCollection, getFloorPrice, getVolume } from '../../utils/helpers';

function Collection() {
  const router = useRouter()
  const { cid } = router.query
  const [isLoading, setIsLoading]  =  useState(true);
  const [noItems, setNoItems]  =  useState(true);
  const [collections, setCollections] = useState(null);
  const [floorPrice, setFloorPrice] = useState(0);
  const [colVolume, setColVolume] = useState(0);
  useEffect(() => {
    const loadItems  = async () => {
      setIsLoading(true);
      let collections2 = await getCollection(cid);
      let floor = await getFloorPrice(cid);
      let volume = await getVolume(cid);
      console.log("VOLUMEN: ", volume);
      console.log("FLOOR", floor);
      if(collections2  ==  0){
        setNoItems(true);
      } else{
        setCollections(collections2);
        setNoItems(false);
      }
      setFloorPrice(floor);
      setColVolume(volume);
      // console.log("USAGFUI", collections2);
      setIsLoading(false);
    }
    loadItems();
  }, [cid]);
  return (
    <div className='w-full h-full'>
      { collections && <CollectionHeader pfp={collections?.coverImage} cover={collections?.coverImage} />}
      { collections && <CollectionSub collection={collections} fp={floorPrice} volume={colVolume} /> }
      { collections && <TopColBar /> }
      { collections && <CollectionSection cid={cid} /> }
    </div>
  )
}


// export const getServerSideProps = async (ctx) => {
//   const { address } = ctx.query;
//   console.log(address);
//   let data = await getOrCreateUser(address);
//   console.log(data);
//   return { props: { data, address } };
// };

export default Collection