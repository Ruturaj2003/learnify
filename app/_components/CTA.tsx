import { Button } from '@/components/ui/button';

const CTA = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-r from-purple-100 to-purple-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
            Start Your Learning Revolution Today
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who have transformed their study habits
            and achieved their goals with Learnify.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300"
            >
              Get Started for Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-purple-600 text-purple-600 hover:bg-purple-50 transition-all duration-300"
            >
              Schedule a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
