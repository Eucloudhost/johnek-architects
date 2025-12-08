'use client'

import { useState } from 'react'
import Link from 'next/link'
import servicesData from '@/content/services.json'
import contentData from '@/content/content.json'

const Services = () => {
    const [activeCategory, setActiveCategory] = useState('all')
    const [hoveredService, setHoveredService] = useState<number | null>(null)

    // Filter services by category
    const filteredServices = activeCategory === 'all'
        ? servicesData.services
        : servicesData.services.filter(service => service.category === activeCategory)

    // Get category color
    const getCategoryColor = (categoryId: string) => {
        const category = servicesData.categories.find(c => c.id === categoryId)
        return category ? category.color : 'bg-accent'
    }

    // Get category border
    const getCategoryBorder = (categoryId: string) => {
        const category = servicesData.categories.find(c => c.id === categoryId)
        return category ? category.border : 'border-border'
    }

    return (
        <section id="services" className="py-20 bg-background relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-10 w-96 h-96 border border-gold/20 rounded-full"></div>
                <div className="absolute bottom-20 right-10 w-64 h-64 border border-gold/10 rotate-45"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-gold/15 rounded-lg"></div>
            </div>

            <div className="container mx-auto px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="w-12 h-0.5 bg-gold"></div>
                        <span className="text-gold font-medium tracking-widest uppercase text-sm">Our Expertise</span>
                        <div className="w-12 h-0.5 bg-gold"></div>
                    </div>
                    <h2 className="text-5xl font-serif font-bold mb-6">
                        <span className="text-foreground">Comprehensive</span>
                        <span className="text-gold ml-3">Services</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        {servicesData.description}
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    <button
                        onClick={() => setActiveCategory('all')}
                        className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${activeCategory === 'all'
                            ? 'bg-gold text-background shadow-lg shadow-gold/20'
                            : 'bg-accent text-muted-foreground hover:text-foreground border border-border'
                            }`}
                    >
                        <span>All Services</span>
                        <span className="text-xs bg-background/20 px-2 py-0.5 rounded-full">
                            {servicesData.services.length}
                        </span>
                    </button>

                    {servicesData.categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${activeCategory === category.id
                                ? 'bg-gold text-background shadow-lg shadow-gold/20'
                                : `${category.color} text-foreground hover:text-gold border ${category.border}`
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {filteredServices.map(service => (
                        <Link
                            key={service.id}
                            href={`/services/${service.slug}`}
                            className="group relative"
                            onMouseEnter={() => setHoveredService(service.id)}
                            onMouseLeave={() => setHoveredService(null)}
                        >
                            <div className={`h-full bg-background border ${getCategoryBorder(service.category)} rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 overflow-hidden ${hoveredService === service.id ? 'ring-2 ring-gold/30' : ''
                                }`}>
                                {/* Animated Background */}
                                <div className={`absolute inset-0 ${getCategoryColor(service.category)} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                                {/* Icon with Animation */}
                                <div className="relative mb-6">
                                    <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-500">
                                        {service.icon}
                                    </div>
                                    <div className="absolute -top-2 -left-2 w-6 h-6 border-2 border-gold/30 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                                </div>

                                {/* Service Info */}
                                <div className="relative">
                                    {/* Category Badge */}
                                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${getCategoryBorder(service.category).replace('border-', 'bg-').replace('/20', '/10')
                                        }`}>
                                        {servicesData.categories.find(c => c.id === service.category)?.name}
                                    </div>

                                    <h3 className="text-xl font-serif font-bold text-foreground mb-3 group-hover:text-gold transition-colors duration-300">
                                        {service.title}
                                    </h3>

                                    <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-3">
                                        {service.description}
                                    </p>

                                    {/* Price & Duration */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <div className="text-sm text-muted-foreground">Starting from</div>
                                            <div className="text-lg font-bold text-gold">{service.startingPrice}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted-foreground">Duration</div>
                                            <div className="text-foreground font-medium">{service.duration}</div>
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="mb-6">
                                        <div className="text-sm text-muted-foreground mb-2">Key Features:</div>
                                        <div className="flex flex-wrap gap-2">
                                            {service.features.slice(0, 3).map((feature, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 bg-accent text-xs rounded-md text-foreground/70"
                                                >
                                                    {feature.split(' & ')[0]}
                                                </span>
                                            ))}
                                            {service.features.length > 3 && (
                                                <span className="px-2 py-1 bg-accent text-xs rounded-md text-gold">
                                                    +{service.features.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div className="flex items-center justify-between pt-6 border-t border-border">
                                        <span className="text-gold font-medium text-sm tracking-wide group-hover:translate-x-2 transition-transform duration-300">
                                            Learn More →
                                        </span>
                                        <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center group-hover:bg-gold group-hover:text-background transition-all duration-300">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Gold Accent Line */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Stats Section */}
                <div className="bg-gradient-to-r from-gold/5 to-transparent border border-gold/10 rounded-2xl p-8 mb-12">


                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                        <div className="text-center">
                            <div className="text-3xl font-bold text-gold mb-2">{servicesData.services.length}</div>
                            <div className="text-sm text-muted-foreground">Total Services</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gold mb-2">{servicesData.categories.length}</div>
                            <div className="text-sm text-muted-foreground">Categories</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gold mb-2">{contentData.about.stats[0].value}</div>
                            <div className="text-sm text-muted-foreground">{contentData.about.stats[0].label}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gold mb-2">{contentData.about.stats[2].value}</div>
                            <div className="text-sm text-muted-foreground">{contentData.about.stats[2].label}</div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link
                        href="#contact"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-background font-medium rounded-lg hover:bg-gold/90 transition-colors duration-300 hover:shadow-2xl hover:shadow-gold/20 group"
                    >
                        <span>Start Your Project</span>
                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Services