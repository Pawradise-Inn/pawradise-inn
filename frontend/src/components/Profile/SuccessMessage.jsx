const SuccessMessage = ({ show, booking, onClose }) => {
    if (!show || !booking) return null;

    return (
        <div className="mb-6 bg-green-100 border-l-4 border-green-500  p-4 rounded-lg shadow-md">
            <div className="flex items-center">
                <div className="flex-1">
                    <p className="font-semibold !text-green-700">Booking Successfuly Cancelled!</p>
                    <p className="text-sm !text-green-700">
                        The {booking.service_name} for {booking.pet_name} has been cancelled.   
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SuccessMessage;