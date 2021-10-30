import React,{useRef,useState,useEffect,useReducer } from 'react'
import VideoFooter from '../VideoFooter/VideoFooter.js'
import VideoSideBar from '../VideoSideBar/VideoSideBar.js'
import Message from '../Message/Message.js'
import Load from '../Load/Load.js'
import { messageReducer } from '../../Reducer/messageReducer.js'
import './Video.css'

export const videoContext = React.createContext(null) 
export const messageContext = React.createContext(null) 

function Video({ videoInfo, showMessage, setShowMessage}) {
  const [playing,setPlaying] = useState(false)
  const [videoLoaded,setVideoLoaded] = useState(false)
  const reducer = useReducer(messageReducer, videoInfo.msgs)
  const videoRef = useRef(null)

  useEffect(()=>{
    if(showMessage === 'in' && playing){
      videoRef.current.pause()
      setPlaying(false)
    }
  },[showMessage,playing])

  const onVideoPress = () => {
    if(playing){
      videoRef.current.pause()
      setPlaying(false)
    } else {
      videoRef.current.play()
      setPlaying(true)
    }
  }

  return (
    <div 
      className='video' 
      onWheel={()=>{videoRef.current.pause(); setPlaying(false)}} 
      onTouchMove={()=>{videoRef.current.pause(); setPlaying(false)}} 
      onClick={onVideoPress}
    >
      <video 
        className='video__player' 
        src={videoInfo.firebaseURL}
        loop
        // controls
        ref={videoRef}
        onLoadStart={()=>{setVideoLoaded(false)}}
        onCanPlay={()=>{setVideoLoaded(true)}}
      ></video>
      <messageContext.Provider value={reducer}>
        <videoContext.Provider value={videoInfo}>
          <Load videoLoaded={videoLoaded}/>
          <VideoFooter/>
          <VideoSideBar setShowMessage={setShowMessage}/>
          <Message showMessage={showMessage} setShowMessage={setShowMessage}/>
        </videoContext.Provider>
      </messageContext.Provider>
    </div>
  )
}

export default Video
