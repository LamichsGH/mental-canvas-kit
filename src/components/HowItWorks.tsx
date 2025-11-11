const steps = [
  {
    title: "Step 1",
    description: "Add 40g of Recovery Cocoa to your favorite mug."
  },
  {
    title: "Step 2",
    description: "Pour in 250ml of hot water — milk optional, or use your favorite plant-based alternative"
  },
  {
    title: "Step 3",
    description: "Stir well — it mixes smoothly with a spoon, but a frother makes it velvet-smooth."
  },
  {
    title: "Step 4",
    description: "Take a moment, sip slowly, and enjoy your calm."
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl">
              Your Moment, Made Simple
            </h2>
          </div>

          <div className="bg-card rounded-xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-36 h-36 bg-secondary/20 rounded-lg mx-auto mb-4 flex items-center justify-center"><span className="text-7xl">☕</span></div>
                  <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};