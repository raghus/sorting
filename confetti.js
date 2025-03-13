// Confetti celebration effect
class Confetti {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'confetti-container';
        document.body.appendChild(this.container);
        
        // Confetti settings
        this.confettiCount = 150;
        this.confettiColors = ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', '#43aa8b', '#577590', '#277da1'];
        this.confettiShapes = ['circle', 'square', 'triangle'];
        this.confettiSize = { min: 5, max: 12 };
        this.confettiSpeed = { min: 3, max: 8 };
        this.confettiDuration = 3000; // 3 seconds
        
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
        const speed = Math.random() * (this.confettiSpeed.max - this.confettiSpeed.min) + this.confettiSpeed.min;
        
        // Set styles
        element.style.backgroundColor = color;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.position = 'fixed';
        element.style.top = '-20px';
        element.style.zIndex = '1000';
        element.style.opacity = Math.random() * 0.5 + 0.5;
        element.style.transform = 'rotate(0deg)';
        
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
        
        // Random horizontal position
        element.style.left = `${Math.random() * 100}vw`;
        
        // Animation properties
        const animationDuration = Math.random() * 2 + 2; // 2-4 seconds
        const rotationDirection = Math.random() > 0.5 ? 1 : -1;
        const rotationAmount = Math.random() * 720 * rotationDirection;
        const horizontalSwing = (Math.random() * 40 - 20); // -20px to +20px
        
        // Apply animation
        element.animate([
            { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(100vh) translateX(${horizontalSwing}px) rotate(${rotationAmount}deg)`, opacity: 0 }
        ], {
            duration: this.confettiDuration,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
            fill: 'forwards'
        });
        
        return element;
    }
    
    // Start the confetti celebration
    start() {
        // Clear any existing confetti
        this.stop();
        
        // Create new confetti elements
        for (let i = 0; i < this.confettiCount; i++) {
            const confetti = this.createConfettiElement();
            this.container.appendChild(confetti);
            this.confettiElements.push(confetti);
        }
        
        // Remove confetti after duration
        setTimeout(() => this.stop(), this.confettiDuration + 100);
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

// Create a global confetti instance
const confetti = new Confetti();

// Function to trigger confetti celebration
function celebrateSuccess() {
    confetti.start();
} 