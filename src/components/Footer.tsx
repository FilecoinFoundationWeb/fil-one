const Footer = () => {
  const links = {
    Navigation: ["About", "Features", "Pricing"],
    Resources: ["Documentation", "Status", "Contact", "Threads"],
    Legal: ["Privacy Policy", "Terms of Service", "Security"],
  };

  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-xs">H</span>
              </div>
              <span className="font-display font-bold text-foreground">Hyperspace</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              S3-compatible data storage.
              <br />
              Built for the future.
            </p>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-sm text-foreground mb-4">{title}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-border text-xs text-muted-foreground">
          © 2026 Hyperspace. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
