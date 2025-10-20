import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import { getChatLogsAPI , getToBeReviewAPI} from "../../hooks/chatlogAPI";
import { useNotification } from "../../context/notification/NotificationProvider";
import ReviewPopup from "./ReviewPopUp";
import ToBeReViewedPopUp from "./ToBeReviewedPopUp";
import Overlay from "../Overlay";

const ReviewComp = () => {
  const { createNotification } = useNotification();
  const { user, historys, setHistorys , room , setRoom , service , setService} = useOutletContext();
  const [popUpStatus, setPopUpStatus] = useState(false);
  const [popUpData, setPopUpData] = useState({});
  const [popUpEditable, setPopUpEditable] = useState(false);

  const handlePopUpData = (data, editable) => {
    setPopUpStatus(!popUpStatus);
    setPopUpData(data);
    setPopUpEditable(editable);
  };

  return (
    <div>
      {/* Room to be reviewed */}
      <div className="p-6 flex-1">
        {room.map((r) => {
          return (
            <ReviewCard
              key={r.id}
              data={r}
              onClick={() => handlePopUpData(r, true)}
              type="Room"
            />
          );
        })}

        {popUpStatus ? (
          <div>
            <Overlay bgColor="black" />
            <ToBeReViewedPopUp
              data={popUpData}
              setHistorys={setHistorys}
              editable={popUpEditable}
              onClick={() => handlePopUpData({}, false)}
            />
          </div>
        ) : null}
      </div>


      {/* Service to be reviewed */}
      <div className="p-6 flex-1">
        {service.map((s) => {
          return (
            <ReviewCard
              key={s.id}
              data={s}
              onClick={() => handlePopUpData(s, true)}
              type="Service"
            />
          );
        })}

        {popUpStatus ? (
          <div>
            <Overlay bgColor="black" />
            <ToBeReViewedPopUp
              data={popUpData}
              setHistorys={setHistorys}
              editable={popUpEditable}
              onClick={() => handlePopUpData({}, false)}
            />
          </div>
        ) : null}
      </div>
    </div> 
  );
};

export default ReviewComp;