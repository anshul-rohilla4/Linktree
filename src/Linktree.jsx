import React, { useCallback, useMemo, useEffect, useState, useRef } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import "./index.css";
import profileImg from "./assets/profile.jpg";

const profile = {
    imageUrl: profileImg,
    name: "Anshul Rohilla",
    bio: "Exploring the intersection of technology and creative design. Welcome to my corner of the web!",
};

const links = [
    { label: "GitHub", url: "https://github.com/anshul-rohilla4" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/anshul-rohilla-5629a2210/" },
    { label: "Email Me", url: "mailto:anshulrohilla111@gmail.com" },
    { label: "My Portfolio", url: "https://anshulr.netlify.app/" },
];

const Linktree = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        console.log("Particles loaded", container);
    }, []);

    const options = useMemo(() => ({
        fpsLimit: 120,
        interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
            modes: { repulse: { distance: 100, duration: 0.4 } },
        },
        particles: {
            color: { value: "#475569" },
            links: { color: "#64748b", distance: 150, enable: true, opacity: 0.1, width: 1 },
            move: { enable: true, speed: 1, outModes: { default: "out" } },
            number: { density: { enable: true, area: 800 }, value: 50 },
            opacity: { value: 0.2 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
    }), []);

    // Real cursor position
    const [cursor, setCursor] = useState({ x: 0, y: 0 });

    // Ball position for trailing effect
    const ballRef = useRef({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);
    const ballDivRef = useRef();

    useEffect(() => {
        const moveCursor = (e) => setCursor({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, []);

    // Trailing animation using requestAnimationFrame
    useEffect(() => {
        let animationFrame;

        const animate = () => {
            // Linear interpolation for smooth trailing
            ballRef.current.x += (cursor.x - ballRef.current.x) * 0.15;
            ballRef.current.y += (cursor.y - ballRef.current.y) * 0.15;

            if (ballDivRef.current) {
                ballDivRef.current.style.transform = `translate(${ballRef.current.x}px, ${ballRef.current.y}px) translate(-50%, -50%)`;
            }

            animationFrame = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationFrame);
    }, [cursor]);

    return (
        <>
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={options}
                className="absolute top-0 left-0 w-full h-full z-0"
            />

            {/* Trailing cursor ball */}
            <div
                ref={ballDivRef}
                className={`custom-cursor ${hovered ? "hovered" : ""}`}
            ></div>

            <div className="min-h-screen w-full flex justify-center items-center p-4 relative z-10">
                <div className="main-component w-full max-w-md p-6 sm:p-8 flex flex-col items-center gap-6 liquid-glass z-10">
                    <div className="flex flex-col items-center gap-3 text-center">
                        <img
                            src={profile.imageUrl}
                            alt="Profile"
                            className="w-28 h-28 rounded-full border-2 border-white/80 shadow-lg animate-float"
                        />
                        <h1 className="text-slate-800 text-3xl font-bold animate-slide-up" style={{ animationDelay: '100ms' }}>
                            {profile.name}
                        </h1>
                        <p className="text-slate-600 animate-slide-up" style={{ animationDelay: '250ms' }}>
                            {profile.bio}
                        </p>
                    </div>

                    <div className="w-full flex flex-col gap-4 mt-4">
                        {links.map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="premium-button text-center font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 animate-slide-up"
                                style={{ animationDelay: `${400 + index * 150}ms` }}
                                onMouseEnter={() => setHovered(true)}
                                onMouseLeave={() => setHovered(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Linktree;
