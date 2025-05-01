import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';

const steps = [
  {
    id: 'upload',
    title: 'Upload Your Books',
    description:
      'Simply upload your PDF, EPUB, or other document formats. Our system will automatically process and organize the content into chapters and subchapters.',
    image:
      'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 'learn',
    title: 'AI-Powered Learning',
    description:
      'Get instant, customized explanations for any concept. Choose between simple explanations for quick understanding or detailed deep dives for mastery.',
    image:
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 'quiz',
    title: 'Test Your Knowledge',
    description:
      'Take auto-generated quizzes with 10 questions per chapter. Select your difficulty level and challenge yourself to improve your understanding.',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 'track',
    title: 'Track Your Progress',
    description:
      'Monitor your learning journey with detailed analytics. See your strengths, identify areas for improvement, and watch your progress grow over time.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
            How Learnify Works
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Our streamlined process makes learning from any book efficient and
            effective.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
              {steps.map((step) => (
                <TabsTrigger
                  key={step.id}
                  value={step.id}
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white px-2 py-1 text-sm md:text-base rounded-md font-medium text-gray-600 transition-colors hover:bg-purple-200 hover:text-gray-900"
                >
                  {step.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {steps.map((step) => (
              <TabsContent
                key={step.id}
                value={step.id}
                className="animate-fade-in space-y-8 md:space-y-0"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
                  <div className="order-2 lg:order-1">
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-6 text-sm md:text-base">
                      {step.description}
                    </p>
                  </div>

                  <div className="order-1 lg:order-2 relative aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-transparent to-purple-300 opacity-40 mix-blend-overlay animate-float" />
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
