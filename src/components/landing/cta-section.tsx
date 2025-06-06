"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="container py-20 md:py-32">
      <motion.div
        className="glass-card p-8 md:p-12 text-center max-w-4xl mx-auto overflow-hidden relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Background glow effect */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-lux-cyan/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-lux-purple/20 rounded-full blur-3xl"></div>

        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Ready to Create Your <span className="text-lux-cyan">Luxurious</span> Chatbot?
        </motion.h2>

        <motion.p
          className="text-xl text-white/70 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Join thousands of businesses elevating their customer experience with TheLux.app's premium chatbot platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/signup" className="glass-button inline-flex items-center text-lg px-6 py-3">
            Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <p className="mt-4 text-white/50 text-sm">No credit card required for free plan</p>
        </motion.div>
      </motion.div>
    </section>
  )
}

