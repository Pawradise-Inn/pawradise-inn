import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

// --- API Functions (adjust path as needed) ---
// Change this in: src/pages/staff/dashboard/DashboardTab4.jsx

import { getTodayService, createBookedService } from "../../../hooks/bookedServiceAPI";

// --- Helper Components ---

/**
 * The DashboardCard component requires no changes.
 */
const DashboardCard = ({ data, onClick, onStatusChange }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleStatusBoxClick = (e) => {
        e.stopPropagation();
        setIsDropdownOpen(prev => !prev);
    };

    const handleStatusSelect = (e, newStatus) => {
        e.stopPropagation();
        onStatusChange(data.id, newStatus);
        setIsDropdownOpen(false);
    };

    const getStatusColor = (status) => {
        if (status === 'completed') return 'limegreen';
        if (status === 'cancelled') return 'grey';
        return 'gold';
    };
 
    const cardStyle = { display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '8px', padding: '16px', cursor: 'pointer', backgroundColor: '#f9f9f9', width: '100%', marginBottom: '1rem' };
    const imagePlaceholderStyle = { width: '80px', height: '80px', backgroundColor: '#e0e0e0', borderRadius: '4px', marginRight: '16px', flexShrink: 0 };
    const textContainerStyle = { textAlign: 'left', flexGrow: 1 };
    const nameStyle = { margin: '0', fontSize: '1.2rem', fontWeight: 'bold' };
    const detailStyle = { margin: '4px 0 0', color: '#666' };
    const dropdownContainerStyle = { position: 'relative', marginLeft: '16px' };
    const dropdownBoxStyle = { width: '100px', height: '30px', backgroundColor: '#ebebeb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 8px' };
    const statusCircleStyle = { width: '12px', height: '12px', backgroundColor: getStatusColor(data.status), borderRadius: '50%' };
    const statusTextStyle = { fontSize: '0.9rem', fontWeight: '500', color: '#333', marginLeft: '6px', textTransform: 'capitalize' };
    const dropdownMenuStyle = { position: 'absolute', top: '100%', right: 0, backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '8px', marginTop: '4px', zIndex: 10, width: '120px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' };
    const dropdownItemStyle = { padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center' };

    return (
        <div style={cardStyle} onClick={onClick}>
            <div style={imagePlaceholderStyle}></div>
            <div style={textContainerStyle}>
                <p style={nameStyle}>{data.serviceName}</p>
                <p style={detailStyle}>{data.petName}</p>
                <p style={detailStyle}>{data.timeBooked}</p>
            </div>
            <div style={dropdownContainerStyle}>
                <div style={dropdownBoxStyle} onClick={handleStatusBoxClick}>
                    <div style={statusCircleStyle}></div>
                    <span style={statusTextStyle}>{data.status}</span>
                </div>
                 {isDropdownOpen && (
                    <div style={dropdownMenuStyle}>
                        {['pending', 'completed', 'cancelled'].map(status => (
                            <div key={status} style={dropdownItemStyle} onMouseEnter={(e) => e.target.style.backgroundColor='#f0f0f0'} onMouseLeave={(e) => e.target.style.backgroundColor='white'} onClick={(e) => handleStatusSelect(e, status)}>
                                <div style={{...statusCircleStyle, backgroundColor: getStatusColor(status)}}></div>
                                <span style={statusTextStyle}>{status}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

/**
 * UPDATED: The ItemPopup now includes an onDelete prop and a Delete button.
 */
const ItemPopup = ({ onClose, onSave, onDelete, initialData }) => {
    const [name, setName] = useState(initialData?.name || "");
    const [petName, setPetName] = useState(initialData?.petName || "");
    const [timeBooked, setTimeBooked] = useState(initialData?.timeBooked || "");

    const getNowForInput = () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        return now.toISOString().slice(0,16);
    }

    const handleSave = () => {
        if (!timeBooked) {
            alert("Please select a valid date and time.");
            return;
        }

        onSave({
            name: name || "New Service",
            petName: petName || "Pet's Name",
            timeBooked: timeBooked || "Scheduled Time"
        });
    };
    
    const isEditing = !!initialData;

    const popupOverlayStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
    const popupContentStyle = { backgroundColor: 'white', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '500px' };
    const inputStyle = { width: '100%', padding: '0.5rem', marginBottom: '1rem', border: '1px solid #ccc', borderRadius: '4px' };
    const buttonContainerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginTop: '1rem' };
    const actionButtonsStyle = { display: 'flex', gap: '0.5rem' };
    const deleteButtonStyle = { backgroundColor: 'transparent', color: '#dc3545', border: 'none', cursor: 'pointer', padding: '0.5rem' };
    const buttonStyle = { padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer' };

    return (
        <div style={popupOverlayStyle} onClick={onClose}>
            <div style={popupContentStyle} onClick={(e) => e.stopPropagation()}>
                <h2>{isEditing ? 'Edit Booking' : 'Add New Booking'}</h2>
                <input type="text" placeholder="Enter service name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
                <input type="text" placeholder="Enter pet name" value={petName} onChange={(e) => setPetName(e.target.value)} style={inputStyle} />
                <input
                    type="datetime-local"
                    value={timeBooked}
                    onChange={(e) => setTimeBooked(e.target.value)}
                    style={inputStyle}
                />
                <div style={buttonContainerStyle}>
                    <div>
                        {isEditing && (
                            <button onClick={() => onDelete(initialData.id)} style={deleteButtonStyle}>
                                Delete
                            </button>
                        )}
                    </div>
                    <div style={actionButtonsStyle}>
                        <button onClick={onClose} style={buttonStyle}>Cancel</button>
                        <button onClick={handleSave} style={{...buttonStyle, backgroundColor: '#007bff', color: 'white', border: 'none'}}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Main Component ---

const DashboardTab4 = () => { // Renamed
    // UPDATED: State now starts empty and includes a loading flag.
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const fetchServices = async () => {
        try {
            setLoading(true);
            const data = await getTodayService();
            setItems(data.data || []); 
        } catch (error) {
            console.error("Failed to fetch services:", error);
        } finally {
            setLoading(false);
        }
    }

    // NEW: useEffect to load data from the API on component mount.
    useEffect(() => {
        fetchServices();
    }, []); 

    const filtered = !search
        ? items
        : items.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
          );

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setEditingItem(null);
    };

    // UPDATED: handleStatusChange now calls the API.
    const handleStatusChange = async (itemId, newStatus) => {
        try {
            await updateBookedRoomAPI(itemId, { status: newStatus });
            setItems(items.map(item =>
                item.id === itemId ? { ...item, status: newStatus } : item
            ));
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    // UPDATED: handleSaveItem is now async and calls the API.
    const handleSaveItem = async (itemFromPopup) => {
        try {
            if (editingItem) {
                // EDIT mode
                const updatedItem = await updateBookedRoomAPI(editingItem.id, itemFromPopup);
                setItems(items.map(item =>
                    item.id === editingItem.id ? { ...item, ...updatedItem } : item
                ));
            } else {
                // ADD mode
                await createBookedService(itemFromPopup);
                fetchServices(); 
            }
        } catch (error) {
            console.error("Failed to save item:", error);
        }
        handleClosePopup();
    };
    
    // NEW: Handler to delete a booking via the API.
    const handleDeleteBooking = async (id) => {
        try {
            await deleteBookedRoomAPI(id);
            setItems(prev => prev.filter(item => item.id !== id));
        } catch (error) {
            console.error("Failed to delete booking:", error);
        }
        handleClosePopup();
    };

    const handleEditClick = (item) => {
        setEditingItem(item);
        setIsPopupOpen(true);
    };

    const handleAddClick = () => {
        setEditingItem(null);
        setIsPopupOpen(true);
    };

    // Styles (removed hoveredButton state for simplicity as delete logic is moved)
    const mainStyle = { flex: 1 };
    const headerStyle = { display: 'flex', alignItems: 'center', margin: '2rem 0', width: '100%', padding: '0 2rem' };
    const inputStyle = { width: '100%', outline: 0, fontSize: '1.25rem' };
    const buttonGroupStyle = { display: 'flex', gap: '1.5rem', marginLeft: '2rem' };
    const buttonStyle = { padding: '1rem 2rem', fontWeight: 600, backgroundColor: '#D2B48C', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '1.1rem', width: '140px', transition: 'transform 0.2s ease-in-out' };
    const listContainerStyle = { padding: '0 2rem', marginTop: '2rem' };
    const feedbackStyle = { fontSize: '1.25rem', width: '100%', textAlign: 'center', marginTop: '8rem', fontStyle: 'italic' };

    return (
        <main style={mainStyle}>
            <div style={headerStyle}>
                <div className="flex flex-1 border-2 rounded-4xl px-6 py-4 text-3xl">
                    <i className="bi bi-search opacity-50 pr-2 flex justify-center items-center -bottom-1 relative"></i>
                    <input style={inputStyle} placeholder="search by service name" onChange={(e) => setSearch(e.target.value)} value={search} />
                </div>
                <div style={buttonGroupStyle}>
                    <button onClick={handleAddClick} style={buttonStyle}>add</button>
                    <button style={{...buttonStyle, backgroundColor: '#ccc', cursor: 'not-allowed'}}>delete</button>
                </div>
            </div>

            {/* UPDATED: Added a loading state indicator */}
            {loading ? (
                <p style={feedbackStyle}>Loading bookings...</p>
            ) : filtered.length === 0 ? (
                <p style={feedbackStyle}>No results found.</p>
            ) : (
                <div style={listContainerStyle}>
                    {filtered.map((item) => (
                        <DashboardCard
                            key={item.id}
                            data={item}
                            onClick={() => handleEditClick(item)}
                            onStatusChange={handleStatusChange}
                        />
                    ))}
                </div>
            )}

            {isPopupOpen && (
                <ItemPopup
                    onClose={handleClosePopup}
                    onSave={handleSaveItem}
                    onDelete={handleDeleteBooking} // Wired up the delete handler
                    initialData={editingItem}
                />
            )}

            <Outlet />
        </main>
    );
};

export default DashboardTab4; // Renamed