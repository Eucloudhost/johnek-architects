'use client'

import { useEffect, useState } from 'react'

interface TypewriterProps {
    text: string
    delay?: number
    infinite?: boolean
}

const Typewriter = ({ text, delay = 30, infinite = false }: TypewriterProps) => {
    const [currentText, setCurrentText] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        let timeout: NodeJS.Timeout

        if (currentIndex < text.length && !isDeleting) {
            timeout = setTimeout(() => {
                setCurrentText(prev => prev + text[currentIndex])
                setCurrentIndex(prev => prev + 1)
            }, delay)
        } else if (isDeleting && currentIndex > 0) {
            timeout = setTimeout(() => {
                setCurrentText(prev => prev.slice(0, -1))
                setCurrentIndex(prev => prev - 1)
            }, delay / 2)
        } else if (infinite) {
            timeout = setTimeout(() => {
                setIsDeleting(!isDeleting)
            }, 1000)
        }

        return () => clearTimeout(timeout)
    }, [currentIndex, delay, infinite, isDeleting, text])

    return <span>{currentText}</span>
}

export default Typewriter