import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, setDoc,
   doc, updateDoc, arrayUnion, arrayRemove, deleteDoc, deleteField  } from 'firebase/firestore/lite'; //無監聽，基本CRUD，用lite版本。
//import { getFirestore, doc, onSnapshot } from "firebase/firestore"; //監聽用firestore
import firebaseKey from './firebaseKey'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = firebaseKey

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//讀取，無監聽
export async function getVideos() {
  const VideosCol = collection(db, 'videos');
  const VideosSnapshot = await getDocs(VideosCol);
  const VideosList = VideosSnapshot.docs.map(doc => doc.data());
  return VideosList;
}

//寫入，增改合一指定欄位。注意:覆蓋指定欄位，若欄位值為數組，會覆蓋原數組
export async function setFirestoreLike(id,num) {
  try {
    const videoRef = doc(db, 'videos', id);
    await setDoc(videoRef, { likes: num }, { merge: true });
    console.log('setFirestoreLike:success');
  } catch (e) {
    console.error("Error : ", e);
  }
}

// Message欄位數組添加對象
export async function addMessageArrayUnion(id,msgId,adminID,value) { //videoID,訊息ID,用戶ID,訊息
  try {
    const addMessageRef = doc(db, "videos",id);
    await updateDoc(addMessageRef, {
      msgs: arrayUnion({auth:'訪客',id:msgId,msg:value,user:adminID})
    });
    console.log('addMessageArrayUnion:success');
  } catch (e) {
    console.error("Error : ", e);
  }
}

//Message欄位數組刪除對象
//Firestore 当前不支持仅使用该数组中元素的字段从数组中删除元素
//解決：arrayRemove值，该值必须与数组中的整个元素匹配
export async function MessageArrayRemove(id,msgId,user,auth,msg) { //videoID,msgId,user,auth,msg
  try {
    const messageRef = doc(db, "videos",id);
    await updateDoc(messageRef, {
    msgs: arrayRemove({'id':msgId,'user':user,'auth':auth,'msg':msg})
  });
    console.log('MessageArrayRemove:success');
  } catch (e) {
    console.error("Error : ", e);
  }
}

// likes欄位數組添加user
export async function addLikesArrayUnion(id,adminID) { //videoID，用戶ID
  try {
    const addMessageRef = doc(db, "videos",id);
    await updateDoc(addMessageRef, {
      likes: arrayUnion(adminID)
    });
    console.log('addMessageArrayUnion:success');
  } catch (e) {
    console.error("Error : ", e);
  }
}

// likes欄位數組刪除user
export async function LikesArrayRemove(id,adminID) {
  try {
    const likesRef = doc(db, "videos",id);
    await updateDoc(likesRef, {
    likes: arrayRemove(adminID)
  });
    console.log('videoArrayRemove:success');
  } catch (e) {
    console.error("Error : ", e);
  }
}

export default db