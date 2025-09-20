import React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// NOTE: This component is designed to work with GSAP and its plugins loaded globally
// via <script> tags in your main HTML file. This avoids potential bundling issues
// and is a reliable method for this setup.

const GlobalStyles = () => (
  <style>{`
    
    :root {
      --bg-primary: #F7F5F0;
      --text-primary: #1A1A1A;
      --accent-lime: #D4FF00;
      --accent-magenta: #FF00DD;
      --accent-cyan: #00E0FF;
      --accent-orange: #FF7A00;
    }
    html { scroll-behavior: smooth; }
    body {
      background-color: var(--bg-primary);
      color: var(--text-primary);
    }
    .font-headline {
      font-family: 'Anton', sans-serif;
      text-transform: uppercase;
      -webkit-text-stroke: 1px var(--text-primary);
      text-stroke: 1px var(--text-primary);
    }
    .font-ui { font-family: 'VT323', monospace; }
    .paper-texture {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      width: 100%; height: 100%;
      opacity: 0.15; z-index: -10;
      background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noise)"/></svg>');
    }
    .halftone-bg {
      background-image: radial-gradient(var(--text-primary) 0.5px, transparent 0);
      background-size: 8px 8px;
    }
    .window-card {
      border: 2px solid var(--text-primary);
      background-color: var(--bg-primary);
      box-shadow: 8px 8px 0px var(--text-primary);
    }
    .window-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 0.75rem;
        border-bottom: 2px solid var(--text-primary);
        background-color: var(--bg-primary);
    }
    .window-title {
        font-weight: bold;
    }
    .press-effect {
      border: 2px solid var(--text-primary);
      box-shadow: 4px 4px 0px var(--text-primary);
      transition: all 0.15s ease-out;
    }
    .press-effect:hover {
      box-shadow: 2px 2px 0px var(--text-primary);
      transform: translate(2px, 2px);
    }
    .press-effect:active {
      box-shadow: 0px 0px 0px var(--text-primary);
      transform: translate(4px, 4px);
    }
    .btn-lime { background-color: var(--accent-lime); color: var(--text-primary); }
    .btn-lime:hover { background-color: var(--text-primary); color: var(--accent-lime); }
    .btn-arrow-icon { transition: transform 0.2s ease-in-out; display: inline-block; }
    .press-effect:hover .btn-arrow-icon { transform: translateX(5px); }
    .terminal-window {
      background-color: var(--text-primary);
      border: 2px solid var(--text-primary);
      box-shadow: 8px 8px 0px var(--text-primary);
      position: relative;
    }
    .terminal-window::after {
      content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
      background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
      z-index: 2; background-size: 100% 4px, 6px 100%; pointer-events: none;
      animation: scanlines 2s linear infinite;
    }
    @keyframes scanlines {
      0% { background-position: 0 0; }
      100% { background-position: 0 100%; }
    }
    .nav-link {
        position: relative;
        padding: 4px 8px;
        transition: color 0.2s ease-in-out;
    }
    .nav-link:hover {
        color: var(--accent-magenta);
    }
    .nav-link::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 2px;
        background-color: var(--accent-magenta);
        transition: width 0.3s ease;
    }
    .nav-link:hover::after {
        width: 100%;
    }
    .split-text-char {
        display: inline-block;
        position: relative;
    }
<<<<<<< HEAD

    /* --- FINAL REBUILT BOOK STYLES --- */
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
        .proof-card {
  /* Add a subtle halftone pattern to the card background */
  background-image: radial-gradient(var(--text-primary) 0.5px, transparent 0);
  background-size: 6px 6px;
  background-position: 0 0;
  
  position: relative; /* Needed for the pseudo-element glow */
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
  overflow: hidden; /* Keeps the glow effect contained */
  z-index: 1;
  align-self: stretch; /* Makes card fill the grid cell height */
}

/* Base styles for the ::before pseudo-element used for the glow */
.proof-card::before {
  content: '';
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 200%; /* Make it large to create a soft, wide glow */
  height: 200%;
  filter: blur(60px);
  opacity: 0;
  transition: opacity 0.4s ease-in-out;
  z-index: -1;
}

/* --- DEFINE GRADIENTS FOR EACH COLOR THEME --- */

/* Magenta hover gets a magenta-dominant glow */
.proof-container.hover-magenta .proof-card::before {
  background-image: radial-gradient(circle, var(--accent-magenta) 0%, var(--accent-lime) 100%);
}
/* Lime hover gets a lime-dominant glow */
.proof-container.hover-lime .proof-card::before {
  background-image: radial-gradient(circle, var(--accent-lime) 0%, var(--accent-magenta) 100%);
}

/* The SVG Icon inside the card */
.proof-card svg {
    transition: transform 0.3s ease-out;
}

/* --- HOVER STATE --- */

/* Generic hover transforms and icon scale for any proof container */
.proof-container:hover .proof-card {
  transform: translateY(-8px) rotate(-1.5deg);
}
.proof-container:hover .proof-card svg {
    transform: scale(1.1);
}

/* Reveal glow on any hover */
.proof-container:hover .proof-card::before {
  opacity: 0.15; /* A subtle opacity for the background glow */
}

/* SPECIFIC hover shadow colors */
.proof-container.hover-magenta:hover .proof-card {
  box-shadow: 12px 12px 0px var(--accent-magenta);
}

.proof-container.hover-lime:hover .proof-card {
  box-shadow: 12px 12px 0px var(--accent-lime);
}
        
>>>>>>> 11a9667f5611456c74228b846ce49a9d77d0de0c

    /* --- REBUILT BOOK STYLES --- */
>>>>>>> 700ee2f73825707f370771918ab21eeedcb0f5c5
    .solution-left {
        /* A smaller perspective value makes the 3D effect more pronounced */
        perspective: 1800px;
    }

    .book-container {
        position: relative;
        width: 100%;
        max-width: 380px;
        height: 450px;
        margin: 0 auto;
        transform-style: preserve-3d;
    }

    .book-cover, .book-page {
        position: absolute;
        inset: 0;
        transform-origin: left center;
        /* Slower transition with a different easing to make the flip more deliberate and visible */
        transition: transform 0.8s cubic-bezier(0.3, 0, 0.3, 1);
        transform-style: preserve-3d; /* This is crucial */
    }

    .book-face {
        position: absolute;
        inset: 0;
        backface-visibility: hidden;
    }
    
    .book-cover {
        cursor: pointer;
    }
    .book-cover .book-face--front {
        border: 2px solid var(--text-primary);
        background-color: var(--text-primary);
        color: var(--bg-primary);
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 2rem;
    }
    .book-cover .book-face--back {
        border: 2px solid var(--text-primary);
        background-color: #333; /* Dark back for the cover */
        transform: rotateY(180deg);
    }

    .book-cover.is-open {
        transform: rotateY(-180deg);
    }

    .book-page {
        inset: 6px 6px 6px 3px; /* Makes cover slightly larger */
    }
    .book-page .book-face--front {
        border: 2px solid var(--text-primary);
        background-color: var(--bg-primary);
    }
    .book-page .book-face--back {
        border: 2px solid var(--text-primary);
        background-color: #F0EDE5; /* Slightly different back page color */
        transform: rotateY(180deg);
    }

    .book-page.is-turned {
        transform: rotateY(-180deg);
    }

    .book-page.is-active {
        transform: rotateY(0deg); /* Active page is perfectly still */
    }

    .page-tab {
        position: absolute;
        right: -2px;
        transform: translateX(100%) rotate(90deg) translateY(-100%);
        transform-origin: top left;
        padding: 0.75rem 0;
        border: 2px solid var(--text-primary);
        border-bottom: none;
        color: var(--text-primary);
        font-weight: bold;
        cursor: pointer;
        z-index: 5;
        text-align: center;
        transition: background-color 0.3s ease;
    }

    .book-page:hover .page-tab {
      background-color: var(--accent-lime) !important;
    }
    
    .book-page:nth-of-type(1) .page-tab { top: 15%; width: 150px; }
    .book-page:nth-of-type(2) .page-tab { top: 35%; width: 120px; }
    .book-page:nth-of-type(3) .page-tab { top: 55%; width: 140px; }
    .book-page:nth-of-type(4) .page-tab { top: 75%; width: 130px; }

    .page-content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 1.5rem;
      text-align: center;
    }
    
    .page-description {
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.4s ease 0.3s, transform 0.4s ease 0.3s;
        font-size: 1rem;
        margin-top: 1rem;
    }

    .book-page.is-active .page-description {
        opacity: 1;
        transform: translateY(0);
    }
<<<<<<< HEAD
=======
<<<<<<< HEAD
        .footer-link {
    position: relative;
    transition: color 0.3s ease;
}
.footer-link:hover {
    color: var(--accent-magenta);
}
.footer-link::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: var(--accent-magenta);
    bottom: -2px;
    left: 0;
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.3s ease-out;
}
.footer-link:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
}

.social-icon {
    transition: transform 0.2s ease-out, color 0.2s ease-out;
}
.social-icon:hover {
    transform: translateY(-3px);
    color: var(--accent-lime);
}
=======

>>>>>>> 11a9667f5611456c74228b846ce49a9d77d0de0c
>>>>>>> 700ee2f73825707f370771918ab21eeedcb0f5c5
  `}</style>
);

