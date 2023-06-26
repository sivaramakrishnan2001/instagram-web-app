import React from 'react';
import { DeleteRequest } from '../../../connector/APIsCommunicator';
import { APIsPath } from '../../../connector/APIsPath';
import { LocalStorageKeys } from '../../../connector/AppConfig';
import { deleteObject, getStorage, ref } from 'firebase/storage';

export const MoreOptions = props => {

    const options = [
        { id: "unfollow", icon: "", name: "Unfollow" },
        { id: "addtofavorites", icon: "", name: "Add to favorites" },
        { id: "gotopost", icon: "", name: "Go to post" },
        { id: "delete", icon: "", name: "Delete" },
        { id: "edit", icon: "", name: "Edit info" },
        { id: "share", icon: "", name: "Share to..." },
        { id: "copylink", icon: "", name: "Copy link" },
        { id: "cancel", icon: "", name: "Cancel" },
    ]

    // ==================================================================

    const onOptionClick = (row) => {
        switch (row.id) {
            case "delete": onDeletePostFileFireBaseStorage();
                break;

            default:
                break;
        }

    }

    // ==================================================================

    const onDeletePostFileFireBaseStorage = () => {
        const storage = getStorage();
        // Create a reference to the file to delete
        const desertRef = ref(storage, `images/${props.selectedpost.filename}`);

        // Delete the file
        deleteObject(desertRef).then(() => {
            // File deleted successfully
            onDeletePost();
        }).catch((error) => {
            alert(" Uh-oh, an error occurred!")
            // Uh-oh, an error occurred!
        });
    }

    // ==================================================================

    const onDeletePost = () => {
        var reqObj = {
            body: {
                postid: props.selectedpost._id,
            }
        };
        console.log("reqObj", reqObj);
        DeleteRequest(APIsPath.DeletePost, reqObj, parseDeletePostResponse, parseDeletePostError);
    }

    const parseDeletePostResponse = (resObj) => {
        if (resObj.status) {
            alert(resObj.message)
        }
        console.log("parseDeletePostResponse", resObj);
    }

    const parseDeletePostError = (err) => {
        console.log("parseDeletePostError", err);
    }

    // ==================================================================

    return (
        <div className='more-options-container'  >
            <div className="more-options" tabIndex={1} onClick={(e) => e.stopPropagation()}>
                {options?.map((row, key) => {
                    return (
                        <div className="option" key={key} onClick={() => onOptionClick(row)}>
                            <div className="icon">{row.icon} </div>
                            <div className="name">{row.name}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
