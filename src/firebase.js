import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { FirebaseConfig } from "./connector/AppConfig";

const firebaseConfig = {
    apiKey: FirebaseConfig.FireBase_ApiKey,
    authDomain: FirebaseConfig.FireBase_AuthDomain,
    projectId: FirebaseConfig.FireBase_ProjectId,
    storageBucket: FirebaseConfig.FireBase_StorageBucket,
    messagingSenderId: FirebaseConfig.FireBase_MessagingSenderId,
    appId: FirebaseConfig.FireBase_AppId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const Storage = getStorage(app, FirebaseConfig.BucketUrl);