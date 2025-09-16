import { useCallback, useEffect, useState } from "react";
import ServiceCard from "../../components/service/ServiceCard";
import BookingPopup from "../../components/BookingPopup";
import { filteredObjectByType } from "../../utils/HandleSearch";
import { fetchServiceCommentsAPI } from "../../hooks/serviceAPI";

const BookingService = () => {

  const [service, setService] = useState([]);
  const [filter, setFilter] = useState("");
  const [noResult, setNoResult] = useState(false);
  const [popUpStatus, setPopUpStatus] = useState(false);
  const [popUpData, setPopUpData] = useState([]);
  const [filterService, setFilterService] = useState([]);

  // fetch service data from backend and setService
  useEffect(() => {
    fetchServiceCommentsAPI().then((data) => {
      data.data.forEach((service) => {
		  service.headerType = "Service";
		  service.reviewStar = service.reviewStar.toFixed(1);
		  service.commentPages = Math.max(1, service.commentPages);
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

  return (
    <div className="w-full max-w-6xl mx-auto py-12">
      <b className="text-7xl text-center block m-8 mt-0">Service Reservation</b>
      <div className="flex my-8 mx-auto w-5/10 border-2 rounded-4xl px-4 py-2 text-3xl">
        <i className="bi bi-search opacity-50 pr-2 flex justify-center item-center -bottom-1 relative "></i>
        <input
          className="w-full outline-0 placeholder:opacity-75"
          placeholder="search"
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {noResult ? (
        <p className="text-2xl w-full text-center mt-32 italic">
          Sorry, your desired services is not on operation now.
        </p>
      ) : (
        <div className="grid grid-cols-4 gap-x-8 gap-y-4">
          {filterService.map((data, idx) => {
            return (
              <ServiceCard key={idx} data={data} onClick={handlePopUpData} />
            );
          })}
        </div>
      )}

      <BookingPopup
        status={popUpStatus}
        data={popUpData}
        onClick={handlePopUpData}
      />
    </div>
  );
};

export default BookingService;
