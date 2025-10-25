import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import ToBeReViewedPopUp from "./ToBeReviewedPopUp";
import Overlay from "../Overlay";
import { overlay, popUP, startUpVariants } from "../../styles/animation";
import { AnimatePresence } from "motion/react";

const ReviewComp = () => {
  const { user, setHistorys, room, service } = useOutletContext();
  const [popUpStatus, setPopUpStatus] = useState(false);
  const [popUpData, setPopUpData] = useState({});
  console.log(user);

  const handlePopUpData = (data, type) => {
    setPopUpStatus(!popUpStatus);
    setPopUpData({ data: data, type: type });
    console.log();
  };

  return (
    <div className="flex-1 p-6">
      {/* Service to be reviewed */}
      <div>
        {service.map((s, idx) => {
          return (
            <ReviewCard
              variants={startUpVariants}
              initial="hidden"
              animate="visible"
              custom={idx / 3 + 1}
              key={s.id}
              data={s}
              onClick={() => handlePopUpData(s, "service")}
              type="Service"
            />
          );
        })}

        <AnimatePresence initial={true}>
          {popUpStatus && popUpData.type === "service" ? (
            <div>
              <Overlay
                variants={overlay}
                initial="hidden"
                animate="visible"
                exit="hidden"
                bgColor="black"
              />
              <ToBeReViewedPopUp
                variants={popUP}
                initial="hidden"
                animate="visible"
                exit="hidden"
                data={popUpData.data}
                setTobeReviewed={setHistorys}
                service={service}
                type="Service"
                onClick={() => handlePopUpData({}, "service")}
              />
            </div>
          ) : null}
        </AnimatePresence>
      </div>
      {/* Room to be reviewed */}
      <div>
        {room.map((r, idx) => {
          return (
            <ReviewCard
              variants={startUpVariants}
              initial="hidden"
              animate="visible"
              custom={idx / 3 + service.length / 3 + 1}
              key={r.id}
              data={r}
              onClick={() => handlePopUpData(r, "room")}
              type="Room"
            />
          );
        })}

        <AnimatePresence initial={true}>
          {popUpStatus && popUpData.type === "room" ? (
            <div>
              <Overlay
                variants={overlay}
                initial="hidden"
                animate="visible"
                exit="hidden"
                bgColor="black"
              />
              <ToBeReViewedPopUp
                variants={popUP}
                initial="hidden"
                animate="visible"
                exit="hidden"
                data={popUpData.data}
                setTobeReviewed={setHistorys}
                room={room}
                type="Room"
                onClick={() => handlePopUpData({}, "room")}
              />
            </div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ReviewComp;
