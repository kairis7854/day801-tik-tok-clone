import {useState,useEffect} from 'react'
import Video from './Components/Video/Video.js'
import { nanoid } from 'nanoid'
import {req_oEmbed} from './Api/api'
import {getVideos} from "./firebase"
import './App.css'

function App() {
  const [videos,setVideos] = useState([])
  const [showMessage,setShowMessage] = useState('padding')

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
        setVideos(newResult)
      } catch (error) {
        console.error(error)
      }
    }
    prepareData()
  }, [])

  return (
    <div className="App">
      <div 
        className='App__videos' 
        style={{overflowY:showMessage === 'in' ? 'hidden' : 'scroll' }} 
      >
      {
        videos.map((item,index)=>{
          return(
            <Video
              key={item.id}
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
