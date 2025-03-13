// Confetti celebration effect
let confetti; // Declare confetti variable in global scope

class Confetti {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'confetti-container';
        this.container.style.position = 'fixed';
        this.container.style.top = '0';
        this.container.style.left = '0';
        this.container.style.width = '100%';
        this.container.style.height = '100%';
        this.container.style.pointerEvents = 'none'; // Don't block interactions
        this.container.style.zIndex = '9999';
        document.body.appendChild(this.container);
        
        // Confetti settings
        this.confettiCount = 150;
        this.confettiColors = ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', '#43aa8b', '#577590', '#277da1'];
        this.confettiShapes = ['circle', 'square', 'triangle'];
        this.confettiSize = { min: 5, max: 12 };
        this.confettiDuration = { min: 2000, max: 6000 }; // 2-6 seconds for more variation
        
        this.confettiElements = [];
    }
    
    // Create a single confetti element
    createConfettiElement() {
        const element = document.createElement('div');
        element.className = 'confetti';
        
        // Random properties
        const color = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)];
        const shape = this.confettiShapes[Math.floor(Math.random() * this.confettiShapes.length)];
        const size = Math.random() * (this.confettiSize.max - this.confettiSize.min) + this.confettiSize.min;
        
        // Set styles
        element.style.backgroundColor = color;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.position = 'absolute';
        element.style.willChange = 'transform, opacity'; // Optimize animations
        element.style.opacity = Math.random() * 0.5 + 0.5;
        
        // Set shape
        if (shape === 'circle') {
            element.style.borderRadius = '50%';
        } else if (shape === 'triangle') {
            element.style.width = '0';
            element.style.height = '0';
            element.style.backgroundColor = 'transparent';
            element.style.borderLeft = `${size/2}px solid transparent`;
            element.style.borderRight = `${size/2}px solid transparent`;
            element.style.borderBottom = `${size}px solid ${color}`;
        }
        
        // Random starting position - spread across the top of the screen
        const startX = Math.random() * window.innerWidth;
        element.style.top = '-20px';
        element.style.left = `${startX}px`;
        
        // Animation properties with more varied speeds
        const duration = Math.random() * (this.confettiDuration.max - this.confettiDuration.min) + this.confettiDuration.min;
        const delay = Math.random() * 500; // Stagger the start times
        
        // Physics properties - heavier pieces fall faster
        const weight = Math.random() * 0.6 + 0.4; // 0.4-1.0 weight factor
        const fallSpeed = (1 / weight) * 0.8; // Inverse relationship - lighter pieces fall slower
        
        // Random movement patterns
        const endX = startX + (Math.random() * 300 - 150); // More horizontal movement
        const endY = window.innerHeight + 20; // Just below the screen
        
        // Random rotation
        const startRotation = Math.random() * 360;
        const endRotation = startRotation + Math.random() * 720 * (Math.random() > 0.5 ? 1 : -1);
        
        // Random horizontal swings during fall with varying amplitudes
        const keyframes = [];
        const steps = 12; // More keyframes for smoother animation
        const swingFrequency = 1 + Math.random() * 2; // How many complete swings
        const swingAmplitude = 30 + Math.random() * 70; // How wide the swings are
        
        for (let i = 0; i <= steps; i++) {
            const progress = i / steps;
            
            // Non-linear fall - accelerate slightly to simulate gravity
            const gravityProgress = Math.pow(progress, 0.8 + (weight * 0.4)); // Heavier pieces accelerate faster
            const y = gravityProgress * endY * fallSpeed;
            
            // Linear horizontal movement + sine wave for swinging
            const x = startX + (endX - startX) * progress;
            const swingAmount = swingAmplitude * Math.sin(progress * Math.PI * swingFrequency);
            const currentX = x + swingAmount;
            
            // Calculate current rotation - non-linear to simulate air resistance
            const rotationProgress = Math.min(1, progress * 1.5); // Rotation happens more at the beginning
            const rotation = startRotation + (endRotation - startRotation) * rotationProgress;
            
            // Add keyframe
            keyframes.push({
                transform: `translate(${currentX}px, ${y}px) rotate(${rotation}deg)`,
                opacity: i === steps ? 0 : (1 - progress * 0.5) * element.style.opacity
            });
        }
        
        // Apply animation
        const animation = element.animate(keyframes, {
            duration: duration,
            delay: delay,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
            fill: 'forwards'
        });
        
        // Clean up the element when animation is done
        animation.onfinish = () => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
                const index = this.confettiElements.indexOf(element);
                if (index !== -1) {
                    this.confettiElements.splice(index, 1);
                }
            }
        };
        
        return element;
    }
    
    // Start the confetti celebration
    start() {
        // Clear any existing confetti
        this.stop();
        
        // Create new confetti elements
        for (let i = 0; i < this.confettiCount; i++) {
            const confettiElement = this.createConfettiElement();
            this.container.appendChild(confettiElement);
            this.confettiElements.push(confettiElement);
        }
    }
    
    // Stop and remove all confetti
    stop() {
        this.confettiElements.forEach(element => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        });
        this.confettiElements = [];
    }
}

// Function to trigger confetti celebration
function celebrateSuccess() {
    // Initialize confetti if it doesn't exist yet
    if (!confetti) {
        confetti = new Confetti();
    }
    confetti.start();
}

// Initialize confetti when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    confetti = new Confetti();
}); 