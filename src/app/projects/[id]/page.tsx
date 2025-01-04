"use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll } from "framer-motion"
import { 
  ArrowLeft,
  ExternalLink,
  Github,
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { projects } from "../../data/portfolio-data"
import { MediaGallery } from "@/components/MediaGallery"
import { Project } from '@/types'

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projects.find(p => p.id === params.id) as Project | undefined

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/projects" className="flex items-center">
            <ArrowLeft className="mr-2" /> Back to Projects
          </Link>
        </Button>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <motion.div 
                className="relative aspect-video mb-6 overflow-hidden rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </motion.div>
              <h1 className="text-4xl font-bold mb-6 text-primary">{project.title}</h1>
              <p className="text-lg mb-6 text-muted-foreground">{project.description}</p>
              <h2 className="text-2xl font-semibold mb-4 text-primary">Key Achivements</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                {project.achievements.map((achievement, index) => (
                  <li key={index} className="text-lg">
                  {achievement}
                  </li>
                ))}
                </ul>
            </div>
            
            <div>
              <Card className="bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle>Technologies Used</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tech => (
                      <Badge 
                        key={tech}
                        variant="secondary"
                        className="text-sm"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Project Links</h3>
                    <div className="space-y-2">
                        {project.liveUrl && (
                        <Button variant="outline" asChild className="w-full">
                          <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center"
                          >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Live Project
                          </a>
                        </Button>
                        )}
                      {project.githubUrl &&
                      <Button variant="outline" asChild className="w-full">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          View on Git
                        </a>
                      </Button>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mb-6 text-primary">Project Gallery</h2>
          <MediaGallery media={project.media} />
        </motion.div>
      </div>
    </div>
  )
}