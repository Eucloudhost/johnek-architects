'use client'

import { useState } from 'react'

interface ProjectCardProps {
    project: {
        id: number
        name: string
        description: string
        category: string
        location: string
        year: string
        image: string
    }
}

const ProjectCard = ({ project }: ProjectCardProps) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className="group relative overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="aspect-video overflow-hidden bg-gray-200">
                <div
                    className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 transition-transform duration-700 group-hover:scale-110"
                    style={{
                        backgroundImage: `url(${project.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div className={`absolute inset-0 bg-gradient-to-t from-gold/30 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
                </div>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-serif font-bold text-gray-900 group-hover:text-gold transition-colors duration-300">
                        {project.name}
                    </h3>
                    <span className="text-sm font-medium text-gold bg-gold/10 px-3 py-1 rounded-full">
                        {project.category}
                    </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">{project.location}</span>
                    <span className="text-sm font-medium text-gray-900">{project.year}</span>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold to-gold/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
        </div>
    )
}

export default ProjectCard