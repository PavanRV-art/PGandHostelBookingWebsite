import React from 'react'

const About = () => {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-center pt-28 px-4">
                About our apps
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-slate-500 text-center mt-4 max-w-2xl mx-auto">
                A visual collection of our most recent works — each piece crafted with intention, emotion and style.
            </p>

            {/* Content */}
            <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 px-8 md:px-0 pt-20">
                <div className="size-[520px] -top-80 left-1/2 -translate-x-1/2 rounded-full absolute blur-[300px] -z-10 bg-[#FBFFE1]" />

                {/* Card */}
                <div>
                    <div className="size-12 p-2 bg-indigo-50 border border-indigo-200 rounded">
                        <img
                            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/flashEmoji.png"
                            alt=""
                        />
                    </div>
                    <div className="mt-6 space-y-3">
                        <h3 className="text-lg font-semibold text-slate-700">
                            Lightning-Fast Performance
                        </h3>
                        <p className="text-base text-slate-500">
                            Built with speed — minimal load times and optimized.
                        </p>
                    </div>
                </div>

                {/* Repeat cards */}
                {[
                    ['colorsEmoji', 'Beautifully Designed Components', 'Modern, pixel-perfect UI components ready for any project.'],
                    ['puzzelEmoji', 'Plug-and-Play Integration', 'Simple setup with support for React, Next.js and Tailwind CSS.'],
                    ['bookEmoji', 'Clear & Comprehensive', 'Get started fast with usage examples, live previews and code.'],
                    ['boxEmoji', 'Fully Customizable', 'Easily adapt styles, colors and layout to match your brand or product.'],
                    ['brainEmoji', 'Accessibility First', 'Built with WCAG standards in mind to ensure inclusive user experiences.'],
                ].map(([icon, title, desc], index) => (
                    <div key={index}>
                        <div className="size-12 p-2 bg-indigo-50 border border-indigo-200 rounded">
                            <img
                                src={`https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/${icon}.png`}
                                alt=""
                            />
                        </div>
                        <div className="mt-6 space-y-3">
                            <h3 className="text-lg font-semibold text-slate-700">
                                {title}
                            </h3>
                            <p className="text-base text-slate-500">
                                {desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default About
