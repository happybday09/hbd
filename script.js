// Utility functions
function random(min, max) {
    return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Create moving particles background
function createParticles() {
    const particlesContainer = document.getElementById('particles-bg');
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = random(0, 100) + '%';
        particle.style.top = random(0, 100) + '%';
        particle.style.width = random(3, 8) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = random(0, 6) + 's';
        particle.style.animationDuration = random(4, 8) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Create floating decorations
function createDecorations() {
    const decorationsContainer = document.getElementById('decorations');
    
    // Create balloons
    const balloonColors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd'];
    for (let i = 0; i < 8; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = random(0, 90) + '%';
        balloon.style.background = balloonColors[randomInt(0, balloonColors.length - 1)];
        balloon.style.animationDelay = random(0, 15) + 's';
        balloon.style.animationDuration = random(12, 18) + 's';
        decorationsContainer.appendChild(balloon);
    }
    
    // Create chocolates
    for (let i = 0; i < 6; i++) {
        const chocolate = document.createElement('div');
        chocolate.className = 'chocolate';
        chocolate.style.left = random(0, 90) + '%';
        chocolate.style.top = random(10, 80) + '%';
        chocolate.style.animationDelay = random(0, 12) + 's';
        decorationsContainer.appendChild(chocolate);
    }
    
    // Create confetti
    const confettiColors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43'];
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = random(0, 100) + '%';
        confetti.style.background = confettiColors[randomInt(0, confettiColors.length - 1)];
        confetti.style.animationDelay = random(0, 8) + 's';
        confetti.style.borderRadius = randomInt(0, 1) ? '50%' : '0%';
        decorationsContainer.appendChild(confetti);
    }
}

// Create fireworks
function createFirework(x, y) {
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd'];
    const particleCount = 12;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.background = colors[randomInt(0, colors.length - 1)];
        particle.style.boxShadow = `0 0 10px ${colors[randomInt(0, colors.length - 1)]}`;
        
        const angle = (i / particleCount) * Math.PI * 2;
        const velocity = random(50, 100);
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.style.setProperty('--vx', vx + 'px');
        particle.style.setProperty('--vy', vy + 'px');
        
        // Add custom animation for each particle
        particle.style.animation = `explode 1s ease-out forwards`;
        particle.style.transform = `translate(${vx}px, ${vy}px)`;
        
        document.getElementById('fireworks-container').appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
}

// Launch multiple fireworks
function launchFireworks() {
    const fireworksCount = 15;
    let fireworkIndex = 0;
    
    const fireworkInterval = setInterval(() => {
        const x = random(100, window.innerWidth - 100);
        const y = random(100, window.innerHeight - 200);
        createFirework(x, y);
        
        fireworkIndex++;
        if (fireworkIndex >= fireworksCount) {
            clearInterval(fireworkInterval);
        }
    }, 300);
}

// Create confetti burst
function createConfettiBurst() {
    const confettiContainer = document.getElementById('fireworks-container');
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        confetti.style.width = random(8, 15) + 'px';
        confetti.style.height = random(8, 15) + 'px';
        confetti.style.background = colors[randomInt(0, colors.length - 1)];
        confetti.style.borderRadius = randomInt(0, 1) ? '50%' : '0%';
        
        const angle = random(0, Math.PI * 2);
        const velocity = random(100, 300);
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        confetti.animate([
            { 
                transform: 'translate(-50%, -50%) rotate(0deg) scale(1)',
                opacity: 1 
            },
            { 
                transform: `translate(calc(-50% + ${vx}px), calc(-50% + ${vy}px)) rotate(720deg) scale(0)`,
                opacity: 0 
            }
        ], {
            duration: 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        confettiContainer.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 2000);
    }
}

// Blow out candles
function blowOutCandles() {
    const flames = document.querySelectorAll('.flame');
    flames.forEach((flame, index) => {
        setTimeout(() => {
            flame.classList.add('flame-out');
        }, index * 200);
    });
}

// Show cake
function showCake() {
    const cakeContainer = document.getElementById('cake-container');
    cakeContainer.classList.remove('cake-hidden');
    cakeContainer.classList.add('cake-visible');
}

// Show final message
function showFinalMessage() {
    const finalMessage = document.getElementById('final-message');
    finalMessage.classList.remove('final-message-hidden');
    finalMessage.classList.add('final-message-visible');
}

// Create skyrocket that launches from bottom
function createSkyrocket() {
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd'];
    const fireworksContainer = document.getElementById('fireworks-container');
    
    // Create bigger rocket trail
    const rocket = document.createElement('div');
    rocket.style.position = 'absolute';
    rocket.style.left = random(10, 90) + '%';
    rocket.style.bottom = '0px';
    rocket.style.width = '12px';
    rocket.style.height = '40px';
    rocket.style.background = 'linear-gradient(to top, #ffff00, #ff6600, #ff0000)';
    rocket.style.borderRadius = '6px 6px 0 0';
    rocket.style.boxShadow = '0 0 30px #ffff00, 0 0 60px #ff6600';
    rocket.style.zIndex = '100';
    
    // Add sparkling trail effect
    rocket.style.filter = 'drop-shadow(0 10px 20px rgba(255, 255, 0, 0.8))';
    
    fireworksContainer.appendChild(rocket);
    
    // Animate rocket going up
    const burstHeight = random(15, 55);
    const animationDuration = random(2000, 3000);
    
    rocket.animate([
        { 
            bottom: '0px', 
            opacity: 1,
            transform: 'scale(1)',
            boxShadow: '0 0 30px #ffff00, 0 0 60px #ff6600'
        },
        { 
            bottom: burstHeight + '%', 
            opacity: 0.9,
            transform: 'scale(1.2)',
            boxShadow: '0 0 50px #ffff00, 0 0 100px #ff6600'
        }
    ], {
        duration: animationDuration,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fill: 'forwards'
    });
    
    // Create burst at the top
    setTimeout(() => {
        const rect = rocket.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        // Remove rocket
        rocket.remove();
        
        // Create bigger burst explosion
        createSkyrocketBurst(x, y);
    }, animationDuration);
}

// Create burst explosion for skyrocket
function createSkyrocketBurst(x, y) {
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd'];
    const particleCount = 30;
    const fireworksContainer = document.getElementById('fireworks-container');
    
    // Create center flash
    const flash = document.createElement('div');
    flash.style.position = 'absolute';
    flash.style.left = (x - 25) + 'px';
    flash.style.top = (y - 25) + 'px';
    flash.style.width = '50px';
    flash.style.height = '50px';
    flash.style.borderRadius = '50%';
    flash.style.background = 'radial-gradient(circle, #ffffff, #ffff00, transparent)';
    flash.style.boxShadow = '0 0 100px #ffffff';
    fireworksContainer.appendChild(flash);
    
    flash.animate([
        { transform: 'scale(0)', opacity: 1 },
        { transform: 'scale(2)', opacity: 0 }
    ], { duration: 500, fill: 'forwards' });
    
    setTimeout(() => flash.remove(), 500);
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '15px';
        particle.style.height = '15px';
        particle.style.borderRadius = '50%';
        particle.style.background = colors[randomInt(0, colors.length - 1)];
        particle.style.boxShadow = `0 0 25px ${colors[randomInt(0, colors.length - 1)]}`;
        fireworksContainer.appendChild(particle);
        
        const angle = (i / particleCount) * Math.PI * 2;
        const velocity = random(120, 200);
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.animate([
            { 
                left: x + 'px',
                top: y + 'px',
                opacity: 1,
                transform: 'scale(1)'
            },
            { 
                left: (x + vx) + 'px',
                top: (y + vy) + 'px',
                opacity: 0,
                transform: 'scale(0.2)'
            }
        ], {
            duration: 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fill: 'forwards'
        });
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 2000);
    }
}

