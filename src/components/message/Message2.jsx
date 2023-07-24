import React, { useEffect, useState } from 'react';
import "./message2.css";
import { LeftSilder2 } from './LeftSilder2';
import { APIsPath } from '../../connector/APIsPath';
import { GetRequest } from '../../connector/APIsCommunicator';

export const Message2 = (props) => {
    const [selectedUser, setSelectedUser] = useState(undefined);
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    // ==============================================================

    useEffect(() => {
        setSocket(props.socket);

    }, [props.socket]);

    useEffect(() => {
        console.log("socket", socket);
        if (!socket || !user) return;

        socket.emit('addUser', user._id);

        socket.on('getUsers', (users) => {
            console.log("users = ", users);

        });

        socket.on('getMessage', (data) => {
            console.log("data", data);
            let msg = {
                senderId: data.senderId,
                message: data.text,
                myself: false
            }
            setArrivalMessage(msg);
        })


    }, [socket]);

    useEffect(() => {
        console.log("arrivalMessage0", arrivalMessage, "selectedUser", selectedUser);

        if (arrivalMessage) {
            console.log("arrivalMessage", arrivalMessage);
            setMessages((prev) => [...prev, arrivalMessage]);

        }
    }, [arrivalMessage]);

    useEffect(() => {
        if (!selectedUser?._id) return;
        onGetMessages();

    }, [selectedUser]);

    // ==============================================================

    const onSelectUser = (row) => {
        console.log("row", row);
        setSelectedUser(row);
    }

    // ==============================================================

    const onGetMessages = () => {
        GetRequest(APIsPath.GetConversationAllMessages + "/" + selectedUser?._id, {}, parseGetMessagesResponse, parseGetMessagesError);
    }

    const parseGetMessagesResponse = (resObj) => {
        if (resObj.status) {
            setMessages(resObj.data);
        } else {
            alert(resObj.message)
        }
    }

    const parseGetMessagesError = (err) => {
        alert(err.message);
    }

    // ==============================================================
    return (
        <div className="container">
            <div className="row" style={{ display: 'flex' }}>
                {/* <nav className="menu">
                    <ul className="items">
                        <li className="item">
                            <i className="fa fa-home" aria-hidden="true"></i>
                        </li>
                        <li className="item">
                            <i className="fa fa-user" aria-hidden="true"></i>
                        </li>
                        <li className="item">
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                        </li>
                        <li className="item item-active">
                            <i className="fa fa-commenting" aria-hidden="true"></i>
                        </li>
                        <li className="item">
                            <i className="fa fa-file" aria-hidden="true"></i>
                        </li>
                        <li className="item">
                            <i className="fa fa-cog" aria-hidden="true"></i>
                        </li>
                    </ul>
                </nav> */}
                <LeftSilder2 onClick={onSelectUser} />
                <section className="chat" style={{ display: 'flex', flexDirection: "column", width: "100%" }}>
                    <div className="header-chat">
                        <i className="icon fa fa-user-o" aria-hidden="true"></i>
                        <p className="name">{selectedUser?.name}</p>
                        <i className="icon clickable fa fa-ellipsis-h right" aria-hidden="true"></i>
                    </div>
                    <div className="messages-chat">
                        <div className="message">
                            <div className="photo"
                            // style="background-image: url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80);"
                            >
                                <div className="online"></div>
                            </div>
                            <p className="text"> Hi, how are you ? </p>
                        </div>
                        <div className="message text-only">
                            <p className="text"> What are you doing tonight ? Want to go take a drink ?</p>
                        </div>
                        <p className="time"> 14h58</p>
                        <div className="message text-only">
                            <div className="response">
                                <p className="text"> Hey Megan ! It's been a while 😃</p>
                            </div>
                        </div>
                        <div className="message text-only">
                            <div className="response">
                                <p className="text"> When can we meet ?</p>
                            </div>
                        </div>
                        <p className="response-time time"> 15h04</p>
                        <div className="message">
                            <div className="photo"
                            // style="background-image: url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80);"
                            >
                                <div className="online"></div>
                            </div>
                            <p className="text"> 9 pm at the bar if possible 😳</p>
                        </div>
                        <p className="time"> 15h09</p>
                    </div>

                    <div className="footer-chat">
                        <i className="icon fa fa-smile-o clickable"
                            // style="font-size:25pt;" 
                            style={{ fontSize: "25pt" }}
                            aria-hidden="true"></i>
                        <input type="text" className="write-message" placeholder="Type your message here"></input>
                        <i className="icon send fa fa-paper-plane-o clickable" aria-hidden="true"></i>
                    </div>
                </section>
            </div>
        </div>
    )
}
