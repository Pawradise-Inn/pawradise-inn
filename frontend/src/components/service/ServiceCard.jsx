// img: image URL of the service
// name: name of the service
// reviewStar: review score of the service
// onClick: function to handle click event on the card to show popup
import { motion } from "motion/react";
import { memo } from "react";
import testImage from "../../assets/test.png";

const ServiceCard = ({ data, onClick, ...motionProps }) => {
  return (
    <motion.div
      onClick={() => onClick(data, true)}
      className="bg-[var(--cream-color)] border-1  border-[var(--dark-brown-color)] rounded-2xl px-4 py-2 cursor-pointer"
      {...motionProps}
    >
      <img
        src={data.image || testImage}
        alt={data.name}
        className="object-cover h-56 rounded-2xl mx-auto my-2"
      />
      <div className="flex flex-wrap justify-between items-center">
        <p>{data.name}</p>
        <p className="block bg-[var(--light-brown-color)] rounded py-1 px-3">
          {data.reviewStar} / 5.00{" "}
          <i className="bi bi-star-fill !text-yellow-300 inline-flex justify-center items-center"></i>
        </p>
      </div>
    </motion.div>
  );
};
export default memo(ServiceCard);
