import React,{useState,useEffect} from 'react'
import {addLikesArrayUnion} from '../../firebase'
import {LikesArrayRemove} from '../../firebase'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import './HeartButton.css'

function HeartButton({likes,id}) {
  const [liked,setLiked] = useState(false)
  const [likeNum,setLikeNum] = useState(likes.length)

  useEffect(()=>{
    const adminInfo = JSON.parse(localStorage.getItem('admin'))
    const res = likes.find((item,index)=>item === adminInfo.userName)
    setLiked(res ? true : false)
  },[likes])

  const setLike = (e) => {
    e.stopPropagation() 
    let adminInfo = JSON.parse(localStorage.getItem('admin'))
    if(liked === false){
      addLikesArrayUnion(id,adminInfo.userName)
      setLiked(true)
      setLikeNum(likeNum+1)
    } else {
      LikesArrayRemove(id,adminInfo.userName)
      setLiked(false)
      setLikeNum(likeNum-1)
    }
  }

  return (
    <div className='HeartButton'>
      <div className='HeartButton__inner' onClick={(e)=>{setLike(e)}}>
        {
          liked
            ? <FavoriteIcon fontSize='large'/>
            : <FavoriteBorderIcon fontSize='large'/>
        }
        <p>{likeNum}</p>
      </div>
    </div>
  )
}

export default HeartButton
