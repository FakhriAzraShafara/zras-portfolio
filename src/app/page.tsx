"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Download, Send, ArrowUp, Github, Linkedin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { projects } from "./data/portfolio-data"
import { personalInfo } from "./data/personal-info"
import { TypeAnimation } from 'react-type-animation';
import * as z from 'zod'
import { ErrorBoundary } from 'react-error-boundary'
import { ContactsSection } from "@/components/Contacts"
import{ HouseIllustration } from "@/components/HouseIllustration";
import { UniverseIllustration } from "@/components/UniverseIllustration"

export default function Home() {
  const { scrollYProgress } = useScroll()
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef(null)

  const imageY = useTransform(scrollYProgress, [0, 0.5], [0, -50])
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2])
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 50])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    const debouncedToggleVisibility = debounce(toggleVisibility, 100)
    window.addEventListener('scroll', debouncedToggleVisibility)
    return () => window.removeEventListener('scroll', debouncedToggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/pdf/cv-Fakhri Azra Shafara.pdf'
    link.download = 'cv-Fakhri Azra Shafara.pdf'
    link.click()
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <>
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
          style={{ scaleX: scrollYProgress }}
        />
        
        {/* Enhanced Hero Section */}
        <section ref={heroRef} className="min-h-screen relative overflow-hidden bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/20 via-background to-secondary/20">
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url("/images/subtle-pattern.png")',
              backgroundSize: '200px 200px',
              y: useTransform(scrollYProgress, [0, 1], [0, -100]),
            }}
          />
          {/* 3D Background Effect */}
          <div className="absolute inset-0 w-full h-full perspective-1000">
            <motion.div
              className="absolute inset-0 bg-grid-pattern opacity-[0.03]"
              style={{
                rotateX: useTransform(scrollYProgress, [0, 1], [0, 15]),
                rotateY: useTransform(scrollYProgress, [0, 1], [0, -15]),
              }}
            />
          </div>
          
          {/* Background Illustrations */}
          <div className="absolute inset-0 w-full h-full">
            {/* Left Side Illustration */}
      <HouseIllustration side="left" />

            {/* Right Side Illustration */}
      <UniverseIllustration/>

            {/* Animated Dots Grid */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
          </div>

          {/* Floating Shapes */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-primary/10"
                style={{
                  width: `${Math.random() * 50 + 10}px`,
                  height: `${Math.random() * 50 + 10}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, Math.random() * 50 - 25],
                  x: [0, Math.random() * 50 - 25],
                  scale: [1, Math.random() * 0.3 + 0.8],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </motion.div>

          {/* Floating Geometric Shapes */}
          <div className="absolute inset-0 overflow-hidden">
            {['triangle', 'square', 'circle'].map((shape, index) => (
              <motion.div
                key={shape}
                className={`absolute ${shape === 'triangle' ? 'border-l-[50px] border-l-transparent border-r-[50px] border-r-transparent border-b-[86.6px]' : shape === 'square' ? 'w-16 h-16' : 'w-16 h-16 rounded-full'} ${index === 0 ? 'border-primary/30' : index === 1 ? 'border-secondary/30' : 'border-accent/30'}`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 h-screen flex items-center justify-center min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-7xl w-full">
              {/* Left side: Content */}
            {/* Left side: Content */}
            <motion.div
              style={{ y: textY, opacity }}
              className="lg:col-span-7 text-left flex flex-col justify-center order-2 lg:order-1"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-gray-400 to-accent-foreground"
              >
                {personalInfo.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-muted-foreground mb-6"
              >
                {personalInfo.title}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-lg md:text-xl text-muted-foreground mb-8 h-32"
              >
                <TypeAnimation
                  sequence={[
                    'I am a fresh graduate in computer engineering.',
                    1000,
                    'I excel in both team and independent settings.',
                    1000,
                    'My passion lies in web and application development.',
                    1000,
                    'I am committed to staying current with tech advancements.',
                    1000,
                    'I thrive in high-pressure environments.',
                    1000,
                    'I am eager to contribute my skills to the industry.',
                    1000,
                  ]}
                  wrapper="span"
                  speed={50}
                  style={{ display: 'inline-block' }}
                  repeat={Infinity}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="#contact" passHref>
                  <Button
                    size="lg"
                    className="group bg-primary hover:bg-primary/90 relative overflow-hidden"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    <span className="relative z-10">Contact Me</span>
                    <motion.div
                      className="absolute inset-0 bg-secondary"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <Send className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 relative z-10" />
                  </Button>
                </Link>
                  <Button
                    variant="outline"
                    size="lg"
                    className="group relative overflow-hidden"
                    onClick={handleDownload}
                  >
                    <span className="relative z-10">Download CV</span>
                    <motion.div
                      className="absolute inset-0 bg-primary"
                      initial={{ y: '100%' }}
                      whileHover={{ y: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <Download className="w-4 h-4 mr-2 transition-transform group-hover:-translate-y-1 relative z-10" />
                  </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex mt-8 space-x-4"
              >
                <motion.a
                  whileHover={{ scale: 1.1, rotateZ: 10 }}
                  whileTap={{ scale: 0.95 }}
                  href={personalInfo.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, rotateZ: -10 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://github.com/FakhriAzraShafara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  <Github className="w-6 h-6" />
                </motion.a>
              </motion.div>
            </motion.div>

              {/* Right side: Enhanced 3D Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.6, -0.05, 0.01, 0.99]
                }}
                style={{ y: imageY, scale: imageScale }}
                className="lg:col-span-5 relative w-full h-full max-w-md mx-auto flex items-center justify-center order-1 lg:order-2"
              >
                {/* Image container with emergence effect */}
                <motion.div 
                  className="relative w-full aspect-square"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Background circle and gradient */}
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/20 rounded-full" />
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      {/* Rotating rings */}
                      <motion.div
                        className="absolute inset-0 border-[3px] border-secondary/30 rounded-full"
                        animate={{ rotateZ: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.div
                        className="absolute inset-4 border-[3px] border-primary/30 rounded-full"
                        animate={{ rotateZ: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.div
                        className="absolute inset-8 border-[3px] border-accent/30 rounded-full"
                        animate={{ rotateZ: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                  </div>

                  {/* Image with mask */}
                  <div className="absolute inset-0 rounded-full border-[6px] border-primary/20 shadow-2xl overflow-hidden">
                    <motion.div
                      className="absolute inset-0 scale-125 origin-center"
                      whileHover={{ 
                        transform: "perspective(1000px) rotateX(-5deg) translateY(-20px) translateZ(60px)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <Image
                        src="/images/fotoku.png"
                        alt={personalInfo.name}
                        fill
                        priority
                        className="object-cover scale-110"
                        style={{
                          clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)'
                        }}
                      />
                      
                      {/* Bottom gradient overlay */}
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
                    </motion.div>
                  </div>

                  {/* Glow effect */}
                  <motion.div
                    className="absolute -inset-4 rounded-full opacity-20"
                    animate={{ 
                      boxShadow: [
                        "0 0 20px 10px var(--primary)",
                        "0 0 40px 20px var(--primary)",
                        "0 0 20px 10px var(--primary)"
                      ]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Animated Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <svg width="30" height="50" viewBox="0 0 30 50" className="text-primary">
              <motion.path
                d="M15 5 L15 45 M5 35 L15 45 L25 35"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </svg>
          </motion.div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-20 bg-secondary/5">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-8 text-center"
            >
              Featured Projects
            </motion.h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.slice(0, 3).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col">
                    <div className="relative h-48">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="rounded-t-lg object-cover"
                      />
                    </div>
                    <CardContent className="p-6 flex-grow flex flex-col">
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 flex-grow">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                      <Link
                        href={`/projects/${project.id}`}
                        className="inline-flex items-center text-primary hover:underline mt-auto"
                      >
                        View Details 
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center mt-12"
            >
              <Button asChild size="lg">
                <Link href="/projects">View All Projects</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative py-16 bg-background min-h-screen flex items-center">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="relative w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                Let&apos;s Connect
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Have a project in mind or just want to chat? Feel free to reach out.
                I&apos;m always open to discussing new opportunities and ideas.
              </p>
            </motion.div>
            <ContactsSection />
          </div>
        </section>

        {/* Scroll to Top Button */}
        <motion.button
          className={`fixed bottom-8 right-8 p-3 rounded-full bg-primary text-primary-foreground shadow-lg ${
            isVisible ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-300`}
          onClick={scrollToTop}
          initial={{ scale: 0 }}
          animate={{ scale: isVisible ? 1 : 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      </>
    </ErrorBoundary>
  )
}
function debounce(func: () => void, wait: number) {
  let timeoutId: NodeJS.Timeout | null = null;
  
  return function () {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      func();
    }, wait);
  };
}

