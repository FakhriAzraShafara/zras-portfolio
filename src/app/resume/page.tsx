"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { experiences, education, skills, volunteeringExperiences, languages, certifications } from "../data/resume"
import { Certification } from "@/types"
import { useState } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

interface CertificationModalProps {
  certification: Certification;
  onClose: () => void;
}

const CertificationModal = ({ certification, onClose }: CertificationModalProps) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    onClick={onClose}
  >
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full m-4"
      onClick={e => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{certification.name}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <X className="h-6 w-6" />
        </button>
      </div>
      <h3 className="text-xl font-semibold mb-2">{certification.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{certification.date}</p>
      <p className="mb-4">{certification.details}</p>
      <div className="mt-4">
        <div className="mt-2 flex justify-end">
          <a 
            href={certification.imageUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-primary text-white dark:text-gray-900 px-4 py-2 rounded-full flex items-center hover:bg-primary-dark transition-colors duration-300"
          >
            View Certificate <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.div>
  </motion.div>
)

export default function Resume() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={stagger}
      className="container mx-auto px-4 py-8 space-y-12"
    >
      <motion.h1 variants={fadeIn} className="text-4xl font-bold tracking-tight mb-8">
        Resume
      </motion.h1>

      {/* Experience Section */}
      <motion.section variants={fadeIn}>
        <h2 className="text-2xl font-semibold mb-4">Professional Experience</h2>
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader>
                <CardTitle>{exp.title}</CardTitle>
                <CardDescription>{exp.company} | {exp.period} | {exp.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-2 text-muted-foreground">{exp.description}</p>
                <ul className="list-disc pl-5 space-y-1">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground">{resp}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section variants={fadeIn}>
        <h2 className="text-2xl font-semibold mb-4">Education</h2>
        <Card>
          <CardHeader>
            <CardTitle>{education.degree}</CardTitle>
            <CardDescription>{education.institution} | {education.period} | {education.location}</CardDescription>
          </CardHeader>
        </Card>
      </motion.section>

      {/* Certification Section */}
      <motion.section variants={fadeIn}>
        <h2 className="text-2xl font-semibold mb-4">Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow" 
                  onClick={() => setSelectedCert(cert)}>
              <CardHeader>
                <CardTitle>{cert.name}</CardTitle>
                <CardDescription>{cert.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{cert.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section variants={fadeIn}>
        <h2 className="text-2xl font-semibold mb-4">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.details.map((skill, idx) => (
                    <TooltipProvider key={idx}>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge variant="secondary" className="cursor-help">
                            {skill.name} ({skill.proficiency})
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{skill.note}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Languange Sections */}
            <motion.section variants={fadeIn}>
              <h2 className="text-2xl font-semibold mb-4">Languages</h2>
              <Card className="overflow-hidden">
                <CardContent className="pt-6">
                  <div className="grid gap-4">
                    {languages.map((language, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          delay: index * 0.1,
                          type: "spring",
                          stiffness: 100 
                        }}
                        className="flex items-center justify-between group hover:bg-primary/10 p-3 rounded-xl transition-all duration-300 ease-in-out"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-lg tracking-wide">{language.lang}</span>
                        </div>
                        <Badge 
                          variant="secondary"
                          className="transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                        >
                          {language.level}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.section>

      {/* Volunteering Section */}
      <motion.section variants={fadeIn}>
        <h2 className="text-2xl font-semibold mb-4">Volunteering Experience</h2>
        <div className="space-y-6">
          {volunteeringExperiences.map((exp, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{exp.title}</CardTitle>
                <CardDescription>{exp.organization} | {exp.period}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{exp.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      <AnimatePresence>
        {selectedCert && (
          <CertificationModal 
            certification={selectedCert} 
            onClose={() => setSelectedCert(null)} 
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

