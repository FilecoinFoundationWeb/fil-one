import { motion } from "framer-motion";

const CtaSection = () => {
  return (
    <section className="py-24 px-6 bg-secondary/50">
      <div className="container mx-auto text-center max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-bold text-foreground"
        >
          Ready to enter hyperspace?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-muted-foreground"
        >
          Start with 2 TB free for 10 days. No credit card required.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#" className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
            Start building now
          </a>
          <a href="#" className="border-2 border-primary text-primary px-6 py-3 rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors">
            Talk to our team
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
