const PetCard = ({ pet }) => {
  return (
    <div className="bg-(--cream-color) rounded-lg p-6 shadow-lg">
      <div className="flex items-start space-x-6">
        <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
          <img
            src={pet.img}
            alt={pet.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 space-y-2">
          <h3 className="text-xl font-bold">{pet.name}</h3>
          <p className="text-base">
            <span className="font-semibold">Pet type:</span> {pet.type}
          </p>
          <p className="text-base">
            <span className="font-semibold">Pet breed:</span> {pet.breed}
          </p>
          <p className="text-base">
            <span className="font-semibold">Pet gender:</span> {pet.sex}
          </p>
          <p className="text-base">
            <span className="font-semibold">Food allergy:</span> {pet.allergic}
          </p>
          <p className="text-base">
            <span className="font-semibold">Medical condition:</span>{" "}
            {pet.disease}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