const Navbar = () => (
  <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl p-3 z-50 bg-white/20 backdrop-blur-lg rounded-xl border border-white/30 shadow-lg font-ui">
    <div className="container mx-auto flex justify-between items-center">
      <a href="#hero" className="font-headline text-2xl sm:text-3xl text-black">VAR</a>
      <div className="hidden md:flex items-center space-x-4 lg:space-x-8 text-base sm:text-lg">
        <a href="#hero" className="nav-link">Home</a>
        <a href="#philosophy" className="nav-link">About</a>
        <a href="#solution" className="nav-link">Services</a>
        <a href="#pricing" className="nav-link">Pricing</a>
        <a href="#closing" className="nav-link">Contact</a>
      </div>
        <div className="md:hidden">
        <svg className="w-8 h-8 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
      </div>
    </div>
  </header>
);

const WindowControls = () => (
  <div className="flex space-x-1">
    <div className="w-3 h-3 border-2 border-black"></div>
    <div className="w-3 h-3 border-2 border-black"></div>
    <div className="w-3 h-3 border-2 border-black"></div>
  </div>
);

const VarBotWaving = ({ className }) => (
    <svg className={className} viewBox="0 0 150 200" xmlns="http://www.w3.org/2000/svg" style={{ strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 4, fill: "none", stroke: "var(--text-primary)"}}>
        <rect x="35" y="20" width="80" height="60" fill="var(--bg-primary)"/>
        <path d="M75,20 V10 H65 V5 h20 v5 H75"/>
        <circle className="bot-eye" cx="60" cy="50" r="8" fill="var(--text-primary)"/>
        <path d="M52,50 v-8" stroke="var(--bg-primary)" strokeWidth="2"/>
        <circle className="bot-eye" cx="90" cy="50" r="8" fill="var(--text-primary)"/>
        <path d="M82,50 v-8" stroke="var(--bg-primary)" strokeWidth="2"/>
        <rect x="45" y="80" width="60" height="70" fill="var(--bg-primary)"/>
        <g className="bot-waving-arm">
            <path d="M35,95 C 10,80 -10,100 20,60 Q 30 40, 50 50"/>
            <path d="M15,65 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0" fill="var(--bg-primary)"/>
        </g>
        <path d="M115,95 C 130,100 135,120 120,130" />
        <path d="M120,135 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0" fill="var(--bg-primary)"/>
        <path d="M60,150 C 50,170 40,190 50,200"/>
        <path d="M90,150 C 100,170 110,190 100,200"/>
    </svg>
);

