'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Services from '@/components/Services'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import content from '@/content/content.json'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800)
  }, [])

  return (
    <>
      {isLoading ? (
        <div className="h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
            <h1 className="mt-6 text-2xl font-serif font-bold text-gray-800">JOHNEK ARCHITECTS</h1>
          </div>
        </div>
      ) : (
        <>
          <Hero content={content.hero} />
          <About content={content.about} />
          <Projects />
          <Services content={content.services} />
          <Contact content={content.contact} />
          <Footer content={content.footer} />
        </>
      )}
    </>
  )
}