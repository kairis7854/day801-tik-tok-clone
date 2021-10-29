import React, { useContext } from 'react'
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import Ticker from 'react-ticker'
import { videoContext } from '../Video/Video.js'
import './VideoFooter.css' 

function VideoFooter() {
  const { author_name, title, song } = useContext(videoContext)

  return (
    <div className='videoFooter'>
      <div className="videoFooter__text">
        <h3>@{author_name}</h3>
        <p>{title}</p>
        <div className="videoFooter__ticker">
          <MusicNoteIcon className="videoFooter__icon"/>
          <Ticker mode='smooth'>
            {({ index }) => (
                <>
                  <p>{song}</p>
                </>
            )}
          </Ticker>
        </div>
      </div>
      <img 
        className='videoFooter__record' 
        src="https://static.thenounproject.com/png/934821-200.png" 
        alt="" 
      />
    </div>
  )
}

export default VideoFooter
