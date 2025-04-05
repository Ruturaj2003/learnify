import Navbar from '@/app/(bussiness)/_components/Navbar';
import { Button } from '@/components/ui/button';

const SectionQuizPage = () => {
  return (
    <>
      <Navbar title="Section Name.. "></Navbar>
      <div className="p-2 ">
        {/* Quiz Question */}
        <div className="bg-amber-200 w-full h-[75vh] mb-1 "></div>
        <div className="bg-amber-200 w-full h-[100px] flex justify-evenly items-center ">
          <Button variant={'outline'}>Prev</Button>
          <Button variant={'outline'}>Next</Button>
          <Button variant={'default'}>Submit</Button>
        </div>
      </div>
    </>
  );
};
export default SectionQuizPage;
