import React, { useEffect, useState } from 'react';
import { Content } from '../../components/application/Content';
import { LeftMenu } from '../../components/application/LeftMenu';
import { AppScreensKeys, Components, ComponentsKeys, SessionStorageKeys } from '../../connector/AppConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { GetRequest } from '../../connector/APIsCommunicator';
import { APIsPath } from '../../connector/APIsPath';

export const ApplicationPage = (props) => {
    const params = useParams();
    const navigator = useNavigate();
    const [selected, setSelected] = useState(Components[0]);
    const [mydetails, setMyDetails] = useState({});
    const [reload, setReload] = useState(false);

    // ==============================================================

    useEffect(() => {
        setMyDetails(JSON.parse(localStorage.getItem("user")));
        if (mydetails._id) {
            getProfileApi();
        }
    }, []);


    // useEffect(() => {
    //     console.log("params0 = ", params);
    //     if (params.userId) {
    //         onSelected({ id: ComponentsKeys.USERPROFILE, title: "User Profile", icon: "" });
    //     }
    //     AuthContext.changeTabe = onSelected;
    //     var id = sessionStorage.getItem(SessionStorageKeys.ActiveMenu);
    //     if (id !== "") {
    //         setSelected(Components.filter((i) => i.id === id)[0])
    //     }
    // }, []);

    // useEffect(() => {
    //     if (props.currentpage === "userprofile") {
    //         onSelected({ id: ComponentsKeys.USERPROFILE, title: "User Profile", icon: "" });
    //     }
    // }, [props.currentpage]);


    const onSelected = (row) => {
        setSelected(row);
        // if (sessionStorage.getItem(SessionStorageKeys.ActiveMenu) !== "userprofile") {
        //     navigator(AppScreensKeys.Home);
        // }
        if (row.id === ComponentsKeys.HOME) {
            navigator(AppScreensKeys.Home + "/");
        }
        else if (row.id === ComponentsKeys.SEARCH) {
            navigator(AppScreensKeys.Home + "/" + ComponentsKeys.SEARCH);
        }
        else if (row.id === ComponentsKeys.EXPLORE) {
            navigator(AppScreensKeys.Home + "/" + ComponentsKeys.EXPLORE);
        }
        else if (row.id === ComponentsKeys.REELS) {
            navigator(AppScreensKeys.Home + "/" + ComponentsKeys.REELS);
        }
        else if (row.id === ComponentsKeys.MESSAGES) {
            navigator(AppScreensKeys.Home + "/" + ComponentsKeys.MESSAGES);
        }
        else if (row.id === ComponentsKeys.NOTIFICATIONS) {
            navigator(AppScreensKeys.Home + "/" + ComponentsKeys.NOTIFICATIONS);
        }
        else if (row.id === ComponentsKeys.CREATE) {
            navigator(AppScreensKeys.Home + "/" + ComponentsKeys.CREATE);
        }
        else if (row.id === ComponentsKeys.PROFILE) {
            navigator(AppScreensKeys.Home + "/" + ComponentsKeys.PROFILE + "/" + JSON.parse(localStorage.getItem("user"))?._id);
        }
        else if (row.id === ComponentsKeys.USERPROFILE) {
            navigator(AppScreensKeys.Home + "/" + ComponentsKeys.USERPROFILE + "/" + JSON.parse(localStorage.getItem("user"))?._id);
        }
        sessionStorage.setItem(SessionStorageKeys.ActiveMenu, row.id)
        setReload((ps) => !ps);
    }

    // ==============================================================

    const getProfileApi = () => {
        GetRequest(APIsPath.GetProfile + "/" + mydetails._id, {}, parseGetProfileResponse, parseGetProfileError);
    }

    const parseGetProfileResponse = (resObj) => {
        if (resObj.status) {
            setMyDetails(resObj.data.profile);
            localStorage.setItem("user", JSON.stringify(resObj.data.profile));
        }
    }

    const parseGetProfileError = (err) => {
        console.log("parseGetProfileError", err);
    }

    // ==============================================================

    return (
        <div className='application-page'>
            <LeftMenu onSelected={(row) => onSelected(row)} />
            <Content selected={selected} />
        </div>
    )
}
