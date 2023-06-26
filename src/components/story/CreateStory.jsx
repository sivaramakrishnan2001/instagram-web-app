import React, { useEffect, useRef, useState } from 'react';
import { DrawerPopup } from '../drawerpopup/DrawerPopup';
import { APIsPath } from '../../connector/APIsPath';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { PostRequest } from '../../connector/APIsCommunicator';
import { Songs } from '../songs/Songs';
import { ImageTypes, VideoTypes } from '../../connector/AppConfig';

export const CreateStory = () => {

    const varstore = useRef();
    const [file, setFile] = useState({});
    const [video, setVideo] = useState({
        url: "", song: {}, location: "", filename: "", type: ""
    });
    const [showsongs, setShowSongs] = useState(false);
    const [showprogress, setShowProgress] = useState(false)

    // =================================================================

    useEffect(() => {
        if (video.url && video.filename && video.type) {
            onCreatePost();
        }
    }, [video]);


    // =================================================================
    // onChange

    const onChangeFile = async (e) => {
        console.log("e.target.files[0]", e.target.files[0]);
        setFile(e.target.files[0]);
    }

    // =================================================================
    // onClick

    const onSelectedSong = (row) => {
        setVideo({ ...video, song: row });
        setShowSongs(false);
    }


    const onOuterClick = () => {
        setShowSongs(false);
    }

    const onUpload = () => {
        setShowProgress(true);
        if (VideoTypes.includes(file.type)) {
            onUploadVideo();
        } else if (ImageTypes.includes(file.type)) {
            onUploadImage();
        } else {
            alert("file wrong format");
        }
    }

    // ==============================================================

    const onUploadVideo = () => {
        const filename = new Date().getTime() + " " + file.name;
        const storage = getStorage();
        const storageRef = ref(storage, `videos/${filename}`);
        uploadBytes(storageRef, file).then((snapshot) => {
            console.log("snapshot", snapshot);
            console.log("Video uploaded successfully!");
            // Get the download URL of the uploaded file
            getDownloadURL(storageRef).then((url) => {
                console.log("Download URL:", url);
                setVideo({ ...video, url: url, filename: filename, type: "video" });
                // Perform any additional actions with the URL, such as saving it to a database
            }).catch((error) => {
                console.error("Error getting download URL:", error);
            });
        }).catch((error) => {
            console.error("Error uploading video:", error);
        });
    }

    // ==============================================================

    const onUploadImage = () => {
        const filename = new Date().getTime() + " " + file.name;
        const images = ref(Storage, `images/${filename}`);
        const uploadTask = uploadBytesResumable(images, file);
        uploadTask.on("state_changed", (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            console.log("progress ", progress);
        }, (err) => {
            console.log("err", err);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                setVideo({ ...video, url: url, filename: filename, type: "image" });
            })
        })
    }

    // ==============================================================
    // apis

    const onCreatePost = () => {
        var data = {
            body: video
        };
        PostRequest(APIsPath.CreateStory, data, parseCreateReelsResponse, parseCreateReelsError);
    }

    const parseCreateReelsResponse = (resObj) => {
        if (resObj.status) {
            setShowProgress(false);
            alert("updated");
        }
        console.log("parseCreateReelsResponse", resObj);
    }

    const parseCreateReelsError = (err) => {
        console.log("parseCreatePostError", err);
    }

    // =================================================================

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", width: "400px" }}>
                <input type="file" ref={(elem) => varstore.file = elem}
                    // accept="video/mp4,video/x-m4v,video/*" 
                    onChange={(e) => onChangeFile(e)} />
                <div className="icon" onClick={() => varstore.file.click()}>
                    <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="VideoLibraryIcon" tabIndex="-1" title="VideoLibrary"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"></path></svg>
                </div>
                <button onClick={() => setShowSongs(true)}>add songs</button>
                <button   className={showprogress ? " activeLoading" : "active"} onClick={() => onUpload()}>upload<span className="load loading"></span></button>
                
                {showsongs &&
                    <DrawerPopup size="default" position="left" isopen={showsongs} className="sample"
                        content={<Songs onSelectedSong={onSelectedSong} />}
                        OuterClick={onOuterClick}
                    />
                }
            </div>
        </div>
    )
}
