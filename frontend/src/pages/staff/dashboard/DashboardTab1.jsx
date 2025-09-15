import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

// --- Helper Components (defined in-file to resolve import errors) ---

/**
 * A placeholder for the DashboardCard component.
 * It displays the item's name and is clickable.
 */
const DashboardCard = ({ data, onClick, onStatusChange }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleStatusBoxClick = (e) => {
        e.stopPropagation(); // Prevent card's onClick from firing
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
        return 'gold'; // for 'pending'
    };
 
    // STYLES for a horizontal card layout
    const cardStyle = {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        cursor: 'pointer',
        backgroundColor: '#f9f9f9',
        width: '100%', // Take full width of the container
        marginBottom: '1rem', // Add space between cards
    };

    const imagePlaceholderStyle = {
        width: '80px',
        height: '80px',
        backgroundColor: '#e0e0e0',
        borderRadius: '4px',
        marginRight: '16px', // Space between image and text
        flexShrink: 0, // Prevent image from shrinking
    };

    const textContainerStyle = {
        textAlign: 'left',
        flexGrow: 1, // Allow this container to grow
    };

    const dropdownContainerStyle = {
        position: 'relative',
        marginLeft: '16px',
    };

    const dropdownBoxStyle = {
        width: '100px',
        height: '30px',
        backgroundColor: '#ebebeb',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 8px',
    };

    const statusCircleStyle = {
        width: '12px',
        height: '12px',
        backgroundColor: getStatusColor(data.status),
        borderRadius: '50%',
    };

    const statusTextStyle = {
        fontSize: '0.9rem',
        fontWeight: '500',
        color: '#333',
        marginLeft: '6px',
        textTransform: 'capitalize',
    };

    const dropdownMenuStyle = {
        position: 'absolute',
        top: '100%',
        right: 0,
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '8px',
        marginTop: '4px',
        zIndex: 10,
        width: '120px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    };

    const dropdownItemStyle = {
        padding: '8px 12px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
    };

    return (
        <div style={cardStyle} onClick={onClick}>
            <div style={imagePlaceholderStyle}>
                {/* Image placeholder */}
            </div>
            <div style={textContainerStyle}>
                <p style={{ margin: '0', fontSize: '1.2rem', fontWeight: 'bold' }}>{data.serviceName}</p>
                <p style={{ margin: '4px 0 0', color: '#666' }}>{data.petName}</p>
                <p style={{ margin: '4px 0 0', color: '#666' }}>{data.timeBooked}</p>
            </div>
            <div style={dropdownContainerStyle}>
                <div style={dropdownBoxStyle} onClick={handleStatusBoxClick}>
                    <div style={statusCircleStyle}></div>
                    <span style={statusTextStyle}>{data.status}</span>
                </div>
                 {isDropdownOpen && (
                    <div style={dropdownMenuStyle}>
                        <div style={dropdownItemStyle} onMouseEnter={(e) => e.target.style.backgroundColor='#f0f0f0'} onMouseLeave={(e) => e.target.style.backgroundColor='white'} onClick={(e) => handleStatusSelect(e, 'pending')}>
                            <div style={{...statusCircleStyle, backgroundColor: 'gold'}}></div>
                            <span style={statusTextStyle}>pending</span>
                        </div>
                        <div style={dropdownItemStyle} onMouseEnter={(e) => e.target.style.backgroundColor='#f0f0f0'} onMouseLeave={(e) => e.target.style.backgroundColor='white'} onClick={(e) => handleStatusSelect(e, 'completed')}>
                             <div style={{...statusCircleStyle, backgroundColor: 'limegreen'}}></div>
                            <span style={statusTextStyle}>completed</span>
                        </div>
                        <div style={dropdownItemStyle} onMouseEnter={(e) => e.target.style.backgroundColor='#f0f0f0'} onMouseLeave={(e) => e.target.style.backgroundColor='white'} onClick={(e) => handleStatusSelect(e, 'cancelled')}>
                             <div style={{...statusCircleStyle, backgroundColor: 'grey'}}></div>
                            <span style={statusTextStyle}>cancelled</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

/**
 * A popup component for adding or editing an item.
 * It now accepts initialData to pre-fill the form for editing.
 */
const ItemPopup = ({ onClose, onSave, initialData }) => {
    const [serviceName, setServiceName] = useState(initialData?.serviceName || "");
    const [petName, setPetName] = useState(initialData?.petName || "");
    const [timeBooked, setTimeBooked] = useState(initialData?.timeBooked || "");

    const handleSave = () => {
        onSave({
            serviceName: serviceName || "New Service",
            petName: petName || "Pet's Name",
            timeBooked: timeBooked || "Scheduled Time"
        });
    };
    
    const isEditing = !!initialData;

    const popupOverlayStyle = {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
        justifyContent: 'center', alignItems: 'center', zIndex: 1000,
    };
    const popupContentStyle = {
        backgroundColor: 'white', padding: '2rem', borderRadius: '8px',
        width: '90%', maxWidth: '500px',
    };
    const inputStyle = {
        width: '100%', padding: '0.5rem', marginBottom: '1rem',
        border: '1px solid #ccc', borderRadius: '4px',
    };
    const buttonContainerStyle = {
        display: 'flex', justifyContent: 'flex-end', gap: '1rem',
    };

    return (
        <div style={popupOverlayStyle}>
            <div style={popupContentStyle}>
                <h2>{isEditing ? 'Edit Booking' : 'Add New Booking'}</h2>
                <input
                    type="text"
                    placeholder="Enter service name"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    style={inputStyle}
                />
                 <input
                    type="text"
                    placeholder="Enter pet name"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    style={inputStyle}
                />
                 <input
                    type="text"
                    placeholder="Enter time"
                    value={timeBooked}
                    onChange={(e) => setTimeBooked(e.target.value)}
                    style={inputStyle}
                />
                <div style={buttonContainerStyle}>
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
};


// --- Main Component ---

// Demo data that will be replaced by a real API call
const demoItems = [
    { id: 1, serviceName: "Dog Grooming", petName: "Buddy", timeBooked: "Tomorrow at 10:00 AM", image: "", status: "pending" },
    { id: 2, serviceName: "Vet Check-up", petName: "Whiskers", timeBooked: "Today at 2:30 PM", image: "", status: "completed" },
    { id: 3, serviceName: "Nail Clipping", petName: "Rex", timeBooked: "Sep 15 at 11:00 AM", image: "", status: "cancelled" },
];

const DashboardTab1 = () => {
    const [items, setItems] = useState([]); // Start with an empty array
    const [search, setSearch] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [hoveredButton, setHoveredButton] = useState(null);

    // Simulate fetching data from an API when the component mounts
    useEffect(() => {
        // --- Fetch initial data ---
        // This is where you would make an API call to get the bookings.
        // For now, we'll use the demo data.
        console.log("Fetching initial booking data...");
        setItems(demoItems);
    }, []); // Empty dependency array means this runs once on mount


    const filtered = !search
        ? items
        : items.filter((item) =>
            item.serviceName.toLowerCase().includes(search.toLowerCase())
        );

    const handleSearch = (e) => setSearch(e.target.value);
    
    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setEditingItem(null);
    };

    const handleStatusChange = (itemId, newStatus) => {
        setItems(items.map(item => 
            item.id === itemId ? { ...item, status: newStatus } : item
        ));
    };

    const handleSaveItem = (itemFromPopup) => {
        if (editingItem) {
            // In a real app, you would send an update request to the API here
            setItems(items.map(item =>
                item.id === editingItem.id ? { ...item, ...itemFromPopup } : item
            ));
        } else {
            // In a real app, you would send a create request to the API here
            const newItem = {
                id: Date.now(),
                ...itemFromPopup,
                image: "",
                status: "pending", // Default status for new items
            };
            setItems((prev) => [newItem, ...prev]);
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

    // STYLES
    const mainStyle = { flex: 1 };
    const headerStyle = { display: 'flex', alignItems: 'center', margin: '2rem 0', width: '100%', padding: '0 2rem' };
    const searchContainerStyle = { display: 'flex', flex: 1, border: '2px solid #ccc', borderRadius: '30px', padding: '0.75rem 1.5rem', fontSize: '1.5rem' };
    const inputStyle = { width: '100%', outline: 0, fontSize: '1.25rem' };
    const buttonGroupStyle = { display: 'flex', gap: '1.5rem', marginLeft: '2rem' };
    const buttonStyle = { 
        padding: '1rem 2rem', 
        fontWeight: 600, 
        backgroundColor: '#D2B48C', 
        borderRadius: '8px', 
        border: 'none', 
        cursor: 'pointer', 
        fontSize: '1.1rem', 
        width: '140px',
        transition: 'transform 0.2s ease-in-out',
    };
    const listContainerStyle = { padding: '0 2rem', marginTop: '2rem' };
    const noResultStyle = { fontSize: '1.25rem', width: '100%', textAlign: 'center', marginTop: '8rem', fontStyle: 'italic' };

    return (
        <main style={mainStyle}>
            <div style={headerStyle}>
                <div className="flex flex-1 border-2 rounded-4xl px-6 py-4 text-3xl">
                    <i className="bi bi-search opacity-50 pr-2 flex justify-center items-center -bottom-1 relative"></i>
                    <input
                        style={inputStyle}
                        placeholder="search"
                        onChange={handleSearch}
                        value={search}
                    />
                </div>

                <div style={buttonGroupStyle}>
                    <button
                        onClick={handleAddClick}
                            onMouseEnter={() => setHoveredButton('add')}
                            onMouseLeave={() => setHoveredButton(null)}
                        style={{...buttonStyle, ...(hoveredButton === 'add' && { transform: 'scale(1.05)' })}}
                    >
                        add
                    </button>

                    <button 
                            onMouseEnter={() => setHoveredButton('delete')}
                            onMouseLeave={() => setHoveredButton(null)}
                            style={{...buttonStyle, ...(hoveredButton === 'delete' && { transform: 'scale(1.05)' })}}
                        >
                        delete
                    </button>
                </div>
            </div>

            {filtered.length === 0 ? (
                <p style={noResultStyle}>No result.</p>
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
                    initialData={editingItem}
                />
            )}

            <Outlet />
        </main>
    );
};

export default DashboardTab1;

