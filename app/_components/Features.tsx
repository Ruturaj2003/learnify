import {
  Book,
  Brain,
  ListCheck,
  Sparkles,
  BarChartHorizontal,
  Zap,
} from 'lucide-react';

const features = [
  {
    icon: Book,
    title: 'Book Uploads',
    description:
      'Upload any book and have it automatically divided into chapters and subchapters for easier digestion.',
  },
  {
    icon: Brain,
    title: 'AI Explanations',
    description:
      'Get instant simple or detailed AI-generated explanations for any concept in your books.',
  },
  {
    icon: ListCheck,
    title: 'Personalized Quizzes',
    description:
      'Test your knowledge with automatically generated quizzes with varying difficulty levels.',
  },
  {
    icon: BarChartHorizontal,
    title: 'Progress Tracking',
    description:
      'Visualize your learning journey with comprehensive statistics and progress indicators.',
  },
  {
    icon: Sparkles,
    title: 'Smart Recommendations',
    description:
      'Receive personalized recommendations on what to study next based on your performance.',
  },
  {
    icon: Zap,
    title: 'Quick Summaries',
    description:
      "Get concise summaries of entire chapters or books when you're short on time.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
            Powerful Features for Smarter Learning
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Our intelligent platform combines cutting-edge AI with proven
            learning methodologies to help you learn faster and remember longer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative overflow-hidden bg-white rounded-xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-transparent to-purple-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg md:text-xl font-medium mb-2 group-hover:text-purple-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
