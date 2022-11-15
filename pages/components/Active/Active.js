import React from 'react'
import styles from './Active.module.scss'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BsFillCartPlusFill } from 'react-icons/bs';

function Active() {
    const formatData = (data) => {
        return [] // code for formatting data
    }
    const fakeData = [
        {
            id:1,
            club:'Bored Ape Yatch Club',
            image:'https://static.wixstatic.com/media/0de4af_7d3a612c1b6647d09fe200072ca34fea~mv2.png',
            status:1,
            price: '0.32',
            quantity: '1',
            from: '0x0',
            to: '0x0',
            time:'2022-04-01 00:00:00',
        },
        {
            id:2,
            club:'Bored Ape Yatch Club',
            image:'https://static.wixstatic.com/media/0de4af_7d3a612c1b6647d09fe200072ca34fea~mv2.png',
            status:1,
            price: '0.32',
            quantity: '1',
            from: '0x0',
            to: '0x0',
            time:'2022-04-01 00:00:00',
        },
        {
            id:3,
            club:'Bored Ape Yatch Club',
            image:'https://static.wixstatic.com/media/0de4af_7d3a612c1b6647d09fe200072ca34fea~mv2.png',
            status:1,
            price: '0.32',
            quantity: '1',
            from: '0x0',
            to: '0x0',
            time:'2022-04-01 00:00:00',
        },
        {
            id:4,
            club:'Bored Ape Yatch Club',
            image:'https://static.wixstatic.com/media/0de4af_7d3a612c1b6647d09fe200072ca34fea~mv2.png',
            status:1,
            price: '0.32',
            quantity: '1',
            from: '0x0',
            to: '0x0',
            time:'2022-04-01 00:00:00',
        },
    ]
  return (
    <div className={`min-h-screen w-full flex flex-col py-4`}>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">
                <div className='text-md font-bold'>Item</div>
            </TableCell>
            <TableCell align="right"><div className='text-md font-bold'>Price</div></TableCell>
            <TableCell align="right"><div className='text-md font-bold'>Quantity</div></TableCell>
            <TableCell align="right"><div className='text-md font-bold'>From</div></TableCell>
            <TableCell align="right"><div className='text-md font-bold'>To</div></TableCell>
            <TableCell align="right"><div className='text-md font-bold'>Time</div></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {fakeData.map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                <BsFillCartPlusFill size={18}/>
              </TableCell>
              <TableCell align="right" width={160}>
                <div className='flex items-center justify-end'><img src={row.image} className="h-8 w-8 rounded object-cover" /> <span>{row.club}</span></div></TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.from}</TableCell>
              <TableCell align="right">{row.to}</TableCell>
              <TableCell align="right">{row.time}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default Active