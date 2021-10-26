import React from 'react'
import ShareIcon from '@material-ui/icons/Share'
import './ShareButton.css'

function ShareButton({shares}) {

  const share = (e) => {
    e.stopPropagation() 
    window.open ('https://www.facebook.com/sharer/sharer.php?kid_directed_site=0&u=https%3A%2F%2Ftik-tok-clone-4dce5.web.app%2F&display=popup&ref=plugin&src=share_button', 'newwindow', 'height=100, width=400, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no')
  }

  return (
    <div className="ShareButton">
      <div className="ShareButton__ICON" onClick={(e)=>{share(e)}}>
         <ShareIcon fontSize='large' />
      </div>
    </div>
  )
}

export default ShareButton
