import React,{useEffect,useRef,useState,useContext} from 'react'
import { videoContext, messageContext } from '../Video/Video';
import {addMessageArrayUnion,MessageArrayRemove} from '../../firebase'
import CloseIcon from '@material-ui/icons/Close';
import MessageIcon from '@material-ui/icons/Message';
import SendIcon from '@material-ui/icons/Send';
import './Message.css'

function Message({showMessage,setShowMessage}) {
  const { id, author_name, title } = useContext(videoContext)
  const [ messages, dispatch ] = useContext(messageContext)
  const ULRef = useRef(null)
  const [value,setValue] = useState('')
  const admin = localStorage.getItem('admin')
  const adminID = JSON.parse(admin).userName

  useEffect(()=>{ //設定評論由底部展示
    if (ULRef) {
      const scrollHeight = ULRef.current.scrollHeight
      const height = ULRef.current.clientHeight
      const maxScrollTop = scrollHeight - height
      ULRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0
    }
  })

  const addMessage = () => { //添加評論
    if( value === ''){
      alert('請輸入內容')
      return
    }
    if( value.length > 30){
      alert('內容不得超過30字')
      return
    }
    const now = new Date()　
    const msgId = now.getTime()
    addMessageArrayUnion(id,msgId,adminID,value)////firebase添加。videoID,訊息ID,用戶ID,訊息
    dispatch({ type: 'ADD_Message', payload: {id:msgId,auth:'訪客',user:adminID,msg:value}})
    setValue('')
  }

  const deleteMessage = (msgId,user,auth,msg) => { //刪除評論
    MessageArrayRemove(id,msgId,user,auth,msg)//firebase刪除。videoID,msgId,user,auth,msg
    dispatch({type: 'DELETE_Message', payload: {id:msgId}})
  }

  return (
    <div 
      className={`Message ${showMessage}`} 
      onClick={(e)=>{e.stopPropagation(e)}} 
      onTouchStartCapture={(e)=>{e.stopPropagation(e)}}
      onTouchMoveCapture={(e)=>{e.stopPropagation(e)}}
      onTouchEndCapture={(e)=>{e.stopPropagation(e)}}
    >      
      <div className="Message__top">
        <div className="Message__top__title">
          <p>{author_name}</p>
          <p>{title}</p>
        </div>
        <div className="Message__top__CloseButton" onClick={()=>{setShowMessage('out')}} >
          <CloseIcon  sx={{ fontSize: 25 }} />
        </div>
      </div>
      <ul className='Message__ul' ref={ULRef}>
        {
          messages 
            ? messages.map((item,index)=>{
              return(
                <li className={item.user === adminID ? 'Message__ul__li userLi' : 'Message__ul__li somebodyLi' } key={index}>
                  <div className='Message__ul__li__title' >
                    <p>{item.user === adminID ? '您 ' : null}{item.user}</p>
                    <p>{item.auth}</p>
                  </div>
                  <p className='Message__ul__li__content' >{item.msg}</p>
                  <div className='Message__ul__li__button' style={{display:item.user === adminID ? 'flex' : 'none' }}>
                    <div onClick={()=>{deleteMessage(item.id,item.user,item.auth,item.msg)}}>收回</div>
                  </div>
                </li>
              )
            })
            : null
        }
      </ul>
      <div className="Message__bottom">
        <MessageIcon fontSize='large'/>
        <input 
          className='Message__bottom__input' 
          type="text" 
          placeholder='添加公開評論' 
          onChange={(e)=>{setValue(e.target.value)}}
          value={value}
        />
        <div className="Message__bottom__send" onClick={addMessage}>
          <SendIcon fontSize='large'/>
        </div>
      </div>
    </div>
  )
}

export default Message
