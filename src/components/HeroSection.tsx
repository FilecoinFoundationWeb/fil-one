import { motion } from "framer-motion";
import dashboardImg from "@/assets/dashboard-preview.png";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="container mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-5xl md:text-7xl font-bold text-foreground tracking-tight"
        >
          Hyper<span className="text-primary">space</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto"
        >
          S3-compatible storage powered by Filecoin.
          <br />
          Immutable, verifiable, and built for scale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#" className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
            Get 10 days for free →
          </a>
          <a href="#" className="bg-accent text-accent-foreground px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
            Meet the team →
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-xs text-muted-foreground"
        >
          Immutable data, verifiable durability, no egress, and no hidden charges.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-border"
        >
          <img src={dashboardImg} alt="Hyperspace Dashboard" className="w-full" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
