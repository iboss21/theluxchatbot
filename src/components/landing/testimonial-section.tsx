"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"

const testimonials = [
  {
    quote:
      "TheLux.app transformed our customer support. The AI personality engine makes our chatbot feel like a real team member, not just a bot.",
    author: "Sarah Johnson",
    role: "Head of Customer Experience",
    company: "TechVision Inc.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "The Glassmorphic UI is stunning. Our customers love interacting with our chatbot, and the analytics insights have helped us optimize our conversions by 40%.",
    author: "Michael Chen",
    role: "Marketing Director",
    company: "Elevate Brands",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "As an enterprise client, the white-label features and team collaboration tools are game-changers. Worth every penny of our subscription.",
    author: "Jessica Williams",
    role: "CTO",
    company: "Global Solutions Ltd",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="testimonials" className="container py-20 md:py-32">
      <div className="text-center mb-16">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-gradient-to-r from-lux-cyan to-white bg-clip-text text-transparent">
            What Our Clients Say
          </span>
        </motion.h2>
        <motion.p
          className="text-xl text-white/70 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Join hundreds of satisfied customers using TheLux.app
        </motion.p>
      </div>

      <motion.div
        className="glass-card p-8 md:p-12 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <div className="absolute -top-6 -left-6 text-6xl text-lux-cyan opacity-50">"</div>

          <div className="mb-8">
            <p className="text-xl md:text-2xl italic mb-8">{testimonials[activeIndex].quote}</p>

            <div className="flex items-center">
              <div className="mr-4 rounded-full overflow-hidden h-16 w-16 border-2 border-lux-cyan/30">
                <Image
                  src={testimonials[activeIndex].avatar || "/placeholder.svg"}
                  alt={testimonials[activeIndex].author}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-bold text-lg">{testimonials[activeIndex].author}</div>
                <div className="text-white/70">{testimonials[activeIndex].role}</div>
                <div className="text-lux-cyan">{testimonials[activeIndex].company}</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  activeIndex === index ? "bg-lux-cyan" : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

