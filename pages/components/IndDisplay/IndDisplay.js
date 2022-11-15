import {useState} from 'react'
function IndDisplay(props) {
    const { data } = props
    const [play, setPlay] = useState(false);
    const handleAudioPlay = () => {
        setPlay(true)
        let audio = document.getElementById('special-audio')
        if(!play){
            audio.play()
            setPlay(true)
        }
        else{
            audio.pause()
            setPlay(false)
        }
    }
  return (
    <div className={`w-full flex justify-center items-start`}>
        <div className={`sm:w-[80%] w-full relative h-[80vh] rounded-[10px] shadow-lg bg-white overflow-hidden`}>
            {
                data?.type === 'image' && (
                    <img src={data?.coverImage} className="h-full w-full object-cover" />
                )
            }
            {/*
                data.type === 'media' && (
                    <video src={data.media} className="h-full w-full object-cover" controls />
                )
            */}
            {
                data?.type === 'audio' && (
                    <>
                        <img src={data?.coverImage} className="h-full w-full object-cover absolute top-0 left-0" onClick={handleAudioPlay} />
                        <audio src={data?.media} className="absolute bottom-0 left-0 w-full" controls id="special-audio" onPlay={() => setPlay(true)} onPause={() => setPlay(false)} />
                    </>
                )
            }
            {
                data?.type === 'video' && (
                    <>
                        <video className='h-full w-full absolute top-0 left-0' autoPlay controls>
                            <source src={data?.media} />
                        </video>
                    </>
                )
            }
        </div>
    </div>
  )
}
export default IndDisplay