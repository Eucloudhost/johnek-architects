'use client'

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import projectsData from '@/content/projects.json'
import { useParams } from 'next/navigation'

export default function ProjectDetailPage() {
    const params = useParams()
    const slug = params.slug as string
    const [activeImageIndex, setActiveImageIndex] = useState(0)
    const [activeTab, setActiveTab] = useState<'overview' | 'gallery' | 'challenges' | 'details'>('overview')
    const [showWhatsApp, setShowWhatsApp] = useState(false)
    const [whatsappHover, setWhatsappHover] = useState(false)

    // Find project by slug
    const project = projectsData.projects.find(p => p.slug === slug)

    if (!project) {
        notFound()
    }

    // WhatsApp configuration
    const whatsappNumber = "+1234567890" // Replace with your WhatsApp number
    const whatsappMessage = `Hello Johnek Architects! I'm interested in a project like "${project.name}". Could you provide more information about starting a similar project?`
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

    // Show WhatsApp button on scroll
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY
            const documentHeight = document.documentElement.scrollHeight

            // Show WhatsApp button after scrolling 40% of the page
            if (scrollPosition > documentHeight * 0.4) {
                setShowWhatsApp(true)
            } else {
                setShowWhatsApp(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // WhatsApp Button Component
    const WhatsAppButton = () => (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:bg-[#128C7E] ${showWhatsApp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                }`}
            onMouseEnter={() => setWhatsappHover(true)}
            onMouseLeave={() => setWhatsappHover(false)}
        >
            {/* Animated rings */}
            <div className="absolute -inset-2 border-2 border-[#25D366]/30 rounded-full animate-ping"></div>

            {/* WhatsApp icon */}
            <div className="relative">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.815 9.815 0 0012.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.14l-.3-.18-3.12.82.83-3.04-.2-.32a8.188 8.188 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zM8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.05-.10-.22-.16-.47-.28-.25-.13-1.46-.72-1.69-.8-.23-.08-.37-.12-.56.12-.16.24-.64.78-.78.94-.15.17-.29.19-.54.06-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01z" />
                </svg>
                {/* Online indicator */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-[#25D366]"></div>
            </div>

            {/* Text that appears on hover */}
            <span className={`font-medium transition-all duration-300 ${whatsappHover ? 'opacity-100 max-w-32' : 'opacity-0 max-w-0 overflow-hidden'}`}>
                Chat Now
            </span>
        </a>
    )

    // Stats Grid Component
    const StatsGrid = () => (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {project.stats.map((stat, index) => (
                <div key={index} className="bg-accent rounded-xl p-4 text-center">
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="text-2xl font-bold text-gold mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
            ))}
        </div>
    )

    // Gallery Component
    const GalleryView = () => (
        <div className="space-y-8">
            {/* Main Image */}
            <div className="relative aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{project.gallery[activeImageIndex].title}</h3>
                    <p className="text-white/80">{project.description}</p>
                </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {project.gallery.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${activeImageIndex === index
                            ? 'border-gold scale-105'
                            : 'border-transparent hover:border-gold/50'
                            }`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300"></div>
                        {item.type === 'video' && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        )}
                        {item.type === 'plan' && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                <div className="text-2xl">📐</div>
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    )

    // Challenges Component
    const ChallengesView = () => (
        <div className="space-y-8">
            {/* Challenges & Solutions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Challenges */}
                <div className="bg-accent rounded-2xl p-6">
                    <h3 className="text-xl font-serif font-bold text-foreground mb-4 flex items-center gap-2">
                        <span className="text-red-500">⚡</span> Challenges Faced
                    </h3>
                    <ul className="space-y-3">
                        {project.challenges.map((challenge, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-foreground/80">{challenge}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Solutions */}
                <div className="bg-accent rounded-2xl p-6">
                    <h3 className="text-xl font-serif font-bold text-foreground mb-4 flex items-center gap-2">
                        <span className="text-green-500">✅</span> Our Solutions
                    </h3>
                    <ul className="space-y-3">
                        {project.solutions.map((solution, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-foreground/80">{solution}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Achievements */}
            <div className="bg-gradient-to-r from-gold/10 to-transparent rounded-2xl p-6 border border-gold/20">
                <h3 className="text-xl font-serif font-bold text-foreground mb-4">🏆 Achievements & Awards</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gold/20 rounded-lg flex items-center justify-center">
                                <span className="text-gold">🏅</span>
                            </div>
                            <span className="text-foreground/80">{achievement}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

    // Details Component
    const DetailsView = () => (
        <div className="space-y-8">
            {/* Project Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-accent rounded-xl p-6">
                    <h4 className="text-lg font-bold text-foreground mb-3">📊 Project Info</h4>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Status</span>
                            <span className={`font-medium ${project.status === 'completed' ? 'text-green-600' :
                                project.status === 'in-progress' ? 'text-blue-600' :
                                    'text-yellow-600'
                                }`}>
                                {project.status}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Budget</span>
                            <span className="font-medium text-gold">{project.budget}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Area</span>
                            <span className="font-medium">{project.area}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Year</span>
                            <span className="font-medium">{project.year}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-accent rounded-xl p-6">
                    <h4 className="text-lg font-bold text-foreground mb-3">👥 Team</h4>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Client</span>
                            <span className="font-medium">{project.client}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Lead Architect</span>
                            <span className="font-medium">{project.architect}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Location</span>
                            <span className="font-medium">{project.location}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Category</span>
                            <span className="font-medium capitalize">{project.category}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-accent rounded-xl p-6">
                    <h4 className="text-lg font-bold text-foreground mb-3">✨ Key Features</h4>
                    <div className="space-y-2">
                        {project.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-gold rounded-full"></div>
                                <span className="text-foreground/80 text-sm">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats */}
            <StatsGrid />
        </div>
    )

    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            {/* WhatsApp Floating Button */}
            <WhatsAppButton />

            <div className="container mx-auto px-6 lg:px-8">
                {/* Back Button */}
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors duration-300"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Projects
                </Link>

                {/* Project Header */}
                <div className="mb-12">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-accent rounded-full text-sm text-muted-foreground">
                                    {project.category}
                                </span>
                                <span className="text-sm text-muted-foreground">{project.location}</span>
                                <span className="text-sm text-muted-foreground">{project.year}</span>
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
                                {project.name}
                            </h1>
                            <p className="text-xl text-gold font-medium mb-6">{project.tagline}</p>
                            <p className="text-foreground/80 text-lg max-w-3xl">{project.longDescription}</p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="bg-gold text-background px-6 py-3 rounded-lg font-medium text-center">
                                {project.budget}
                            </div>
                            {/* WhatsApp Quick Action */}
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#075E54] rounded-lg transition-colors duration-300 group"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.815 9.815 0 0012.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.14l-.3-.18-3.12.82.83-3.04-.2-.32a8.188 8.188 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zM8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.05-.10-.22-.16-.47-.28-.25-.13-1.46-.72-1.69-.8-.23-.08-.37-.12-.56.12-.16.24-.64.78-.78.94-.15.17-.29.19-.54.06-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01z" />
                                </svg>
                                <span className="font-medium">Quick Inquiry</span>
                            </a>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <StatsGrid />
                </div>

                {/* Navigation Tabs */}
                <div className="border-b border-border mb-8">
                    <div className="flex space-x-8 overflow-x-auto">
                        {[
                            { id: 'overview', label: 'Overview', icon: '📋' },
                            { id: 'gallery', label: 'Gallery', icon: '🖼️' },
                            { id: 'challenges', label: 'Challenges', icon: '⚡' },
                            { id: 'details', label: 'Details', icon: '📊' },
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
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2">
                                    <div className="bg-gradient-to-br from-gray-200 to-gray-300 aspect-video rounded-2xl mb-8"></div>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Project Highlights</h3>
                                    <ul className="space-y-3">
                                        {project.features.slice(0, 5).map((feature, index) => (
                                            <li key={index} className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-gold rounded-full"></div>
                                                <span className="text-foreground/80">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <p className="text-foreground/80 leading-relaxed">{project.longDescription}</p>
                        </div>
                    )}
                    {activeTab === 'gallery' && <GalleryView />}
                    {activeTab === 'challenges' && <ChallengesView />}
                    {activeTab === 'details' && <DetailsView />}
                </div>

                {/* WhatsApp CTA Section */}
                <div className="bg-gradient-to-r from-[#25D366]/10 to-transparent border border-[#25D366]/20 rounded-2xl p-8 mb-12">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 bg-[#25D366] rounded-2xl flex items-center justify-center">
                                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.815 9.815 0 0012.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.14l-.3-.18-3.12.82.83-3.04-.2-.32a8.188 8.188 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zM8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.05-.10-.22-.16-.47-.28-.25-.13-1.46-.72-1.69-.8-.23-.08-.37-.12-.56.12-.16.24-.64.78-.78.94-.15.17-.29.19-.54.06-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-foreground mb-2">Inspired by this project?</h3>
                                <p className="text-muted-foreground">
                                    Chat directly with our architects on WhatsApp to discuss your similar vision
                                </p>
                            </div>
                        </div>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-[#25D366] text-white font-medium rounded-lg hover:bg-[#128C7E] transition-colors duration-300 hover:shadow-xl flex items-center gap-3 whitespace-nowrap"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.815 9.815 0 0012.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.14l-.3-.18-3.12.82.83-3.04-.2-.32a8.188 8.188 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zM8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.05-.10-.22-.16-.47-.28-.25-.13-1.46-.72-1.69-.8-.23-.08-.37-.12-.56.12-.16.24-.64.78-.78.94-.15.17-.29.19-.54.06-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01z" />
                            </svg>
                            Start Your Project
                        </a>
                    </div>
                </div>

                {/* Next Project CTA */}
                <div className="border-t border-border pt-12">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                            <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                                Ready to start your project?
                            </h3>
                            <p className="text-muted-foreground">
                                Let's create something extraordinary together
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/projects"
                                className="px-6 py-3 border-2 border-gold text-gold font-medium rounded-lg hover:bg-gold hover:text-background transition-colors duration-300 text-center"
                            >
                                View More Projects
                            </Link>
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-gold text-background font-medium rounded-lg hover:bg-gold/90 transition-colors duration-300 hover:shadow-xl text-center"
                            >
                                WhatsApp Our Team
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}