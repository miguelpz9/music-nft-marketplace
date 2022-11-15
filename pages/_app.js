import '../styles/globals.css'
import { Web3ReactProvider } from "@web3-react/core";
import { Toaster } from "react-hot-toast";
import { store } from '../store'
import { ethers } from "ethers";
import { Provider } from 'react-redux'
import Layout from './Layout/Layout'
import Head from 'next/head'
import { UserContextProvider } from "../context/UserContext";

const getLibrary = (provider) => new ethers.providers.Web3Provider(provider);

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <UserContextProvider>
          <Layout>
            <Toaster />
            <Head>
              <title>NFTDEMUSICA.COM</title>
            </Head>
            <Component {...pageProps} />
          </Layout>
        </UserContextProvider>
      </Provider>
    </Web3ReactProvider>
  )
}

export default MyApp
