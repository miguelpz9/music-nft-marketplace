import { Button, MenuItem, TextField } from '@material-ui/core'
import React, {useState} from 'react'
import styles from './FinalUpload.module.scss'

function FinalUpload(props) {
    const {items, data, nftsNumber} = props;
    const currency = [
        {
            label: 'BNB',
            value: 'BNB',
        },
        {
            label: 'MUZI',
            value: 'MUZI',
        },
        {
            label: 'BUSD',
            value: 'BUSD',
        }
    ]
    const [selectedCurrency, setSelectedCurrency] = useState(currency[0].value);
    
    const handleSubmit = async (e) => {
        if(!walletAddress){
            await connectWallet()
        }
        try {
            const added = await client.add(JSON.stringify(data));
            const url = `https://ipfs.infura.io/ipfs/${added.path}`;
            alert(url);
            const fee = await coreContract.collectionsFee();
            await coreContract.createCollection(items, nftsNumber, data.name, data.name.substring(0,3), data.price, data.royalty, url, false, {value: fee});
          } catch (error) {
            console.log('Error uploading file: ', error)
          }
    }
    const handleCurrencyChange = (e) => {
        setSelectedCurrency(e.target.value)
    }
  return (
    <div className='w-full h-screen flex flex-col justify-start items-center py-8'>
        <h2 className='text-3xl font-semibold mb-6'>Crea tu <span className='text-[#f00]'>Collection</span></h2>
        <div className={`${styles.form}`}>
            <div className='mb-4'>
            <TextField
                id="outlined-select-type"
                select
                label="Currency"
                value={selectedCurrency}
                onChange={handleCurrencyChange}
                helperText="Select your currency"
                variant="outlined"
                >
                {currency.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
            </TextField>
            </div>
            <div className='text-xl font-bold mb-12'>
                Total Fees: 0.5 BNB
            </div>
            <div>
            <Button className='ml-4 w-full' variant="contained"  onClick={e => handleSubmit(e)} style={{backgroundColor:'rgb(255, 63, 77)', color:'#fff'}}>
                Crear Colleccon
            </Button>
            </div>
        </div>
    </div>
  )
}

export default FinalUpload