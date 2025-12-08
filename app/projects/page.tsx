'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import projectsData from '@/content/projects.json'

export default function ProjectsPage() {
    const [activeFilter, setActiveFilter] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')

    // Get unique categories
    const categories = ['all', ...new Set(projectsData.projects.map(p => p.category))]

    // Filter projects
    const filteredProjects = projectsData.projects.filter(project => {
        const matchesCategory = activeFilter === 'all' || project.category === activeFilter
        const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-serif font-bold mb-4">
                        <span className="text-foreground">Our</span>
                        <span className="text-gold ml-2">Projects</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Explore our portfolio of innovative architectural designs and completed works
                    </p>
                </div>

                {/* Filters and Search */}
                <div className="mb-12">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                        {/* Search */}
                        <div className="w-full md:w-auto">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search projects..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full md:w-80 px-4 py-3 pl-12 bg-accent border border-border rounded-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                                />
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                                    🔍
                                </div>
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setActiveFilter(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === category
                                        ? 'bg-gold text-background'
                                        : 'bg-accent text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-accent rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-gold mb-1">{projectsData.projects.length}</div>
                            <div className="text-sm text-muted-foreground">Total Projects</div>
                        </div>
                        <div className="bg-accent rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-gold mb-1">
                                {projectsData.projects.filter(p => p.status === 'completed').length}
                            </div>
                            <div className="text-sm text-muted-foreground">Completed</div>
                        </div>
                        <div className="bg-accent rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-gold mb-1">
                                {new Set(projectsData.projects.map(p => p.location.split(',')[0])).size}
                            </div>
                            <div className="text-sm text-muted-foreground">Countries</div>
                        </div>
                        <div className="bg-accent rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-gold mb-1">8</div>
                            <div className="text-sm text-muted-foreground">Awards Won</div>
                        </div>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map(project => (
                        <Link
                            key={project.id}
                            href={`/projects/${project.slug}`}
                            className="group relative bg-background border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                        >
                            {/* Status Badge */}
                            <div className="absolute top-4 right-4 z-10">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.status === 'completed'
                                    ? 'bg-green-500/20 text-green-600'
                                    : project.status === 'in-progress'
                                        ? 'bg-blue-500/20 text-blue-600'
                                        : 'bg-yellow-500/20 text-yellow-600'
                                    }`}>
                                    {project.status}
                                </span>
                            </div>

                            {/* Project Image */}
                            <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="p-4 absolute bottom-0 left-0 right-0">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <h3 className="text-xl font-serif font-bold text-white mb-1">{project.name}</h3>
                                            <p className="text-white/80 text-sm">{project.location}</p>
                                        </div>
                                        <div className="text-white/60 text-sm">{project.year}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Project Info */}
                            <div className="p-6">
                                <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-1 bg-accent rounded text-xs">{project.category}</span>
                                        <span className="text-gold font-medium">{project.budget}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-muted-foreground">
                                        <span>View Details</span>
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

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-6">🏗️</div>
                        <h3 className="text-2xl font-serif font-bold text-foreground mb-2">No Projects Found</h3>
                        <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
                        <button
                            onClick={() => {
                                setSearchQuery('')
                                setActiveFilter('all')
                            }}
                            className="px-6 py-3 bg-gold text-background font-medium rounded-lg hover:bg-gold/90 transition-colors duration-300"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}