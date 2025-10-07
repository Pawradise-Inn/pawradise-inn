import React, { useState, useEffect } from 'react';

// --- Mock Data ---
const demoReviews = [
  { id: 1, serviceName: 'Full Grooming', petName: 'Max', reviewDate: 'October 3, 2025', customerName: 'Jane Doe', rating: 4.5, reviewText: 'The service was fantastic! Max looks so clean and happy.', staffReply: 'Thank you for your kind words, Jane! We were so happy to have Max with us.', image: '' },
  { id: 2, serviceName: 'Nail Clipping', petName: 'Buddy', reviewDate: 'October 1, 2025', customerName: 'John Smith', rating: 5.0, reviewText: 'Quick, easy, and stress-free for Buddy. Exactly what we needed.', staffReply: null, image: '' },
  { id: 3, serviceName: 'Cat Boarding', petName: 'Whiskers', reviewDate: 'September 28, 2025', customerName: 'Emily White', rating: 4.8, reviewText: 'Left Whiskers here for a weekend and the staff was amazing.', staffReply: 'It was a pleasure having Whiskers stay with us, Emily!', image: '' },
  { id: 4, serviceName: 'Dental Cleaning', petName: 'Rocky', reviewDate: 'September 25, 2025', customerName: 'Michael Brown', rating: 4.2, reviewText: 'The dental cleaning went well. The vet was thorough.', staffReply: null, image: '' },
  { id: 5, serviceName: 'Puppy Training', petName: 'Daisy', reviewDate: 'September 22, 2025', customerName: 'Sarah Green', rating: 5.0, reviewText: 'The puppy training classes are a must! The trainer is excellent.', staffReply: 'Sarah, we are so proud of Daisy\'s progress!', image: '' },
  { id: 6, serviceName: 'Full Grooming', petName: 'Zoe', reviewDate: 'September 20, 2025', customerName: 'David Clark', rating: 3.9, reviewText: 'The haircut was a little shorter than I asked for, but Zoe was happy.', staffReply: null, image: '' },
  { id: 7, serviceName: 'Vet Check-up', petName: 'Leo', reviewDate: 'September 18, 2025', customerName: 'Jessica Martinez', rating: 5.0, reviewText: 'Always a great experience. The veterinary team is knowledgeable.', staffReply: 'Thank you for trusting us with Leo\'s care, Jessica!', image: '' },
  { id: 8, serviceName: 'Nail Clipping', petName: 'Charlie', reviewDate: 'September 15, 2025', customerName: 'Chris Lee', rating: 4.5, reviewText: 'In and out in 15 minutes. Perfect for a quick nail trim.', staffReply: null, image: '' },
  { id: 9, serviceName: 'Full Grooming', petName: 'Lola', reviewDate: 'October 3, 2025', customerName: 'Maria Garcia', rating: 3.2, reviewText: 'It was okay. The facilities are clean but it took longer than expected.', staffReply: 'Thank you for the feedback, Maria. We\'ll work on our timing.', image: '' },
  { id: 10, serviceName: 'Vet Check-up', petName: 'Cooper', reviewDate: 'September 28, 2025', customerName: 'James Wilson', rating: 2.5, reviewText: 'The wait time was over an hour, which was very frustrating.', staffReply: 'We sincerely apologize for the long wait, James. We were handling an emergency case and are reviewing our scheduling process.', image: '' },
  { id: 11, serviceName: 'Behavioral Consultation', petName: 'Bear', reviewDate: 'September 27, 2025', customerName: 'Linda Harris', rating: 4.9, reviewText: 'The consultation was incredibly insightful. We have a much better understanding of Bear\'s anxiety now.', staffReply: null, image: '' },
  { id: 12, serviceName: 'Cat Boarding', petName: 'Simba', reviewDate: 'September 25, 2025', customerName: 'Robert Martin', rating: 2.1, reviewText: 'The space was smaller than I thought. Simba seemed stressed when I picked him up.', staffReply: 'We are sorry to hear about Simba\'s experience. We do offer larger deluxe rooms and would be happy to discuss options for his next stay.', image: '' },
  { id: 13, serviceName: 'Nail Clipping', petName: 'Lucy', reviewDate: 'October 1, 2025', customerName: 'Patricia Thompson', rating: 5.0, reviewText: 'Perfect as always! The best place for a quick nail trim.', staffReply: 'Always a pleasure, Patricia!', image: '' },
  { id: 14, serviceName: 'Dental Cleaning', petName: 'Milo', reviewDate: 'September 20, 2025', customerName: 'Jennifer Anderson', rating: 3.5, reviewText: 'Service was fine, but the cost was higher than quoted.', staffReply: null, image: '' },
  { id: 15, serviceName: 'Puppy Training', petName: 'Toby', reviewDate: 'September 18, 2025', customerName: 'William Jackson', rating: 4.6, reviewText: 'Great progress with Toby\'s leash pulling. The trainer gives very practical advice.', staffReply: 'That\'s wonderful to hear, William! Toby is a fast learner.', image: '' },
  { id: 16, serviceName: 'Full Grooming', petName: 'Bella', reviewDate: 'September 15, 2025', customerName: 'Susan Moore', rating: 1.5, reviewText: 'Did not follow the instructions for the cut at all. Very disappointed.', staffReply: null, image: '' },
  { id: 17, serviceName: 'Vet Check-up', petName: 'Oscar', reviewDate: 'September 28, 2025', customerName: 'Joseph Taylor', rating: 4.0, reviewText: 'A standard check-up. Everything went smoothly.', staffReply: 'Glad to hear it, Joseph!', image: '' },
  { id: 18, serviceName: 'Nail Clipping', petName: 'Molly', reviewDate: 'October 3, 2025', customerName: 'Thomas King', rating: 4.3, reviewText: 'Good service, friendly staff.', staffReply: null, image: '' },
  { id: 19, serviceName: 'Cat Boarding', petName: 'Chloe', reviewDate: 'September 25, 2025', customerName: 'Karen White', rating: 5.0, reviewText: 'Chloe loves staying here. The staff treat her like a queen!', staffReply: 'Chloe is part of the family here! We love having her.', image: '' },
  { id: 20, serviceName: 'Dental Cleaning', petName: 'Jack', reviewDate: 'September 18, 2025', customerName: 'Nancy Allen', rating: 3.8, reviewText: 'Everything was fine, but a bit of a long wait to be seen.', staffReply: 'Thank you for your patience, Nancy. We are working to improve our check-in process.', image: '' },
  { id: 21, serviceName: 'Flea Treatment', petName: 'Ruby', reviewDate: 'September 12, 2025', customerName: 'Daniel Lewis', rating: 4.7, reviewText: 'Very effective treatment and the staff explained everything clearly.', staffReply: 'Happy we could help get Ruby comfortable again!', image: '' },
  { id: 22, serviceName: 'Microchipping', petName: 'Sadie', reviewDate: 'September 12, 2025', customerName: 'Matthew Walker', rating: 5.0, reviewText: 'Quick and professional. Peace of mind is priceless.', staffReply: null, image: '' },
  { id: 23, serviceName: 'Vet Check-up', petName: 'Gizmo', reviewDate: 'September 11, 2025', customerName: 'Betty Hall', rating: 4.4, reviewText: 'The vet was very patient with Gizmo, who is usually very nervous.', staffReply: 'We have a soft spot for Gizmo! He did great.', image: '' },
  { id: 24, serviceName: 'Full Grooming', petName: 'Winston', reviewDate: 'September 10, 2025', customerName: 'Kevin Young', rating: 2.8, reviewText: 'The groomer seemed rushed and missed a few spots.', staffReply: 'Kevin, we\'re sorry to hear this. Please contact our manager so we can schedule a complimentary touch-up.', image: '' },
  { id: 25, serviceName: 'Nail Clipping', petName: 'Lilly', reviewDate: 'September 10, 2025', customerName: 'Sandra Hernandez', rating: 4.8, reviewText: 'Great service as always.', staffReply: null, image: '' },
  { id: 26, serviceName: 'Senior Pet Care', petName: 'George', reviewDate: 'September 9, 2025', customerName: 'Mark Allen', rating: 5.0, reviewText: 'The team shows so much care and attention to the needs of older pets. Highly recommend them.', staffReply: 'George is a wonderful old gentleman. We love seeing him.', image: '' },
  { id: 27, serviceName: 'Cat Boarding', petName: 'Smokey', reviewDate: 'September 8, 2025', customerName: 'Donald Nelson', rating: 3.3, reviewText: 'It was fine for a short stay. A bit noisy.', staffReply: null, image: '' },
  { id: 28, serviceName: 'Puppy Training', petName: 'Zeus', reviewDate: 'September 8, 2025', customerName: 'Paul Carter', rating: 4.9, reviewText: 'Zeus has become so much more obedient. Fantastic program.', staffReply: 'Paul, Zeus has been a star pupil. Keep up the great work at home!', image: '' },
  { id: 29, serviceName: 'Emergency Visit', petName: 'Penny', reviewDate: 'September 7, 2025', customerName: 'Michelle Perez', rating: 5.0, reviewText: 'I was in a panic, but the staff was calm, professional, and took amazing care of Penny.', staffReply: 'We\'re so glad Penny is feeling much better! Thank you for trusting us in a stressful time.', image: '' },
  { id: 30, serviceName: 'Full Grooming', petName: 'Rosie', reviewDate: 'September 7, 2025', customerName: 'George Roberts', rating: 4.1, reviewText: 'Good grooming, Rosie looks very pretty.', staffReply: null, image: '' },
  { id: 31, serviceName: 'Nail Clipping', petName: 'Duke', reviewDate: 'September 6, 2025', customerName: 'Steven Turner', rating: 3.8, reviewText: 'The wait was a bit long for a quick trim.', staffReply: 'Apologies for the delay, Steven. We were a bit short-staffed that day.', image: '' },
  { id: 32, serviceName: 'Behavioral Consultation', petName: 'Koda', reviewDate: 'September 5, 2025', customerName: 'Carol Phillips', rating: 5.0, reviewText: 'Life-changing advice for managing Koda\'s separation anxiety. Thank you!', staffReply: 'You\'ve put in the work and it shows, Carol. We\'re thrilled for you and Koda.', image: '' },
  { id: 33, serviceName: 'Vet Check-up', petName: 'Riley', reviewDate: 'September 5, 2025', customerName: 'Ruth Campbell', rating: 4.6, reviewText: 'Thorough and professional check-up.', staffReply: null, image: '' },
  { id: 34, serviceName: 'Flea Treatment', petName: 'Bandit', reviewDate: 'September 4, 2025', customerName: 'Brian Parker', rating: 4.9, reviewText: 'Solved our flea problem in one visit!', staffReply: 'Happy to help, Brian!', image: '' },
  { id: 35, serviceName: 'Microchipping', petName: 'Abby', reviewDate: 'September 4, 2025', customerName: 'Sharon Evans', rating: 5.0, reviewText: 'A must-do for any pet owner. The process was seamless.', staffReply: 'We agree! So important for pet safety.', image: '' },
  { id: 36, serviceName: 'Full Grooming', petName: 'Piper', reviewDate: 'September 3, 2025', customerName: 'Laura Edwards', rating: 2.2, reviewText: 'My instructions were not followed, and Piper\'s fur is way too short now.', staffReply: null, image: '' },
  { id: 37, serviceName: 'Senior Pet Care', petName: 'Sasha', reviewDate: 'September 2, 2025', customerName: 'Larry Collins', rating: 5.0, reviewText: 'They are so gentle and understanding with my old girl Sasha.', staffReply: 'Sasha is one of our favorite visitors!', image: '' },
  { id: 38, serviceName: 'Dental Cleaning', petName: 'Bentley', reviewDate: 'September 2, 2025', customerName: 'Amy Stewart', rating: 4.5, reviewText: 'Bentley\'s teeth look amazing. Well worth it.', staffReply: null, image: '' },
  { id: 39, serviceName: 'Cat Boarding', petName: 'Oreo', reviewDate: 'September 1, 2025', customerName: 'Gary Morris', rating: 3.9, reviewText: 'Oreo seemed fine when he got home. The facility is clean.', staffReply: 'Thank you for the feedback, Gary.', image: '' },
  { id: 40, serviceName: 'Vet Check-up', petName: 'Teddy', reviewDate: 'September 1, 2025', customerName: 'Angela Sanchez', rating: 5.0, reviewText: 'The best vet in town. I wouldn\'t trust anyone else with Teddy.', staffReply: 'Angela, that means the world to us. Thank you.', image: '' }
];


