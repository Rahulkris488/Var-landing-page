import React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import Lenis from 'lenis';
// NOTE: GSAP and its plugins are loaded via <script> tags in your main HTML file.
// Lenis for smooth scrolling should be loaded the same way.
// This is a reliable method for this setup and avoids potential bundling issues.

const GlobalStyles = () => (
 <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=VT323&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap');
    :root {
      --bg-primary: #F7F5F0;
      --text-primary: #1A1A1A; 
      --accent-lime: #D4FF00;
      --accent-magenta: #FF00DD;
      --accent-cyan: #00E0FF;
      --accent-orange: #FF7A00;
    }
    html { scroll-behavior: initial !important; /* Important for Lenis */ }
    body {
      background-color: var(--bg-primary);
      color: var(--text-primary);
      overflow-x: hidden;
    }
    .font-headline {
        font-family: 'Anton', sans-serif;
        text-transform: uppercase;
        -webkit-text-stroke: 1px var(--text-primary);
        text-stroke: 1px var(--text-primary);
        color: var(--text-primary); /* FIX: Was 'transparent' */
    }
    .font-ui { font-family: 'VT323', monospace; }
    .font-signature {
      font-family: 'Caveat', cursive;
    }
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

    /* --- PROBLEM SECTION (COMIC BOOK) STYLES --- */
    #problem {
        overflow: hidden;
    }
    .problem-panels-container {
        width: 300%; /* 100vw * 3 panels */
        will-change: transform;
    }
    .problem-panel {
        width: 100vw;
        height: 100vh;
        max-height: 800px; /* Cap height on large screens */
    }
    .comic-panel-card {
        border: 3px solid var(--text-primary);
        box-shadow: 10px 10px 0 var(--accent-cyan);
        transform: rotate(-1deg);
        height: 100%;
    }
    .comic-panel-card svg {
        filter: drop-shadow(5px 5px 0px rgba(0,0,0,0.1));
    }


    /* --- PROOF CARD STYLES --- */
    .proof-card {
      background-image: radial-gradient(var(--text-primary) 0.5px, transparent 0);
      background-size: 6px 6px;
      background-position: 0 0;
      position: relative;
      transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
      overflow: hidden;
      align-self: stretch;
    }
    .proof-card > * {
        position: relative;
        z-index: 2;
    }
    .proof-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: radial-gradient(circle at 50% 50%, var(--accent-lime), var(--accent-magenta));
      opacity: 0;
      transition: opacity 0.4s ease-in-out;
      mix-blend-mode: soft-light;
      z-index: 1;
    }
    .proof-container.hover-magenta .proof-card::before {
      background-image: radial-gradient(circle, var(--accent-magenta) 0%, var(--accent-lime) 100%);
    }
    .proof-container.hover-lime .proof-card::before {
      background-image: radial-gradient(circle, var(--accent-lime) 0%, var(--accent-magenta) 100%);
    }
    .proof-card svg {
        transition: transform 0.3s ease-out;
    }
    .proof-container:hover .proof-card svg {
        transform: scale(1.1);
    }
    .proof-container:hover .proof-card::before {
      opacity: 0.25;
    }
    .proof-container.tilt-left:hover .proof-card {
      transform: translateY(-8px) rotate(-1.5deg);
    }
    .proof-container.tilt-right:hover .proof-card {
      transform: translateY(-8px) rotate(1.5deg);
    }
    .proof-container.hover-magenta:hover .proof-card {
      box-shadow: 12px 12px 0px var(--accent-magenta);
    }
    .proof-container.hover-lime:hover .proof-card {
      box-shadow: 12px 12px 0px var(--accent-lime);
    }
    
    /* --- INTERACTIVE BOOK STYLES --- */
    .solution-left {
        perspective: 2000px;
    }
    .book-container {
        position: relative;
        width: 100%;
        max-width: 380px;
        height: 450px;
        margin: 0 auto;
        transform-style: preserve-3d;
        transform: scale(0.8);
    }
    @media (min-width: 640px) {
      .book-container { transform: scale(0.9); }
    }
    @media (min-width: 1024px) {
      .book-container { transform: scale(1); }
    }
    .book-cover, .book-page {
        position: absolute;
        inset: 0;
        transform-origin: left center;
        transition: transform 1.2s ease-in-out;
        transform-style: preserve-3d;
        box-shadow: 2px 0 5px rgba(0,0,0,0.1);
    }
    .book-page.is-turned {
        box-shadow: -2px 0 5px rgba(0,0,0,0.15);
    }
    .book-face {
        position: absolute;
        inset: 0;
        backface-visibility: hidden;
    }
    .book-cover {
        cursor: pointer;
        box-shadow: 3px 0 8px rgba(0,0,0,0.2);
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
        background-color: #333;
        transform: rotateY(180deg);
    }
    .book-cover.is-open {
        transform: rotateY(-180deg);
    }
    .book-page {
        inset: 6px 6px 6px 3px;
    }
    .book-page .book-face--front {
        border: 2px solid var(--text-primary);
        background-color: var(--bg-primary);
    }
    .book-page .book-face--back {
        border: 2px solid var(--text-primary);
        background-color: #F0EDE5;
        transform: rotateY(180deg);
        background-image: linear-gradient(to left, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 15%);
    }
    .book-page.is-turned { transform: rotateY(-180deg); }
    .book-page.is-active { transform: rotateY(0deg); }
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
    .book-page:hover .page-tab { background-color: var(--accent-lime) !important; }
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

    /* --- FOOTER LINK STYLES --- */
    .footer-link {
      position: relative;
      transition: color 0.3s ease;
    }
    .footer-link:hover { color: var(--accent-magenta); }
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
      color: var(--text-primary);
    }
    .social-icon:hover {
      transform: translateY(-3px) scale(1.1);
      color: var(--accent-magenta);
    }
  `}</style>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl p-3 z-50 bg-white/20 backdrop-blur-lg rounded-xl border border-white/30 shadow-lg font-ui">
      <div className="container mx-auto flex justify-between items-center relative">
        <a href="#hero" className="font-headline text-2xl sm:text-3xl" style={{WebkitTextStroke: '0px'}}>VAR</a>
        <div className="hidden md:flex items-center space-x-4 lg:space-x-8 text-base sm:text-lg">
          <a href="#hero" className="nav-link">Home</a>
          <a href="#about-us" className="nav-link">About</a>
          <a href="#solution" className="nav-link">Services</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#closing" className="nav-link">Contact</a>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu" className="relative z-10">
            {isMenuOpen ? (
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            ) : (
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            )}
          </button>
        </div>
        <div className={`absolute top-0 left-0 w-full bg-white/95 backdrop-blur-md mt-0 rounded-lg border border-white/30 p-4 md:hidden transition-transform duration-300 ease-in-out ${isMenuOpen ? 'transform translate-y-0' : 'transform -translate-y-[150%]'}`}>
          <nav className="flex flex-col items-center space-y-4 mt-16">
            <a href="#hero" className="block text-center text-xl py-2 nav-link" onClick={toggleMenu}>Home</a>
            <a href="#about-us" className="block text-center text-xl py-2 nav-link" onClick={toggleMenu}>About</a>
            <a href="#solution" className="block text-center text-xl py-2 nav-link" onClick={toggleMenu}>Services</a>
            <a href="#pricing" className="block text-center text-xl py-2 nav-link" onClick={toggleMenu}>Pricing</a>
            <a href="#closing" className="block text-center text-xl py-2 nav-link" onClick={toggleMenu}>Contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
};


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
            <path d="M45,95 C 20,80 25,50 45,60" />
            <path d="M45,60 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0" fill="var(--bg-primary)"/>
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

// --- NEW SVGS FOR PROBLEM SECTION ---
const OutdatedWebsiteSVG = ({className}) => (
    <svg className={className} viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="160" height="110" rx="8" stroke="var(--text-primary)" strokeWidth="4" fill="var(--bg-primary)"/>
        <path d="M20 45H180" stroke="var(--text-primary)" strokeWidth="4"/>
        <circle cx="35" cy="32.5" r="4" fill="var(--text-primary)"/>
        <circle cx="50" cy="32.5" r="4" fill="var(--text-primary)"/>
        <path d="M70 65H130" stroke="var(--text-primary)" strokeWidth="3" strokeLinecap="round"/>
        <rect x="40" y="80" width="50" height="30" fill="#E0E0E0" stroke="var(--text-primary)" strokeWidth="2"/>
        <path d="M45 85 L 55 95 M 55 85 L 45 95" stroke="var(--text-primary)" strokeWidth="2"/>
        <path d="M100 85H140" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round"/>
        <path d="M100 95H130" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round"/>
        <path d="M100 105H140" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round"/>
        <g className="cobwebs">
            <path d="M178 22L160 40" stroke="var(--text-primary)" strokeWidth="1.5"/>
            <path d="M178 22C170 25 165 32 160 40" stroke="var(--text-primary)" strokeWidth="1" fill="none"/>
            <path d="M178 22C174 29 168 36 160 40" stroke="var(--text-primary)" strokeWidth="1" fill="none"/>
        </g>
        <g className="glitch-line">
            <path d="M30 90 H 170" stroke="var(--accent-magenta)" strokeWidth="2"/>
        </g>
    </svg>
);

const SlowAppSVG = ({className}) => (
    <svg className={className} viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 20 L120 50 L100 80 L80 50 Z" stroke="var(--text-primary)" strokeWidth="4" fill="var(--bg-primary)"/>
        <circle cx="100" cy="50" r="5" fill="var(--text-primary)"/>
        <g className="loading-spinner" transform="translate(100, 50)">
            <circle cx="0" cy="0" r="20" stroke="var(--accent-cyan)" strokeWidth="3" strokeDasharray="80 20" strokeLinecap="round"/>
        </g>
        <path d="M100 80 V 130" stroke="var(--text-primary)" strokeWidth="3" strokeDasharray="5 5"/>
        <g className="snail">
            <path d="M80 130 C 60 130 60 110 80 110 C 100 110 100 130 120 130 Z" stroke="var(--text-primary)" strokeWidth="3" fill="var(--accent-orange)"/>
            <path d="M75 110 C 70 100 85 100 80 110" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round"/>
        </g>
    </svg>
);

const ConfusingDesignSVG = ({className}) => (
    <svg className={className} viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 30 L150 30 L180 80 L20 80 Z" stroke="var(--text-primary)" strokeWidth="4" fill="var(--bg-primary)"/>
        <path d="M80 80 L120 120 L100 80" stroke="var(--text-primary)" strokeWidth="4" fill="var(--bg-primary)"/>
        <path d="M40 100 L70 90 L60 120 Z" stroke="var(--text-primary)" strokeWidth="4" fill="var(--bg-primary)"/>
        <path className="arrow-1" d="M30 40 C 80 10, 120 50, 90 70" stroke="var(--accent-magenta)" strokeWidth="3" strokeDasharray="4 4" fill="none"/>
        <path className="arrow-2" d="M170 50 C 100 130, 80 60, 140 100" stroke="var(--accent-lime)" strokeWidth="3" strokeDasharray="4 4" fill="none"/>
        <path className="arrow-3" d="M60 110 C 10 90, 180 90, 140 120" stroke="var(--accent-cyan)" strokeWidth="3" strokeDasharray="4 4" fill="none"/>
        <g className="question-mark">
            <path d="M100 50 C 100 40, 110 40, 110 50 C 110 60, 100 60, 100 65 V 70" stroke="var(--text-primary)" strokeWidth="4" strokeLinecap="round"/>
            <circle cx="100" cy="75" r="3" fill="var(--text-primary)"/>
        </g>
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
    const interactionTimer = React.useRef(null);
    const animationSequenceTimer = React.useRef(null);
    const currentAnimationId = React.useRef(null);

    const cleanupTimers = () => {
        clearTimeout(interactionTimer.current);
        clearTimeout(animationSequenceTimer.current);
    };

    const animatePages = (targetIndex) => {
        const animationId = Date.now();
        currentAnimationId.current = animationId;
        const pageTurnDelay = 200;

        const step = () => {
            if (currentAnimationId.current !== animationId) return;

            setActivePageIndex(prevIndex => {
                const currentIndex = prevIndex;
                if (targetIndex > currentIndex) {
                    const nextIndex = currentIndex + 1;
                    if (nextIndex <= targetIndex) {
                        animationSequenceTimer.current = setTimeout(step, pageTurnDelay);
                        return nextIndex;
                    }
                } else if (targetIndex < currentIndex) {
                    const nextIndex = currentIndex - 1;
                    if (nextIndex >= targetIndex) {
                        animationSequenceTimer.current = setTimeout(step, pageTurnDelay);
                        return nextIndex;
                    }
                }
                return currentIndex;
            });
        };
        step();
    };

    const handleMouseEnterTab = (targetIndex) => {
        cleanupTimers();
        if (targetIndex === activePageIndex) return;
        interactionTimer.current = setTimeout(() => animatePages(targetIndex), 150);
    };

    const handleMouseLeaveBook = () => {
        cleanupTimers();
        interactionTimer.current = setTimeout(() => animatePages(-1), 200);
    };

    const handleMouseEnterBook = () => cleanupTimers();
    
    React.useEffect(() => () => cleanupTimers(), []);

    const getPageStyle = (index) => {
        const isTurned = activePageIndex > -1 && index < activePageIndex;
        const isActive = index === activePageIndex;
        let zIndex;
        if (isActive) zIndex = 50; 
        else if (isTurned) zIndex = index + 2; 
        else zIndex = services.length - index + 1;
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
                     <h3 className="font-headline text-4xl" style={{color: 'var(--bg-primary)', WebkitTextStroke: '0px'}}>The Four-Step Symphony of Ours</h3>
                </div>
                <div className="book-face book-face--back"></div>
            </div>
            <div className="book-pages">
                {services.map((service, index) => {
                    const isTurned = activePageIndex > -1 && index < activePageIndex;
                    const isActive = index === activePageIndex;
                    const pageClasses = `book-page ${isTurned ? 'is-turned' : ''} ${isActive ? 'is-active' : ''}`;
                    
                    return (
                        <div key={index} className={pageClasses} style={getPageStyle(index)}>
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
                                    <h3 className="font-headline text-3xl" style={{color: 'var(--text-primary)', WebkitTextStroke: '0px'}}>{service.headline}</h3>
                                    <p className="page-description font-ui px-4">{service.description}</p>
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

const AboutUs = () => {
    const GmailIcon = ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z"></path></svg>
    );

    const LinkedInIcon = ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
    );
    
    const teamMembers = [
        {
            name: "Rahul",
            title: "Co-Founder & Lead Developer",
            bio: "The architectural mind behind our robust digital solutions. Rahul turns complex challenges into elegant, high-performance applications.",
            imgSrc: "https://res.cloudinary.com/dstrhh3zd/image/upload/v1718560436/rahul_seyrfp.webp",
            linkedin: "https://www.linkedin.com/in/rahul-krishna-tp",
            gmail: "mailto:rahulkrishnatp12@gmail.com",
            bgColor: "bg-lime-200"
        },
        {
            name: "Vivek",
            title: "Co-Founder & Creative Director",
            bio: "The visionary force behind our creative strategies, Vivek blends artistry with analytics to craft compelling brand narratives that resonate and inspire.",
            imgSrc: "https://res.cloudinary.com/dstrhh3zd/image/upload/v1718560437/vivek_k5p2il.webp",
            linkedin: "https://www.linkedin.com/in/vivek-sathish-poojary",
            gmail: "mailto:viveksathishpoojary@gmail.com",
            bgColor: "bg-fuchsia-200"
        }
    ];

    return (
        <section id="about-us" className="py-20 md:py-32 px-4 sm:px-6 md:px-8">
            <div className="max-w-5xl sd mx-auto text-center">
                <h2 className="font-headline text-5xl md:text-7xl mb-16 about-us-headline">Meet The Founders</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
                    {teamMembers.map((member) => (
                        <div key={member.name} className={`founder-card relative overflow-hidden p-6 flex flex-col items-center text-left space-y-4 border-2 border-black rounded-xl ${member.bgColor} shadow-lg`}>
                           <div className="flex items-start w-full space-x-4">
                                <img src={member.imgSrc} alt={`Portrait of ${member.name}`} className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg border-2 border-black object-cover"/>
                                <div className="flex-1">
                                   <h3 className="font-signature text-5xl sm:text-6xl">{member.name}</h3>
                                   <p className="font-ui text-lg text-black/80">{member.title}</p>
                                </div>
                           </div>
                           <p className="text-base leading-relaxed self-start">{member.bio}</p>
                           <div className="flex space-x-6 pt-4 self-start">
                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon text-2xl"><LinkedInIcon className="w-8 h-8"/></a>
                                <a href={member.gmail} className="social-icon text-2xl"><GmailIcon className="w-8 h-8"/></a>
                           </div>
                           <svg className="absolute -bottom-10 -right-10 w-40 h-40 text-black/10 decorative-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                        </div>
                    ))}
                </div>
            </div>
        </section>
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

React.useEffect(() => {
    // --- SMOOTH SCROLL SETUP ---
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@studio-freight/lenis@1.0.42/dist/lenis.min.js';
    script.async = true;

    script.onload = () => {
        if (window.Lenis) {
            const lenis = new window.Lenis();
            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
        }
    };
    document.body.appendChild(script);

    return () => {
        const existingScript = document.querySelector(`script[src="${script.src}"]`);
        if (existingScript) {
            document.body.removeChild(existingScript);
        }
    };
}, []);

React.useLayoutEffect(() => {
    // --- GSAP SETUP ---
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    const TextPlugin = window.TextPlugin;

    if (!gsap || !ScrollTrigger || !TextPlugin) {
        console.error("GSAP or its plugins are not loaded.");
        return;
    }

    gsap.registerPlugin(ScrollTrigger, TextPlugin);
    
    const ctx = gsap.context(() => {
        gsap.from("header", { y: -100, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.5 });
        
        const heroLines = mainRef.current.querySelectorAll(".headline-line");
        heroLines.forEach(line => {
            const text = line.textContent.trim();
            line.innerHTML = '';
            text.split('').forEach(char => {
                const span = document.createElement('span');
                span.className = 'split-text-char';
                span.innerHTML = char === ' ' ? '&nbsp;' : char;
                span.style.display = 'inline-block';
                line.appendChild(span);
            });
        });
        
        const allChars = mainRef.current.querySelectorAll('.headline-line .split-text-char');
        gsap.from(allChars, {
            opacity: 0, y: 50, rotateX: -90, stagger: 0.02,
            duration: 1, ease: 'power3.out', delay: 1,
        });
        
        gsap.from(".hero-subtext", { y: '100%', opacity: 0, duration: 1, ease: 'power3.out', delay: 1.5 });
        gsap.from(".hero-cta", { opacity: 0, scale: 0.8, duration: 1, ease: 'elastic.out(1, 0.75)', delay: 2 });
        gsap.from(".hero-sticker", { scale: 0, opacity: 0, stagger: 0.1, duration: 0.5, ease: "back.out(1.7)", delay: 2 });
        
        gsap.to(".bot-waving-arm", { rotation: 25, transformOrigin: 'bottom right', repeat: -1, yoyo: true, duration: 0.8, ease: 'power1.inOut' });
        gsap.to(".bot-eye", { scaleY: 0.1, transformOrigin: 'center center', repeat: -1, yoyo: true, repeatDelay: 3, duration: 0.1 });

        // --- HERO STICKERS PARALLAX ---
        gsap.to(".hero-sticker", {
            y: (i, target) => ScrollTrigger.maxScroll(window) * (parseFloat(target.dataset.speed) || 0.1 * (i + 1)),
            ease: "none",
            scrollTrigger: {
                start: "top top",
                end: "bottom top",
                scrub: 1.5
            }
        });

        // --- PROBLEM SECTION ANIMATION ---
        const panels = gsap.utils.toArray(".problem-panel");
        gsap.to(panels, {
            xPercent: -100 * (panels.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: "#problem",
                pin: true,
                scrub: 1,
                snap: 1 / (panels.length - 1),
                end: () => "+=" + (mainRef.current.querySelector(".problem-panels-container").offsetWidth - window.innerWidth)
            }
        });
        
        gsap.from(".comic-panel-card", {
           scrollTrigger: {
               trigger: "#problem",
               start: "top 80%",
               toggleActions: "play none none reverse",
           },
           opacity: 0,
           y: 100,
           duration: 1,
           ease: 'power3.out'
        });

        const philosophyLines = mainRef.current.querySelectorAll(".philosophy-line");
        philosophyLines.forEach(line => {
             const text = line.textContent.trim();
             line.innerHTML = text.split('').map(char => `<span class="split-text-char" style="display:inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
        });
        gsap.from(".philosophy-line .split-text-char", {
          scrollTrigger: { trigger: "#philosophy", start: "top 70%" }, 
          opacity: 0, y: 20, stagger: { amount: 0.5, from: "random" }, duration: 0.8, ease: 'power2.out'
        });
        
       gsap.to(".underline-mask", { 
         width: 200, 
         ease: "none",
         scrollTrigger: { 
             trigger: ".philosophy-punchline", 
             start: "top center", 
             end: "bottom center", 
             scrub: 1 
         }, 
     });

        gsap.from([".solution-left", ".solution-right"], {
          scrollTrigger: { trigger: "#solution", start: "top 70%", toggleActions: "play none none reverse" },
          opacity: 0, y: 60, duration: 1.2, ease: "power3.out", stagger: 0.2
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
        
        // --- PROOF SECTION TEXT ANIMATION ---
        gsap.utils.toArray(".proof-container").forEach(container => {
            gsap.from(container.querySelectorAll(".space-y-4 > *"), {
                scrollTrigger: {
                    trigger: container,
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                },
                opacity: 0,
                x: -30,
                stagger: 0.15,
                duration: 0.8,
                ease: 'power2.out'
            });
        });

        gsap.from(".pricing-card", {
            scrollTrigger: { trigger: "#pricing", start: "top 70%", toggleActions: "play none none reverse" },
            opacity: 0, filter: 'blur(10px)', stagger: 0.2, duration: 1, ease: 'power2.out'
        });

        // --- PRICING STICKER & BUTTON ANIMATIONS ---
        gsap.from(".best-value-sticker", {
            scrollTrigger: { trigger: ".best-value-sticker", start: "top 80%", toggleActions: "play none none reverse" },
            scale: 0, rotation: -45, opacity: 0, duration: 1, ease: "elastic.out(1, 0.5)"
        });
        gsap.from("#pricing .press-effect", {
            scrollTrigger: { trigger: "#pricing .press-effect", start: "top 90%", toggleActions: "play none none reverse" },
            opacity: 0, y: 50, duration: 0.8, ease: 'power3.out'
        });
        
        const closingLines = mainRef.current.querySelectorAll(".closing-headline");
        closingLines.forEach(line => {
             const text = line.textContent.trim();
             line.innerHTML = text.split('').map(char => `<span class="split-text-char" style="display:inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
        });
        gsap.from(".closing-headline .split-text-char", {
            opacity: 0, scaleY: 0, y: -50, transformOrigin: "top", stagger: 0.03,
            duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: "#closing", start: "top 60%" }
        });

        // --- CLOSING BUTTON ANIMATION ---
        gsap.from("#closing .press-effect", {
            scrollTrigger: { trigger: "#closing .press-effect", start: "top 90%", toggleActions: "play none none reverse" },
            opacity: 0, scale: 0.8, duration: 1, ease: 'elastic.out(1, 0.75)'
        });
        
        gsap.to(".deco-grid", {
            y: "-200px",
            scrollTrigger: { trigger: "#solution", start: "top bottom", end: "bottom top", scrub: 1.5 }
        });
        
        gsap.from(".about-us-headline", {
            scrollTrigger: { trigger: "#about-us", start: "top 80%" },
            opacity: 0, y: 50, duration: 1, ease: 'power3.out'
        });

        gsap.from(".founder-card", {
            scrollTrigger: { trigger: ".founder-card", start: "top 85%", stagger: 0.3 },
            opacity: 0, y: 50, scale: 0.95, duration: 0.8, ease: 'power3.out'
        });

        gsap.from(".founder-card .decorative-svg", {
            scrollTrigger: { trigger: ".founder-card", start: "top 85%" },
            opacity: 0, scale: 0.5, rotation: -45, duration: 1, ease: 'elastic.out(1, 0.75)', delay: 0.5
        });

        // --- FOOTER ANIMATIONS ---
        gsap.from("#footer .grid > div", {
            scrollTrigger: { trigger: "#footer", start: "top 85%", toggleActions: "play none none reverse" },
            opacity: 0, y: 40, duration: 0.8, stagger: 0.2, ease: "power2.out"
        });
        gsap.from("#footer .border-t", {
             scrollTrigger: { trigger: "#footer", start: "top 70%", toggleActions: "play none none reverse" },
            opacity: 0, y: 20, duration: 1, ease: "power2.out"
        });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <GlobalStyles />
      <Navbar />
      <div className="paper-texture"></div>
      <main ref={mainRef} className="bg-[--bg-primary] text-[--text-primary] selection:bg-[--accent-lime] selection:text-[--text-primary]">
        
<section id="hero" className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden">
    <div className="absolute inset-0 halftone-bg opacity-30"></div>
    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl mx-auto mt-16 lg:mt-0">
        <div className="relative z-10 space-y-6 text-center lg:text-left">
            <div className="hero-card window-card p-6 md:p-8 mt-16">
            
<h1 className="hero-headline font-headline text-4xl sm:text-5xl lg:text-6xl leading-tight ">
    <span className="block headline-line">Every business</span>
    <span className="block headline-line">deserves a digital</span>
    <span className="block headline-line">presence that</span>
    <span className="block headline-line">performs, scales,</span>
    <span className="block headline-line">and inspires.</span>
</h1>
            </div>
            <div className="hero-card window-card p-4 md:p-6 lg:ml-12 overflow-hidden">
                <p className="hero-subtext text-lg md:text-xl font-ui">
                    At VAR, we don’t just build websites. We craft digital experiences.
                </p>
            </div>
            <div className="hero-cta inline-block lg:ml-24">
                <a href="#closing" className="press-effect btn-lime font-ui text-xl md:text-2xl p-4 md:px-8 md:py-5 inline-block">
                    <span className="btn-arrow-icon mr-2">→</span> Start the Journey
                </a>
            </div>
        </div>
        <div className="relative h-full row-start-1 lg:col-start-2 flex items-center justify-center">
            <VarBotWaving className="var-bot-hero w-[250px] h-[333px] sm:w-[300px] sm:h-[400px] z-20 drop-shadow-lg"/>
        </div>
    </div>
    <div data-speed="0.1" className="hero-sticker absolute top-[15%] left-[5%] sm:left-[10%] w-16 h-16 bg-[--accent-magenta] rotate-[-15deg]"></div>
    <svg data-speed="-0.15" className="hero-sticker absolute bottom-[20%] right-[5%] w-20 h-20 rotate-[25deg]" viewBox="0 0 100 100">
        <path d="M50 0L61 39L100 39L69 62L80 100L50 75L20 100L31 62L0 39L39 39Z" fill="var(--accent-lime)"/>
    </svg>
    <div data-speed="0.25" className="hero-sticker absolute top-[25%] right-[10%] sm:right-[15%] w-12 h-12 bg-[--accent-lime] rounded-full"></div>
</section>

        <section id="problem">
            <div className="problem-panels-container flex">
                <div className="problem-panel flex justify-center items-center p-4 sm:p-8">
                    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center comic-panel-card p-8 bg-orange-100">
                         <OutdatedWebsiteSVG className="w-full h-auto max-w-sm mx-auto" />
                         <div className="text-center md:text-left space-y-4">
                            <h3 className="font-headline text-4xl lg:text-5xl">Outdated Sites Lose Trust</h3>
                            <p className="font-ui text-lg lg:text-xl">An old, glitchy website feels like a neglected storefront. It pushes potential customers away before you can even say "hello."</p>
                         </div>
                    </div>
                </div>
                 <div className="problem-panel flex justify-center items-center p-4 sm:p-8">
                     <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center comic-panel-card p-8 bg-cyan-100" style={{transform: 'rotate(1deg)', boxShadow: '10px 10px 0 var(--accent-orange)'}}>
                          <div className="text-center md:text-left space-y-4 order-last md:order-first">
                             <h3 className="font-headline text-4xl lg:text-5xl">Slow Apps Lose Customers</h3>
                             <p className="font-ui text-lg lg:text-xl">Every second counts. A slow-loading app is a closed app. Performance isn't a feature; it's a foundation.</p>
                          </div>
                          <SlowAppSVG className="w-full h-auto max-w-sm mx-auto" />
                     </div>
                 </div>
                 <div className="problem-panel flex justify-center items-center p-4 sm:p-8">
                      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center comic-panel-card p-8 bg-fuchsia-100" style={{transform: 'rotate(-0.5deg)', boxShadow: '10px 10px 0 var(--accent-magenta)'}}>
                         <ConfusingDesignSVG className="w-full h-auto max-w-sm mx-auto" />
                          <div className="text-center md:text-left space-y-4">
                             <h3 className="font-headline text-4xl lg:text-5xl">Bad Design Loses Money</h3>
                             <p className="font-ui text-lg lg:text-xl">A confusing layout is a dead end. If users can't find what they need, they'll find a competitor who makes it easy for them.</p>
                          </div>
                     </div>
                 </div>
            </div>
        </section>

        <section id="philosophy" className="py-20 md:py-32 px-4 sm:px-6 md:px-8 text-center">
             <div className="max-w-5xl mx-auto space-y-12">
                <p className="philosophy-line text-xl md:text-2xl lg:text-3xl leading-relaxed font-ui">
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
        
        <AboutUs />

        <section id="solution" className="relative py-20 md:py-32 px-4 sm:px-6 md:px-8 overflow-hidden">
            <GridPattern className="absolute top-1/4 -left-20 opacity-20 deco-grid" />
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                
                <div className="solution-left flex items-center justify-center lg:min-h-[450px]">
                    <BookComponent />
                </div>

                <div className="solution-right space-y-6 text-center lg:text-left">
                     <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl">A Four-Step Symphony of Creation</h2>
                     <p className="text-lg md:text-xl lg:text-2xl leading-relaxed font-ui">
                         We transform your vision into a digital masterpiece. Our process is a fusion of creative strategy and technical precision, ensuring every pixel and line of code serves a purpose. It's a true&nbsp;
                         <span className="relative inline-block font-headline" style={{color: 'var(--accent-magenta)', WebkitTextStroke: '0px'}}>
                             synergy
                             <ExcellenceUnderline className="solution-underline absolute -bottom-1 md:-bottom-2 left-0 w-full h-auto" style={{"--accent-lime": "var(--accent-magenta)"}}/>
                         </span>
                         &nbsp;between your goals and our expertise, resulting in a product that's not just built, but thoughtfully engineered for success.
                     </p>
                </div>

            </div>
        </section>
        
<section id="proof" className="py-20 md:py-32 px-4 sm:px-6 md:px-8">
    <div className="max-w-7xl mx-auto">
        <h2 className="font-headline text-5xl md:text-7xl text-center mb-16">
            Proof in Every Pixel
        </h2>

        <div className="proof-container group hover-magenta tilt-left grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12 mb-20">
            <div className="proof-card window-card flex flex-col">
                <div className="window-header"><h3 className="font-ui window-title">01. Fast & Scalable</h3><WindowControls/></div>
                <div className="p-6 md:p-8 flex-grow flex justify-center items-center h-48 md:h-auto">
                    <RocketSVG className="w-32 h-32 md:w-40 md:h-40 text-gray-800" />
                </div>
            </div>
            <div className="space-y-4 text-center md:text-left">
                <h3 className="font-headline text-4xl" style={{color: 'var(--accent-magenta)'}}>Blazing Performance</h3>
                <p className="text-lg leading-relaxed font-ui">
                    Ever waited for a website to load forever? Not on our watch. We engineer every solution for lightning-fast delivery and seamless scalability.
                </p>
                <p className="text-base text-gray-600 font-ui">
                    Stack: React, Next.js, Cloudflare.
                </p>
            </div>
        </div>

        <div className="proof-container group hover-lime tilt-right grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12 mb-20">
            <div className="space-y-4 text-center md:text-left order-last md:order-first">
                <h3 className="font-headline text-4xl" style={{color: 'var(--accent-lime)'}}>Fort Knox Security</h3>
                <p className="text-lg leading-relaxed font-ui">
                    Your data and your users' trust are paramount. Our "secure by design" philosophy means security is baked into every layer of your application.
                </p>
                <p className="text-base text-gray-600 font-ui">
                    Audits, robust authentication, and encryption.
                </p>
            </div>
            <div className="proof-card window-card flex flex-col">
                <div className="window-header"><h3 className="font-ui window-title">02. Secure by Design</h3><WindowControls/></div>
                <div className="p-6 md:p-8 flex-grow flex justify-center items-center h-48 md:h-auto">
                    <LockSVG className="w-32 h-32 md:w-40 md:h-40 text-gray-800" />
                </div>
            </div>
        </div>

        <div className="proof-container group hover-magenta tilt-left grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12 mb-20">
            <div className="proof-card window-card flex flex-col">
                <div className="window-header"><h3 className="font-ui window-title">03. Modern UI/UX</h3><WindowControls/></div>
                <div className="p-6 md:p-8 flex-grow flex justify-center items-center h-48 md:h-auto">
                    <WandSVG className="w-32 h-32 md:w-40 md:h-40 text-gray-800" />
                </div>
            </div>
            <div className="space-y-4 text-center md:text-left">
                <h3 className="font-headline text-4xl" style={{color: 'var(--accent-magenta)'}}>Intuitive & Beautiful</h3>
                <p className="text-lg leading-relaxed font-ui">
                    Design isn't just about looks; it's about how it works. We craft interfaces that are a joy to use, intuitive to navigate, and stunning to behold.
                </p>
                <p className="text-base text-gray-600 font-ui">
                    User-centered, accessible, and modern.
                </p>
            </div>
        </div>

        <div className="proof-container group hover-lime tilt-right grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12">
             <div className="space-y-4 text-center md:text-left order-last md:order-first">
                <h3 className="font-headline text-4xl" style={{color: 'var(--accent-lime)'}}>On-Time. Every Time.</h3>
                <p className="text-lg leading-relaxed font-ui">
                    Deadlines aren't just suggestions; they're commitments. Our streamlined agile processes ensure your project is delivered on time, without fail.
                </p>
                <p className="text-base text-gray-600 font-ui">
                    Agile methodologies, clear communication.
                </p>
            </div>
            <div className="proof-card window-card flex flex-col">
                <div className="window-header"><h3 className="font-ui window-title">04. Delivered Before Time</h3><WindowControls/></div>
                <div className="p-6 md:p-8 flex-grow flex justify-center items-center h-48 md:h-auto">
                    <BoltSVG className="w-32 h-32 mb-20 md:w-40 md:h-40 text-gray-800" />
                </div>
            </div>
        </div>
    </div>
</section>

        <section id="pricing" className="py-20 md:py-32 px-4 sm:px-6 md:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-end">
                <div className="pricing-card window-card">
                    <div className="window-header"><h3 className="font-ui window-title text-sm sm:text-base">Your first step online.</h3><WindowControls/></div>
                    <div className="p-6 md:p-8 space-y-4">
                        <h4 className="font-headline text-3xl">Starter</h4>
                        <p className="text-base md:text-lg font-ui">Perfect for individuals and small projects getting off the ground.</p>
                    </div>
                </div>
                 <div className="pricing-card window-card relative md:col-span-2 lg:col-span-1">
                    <div className="best-value-sticker absolute -top-6 -right-6 font-headline text-lg bg-[--accent-magenta] text-[--text-primary] px-4 py-2 rotate-[10deg] border-2 border-black" style={{WebkitTextStroke: '0px'}}>BEST VALUE</div>
                    <div className="window-header"><h3 className="font-ui window-title text-sm sm:text-base">Built to grow with you.</h3><WindowControls/></div>
                    <div className="p-6 md:p-8 space-y-4">
                        <h4 className="font-headline text-4xl">Professional</h4>
                        <p className="text-base md:text-lg font-ui">The ideal package for growing businesses that need to make an impact.</p>
                    </div>
                </div>
                <div className="pricing-card window-card md:col-start-1 md:col-end-3 lg:col-auto">
                    <div className="window-header"><h3 className="font-ui window-title text-sm sm:text-base">Custom. Powerful. Limitless.</h3><WindowControls/></div>
                    <div className="p-6 md:p-8 space-y-4">
                        <h4 className="font-headline text-3xl">Enterprise</h4>
                        <p className="text-base md:text-lg font-ui">Fully custom solutions for established companies with unique needs.</p>
                    </div>
                </div>
            </div>
             <div className="text-center mt-16">
  <a href="#closing" className="press-effect btn-lime font-ui text-xl md:text-2xl p-4 px-8 inline-block">
    Request a Quote
  </a>
</div>

        </section>

            <section id="closing" className="min-h-screen bg-[--text-primary] text-[#D4FF00] flex flex-col justify-center items-center text-center p-4 md:p-8">
                <h2 className="closing-headline font-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-snug" style={{color: 'var(--bg-primary)', WebkitTextStroke: '0px'}}>Your vision Our code Together, we build the FUTURE.</h2>
                <div className="mt-12">
                    <a href="https://var-contact-us.vercel.app/" target="_blank" rel="noopener noreferrer" className="press-effect bg-[--accent-lime] text-[--text-primary] font-ui text-2xl sm:text-3xl p-4 sm:p-6 hover:bg-[--bg-primary] hover:text-[--accent-lime] inline-block">
                        <span className="btn-arrow-icon mr-2">→</span> Let’s Talk
                    </a>
                </div>
            </section>
        
        <footer id="footer" className="py-16 px-4 md:px-8">
    <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12">
             <a href="#hero" className="font-headline text-5xl" style={{WebkitTextStroke: '0px'}}>VAR</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-8 text-center md:text-left">
            
            <div>
                <h4 className="font-ui text-2xl mb-4 text-black">Navigate</h4>
                <ul className="space-y-3">
                    <li><a href="#hero" className="font-ui text-lg footer-link">Home</a></li>
                    <li><a href="#about-us" className="font-ui text-lg footer-link">About</a></li>
                    <li><a href="#solution" className="font-ui text-lg footer-link">Services</a></li>
                    <li><a href="#pricing" className="font-ui text-lg footer-link">Pricing</a></li>
                </ul>
            </div>
            
            <div>
                <h4 className="font-ui text-2xl mb-4 text-black">Connect</h4>
                <ul className="space-y-3">
                    <li>
                        <a href="mailto:hello@var.agency" className="font-ui text-lg footer-link">var.studio.agency@gmail.com</a>
                    </li>
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
            
            <div>
                <h4 className="font-ui text-2xl mb-4 text-black">Our Philosophy</h4>
                <p className="font-ui text-lg">We build digital experiences that are not just beautiful, but are blazingly fast, impeccably secure, and intuitively designed for your users.</p>
            </div>


        </div>
        
        <div className="text-center font-ui text-base text-[--text-primary] opacity-80 mt-16 pt-8 border-t border-solid border-[--text-primary]/30">
            © {new Date().getFullYear()} VAR Agency. All Rights Reserved.
        </div>
    </div>
</footer>

      </main>
    </>
  );
}

