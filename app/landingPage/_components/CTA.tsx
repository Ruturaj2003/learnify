import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-r from-primary/10 to-accent/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Start Your Learning Revolution Today
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who have transformed their study habits
            and achieved their goals with Learnify.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="animate-pulse-slow">
              Get Started for Free
            </Button>
            <Button size="lg" variant="outline">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
