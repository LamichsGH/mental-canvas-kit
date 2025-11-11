import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const faqs = [
  {
    q: "What makes FuelHaus different from other hot chocolates?",
    a: "FuelHaus blends real cocoa with electrolytes and magnesium for hydration and calm — without excess sugar or artificial ingredients. Comfort that actually does something for your body"
  },
  {
    q: "How many servings are in a pack?",
    a: "Each pouch makes around 10 servings (based on 40g per serving)."
  },
  {
    q: "Is it vegan or dairy-free?",
    a: "Yes — completely plant-based, made with organic coconut milk instead of dairy."
  },
  {
    q: "Does it actually taste good?",
    a: "Absolutely. Our testers rated taste 10/10 — it's rich and smooth, lightly sweetened with coconut sugar, and naturally creamy from organic coconut milk"
  },
  {
    q: "How does it help with recovery?",
    a: "Our electrolyte and magnesium blend helps restore balance after activity or stress — supporting hydration, muscle function, and calm"
  },
  {
    q: "Is it suitable for everyday use?",
    a: "Yes — it's gentle enough for daily recovery. Most people enjoy a cup after workouts, in the evenings, or anytime they want to unwind and rehydrate softly"
  }
];

export const FAQ = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl mb-4">
              FAQs
            </h2>
          </div>

          <Card className="border-0 shadow-subtle rounded-xl overflow-hidden">
            <CardContent className="p-6 md:p-8">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-border">
                    <AccordionTrigger className="text-left hover:text-primary">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card className="mt-12 border-0 bg-gradient-to-br from-primary/5 to-secondary/10 shadow-subtle rounded-xl">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl mb-3">Still Have Questions?</h3>
              <p className="text-muted-foreground mb-6">
                We're here to help. Reach out anytime.
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
              >
                Contact Us
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};