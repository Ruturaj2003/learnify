const BookLibraryPage = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Custom NavBar */}
      <div className="border-b w-full h-16 flex justify-between items-center px-4 sm:px-6 bg-white shadow-md">
        <img src="/logo.svg" alt="Logo" className="h-5 w-auto" />
        <div className="text-lg font-semibold text-gray-800">Your Library</div>
        <button
          className="flex items-center p-2 focus:outline-none"
          aria-label="User  Profile"
        >
          <span className="text-lg">User Icon</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow p-4">
        {/* Placeholder for main content */}
        <div className="bg-gray-100 h-full rounded-lg p-4">
          {/* Your main content goes here */}
          <p className="text-gray-700">
            This is where your book library content will be displayed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookLibraryPage;
