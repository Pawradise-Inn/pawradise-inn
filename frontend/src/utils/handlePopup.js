import { useEffect } from "react";

// hide scroll bar when popup occur
const removeWindowScroll = (popUpStatus) =>
  useEffect(() => {
    if (popUpStatus) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [popUpStatus]);

export { removeWindowScroll };