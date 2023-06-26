import React, { useEffect, useState } from 'react';
import { APIsPath } from '../../connector/APIsPath';
import { GetRequest } from '../../connector/APIsCommunicator';
import Music from "../../assets/images/gif/sound.gif";
import { DrawerPopup } from '../drawerpopup/DrawerPopup';
import { StickyNotesMusic } from './StickyNotesMusic';

export const StickyNotes = () => {

    const [stickynotes, setStickyNotes] = useState([]);
    const [showsongs, setShowSongs] = useState(false);
    const [selectedstickynote, setSelectedStickyNote] = useState({});
    const [reload, setReload] = useState(false);


    // ==============================================================

    useEffect(() => {
        onGetAllStickyNotes();
    }, []);

    const onOuterClick = () => {
        setShowSongs(false);
    }

    // ==============================================================

    const onGetAllStickyNotes = () => {
        var data = {};
        GetRequest(APIsPath.GetAllStickyNotes, data, parseGetAllStickyNotesResponse, parseGetAllStickyNotesError);
    }

    const parseGetAllStickyNotesResponse = (resObj) => {
        let list = resObj.data;
        if (resObj.status) {
            for (let index = 0; index < list.length; index++) {
                const element = list[index];
                if (element.song && element.song.song) {
                    element.audioplay = false;
                }
            }
            setStickyNotes(list);
        }
        console.log("parseGetAllStickyNotesResponse", resObj, list);
    }

    const parseGetAllStickyNotesError = (err) => {
        alert("err");
        console.log("parseGetAllStickyNotesError", err);
    }
    // ==============================================================
    // ==============================================================

    return (
        <div className='stickynotes-container'>
            {stickynotes.map((row, key) => {
                return (
                    <div className="stickynotes" key={key}>
                        <img src={row.song.img}  />
                        <div className="content" onClick={() => {
                            setSelectedStickyNote(row);
                            setShowSongs(true);
                        }}>
                            <img src={Music}  />



                            <div className="title">{row.title}</div>

                        </div>


                    </div>
                )
            })}

            {
                showsongs &&
                <DrawerPopup size="default" position="right" isopen={showsongs} className="sample"
                    content={<StickyNotesMusic StickyNote={selectedstickynote} />}
                    OuterClick={() => onOuterClick()}
                />
            }


        </div>
    )
}
