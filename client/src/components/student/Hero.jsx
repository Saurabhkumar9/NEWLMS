import React from 'react'
import { assets } from '../../assets/assets'
import SearchBar from './SearchBar'

const Hero = () => {
  const hero = {
    title: "Shape your future with courses tailored to your interests.",
    highlightedText: "fit your choice",
    subtitle: "We unite top-notch instructors, engaging content, and a caring community to support your journey.",
    showSketch: true,
  }

  return (
    <div className='flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-5 md:px-0 space-y-6 text-center bg-gradient-to-b from-cyan-100/70'>

      {/* Title */}
      <h1 className='text-sm sm:text-3xl md:text-3xl lg:text-3xl font-bold text-gray-800 max-w-4xl leading-tight relative'>
        {hero.title.split(hero.highlightedText)[0]}
        <span className='text-blue-600'>{hero.highlightedText}</span>
        {hero.title.split(hero.highlightedText)[1]}
        
        {/* Sketch image */}
        {hero.showSketch && (
          <img 
            src={assets.sketch} 
            alt="sketch" 
            className='hidden md:block absolute -bottom-5 right-0 w-28 md:w-36 lg:w-40' 
          />
        )}
      </h1>

      {/* Subtitle */}
      <p className='text-sm hidden sm:block sm:text-base md:text-lg text-gray-600 max-w-2xl'>
        {hero.subtitle}
      </p>
      <SearchBar/>
    </div>
  )
}

export default Hero
