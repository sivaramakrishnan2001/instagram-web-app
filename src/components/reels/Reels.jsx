import React, { useEffect, useState } from 'react';
import { GetRequest } from '../../connector/APIsCommunicator';
import { APIsPath } from '../../connector/APIsPath';
import { CustomRangeVideo } from '../customrange/CustomRange';

export const Reels = (props) => {

  const [reels, setReels] = useState([]);

  // ==============================================================

  useEffect(() => {
    onGetAllReels();
  }, []);

  // ==============================================================
  // api calls

  const onGetAllReels = () => {
    var reqObj = {};
    GetRequest(APIsPath.GetAllReels, reqObj, parseGetAllReelsResponse, parseGetAllReelsError);
  }

  const parseGetAllReelsResponse = (resObj) => {
    if (resObj.status) {
      setReels(resObj.data);
    }
    console.log("parseGetAllReelsResponse", resObj);
  }

  const parseGetAllReelsError = (err) => {
    console.log("parseGetAllReelsError", err);
  }

  // ==============================================================

  return (
    <div>

      {reels.map((row, key) => {
        return (
          <React.Fragment key={key}>
            <CustomRangeVideo row={row} />
            {/* <video controls autoPlay muted loop playsInline disablePictureInPicture disableRemotePlayback width="300" height="500">
              <source src={row.url} type="video/mp4" key={key} />
              Your browser does not support the video tag.
            </video>
            <audio controls id="beep">
              <source src={row.song?.song} type="audio/mp3"  />
            </audio> */}
          </React.Fragment>
        )
      })}
    </div>
  )
}


