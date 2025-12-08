'use client'

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import servicesData from '@/content/services.json'
import { useParams } from 'next/navigation'

export default function ServiceDetailPage() {
    const params = useParams()
    const slug = params.slug as string
    const [activeTab, setActiveTab] = useState<'overview' | 'process' | 'features' | 'case-studies'>('overview')
    const [showWhatsApp, setShowWhatsApp] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    // Find service by slug
    const service = servicesData.services.find(s => s.slug === slug)

    if (!service) {
        notFound()
    }

    // Get category info
    const category = servicesData.categories.find(c => c.id === service.category)

    // WhatsApp message
    const whatsappMessage = `Hello! I'm interested in your "${service.title}" service. Could you provide more information?`
    const whatsappNumber = "+1234567890" // Replace with your WhatsApp number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

    // Handle scroll to show WhatsApp button
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY
            const windowHeight = window.innerHeight
            const documentHeight = document.documentElement.scrollHeight

            // Show WhatsApp button after scrolling 30% of the page
            if (scrollPosition > documentHeight * 0.3) {
                setShowWhatsApp(true)
            } else {
                setShowWhatsApp(false)
            }

            // Update scrolled state for animations
            setScrolled(scrollPosition > 100)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // WhatsApp button component
    const WhatsAppButton = () => (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 py-3 bg-[#25D366] text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:bg-[#128C7E] ${showWhatsApp
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10 pointer-events-none'
                }`}
        >
            {/* Animated rings */}
            <div className="absolute -inset-2 border-2 border-[#25D366]/30 rounded-full animate-ping"></div>
            <div className="absolute -inset-1 border-2 border-[#25D366]/20 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>

            {/* WhatsApp icon */}
            <div className="relative">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.815 9.815 0 0012.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.14l-.3-.18-3.12.82.83-3.04-.2-.32a8.188 8.188 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zM8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.05-.1-.22-.16-.47-.28-.25-.13-1.46-.72-1.69-.8-.23-.08-.37-.12-.56.12-.16.24-.64.78-.78.94-.15.17-.29.19-.54.06-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01z" />
                </svg>
                {/* Online indicator */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-[#25D366]"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
            </div>

            <span className="font-medium pr-1">Chat Now</span>
        </a>
    )

    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            {/* WhatsApp Button */}
            <WhatsAppButton />

            <div className="container mx-auto px-6 lg:px-8">
                {/* Back Button */}
                <Link
                    href="/#services"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors duration-300"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Services
                </Link>

                {/* Service Header */}
                <div className="mb-12">
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-8">
                        <div className="flex-1">
                            {/* Category & Icon */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-16 h-16 ${category?.color} border ${category?.border} rounded-2xl flex items-center justify-center`}>
                                    <span className="text-3xl">{service.icon}</span>
                                </div>
                                <div>
                                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${category?.color} text-foreground`}>
                                        {category?.name}
                                    </div>
                                    <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground">
                                        {service.title}
                                    </h1>
                                </div>
                            </div>

                            <p className="text-2xl text-gold font-medium mb-6">{service.tagline}</p>
                            <p className="text-foreground/80 text-lg max-w-3xl">{service.detailedDescription}</p>
                        </div>

                        {/* Quick Info Card */}
                        <div className="bg-accent border border-border rounded-2xl p-6 min-w-[300px]">
                            <h3 className="text-lg font-bold text-foreground mb-4">Service Details</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-sm text-muted-foreground mb-1">Starting Price</div>
                                    <div className="text-2xl font-bold text-gold">{service.startingPrice}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-muted-foreground mb-1">Duration</div>
                                    <div className="text-lg font-medium text-foreground">{service.duration}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-muted-foreground mb-1">Case Studies</div>
                                    <div className="text-foreground">
                                        {service.caseStudies.length} completed projects
                                    </div>
                                </div>
                            </div>

                            {/* WhatsApp Quick Action */}
                            <div className="mt-6 pt-6 border-t border-border">
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#075E54] rounded-lg transition-colors duration-300 group"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.815 9.815 0 0012.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.14l-.3-.18-3.12.82.83-3.04-.2-.32a8.188 8.188 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zM8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.05-.1-.22-.16-.47-.28-.25-.13-1.46-.72-1.69-.8-.23-.08-.37-.12-.56.12-.16.24-.64.78-.78.94-.15.17-.29.19-.54.06-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01z" />
                                    </svg>
                                    <span className="font-medium">Quick WhatsApp Inquiry</span>
                                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Floating WhatsApp CTA for mobile */}
                    <div className="lg:hidden fixed bottom-20 left-0 right-0 z-40 px-4">
                        <div className={`bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white rounded-2xl p-4 shadow-2xl transform transition-all duration-500 ${scrolled ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                            }`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.815 9.815 0 0012.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.14l-.3-.18-3.12.82.83-3.04-.2-.32a8.188 8.188 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zM8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.05-.10-.22-.16-.47-.28-.25-.13-1.46-.72-1.69-.8-.23-.08-.37-.12-.56.12-.16.24-.64.78-.78.94-.15.17-.29.19-.54.06-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium">Get Instant Quote</p>
                                        <p className="text-white/80 text-sm">Response within 15 minutes</p>
                                    </div>
                                </div>
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-white text-[#128C7E] font-medium rounded-lg hover:bg-white/90 transition-colors duration-300"
                                >
                                    Chat Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="border-b border-border mb-8">
                    <div className="flex space-x-8 overflow-x-auto">
                        {[
                            { id: 'overview', label: 'Overview', icon: '📋' },
                            { id: 'process', label: 'Our Process', icon: '🔄' },
                            { id: 'features', label: 'Features', icon: '✨' },
                            { id: 'case-studies', label: 'Case Studies', icon: '📚' },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2 py-4 px-1 font-medium whitespace-nowrap transition-colors duration-300 border-b-2 ${activeTab === tab.id
                                        ? 'text-gold border-gold'
                                        : 'text-muted-foreground border-transparent hover:text-foreground'
                                    }`}
                            >
                                <span>{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="mb-12">
                    {activeTab === 'overview' && (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-2xl font-serif font-bold text-foreground mb-6">Service Overview</h3>
                                    <div className="prose prose-lg max-w-none">
                                        <p className="text-foreground/80 leading-relaxed mb-6">
                                            {service.detailedDescription}
                                        </p>
                                        <p className="text-foreground/80 leading-relaxed">
                                            Our approach combines technical expertise with creative problem-solving to deliver exceptional results. We work closely with clients throughout the process, ensuring alignment with your vision and objectives.
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-gold/5 to-transparent border border-gold/10 rounded-2xl p-8">
                                    <h4 className="text-xl font-bold text-foreground mb-6">What to Expect</h4>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <div className="w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                                                <div className="w-2 h-2 bg-gold rounded-full"></div>
                                            </div>
                                            <span className="text-foreground/80">Regular progress updates and reviews</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                                                <div className="w-2 h-2 bg-gold rounded-full"></div>
                                            </div>
                                            <span className="text-foreground/80">Clear communication and documentation</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                                                <div className="w-2 h-2 bg-gold rounded-full"></div>
                                            </div>
                                            <span className="text-foreground/80">Expert guidance at every stage</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                                                <div className="w-2 h-2 bg-gold rounded-full"></div>
                                            </div>
                                            <span className="text-foreground/80">Quality assurance and final delivery</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'process' && (
                        <div className="space-y-8">
                            <h3 className="text-2xl font-serif font-bold text-foreground mb-6">Our 4-Step Process</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {service.process.map((step) => (
                                    <div key={step.step} className="relative">
                                        <div className={`h-full bg-accent border border-border rounded-2xl p-6 ${step.step === 1 ? 'ring-2 ring-gold/30' : ''
                                            }`}>
                                            <div className="absolute -top-4 -left-4 w-12 h-12 bg-gold text-background rounded-full flex items-center justify-center font-bold text-xl">
                                                {step.step}
                                            </div>
                                            <h4 className="text-lg font-bold text-foreground mb-3 mt-8">{step.title}</h4>
                                            <p className="text-foreground/70">{step.description}</p>
                                        </div>
                                        {step.step < 4 && (
                                            <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                                                <svg className="w-6 h-6 text-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'features' && (
                        <div className="space-y-8">
                            <h3 className="text-2xl font-serif font-bold text-foreground mb-6">Key Features & Benefits</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {service.features.map((feature, index) => (
                                    <div key={index} className="bg-accent border border-border rounded-xl p-6 group hover:border-gold/30 transition-colors duration-300">
                                        <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gold group-hover:text-background transition-colors duration-300">
                                            <span className="text-lg">✨</span>
                                        </div>
                                        <h4 className="text-lg font-bold text-foreground mb-2">{feature}</h4>
                                        <p className="text-foreground/70 text-sm">
                                            Comprehensive implementation with measurable results and ongoing support.
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'case-studies' && (
                        <div className="space-y-8">
                            <h3 className="text-2xl font-serif font-bold text-foreground mb-6">Featured Case Studies</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {service.caseStudies.map((caseStudy, index) => (
                                    <div key={index} className="bg-accent border border-border rounded-2xl overflow-hidden group hover:border-gold/30 transition-colors duration-300">
                                        <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300"></div>
                                        <div className="p-6">
                                            <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-gold transition-colors duration-300">
                                                {caseStudy}
                                            </h4>
                                            <p className="text-foreground/70 mb-4">
                                                This project showcases our expertise in {service.title.toLowerCase()} with exceptional results.
                                            </p>
                                            <Link
                                                href={`/projects/${caseStudy.toLowerCase().replace(/ /g, '-')}`}
                                                className="inline-flex items-center gap-2 text-gold font-medium hover:gap-3 transition-all duration-300"
                                            >
                                                View Case Study
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Testimonial */}
                <div className="bg-gradient-to-r from-gold/10 to-transparent border border-gold/20 rounded-2xl p-8 mb-12">
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                        <div className="flex-1">
                            <div className="text-6xl mb-4">"</div>
                            <blockquote className="text-2xl font-serif text-foreground mb-4">
                                {service.testimonial}
                            </blockquote>
                            <div className="text-muted-foreground">
                                — Satisfied Client, {service.caseStudies[0] || 'Recent Project'}
                            </div>
                        </div>
                        <div className="lg:w-48">
                            <div className="w-48 h-48 bg-gradient-to-br from-gold/20 to-transparent rounded-full flex items-center justify-center">
                                <span className="text-6xl">⭐</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* WhatsApp CTA Section */}
                <div className="bg-gradient-to-r from-[#25D366]/10 to-[#128C7E]/5 border border-[#25D366]/20 rounded-2xl p-8 mb-12">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 bg-[#25D366] rounded-2xl flex items-center justify-center">
                                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.815 9.815 0 0012.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.14l-.3-.18-3.12.82.83-3.04-.2-.32a8.188 8.188 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zM8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.05-.10-.22-.16-.47-.28-.25-.13-1.46-.72-1.69-.8-.23-.08-.37-.12-.56.12-.16.24-.64.78-.78.94-.15.17-.29.19-.54.06-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-foreground mb-2">Get Instant Response</h3>
                                <p className="text-muted-foreground">
                                    Chat with our experts directly on WhatsApp. Get instant quotes and answers to your questions.
                                </p>
                            </div>
                        </div>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-[#25D366] text-white font-medium rounded-lg hover:bg-[#128C7E] transition-colors duration-300 hover:shadow-xl flex items-center gap-3"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.815 9.815 0 0012.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.14l-.3-.18-3.12.82.83-3.04-.2-.32a8.188 8.188 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zM8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.05-.10-.22-.16-.47-.28-.25-.13-1.46-.72-1.69-.8-.23-.08-.37-.12-.56.12-.16.24-.64.78-.78.94-.15.17-.29.19-.54.06-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01z" />
                            </svg>
                            Start WhatsApp Chat
                        </a>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link
                        href="#contact"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-background font-medium rounded-lg hover:bg-gold/90 transition-colors duration-300 hover:shadow-2xl hover:shadow-gold/20"
                    >
                        <span>Get Started with {service.title}</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    )
}