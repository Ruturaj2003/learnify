import { Button } from '@/components/ui/button';

const QuizzezSection = () => {
  return (
    <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quizzes</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button className="flex-1">Quiz Insights</Button>
        <Button className="flex-1">Quiz History</Button>
      </div>
    </section>
  );
};

export default QuizzezSection;
