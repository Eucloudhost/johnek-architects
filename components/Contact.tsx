'use client'

import { useState } from 'react'

interface SocialLinks {
    linkedin: string
    instagram: string
    twitter: string
}

interface ContactContent {
    title: string
    description: string
    email: string
    phone: string
    address: string
    social: SocialLinks
}

interface ContactProps {
    content: ContactContent
}

const Contact = ({ content }: ContactProps) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000))

        alert('Message sent successfully!')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setIsSubmitting(false)
    }

    return (
        <section id="contact" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
                        <span className="text-black">Contact</span>
                        <span className="text-gold ml-2">Us</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">{content.description}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={6}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300 resize-none"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>

                    <div>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">Get in Touch</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center mr-4">
                                            <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Email</p>
                                            <a href={`mailto:${content.email}`} className="text-gray-900 font-medium hover:text-gold transition-colors duration-300">
                                                {content.email}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center mr-4">
                                            <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Phone</p>
                                            <a href={`tel:${content.phone}`} className="text-gray-900 font-medium hover:text-gold transition-colors duration-300">
                                                {content.phone}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center mr-4">
                                            <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Address</p>
                                            <p className="text-gray-900 font-medium">{content.address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">Follow Us</h3>
                                <div className="flex space-x-4">
                                    <a href={content.social.linkedin} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gold hover:text-white transition-all duration-300">
                                        <span className="font-medium">in</span>
                                    </a>
                                    <a href={content.social.instagram} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gold hover:text-white transition-all duration-300">
                                        <span className="font-medium">ig</span>
                                    </a>
                                    <a href={content.social.twitter} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gold hover:text-white transition-all duration-300">
                                        <span className="font-medium">𝕏</span>
                                    </a>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-gray-100">
                                <h4 className="text-lg font-serif font-bold text-gray-900 mb-4">Office Hours</h4>
                                <div className="space-y-2 text-gray-600">
                                    <div className="flex justify-between">
                                        <span>Monday - Friday</span>
                                        <span className="font-medium text-gray-900">9:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Saturday</span>
                                        <span className="font-medium text-gray-900">10:00 AM - 4:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Sunday</span>
                                        <span className="font-medium text-gray-900">Closed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact