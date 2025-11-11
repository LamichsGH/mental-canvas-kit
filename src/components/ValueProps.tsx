const values = [
  {
    title: "Clean, Honest Ingredients",
    description: "Made with real, natural ingredients — organic wherever possible — because better hydration starts clean",
  },
  {
    title: "Healthy Indulgence",
    description: "Tastes like a treat, nourishes like a ritual. You'll think you're indulging — your body knows better",
  },
  {
    title: "Balanced Nourishment",
    description: "Low in calories, rich in feel-good balance — just enough to restore, never enough to weigh you down",
  },
];

export const ValueProps = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Purple/Lavender Outer Border */}
        <div className="max-w-7xl mx-auto border-[12px] border-[#8B7AB8] rounded-lg animate-fade-in">
          {/* Tan/Beige Inner Border */}
          <div className="border-[12px] border-[#c9b399] rounded-lg">
            {/* White/Cream Background */}
            <div className="bg-[#faf8f5] p-8 md:p-12 lg:p-16">
              {/* Section Headline */}
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black">
                  Designed to Hydrate Softly
                </h2>
              </div>

              {/* Three Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
                {values.map((value, index) => (
                  <div 
                    key={index} 
                    className="text-center space-y-4 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <h3 className="text-xl md:text-2xl font-semibold text-black">
                      {value.title}
                    </h3>
                    <p className="text-sm md:text-base text-black leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
