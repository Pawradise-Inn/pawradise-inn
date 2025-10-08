import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { startUpVariants } from "../../styles/animation";

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

// --- Helper Component: ReviewCard ---
const ReviewCard = ({ review, onDelete }) => {
  return (
    <div className="mb-6 flex gap-6 rounded-2xl bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.07)]">
      <div className="h-[120px] w-[120px] flex-shrink-0 rounded-xl bg-gray-100"></div>
      <div className="flex-shrink-0 pt-1">
        <p className="text-base font-bold">{review.serviceName}</p>
        <p className="my-1 text-gray-600">{review.petName}</p>
        <p className="text-sm text-gray-500">{review.reviewDate}</p>
      </div>
      <div className="w-px bg-gray-200" />
      <div className="flex flex-grow flex-col">
        <div className="flex justify-between">
          <p className="font-bold">{review.customerName}</p>
          <p className="text-gray-600">{review.rating.toFixed(1)}/5.0 <span className="text-[#f5b32a]">★</span></p>
        </div>
        <p className="mb-4 mt-2 italic text-gray-700">"{review.reviewText}"</p>
        {review.staffReply && (
          <div>
            <p className="mb-2 font-bold">Staff reply</p>
            <div className="mt-2 rounded-lg bg-gray-50 p-4">
              <p className="italic text-gray-700">"{review.staffReply}"</p>
            </div>
          </div>
        )}
        <div className="mt-auto flex items-center justify-between pt-6">
          <button
            className="cursor-pointer rounded-lg bg-[#6F4E37] px-7 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            onClick={() => onDelete(review.id)}
          >
            Delete
          </button>
          <div className="flex gap-4">
            <button className="cursor-pointer rounded-lg bg-[#EADDCA] px-7 py-2.5 text-sm font-semibold text-[#6F4E37] transition-opacity hover:opacity-90">Hide</button>
            <button className="cursor-pointer rounded-lg bg-[#6F4E37] px-7 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">Reply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Helper Component: StarFilterDropdown ---
const StarFilterDropdown = ({ onFilterChange }) => {
  const options = [
    { label: 'All Stars', value: null },
    { label: '5 Stars ★★★★★', value: 5 },
    { label: '4 Stars ★★★★☆', value: 4 },
    { label: '3 Stars ★★★☆☆', value: 3 },
    { label: '2 Stars ★★☆☆☆', value: 2 },
    { label: '1 Star ★☆☆☆☆', value: 1 }
  ];
  return (
    <div className="absolute right-0 top-full z-10 mt-2 overflow-hidden rounded-lg bg-white shadow-lg">
      {options.map(option => (
        <div
          key={option.label}
          className="cursor-pointer whitespace-nowrap px-6 py-3 transition-colors hover:bg-gray-100"
          onClick={() => onFilterChange(option.value)}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};

// --- Helper Component: Pagination ---
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNeighbours = 1;
    const totalNumbersToShow = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbersToShow + 2;

    if (totalPages <= totalBlocks) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    const startPage = Math.max(2, currentPage - pageNeighbours);
    const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

    pages.push(1);
    if (currentPage > pageNeighbours + 2) {
      pages.push('...');
    }
    for (let i = startPage; i <= endPage; i++) {
      if (!pages.includes(i)) pages.push(i);
    }
    if (currentPage < totalPages - (pageNeighbours + 1)) {
      pages.push('...');
    }
    pages.push(totalPages);
    return pages;
  };
  
  const pageNumbers = getPageNumbers();
  const baseButtonClass = "cursor-pointer bg-transparent p-2 text-xl font-bold text-[#6F4E37] transition-colors disabled:cursor-not-allowed disabled:text-gray-300";

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <button className={baseButtonClass} onClick={() => onPageChange(1)} disabled={currentPage === 1}>{'<<'}</button>
      <button className={baseButtonClass} onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>{'<'}</button>
      
      {pageNumbers.map((number, index) =>
        typeof number === 'number' ? (
          <button
            key={index}
            className={`${baseButtonClass} ${currentPage === number ? 'font-bold text-gray-800 underline' : 'font-normal'}`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </button>
        ) : (
          <span key={index} className="cursor-default p-2 text-xl font-bold text-[#6F4E37]">...</span>
        )
      )}

      <button className={baseButtonClass} onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>{'>'}</button>
      <button className={baseButtonClass} onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>{'>>'}</button>
    </div>
  );
};

// --- Main Component ---
const StaffReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState("");
  const [starFilter, setStarFilter] = useState(null);
  const [dateFilter, setDateFilter] = useState(''); 
  const [isStarDropdownOpen, setIsStarDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;
  
  useEffect(() => { setReviews(demoReviews); }, []);

  const handleDeleteReview = (reviewId) => {
    setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
  };

  const filteredReviews = reviews
    .filter(review => {
      if (starFilter === null) return true;
      return Math.round(review.rating) === starFilter;
    })
    .filter(review => {
      if (!dateFilter) return true;
      // Create date objects at midnight UTC to avoid timezone issues
      const reviewDate = new Date(review.reviewDate);
      reviewDate.setUTCHours(0, 0, 0, 0);
      const filterDate = new Date(dateFilter);
      filterDate.setUTCHours(0, 0, 0, 0);
      return reviewDate.getTime() === filterDate.getTime();
    });

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  const handleStarFilterChange = (starValue) => { setStarFilter(starValue); setCurrentPage(1); setIsStarDropdownOpen(false); };
  const handleDateChange = (e) => { setDateFilter(e.target.value); setCurrentPage(1); };
  const clearDateFilter = () => { setDateFilter(''); setCurrentPage(1); };

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl pb-4">
        <h1 className="text-center text-5xl font-bold text-gray-800 sm:text-6xl">Review</h1>
        <div className="absolute bottom-0 left-1/2 h-0.5 w-full -translate-x-1/2 bg-gray-800" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="my-8 flex w-full flex-wrap items-center gap-4">
          <div className="min-w-[300px] flex-1 rounded-full border-2 px-4 py-3 text-xl">
            <div className="flex items-center">
              <i className="bi bi-search pr-2 opacity-50"></i>
              <input className="w-full bg-transparent outline-none" placeholder="search" onChange={(e) => setSearch(e.target.value)} value={search} />
            </div>
          </div>

          <div className="relative flex h-full items-center rounded-xl bg-[#6F4E37] px-6 py-3 text-lg">
            <input 
              type="date" 
              value={dateFilter} 
              onChange={handleDateChange} 
              className="cursor-pointer border-none bg-transparent text-white outline-none"
            />
            {dateFilter && (
              <button onClick={clearDateFilter} className="absolute right-2.5 top-1/2 flex h-5 w-5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-none bg-white/20 font-bold leading-none text-white transition-opacity hover:opacity-80">
                &times;
              </button>
            )}
          </div>
          <div className="relative">
            <button onClick={() => setIsStarDropdownOpen(prev => !prev)} className="flex h-full cursor-pointer items-center gap-2 whitespace-nowrap rounded-xl bg-[#6F4E37] px-6 py-3 text-lg text-white transition-opacity hover:opacity-90">
              star <span>▼</span>
            </button>
            {isStarDropdownOpen && <StarFilterDropdown onFilterChange={handleStarFilterChange} />}
          </div>
        </div>
      </div>
      
      <div className="mx-auto mt-8 max-w-7xl">
        {currentReviews.length > 0 ? (
          currentReviews.map(review => ( 
            <ReviewCard 
              key={review.id} 
              review={review} 
              onDelete={handleDeleteReview} 
            /> 
        ))
        ) : (
          <p className="mt-16 text-center text-xl italic text-gray-500">No reviews available.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mx-auto max-w-7xl">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      )}
    </div>
  );
};

export default StaffReviewPage;