    // Import the functions you need from the SDKs you need
    import { initializeApp } from "firebase/app";
    import { getFirestore } from "firebase/firestore";

    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    const firebaseConfig = {
    apiKey: "AIzaSyCg0QN8RTNU-L9RWe9eXCBnZxjBAvsfJ0g",
    authDomain: "painel-tinettec-6d015.firebaseapp.com",
    projectId: "painel-tinettec-6d015",
    storageBucket: "painel-tinettec-6d015.firebasestorage.app",
    messagingSenderId: "766608115757",
    appId: "1:766608115757:web:d70516e7e1f71cad9010a4"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    export { db };
    
