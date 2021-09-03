// Import the functions you need from the SDKs you need
import firebase from "firebase";



    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
    
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyC7zRyq-25CtFvS99XhkwwrIPHIHtiX9P0",
      authDomain: "chattingapp-e0f71.firebaseapp.com",
      projectId: "chattingapp-e0f71",
      storageBucket: "chattingapp-e0f71.appspot.com",
      messagingSenderId: "800022958877",
      appId: "1:800022958877:web:cba5dcac065e46d54dc7f4",
      measurementId: "G-49QETPSDRD"
    };
    const firebaseApp = firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();
    const pr = new firebase.auth.FacebookAuthProvider();
    
    const db = firebaseApp.firestore();
    const analytics = firebase.analytics();
firebase.analytics().logEvent('notification_received');
    export { auth, provider,pr };
    export default db;
    
