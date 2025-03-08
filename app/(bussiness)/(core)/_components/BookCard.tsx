const BookCard = () => {
  return (
    <div className="w-full bg-amber-100 rounded-md gap-x-2 h-32 p-2 flex justify-between items-center">
      {/* Book Image */}
      <div className="w-22 rounded-r-lg rounded-l-sm h-full bg-amber-400"></div>
      {/* Book Data */}
      <div className="flex-grow bg-teal-400/60 h-full"></div>
    </div>
  );
};
export default BookCard;
