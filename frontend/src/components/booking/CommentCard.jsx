import { motion } from "motion/react";
import { memo } from "react";

//  user: username of the commenter
//  star: star rating given by the user
//  detail: comment detail text

const CommentCard = ({ user, star, detail, ...motionProps }) => {
  return (
    <motion.div
      className="bg-[var(--cream-color)] p-2 rounded-xl border-2 border-[var(--brown-color)]"
      {...motionProps}
    >
      <b className="inline-block mb-4">
        {star}/5.0{" "}
        <i className="bi bi-star-fill !text-yellow-300 inline-flex justify-center items-center"></i>
      </b>
      <p className="inline-block ml-4 mb-4">from {user}</p>
      <p className="line-clamp-4 mx-3">{detail}</p>
    </motion.div>
  );
};

export default memo(CommentCard);
