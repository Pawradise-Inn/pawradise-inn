import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { startUpVariants } from "../../../styles/animation";
import PetCard from "./PetCard";
import PetCardAdd from "./PetCardAdd";

const PetComp = () => {
  const { user, setUser } = useContext(AuthContext);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    if (user) {
      setPets(user.customer.pets || "");
    }
  }, [user]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-8xl">
        {pets.map((pet, idx) => (
          <PetCard
            variants={startUpVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={idx / 3 + 1}
            key={idx}
            pet={pet}
          />
        ))}
        <PetCardAdd
          variants={startUpVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={pets.length / 4 + 1.5}
          key={pets.length}
        />
      </div>
    </div>
  );
};
export default PetComp;
