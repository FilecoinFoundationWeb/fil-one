import { motion } from "framer-motion";
import { Database, Key, HardDrive, ShieldCheck, Zap } from "lucide-react";

const features = [
  { icon: Database, title: "S3-compatible buckets", desc: "Use existing tools and workflows with standard S3 interfaces." },
  { icon: Key, title: "API key management", desc: "Generate, rotate, and revoke keys with fine-grained access controls." },
  { icon: HardDrive, title: "Hyperscale storage economics", desc: "Optimized for large datasets with predictable, low-cost pricing." },
  { icon: ShieldCheck, title: "Verifiable durability", desc: "Cryptographic proofs ensure your data is safe and intact." },
  { icon: Zap, title: "Edge-fast retrieval", desc: "Global CDN ensures low-latency access from anywhere." },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            S3-compatible object storage
            <br />
            built for large-scale data.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Use your existing S3 tools and libraries to store data with predictable pricing, every object's durability, and no hidden egress charges.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-2xl border border-border bg-card p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