// Launch continuous skyrockets
function launchContinuousSkyrockets() {
    // Launch bigger skyrockets every 1200ms for 20 seconds
    const skyrocketInterval = setInterval(() => {
        createSkyrocket();
    }, 1200);
    
    // Stop after 20 seconds
    setTimeout(() => {
        clearInterval(skyrocketInterval);
    }, 20000);
}

// Main celebration function
function celebrate() {
    const button = document.getElementById('celebrate-btn');
    const audio = document.getElementById('birthday-audio');
    const container = document.querySelector('.container');
    
    // Hide button and main content
    button.style.transform = 'scale(0)';
    button.style.opacity = '0';
    
    // Hide the entire main container to avoid collision
    setTimeout(() => {
        container.style.opacity = '0';
        container.style.transform = 'translate(-50%, -50%) scale(0.8)';
        container.style.transition = 'all 0.5s ease';
    }, 300);
    
    setTimeout(() => {
        container.style.display = 'none';
    }, 800);
    
    // Show final message immediately after container fades out
    setTimeout(() => {
        showFinalMessage();
    }, 1000);
    
    // Play audio
    audio.play().catch(() => {
        console.log('Audio autoplay prevented by browser');
    });
    
    // Launch fireworks
    setTimeout(() => {
        launchFireworks();
        createConfettiBurst();
    }, 500);
    
    // Launch continuous skyrockets
    setTimeout(() => {
        launchContinuousSkyrockets();
    }, 1000);
    
    // Show cake
    setTimeout(() => {
        showCake();
    }, 2000);
    
    // Blow out candles
    setTimeout(() => {
        blowOutCandles();
    }, 4500);
}

// Initialize the page
function init() {
    createParticles();
    createDecorations();
    
    // Add event listener to celebrate button
    const celebrateButton = document.getElementById('celebrate-btn');
    celebrateButton.addEventListener('click', celebrate);
    
    // Continuously add new balloons and confetti
    setInterval(() => {
        const decorationsContainer = document.getElementById('decorations');
        
        // Add new balloon
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = random(0, 90) + '%';
        const balloonColors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd'];
        balloon.style.background = balloonColors[randomInt(0, balloonColors.length - 1)];
        decorationsContainer.appendChild(balloon);
        
        // Remove balloon after animation
        setTimeout(() => {
            if (balloon.parentNode) {
                balloon.parentNode.removeChild(balloon);
            }
        }, 15000);
        
        // Add new confetti
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = random(0, 100) + '%';
        const confettiColors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd'];
        confetti.style.background = confettiColors[randomInt(0, confettiColors.length - 1)];
        confetti.style.borderRadius = randomInt(0, 1) ? '50%' : '0%';
        decorationsContainer.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 8000);
    }, 3000);
}

// Start when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
