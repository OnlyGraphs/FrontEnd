import Head from 'next/head'
import Image from 'next/image'
import * as React from 'react';
import ReactDOM from 'react-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import logo from '../public/tempLogo.jpg';


export default function Home() {
  return (
    <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
      <Image src={logo} width='500' height={456}></Image>
      <br></br>
      <TextField fullWidth id="outlined-basic" variant="outlined" />
      <Button variant="contained">Search</Button>
    </div>
  )
}
