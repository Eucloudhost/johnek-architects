'use client'

import { useEffect, useState } from 'react'
import Typewriter from './Typewriter'

interface HeroProps {
    content: {
        tagline: string
        description: string
    }
}

const Hero = ({ content }: HeroProps) => {
    const [scrollY, setScrollY] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY)
        window.addEventListener('scroll', handleScroll)

        // Trigger animations after component mounts
        setTimeout(() => setIsLoaded(true), 100)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const parallaxOffset = scrollY * 0.5

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-22 md:pt-20">
            {/* Background with parallax */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-background via-accent/5 to-background"
                style={{ transform: `translateY(${parallaxOffset * 0.3}px)` }}
            >
                {/* Geometric background pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-1/4 left-1/4 w-40 h-40 md:w-64 md:h-64 border border-gold/20 rounded-full"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-60 h-60 md:w-96 md:h-96 border border-gold/10 rounded-full"></div>
                    <div className="absolute top-1/3 right-1/3 w-20 h-20 md:w-32 md:h-32 border border-gold/30 rotate-45"></div>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/30"></div>
            </div>

            {/* Main content - perfectly centered */}
            <div className="container mx-auto px-4 pt-18 sm:px-6 lg:px-8 z-10 relative">
                <div className="flex flex-col items-center justify-center text-center">

                    {/* Logo/Brand section */}
                    <div className={`mb-6 md:mb-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-4">
                            <span className="text-foreground">JOHNEK</span>
                            <span className="text-gold ml-2 md:ml-3">ARCHITECTS</span>
                        </h1>
                        <div className="h-1 w-24 md:w-32 bg-gradient-to-r from-gold to-gold/50 mx-auto"></div>
                    </div>

                    {/* Tagline with typewriter */}
                    <div className={`mb-6 md:mb-8 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-foreground/80 font-light px-4">
                            <Typewriter text={content.tagline} delay={50} />
                        </div>
                    </div>

                    {/* Description */}
                    <div className={`mb-8 md:mb-10 max-w-2xl mx-auto transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <p className="text-base sm:text-lg md:text-xl text-foreground/60 leading-relaxed px-4">
                            {content.description}
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className={`flex flex-col sm:flex-row gap-4 md:gap-6 mb-10 md:mb-12 transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <a
                            href="#projects"
                            className="px-6 py-3 md:px-8 md:py-3 bg-foreground text-background font-medium rounded-lg hover:bg-foreground/90 transition-all duration-300 hover:shadow-xl min-w-[160px] text-center"
                        >
                            View Our Work
                        </a>
                        <a
                            href="#contact"
                            className="px-6 py-3 md:px-8 md:py-3 border-2 border-gold text-gold font-medium rounded-lg hover:bg-gold hover:text-background transition-all duration-300 min-w-[160px] text-center"
                        >
                            Get In Touch
                        </a>
                    </div>

                    {/* Stats */}
                    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-xl mx-auto transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-gold mb-1">25+</div>
                            <div className="text-xs md:text-sm text-foreground/50 uppercase tracking-wider">Years</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-gold mb-1">300+</div>
                            <div className="text-xs md:text-sm text-foreground/50 uppercase tracking-wider">Projects</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-gold mb-1">50+</div>
                            <div className="text-xs md:text-sm text-foreground/50 uppercase tracking-wider">Awards</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-gold mb-1">40+</div>
                            <div className="text-xs md:text-sm text-foreground/50 uppercase tracking-wider">Experts</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className={`absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-700 delay-600 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex flex-col items-center">
                    <div className="text-xs text-foreground/40 mb-2 tracking-widest">SCROLL</div>
                    <div className="animate-bounce">
                        <svg className="w-5 h-5 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero