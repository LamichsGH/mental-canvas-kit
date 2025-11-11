import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Mail, CheckCircle2, Loader2, Instagram, Facebook } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email address" }).max(255),
  agreedToPrivacy: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy"
  })
});

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    const result = emailSchema.safeParse({ email, agreedToPrivacy });
    
    if (!result.success) {
      const firstError = result.error.errors[0]?.message;
      toast.error(firstError || "Please check your input");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual backend integration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      toast.success("Welcome to The Haus!", {
        description: "You're now part of the community. Check your email for updates.",
      });
      
      // Reset form after success
      setTimeout(() => {
        setEmail("");
        setAgreedToPrivacy(false);
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="border-0 shadow-subtle rounded-xl overflow-hidden">
            <CardContent className="p-8 md:p-12">
              {isSuccess ? (
                <div className="text-center animate-scale-in">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-3xl mb-4">You're In!</h3>
                  <p className="text-muted-foreground">
                    Welcome to The Haus. Check your email for exclusive updates.
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <Mail className="h-12 w-12 mx-auto mb-4 text-primary" strokeWidth={1.5} />
                    <h2 className="text-3xl md:text-4xl mb-4">
                      Join Our Mailing List
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Get early access to new releases
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 rounded-xl border-border text-base"
                        disabled={isSubmitting}
                        maxLength={255}
                      />
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="privacy" 
                        checked={agreedToPrivacy}
                        onCheckedChange={(checked) => setAgreedToPrivacy(checked as boolean)}
                        disabled={isSubmitting}
                      />
                      <Label 
                        htmlFor="privacy" 
                        className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                      >
                        I agree to receive marketing emails and accept the privacy policy
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-12 rounded-xl shadow-subtle text-base"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Joining...
                        </>
                      ) : (
                        "Stay in the Loop"
                      )}
                    </Button>
                  </form>

                  {/* Social Proof */}
                  <div className="mt-8 pt-8 border-t border-border">
                    <p className="text-center text-sm text-muted-foreground mb-4">
                      Join 5,000+ others in The Haus community
                    </p>
                    <div className="flex justify-center gap-4">
                      <a 
                        href="https://instagram.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-secondary/30 hover:bg-secondary/50 flex items-center justify-center transition-colors"
                      >
                        <Instagram className="h-5 w-5 text-foreground" />
                      </a>
                      <a 
                        href="https://facebook.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-secondary/30 hover:bg-secondary/50 flex items-center justify-center transition-colors"
                      >
                        <Facebook className="h-5 w-5 text-foreground" />
                      </a>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
