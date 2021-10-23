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

  const setLike = () => {
    let adminInfo = JSON.parse(localStorage.getItem('admin'))
    if(liked === false){
      adminInfo.liked = 'true'
      addLikesArrayUnion(id,adminInfo.userName)
      setLiked(true)
      setLikeNum(likeNum+1)
    } else {
      adminInfo.liked = 'false'
      LikesArrayRemove(id,adminInfo.userName)
      setLiked(false)
      setLikeNum(likeNum-1)
    }
    let str = JSON.stringify(adminInfo)
    localStorage.setItem('admin',str)
  }

  return (
    <div className='HeartButton'>
      {
        liked
          ? <FavoriteIcon fontSize='large' onClick={setLike}/>
          : <FavoriteBorderIcon fontSize='large' onClick={setLike}/>
      }
      <p>{likeNum}</p>
    </div>
  )
}

export default HeartButton