const BrainIllustration = ({ className }) => ( <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, fill: "none", stroke: "var(--text-primary)"}}> <path d="M50 10 C 20 10, 20 40, 35 40 C 25 55, 40 60, 50 55 C 60 60, 75 55, 65 40 C 80 40, 80 10, 50 10 Z" fill="var(--bg-primary)"/> <path d="M50 10 V 55" /> <path d="M35 40 C 40 30, 60 30, 65 40" /> <path d="M40 60 C 30 70, 30 80, 20 90" /> <path d="M60 60 C 70 70, 70 80, 80 90" /> <ellipse cx="18" cy="92" rx="10" ry="4" fill="var(--bg-primary)" /> <ellipse cx="82" cy="92" rx="10" ry="4" fill="var(--bg-primary)" /> </svg> );
const HandIllustration = ({ className }) => ( <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, fill: "none", stroke: "var(--text-primary)"}}> <path d="M20 90 C 10 70, 10 50, 25 40 C 35 35, 40 45, 40 50 L 50 90 Z" fill="var(--bg-primary)"/> <path d="M40 55 C 50 50, 55 60, 55 65 L 60 90 Z" fill="var(--bg-primary)"/> <path d="M55 70 C 65 65, 70 75, 70 80 L 70 90 Z" fill="var(--bg-primary)"/> <path d="M25 40 C 30 20, 50 10, 70 20" /> <rect x="65" y="20" width="10" height="10" fill="var(--bg-primary)"/> </svg> );
const RocketIllustration = ({ className }) => ( <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, fill: "none", stroke: "var(--text-primary)"}}> <path d="M50 10 L 65 40 L 35 40 Z" fill="var(--bg-primary)"/> <rect x="35" y="40" width="30" height="40" fill="var(--bg-primary)"/> <path d="M35 80 L 20 95 L 35 85 Z" fill="var(--bg-primary)"/> <path d="M65 80 L 80 95 L 65 85 Z" fill="var(--bg-primary)"/> <path d="M50 80 L 40 95 H 60 Z" fill="var(--accent-lime)" stroke="none"/> </svg> );
const ComputerIllustration = ({ className }) => ( <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, fill: "none", stroke: "var(--text-primary)"}}> <rect x="20" y="30" width="60" height="40" fill="var(--bg-primary)"/> <path d="M40 50 L 45 55 L 50 50" /> <path d="M60 50 L 65 55 L 70 50" /> <path d="M10 60 C 50 80, 50 80, 90 60" /> </svg> );
const RocketSVG = ({ className }) => ( <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M6 2L3 6v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6l-3-4H6zM3.5 6h17M16 10a4 4 0 11-8 0" /> </svg> );
const LockSVG = ({ className }) => ( <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect> <path d="M7 11V7a5 5 0 0110 0v4"></path> </svg> );
const WandSVG = ({ className }) => ( <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M15 4l6 6m-9-3l-6 6l9 9l6-6l-9-9z"></path> <path d="M9 21l-6-6"></path> <path d="M21 3L12 12"></path> </svg> );
const BoltSVG = ({ className }) => ( <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon> </svg> );

const ExcellenceUnderline = ({ className }) => (
    <svg className={className} viewBox="0 0 200 20" preserveAspectRatio="none">
        <defs>
            <clipPath id="underline-clip">
                <rect className="underline-mask" x="0" y="0" width="0" height="20" />
            </clipPath>
        </defs>
        <path clipPath="url(#underline-clip)" d="M 2,10 C 30,15 70,-5 100,10 C 130,25 170,-5 198,10" stroke="var(--accent-lime)" fill="none" strokeWidth="4" strokeLinecap="round"/>
    </svg>
);

const GridPattern = ({ className }) => (
    <svg className={className} width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="var(--text-primary)" strokeOpacity="0.3" strokeWidth="0.5"/>
            </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#smallGrid)" />
    </svg>
);

const services = [
  {
    title: "Creative Strategy",
    headline: "You dream. We design.",
    description: "Blending creativity with market insights to craft a unique digital identity for your brand.",
    illustration: <BrainIllustration className="w-24 h-24 mx-auto"/>,
    color: "var(--accent-magenta)"
  },
  {
    title: "Expert Build",
    headline: "You plan. We build.",
    description: "Using cutting-edge tech to build robust, scalable, and high-performing applications.",
    illustration: <HandIllustration className="w-24 h-24 mx-auto"/>,
    color: "var(--accent-cyan)"
  },
  {
    title: "Seamless Scaling",
    headline: "You grow. We scale.",
    description: "Your digital infrastructure grows with you, ready for tomorrow's challenges and opportunities.",
    illustration: <RocketIllustration className="w-24 h-24 mx-auto"/>,
    color: "var(--accent-orange)"
  },
  {
    title: "Ongoing Support",
    headline: "You rest. We maintain.",
    description: "Continuous support and proactive maintenance to ensure your platform runs flawlessly.",
    illustration: <ComputerIllustration className="w-24 h-24 mx-auto"/>,
    color: "var(--accent-lime)"
  }
];

const BookComponent = () => {
    const [activePageIndex, setActivePageIndex] = React.useState(-1);
    
    // A ref for the timer that delays actions on hover/leave
    const interactionTimer = React.useRef(null);
    // A ref for the timer that sequences the page-turning animation
    const animationSequenceTimer = React.useRef(null);
    // A ref to track the current animation, preventing overlaps
    const currentAnimationId = React.useRef(null);

    const cleanupTimers = () => {
        clearTimeout(interactionTimer.current);
        clearTimeout(animationSequenceTimer.current);
    };

    // This function animates pages sequentially to a target index
    const animatePages = (targetIndex) => {
        // Give each new animation a unique ID. If a new one starts, the old one stops.
        const animationId = Date.now();
        currentAnimationId.current = animationId;

        const pageTurnDelay = 150; // Milliseconds between each page turn

        const step = () => {
            // If a newer animation has started, stop this one from continuing.
            if (currentAnimationId.current !== animationId) {
                return;
            }

            setActivePageIndex(prevIndex => {
                // Use the updater function to get the most recent state
                const currentIndex = prevIndex;

                // Determine direction and next page index
                if (targetIndex > currentIndex) { // Opening pages
                    const nextIndex = currentIndex + 1;
                    // If we haven't reached the target yet, schedule the next step
                    if (nextIndex <= targetIndex) {
                        animationSequenceTimer.current = setTimeout(step, pageTurnDelay);
                        return nextIndex;
                    }
                } else if (targetIndex < currentIndex) { // Closing pages
                    const nextIndex = currentIndex - 1;
                     // If we haven't reached the target yet, schedule the next step
                    if (nextIndex >= targetIndex) {
                        animationSequenceTimer.current = setTimeout(step, pageTurnDelay);
                        return nextIndex;
                    }
                }
                
                // If animation is finished or no change is needed, return the current index
                return currentIndex;
            });
        };
        
        // Start the animation sequence
        step();
    };

    const handleMouseEnterTab = (targetIndex) => {
        cleanupTimers();
        if (targetIndex === activePageIndex) return; // No action if it's already the active page
        
        // Delay before starting the animation to avoid accidental triggers
        interactionTimer.current = setTimeout(() => {
            animatePages(targetIndex);
        }, 150);
    };

    const handleMouseLeaveBook = () => {
        cleanupTimers();
        // Delay before closing the book completely
        interactionTimer.current = setTimeout(() => {
            animatePages(-1); 
        }, 200);
    };

    const handleMouseEnterBook = () => {
        // Cancel any pending close animation when the mouse re-enters the book
        cleanupTimers();
    };
    
    // Cleanup timers when the component is removed
    React.useEffect(() => {
        return () => cleanupTimers();
    }, []);

    const getPageStyle = (index) => {
        const isTurned = activePageIndex > -1 && index < activePageIndex;
        const isActive = index === activePageIndex;
        
        let zIndex;
        if (isActive) {
            zIndex = 50; 
        } else if (isTurned) {
            zIndex = index + 2; 
        } else {
            zIndex = services.length - index + 1;
        }
        return { zIndex };
    };
    
    return (
        <div 
            className="book-container"
            onMouseEnter={handleMouseEnterBook}
            onMouseLeave={handleMouseLeaveBook}
        >
            <div 
                className={`book-cover ${activePageIndex > -1 ? 'is-open' : ''}`}
                style={{ zIndex: activePageIndex > -1 ? 1 : 100 }}
            >
                <div className="book-face book-face--front">
                     <h3 className="font-headline text-4xl">The Four-Step Symphony of Ours</h3>
                </div>
                <div className="book-face book-face--back"></div>
            </div>
            <div className="book-pages">
                {services.map((service, index) => {
                    const isTurned = activePageIndex > -1 && index < activePageIndex;
                    const isActive = index === activePageIndex;
                    const pageClasses = `book-page ${isTurned ? 'is-turned' : ''} ${isActive ? 'is-active' : ''}`;
                    
                    return (
                        <div 
                            key={index} 
                            className={pageClasses} 
                            style={getPageStyle(index)}
                        >
                           <div className="book-face book-face--front">
                                <div 
                                    className="page-tab font-ui" 
                                    style={{ backgroundColor: service.color }}
                                    onMouseEnter={() => handleMouseEnterTab(index)}
                                >
                                    {service.title}
                                </div>
                                <div className="page-content space-y-4">
                                    {service.illustration}
                                    <h3 className="font-headline text-3xl">{service.headline}</h3>
                                    <p className="page-description font-ui px-4">
                                        {service.description}
                                    </p>
                                </div>
                           </div>
                           <div className="book-face book-face--back"></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


export default function App() {

    
    const XIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.931L18.901 1.153zm-1.613 19.59h2.546L4.109 2.542H1.465l15.823 18.201z"/>
    </svg>
);

const LinkedInIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.75c0-1.4-1.2-2.5-2.5-2.5S11 12.85 11 14.25V19h-3v-9h2.9v1.3a3.11 3.11 0 012.6-1.4c2.5 0 4.5 2.2 4.5 5.1V19z"/>
    </svg>
);

  const mainRef = React.useRef(null);

  React.useLayoutEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    const TextPlugin = window.TextPlugin;

    if (!gsap || !ScrollTrigger || !TextPlugin) {
        console.error("GSAP or its plugins are not loaded.");
        return;
    }

    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    const splitText = (selector) => {
        const element = mainRef.current.querySelector(selector);
        if (element) {
            const text = element.textContent.trim();
            element.innerHTML = text.split('').map(char => `<span class="split-text-char">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
            return element.querySelectorAll('.split-text-char');
        }
        return [];
    };

    const ctx = gsap.context(() => {
        gsap.from("header", { y: -100, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.5 });
        
        const heroChars = splitText(".hero-headline");
        gsap.from(heroChars, {
            opacity: 0, y: 50, rotateX: -90, stagger: 0.02,
            duration: 1, ease: 'power3.out', delay: 1,
        });
        
        gsap.from(".hero-subtext", { y: '100%', opacity: 0, duration: 1, ease: 'power3.out', delay: 1.5 });
        gsap.from(".hero-cta", { opacity: 0, scale: 0.8, duration: 1, ease: 'elastic.out(1, 0.75)', delay: 2 });
        gsap.from(".hero-sticker", { scale: 0, opacity: 0, stagger: 0.1, duration: 0.5, ease: "back.out(1.7)", delay: 2 });
        
        gsap.to(".bot-waving-arm", { rotation: 25, transformOrigin: 'bottom right', repeat: -1, yoyo: true, duration: 0.8, ease: 'power1.inOut' });
        gsap.to(".bot-eye", { scaleY: 0.1, transformOrigin: 'center center', repeat: -1, yoyo: true, repeatDelay: 3, duration: 0.1 });

        const tlTerminal = gsap.timeline({ scrollTrigger: { trigger: "#problem", start: "top 70%", toggleActions: "play none none reverse" } });
        tlTerminal.fromTo(".terminal-window", {opacity: 0.5, scale: 0.98}, {opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out'})
          .to("#terminal-text-1", { duration: 1.5, text: "Outdated websites lose trust.", ease: "none" })
          .to("#terminal-text-2", { duration: 1.5, text: "Slow apps lose customers.", ease: "none" })
          .to("#terminal-text-3", { duration: 2, text: "Poor design loses opportunities.", ease: "none" })
          .fromTo("#terminal-cursor", { autoAlpha: 0 }, { autoAlpha: 1, repeat: -1, yoyo: true, duration: 0.5 }, "-=2");

        const philosophyChars = splitText(".philosophy-line");
        gsap.from(philosophyChars, {
          scrollTrigger: { trigger: "#philosophy", start: "top 70%" }, 
          opacity: 0, y: 20, stagger: { amount: 0.5, from: "random" }, duration: 0.8, ease: 'power2.out'
        });
        
        gsap.to(".philosophy-underline .underline-mask", { 
            width: 200, ease: "none",
            scrollTrigger: { 
                trigger: ".philosophy-punchline", start: "top center", end: "bottom center", scrub: 1 
            }, 
        });

        gsap.from([".solution-left", ".solution-right"], {
          scrollTrigger: { trigger: "#solution", start: "top 70%", toggleActions: "play none none reverse" },
          opacity: 0,
          y: 60,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.2
        });
        
        gsap.to(".solution-underline .underline-mask", {
            width: 200, ease: "none",
            scrollTrigger: {
                trigger: ".solution-right", start: "top center", end: "bottom center", scrub: 1.5
            }
        });

        gsap.from(".proof-card svg", {
            scrollTrigger: { trigger: ".proof-card", start: "top 80%", stagger: 0.2 },
            opacity: 0, y: 50, duration: 1, ease: 'elastic.out(1, 0.5)'
        });
        
        gsap.from(".pricing-card", {
            scrollTrigger: { trigger: "#pricing", start: "top 70%", toggleActions: "play none none reverse" },
            opacity: 0, filter: 'blur(10px)', stagger: 0.2, duration: 1, ease: 'power2.out'
        });

        const closingChars = splitText(".closing-headline");
        gsap.from(closingChars, {
            opacity: 0,
            scaleY: 0,
            y: -50,
            transformOrigin: "top",
            stagger: 0.03,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: "#closing", start: "top 60%" }
        });
        
        gsap.to(".deco-grid", {
            y: "-200px",
            scrollTrigger: {
                trigger: "#solution", start: "top bottom", end: "bottom top", scrub: 1.5
            }
        });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <GlobalStyles />
      <Navbar />
      <div className="paper-texture"></div>
      <main ref={mainRef} className="bg-[--bg-primary] text-[--text-primary] font-['Inter'] selection:bg-[--accent-lime] selection:text-[--text-primary]">
        
        <section id="hero" className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden">
            <div className="absolute inset-0 halftone-bg opacity-30"></div>
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
                <div className="relative z-10 space-y-6">
                    <div className="hero-card window-card p-6 md:p-8">
                        <h1 className="hero-headline font-headline text-4xl sm:text-5xl lg:text-7xl leading-tight">
                            Every business deserves a digital presence that performs, scales, and inspires.
                        </h1>
                    </div>
                    <div className="hero-card window-card p-4 md:p-6 ml-0 lg:ml-12 overflow-hidden">
                        <p className="hero-subtext text-lg md:text-xl">
                            At VAR, we don’t just build websites. We craft digital experiences.
                        </p>
                    </div>
                     <div className="hero-cta inline-block ml-0 lg:ml-24">
                        <a href="#closing" className="press-effect btn-lime font-ui text-xl md:text-2xl p-4 md:px-8 md:py-5 inline-block">
                            <span className="btn-arrow-icon mr-2">→</span> Start the Journey
                        </a>
                    </div>
                </div>
                <div className="relative h-full row-start-1 lg:col-start-2 flex items-center justify-center">
                    <VarBotWaving className="var-bot-hero w-[250px] h-[333px] md:w-[300px] md:h-[400px] z-20 drop-shadow-lg"/>
                </div>
            </div>
            <div className="hero-sticker absolute top-[15%] left-[5%] sm:left-[10%] w-16 h-16 bg-[--accent-magenta] rotate-[-15deg]"></div>
            <svg className="hero-sticker absolute bottom-[20%] right-[5%] w-20 h-20 rotate-[25deg]" viewBox="0 0 100 100">
                <path d="M50 0L61 39L100 39L69 62L80 100L50 75L20 100L31 62L0 39L39 39Z" fill="var(--accent-lime)"/>
            </svg>
            <div className="hero-sticker absolute top-[25%] right-[10%] sm:right-[15%] w-12 h-12 bg-[--accent-lime] rounded-full"></div>
        </section>

        <section id="problem" className="py-20 md:py-32 px-4 sm:px-6 md:px-8">
             <div className="terminal-window max-w-4xl mx-auto p-4 sm:p-6 md:p-8 font-ui text-lg sm:text-xl md:text-3xl text-[--accent-lime] space-y-2">
                <p className="h-8 md:h-10" id="terminal-text-1"></p>
                <p className="h-8 md:h-10" id="terminal-text-2"></p>
                <div className="flex items-center h-8 md:h-10">
                    <p id="terminal-text-3" className="pr-2"></p>
                    <span id="terminal-cursor" className="inline-block w-3 h-6 md:w-4 md:h-8 bg-[--accent-lime] invisible"></span>
                </div>
            </div>
        </section>

        <section id="philosophy" className="py-20 md:py-32 px-4 sm:px-6 md:px-8 text-center">
             <div className="max-w-5xl mx-auto space-y-12">
                <p className="philosophy-line text-xl md:text-2xl lg:text-3xl leading-relaxed">
                    We believe technology should feel simple, design should feel natural, and delivery should always be before time.
                </p>
                 <div className="relative">
                    <h2 className="philosophy-punchline font-headline text-5xl md:text-7xl lg:text-9xl">
                        Here at VAR, we don’t believe in balance — we believe in excellence.
                    </h2>
                    <ExcellenceUnderline className="philosophy-underline absolute -bottom-2 md:-bottom-4 left-0 w-full h-auto"/>
                 </div>
            </div>
        </section>

        <section id="solution" className="relative py-20 md:py-32 px-4 sm:px-6 md:px-8 overflow-hidden">
            <GridPattern className="absolute top-1/4 -left-20 opacity-20 deco-grid" />
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                
                <div className="solution-left flex items-center justify-center lg:min-h-[450px]">
                    <BookComponent />
                </div>

                <div className="solution-right space-y-6">
                     <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl">A Four-Step Symphony of Creation</h2>
                     <p className="text-lg md:text-xl lg:text-2xl leading-relaxed">
                        We transform your vision into a digital masterpiece. Our process is a fusion of creative strategy and technical precision, ensuring every pixel and line of code serves a purpose. It's a true&nbsp;
                        <span className="relative inline-block font-headline text-lime-500/50" style={{'--accent-lime': '#FF00DD'}}>
                            synergy
                            <ExcellenceUnderline className="solution-underline absolute -bottom-1 md:-bottom-2 left-0 w-full h-auto"/>
                        </span>
                        &nbsp;between your goals and our expertise, resulting in a product that's not just built, but thoughtfully engineered for success.
                     </p>
                </div>

            </div>
        </section>
        
        <section id="proof" className="py-20 md:py-32 px-4 sm:px-6 md:px-8">
            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="proof-card window-card">
                    <div className="window-header"><h3 className="font-ui window-title">🚀 Fast & Scalable</h3><WindowControls/></div>
                    <div className="p-6 flex justify-center items-center h-48"><RocketSVG className="w-24 h-24 md:w-28 md:h-28 text-gray-800" /></div>
                </div>
                <div className="proof-card window-card">
                    <div className="window-header"><h3 className="font-ui window-title">🔐 Secure by Design</h3><WindowControls/></div>
                    <div className="p-6 flex justify-center items-center h-48"><LockSVG className="w-24 h-24 md:w-28 md:h-28 text-gray-800" /></div>
                </div>
                <div className="proof-card window-card">
                    <div className="window-header"><h3 className="font-ui window-title">🎨 Modern UI/UX</h3><WindowControls/></div>
                    <div className="p-6 flex justify-center items-center h-48"><WandSVG className="w-24 h-24 md:w-28 md:h-28 text-gray-800" /></div>
                </div>
                <div className="proof-card window-card">
                    <div className="window-header"><h3 className="font-ui window-title">⚡ Delivered Before Time</h3><WindowControls/></div>
                    <div className="p-6 flex justify-center items-center h-48"><BoltSVG className="w-24 h-24 md:w-28 md:h-28 text-gray-800" /></div>
                </div>
            </div>
        </section>

        <section id="pricing" className="py-20 md:py-32 px-4 sm:px-6 md:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-end">
                <div className="pricing-card window-card">
                    <div className="window-header"><h3 className="font-ui window-title text-sm sm:text-base">Your first step online.</h3><WindowControls/></div>
                    <div className="p-6 md:p-8 space-y-4">
                        <h4 className="font-headline text-3xl">Starter</h4>
                        <p className="text-base md:text-lg">Perfect for individuals and small projects getting off the ground.</p>
                    </div>
                </div>
                 <div className="pricing-card window-card relative">
                    <div className="best-value-sticker absolute -top-6 -right-6 font-headline text-lg bg-[--accent-magenta] text-[--text-primary] px-4 py-2 rotate-[10deg] border-2 border-black">BEST VALUE</div>
                    <div className="window-header"><h3 className="font-ui window-title text-sm sm:text-base">Built to grow with you.</h3><WindowControls/></div>
                    <div className="p-6 md:p-8 space-y-4">
                        <h4 className="font-headline text-4xl">Professional</h4>
                        <p className="text-base md:text-lg">The ideal package for growing businesses that need to make an impact.</p>
                    </div>
                </div>
                <div className="pricing-card window-card">
                    <div className="window-header"><h3 className="font-ui window-title text-sm sm:text-base">Custom. Powerful. Limitless.</h3><WindowControls/></div>
                    <div className="p-6 md:p-8 space-y-4">
                        <h4 className="font-headline text-3xl">Enterprise</h4>
                        <p className="text-base md:text-lg">Fully custom solutions for established companies with unique needs.</p>
                    </div>
                </div>
            </div>
             <div className="text-center mt-16">
                <a href="https://var-project-request-ef75.vercel.app/" target="_blank" rel="noopener noreferrer" className="press-effect btn-lime font-ui text-xl md:text-2xl p-4 px-8 inline-block">Request a Quote</a>
            </div>
        </section>

        <section id="closing" className="min-h-screen bg-[--text-primary] text-[--bg-primary] flex flex-col justify-center items-center text-center p-4 md:p-8">
            <h2 className="closing-headline font-headline text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-[--bg-primary]">Your vision. Our code. Together, we build the future.</h2>
             <div className="mt-12">
                 <a href="https://var-project-request-ef75.vercel.app/" target="_blank" rel="noopener noreferrer" className="press-effect bg-[--accent-lime] text-[--text-primary] font-ui text-2xl sm:text-3xl p-4 sm:p-6 hover:bg-[--bg-primary] hover:text-[--accent-lime] inline-block">
                    <span className="btn-arrow-icon mr-2">→</span> Let’s Talk
                </a>
            </div>
        </section>
        
        <footer id="footer" className="py-16 px-4 md:px-8">
    <div className="max-w-7xl mx-auto">
        
        {/* Top Branding & Divider */}
        <div className="text-center mb-12">
             <a href="#hero" className="font-headline text-5xl text-black">VAR</a>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-8 text-center md:text-left">
            
            {/* Navigate Column */}
            <div>
                <h4 className="font-ui text-2xl mb-4 text-black">Navigate</h4>
                <ul className="space-y-3">
                    <li><a href="#hero" className="font-ui text-lg footer-link">Home</a></li>
                    <li><a href="#philosophy" className="font-ui text-lg footer-link">About</a></li>
                    <li><a href="#solution" className="font-ui text-lg footer-link">Services</a></li>
                    <li><a href="#pricing" className="font-ui text-lg footer-link">Pricing</a></li>
                </ul>
            </div>
            
            {/* Connect Column */}
            <div>
                <h4 className="font-ui text-2xl mb-4 text-black">Connect</h4>
                <ul className="space-y-3">
                    <li>
                        <a href="mailto:hello@var.agency" className="font-ui text-lg footer-link">hello@var.agency</a>
                    </li>
                    {/* Social Links */}
                    <li className="flex items-center space-x-5 mt-4 justify-center md:justify-start">
                        <a href="#" className="social-icon">
                            <XIcon className="w-6 h-6"/>
                        </a>
                        <a href="#" className="social-icon">
                            <LinkedInIcon className="w-6 h-6"/>
                        </a>
                    </li>
                </ul>
            </div>
            
            {/* Legal Column */}
            <div>
                <h4 className="font-ui text-2xl mb-4 text-black">Legal</h4>
                <ul className="space-y-3">
                    <li><a href="#" className="font-ui text-lg footer-link">Privacy Policy</a></li>
                    <li><a href="#" className="font-ui text-lg footer-link">Terms of Service</a></li>
                </ul>
            </div>

        </div>
        
        {/* Copyright */}
        <div className="text-center font-ui text-base text-[--text-primary] opacity-80 mt-16 pt-8 border-t border-solid border-[--text-primary]/30">
            © {new Date().getFullYear()} VAR Agency. All Rights Reserved.
        </div>
    </div>
</footer>

      </main>
    </>
  );
}



