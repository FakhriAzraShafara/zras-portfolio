"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { 
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Image as ImageIcon,
  Video as VideoIcon
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { MediaItem } from '@/types'

export const MediaGallery = ({ media = [] }: { media?: MediaItem[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex(prev => prev === 0 ? filteredMedia.length - 1 : prev - 1);
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex(prev => prev === filteredMedia.length - 1 ? 0 : prev + 1);
      }
    };

    if (showModal) {
      window.addEventListener('keydown', handleKeyDown);
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [showModal, closeModal]);

  if (!Array.isArray(media) || media.length === 0) {
    return (
      <div className="text-center py-12 bg-background/50 rounded-lg">
        <p className="text-muted-foreground">No media available</p>
      </div>
    );
  }

  const mediaTypeCounts = media.reduce<Record<string, number>>((acc, item) => {
    if (item?.type) acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {});

  const filteredMedia = filter === 'all' 
    ? media.filter(item => item?.type)
    : media.filter(item => item?.type === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <Button
          variant="secondary"
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'bg-primary text-primary-foreground' : ''}
        >
          All ({media.filter(item => item?.type).length})
        </Button>
        
        {Object.entries(mediaTypeCounts).map(([type, count]) => (
          <Button
            key={type}
            variant="secondary"
            onClick={() => setFilter(type as 'image' | 'video')}
            className={filter === type ? 'bg-primary text-primary-foreground' : ''}
          >
            {type === 'image' ? <ImageIcon className="mr-2 h-4 w-4" /> : <VideoIcon className="mr-2 h-4 w-4" />}
            {type.charAt(0).toUpperCase() + type.slice(1)}s ({count})
          </Button>
        ))}
      </div>

      {filteredMedia.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMedia.map((item, index) => (
            <motion.div
              key={`${item.type}-${index}`}
              className="relative cursor-pointer overflow-hidden rounded-lg shadow-md aspect-video group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentIndex(index);
                setShowModal(true);
              }}
            >
              {item.type === 'image' ? (
                <>
                  <Image
                    src={item.url}
                    alt={item.caption || 'Project media'}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black/50 p-1 rounded-full">
                    <ImageIcon className="h-4 w-4 text-white" />
                  </div>
                </>
              ) : (
                <div className="relative w-full h-full">
                  <video 
                    src={item.url} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 group-hover:bg-black/70 transition-colors">
                    <Play className="text-white w-12 h-12" />
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-center p-4 text-sm">{item.caption || 'No caption available'}</p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-background/50 rounded-lg">
          <p className="text-muted-foreground">No {filter} media available</p>
        </div>
      )}

      <AnimatePresence mode="wait">
        {showModal && filteredMedia[currentIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <motion.div 
              className="relative max-w-7xl w-full p-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeModal}
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </motion.button>

              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full flex flex-col items-center justify-center"
              >
                {filteredMedia[currentIndex].type === 'image' ? (
                  <div className="relative w-full h-[80vh]">
                    <Image
                      src={filteredMedia[currentIndex].url}
                      alt={filteredMedia[currentIndex].caption || 'Project media'}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <video
                    src={filteredMedia[currentIndex].url}
                    controls
                    autoPlay
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                )}
                <p className="text-white text-center mt-6 text-lg">
                  {filteredMedia[currentIndex].caption || 'No caption available'}
                </p>
                <p className="text-white/60 text-center mt-2">
                  {currentIndex + 1} / {filteredMedia.length}
                </p>
              </motion.div>

              {/* Navigation buttons with improved visibility */}
              {filteredMedia.length > 1 && (
                <>
                  <motion.button
                    className="absolute top-1/2 left-4 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(prev => prev === 0 ? filteredMedia.length - 1 : prev - 1);
                    }}
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </motion.button>
                  <motion.button
                    className="absolute top-1/2 right-4 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(prev => prev === filteredMedia.length - 1 ? 0 : prev + 1);
                    }}
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-8 w-8" />
                  </motion.button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
