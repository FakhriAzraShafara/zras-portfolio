"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { projects } from "../data/portfolio-data"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Projects() {

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={stagger}
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-background"
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `radial-gradient(circle at 3% 3%, rgba(var(--primary-rgb) / 0.15) 0%, transparent 25%), 
                            radial-gradient(circle at 97% 97%, rgba(var(--secondary-rgb) / 0.1) 0%, transparent 25%)`,
          backgroundSize: "100% 100%, 50% 50%",
          backgroundPosition: "0 0, 100% 100%",
        }}
        animate={{
          backgroundSize: ["100% 100%, 50% 50%", "120% 120%, 70% 70%"],
          backgroundPosition: ["0 0, 100% 100%", "-20% -20%, 80% 80%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '100%',
        }}
        animate={{ y: [0, 50, 0] }} // Smooth vertical loop
        transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
      />

      <div className="container mx-auto px-4 py-24 space-y-16 relative z-10">
        <motion.h1 
          variants={fadeInUp} 
          className="text-6xl font-bold tracking-tight text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-secondary"
        >
          Featured Projects
        </motion.h1>
        
        <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <Card className="overflow-hidden h-full flex flex-col bg-card/30 backdrop-blur-xl border-primary/5 shadow-xl hover:shadow-primary/10 transition-all duration-500">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                </div>
                <CardHeader className="relative z-10">
                  <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary group-hover:from-secondary group-hover:to-primary transition-all duration-500">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground/80">{project.period}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col relative z-10">
                  <p className="mb-6 text-muted-foreground/90 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, idx) => (
                      <Badge 
                        key={idx} 
                        variant="secondary" 
                        className="bg-primary/5 text-primary/90 backdrop-blur-sm hover:bg-primary/10 transition-colors duration-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    variant="default" 
                    asChild 
                    className="mt-auto group/btn bg-gradient-to-r from-primary/90 to-secondary/90 hover:from-secondary/90 hover:to-primary/90 transition-all duration-500"
                  >
                    <Link href={`/projects/${project.id}`} className="flex items-center justify-center">
                      Explore Project
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

