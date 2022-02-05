import {useState,useEffect,useRef} from 'react'
import Video from './Components/Video/Video.js'
import { nanoid } from 'nanoid'
import {req_oEmbed} from './Api/api'
import {getVideos} from "./firebase"
import useWindowDimensions from './Tool/getWindowDimensions.js'
import './App.css'

function App() {
  const [videos,setVideos] = useState([])
  const [showMessage,setShowMessage] = useState('padding')
  const videoRef = useRef()
  const { height } = useWindowDimensions();


  useEffect(()=>{ //從localStorage取數據
    // window.localStorage.removeItem("admin"); 
    let admin = localStorage.getItem('admin') ? localStorage.getItem('admin') : null
    if(!admin){
      const adminInfo = {userName:nanoid()}
      let str = JSON.stringify(adminInfo)
      localStorage.setItem('admin',str)
    }
  },[])

  useEffect(() => { //從firebase、oEmbed取數據
    const prepareData = async() => {
      try {
        let result = await getVideos()
        let newResult = await Promise.all(result.map(async(item,index)=>{
          let oEmbedData = await req_oEmbed(item.tiktokURL)
          return {...oEmbedData,...result[index]}
        }))

        //準備輪播數組
        newResult.push(newResult[0])
        newResult.unshift(newResult[newResult.length -2])

        setVideos(newResult)
      } catch (error) {
        console.error(error)
      }
    }
    prepareData()
  }, [])

  useEffect(()=>{ //設置影片初始位置
    if(videos && videos.length){ 
      let fitstHeight = videoRef.current.scrollHeight/videos.length
      videoRef.current.scrollTop = fitstHeight
    }
  },[videos])

  useEffect(()=>{ //設置無限下滑
    let myVideoRef = videoRef
    let round = 0
    let startY = Number

    let scrollRule = (e) => {
      let totalHeight = myVideoRef.current.scrollHeight
      let nodeHeight = myVideoRef.current.scrollHeight/videos.length
      let videoScrollTop = myVideoRef.current.scrollTop
      if(round === 0 && nodeHeight > videoScrollTop){
        e.preventDefault();
        myVideoRef.current.scrollTop = nodeHeight
        return false
      }
      if(videoScrollTop === totalHeight-nodeHeight){
        myVideoRef.current.scrollTop = nodeHeight
        round++
      }
      if(videoScrollTop === 0){
        myVideoRef.current.scrollTop = totalHeight-nodeHeight*2
        round--
      }
    }

    //---------------移動端規則start--------------------
    let touchStart = (e) => {
      startY = e.touches[0].pageY;
    }
    let touchMove = (e) => {
      let nodeHeight = myVideoRef.current.scrollHeight/videos.length
      let videoScrollTop = myVideoRef.current.scrollTop
      let spanY = e.changedTouches[0].pageY - startY
      if(round === 0 && nodeHeight >= videoScrollTop && spanY > -30){
        e.preventDefault();
      }
    }
    let touchEnd = (e) => {
      let nodeHeight = myVideoRef.current.scrollHeight/videos.length
      let videoScrollTop = myVideoRef.current.scrollTop
      let spanY = e.changedTouches[0].pageY - startY
      if(round === 0 && nodeHeight > videoScrollTop && spanY > -30){
        e.preventDefault();
      }
    }
    //---------------移動端規則end--------------------
    myVideoRef.current.addEventListener('scroll',scrollRule)
    myVideoRef.current.addEventListener('touchstart', touchStart, false); 
    myVideoRef.current.addEventListener('touchmove', touchMove, false); 
    myVideoRef.current.addEventListener('touchend', touchEnd, false); 
    return(()=>{
      myVideoRef.current.removeEventListener('scroll',scrollRule)
      myVideoRef.current.removeEventListener('touchstart', touchStart, false); 
      myVideoRef.current.removeEventListener('touchmove', touchMove, false); 
      myVideoRef.current.removeEventListener('touchend', touchEnd, false); 

    })
  },[videos])

  return (
    <div className="App" style={{height:height}}>
      <div 
        className='App__videos' 
        style={{overflowY:showMessage === 'in' ? 'hidden' : 'scroll'}} 
        ref={videoRef}
      >
      {
        videos.map((item,index)=>{
          return(
            <Video
              key={index}
              videoInfo={item}
              showMessage={showMessage}
              setShowMessage={setShowMessage}
            />
          )
        })
      }
      </div>
    </div>
  )
}

export default App
