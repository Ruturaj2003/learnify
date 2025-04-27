import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative z-10">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse-slow" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-20">
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight animate-fade-in">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Transform Your Learning
            </span>{" "}
            with AI-Powered Knowledge
          </h1>

          <p className="text-base md:text-xl text-foreground/70 mb-8 max-w-3xl mx-auto animate-fade-in">
            Upload your books, get AI explanations, and take personalized
            quizzes. Track your progress and master any subject more efficiently
            than ever before.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 animate-fade-in">
            <Button size="lg" className="animate-pulse-slow w-full sm:w-auto">
              Get Started for Free
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              See How It Works
            </Button>
          </div>

          <div className="relative mx-auto w-full max-w-4xl">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl animate-float">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] opacity-50 bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 animate-scale-up">
                <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg border border-border/50 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-full shrink-0">
                      <div className="w-4 h-4 bg-primary-foreground rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">AI Explanation</h4>
                      <p className="text-sm text-foreground/70">
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
