import Navbar from './components/Navbar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex flex-col gap-y-8">
        <Navbar></Navbar>
        {children}
      </div>
    </>
  );
};
export default MainLayout;
