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
// import { getTokenFromFirebase } from './firebase';
// import './firebase';
import "./messaging_init_in_sw";


export const App = () => {

    useEffect(() => {

    }, []);



    return (
        <React.Fragment>
            <Routes>

                <Route exact path="/signup" element={<SignUpPage />} />
                <Route exact path="/login" element={<LoginPage />} />
                <Route exact path={AppScreensKeys.Home} element={<ApplicationPage />} />
                <Route exact path={AppScreensKeys.Home + "/" + ComponentsKeys.STORYS} element={<ApplicationPage />} />
                <Route exact path={AppScreensKeys.Home + "/" + ComponentsKeys.SEARCH} element={<ApplicationPage />} />
                <Route exact path={AppScreensKeys.Home + "/" + ComponentsKeys.EXPLORE} element={<ApplicationPage />} />
                <Route exact path={AppScreensKeys.Home + "/" + ComponentsKeys.REELS} element={<ApplicationPage />} />
                <Route exact path={AppScreensKeys.Home + "/" + ComponentsKeys.MESSAGES} element={<ApplicationPage />} />
                <Route exact path={AppScreensKeys.Home + "/" + ComponentsKeys.NOTIFICATIONS} element={<ApplicationPage />} />
                <Route exact path={AppScreensKeys.Home + "/" + ComponentsKeys.PROFILE + "/:userId"} element={<ApplicationPage />} />
                <Route exact path={AppScreensKeys.Home + "/" + ComponentsKeys.CREATE} element={<ApplicationPage />} />
                <Route exact path={AppScreensKeys.Home + "/" + ComponentsKeys.USERPROFILE + "/:userId"} element={
                    <ApplicationPage currentpage="userprofile" />
                } />
                <Route exact path="/test" element={<Test />} />
                <Route exact path="*" element={<div>Not found Error Blank Page</div>} />
            </Routes>

        </React.Fragment>
    )
}



