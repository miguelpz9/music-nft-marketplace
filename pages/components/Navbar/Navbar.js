import { useEffect, useState, useContext } from 'react'
import styles from './Navbar.module.scss'
import { BiSearch } from 'react-icons/bi'
import { useRouter } from "next/router";
import { FaRegStar } from 'react-icons/fa'
import Link from 'next/link'
import { UserContext } from "../../../context/UserContext";
import { useSelector, useDispatch } from 'react-redux'
import { Button, Tooltip } from '@material-ui/core'
import { getUser } from "../../../utils/helpers";
import { setSearch, setSidebarOpen } from "../../../slices/walletSlice";

function Navbar(props) {
    const { connectWallet } = props
    const { isLoggedIn, isUserPremium, account } = useContext(UserContext);
    const router = useRouter();
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [user, setUser] = useState(null);
    const isSidebarOpen = useSelector(state => state.walletSlice.sidebarOpen)
    const dispatch = useDispatch()
    // const [searchText, setSearchText] = useState("");
    const searchText = useSelector(state => state.walletSlice.search)
    const language = useSelector(state => state.walletSlice.language)
    useEffect(() => {
      console.log("LANGUAGE CHANGE TO: ", language);
    }, [language]);
    //const [isUserPremium, setIsUserPremium] = useState(false)
    const hoverEffectEnter = (e) => {
        let menu = document.getElementById("exploraDropdown");
        menu.classList.add("showExploraMenu");
    }
    const hoverEffectLeave = (e) => {
        let menu = document.getElementById("exploraDropdown");
        menu.classList.remove("showExploraMenu");
    }
    const handleConnectWallet = () => {
        connectWallet();
    }
    const handleSearchChange = (e) => {
      dispatch(setSearch(e.target.value))
    }
    const hoverEffectEnterSide = (e) => {
      const timeout = setTimeout(() => {
        dispatch(setSidebarOpen(true));
      }, 500)
  
      return () => clearTimeout(timeout)
      
    };
    const hoverEffectLeaveSide = (e) => {
      //const timeout = setTimeout(() => {
        dispatch(setSidebarOpen(false));
      //}, 500)
  
      //return () => clearTimeout(timeout)
    };
    const handleCategoryOpen = (e) => {
        setIsCategoryOpen(true);
       }
       const handleCategoryClose = (e) => {
        setIsCategoryOpen(false);
       }

    const walletAddress = useSelector(state => state.walletSlice.walletAddress)
    const verified = useSelector(state => state.walletSlice.verified)
    const initialized = useSelector(state => state.walletSlice.initialized)

    useEffect(() => {
      const getUserr = async() => {
        console.log("ERRORSTACK", account);
        const USER = await getUser(account);
        console.log(USER);
        setUser(USER);
      }
      if(account){
        getUserr();
      }
    }, [account])

    useEffect(() => {
      if(searchText !== ""){
        router.push(`/search/${searchText}`)
      }
    }, [searchText])
    
    // useEffect(() => {
    //   console.log('verified: ', verified)
    //   setIsUserPremium(verified);
    // }, [verified])
    
    
  return (
    <nav className="w-full h-14 shadow-md bg-white fixed top-0 left-0 px-3 sm:flex hidden items-center justify-between z-10">
      <div onMouseEnter={hoverEffectEnterSide} onMouseLeave={hoverEffectLeaveSide}>
        {!isSidebarOpen ? <Link href="/">
          <img src="/icons/mainlogo.png" alt="logo" className={`${styles.logo} w-[40px]`} />
        </Link> : 
        <Link href="/">
          <img src="/images/banner.jpeg" alt="logo" className="w-[280px]" />
        </Link>}
      </div>
      <div className={isSidebarOpen ? `${styles.searchbar} relative -ml-[210px]` : `${styles.searchbar} relative`}>
        <input type="text" value={searchText} placeholder={language && language === "es" ? "Buscar" : "Search"} onChange={handleSearchChange}/>
        <div className="absolute right-2" style={{ top: "17.5%" }}>
          <BiSearch size={22} color={"#f00"} />
        </div>
      </div>
      <div className={`${styles.menu} flex justify-center items-center h-full`}>
        <div
          className={`relative h-full flex items-center`}
          onMouseEnter={hoverEffectEnter}
          onMouseLeave={hoverEffectLeave}
        >
          <div
            className="uppercase cursor-pointer"
            style={{ fontSize: "14px" }}
          >
            {language && language === "es" ? "Explora" : "Explore"}
          </div>
          <ul className={`${styles.downmenu} absolute`} id="exploraDropdown">
            <li className="hover:text-[#f00]">
              <Link href={"/"}>{language && language === "es" ? "Mercado" : "Marketplace"}</Link>
            </li>
            <li className="hover:text-[#f00]">
              <Link href={"/#artistcarousel"}>{language && language === "es" ? "Artistas" : "Artists"}</Link>
            </li>
            <li
              className="hover:text-[#f00] relative"
              onMouseEnter={handleCategoryOpen}
              onMouseLeave={handleCategoryClose}
            >
              {language && language === "es" ? "Categorías" : "Categories"}
              {isCategoryOpen && (
                  <ul className={`${styles.categoryList}`}>
                  <Link href="/category/banda"><li className={`${styles.categoryItem}`} > Banda </li></Link>
                  <Link href="/category/Metal"><li className={`${styles.categoryItem}`} > Metal </li></Link>
                  <Link href="/category/Reggaetón"><li className={`${styles.categoryItem}`} > Reggaetón </li></Link>
                  <Link href="/category/Rock"><li className={`${styles.categoryItem}`} > Rock </li></Link>
                  <Link href="/category/Bachata"><li className={`${styles.categoryItem}`} > Bachata </li></Link>
                  <Link href="/category/Jazz"><li className={`${styles.categoryItem}`} > Jazz </li></Link>
                  <Link href="/category/Soul"><li className={`${styles.categoryItem}`} > Soul </li></Link>
                  <Link href="/category/Reggae"><li className={`${styles.categoryItem}`} > Reggae </li></Link>
                  <Link href="/category/Ballenato"><li className={`${styles.categoryItem}`} > Ballenato </li></Link>
                  <Link href="/category/Clásico"><li className={`${styles.categoryItem}`} > Clásico </li></Link>
                  <Link href="/category/Salsa "><li className={`${styles.categoryItem}`} > Salsa </li></Link>
                  <Link href="/category/R&B"><li className={`${styles.categoryItem}`} > R&B </li></Link>
                  <Link href="/category/D&B "><li className={`${styles.categoryItem}`} > D&B </li></Link>
                  <Link href="/category/Baladas"><li className={`${styles.categoryItem}`} > Baladas </li></Link>
                  <Link href="/category/Gospel"><li className={`${styles.categoryItem}`} > Gospel </li></Link>
                  <Link href="/category/Merengue"><li className={`${styles.categoryItem}`} > Merengue </li></Link>
                  <Link href="/category/Electrónica"><li className={`${styles.categoryItem}`} > Electrónica </li></Link>
                  <Link href="/category/Rap"><li className={`${styles.categoryItem}`} > Rap </li></Link>
                  <Link href="/category/Rancheras"><li className={`${styles.categoryItem}`} > Rancheras </li></Link>
                  <Link href="/category/Country"><li className={`${styles.categoryItem}`} > Country </li></Link>
                  <Link href="/category/lofi"><li className={`${styles.categoryItem}`} > LOFI </li></Link>
                  <Link href="/category/opera"><li className={`${styles.categoryItem}`} > OPERA </li></Link>
                </ul>
                )}
            </li>
          </ul>
        </div>
        {isLoggedIn && (
          <Link href={`/user/${account}`}>
            <div className={`${styles.button} uppercase px-3 py-1`}>
              <Tooltip title={account} placement="top">
                <span>{account.substring(0, 15) + "..."}</span>
              </Tooltip>
            </div>
          </Link>
        )}
        {!account && (
          <Link href="/login">
            <div
              className={`${styles.button} uppercase cursor-pointer px-3 py-1`}
            >
              {language && language === "es" ? "CONECTAR CARTERA" : "CONNECT WALLET"}
            </div>
          </Link>
        )}
        <Link href="/create">
          <div
            className={`${styles.button2} uppercase cursor-pointer px-3 py-1`}
          >
            {language && language === "es" ? "CREAR" : "CREATE"}
          </div>
        </Link>
        {
          user?.isPremium && (
            <Link href="/createcollection">
            <div
              className={`${styles.button2} uppercase cursor-pointer px-3 py-1`}
            >
              {language && language === "es" ? "CREAR COLECCIÓN" : "CREATE COLLECTION"}
            </div>
          </Link>
          )
        }
        {
          !user?.isPremium && (
            <Link href="/premium">
            <div
              className={`${styles.redbutton} uppercase cursor-pointer px-4 py-1 flex items-center justify-center`}
            >
              <FaRegStar size={14} color={"#fff"} />
              <span className="ml-1">Premium</span>
            </div>
          </Link>
          )
        }
      </div>
    </nav>
  );
}

export default Navbar