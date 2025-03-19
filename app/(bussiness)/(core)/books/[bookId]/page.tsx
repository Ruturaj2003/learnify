import Navbar from '@/app/(bussiness)/_components/Navbar';
import ChapterCard from './_components/ChapterCard';

const BookSectionListPage = () => {
  const chapters = [
    { number: '1', name: 'Introduction to AI' },
    { number: '2', name: 'Machine Learning Basics' },
    { number: '3', name: 'Deep Learning Concepts' },
    {
      number: '4',
      name: 'Natural Language Processing with Advanced Techniques and Applications in Modern AI Systems',
    },
    { number: '131', name: 'Introduction to AI' },
    { number: '232', name: 'Machine Learning Basics' },
    { number: '343', name: 'Deep Learning Concepts' },
    {
      number: '423465',
      name: 'Natural Language Processing with Advanced Techniques and Applications in Modern AI Systems',
    },
    { number: '1546', name: 'Introduction to AI' },
    { number: '245', name: 'Machine Learning Basics' },
    { number: '36', name: 'Deep Learning Concepts' },
    {
      number: '41',
      name: 'Natural Language Processing with Advanced Techniques and Applications in Modern AI Systems',
    },
  ];
  return (
    <div className="flex flex-col  items-center gap-y-4 *:">
      <Navbar title="Book Name ...."></Navbar>
      <div className="p-2 border bg-gradient-to-r from-amber-400 to-rose-300 rounded-2xl w-[80%] text-2xl text-center ">
        Learning mode :
        <select
          name="asdas"
          className="border border-white p-1 pl-2 rounded-xl ml-2"
          id=""
        >
          <option value="asd">Quiz</option>
          <option value={'asd'}>Read</option>
          <option value={'as'}>Explain</option>
        </select>
      </div>
      <div className="p-4 space-y-4">
        {chapters.map((chapter) => (
          <ChapterCard
            key={chapter.number} // Use chapter number as key for better performance
            chapterNumber={chapter.number}
            chapterName={chapter.name}
          />
        ))}
      </div>
    </div>
  );
};
export default BookSectionListPage;
