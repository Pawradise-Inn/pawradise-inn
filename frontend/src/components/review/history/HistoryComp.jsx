import { useOutletContext } from "react-router-dom";
import HistoryCard from "./HistoryCard";
import { useNotification } from "../../../context/notification/NotificationProvider";
import ReviewPopup from "../ReviewPopUp";
import Overlay from "../../Overlay";
import { overlay, popUP, startUpVariants } from "../../../styles/animation";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { updateChatLogAPI } from "../../../hooks/chatlogAPI";

const HistoryComp = () => {
  const { createNotification } = useNotification();
  const { user, historys, setHistorys } = useOutletContext();
  const [popUpStatus, setPopUpStatus] = useState(false);
  const [popUpData, setPopUpData] = useState({});
  const [popUpEditable, setPopUpEditable] = useState(false);

  const handlePopUpData = (data, editable) => {
    setPopUpStatus(!popUpStatus);
    setPopUpData(data);
    setPopUpEditable(editable);
  };

  return (
    <div className="p-6 flex-1">
      {historys.map((history, idx) => {
        return (
          <HistoryCard
            variants={startUpVariants}
            initial="hidden"
            animate="visible"
            custom={idx / 3 + 1}
            data={history}
            key={history.id}
            onClick={() => {
              handlePopUpData(history, true);
              if (!history.readingStatus && history.nameOfStaffReply) {
                updateChatLogAPI(history.id, { isRead: true });
                setHistorys((prev) => {
                  const newHistorys = [...prev];
                  newHistorys[idx].readingStatus = true;
                  return newHistorys;
                });
              }
            }}
          />
        );
      })}

      <AnimatePresence initial={true}>
        {popUpStatus ? (
          <>
            <Overlay
              variants={overlay}
              initial="hidden"
              animate="visible"
              exit="hidden"
              bgColor="black"
            />
            <ReviewPopup
              variants={popUP}
              initial="hidden"
              animate="visible"
              exit="hidden"
              data={popUpData}
              editable={popUpEditable}
              onClick={() => handlePopUpData({}, false)}
            />
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default HistoryComp;
