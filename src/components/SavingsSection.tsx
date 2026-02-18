import { motion } from "framer-motion";
import { useState } from "react";

const providers = ["Filecoin", "Backblaze", "Wasabi", "AWS Standard", "AWS Glacier"];
const colors = ["bg-primary", "bg-primary/70", "bg-primary/50", "bg-accent", "bg-accent/80"];

const SavingsSection = () => {
  const [storage, setStorage] = useState(50);
  const [egress, setEgress] = useState(10);

  const costs = [
    storage * 4.99,
    storage * 5,
    storage * 5.99,
    storage * 23 + egress * 90,
    storage * 3.6 + egress * 90,
  ];

  const maxCost = Math.max(...costs);

  return (
    <section id="compare" className="py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Savings</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
            See how much you can save
          </h2>
          <p className="mt-3 text-muted-foreground">
            Estimate your costs per TB/month with no egress or hidden charges.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center justify-between">
              <span>📦 Total storage amount (TB)</span>
              <span className="text-primary font-mono">{storage}</span>
            </label>
            <input
              type="range"
              min={1}
              max={500}
              value={storage}
              onChange={(e) => setStorage(+e.target.value)}
              className="w-full accent-primary"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center justify-between">
              <span>🔄 Egress per month (TB)</span>
              <span className="text-primary font-mono">{egress}</span>
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={egress}
              onChange={(e) => setEgress(+e.target.value)}
              className="w-full accent-primary"
            />
          </div>
        </div>

        <div className="flex items-end gap-4 justify-center h-64">
          {providers.map((p, i) => (
            <motion.div
              key={p}
              className="flex flex-col items-center gap-2 flex-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="text-xs font-medium text-foreground">
                ${costs[i].toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
              <div
                className={`w-full rounded-t-lg ${colors[i]} transition-all duration-500`}
                style={{ height: `${Math.max((costs[i] / maxCost) * 180, 20)}px` }}
              />
              <span className="text-xs text-muted-foreground text-center leading-tight">{p}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SavingsSection;
