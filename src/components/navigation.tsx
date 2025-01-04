"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon, Menu } from 'lucide-react'
import { useTheme } from "next-themes"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Navigation() {
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()
  const [isOpen, setIsOpen] = React.useState(false)

  const routes = [
    { title: 'Home', path: '/' },
    { title: 'Projects', path: '/projects' },
    { title: 'Resume', path: '/resume' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Mobile Navigation Controls - Left Side */}
        <div className="flex items-center gap-2 md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-accent">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[300px]">
              <SheetHeader className="pb-6">
                <SheetTitle className="text-left">Navigation</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4">
                {routes.map(({ title, path }) => (
                  <Link
                    key={path}
                    href={path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center py-2 text-base transition-colors hover:text-foreground",
                      pathname === path 
                        ? "font-medium text-foreground" 
                        : "text-muted-foreground"
                    )}
                  >
                    {title}
                    {pathname === path && (
                      <motion.div
                        layoutId="mobile-nav-pill"
                        className="ml-auto h-2 w-2 rounded-full bg-foreground"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo and Desktop Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative flex items-center"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-accent opacity-20"></div>
          </div>
          <Link href="/" className="relative flex items-center space-x-2">
            <motion.span 
              className="text-lg font-bold md:text-xl"
              whileHover={{ scale: 1.05 }}
            >
              Fakhri Azra Shafara
            </motion.span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8 ml-8 text-sm font-medium">
            {routes.map(({ title, path }) => (
              <Link
                key={path}
                href={path}
                className={cn(
                  "relative transition-colors hover:text-foreground/80",
                  pathname === path ? "text-foreground" : "text-foreground/60"
                )}
              >
                {title}
                {pathname === path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 top-full h-[2px] w-full bg-foreground"
                  />
                )}
              </Link>
            ))}
          </nav>
        </motion.div>

        {/* Theme Toggle - Right Side */}
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hover:bg-accent"
          >
            <motion.div
              initial={false}
              animate={{
                scale: theme === "dark" ? 0 : 1,
                rotate: theme === "dark" ? 90 : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <SunIcon className="h-5 w-5" />
            </motion.div>
            <motion.div
              initial={false}
              animate={{
                scale: theme === "dark" ? 1 : 0,
                rotate: theme === "dark" ? 0 : -90,
              }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <MoonIcon className="h-5 w-5" />
            </motion.div>
          </Button>
        </motion.div>
      </div>
    </motion.header>
  )
}

