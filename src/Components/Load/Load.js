import React from 'react'

import './Load.css'

function Load({videoLoaded}) {

  const blocks = new Array(20).fill("").map((item,index)=>{
    return(
      <div className="Load__blocks" style={{transform:`rotate(${18 * index+1}deg)`,animationDelay:`${0.05*index}s`}} key={index}></div>
    )
  })

  return (
    <div className='Load' style={{display: videoLoaded ? 'none' : 'block'}}>
      {blocks}
      <p className='Load__title'>Loading</p>
    </div>
  )
}

export default Load
