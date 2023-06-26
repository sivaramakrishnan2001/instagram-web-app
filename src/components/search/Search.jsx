import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetRequest } from '../../connector/APIsCommunicator';
import { APIsPath } from '../../connector/APIsPath';
import { AppScreensKeys, ComponentsKeys } from '../../connector/AppConfig';


export const Search = () => {

    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    // ==============================================================

    useEffect(() => {
        getUsers();

    }, []);

    const onChangeName = (e) => {
        var name = e.target.value;
        name.trimStart();
        name.trimEnd();
        setSearch(name);
    }

    // ==============================================================
    // onClick



    // ==============================================================
    // API Call Funcions

    const getUsers = () => {
        GetRequest(APIsPath.GetUsers, {}, parseGetUsersResponse, parseGetUsersError);
    }

    const parseGetUsersResponse = (resObj) => {
        if (!resObj.status) return;
        setUsers(resObj.data);
    }

    const parseGetUsersError = (err) => {
        alert(err.message);
    }

    // ==============================================================
    if (!users) return "loading...";
    return (
        <div className='search-user-page'>
            <div className="header">
                <input type="text" onChange={(e) => onChangeName(e)} placeholder='search user' />
            </div>
            <div className="content">
                <div className="search-users">
                    {users?.filter((i) => i.name.toLowerCase().trim().indexOf(search.toLowerCase().trim()) !== -1).map((row, key) => {
                        return (
                            <div className="row" key={key}>
                                <div className="logo" onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(AppScreensKeys.Home + "/" + row._id, {
                                        state: {
                                            userId: row._id
                                        }
                                    });
                                }}>
                                    <img src={row.profile} alt="profile" />
                                </div>
                                <div className="content">
                                    <div className="id">{row.name}</div>
                                </div>
                                <div className="end">
                                    {row.followers?.some((i) => i._id === JSON.parse(localStorage.getItem("user"))?._id) ?
                                        <div className='btn'>Unfollow</div> :
                                        <div className='btn'>Follow</div>
                                    }
                                </div>
                            </div>

                        )
                    })}
                </div>
            </div>
        </div>
    )
}


