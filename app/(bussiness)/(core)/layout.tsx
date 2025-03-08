import BottomNavbar from './_components/BottomNavbar';

const CoreLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <BottomNavbar></BottomNavbar>
    </div>
  );
};
export default CoreLayout;
