import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative z-10">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-100 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl animate-pulse-slow" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-20">
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-gray-900 animate-fade-in">
            Transform Your Learning with{' '}
            <span className="text-purple-600">AI-Powered Knowledge</span>
          </h1>

          <p className="text-base md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in">
            Upload your books, get AI explanations, and take personalized
            quizzes. Track your progress and master any subject more efficiently
            than ever before.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 animate-fade-in">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white"
            >
              Get Started for Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              See How It Works
            </Button>
          </div>

          <div className="relative mx-auto w-full max-w-4xl">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-xl animate-float">
              <div className="absolute inset-0 bg-gray-100 backdrop-blur-sm">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] opacity-30 bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 animate-scale-up">
                <div className="bg-white/90 backdrop-blur p-4 rounded-lg border border-gray-200 shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-600 flex items-center justify-center rounded-full shrink-0">
                      <div className="w-4 h-4 bg-white rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">
                        AI Explanation
                      </h4>
                      <p className="text-sm text-gray-600">
                        The quantum mechanics principles described in this
                        chapter explain how particles behave at the subatomic
                        level, demonstrating both wave and particle properties
                        simultaneously.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
