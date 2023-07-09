import React, { useEffect } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { Test } from './components/test/Test';
import { UserProfile } from './components/userprofile/UserProfile';
import { ApplicationPage } from './screens/application/ApplicationPage';
import { LoginPage } from './screens/authentication/login/LoginPage';
import { SignUpPage } from './screens/authentication/signup/SignUpPage';
import { SecureScreen } from './components/securescreen/SecureScreen';
import { AppScreensKeys, ComponentsKeys } from './connector/AppConfig';
import { GetDeviceToken, firebaseConfig, requestPermission } from './firebase.js';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

export const App = () => {

    useEffect(() => {
        console.log("process.env.BaseUrl", process.env.REACT_APP_BASE_URL);
        // requestPermission();
    }, []);

    const requestPermission = async () => {
        console.log('Requesting permission...');
        let permission = await Notification.requestPermission();
        let token = await getToken(initializeApp(firebaseConfig), { vapidKey: 'BIZrWojodZgcZMYOMkBR5VnKrFtc_4nEGx1j6m2BeO9PFyKzb9AfQpNCNwekGp4_HiAkzhR5pQFMvd3oJjxj2E4' });
        console.log("token", token);
        if (permission && permission === 'granted') {
            if (token) {
                console.log("token", token);
            } else {
                console.log("con't get token");
            }

        } else {
            console.log("you not allow notifiction");
        }
    }


    return (
        <React.Fragment>
            <div>Test</div>
            <Routes>
                
                <Route exact path="/signup" element={<SignUpPage />} />
                <Route exact path="/login" element={<LoginPage />} />
                <Route path={AppScreensKeys.Home} exact element={<ApplicationPage />} />
                <Route path={AppScreensKeys.Home + "/" + ComponentsKeys.STORYS} element={<ApplicationPage />} />
                <Route path={AppScreensKeys.Home + "/" + ComponentsKeys.SEARCH} element={<ApplicationPage />} />
                <Route path={AppScreensKeys.Home + "/" + ComponentsKeys.EXPLORE} element={<ApplicationPage />} />
                <Route path={AppScreensKeys.Home + "/" + ComponentsKeys.REELS} element={<ApplicationPage />} />
                <Route path={AppScreensKeys.Home + "/" + ComponentsKeys.MESSAGES} element={<ApplicationPage />} />
                <Route path={AppScreensKeys.Home + "/" + ComponentsKeys.NOTIFICATIONS} element={<ApplicationPage />} />
                <Route path={AppScreensKeys.Home + "/" + ComponentsKeys.PROFILE + "/:userId"} element={<ApplicationPage />} />
                <Route path={AppScreensKeys.Home + "/" + ComponentsKeys.CREATE} element={<ApplicationPage />} />
                <Route path={AppScreensKeys.Home + "/" + ComponentsKeys.USERPROFILE + "/:userId"} element={
                    <ApplicationPage currentpage="userprofile" />
                } />
                <Route exact path="/test" element={<Test />} />
                <Route exact path="*" element={<div>Not found Error Blank Page</div>} />
            </Routes>

        </React.Fragment>
    )
}



