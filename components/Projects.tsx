'use client'

import { useState } from 'react'
import Link from 'next/link'
import projectsData from '@/content/projects.json'

const Projects = () => {
    const [activeFilter, setActiveFilter] = useState('all')

    const filteredProjects = activeFilter === 'all'
        ? projectsData.projects
        : projectsData.projects.filter(project => project.category === activeFilter)

    return (
        <section id="projects" className="py-20 bg-accent/30">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif font-bold text-foreground mb-6">
                        <span className="text-foreground">Featured</span>
                        <span className="text-gold ml-2">Projects</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Explore our portfolio of innovative architectural designs and completed works
                    </p>
                </div>

                {/* Filter buttons */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    <button
                        className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${activeFilter === 'all' ? 'bg-gold text-background' : 'bg-background text-muted-foreground hover:text-foreground border border-border'}`}
                        onClick={() => setActiveFilter('all')}
                    >
                        All
                    </button>
                    {['residential', 'commercial', 'cultural', 'hospitality'].map(category => (
                        <button
                            key={category}
                            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${activeFilter === category ? 'bg-gold text-background' : 'bg-background text-muted-foreground hover:text-foreground border border-border'}`}
                            onClick={() => setActiveFilter(category)}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Projects grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.slice(0, 6).map(project => (
                        <Link
                            key={project.id}
                            href={`/projects/${project.slug}`}
                            className="group relative bg-background border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                        >
                            {/* Status Badge */}
                            <div className="absolute top-4 right-4 z-10">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.status === 'completed'
                                    ? 'bg-green-500/20 text-green-600'
                                    : 'bg-blue-500/20 text-blue-600'
                                    }`}>
                                    {project.status}
                                </span>
                            </div>

                            {/* Project Image */}
                            <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>

                            {/* Project Info */}
                            <div className="p-6">
                                <h3 className="text-xl font-serif font-bold text-foreground mb-2 group-hover:text-gold transition-colors duration-300">
                                    {project.name}
                                </h3>
                                <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="text-gold font-medium">{project.budget}</span>
                                        <span className="text-muted-foreground">•</span>
                                        <span className="text-muted-foreground">{project.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-muted-foreground">
                                        <span>View</span>
                                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Gold Accent Line */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                        </Link>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 px-8 py-3 border-2 border-gold text-gold font-medium rounded-lg hover:bg-gold hover:text-background transition-all duration-300"
                    >
                        View All Projects
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Projects