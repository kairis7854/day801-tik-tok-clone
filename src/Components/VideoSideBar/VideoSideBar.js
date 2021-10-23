import React from 'react'
import HeartButton from '../HeartButton/HeartButton.js'
import ShareButton from '../ShareButton/ShareButton.js'
import ChatIcon from '@material-ui/icons/Chat'
import './VideoSideBar.css'

function VideoSideBar({likes,msgsLength,shares,id,setShowMessage}) {

  return (
    <div className='videoSideBar'>
      <HeartButton likes={likes} id={id}/>
      <div className="videoSideBar__button">
        <ChatIcon fontSize='large' onClick={()=>{setShowMessage('in')}}/>
        <p>{msgsLength}</p>
      </div>
      <ShareButton shares={shares}/>
    </div>
  )
}

export default VideoSideBar
