import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import BookingPopup from "../../components/booking/BookingPopup";
import Overlay from "../../components/Overlay";
import ServiceCard from "../../components/service/ServiceCard";
import { fetchAllServiceWithPaginationAPI } from "../../hooks/serviceAPI";
import { overlay, popUP, startUpVariants } from "../../styles/animation";
import { removeWindowScroll } from "../../utils/HandlePopup";
import { filteredObjectByType } from "../../utils/HandleSearch";
import CartButton from "../../components/Cart/CartButton";

const BookingService = () => {
  const [mounted, setMounted] = useState(false);
  const [service, setService] = useState([]);
  const [filter, setFilter] = useState("");
  const [filterService, setFilterService] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const [popUpStatus, setPopUpStatus] = useState(false);
  const [popUpData, setPopUpData] = useState([]);

  // fetch service data from backend and setService
  useEffect(() => {
    fetchAllServiceWithPaginationAPI().then((data) => {
      data.data.forEach((service) => {
        service.headerType = "Service";
      });
      
      setService(data.data);
    });
  }, []);

  // set filterService with name filtering
  useEffect(() => {
    setFilterService(filteredObjectByType(service, filter, "name"));
  }, [filter, service]);

  // check if there is no result after filtering
  useEffect(() => {
    if (filterService.length === 0) {
      setNoResult(true);
    } else {
      setNoResult(false);
    }
  }, [filter, filterService]);

  // handle popup data and status
  const handlePopUpData = useCallback((data, status) => {
    setPopUpStatus(status);
    setPopUpData(data);
  }, []);

  removeWindowScroll(popUpStatus);

  return (
    <div className="w-full">
      <div className="fixed top-25 right-15 z-50">
        <CartButton to="/cart" />
      </div>
    <div className="w-full max-w-6xl mx-auto py-12">
      <b className="text-7xl text-center block m-8 mt-0">
        {"Service Reservation".split(" ").map((word, idx) => {
          return (
            <motion.p
              variants={startUpVariants}
              initial="hidden"
              animate="visible"
              custom={idx}
              key={idx}
            >
              {word}
            </motion.p>
          );
        })}
      </b>
      <motion.div
        variants={startUpVariants}
        initial="hidden"
        animate="visible"
        custom={2}
        className="flex my-8 mx-auto w-5/10 border-2 rounded-4xl px-4 py-2 text-3xl"
      >
        <i className="bi bi-search opacity-50 pr-2 flex justify-center item-center -bottom-1 relative "></i>
        <input
          className="w-full outline-0 placeholder:opacity-75"
          placeholder="search"
          onFocus={() => setMounted(true)}
          onChange={(e) => setFilter(e.target.value)}
        />
      </motion.div>

      {noResult ? (
        <AnimatePresence>
          <motion.p
            variants={startUpVariants}
            initial="hidden"
            animate={mounted ? "found" : "visible"}
            exit="exit"
            className="text-2xl w-full text-center min-h-[320px] italic flex justify-center items-center"
          >
            Sorry, your desired services is not on operation now.
          </motion.p>
        </AnimatePresence>
      ) : (
        <div className="grid grid-cols-4 gap-x-8 gap-y-4">
          <AnimatePresence mode="popLayout">
            {filterService.map((data, idx) => {
              return (
                <ServiceCard
                  layout
                  variants={startUpVariants}
                  initial="hidden"
                  animate={mounted ? "found" : "visible"}
                  exit="exit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 1 }}
                  custom={idx / 3 + 2}
                  key={`service-${data.name}`}
                  data={data}
                  onClick={handlePopUpData}
                />
              );
            })}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence initial={true}>
        {popUpStatus ? (
          <div>
            <Overlay
              variants={overlay}
              initial="hidden"
              animate="visible"
              exit="hidden"
              bgColor="black"
            />
            <BookingPopup
              variants={popUP}
              initial="hidden"
              animate="visible"
              exit="hidden"
              status={popUpStatus}
              data={popUpData}
              onClick={handlePopUpData}
            />
          </div>
        ) : null}
      </AnimatePresence>
    </div>
    </div>
  );
};

export default BookingService;
