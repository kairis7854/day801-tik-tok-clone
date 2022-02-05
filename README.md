# 抖音

## DEMO
連結：https://tik-tok-clone-4dce5.web.app/

## 筆記：Firebase 專案創建相關
Firebase隨時間更新，版本操作介面使用上會有所差異，關鍵字較沒什麼變化，
這裡紀錄使用關鍵字來創建專案，其他如：資料庫存放位置，依個人喜好設定。
進入官網：https://firebase.google.com/

第一步：官網首頁>尋找點擊console>建立專案(輸入專案名稱)>continue>continue>create project(輸入名稱)\
第二步：官網首頁>尋找</>圖標(網頁項目) >continue>continue\
第三步：官網首頁>尋找齒輪圖標(專案設定) >尋找SDK設定和配置(專案金鑰，這裡提供傳統和模塊化引入方式，依個人喜好使用，金鑰後面用到)

## 筆記：Firebase 代碼相關
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
 
## 筆記：Firebase Hosting相關
第 1 步：安装 Firebase CLI \
開新終端機 主磁碟系統管理身分 \
npm install -g firebase-tools \
firebase login 詢問是否提供資料 選NO \
選擇GOOGLE帳戶登入 \
複製授權碼 回終端機貼上 返回 +  Success! Logged in as your@gmail.com \
補充：若要取消 firebase logout your@gmail.com 

第 2 步：初始化您的项目 \
開新終端機 項目根目錄下 \
firebase init hosting\
? Are you ready to proceed? Yes\
? Please select an option: (Use arrow keys)
> Use an existing project (選這個，已存在repo)\
  Create a new project\
  Add Firebase to an existing Google Cloud Platform project \
  Don't set up a default project 

? Please select an option: Use an existing project \
? Select a default Firebase project for this directory: tik-tok-clone-4dce5 (tik-tok-clone) \
? What do you want to use as your public directory? build (修改成build，你只想託管) \
? Configure as a single-page app (rewrite all urls to /index.html)? Yes \
? Set up automatic builds and deploys with GitHub? No \
npm run-script build

第 3 步：部署到您的网站 \
firebase deploy --only hosting 


## 筆記：滾輪、冒泡相關
CSS：\
touch-action: none;　//用於移動端，電腦版無效。阻止觸碰滑動，對ul無效\
overscroll-behavior: none; //用於移動端、電腦版。阻止滾輪事件冒泡傳遞，對無滾輪組件無效

JS：\
react冒泡事件是註冊在document上，當原生冒泡事件傳遞到document後，react捕獲再派發給react組件，因此產生些問題
```js
const MessageOnWheel = (e) => {
  e.stopPropagation(); //阻止冒泡，react處理冒泡的主要方法，無法阻止原生事件冒泡
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

## 筆記：try catch相關
try catch 除了處理錯誤，也可以用來為函數定義第二種方法

```js
var toArray = function(s){
    //try语句允许我们定义在执行时进行错误测试的代码块。
   //catch 语句允许我们定义当 try 代码块发生错误时，所执行的代码块。
    try{
        return Array.prototype.slice.call(s);
    } catch(e){
        var arr = [];
        for(var i = 0,len = s.length; i < len; i++){
            //arr.push(s[i]);
               arr[i] = s[i];  //据说这样比push快
        }
         return arr;
    }
}
```
## 筆記：scroll-snap-type延伸
scroll-snap-typed是CSS語法，他有強大的功能，可以不靠JS製作輪播圖幻燈片等等，但也有缺點那就是API還不夠完善，
需要靠JS完成相關任務。\
需求：為使用scroll-snap-type的組件，設置任務，如高亮當前組件\
問題：scroll-snap-type沒有相關語法\
解決：使用JS
```js
function App() {
  const [currentVideo,setCurrentVideo] = useState(1)
  const videosRef = useRef()
  
  const onVideoScroll = (e) => { //獲取當前視頻位置
    let arr = []
    arr.slice.call(e.target.children).forEach(function (item, index) {
      if (Math.abs(item.getBoundingClientRect().top - e.target.getBoundingClientRect().top) < 10) {
        //功能代碼
      } 
    });
  }

  return (
    <div>
      <div 
        onScroll={(e)=>{onVideoScroll(e)}}
        ref={videosRef}
      >
        {
          //xxx.map(()=>{return <div></div>})...
        }
      </div>
    </div>
  )
}
```
參考：https://www.gushiciku.cn/pl/21XG/zh-tw

## 筆記：git相關
問題：已經上傳的檔案，無法使用gitignore取消版本控制\
解決：\
git rm -r --cached 檔案路徑\
git add .\
git commit\
git push

參考：https://blog.csdn.net/themagickeyjianan/article/details/55519111?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_title~default-1.no_search_link&spm=1001.2101.3001.4242.2

參考：https://blog.csdn.net/ai_xm/article/details/84190138

## 筆記：git相關
問題：未上傳情況下，給commit添加小更改\
使用：git reset --soft HEAD~1\
git reset 指令可以搭配參數使用，常見三種參數，分別是 --mixed、--soft 以及 --hard
mixed 模式。預設的參數。這個模式會把暫存區的檔案丟掉，但不會動到工作目錄的檔案，也就是說 Commit 拆出來的檔案會留在工作目錄，但不會留在暫存區。
soft 模式。這個模式下，工作目錄跟暫存區的檔案都不會被丟掉，所以看起來就只有 HEAD 的移動而已。也因此，Commit 拆出來的檔案會直接放在暫存區。
hard 模式。這個模式下，不管是工作目錄以及暫存區的檔案都會丟掉。
參考：https://www.maxlist.xyz/2020/05/03/git-reset-checkout/
參考：https://gitbook.tw/chapters/using-git/reset-commit.html

## 筆記：React移動端上自適應屏幕寬高
和原生處理方式一樣，使用innerWidth，上代碼
```js
//getWindowDimensions.js
import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
```
引入
```js
//目標組件
const Component = () => {
  const { height, width } = useWindowDimensions();

  return (
   
      width: {width} ~ height: {height}
   
  );
}
```
參考：https://www.codenong.com/36862334/ \
參考：https://tools.wingzero.tw/article/sn/225

## 筆記：React移動端觸控相關
需求：禁止移動端輪播圖在第一輪時向上滑動\
React本身有自己的事件處理，這裡使用了Ref調用了原生方法。

```js
  useEffect(()=>{ //設置無限下滑
    let myVideoRef = videoRef
    let round = 0
    let startY = Number

    let scrollRule = (e) => { //PC端
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
```
參考：https://www.itread01.com/content/1547211091.html










