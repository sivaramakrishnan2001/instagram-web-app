import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { GetRequest, PostRequest, UpdateRequest } from '../../connector/APIsCommunicator';
import { APIsPath } from '../../connector/APIsPath';
import { AppScreensKeys, ComponentsKeys, LocalStorageKeys, SessionStorageKeys } from '../../connector/AppConfig';
import { Comments } from '../comments/Comments';
import { Profile } from '../profile/Profile';
import { CustomRangeVideo } from '../customrange/CustomRange';

export const UserProfile = (props) => {

    const videoRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const searchparams = useSearchParams();
    const [user, setUser] = useState({});
    const [myid, setMyId] = useState("");
    const [post, setPost] = useState([]);
    const [reels, setReels] = useState([]);
    const [save, setSave] = useState([]);
    const [seletedtab, setSeletedTab] = useState('POSTS');
    const [playVideo, setPlayVideo] = useState(false);
    const [selectedpost, setSelectedPost] = useState(undefined);
    const [showmoreoptions, setShowMoreoptions] = useState(false);
    const [reload, setReload] = useState(false);
    const [paramid, setParamId] = useState("");


    // ==============================================================

    useEffect(() => {
        // sessionStorage.setItem(SessionStorageKeys.ActiveMenu,ComponentsKeys.PROFILE);
        setReload((ps) => !ps);
        videoRef.tabs = [
            {
                name: "POSTS",
                icon: <svg aria-label="Posts" className={"svg "} color="#0095f6" fill="#0095f6" height="24" role="img" viewBox="0 0 24 24" width="24">
                    <rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect>
                    <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.015" x2="9.015" y1="3" y2="21"></line>
                    <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="14.985" x2="14.985" y1="3" y2="21"></line>
                    <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="9.015" y2="9.015"></line>
                    <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="14.985" y2="14.985"></line>
                </svg>,
            },
            {
                name: "REELS",
                icon: <svg aria-label="Reels" className={"svg "} color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                    <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002"></line>
                    <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="13.504" x2="16.362" y1="2.001" y2="7.002"></line>
                    <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="7.207" x2="10.002" y1="2.11" y2="7.002"></line><path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z" fillRule="evenodd"></path>
                </svg>,
            },
            {
                name: "SAVE",
                icon: <div className="icon">
                    <svg aria-label="Save" className={"svg "} color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                        <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon>
                    </svg>
                </div>,
            },
            {
                name: "LIKES",
                icon: <div className="icon">
                    <svg viewBox="0 0 24 24" className={"svg " + "unlike"}>
                        <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path>
                    </svg>
                </div>,
            }
        ]

        setMyId(JSON.parse(localStorage.getItem("user"))?._id);
        setParamId(params.userId);
    }, [params.userId]);

    useEffect(() => {
        if (myid === params.userId) {
            sessionStorage.setItem(SessionStorageKeys.ActiveMenu, ComponentsKeys.PROFILE);
        } else {
            sessionStorage.setItem(SessionStorageKeys.ActiveMenu, ComponentsKeys.USERPROFILE);
        }
        console.log("paramid-----", paramid);
        if (paramid) {
            onGetUser();
        }
    }, [paramid]);




    const onMoreOptions = (row) => {
        setSelectedPost(row);
        setShowMoreoptions(true)
    }

    const onLike = (post, userid, liked) => {
        console.log("liked..", liked);
        if (liked[0] !== undefined) {
            onUnLikePostApi(post._id, userid);
        } else {
            onLikePostApi(post._id, userid)
        }
    }

    const onSavePost = (id) => {
        onSavePostApiCall(id);
    }

    const onUnSavePost = (id) => {
        onUnSavePostApiCall(id);
    }

    // ==============================================================

    const onGetUser = () => {
        GetRequest(APIsPath.GetUser + paramid, {}, parseGetUserResponse, parseGetUserError);
    }

    const parseGetUserResponse = (resObj) => {
        if (resObj.status) {
            setUser(resObj.data);
            onGetPosts();
        }
    }

    const parseGetUserError = (err) => {
        console.log("err", err);
    }

    // ==============================================================

    const onGetPosts = () => {
        GetRequest(APIsPath.GetUserPost + paramid, {}, parseGetUserPostResponse, parseGetUserPostError);
    }

    const parseGetUserPostResponse = (resObj) => {
        if (resObj.status) {
            setPost(resObj.data);
            getAllReels();
        }
    }

    const parseGetUserPostError = (err) => {
        console.log("err", err);
    }

    // ==============================================================

    const getAllReels = () => {
        GetRequest(APIsPath.GetAllReels, {}, parseGetAllReelsResponse, parseGetAllReelsError);
    }

    const parseGetAllReelsResponse = (resObj) => {
        if (resObj.status) {
            setReels(resObj.data);
            onGetSave();
        }
    }

    const parseGetAllReelsError = (err) => {
        console.log("err", err);
    }

    // ==============================================================

    const onGetSave = () => {
        GetRequest(APIsPath.GetAllSave, {}, parseGetUserSaveResponse, parseGetUserSaveError);
    }

    const parseGetUserSaveResponse = (resObj) => {
        if (resObj.status) {
            setSave(resObj.data);
        }
        console.log(" setSave(resObj.data);", resObj.data);
    }

    const parseGetUserSaveError = (err) => {
        console.log("err", err);
    }



    // ==============================================================

    const onLikePostApi = (postid, userid) => {
        var reqObj = {
            body: {
                postid: postid,
                userid: userid._id,
                token: JSON.parse(LocalStorageKeys.token),
            }
        };
        UpdateRequest(APIsPath.LikePost, reqObj, parseLikePostResponse, parseLikePostError);
    }

    const parseLikePostResponse = (resObj) => {
        if (resObj.status) {
            onGetPosts();
        }
    }

    const parseLikePostError = (err) => {
        console.log("parseLikePostError", err);
    }

    // ==============================================================

    const onUnLikePostApi = (postid, user) => {
        var reqObj = {
            body: {
                postid: postid,
                userid: user._id,
                token: JSON.parse(LocalStorageKeys.token)
            }
        };
        UpdateRequest(APIsPath.UnLikePost, reqObj, parseUnLikePostResponse, parseUnLikePostError);

    }

    const parseUnLikePostResponse = (resObj) => {
        if (resObj.status) {
            onGetPosts();
        }
        console.log("parseUnLikePostResponse", resObj);

    }

    const parseUnLikePostError = (err) => {
        console.log("parseUnLikePostError", err);

    }

    const onSavePostApiCall = (id) => {
        var reqObj = {
            body: {
                postId: id,
                token: JSON.parse(LocalStorageKeys.token)
            }
        };
        PostRequest(APIsPath.SavePost, reqObj, parseSavePostResponse, parseSavePostError);
    }

    const parseSavePostResponse = (resObj) => {
        if (resObj.status) {
            onGetPosts();
        }
        console.log("parseSavePostResponse", resObj);
    }

    const parseSavePostError = (err) => {
        console.log("parseSavePostError", err);
    }

    const onUnSavePostApiCall = (id) => {
        var reqObj = {
            body: {
                postId: id,
                token: JSON.parse(LocalStorageKeys.token)
            }
        };
        PostRequest(APIsPath.UnSavePost, reqObj, parseUnSavePostResponse, parseUnSavePostError);
    }

    const parseUnSavePostResponse = (resObj) => {
        if (resObj.status) {
            onGetPosts();
        }
        console.log("parseUnSavePostResponse", resObj);
    }

    const parseUnSavePostError = (err) => {
        console.log("parseUnSavePostError", err);
    }

    // ==============================================================

    if (paramid === myid) {
        return (
            <Profile />
        )
    } else {
        return (
            <div className='user-profilepage'>
                <div className="header">
                    <div className="user">
                        <div className="user-profile">
                            <div className="border">
                                <img src={user.profile} />
                            </div>
                        </div>
                        <div className="user-bio">
                            {/* <div className="user-id">312312</div> */}
                            <div className="user-name">
                                <div>{user.name}</div>
                                {user?.followers?.some((i) => i._id === myid) ?
                                    <div>Following</div>
                                    : <div>Follow</div>
                                }
                                <div className="">Message</div>
                            </div>
                            <div className="content">
                                <div className="user-post"> {post.length + reels.length} posts </div>
                                <div className="followers"> {user.followers?.length} followers </div>
                                <div className="following"> {user.following?.length} following </div>
                            </div>
                            <div className="bio"></div>
                            <div className="website"></div>
                        </div>
                    </div>
                    <div className="highlights">
                        <div className="highlight"></div>
                        <div className="highlight"></div>
                        <div className="highlight"></div>
                        <div className="highlight"></div>
                        <div className="highlight"></div>
                    </div>
                </div>
                <div className="content">
                    <div className="tabs">
                        {videoRef?.tabs?.map((row, key) => {
                            return (
                                <div className="tab" key={key} onClick={() => setSeletedTab(row.name)}>
                                    <div className="icon">
                                        {row.icon}
                                    </div>
                                    {row.name}
                                </div>
                            )
                        })}
                    </div>
                    <div className="my-posts">
                        {seletedtab === "POSTS" &&
                            <div className="posts">
                                {post?.map((row, key) => {
                                    var liked = row.likes?.filter((f) => f._id === JSON.parse(LocalStorageKeys.user)?._id);
                                    var save = row.save?.some((i) => i === JSON.parse(LocalStorageKeys.user)?._id)
                                    return (
                                        <div className={'post ' + key} ref={videoRef} key={key}>
                                            <div className="post-header">
                                                <div className="profile">
                                                    <div className="logo" onClick={() => {
                                                        // navigate(AppScreensKeys.Home + "/" + row.postedBy._id, {
                                                        //     state: {
                                                        //         userId: row.postedBy._id
                                                        //     }
                                                        // });
                                                    }}>
                                                        <img src={row.postedBy?.profile} alt="profile" />
                                                    </div>
                                                    <div className="name">{row.postedBy?.name}</div>
                                                </div>
                                                <div className="moreoptions" onClick={() => onMoreOptions(row)}>
                                                    <svg aria-label="More options" className={"svg "} color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                                                        <circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle>
                                                    </svg>
                                                </div>
                                            </div>
                                            <audio controls autoPlay={playVideo} id="beep" >
                                                <source src={row.song?.song} type="audio/mp3" />
                                            </audio>
                                            <div className="post-content">
                                                {/* {row.photo?.map((rw) => <img src={rw} alt="post" width="300" height="300" />)} */}
                                                <img src={row.photo} alt="post" width="300" height="300" />
                                            </div>
                                            <div className="post-footer">
                                                <div className="footer-header">
                                                    <div className='icons like messages share'>
                                                        <span className="icon" onClick={() => onLike(row, JSON.parse(LocalStorageKeys.user), liked)}
                                                        >
                                                            {liked[0] ?
                                                                <svg className={"svg " + "like"} viewBox="0 0 24 24" >
                                                                    <path d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                                                                </svg>
                                                                : <svg viewBox="0 0 24 24" className={"svg " + "unlike"}>
                                                                    <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path>
                                                                </svg>}
                                                        </span>
                                                        <span className='icon'> <svg aria-label="Comment" className={"svg "} color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                                                            <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
                                                        </svg></span>
                                                        <span className='icon'><svg aria-label="Share Post" className={"svg "} color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                                                            <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line>
                                                            <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon>
                                                        </svg></span>
                                                    </div>
                                                    {save ?
                                                        <div className="save" onClick={() => onUnSavePost(row._id)}>
                                                            <svg aria-label="Remove" className="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Remove</title><path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path></svg>
                                                        </div> :
                                                        <div className="save" onClick={() => onSavePost(row._id)}>
                                                            <svg aria-label="Save" className={"svg "} color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                                                                <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon>
                                                            </svg>
                                                        </div>
                                                    }
                                                </div>
                                                <div className="likes">
                                                    <div className="icons">
                                                        {row.likes.map((l, lk) => {
                                                            if (lk === 0 || lk === 1 || lk === 2) {
                                                                return (
                                                                    <img src={l.profile} alt="" key={lk} />
                                                                )
                                                            }
                                                        })}
                                                    </div>
                                                    Liked by {row.likes[0]?.name} and {row.likes.length}
                                                    <div onClick={() => {
                                                        row.likedusers = !row.likedusers;
                                                        setReload(ps => !ps);
                                                    }} style={{ paddingLeft: "5px" }}> others</div>
                                                </div>
                                                {row?.likedusers &&
                                                    <div className="liked-users">
                                                        {row.likes.map((l, lk) => {
                                                            return (
                                                                <div className="user">
                                                                    <img src={l.profile} alt="" key={lk} />
                                                                    <div className="name">{l.name}</div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                }
                                                <div className="body"></div>
                                                {/* <Comments row={row} /> */}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        }

                        {seletedtab === "REELS" &&
                            <div>
                                {reels.map((row, key) => {
                                    return (
                                        <React.Fragment key={key}>
                                            <CustomRangeVideo row={row} />
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                        }

                        {
                            seletedtab === "SAVE" &&
                            <div className="posts">
                                {save?.map((row, key) => {
                                    var liked = row.likes?.filter((f) => f._id === JSON.parse(LocalStorageKeys.user)?._id);
                                    var save = row.save?.some((i) => i === JSON.parse(LocalStorageKeys.user)?._id)
                                    return (
                                        <div className={'post ' + key} ref={videoRef} key={key}>
                                            <div className="post-header">
                                                <div className="profile">
                                                    <div className="logo" onClick={() => {
                                                        // navigate(AppScreensKeys.Home + "/" + row.postedBy._id, {
                                                        //     state: {
                                                        //         userId: row.postedBy._id
                                                        //     }
                                                        // });
                                                    }}>
                                                        <img src={row.postedBy?.profile} alt="profile" />
                                                    </div>
                                                    <div className="name">{row.postedBy?.name}</div>
                                                </div>
                                                <div className="moreoptions" onClick={() => onMoreOptions(row)}>
                                                    <svg aria-label="More options" className={"svg "} color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                                                        <circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle>
                                                    </svg>
                                                </div>
                                            </div>
                                            <audio controls autoPlay={playVideo} id="beep" >
                                                <source src={row.song?.song} type="audio/mp3" />
                                            </audio>
                                            <div className="post-content">
                                                {/* {row.photo?.map((rw) => <img src={rw} alt="post" width="300" height="300" />)} */}
                                                <img src={row.photo} alt="post" width="300" height="300" />
                                            </div>
                                            <div className="post-footer">
                                                <div className="footer-header">
                                                    <div className='icons like messages share'>
                                                        <span className="icon" onClick={() => onLike(row, JSON.parse(LocalStorageKeys.user), liked)}
                                                        >
                                                            {liked[0] ?
                                                                <svg className={"svg " + "like"} viewBox="0 0 24 24" >
                                                                    <path d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                                                                </svg>
                                                                : <svg viewBox="0 0 24 24" className={"svg " + "unlike"}>
                                                                    <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path>
                                                                </svg>}
                                                        </span>
                                                        <span className='icon'> <svg aria-label="Comment" className={"svg "} color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                                                            <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
                                                        </svg></span>
                                                        <span className='icon'><svg aria-label="Share Post" className={"svg "} color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                                                            <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line>
                                                            <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon>
                                                        </svg></span>
                                                    </div>
                                                    {save ?
                                                        <div className="save" onClick={() => onUnSavePost(row._id)}>
                                                            <svg aria-label="Remove" className="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Remove</title><path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path></svg>
                                                        </div> :
                                                        <div className="save" onClick={() => onSavePost(row._id)}>
                                                            <svg aria-label="Save" className={"svg "} color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                                                                <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon>
                                                            </svg>
                                                        </div>
                                                    }
                                                </div>
                                                <div className="likes">
                                                    <div className="icons">
                                                        {row.likes.map((l, lk) => {
                                                            if (lk === 0 || lk === 1 || lk === 2) {
                                                                return (
                                                                    <img src={l.profile} alt="" key={lk} />
                                                                )
                                                            }
                                                        })}
                                                    </div>
                                                    Liked by {row.likes[0]?.name} and {row.likes.length}
                                                    <div onClick={() => {
                                                        row.likedusers = !row.likedusers;
                                                        setReload(ps => !ps);
                                                    }} style={{ paddingLeft: "5px" }}> others</div>
                                                </div>
                                                {row?.likedusers &&
                                                    <div className="liked-users">
                                                        {row.likes.map((l, lk) => {
                                                            return (
                                                                <div className="user">
                                                                    <img src={l.profile} alt="" key={lk} />
                                                                    <div className="name">{l.name}</div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                }
                                                <div className="body"></div>
                                                {/* <Comments row={row} /> */}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }

}
