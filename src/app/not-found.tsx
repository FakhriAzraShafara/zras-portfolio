'use client'

import Link from 'next/link'
import { Ghost, Home, RefreshCw } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function NotFound() {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 10) % 360)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen px-4 text-center"
    >
      <Ghost 
        size={120} 
        className="text-primary mb-8 animate-bounce"
      />
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">
        Oops! Page Not Found
      </h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Looks like you&apos;ve ventured into the unknown! Don&apos;t worry, even ghosts get lost sometimes.
      </p>
      <div className="flex space-x-4">
        <Button asChild>
          <Link href="/" className="flex items-center">
            <Home className="mr-2" size={20} />
            Go Home
          </Link>
        </Button>
        <Button 
          variant="secondary"
          onClick={() => window.location.reload()}
          className="flex items-center"
        >
          <motion.div
            style={{ transform: `rotate(${rotation}deg)` }}
            className="mr-2"
          >
            <RefreshCw size={20} />
          </motion.div>
          Refresh
        </Button>
      </div>
    </motion.div>
  )
}
