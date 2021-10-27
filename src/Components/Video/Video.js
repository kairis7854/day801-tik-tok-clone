import React,{useRef,useState,useEffect} from 'react'
import VideoFooter from '../VideoFooter/VideoFooter.js'
import VideoSideBar from '../VideoSideBar/VideoSideBar.js'
import Message from '../Message/Message.js'
import Load from '../Load/Load.js'
import './Video.css'

function Video({ src, channel, description, song, likes, msgs, shares, id, showMessage, setShowMessage}) {
  const [playing,setPlaying] = useState(false)
  const [videoLoaded,setVideoLoaded] = useState(false)
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
        src={src}
        loop
        // controls
        ref={videoRef}
        onLoadStart={()=>{setVideoLoaded(false)}}
        onCanPlay={()=>{setVideoLoaded(true)}}
      ></video>
      <Load videoLoaded={videoLoaded}/>
      <VideoFooter channel={channel} description={description} song={song}/>
      <VideoSideBar likes={likes} msgsLength={msgs.length} shares={shares} id={id} setShowMessage={setShowMessage}/>
      <Message showMessage={showMessage} setShowMessage={setShowMessage} msgs={msgs} id={id} channel={channel} description={description}/>
    </div>
  )
}

export default Video
