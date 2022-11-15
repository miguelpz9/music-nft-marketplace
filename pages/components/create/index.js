import { TextField, MenuItem, Button } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import styles from './create.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setWalletAddress } from '../../../slices/walletSlice'
import Web3Modal from "web3modal";
import { ethers } from 'ethers'
import { providerOptions } from '../../Layout/Layout'
import { create as ipfsHttpClient } from 'ipfs-http-client';

function Create(props) {
    const {collectionCounter, handleUpdate, nftCount} = props
    const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');
    const [nftData, setNftData] = useState({
        name: '',
        description: '',
        author: '',
        type: 'image',
        royalty: '',
        imgurl: '',
    })
    const dispatch = useDispatch()
    const [fileName, setFileName] = useState("")
    const walletAddress = useSelector(state => state.walletSlice.walletAddress)
    const type = [
        {
            label:'Imagen',
            value:'image',
        },
        {
            label:'Video',
            value:'video',
        },
        {
            label:'Audio',
            value:'audio',
        }
    ]
    const connectWallet = async () => {
        const web3Modal = new Web3Modal({
          providerOptions
        });
        try {
          const instance = await web3Modal.connect();
          const provider = new ethers.providers.Web3Provider(instance);
          const signer = provider.getSigner();
          dispatch(setWalletAddress(await signer.getAddress()))
        } catch (error) {
          console.log(error)
        }
    
      }
    useEffect(() => {
        document.getElementById('material-file').onchange = function () {
            alert('Selected file: ' + this.value);
            let item = document.getElementById('material-file')
            setFileName(item.files[0].name)
        };
    }, [])
    useEffect(() => {
      if(walletAddress){
        setNftData({
            ...nftData,
            author: walletAddress
        })
      }
    }, [walletAddress])
    
    
    const handleTypeChange = (e) => {
        let file = document.getElementById('material-file')
        file.value = ''
        setFileName("")
        setNftData({
            ...nftData,
            type: e.target.value,
        })
    }
    const handleChangeName = (e) => {
        setNftData({...nftData,name: e.target.value})
    }
    const handleChangeDesc = (e) => {
        setNftData({...nftData,description: e.target.value})
    }
    const handleChangeRoyal = (e) => {
        setNftData({...nftData,royalty: e.target.value})
    }
    async function postFile(file) {
        const formData = new FormData();
        formData.append("file", file)
      
        const result = await axios.post('http://localhost:8080/api/upload', formData, { headers: {'Content-Type': 'multipart/form-data'}})
        return result.data
      }

    const handleSubmit = async (e) => {
        if(!walletAddress){
            await connectWallet()
        }
        try {
            
            let image = document.getElementById('material-file').files[0]
            let file = document.getElementById('material-file2').files[0]
            const imagePosted = await postFile(image);
            const filePosted = await postFile(file);
            console.log(imagePosted);
            console.log(filePosted);
            let data = {
                ...nftData,
                image:"http://localhost:8080"+imagePosted.filePath,
                file:"http://localhost:8080"+filePosted.filePath
            }
            console.log(data);
            const added = await client.add(JSON.stringify(data));
            const url = `https://ipfs.infura.io/ipfs/${added.path}`;
            alert(url);
            handleUpdate(url);
            //await coreContract.createSingle(url, 0, nftData.royalty);
          } catch (error) {
            console.log('Error uploading file: ', error)
          }
    }
    // const handleSubmit = async (e) => {
    //     if(!walletAddress){
    //         await connectWallet()
    //     }
    //     let file = document.getElementById('material-file').files[0]
    //     try {
    //         const imagePosted = await postFile(file);
    //         const added = await client.add(file)
    //         const url = `https://ipfs.infura.io/ipfs/${added.path}`
    //         alert(url)
    //         let data = {
    //             ...nftData,
    //             imgurl: url,
    //         }
            
    //         setNftData({
    //             ...nftData,
    //             name: '',
    //             description: '',
    //             type: 'image',
    //             royalty: '',
    //             imgurl: '',
    //         })
    //         file.value = ''
    //         setFileName("")
    //       } catch (error) {
    //         console.log('Error uploading file: ', error)
    //       }
        
    // }
  return (
    <div className='w-full h-screen flex flex-col justify-start items-center py-8'>
        <h2 className='text-3xl font-semibold mb-6'>Crea tu <span className='text-[#f00]'>NFT - {collectionCounter} / {nftCount}</span></h2>
        <div className={`${styles.form}`}>
            <div className='mb-4'>
                <TextField variant='outlined' label='Nombre del NFT' id='nftnameinput' className='mb-3' value={nftData.name} fullWidth onChange={handleChangeName} />
            </div>
            <div className='mb-4'>
                <TextField variant='outlined' label='Descripción del NFT' id='nftdescinput' className='mb-3' value={nftData.description} fullWidth onChange={handleChangeDesc} />
            </div>
            <div className='mb-4'>
                <TextField variant='outlined' disabled label='Autor del NFT' id='nftauthorinput' className='mb-3' value={nftData.author} fullWidth />
            </div>
            <div className='mb-4'>
                <TextField variant='outlined' label='Regalías del NFT (Royalties)' id='nftroyaltyinput' className='mb-3' value={nftData.royalty} type="number" fullWidth onChange={handleChangeRoyal} />
            </div>
            <div className='mb-4'>
            <TextField
                id="outlined-select-type"
                select
                label="Tipo de archivo"
                value={nftData.type}
                onChange={handleTypeChange}
                helperText="Porfavor, selecciona el tipo de archivo: Imagen/Video/Audio"
                variant="outlined"
                >
                {type.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
            </TextField>
            </div>
            <div className='mb-4 flex items-center'>
            <Button
            variant="contained"
            component="label"
            >
                Subir archivo
                <input
                    type="file"
                    hidden
                    id='material-file'
                    accept={nftData.type == "video" ? 'video/*' : nftData.type == "audio" ? 'audio/*' : 'image/*'}
                />
            </Button>
            <Button
            variant="contained"
            component="label"
            >
                Subir archivo
                <input
                    type="file"
                    hidden
                    id='material-file2'
                    accept={nftData.type == "video" ? 'video/*' : nftData.type == "audio" ? 'audio/*' : 'image/*'}
                />
            </Button>
            {
                fileName && (
                    <p className='ml-2'>
                        {fileName}
                    </p>
                )
            }
            </div>
            <div>
            <Button className='ml-4 w-full' variant="contained"  onClick={e => handleSubmit(e)} style={{backgroundColor:'rgb(255, 63, 77)', color:'#fff'}}>
                Crear NFT
            </Button>
            </div>
        </div>
    </div>
  )
}

export default Create