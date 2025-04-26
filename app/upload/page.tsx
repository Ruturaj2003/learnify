import BottomNavBar from '../_components/BottomNavBar';
import BookUploadForm from './_components/BookUploadForm';

const UploadBookPage = () => {
  return (
    <>
      <div className="pb-14 pt-14">
        <div className="min-h-screen bg-linear-to-b from-white to-book-background">
          <div className="container py-8 px-4 mx-auto max-w-md">
            <BookUploadForm />
          </div>
        </div>
      </div>

      <BottomNavBar></BottomNavBar>
    </>
  );
};
export default UploadBookPage;
