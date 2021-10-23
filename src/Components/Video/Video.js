import React,{useRef,useState,useEffect} from 'react'
import VideoFooter from '../VideoFooter/VideoFooter.js'
import VideoSideBar from '../VideoSideBar/VideoSideBar.js'
import Message from '../Message/Message.js'
import './Video.css'

function Video({ src, channel, description, song, likes, msgs, shares, id, showMessage ,setShowMessage }) {
  const [playing,setPlaying] = useState(false)
  const videoRef = useRef(null)
  useEffect(()=>{
    if(showMessage === 'in'){
      videoRef.current.pause()
      setPlaying(false)
    }
    if(showMessage === 'out'){
    }
  },[showMessage])

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
    <div className='video'>
      <video 
        className='video__player' 
        src={src}
        loop
        // controls
        ref={videoRef}
        onClick={onVideoPress}
      ></video>
      <VideoFooter channel={channel} description={description} song={song}/>
      <VideoSideBar likes={likes} msgsLength={msgs.length} shares={shares} id={id} setShowMessage={setShowMessage}/>
      <Message showMessage={showMessage} setShowMessage={setShowMessage} msgs={msgs} id={id}/>
    </div>
  )
}

export default Video
