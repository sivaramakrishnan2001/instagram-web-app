import React, { useEffect, useState } from 'react';
import { GetRequest } from '../../connector/APIsCommunicator';
import { APIsPath } from '../../connector/APIsPath';
import { DrawerPopup } from '../drawerpopup/DrawerPopup';
import { AppScreensKeys, ComponentsKeys, DrawerPopupPosition, DrawerPopupSize } from "../../connector/AppConfig";
import { StoryVideo } from './StoryVideo';
import { useNavigate } from 'react-router-dom';

export const Story = () => {

    const navigat = useNavigate();
    const [story, setStory] = useState([]);
    const [showstory, setShowStory] = useState(false);
    const [selectedrow, setSelectedRow] = useState({});
    const [selectedindex, setSelectedIndex] = useState(0);

    // ==============================================================

    useEffect(() => {
        onGetAllStory();

    }, []);

    // ==============================================================

    const onStory = (e, row, inx) => {
        setShowStory(true);
        setSelectedIndex(inx);
        setSelectedRow(row);
        navigat(AppScreensKeys.Home + "/" + ComponentsKeys.STORYS)
    }

    const onOuterClick = () => {
        setShowStory(false);
    }

    const close = (value) => {
        console.log("value", value);
        let time;
        if (!value) {
            setTimeout(() => {
                time = false;
                return time;
            }, 650);
        } else {
            time = true;
            return time;
        }
    }

    // ==============================================================

    const onGetAllStory = () => {
        var reqObj = {};
        GetRequest(APIsPath.GetAllStorys, reqObj, parseGetAllStoryResponse, parseGetAllStoryError);
    }

    const parseGetAllStoryResponse = (resObj) => {
        if (resObj.status) {
            setStory(resObj.data);
        }
        console.log("resObj", resObj);
    }

    const parseGetAllStoryError = (err) => {
        console.log("parseGetAllStoryError", err);
    }
    // ==============================================================

    return (
        <React.Fragment>
            <div className='story-container'>
                <div className='story-content'>
                    {story.map((row, key) => {
                        return (
                            <div className="story" key={key} onClick={(e) => onStory(e, row, key)}>
                                <img src={row.user.profile} alt="profile" />
                            </div>
                        )
                    })}
                </div>
            </div>

            {close(showstory) && <DrawerPopup size={DrawerPopupSize.Full} position={DrawerPopupPosition.Bottom} isopen={showstory} className="sample"
                content={
                    <StoryVideo
                        story={story}
                        selectedrow={selectedrow}
                        selectedindex={selectedindex}
                        onClick={() => setShowStory(false)}
                    />
                }
                OuterClick={onOuterClick}
            />
            }
        </React.Fragment>
    )
}
