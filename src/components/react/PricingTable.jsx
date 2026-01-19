import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";
import { clsx } from "clsx";

// Simple hook to detect desktop
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);
  return matches;
}

export function PricingTable({
  plans,
  title = "Simple, Transparent Pricing",
  description = "Choose the license that fits your project",
  showToggle = false
}) {
  const [isMonthly, setIsMonthly] = useState(true);
  // Switch to 1280px for desktop grid layout (4 columns)
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const switchRef = useRef(null);

  const handleToggle = (e) => {
    const checked = e.target.checked;
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: [
          "#0e7490", // Cyan
          "#1e3a8a", // Blue
          "#0f172a", // Slate
          "#ffffff",
        ],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  return (
    <div className="pricing-container-react">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl font-display text-white">
          {title}
        </h2>
        <p className="text-muted text-lg whitespace-pre-line text-neutral-400">
          {description}
        </p>
      </div>

      {showToggle && (
        <div className="pricing-switch-container">
          <label className="pricing-switch-label">
            <input 
              type="checkbox" 
              className="pricing-switch-input"
              checked={!isMonthly}
              onChange={handleToggle}
              ref={switchRef}
            />
            <span className="pricing-switch-slider"></span>
          </label>
          <span className="pricing-period-text">
            Annual billing <span className="pricing-save-badge">(Save 20%)</span>
          </span>
        </div>
      )}

      <div className="pricing-grid-react">
        {plans.map((plan, index) => {
          return (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={
                isDesktop
                  ? {
                      y: plan.isPopular ? -20 : 0,
                      opacity: 1,
                      scale: plan.isPopular ? 1.05 : 1.0,
                      zIndex: plan.isPopular ? 10 : 1,
                    }
                  : {
                      y: 0,
                      opacity: 1,
                      scale: 1,
                    }
              }
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 100,
                damping: 30,
                delay: index * 0.1,
                opacity: { duration: 0.5 },
              }}
              className={clsx(
                "pricing-card-react",
                plan.isPopular && "popular"
              )}
            >
              {plan.isPopular && (
                <div className="popular-badge">
                  <Star className="h-3 w-3 fill-current" />
                  <span>Most Popular</span>
                </div>
              )}

              <div className="flex-1 flex flex-col">
                <h3 className="pricing-name">{plan.name}</h3>
                
                <div className="pricing-price-wrapper">
                  <span className="pricing-price">
                    <NumberFlow
                      value={
                        isMonthly ? Number(plan.price) : Number(plan.yearlyPrice || plan.price)
                      }
                      format={{
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }}
                      transformTiming={{
                        duration: 500,
                        easing: "ease-out",
                      }}
                      willChange
                    />
                  </span>
                  <span className="pricing-period">
                    {plan.period && `/ ${plan.period}`}
                  </span>
                </div>

                {plan.format && (
                   <p className="text-sm text-neutral-400 font-mono mb-6 text-center">{plan.format}</p>
                )}

                <ul className="pricing-features-list">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="pricing-feature-item">
                      <Check className="feature-icon h-4 w-4" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pricing-btn-wrapper">
                  <a
                    href={plan.href || "#"}
                    className={clsx(
                      "gradient-btn w-full",
                      plan.isPopular && "gradient-btn-brand"
                    )}
                    style={{
                      width: '100%',
                      textAlign: 'center'
                    }}
                  >
                    {plan.buttonText}
                  </a>
                </div>
                
                {plan.description && (
                  <p className="pricing-description text-center">
                    {plan.description}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
