import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

function Premium() {
    const [isPremium, setIsPremium] = useState(false)
    const language = useSelector(state => state.walletSlice.language)
    useEffect(() => {
      console.log("LANGUAGE CHANGE TO: ", language);
    }, [language]);
  return (
    <div className={`min-h-[70vh] flex flex-col justify-center items-center`}>
        <h2 className='text-center text-4xl font-bold mb-12'>{language && language === "es" ? "¿Quieres ser" : "Do you want to be"} <span className='text-[#FF3F4D]'>premium?</span></h2>
        <h4 className='text-xl text-center font-medium'>{language && language === "es" ? "Aplica en este" : "Apply in this"} <a className='text-[#FF3F4D] underline' href='https://docs.google.com/forms/d/e/1FAIpQLSdfRsKwBMDycg_FXCcHibvRf1tuT7PFAA03I8LdhQFEstsAdA/viewform' target="_blank" rel="noreferrer">{language && language === "es" ? "formulario" : "form"}</a> {language && language === "es" ? "y solicita tu verificación premium" : "and request your premium verification"} </h4>
    </div>
  )
}

export default Premium