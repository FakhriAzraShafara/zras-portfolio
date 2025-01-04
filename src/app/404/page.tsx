'use client'

import React from 'react'
import { Ghost, Home, RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'

const NotFound = () => {
  const router = useRouter()
  const [rotation, setRotation] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 10) % 360)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 bg-grid-gray-200/50 dark:bg-grid-gray-800/50 bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />
      
      <div className="relative z-10 flex flex-col items-center">
        <Ghost 
          size={150} 
          className="text-primary/80 animate-float mb-8"
        />
        <h1 className="text-8xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
          404
        </h1>
        <h2 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md text-center text-lg">
          The page you're looking for seems to have vanished into thin air.
        </p>
        <p>Looks like you&apos;ve ventured into uncharted territory!</p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg shadow-lg shadow-primary/20 transition-all duration-300 flex items-center justify-center group"
          >
            <Home className="mr-2 group-hover:scale-110 transition-transform" size={20} />
            Return Home
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg hover:shadow-md transition-all duration-300 flex items-center justify-center group"
          >
            <RefreshCw 
              className="mr-2 group-hover:scale-110 transition-transform" 
              size={20}
              style={{ transform: `rotate(${rotation}deg)` }}
            />
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound