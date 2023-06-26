import React, { useEffect, useState } from 'react';
import { Content } from '../../components/application/Content';
import { LeftMenu } from '../../components/application/LeftMenu';
import { AppScreensKeys, Components, ComponentsKeys, SessionStorageKeys } from '../../connector/AppConfig';
import { useNavigate, useParams } from 'react-router-dom';

export const ApplicationPage = (props) => {
    const params = useParams();
    const navigator = useNavigate();
    const [selected, setSelected] = useState(Components[0]);
    const [reload, setReload] = useState(false);

    // ==============================================================

    useEffect(() => {
        if (params.userId) {
            onSelected({ id: ComponentsKeys.USERPROFILE, title: "User Profile", icon: "" });
        }

        
    }, [params.userId]);


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
        sessionStorage.setItem(SessionStorageKeys.ActiveMenu, row.id)
        setReload(!reload);
    }

    // ==============================================================

    return (
        <div className='application-page'>
            <LeftMenu onSelected={(row) => onSelected(row)} />
            <Content selected={selected} />
        </div>
    )
}
