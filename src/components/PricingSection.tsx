import { motion } from "framer-motion";
import { Check } from "lucide-react";

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 px-6 bg-secondary/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Pricing</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
            Simple, predictable pricing
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Pay-as-you-go */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border bg-background p-8"
          >
            <p className="text-sm text-muted-foreground font-medium">Pay-as-you-go</p>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-4xl font-bold text-foreground">$4.99</span>
              <span className="text-muted-foreground line-through text-sm">$6</span>
              <span className="text-sm text-muted-foreground">/TB/month</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Ideal for developers and teams getting started with scalable, verifiable storage.
            </p>

            <ul className="mt-6 space-y-3">
              {["Pay monthly", "S3-compatible", "No minimum commitment", "Data integrity guarantee"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 text-primary" />
                  {item}
                </li>
              ))}
            </ul>

            <button className="mt-8 w-full border-2 border-primary text-primary rounded-full py-3 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors">
              Try for free →
            </button>
          </motion.div>

          {/* Business */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-border bg-background p-8"
          >
            <p className="text-sm text-muted-foreground font-medium">Business plan</p>
            <h3 className="mt-4 font-display text-3xl font-bold text-accent">Custom pricing</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Ideal for enterprises with multi-petabyte storage needs or custom data retention requirements.
            </p>

            <ul className="mt-6 space-y-3">
              {["Flexible 1–3 year contracts", "No egress or API call fees", "Priority 24/7 support", "Custom SLA and deployment options"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 text-accent" />
                  {item}
                </li>
              ))}
            </ul>

            <button className="mt-8 w-full bg-accent text-accent-foreground rounded-full py-3 text-sm font-medium hover:opacity-90 transition-opacity">
              Contact sales team
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
