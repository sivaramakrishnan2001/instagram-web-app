import React, { useEffect, useRef, useState } from 'react';
import { APIsPath } from '../../connector/APIsPath';
import { GetRequest, PostRequest, UpdateRequest } from '../../connector/APIsCommunicator';
import { AppScreensKeys, ComponentsKeys, LocalStorageKeys } from '../../connector/AppConfig';
import { DrawerPopup } from '../drawerpopup/DrawerPopup';
import { MoreOptions } from './popups/MoreOptions';
import { useNavigate } from 'react-router-dom';


export const Post = (props) => {

    const varstore = useRef();
    const videoRef = useRef();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [playVideo, setPlayVideo] = useState(false);
    const [selectedpost, setSelectedPost] = useState(undefined);
    const [showmoreoptions, setShowMoreoptions] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [reload, setReload] = useState(false);


    // ==============================================================

    useEffect(() => {
        onGetAllPost();



    }, []);

    useEffect(() => {

        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5, // Play when 50% of the video is visible in the viewport
        };

        // const observer = new IntersectionObserver((entries) => {
        //     entries.forEach((entry) => {
        //         console.log("entry", entry.target);
        //         if (entry.isIntersecting) {
        //             setPlayVideo(true);
        //         } else {
        //             setPlayVideo(false);
        //         }
        //     });
        // }, options);

        // if (videoRef.current) {
        //     observer.observe(videoRef.current);
        // }

        // return () => {
        //     if (observer) {
        //         if (videoRef) {
        //             observer?.unobserve(videoRef.current);
        //         }
        //     }
        // }
    }, [posts]);


    useEffect(() => {
        console.log("playVideo", playVideo);
    }, [playVideo]);


    // ==============================================================

    const onLike = (post, userid, liked) => {
        if (liked[0] !== undefined) {
            onUnLikePostApi(post._id, userid);
        } else {
            onLikePostApi(post._id, userid)
        }
    }

    const onUnLike = (post, userid,) => {
        onUnLikePostApi(post._id, JSON.parse(LocalStorageKeys.user))
    }

    const onMoreOptions = (row) => {
        setSelectedPost(row);
        setShowMoreoptions(true)
    }

    const onOuterClick = () => {
        setShowMoreoptions(false);

    }

    const onSavePost = (id) => {
        onSavePostApiCall(id);
    }

    const onUnSavePost = (id) => {
        onUnSavePostApiCall(id);
    }

    const onNavigate = (e, id) => {
        e.stopPropagation();
        navigate(AppScreensKeys.Home + "/" + id, {
            state: {
                userId: id
            }
        });
    }

    const handleTimeUpdate = () => {
        setCurrentTime(varstore.videoRef.currentTime);
    };

    // ==============================================================

    const onGetAllPost = () => {
        var reqObj = {};
        GetRequest(APIsPath.AllPost, reqObj, parseGetAllPostResponse, parseGetAllPostError);
    }

    const parseGetAllPostResponse = (resObj) => {
        if (resObj.status) {
            var data = resObj.data.map((i) => {
                if (i.song && i.song.song) {
                    i.audioplay = false;
                }
                return i;
            });
            setPosts(data);
        }
    }

    const parseGetAllPostError = (err) => {
        console.log("parseGetAllPostError", err);
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
            onGetAllPost();
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
            onGetAllPost();
        }
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
            onGetAllPost();
        }
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
            onGetAllPost();
        }
    }

    const parseUnSavePostError = (err) => {
        console.log("parseUnSavePostError", err);
    }

    // ==============================================================

    return (
        <div className="all-posts" ref={varstore} >
            {posts?.map((row, key) => {
                var myid = JSON.parse(LocalStorageKeys.user)?._id
                var liked = row.likes.filter((f) => f._id === myid);
                var save = row.save.some((i) => i === myid);
                var follower = row.likes.some((i) => {
                    return i.followers.some((i) => i._id === myid)
                });

                console.log("follower", follower);

                return (
                    <div className={'post ' + key} key={key} >
                        <div className="post-header">
                            <div className="profile">
                                <div className="logo" onClick={(e) => onNavigate(e, row.postedBy._id)}>
                                    <img src={row.postedBy?.profile} alt="profile" />
                                </div>
                                <div className="name">{row.postedBy.name}</div>
                            </div>
                            <div className="moreoptions" onClick={() => onMoreOptions(row)}>
                                <svg aria-label="More options" className={"svg "} color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                                    <circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle>
                                </svg>
                            </div>
                        </div>

                        {!row.audioplay ?
                            <div className="audio-icon" title="muted" onClick={(e) => {
                                e.stopPropagation();
                                row.audioplay = true;
                                for (let index = 0; index < posts.length; index++) {
                                    if (index === key) {
                                        if (row?.type === "video") {
                                                varstore.current?.children[index]?.children[3]?.children[0]?.play();
                                        } else {
                                            varstore.current.children[index].children[2].play();
                                        }

                                    } else {
                                        posts[index].audioplay = false;
                                        if (row?.type === "video") {
                                                varstore?.current?.children[index]?.children[3]?.children[0]?.pause();
                                        } else {
                                            varstore.current.children[index].children[2].pause();
                                        }
                                    }
                                }
                                setReload((ps) => !ps);
                            }}>
                                <svg aria-label="Audo is muted." color="#ffffff" fill="#ffffff" height="12" role="img" viewBox="0 0 48 48" width="12">
                                    <path clipRule="evenodd" d="M1.5 13.3c-.8 0-1.5.7-1.5 1.5v18.4c0 .8.7 1.5 1.5 1.5h8.7l12.9 12.9c.9.9 2.5.3 2.5-1v-9.8c0-.4-.2-.8-.4-1.1l-22-22c-.3-.3-.7-.4-1.1-.4h-.6zm46.8 31.4-5.5-5.5C44.9 36.6 48 31.4 48 24c0-11.4-7.2-17.4-7.2-17.4-.6-.6-1.6-.6-2.2 0L37.2 8c-.6.6-.6 1.6 0 2.2 0 0 5.7 5 5.7 13.8 0 5.4-2.1 9.3-3.8 11.6L35.5 32c1.1-1.7 2.3-4.4 2.3-8 0-6.8-4.1-10.3-4.1-10.3-.6-.6-1.6-.6-2.2 0l-1.4 1.4c-.6.6-.6 1.6 0 2.2 0 0 2.6 2 2.6 6.7 0 1.8-.4 3.2-.9 4.3L25.5 22V1.4c0-1.3-1.6-1.9-2.5-1L13.5 10 3.3-.3c-.6-.6-1.5-.6-2.1 0L-.2 1.1c-.6.6-.6 1.5 0 2.1L4 7.6l26.8 26.8 13.9 13.9c.6.6 1.5.6 2.1 0l1.4-1.4c.7-.6.7-1.6.1-2.2z" fillRule="evenodd"></path>
                                </svg>
                            </div>
                            :
                            <div className={" audio-icon"} title='playing' onClick={(e) => {
                                e.stopPropagation();
                                row.audioplay = false;
                                for (let index = 0; index < posts.length; index++) {
                                    if (row.type && row.type === "video") {
                                            varstore?.current?.children[index]?.children[3]?.children[0]?.pause();
                                    } else {
                                        varstore.current.children[index].children[2].pause();
                                    }
                                }
                                setReload((ps) => !ps);
                            }}>
                                <svg aria-label="Audio is playing" className="x1lliihq x1n2onr6" color="rgb(255, 255, 255)" fill="rgb(255, 255, 255)" height="12" role="img" viewBox="0 0 24 24" width="12"><title>Audio is playing</title><path d="M16.636 7.028a1.5 1.5 0 1 0-2.395 1.807 5.365 5.365 0 0 1 1.103 3.17 5.378 5.378 0 0 1-1.105 3.176 1.5 1.5 0 1 0 2.395 1.806 8.396 8.396 0 0 0 1.71-4.981 8.39 8.39 0 0 0-1.708-4.978Zm3.73-2.332A1.5 1.5 0 1 0 18.04 6.59 8.823 8.823 0 0 1 20 12.007a8.798 8.798 0 0 1-1.96 5.415 1.5 1.5 0 0 0 2.326 1.894 11.672 11.672 0 0 0 2.635-7.31 11.682 11.682 0 0 0-2.635-7.31Zm-8.963-3.613a1.001 1.001 0 0 0-1.082.187L5.265 6H2a1 1 0 0 0-1 1v10.003a1 1 0 0 0 1 1h3.265l5.01 4.682.02.021a1 1 0 0 0 1.704-.814L12.005 2a1 1 0 0 0-.602-.917Z"></path></svg>
                            </div>
                        }


                        <audio controls id="beep" >
                            <source src={row.song?.song} type="audio/mp3" />
                        </audio>
                        <div className="post-content">
                            {row?.type === "video" ?
                                <video
                                    className='video'
                                    ref={(elem) => varstore.videoRef = elem}
                                    src={row.video}
                                    onTimeUpdate={() => handleTimeUpdate()}
                                ></video>
                                :
                                <img src={row.photo} alt="post" width="300" height="300" />
                            }
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
                                    {/* <span className='icon'>
                                        <svg aria-label="Comment" className={"svg "} color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                                            <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
                                        </svg>
                                    </span>
                                    <span className='icon'>
                                        <svg aria-label="Share Post" className={"svg "} color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                                            <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line>
                                            <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon>
                                        </svg>
                                    </span> */}
                                </div>
                                {save ?
                                    <div className="icon save " onClick={() => onUnSavePost(row._id)}>
                                        <svg aria-label="Remove" className="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Remove</title><path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path></svg>
                                    </div> :
                                    <div className="icon save" onClick={() => onSavePost(row._id)}><svg aria-label="Save" className={"svg "} color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                                        <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon>
                                    </svg></div>
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
                                            <div className="user" key={lk}>
                                                <img src={l.profile} onClick={(e) => onNavigate(e, l._id)} alt="" key={lk} />
                                                <div className="name">{l.name}</div>
                                                {follower ?
                                                    <div className="btn">Unfollow</div>
                                                    :
                                                    <div className="btn">Follow</div>
                                                }
                                            </div>
                                        )
                                    })}
                                </div>
                            }

                            {/* <div className="body"></div>
                            <Comments row={row} /> */}
                        </div>
                    </div>
                )
            })}

            {showmoreoptions &&
                <DrawerPopup size="default" position="right" isopen={true}
                    className="sample"
                    content={<MoreOptions selectedpost={selectedpost} />}
                    OuterClick={onOuterClick}
                />
            }
        </div >
    )
}


