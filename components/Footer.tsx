'use client'

import { useState } from 'react'

interface FooterProps {
    content: {
        copyright: string
        tagline: string
    }
}

const Footer = ({ content }: FooterProps) => {
    const [hoveredLink, setHoveredLink] = useState<string | null>(null)

    const footerLinks = [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Sitemap', href: '#' },
        { label: 'Careers', href: '#' },
    ]

    const socialLinks = [
        { label: 'LinkedIn', href: '#', icon: 'in' },
        { label: 'Instagram', href: '#', icon: 'ig' },
        { label: 'Twitter', href: '#', icon: '𝕏' },
        { label: 'Pinterest', href: '#', icon: 'P' },
    ]

    return (
        <footer className="relative bg-background border-t border-border">
            {/* Geometric background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-1/4 w-64 h-64 border border-gold/20 rounded-full"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 border border-gold/10 rounded-full"></div>
                <div className="absolute top-1/2 left-10 w-32 h-32 border border-gold/15 rotate-45"></div>
                <div className="absolute bottom-1/3 right-10 w-48 h-48 border border-gold/15 rounded-lg"></div>
            </div>

            {/* Main Footer Content */}
            <div className="relative container mx-auto px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-4 mb-8">
                            <div className="w-12 h-12 border-2 border-gold rounded-lg rotate-45">
                                <div className="absolute inset-2 border border-gold/50 rounded"></div>
                            </div>
                            <div>
                                <h2 className="text-3xl font-serif font-bold mb-1">
                                    <span className="text-foreground">JOHNEK</span>
                                    <span className="text-gold ml-2">ARCHITECTS</span>
                                </h2>
                                <p className="text-muted-foreground text-sm tracking-widest uppercase">
                                    Since 1998
                                </p>
                            </div>
                        </div>

                        <p className="text-foreground/80 text-lg max-w-md mb-8 leading-relaxed">
                            {content.tagline}
                        </p>

                        {/* Newsletter Subscription */}
                        <div className="max-w-md">
                            <p className="text-sm font-medium text-foreground mb-3">Subscribe to our newsletter</p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="flex-1 px-4 py-3 bg-accent border border-border rounded-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                                />
                                <button className="px-6 py-3 bg-gold text-background font-medium rounded-lg hover:bg-gold/90 transition-colors duration-300">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links Column */}
                    <div>
                        <h3 className="text-lg font-serif font-bold text-foreground mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            {footerLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="group flex items-center text-muted-foreground hover:text-foreground transition-colors duration-300"
                                        onMouseEnter={() => setHoveredLink(link.label)}
                                        onMouseLeave={() => setHoveredLink(null)}
                                    >
                                        <div className={`w-1.5 h-1.5 bg-gold rounded-full mr-3 transition-all duration-300 ${hoveredLink === link.label ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                                            }`}></div>
                                        <span>{link.label}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Social Column */}
                    <div>
                        <h3 className="text-lg font-serif font-bold text-foreground mb-6">Connect With Us</h3>
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <a href="mailto:info@johnekarchitects.com" className="flex items-center text-muted-foreground hover:text-foreground transition-colors duration-300 group">
                                    <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-gold/20 transition-colors duration-300">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <span>info@johnekarchitects.com</span>
                                </a>
                                <a href="tel:+15551234567" className="flex items-center text-muted-foreground hover:text-foreground transition-colors duration-300 group">
                                    <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-gold/20 transition-colors duration-300">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <span>+1 (555) 123-4567</span>
                                </a>
                            </div>

                            {/* Social Links */}
                            <div>
                                <p className="text-sm text-muted-foreground mb-3">Follow our journey</p>
                                <div className="flex gap-3">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            className="w-10 h-10 bg-accent border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/30 hover:bg-gold/5 transition-all duration-300 group"
                                            aria-label={social.label}
                                        >
                                            <span className="text-sm font-medium group-hover:scale-110 transition-transform duration-300">
                                                {social.icon}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-12 border-t border-border/50 relative">
                    <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 w-16 h-8 bg-background flex items-center justify-center">
                        <div className="w-4 h-1 bg-gold"></div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        {content.copyright}
                    </p>

                    <div className="text-sm text-muted-foreground">
                        <span className="mr-4">New York • London • Tokyo • Dubai</span>
                        <span>Registered in England & Wales: 12345678</span>
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-8 right-8 w-12 h-12 bg-gold text-background rounded-full shadow-lg hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center z-40"
                aria-label="Back to top"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </button>
        </footer>
    )
}

export default Footer