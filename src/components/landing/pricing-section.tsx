"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import Link from "next/link"

interface PricingPlan {
  name: string
  price: string
  period?: string
  description: string
  features: string[]
  cta: string
  href: string
  highlighted: boolean
}

interface PricingSectionProps {
  plans: PricingPlan[]
}

export function PricingSection({ plans }: PricingSectionProps) {
  return (
    <section id="pricing" className="container py-20 md:py-32">
      <div className="text-center mb-16">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-gradient-to-r from-lux-cyan to-white bg-clip-text text-transparent">Pricing Plans</span>
        </motion.h2>
        <motion.p
          className="text-xl text-white/70 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Choose the perfect plan for your needs. Scale as you grow.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            className={`glass-card p-6 ${
              plan.highlighted ? "border-lux-cyan/50 shadow-[0_0_20px_rgba(0,255,255,0.2)]" : "border-white/20"
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {plan.highlighted && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-lux-cyan text-black text-xs font-bold px-3 py-1 rounded-full">
                MOST POPULAR
              </div>
            )}
            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
            <div className="mb-4">
              <span className="text-3xl font-bold">{plan.price}</span>
              {plan.period && <span className="text-white/70">{plan.period}</span>}
            </div>
            <p className="text-white/70 mb-6">{plan.description}</p>
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <Check className="h-5 w-5 text-lux-cyan mr-2 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href={plan.href}
              className={`block text-center py-2 rounded-lg transition-colors ${
                plan.highlighted
                  ? "bg-lux-cyan hover:bg-lux-cyan/90 text-black font-medium"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              {plan.cta}
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

