import React, { useEffect, useState } from 'react';
import { UpdateRequest } from '../../connector/APIsCommunicator';
import { LocalStorageKeys } from '../../connector/AppConfig';

export const Comments = (props) => {

    const [message, setMessage] = useState("");

    useEffect(() => {
        console.log("console.log(LocalStorageKeys.user);",);
    }, [])


    const onSend = () => {

        var obj = {
            userId: JSON.parse(localStorage.getItem("user"))?._id,
            postId: props.row._id,
            message: message
        }
        console.log(obj, "obj");
        UpdateRequest(
            "/post/sendMessage",
            obj,
            (resObj) => {
                setMessage("");
            }, (err) => {
                setMessage("");
            }
        );
    }

    return (
        <div className='comments'>
            {props.row.comments?.map((row, key) => {
                return (
                    <div className='' key={key}>
                        <div className="user">
                            <div className="logo">
                                <img src={row.profile} alt="profile" />
                            </div>
                            <div className="message">
                                <div className="id">{row.name}</div>
                                <div className="text">{row.text}</div>
                            </div>
                        </div>
                    </div>
                )
            })}
            <div className="chat">
                <div className="logo"></div>
                <input type="text" onChange={(e) => setMessage(e.target.value)} />
                <div className="send" onClick={() => onSend()}>Post</div>
            </div>
        </div>
    )
}
