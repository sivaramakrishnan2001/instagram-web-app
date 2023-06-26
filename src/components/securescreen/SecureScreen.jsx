import React from 'react'
import { Navigate } from 'react-router-dom';
import { AppScreensKeys, LocalStorageKeys } from '../../connector/AppConfig';

export const SecureScreen = ({ children }) => {
  if (!LocalStorageKeys.token) {
    // not logged in so redirect to login page with the return url
    return <Navigate to={AppScreensKeys.Login} />
  }

  // authorized so return child components
  return children;
}
