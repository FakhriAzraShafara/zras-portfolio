"use client"

import React from "react"
import { motion } from "framer-motion"
import { skills } from "../../app/data/resume"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Badge } from "../ui/badge"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 }
}

export default function Skills() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="container mx-auto px-4 py-8 space-y-8"
    >
      <motion.h1 
        variants={item}
        className="text-3xl font-bold tracking-tight"
      >
        Skills
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((category, index) => (
          <motion.div
            key={category.name}
            variants={item}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div 
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="flex flex-wrap gap-2"
                >
                  {category.details.map((skill, idx) => (
                    <motion.div
                      key={skill.name}
                      variants={item}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Badge variant="secondary" className="text-sm">
                        {skill.name}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

