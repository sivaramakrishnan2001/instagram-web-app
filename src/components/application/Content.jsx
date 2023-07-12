import React, { useEffect } from 'react';
import { AppScreensKeys, ComponentsKeys, LocalStorageKeys, SessionStorageKeys } from '../../connector/AppConfig';
import { Home } from '../home/Home';
import { Create } from '../create/Create';
import { Profile } from '../profile/Profile';
import { Message } from '../message/Message';
import { Search } from '../search/Search';
import { UserProfile } from '../userprofile/UserProfile';
import { Reels } from '../reels/Reels';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const Content = props => {


    const navigate = useNavigate();
    const [selectedid, setSelectedId] = useState("");
    const [reload, setReload] = useState(false);

    // ==============================================================

  

    useEffect(() => {
        console.log("props.selected.id", props.selected.id);

        if (props.selected && props.selected.id) {
            setSelectedId(props.selected.id);
        }

    }, [props.selected]);

    // ==============================================================
    // functions

    const getComponents = (id) => {
        switch (id) {
            case ComponentsKeys.HOME: return <Home />
            case ComponentsKeys.CREATE: return <Create />;
            case ComponentsKeys.PROFILE: return <UserProfile />;
            case ComponentsKeys.MESSAGES: return <Message />;
            case ComponentsKeys.SEARCH: return <Search />;
            case ComponentsKeys.USERPROFILE: return <UserProfile />;
            case ComponentsKeys.REELS: return <Reels />;
            default:
                break;
        }
    }

    // ==============================================================

    return (
        <div className='content'>
            {getComponents(selectedid)}
        </div>
    )
}


