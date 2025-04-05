import Navbar from '@/app/(bussiness)/_components/Navbar';

const ExplainSectionPage = () => {
  return (
    <>
      <Navbar title="Section Name"></Navbar>
      <div className="p-2 w-full h-full">
        {/* Content */}
        <div className="w-full h-[650px] bg-accent"></div>
        {/* Page Details  */}
        <div className="text-center text-slate-500">Page 3 of 4</div>
      </div>
    </>
  );
};
export default ExplainSectionPage;
