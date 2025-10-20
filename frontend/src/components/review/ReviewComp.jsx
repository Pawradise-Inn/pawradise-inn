import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import { getChatLogsAPI } from "../../hooks/chatlogAPI";
import { useNotification } from "../../context/notification/NotificationProvider";
import ReviewPopup from "./ReviewPopUp";
import ToBeReViewedPopUp from "./ToBeReviewedPopUp";
import Overlay from "../Overlay";

const ReviewComp = () => {
  const { createNotification } = useNotification();
  const { user, historys, setHistorys } = useOutletContext();
  const [popUpStatus, setPopUpStatus] = useState(false);
  const [popUpData, setPopUpData] = useState({});
  const [popUpEditable, setPopUpEditable] = useState(false);
  console.log(user)

  useEffect(() => {
    if (user) {

    }
  }, [user]);

  const handlePopUpData = (data, editable) => {
    setPopUpStatus(!popUpStatus);
    setPopUpData(data);
    setPopUpEditable(editable);
  };

  return (
    <div className="p-6 flex-1">
      {historys.map((history) => {
        return (
          <ReviewCard
            key={history.id}
            data={history}
            onClick={() => handlePopUpData(history, true)}
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
  );
};

export default ReviewComp;