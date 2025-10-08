import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import HistoryCard from "./HistoryCard";
import { getChatLogsAPI } from "../../../hooks/chatlogAPI";
import { useNotification } from "../../../context/notification/NotificationProvider";
import ReviewPopup from "../ReviewPopUp";
import Overlay from "../../Overlay";
import { overlay, popUP } from "../../../styles/animation";
import { AnimatePresence } from "motion/react";

const HistoryComp = () => {
  const { createNotification } = useNotification();
  const { user, historys, setHistorys } = useOutletContext();
  const [popUpStatus, setPopUpStatus] = useState(false);
  const [popUpData, setPopUpData] = useState({})
  const [popUpEditable, setPopUpEditable] = useState(false);

  // img, name, petName, date, staffName, staffReply, status, type("Service" or "Room")

  useEffect(() => {
    if (user) {
      // getChatLogsAPI({ customerId: user.customer.id })
      //   .then((data) => {
      //     console.log(data)
      //     setHistorys(data.data);
      //   })
      //   .catch((err) => {
      //     createNotification(
      //       "fail",
      //       "Failed to get comment history.",
      //       err.message
      //     );
      //   });
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
        return <HistoryCard data={history} onClick={() => handlePopUpData(history, true)} key={history.id} />;
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
              setHistorys={setHistorys}
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
