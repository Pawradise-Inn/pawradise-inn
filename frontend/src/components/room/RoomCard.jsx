// data = { image, roomId, status, forwhich, price, size, maxsize, review }
// compact: boolean to show fewer fields
// actionLabel: override button text (e.g., "EDIT")
import { motion } from "motion/react";
import { memo } from "react";

const RoomCard = ({
  data,
  onClick,
  compact = false,
  actionLabel,
  ...motionProps
}) => {
  return (
    <motion.div
      className="bg-[var(--cream-color)] border border-[var(--brown-color)] rounded-2xl p-4 flex justify-start gap-4"
      {...motionProps}
    >
      <img
        src={data.image}
        alt={`Room ${data.roomId}`}
        className="object-center rounded-2xl w-[180px] h-[180px]"
      />

      <div className="flex justify-between w-full pr-8">
        <div className="flex flex-col justify-between h-full">
          {/* Top info */}
          <div className="space-y-1">
            <p className="font-semibold">{`Room_${data.roomId
              .toString()
              .padStart(3, 0)}`}</p>
            <p>Status : {data.status}</p>

            {/* Hide these in compact mode */}
            {!compact && <p>Suitable for {data.forWhich}</p>}
          </div>

          {/* Capacity - hide in compact mode */}
          {!compact && (
            <div className="text-center py-2 px-4 bg-[var(--light-brown-color)] rounded">
              {data.size} / {data.maxsize}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between h-full items-end">
          <p className="font-bold">{data.price} ฿ / night</p>

          <div className="flex flex-col gap-2 items-center">
            {/* Review - hide in compact mode */}
            {!compact && (
              <p className="inline-block">
                {data.reviewStar} / 5.0{" "}
                <i className="bi bi-star-fill !text-yellow-300 inline-flex justify-center items-center"></i>
              </p>
            )}

            <button
              onClick={() => onClick(data, true)}
              className="py-2 px-8 bg-[var(--dark-brown-color)] rounded !text-white font-bold active:scale-90 cursor-pointer transition-transform duration-200"
            >
              {actionLabel || (compact ? "EDIT" : "BOOK")}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default memo(motion.create(RoomCard));
