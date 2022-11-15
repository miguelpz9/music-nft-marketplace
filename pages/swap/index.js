import { Box, Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { AiFillDollarCircle } from 'react-icons/ai';
import Select from 'react-select';
import styles from './Swap.module.scss'

function Swap() {
    const [tokenOne, setTokenOne] = useState()
    const [tokenTwo, setTokenTwo] = useState()
    const options = [
        {
          label: "BNB",
          value: "Todos",
          icon: <AiFillDollarCircle size={24} />,
        },
        {
          label: "MUZI",
          value: "Favoritos",
          icon: <AiFillDollarCircle size={24} />,
        },
      ];
      const customStyles = {
        control: (provided, state) => ({
          ...provided,
          border:'none',
          borderRight:'2px solid #FC8585',
          borderBottom:'2px solid #FC8585',
          borderTop:'2px solid #FC8585',
          height: "55px",
          borderRadius:'0px 5px 5px 0px',
          width:'120px',
          boxShadow: 'none',
          '&:hover': {
            borderRight:'2px solid #FC8585',
            borderBottom:'2px solid #FC8585',
            borderTop:'2px solid #FC8585',
          },
        }),
        option: (provided, state) => ({
          ...provided,
          color: state.isSelected ? 'white' : 'black',
          backgroundColor: state.isSelected ? 'navy' : 'white',
        }),
        dropdownIndicator: (provided, state) => ({
          ...provided,
          color: 'black',
        }),
        indicatorSeparator: (provided, state) => ({
          ...provided,
          display: 'none',
        }),
        singleValue: (provided, state) => {
          const opacity = state.isDisabled ? 0.5 : 1;
          const transition = 'opacity 300ms';
      
          return { ...provided, opacity, transition };
        },
        menu: (provided, state) => ({
            ...provided,
            width: '120px',
        })
      }
  return (
    <div className='h-[90vh] w-full relative flex flex-col justify-center items-center'>
        <div className='text-3xl font-bold mb-8'>
            Swap your <span className='text-[#f00]'>Tokens</span>
        </div>
        <div>
            <Box
            width={"500px"}
            maxWidth={"95vw"}
            bgcolor={"#fff"}
            boxShadow={"0px 10px 30px -5px rgba(231, 133, 252,0.2)"}
            height={"300px"}
            borderRadius={"10px"}
            maxHeight={"95vh"}
            padding={"40px 30px 35px 30px"}
            border={"1px solid #FDDDDD"}
            >
            <div className='w-full h-full flex flex-col justify-between relative'>
                <div className='w-full relative flex'>
                    <input className={`${styles.swapInput} w-[600px] px-4 rounded-l-[4px] outline-none text-xl text-[#888]`} type={"number"} placeholder='0.0'/>
                    <Select
                    options={options}
                    styles={customStyles}
                    value={tokenOne}
                    isSearchable={false}
                    onChange={(selectedvalue) => setTokenOne(selectedvalue)}
                    getOptionLabel={(e) => (
                        <div style={{ display: "flex", alignItems: "center" }}>
                        <div>{e.icon}</div>
                        <span style={{ marginLeft: 5, fontSize: 14 }}>{e.label}</span>
                        </div>
                    )}
                    />
                </div>
                <div className='w-full relative flex'>
                    <input className={`${styles.swapInput} w-[600px] px-4 rounded-l-[4px] outline-none text-xl text-[#888]`} type={"number"} placeholder='0.0'/>
                    <Select
                    options={options}
                    styles={customStyles}
                    value={tokenTwo}
                    isSearchable={false}
                    onChange={(selectedvalue) => setTokenTwo(selectedvalue)}
                    getOptionLabel={(e) => (
                        <div style={{ display: "flex", alignItems: "center" }}>
                        <div>{e.icon}</div>
                        <span style={{ marginLeft: 5, fontSize: 14 }}>{e.label}</span>
                        </div>
                    )}
                    />
                </div>
                <div>
                    <Button
                    style={{
                        width: "100%",
                        height: "50px",
                        backgroundColor: "#ff3f4d",
                        color: "#fff",
                    }}
                    >
                        Swap
                    </Button>
                </div>
            </div>
            </Box>
        </div>
    </div>
  )
}

export default Swap