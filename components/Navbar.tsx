'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [hoveredLink, setHoveredLink] = useState<string | null>(null)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Check if we're on the homepage
    const isHomePage = pathname === '/'

    // Navigation items with conditional hrefs
    const navItems = [
        { label: 'Home', href: '/' },
        {
            label: 'About',
            href: isHomePage ? '#about' : '/#about'
        },
        { label: 'Projects', href: '/projects' },
        {
            label: 'Services',
            href: isHomePage ? '#services' : '/#services'
        },
        {
            label: 'Contact',
            href: isHomePage ? '#contact' : '/#contact'
        },
    ]

    // Handle anchor link clicks
    const handleAnchorClick = (href: string, label: string) => {
        // If it's an anchor link and we're not on homepage
        if (href.includes('#') && !isHomePage) {
            // The link will go to homepage first (e.g., /#about)
            // Then we need to scroll to the section after homepage loads
            const sectionId = href.split('#')[1]

            // Listen for homepage load then scroll to section
            if (typeof window !== 'undefined') {
                // Store the section to scroll to
                sessionStorage.setItem('scrollToSection', sectionId)
            }

            setIsMenuOpen(false)
            return
        }

        // If on homepage, just close menu (smooth scroll will happen naturally)
        setIsMenuOpen(false)
    }

    // Modern Contact Button Component - Updated to handle non-homepage
    const ModernContactButton = () => {
        const [isHovered, setIsHovered] = useState(false)
        const [isLoading, setIsLoading] = useState(false)

        const handleClick = () => {
            setIsLoading(true)

            if (isHomePage) {
                // On homepage, scroll to contact section
                setTimeout(() => {
                    setIsLoading(false)
                    const contactSection = document.getElementById('contact')
                    if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' })
                    }
                }, 300)
            } else {
                // Not on homepage, navigate to homepage with contact hash
                setTimeout(() => {
                    setIsLoading(false)
                    // Store section to scroll to
                    sessionStorage.setItem('scrollToSection', 'contact')
                    window.location.href = '/#contact'
                }, 300)
            }
        }

        return (
            <button
                onClick={handleClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                disabled={isLoading}
                className="group relative px-6 py-2.5 overflow-hidden rounded-full bg-foreground text-background text-sm font-medium tracking-wide transition-all duration-300 hover:shadow-2xl hover:shadow-gold/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-gold to-gold/80 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>

                {/* Animated border */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-gold/30 transition-all duration-300"></div>

                {/* Content */}
                <span className="relative z-10 flex items-center gap-2">
                    {isLoading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin"></div>
                            <span>Starting...</span>
                        </>
                    ) : (
                        <>
                            <svg
                                className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                            <span>Start Project</span>
                        </>
                    )}
                </span>

                {/* Floating particles on hover */}
                {isHovered && !isLoading && (
                    <>
                        <div className="absolute top-1 left-4 w-1 h-1 bg-background rounded-full animate-ping"></div>
                        <div className="absolute bottom-1 right-4 w-1 h-1 bg-background rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                        <div className="absolute top-2 right-8 w-0.5 h-0.5 bg-background rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
                    </>
                )}
            </button>
        )
    }

    // Mobile Contact Button Component - Updated to handle non-homepage
    const MobileContactButton = ({ onClick }: { onClick: () => void }) => {
        const [isTapped, setIsTapped] = useState(false)

        const handleClick = () => {
            setIsTapped(true)

            if (isHomePage) {
                // On homepage, scroll to contact
                setTimeout(() => {
                    setIsTapped(false)
                    onClick()
                    const contactSection = document.getElementById('contact')
                    if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' })
                    }
                }, 300)
            } else {
                // Not on homepage, navigate to homepage with contact hash
                setTimeout(() => {
                    setIsTapped(false)
                    onClick()
                    // Store section to scroll to
                    sessionStorage.setItem('scrollToSection', 'contact')
                    window.location.href = '/#contact'
                }, 300)
            }
        }

        return (
            <button
                onClick={handleClick}
                className={`relative w-full py-3 bg-gradient-to-r from-foreground to-muted-foreground text-background font-medium rounded-xl transition-all duration-300 ${isTapped ? 'scale-95' : 'hover:shadow-xl'}`}
            >
                <span className="flex items-center justify-center gap-2">
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    Get In Touch
                </span>

                {/* Ripple effect */}
                {isTapped && (
                    <span className="absolute inset-0 bg-white/20 rounded-xl animate-ping"></span>
                )}
            </button>
        )
    }

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled
            ? 'bg-background/90 backdrop-blur-xl shadow-lg py-3 border-b border-border/50'
            : 'bg-transparent py-6'
            }`}>
            <div className="container mx-auto px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo with architectural flair */}
                    <Link
                        href="/"
                        className="relative group"
                        onMouseEnter={() => setHoveredLink('logo')}
                        onMouseLeave={() => setHoveredLink(null)}
                    >
                        <div className="flex items-center space-x-3">
                            <div className={`relative transition-all duration-500 ${scrolled ? 'scale-90' : 'scale-100'}`}>
                                {/* Geometric logo element */}
                                <div className={`w-10 h-10 border-2 ${scrolled ? 'border-gold/80' : 'border-gold'} rounded-lg rotate-45 transition-all duration-500 group-hover:rotate-0`}>
                                    <div className="absolute inset-2 border ${scrolled ? 'border-gold/60' : 'border-gold'} rounded transition-all duration-500"></div>
                                </div>
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150"></div>
                            </div>
                            <div className="flex flex-col">
                                <span className={`text-2xl font-serif font-bold tracking-tight transition-all duration-500 ${scrolled ? 'text-foreground text-xl' : 'text-foreground'
                                    }`}>
                                    <span className="text-foreground">JOHNEK</span>
                                    <span className="text-gold ml-1">ARCHITECTS</span>
                                </span>
                                <span className={`text-xs tracking-widest text-muted-foreground uppercase transition-all duration-500 ${scrolled ? 'opacity-0 h-0' : 'opacity-100 h-auto'
                                    }`}>Since 1998</span>
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Navigation - Modern minimal */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="relative px-4 py-2"
                                onMouseEnter={() => setHoveredLink(item.label)}
                                onMouseLeave={() => setHoveredLink(null)}
                                onClick={() => handleAnchorClick(item.href, item.label)}
                            >
                                <span className={`text-sm font-medium tracking-wide transition-all duration-300 ${hoveredLink === item.label || pathname === item.href
                                    ? 'text-gold'
                                    : scrolled
                                        ? 'text-muted-foreground'
                                        : 'text-foreground'
                                    }`}>
                                    {item.label}
                                </span>

                                {/* Animated underline */}
                                <div className={`absolute bottom-1 left-4 right-4 h-0.5 bg-gold transform origin-left transition-all duration-300 ${hoveredLink === item.label ? 'scale-x-100' : 'scale-x-0'
                                    }`}></div>

                                {/* Dot indicator */}
                                <div className={`absolute -top-1 left-1/2 w-1.5 h-1.5 bg-gold rounded-full transform -translate-x-1/2 transition-all duration-300 ${hoveredLink === item.label ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                                    }`}></div>
                            </Link>
                        ))}

                        {/* Modern Contact CTA Button with enhanced interaction */}
                        <div className="ml-6 pl-6 border-l border-border">
                            <ModernContactButton />
                        </div>
                    </div>

                    {/* Modern Hamburger Menu */}
                    <button
                        className="lg:hidden relative w-10 h-10 focus:outline-none group"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6">
                            <div className={`absolute h-0.5 w-6 bg-foreground transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                                }`}></div>
                            <div className={`absolute h-0.5 w-6 bg-foreground transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'
                                }`}></div>
                            <div className={`absolute h-0.5 w-6 bg-foreground transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                                }`}></div>
                        </div>
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/30 rounded-full transition-all duration-300"></div>
                    </button>
                </div>

                {/* Modern Mobile Menu */}
                <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
                    }`}>
                    <div className="bg-background/95 backdrop-blur-xl rounded-2xl border border-border shadow-2xl p-6">
                        <div className="space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="group flex items-center justify-between py-3 px-4 rounded-xl hover:bg-accent/50 transition-all duration-300"
                                    onClick={() => handleAnchorClick(item.href, item.label)}
                                >
                                    <span className="text-foreground group-hover:text-gold font-medium tracking-wide transition-colors duration-300">
                                        {item.label}
                                    </span>
                                    <div className="w-2 h-2 bg-gold rounded-full opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300"></div>
                                </Link>
                            ))}

                            <div className="pt-4 mt-4 border-t border-border">
                                <MobileContactButton onClick={() => setIsMenuOpen(false)} />
                            </div>
                        </div>

                        {/* Social links in mobile menu */}
                        <div className="flex justify-center space-x-6 mt-8 pt-6 border-t border-border">
                            <a href="#" className="text-muted-foreground hover:text-gold transition-colors duration-300">
                                <span className="text-sm font-medium">in</span>
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-gold transition-colors duration-300">
                                <span className="text-sm font-medium">ig</span>
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-gold transition-colors duration-300">
                                <span className="text-sm font-medium">𝕏</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent opacity-50"></div>
        </nav>
    )
}

export default Navbar