// --- Helper Component: ReviewCard (Updated) ---
const ReviewCard = ({ review, onDelete }) => { 
    const cardStyle = { backgroundColor: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.07)', display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }; 
    const imagePlaceholderStyle = { width: '120px', height: '120px', backgroundColor: '#f0f0f0', borderRadius: '12px', flexShrink: 0 }; 
    const serviceInfoStyle = { flexShrink: 0, paddingTop: '0.25rem' }; 
    const separatorStyle = { width: '1px', backgroundColor: '#e5e7eb' }; 
    const reviewContentStyle = { flexGrow: 1, display: 'flex', flexDirection: 'column' }; 
    const staffReplyContainerStyle = { backgroundColor: '#f7f7f7', borderRadius: '8px', padding: '1rem', marginTop: '0.5rem' }; 
    const buttonContainerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1.5rem' }; 
    const rightButtonsStyle = { display: 'flex', gap: '1rem' }; 
    const baseButtonStyle = { padding: '0.6rem 1.75rem', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }; 
    
    return ( 
        <div style={cardStyle}> 
            <div style={imagePlaceholderStyle}></div> 
            <div style={serviceInfoStyle}> 
                <p style={{ fontWeight: 'bold', margin: 0, fontSize: '1rem' }}>{review.serviceName}</p> 
                <p style={{ margin: '0.25rem 0', color: '#555' }}>{review.petName}</p> <p style={{ margin: 0, color: '#888', fontSize: '0.9rem' }}>{review.reviewDate}</p> 
            </div> 
            <div style={separatorStyle} /> 
            <div style={reviewContentStyle}> 
                <div style={{ display: 'flex', justifyContent: 'space-between' }}> 
                    <p style={{ fontWeight: 'bold', margin: 0 }}>{review.customerName}</p> 
                    <p style={{ margin: 0, color: '#555' }}>{review.rating.toFixed(1)}/5.0 <span style={{color: '#f5b32a'}}>★</span></p> 
                </div> 
                <p style={{ fontStyle: 'italic', color: '#444', marginTop: '0.5rem', marginBottom: '1rem' }}>"{review.reviewText}"</p> 
                {review.staffReply && ( 
                    <div> 
                        <p style={{ fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>Staff reply</p> 
                        <div style={staffReplyContainerStyle}> 
                            <p style={{ margin: 0, fontStyle: 'italic', color: '#444' }}>"{review.staffReply}"</p> 
                        </div> 
                    </div> 
                )} 
                <div style={buttonContainerStyle}> 
                    <button 
                        style={{ ...baseButtonStyle, backgroundColor: '#6F4E37', color: 'white' }} 
                        onClick={() => onDelete(review.id)} // Pass the review's ID to the delete function
                    >
                        Delete
                    </button> 
                    <div style={rightButtonsStyle}> 
                        <button style={{ ...baseButtonStyle, backgroundColor: '#EADDCA', color: '#6F4E37' }}>Hide</button> 
                        <button style={{ ...baseButtonStyle, backgroundColor: '#6F4E37', color: 'white' }}>Reply</button> 
                    </div> 
                </div> 
            </div> 
        </div> 
    ); 
};


// --- Helper Component: StarFilterDropdown ---
const StarFilterDropdown = ({ onFilterChange }) => { const dropdownStyle = { position: 'absolute', top: '100%', right: 0, backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', zIndex: 10, marginTop: '0.5rem', overflow: 'hidden' }; const itemStyle = { padding: '0.75rem 1.5rem', cursor: 'pointer', whiteSpace: 'nowrap' }; const options = [ { label: 'All Stars', value: null }, { label: '5 Stars ★★★★★', value: 5 }, { label: '4 Stars ★★★★☆', value: 4 }, { label: '3 Stars ★★★☆☆', value: 3 }, { label: '2 Stars ★★☆☆☆', value: 2 }, { label: '1 Star ★☆☆☆☆', value: 1 } ]; return ( <div style={dropdownStyle}> {options.map(option => ( <div key={option.label} style={itemStyle} onClick={() => onFilterChange(option.value)} onMouseEnter={(e) => e.target.style.backgroundColor='#f0f0f0'} onMouseLeave={(e) => e.target.style.backgroundColor='white'}> {option.label} </div> ))} </div> ); };


// --- Helper Component: Pagination ---
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  
  // This function robustly generates the page numbers and ellipses
  const getPageNumbers = () => {
    const pageNeighbours = 1; // How many pages to show on each side of the current page
    const totalNumbersToShow = pageNeighbours * 2 + 3; // e.g., 1, ..., 4, 5, 6, ..., 10
    const totalBlocks = totalNumbersToShow + 2; // Including the ellipses

    // Case 1: Not enough pages to need ellipses
    if (totalPages <= totalBlocks) {
      const pages = [];
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    const pages = [];
    const startPage = Math.max(2, currentPage - pageNeighbours);
    const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

    // Always show the first page
    pages.push(1);

    // Show left ellipsis if needed
    if (currentPage > pageNeighbours + 2) {
      pages.push('...');
    }
    
    // Show the middle page numbers
    for (let i = startPage; i <= endPage; i++) {
      if ( (pages.indexOf(i) === -1) ) pages.push(i);
    }
    
    // Show right ellipsis if needed
    if (currentPage < totalPages - (pageNeighbours + 1) ) {
      pages.push('...');
    }

    // Always show the last page
    pages.push(totalPages);
    
    return pages;
  };
  
  const pageNumbers = getPageNumbers();

  const containerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '2rem 0' };
  const buttonStyle = { border: 'none', backgroundColor: 'transparent', color: '#6F4E37', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer', padding: '0.5rem', minWidth: '30px' };
  const numberStyle = (number) => ({ ...buttonStyle, fontWeight: currentPage === number ? 'bold' : 'normal', textDecoration: currentPage === number ? 'underline' : 'none', color: currentPage === number ? '#333' : '#6F4E37' });
  const ellipsisStyle = { ...buttonStyle, cursor: 'default', color: '#6F4E37' };
  const disabledStyle = { color: '#cccccc', cursor: 'not-allowed' };

  return (
    <div style={containerStyle}>
      <button style={{ ...buttonStyle, ...(currentPage === 1 && disabledStyle) }} onClick={() => onPageChange(1)} disabled={currentPage === 1}>{'<<'}</button>
      <button style={{ ...buttonStyle, ...(currentPage === 1 && disabledStyle) }} onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>{'<'}</button>
      
      {pageNumbers.map((number, index) => 
        typeof number === 'number' ? (
          <button key={index} style={numberStyle(number)} onClick={() => onPageChange(number)}>
            {number}
          </button>
        ) : (
          <span key={index} style={ellipsisStyle}>...</span>
        )
      )}

      <button style={{ ...buttonStyle, ...(currentPage === totalPages && disabledStyle) }} onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>{'>'}</button>
      <button style={{ ...buttonStyle, ...(currentPage === totalPages && disabledStyle) }} onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>{'>>'}</button>
    </div>
  );
};


// --- Main Component ---
const StaffReviewPage = ({/* ...props... */}) => {
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState("");
  const [starFilter, setStarFilter] = useState(null);
  const [dateFilter, setDateFilter] = useState(''); 
  const [isStarDropdownOpen, setIsStarDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;
  
  useEffect(() => { setReviews(demoReviews); }, []);

  // --- NEW: Function to handle deleting a review ---
  const handleDeleteReview = (reviewId) => {
    // THIS IS THE FUNCTION FOR THE API IMPLEMENTATION.
    // YOU WILL MAKE A 'DELETE' REQUEST TO YOUR BACKEND ENDPOINT PASSING THE 'reviewId'.
    // ONCE THE API CALL IS SUCCESSFUL, THE STATE UPDATE BELOW WILL REMOVE IT FROM THE UI.
    // EXAMPLE: await api.deleteReview(reviewId);
    
    setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
  };

  const filteredReviews = reviews
    .filter(review => {
      if (starFilter === null) return true;
      return Math.round(review.rating) === starFilter;
    })
    .filter(review => {
      if (!dateFilter) return true;
      const reviewDate = new Date(review.reviewDate);
      const year = reviewDate.getFullYear();
      const month = String(reviewDate.getMonth() + 1).padStart(2, '0');
      const day = String(reviewDate.getDate()).padStart(2, '0');
      const formattedReviewDate = `${year}-${month}-${day}`;
      return formattedReviewDate === dateFilter;
    });

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  const handleStarFilterChange = (starValue) => { setStarFilter(starValue); setCurrentPage(1); setIsStarDropdownOpen(false); };
  const handleDateChange = (e) => { setDateFilter(e.target.value); setCurrentPage(1); };
  
  const clearDateFilter = () => {
    setDateFilter('');
    setCurrentPage(1);
  };

  const noReviewsStyle = { textAlign: 'center', marginTop: '4rem', fontSize: '1.25rem', color: '#6b7280', fontStyle: 'italic' };
  
  const dateInputContainerStyle = { 
    position: 'relative',
    padding: '0.75rem 1.5rem', 
    backgroundColor: '#6F4E37', 
    border: 'none', 
    borderRadius: '12px', 
    fontSize: '1.125rem', 
    height: '100%', 
    display: 'flex', 
    alignItems: 'center' 
  };
  
  const clearButtonStyle = {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: '1',
    fontWeight: 'bold',
  };

  return (
    <div className="px-4 py-8 sm:px-6 lg-px-8">
      <div className="relative max-w-7xl mx-auto pb-4">
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-gray-800">Review</h1>
        <div style={{ position: 'absolute', bottom: 0, height: '2px', backgroundColor: '#374151', width: '100%', left: '50%', transform: 'translateX(-50%)' }} />
      </div>

      <div className="max-w-7xl mx-auto">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', margin: '2rem 0', width: '100%', gap: '1rem' }}>
          <div className="flex flex-1 border-2 rounded-4xl px-4 py-3 text-xl min-w-[300px]">
            <i className="bi bi-search opacity-50 pr-2 flex justify-center items-center -bottom-1 relative"></i>
            <input style={{ width: '100%', outline: 0, backgroundColor: 'transparent' }} placeholder="search" onChange={(e) => setSearch(e.target.value)} value={search} />
          </div>

          <div style={dateInputContainerStyle}>
            <input 
              type="date" 
              value={dateFilter} 
              onChange={handleDateChange} 
              style={{ 
                backgroundColor: 'transparent', 
                color: 'white', 
                border: 'none', 
                outline: 'none', 
                cursor: 'pointer' 
              }}
            />
            {dateFilter && (
              <button onClick={clearDateFilter} style={clearButtonStyle}>
                &times;
              </button>
            )}
          </div>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setIsStarDropdownOpen(prev => !prev)} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#6F4E37', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '1.125rem', whiteSpace: 'nowrap', height: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              star <span>▼</span>
            </button>
            {isStarDropdownOpen && <StarFilterDropdown onFilterChange={handleStarFilterChange} />}
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-8">
        {currentReviews.length > 0 ? (
          currentReviews.map(review => ( 
            <ReviewCard 
                key={review.id} 
                review={review} 
                onDelete={handleDeleteReview} 
            /> 
        ))
        ) : (
          <p style={noReviewsStyle}>No reviews available.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="max-w-7xl mx-auto">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      )}
    </div>
  );
};

export default StaffReviewPage;
