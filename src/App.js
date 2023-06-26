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


export const App = () => {

    return (
        <React.Fragment>
         
                <Routes>
                    <Route exact path="/signup" element={<SignUpPage />} />
                    <Route exact path="/login" element={<LoginPage />} />
                    <Route path={AppScreensKeys.Home} element={<ApplicationPage />} />
                    <Route path={AppScreensKeys.Home + "/" + ComponentsKeys.STORYS} element={<ApplicationPage />} />
                    <Route path="/app/:userId" element={
                        <ApplicationPage currentpage="userprofile" />
                    } />
                    <Route exact path="/test" element={<Test />} />
                </Routes>
          
        </React.Fragment>
    )
}



