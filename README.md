# 抖音

## 功能

## 筆記：firebase
官網：https://console.firebase.google.com/
```js
//引入
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, setDoc,
   doc, updateDoc, arrayUnion, arrayRemove, deleteDoc, deleteField  } from 'firebase/firestore/lite'; //無監聽，基本CRUD，用lite版本。
//import { getFirestore, doc, onSnapshot } from "firebase/firestore"; //監聽用firestore

//金鑰
const firebaseConfig = {
  apiKey: "",
  authDomain: "tik-tok-clone-4dce5.firebaseapp.com",
  projectId: "tik-tok-clone-4dce5",
  storageBucket: "tik-tok-clone-4dce5.appspot.com",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

//創建db
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//--------------操作start-----------------
//讀取，無監聽
// export async function getVideos() {
//   const VideosCol = collection(db, 'videos');
//   const VideosSnapshot = await getDocs(VideosCol);
//   const VideosList = VideosSnapshot.docs.map(doc => doc.data());
//   return VideosList;
// }

// 寫入。vidoes集合中添加文檔
// export async function add() {
//   try {
//     const docRef = await addDoc(collection(db, "videos"), {
//       first: "Ada",
//       last: "Lovelace",
//       born: 1815,
//       likes:[1,2,3]
//     });
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }
// add()

// 寫入，增改合一。注意：會覆蓋原文檔。
// export async function setVidos() {
//   try {
//     await setDoc(doc(db, "videos", "LA"), {
//       name: "Los Angeles",
//       likes: [1,2,3],
//       country: "USA"
//     })
//     console.log("setVidos:success");
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }
// setVidos()

// 寫入，增改合一指定欄位。注意:覆蓋指定欄位，若欄位值為數組，會覆蓋原數組
// export async function setSelect() {
//   try {
//     const LARef = doc(db, 'videos', 'LA');
//     await setDoc(LARef, { likes: [4] }, { merge: true });
//     console.log('setSelect:success');
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }
// setSelect()

// 更新，注意：覆蓋指定欄位，若欄位值為數組，會覆蓋原數組
// export async function update() {
//   try {
//     const updateRef = doc(db, "videos", "LA");
//     await updateDoc(updateRef, {
//       likes: [4]
//     });
//     console.log('updateDoc:success');
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }
// update()

// 更新，指定欄位數組添加新值
// export async function videoArrayUnion() {
//   try {
//     const likesRef = doc(db, "videos", "LA");
//     await updateDoc(likesRef, {
//       likes: arrayUnion(4)
//   });
//     console.log('videoArrayUnion:success');
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }
// videoArrayUnion()

// 更新，指定欄位數組刪除指定值
// export async function videoArrayRemove() {
//   try {
//     const likesRef = doc(db, "videos", "LA");
//     await updateDoc(likesRef, {
//     likes: arrayRemove(4)
//   });
//     console.log('videoArrayRemove:success');
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }
// videoArrayRemove()

//刪除文檔
// export async function remove() {
//   try {
//     await deleteDoc(doc(db, "videos", "LA"));
//     console.log("deleteDoc: ",'success');
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }
// remove()

//刪除欄位
// export async function remove() {
//   try {
//     const LARef = doc(db, 'videos', 'LA');
//     await updateDoc(LARef, {
//       likes: deleteField()
//   });
//     console.log("deleteField: ",'success');
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }
// remove()

//讀取，監聽
// const getSnapshot = onSnapshot(doc(db, "videos",'6lfVBTvO9wyaoVMLA4Bs'), (doc) => {
//   //const source = doc.metadata.hasPendingWrites ? "Local" : "Server"; //监听器接收到的事件的来源
//   console.log("Current data: ", doc.data());
// });
//--------------操作end-----------------

//曝露db
export default db
```
 
## 筆記：滾輪、冒泡相關
CSS：\
touch-action: none;　//用於移動端，電腦版無效。阻止觸碰滑動，對ul無效
overscroll-behavior: none; //用於移動端、電腦版。阻止滾輪事件冒泡傳遞，對無滾輪組件無效

JS：\
react冒泡事件是註冊在document上，當原生冒泡事件傳遞到document後，react捕獲再派發給react組件，因此產生些問題
```js
const MessageOnWheel = (e) => {
  e.stopPropagation();  //阻止冒泡，無法阻止原生事件冒泡
  e.nativeEvent.stopImmediatePropagation(); //e.nativeEvent調用原生方法，阻止原生冒泡，結果react捕獲不到document冒泡事件
}
```
```js
useEffect(() => {  //阻止滾輪默認行為
  //問題：The ref value 'MessageRef.current' will likely have changed by the time 
  // this effect cleanup function runs. If this ref points to a node rendered by React, 
  // copy 'MessageRef.current' to a variable inside the effect, and use that variable 
  // in the cleanup function  react-hooks/exhaustive-deps
  //解決：將 ref 值保存到要在效果的清理函數中關閉的局部範圍變量
  //-------------------------start-------------------------
  let MessageTopRefValue = null
  let MessageBottomRefValue = null
  MessageTopRefValue = MessageTopRef.current
  MessageBottomRefValue = MessageBottomRef.current
  //-------------------------end---------------------------
  const cancelWheel = (event) => event.preventDefault()
  //問題：為了效能瀏覽器關閉 preventDefault() 效果
  //解決：使用原生監聽在第三參數配置 {passive: false} ，告訴瀏覽器這裡有使用 preventDefault() 
  MessageTopRefValue.addEventListener('wheel', cancelWheel, {passive: false})
  MessageBottomRefValue.addEventListener('wheel', cancelWheel, {passive: false})
  return () => {
    MessageTopRefValue.removeEventListener('wheel', cancelWheel)
    MessageBottomRefValue.removeEventListener('wheel', cancelWheel)
  }
}, []);
```

## 筆記：社群分享按鈕 (FB)
FB開發官網給的"分享按鈕"代碼是html格式，而react不支援解析html，需要另外安裝loader，否則會出現警告
```js
 Module parse failed: Unexpected token (1:0) You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
```
解決：\
1.安裝依賴\
2.使用 iframe 引入資源，此方法不用安裝依賴
```js
  //創建shareFB.js文件
  //線上壓縮 https://c.runoob.com/front-end/47/
  const html = '壓縮的html代碼'
  export default html

  //目標組件引入
  import data from '../../HTML/shareFB.js'

  <iframe
    title="resg"
    srcDoc={data}
    style={{ width: '100%', border: '0px', height: '1100px' }}
    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
    scrolling="auto"
  />
  //注意srcDoc引入的不是路徑，而是壓縮後的html代碼
```
3.從官網製作，分兩種：JS SDK版本與 iframe 標籤版本(方法2類似)
連結：https://developers.facebook.com/docs/plugins/share-button?locale=zh_TW#

4.把連結取出，另外設置點擊事件打開連結

參考：https://blog.csdn.net/qq_38519358/article/details/100667730?spm=1001.2101.3001.6650.2&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-2.no_search_link&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-2.no_search_link