import React, { useContext } from 'react'
import { messageContext } from '../Video/Video.js'
import HeartButton from '../HeartButton/HeartButton.js'
import ShareButton from '../ShareButton/ShareButton.js'
import ChatIcon from '@material-ui/icons/Chat'
import './VideoSideBar.css'

function VideoSideBar({setShowMessage}) {
  const  msgs = useContext(messageContext)

  return (
    <div className='videoSideBar'>
      <HeartButton/>
      <div className="videoSideBar__button">
        <div  className="videoSideBar__button__inner" onClick={(e)=>{setShowMessage('in');e.stopPropagation(e)}}>
          <ChatIcon fontSize='large'/>
          <p>{ msgs ? msgs[0].length : 0}</p>
        </div>
      </div>
      <ShareButton/>
    </div>
  )
}

export default VideoSideBar
