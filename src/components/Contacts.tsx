"use client"

import React, { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, MapPin, Linkedin, Github, Instagram, Send, MessageCircle } from 'lucide-react'
import { personalInfo } from '@/app/data/personal-info'
import { useToast } from "@/hooks/use-toast" // Change this line
import { Toaster } from "@/components/ui/toaster" // Add this line
import emailjs from '@emailjs/browser';

// Update form data interface
interface FormData {
  name: string;
  email: string;
  message: string;
}

export function ContactsSection() {
  const { scrollYProgress } = useScroll()
  
  // Parallax transforms
  const leftCardY = useTransform(scrollYProgress, [0.7, 1], [100, 0])
  const rightCardY = useTransform(scrollYProgress, [0.7, 1], [150, 0])
  const opacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1])

  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' })
  const [activeTab, setActiveTab] = useState('whatsapp')
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (activeTab === 'whatsapp') {
        const whatsappMessage = `*Portfolio Site Message*%0A%0A*Name:* ${formData.name}%0A*Message:* ${formData.message}`
        const phoneNumber = '6289690736575'
        window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${whatsappMessage}`, '_blank')
        toast({
          title: "Message Redirected",
          description: "Opening WhatsApp to send your message...",
        })
      } else {
        // Add your email sending logic here
          await emailjs.send(
          'service_54uaj5p',
          'template_3xdf3r3',
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
          },
          'kPWLrPjlDN3U0QELf'
        );
        toast({
          title: "Message Sent",
          description: "Thank you for your message. I'll get back to you soon!",
        })
      }
      setFormData({ name: '', email: '', message: '' })
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: personalInfo.contact.phone,
      href: `tel:${personalInfo.contact.phone}`
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: personalInfo.contact.phone,
      href: `https://wa.me/${personalInfo.contact.phone.replace(/\D/g, '')}`
    },
    {
      icon: Mail,
      label: "Email",
      value: personalInfo.contact.email,
      href: `mailto:${personalInfo.contact.email}`
    },
    {
      icon: MapPin,
      label: "Location",
      value: personalInfo.contact.location
    }
  ]

  const socialLinks = [
    {
      icon: Linkedin,
      url: personalInfo.contact.linkedin,
      label: "LinkedIn"
    },
    {
      icon: Github,
      url: personalInfo.contact.github,
      label: "GitHub"
    },
    {
      icon: Instagram,
      url: personalInfo.contact.instagram,
      label: "Instagram"
    }
  ]

  return (
    <div className="container max-w-6xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ opacity }}
        className="grid gap-8 md:grid-cols-2"
      >
        {/* Contact Form Card with Parallax */}
        <motion.div style={{ y: leftCardY }}>
          <Card className="backdrop-blur-sm bg-card/50 border border-primary/10 shadow-xl 
                         hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                  Get in Touch
                </h3>
              </motion.div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger 
                    value="whatsapp"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </TabsTrigger>
                  <TabsTrigger 
                    value="email"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="whatsapp" className="space-y-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name">Name</label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message">Message</label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={4}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Send via WhatsApp
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="email" className="space-y-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="emailName">Name</label>
                      <Input
                        id="emailName"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email">Email</label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="emailMessage">Message</label>
                      <Textarea
                        id="emailMessage"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={4}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Email
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Info Cards with Parallax */}
        <motion.div 
          className="space-y-6"
          style={{ y: rightCardY }}
        >
          <Card className="backdrop-blur-sm bg-card/50 border border-primary/10 shadow-xl overflow-hidden
                         hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                  Contact Information
                </h3>
              </motion.div>

              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    className="group flex items-center gap-4 p-4 rounded-lg transition-all hover:bg-primary/5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * (index + 1) }}
                    whileHover={{ x: 8 }}
                  >
                    <div className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground/90">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-card/50 border border-primary/10 shadow-xl
                         hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                  Connect With Me
                </h3>
                <div className="flex justify-center gap-6">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-full bg-primary/10 p-4 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * (index + 5) }}
                    >
                      <social.icon className="h-6 w-6" />
                      <span className="sr-only">{social.label}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Background Elements */}
      <motion.div 
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              scale: [1, Math.random() + 0.5],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
        
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
      </motion.div>
      <Toaster /> {/* Add this at the end of your component */}
    </div>
  )
}