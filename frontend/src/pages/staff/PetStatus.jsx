import { useEffect, useState } from "react";
import { fetchAllPetAPI } from "../../hooks/petAPI";
import PetCard from "../../components/staff/PetCard"

const PetStatus = () => {
  const [pets, setPets] = useState([]);
  const [filters, setFilter] = useState([]);
  const [search, setSearch] = useState("");
  const fetchPets = async () => {
    try {
      const response = await fetchAllPetAPI();
      console.log(response)
      if (response.success) {
        setPets(response.data);
      }

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPets();
    console.log(pets)
  }, []);
  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setFilter([...filters, value]);
    } else {
      setFilter(filters.filter((f) => f != value));
    }
  };

  const filteredPets = pets.filter((pet) => {
    // First, apply the name search filter
    const matchesSearch = pet.name.toLowerCase().includes(search.toLowerCase());

    const hasBook = filters.includes("book");
    const hasService = filters.includes("service");

    // If no filters are selected, just return search match
    if (!hasBook && !hasService) {
      return matchesSearch;
    }

    // Require both if both filters are checked
    if (hasBook && hasService) {
      return (
        matchesSearch &&
        pet.stayed &&
        pet.stayed.length > 0 &&
        pet.scheduled &&
        pet.scheduled.length > 0
      );
    }

    // Otherwise, handle individual filters
    if (hasBook) {
      return matchesSearch && pet.stayed && pet.stayed.length > 0;
    }

    if (hasService) {
      return matchesSearch && pet.scheduled && pet.scheduled.length > 0;
    }

    return false;
  });

  return (
    <div className="mt-8 flex flex-col items-center">
      <b className="text-7xl text-center block m-8 mt-0">
        Pet Status
      </b>
      <hr className="lg:w-300 md:w-175 sm:w-100 border-1 border-[var(--brown-color)] mt-2 mb-3" />
      <div className="flex mx-5 items-center space-x-6">
        <div className="flex my-8 mx-15 border-2 rounded-4xl px-10 py-2 text-3xl w-64 sm:w-80 md:w-[400px] lg:w-[600px]">
          <i className="bi bi-search opacity-50 pr-2 flex justify-center items-center "></i>
          <input
            className="w-full outline-0 placeholder:opacity-75"
            placeholder="search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex my-6 space-x-6">
          <label className="relative flex items-center space-x-2 cursor-pointer font-semibold">
            <input
              type="checkbox"
              value="book"
              onChange={handleCheckboxChange}
              className="hidden peer"
            />

            <div
              className="relative w-10 h-10 border-2 border-[var(--brown-color)] rounded transition-all bg-[var(--cream-color)] 
                                    before:absolute before:top-1/2 before:left-1/2 before:w-8 before:h-0.5 before:bg-[var(--dark-brown-color)] 
                                    before:origin-center before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-135 before:transform 
                                    before:transition-all before:scale-0 peer-checked:before:scale-100"
            ></div>

            <span>book</span>
          </label>

          <label className="relative flex items-center space-x-2 cursor-pointer font-semibold">
            <input
              type="checkbox"
              value="service"
              onChange={handleCheckboxChange}
              className="hidden peer"
            />

            <div
              className="relative w-10 h-10 border-2 border-[var(--brown-color)] rounded transition-all bg-[var(--cream-color)]
                                    before:absolute before:top-1/2 before:left-1/2 before:w-8 before:h-0.5 before:bg-[var(--dark-brown-color)] 
                                    before:origin-center before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-135 before:transform 
                                    before:transition-all before:scale-0 peer-checked:before:scale-100"
            ></div>

            <span>service</span>
          </label>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 max-w-7xl mx-32 my-8">
        {filteredPets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
};

export default PetStatus;
