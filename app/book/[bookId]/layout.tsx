import BottomNavBar from '@/app/_components/BottomNavBar';
import Navbar from '@/app/_components/Navbar';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar></Navbar>
      {children}
      <BottomNavBar></BottomNavBar>
    </>
  );
};
export default layout;
