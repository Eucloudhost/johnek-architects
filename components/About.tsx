'use client'

interface Stat {
    value: string
    label: string
}

interface AboutContent {
    title: string
    subtitle: string
    content: string
    stats: Stat[]
}

interface AboutProps {
    content: AboutContent
}

const About = ({ content }: AboutProps) => {
    return (
        <section id="about" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="mb-8">
                            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
                                <span className="text-black">{content.title.split(' ')[0]}</span>
                                <span className="text-gold ml-2">{content.title.split(' ').slice(1).join(' ')}</span>
                            </h2>
                            <div className="h-1 w-24 bg-gold mb-6"></div>
                            <h3 className="text-2xl font-serif text-gray-700 mb-6">{content.subtitle}</h3>
                        </div>

                        <div className="text-gray-600 space-y-4 leading-relaxed">
                            {content.content.split('\n\n').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="grid grid-cols-2 gap-8 mb-12">
                            {content.stats.map((stat, index) => (
                                <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                                    <div className="text-4xl font-bold text-gold mb-2">{stat.value}</div>
                                    <div className="text-gray-600 font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-24 h-24 border-4 border-gold/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <div className="w-16 h-16 border-2 border-gold rounded-full"></div>
                                    </div>
                                    <p className="text-gray-700 font-medium">Architectural Excellence Since 1998</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About