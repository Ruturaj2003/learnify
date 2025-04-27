const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-60">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-4 border-purple-500 opacity-20"></div>
        <div className="absolute inset-0 animate-spin rounded-full border-5 border-transparent border-t-purple-600 border-r-purple-600"></div>
      </div>
    </div>
  );
};

export default Spinner;
