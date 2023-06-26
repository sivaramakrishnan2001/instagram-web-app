import React, { useEffect, useState } from 'react';
import { GetRequest, PostRequest, UpdateRequest } from '../../connector/APIsCommunicator';
import { APIsPath } from '../../connector/APIsPath';

export const Users = () => {

    const [users, setUsers] = useState([]);
    const [reload, setReload] = useState(false);

    // ==============================================================

    useEffect(() => {
        onGetAllUsers();

    }, []);

    const onFollow = (row) => {
        let user = JSON.parse(localStorage.getItem("user"));
        row.followers.push(user);
        setReload(ps => !ps);
        console.log("rowrow", row);
        follow(row._id);
    }

    const onUnFollow = (row) => {
        var user = JSON.parse(localStorage.getItem("user"));
        var users = row.followers.filter((i) => i._id !== user._id);
        row.followers = users;
        setReload(ps => !ps);
        unFollow(row._id);
    }

    // ==============================================================
    // APIs

    const follow = (id) => {
        console.log("id", id);
        var obj = {
            body: {
                id: id,
            }
        }

        console.log("obj", obj);
        // + "/" + "?token=" + token,
        UpdateRequest(APIsPath.Follow, obj, followResponse, followError);
    }

    const followResponse = (resObj) => {
        console.log("resObj", resObj);
    }

    const followError = (err) => {
        console.log("err", err);
    }

    const unFollow = (id) => {
        var obj = {
            body: {
                id: id,
            }
        };
        UpdateRequest(
            APIsPath.UnFollow,
            obj,
            (resObj) => {
            }, (err) => {
            }
        );
    }


    const onGetAllUsers = () => {
        var reqObj = {};
        GetRequest(APIsPath.GetUsers, reqObj, parseGetAllUsersResponse, parseGetAllUsersError);
    }

    const parseGetAllUsersResponse = (resObj) => {
        if (resObj.status) {
            setUsers(resObj.data);
        }
    }

    const parseGetAllUsersError = (err) => {
        console.log("parseGetAllUsersError", err);
    }

    // ==============================================================

    return (
        <div className='users' style={{ paddingLeft: "80px", paddingRight: "25px" }}>
            <div style={{ paddingBottom: "20px" }}>Suggested for you</div>
            {users.map((row, key) => {
                var userId = JSON.parse(localStorage.getItem("user"))?._id;
                var followers = row.followers.some((i) => i._id === userId);
                var following = row.following.some((i) => i._id === userId);
                if (row._id !== userId) {
                    return (
                        <div className="user" style={{ width: "100%", border: "none" }} key={key}>
                            <div className="profile" style={{ width: "15%" }}>
                                <img src={row.profile} alt="" />
                            </div>
                            <div className="content" style={{ width: "60%" }}>
                                <div className="name">{row.name}</div>
                            </div>
                            <div className="follow" style={{ width: "30%" }}>
                                {followers ?
                                    <div className='' onClick={() => onUnFollow(row)}>unfollow</div>
                                    :
                                    <div className='' onClick={() => onFollow(row)}>follow</div>
                                }
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    )
}
