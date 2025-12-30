// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .testimonial-card, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Orange Peeling Animation
function updateOrangePeel() {
    const orange = document.querySelector('.orange');
    const orangeContainer = document.querySelector('.orange-container');
    const peelPieces = document.querySelectorAll('.peel-piece');
    
    if (!orange || !orangeContainer || peelPieces.length === 0) {
        return;
    }
    
    // Calculate peel progress based on scroll position
    const scrolled = window.pageYOffset;
    const startPeel = 50; // Start peeling after 50px of scroll
    const endPeel = 600; // Complete peeling at 600px scroll
    const peelRange = endPeel - startPeel;
    
    // Calculate progress (0 to 1)
    let peelProgress = 0;
    if (scrolled >= startPeel) {
        peelProgress = Math.min(1, (scrolled - startPeel) / peelRange);
    }
    
    // Debug logging (remove after testing)
    // console.log('Scroll:', scrolled, 'Progress:', peelProgress.toFixed(2));
    
    // Apply peeling class
    if (peelProgress > 0) {
        orange.classList.add('peeling');
    } else {
        orange.classList.remove('peeling');
    }
    
    // Animate each peel piece
    peelPieces.forEach((peel, index) => {
        // Stagger timing for each piece (delay before this piece starts peeling)
        const delay = index * 0.12;
        
        // Calculate this piece's progress (0 to 1)
        // Each piece starts peeling after its delay
        let pieceProgress = 0;
        if (peelProgress > delay) {
            // This piece has started peeling
            const adjustedProgress = peelProgress - delay;
            pieceProgress = Math.min(1, adjustedProgress / (1 - delay));
        }
        
        // Calculate movement values based on progress
        const distance = pieceProgress * 160;
        const extraRotation = pieceProgress * 200;
        const baseRotation = index * 60;
        
        // Calculate radial direction (each piece moves outward in its direction)
        const angle = (baseRotation * Math.PI) / 180;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        // Build transform string - move outward from center, then rotate
        const transformStr = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${baseRotation + extraRotation}deg) scale(${1 + pieceProgress * 0.2})`;
        
        // Apply transforms directly
        peel.style.transform = transformStr;
        peel.style.opacity = Math.max(0.3, 1 - pieceProgress * 0.7);
        peel.style.zIndex = pieceProgress > 0.3 ? '10' : '1';
    });
    
    // Animate orange fruit
    const orangeFruit = document.querySelector('.orange-fruit');
    if (orangeFruit) {
        orangeFruit.style.transform = `scale(${1 - peelProgress * 0.08}) rotate(${peelProgress * 180}deg)`;
    }
}

// Advanced Parallax Effects
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Update orange peel animation
    updateOrangePeel();
    
    // Hero section parallax effects
    const hero = document.querySelector('.hero');
    const heroText = document.querySelector('.hero-text');
    const heroVisual = document.querySelector('.hero-visual');
    const heroBackground = document.querySelector('.hero-background');
    
    if (hero && scrolled < windowHeight) {
        const heroOffset = hero.getBoundingClientRect().top;
        const parallaxSpeed = 0.5;
        
        // Hero text moves slower (parallax up)
        if (heroText) {
            heroText.style.transform = `translateY(${scrolled * 0.2}px)`;
            heroText.style.opacity = 1 - (scrolled / windowHeight) * 0.5;
        }
        
        // Hero visual moves faster (parallax down)
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrolled * 0.4}px) scale(${1 - scrolled * 0.0003})`;
        }
        
        // Hero background parallax
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    }
    
    // Feature cards parallax (staggered effect)
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardTop = rect.top;
        const cardHeight = rect.height;
        
        if (cardTop < windowHeight && cardTop > -cardHeight) {
            const progress = (windowHeight - cardTop) / (windowHeight + cardHeight);
            const offset = (index % 2 === 0 ? 1 : -1) * progress * 30;
            const scale = 1 + progress * 0.05;
            
            card.style.transform = `translateY(${offset}px) scale(${scale})`;
            card.style.opacity = Math.min(1, progress * 1.5);
        }
    });
    
    // Section headers parallax
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        const rect = header.getBoundingClientRect();
        const headerTop = rect.top;
        
        if (headerTop < windowHeight && headerTop > -200) {
            const progress = (windowHeight - headerTop) / windowHeight;
            const offset = (1 - progress) * 50;
            header.style.transform = `translateY(${offset}px)`;
        }
    });
    
    // Steps parallax (alternating directions)
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        const rect = step.getBoundingClientRect();
        const stepTop = rect.top;
        const stepHeight = rect.height;
        
        if (stepTop < windowHeight && stepTop > -stepHeight) {
            const progress = (windowHeight - stepTop) / (windowHeight + stepHeight);
            const direction = index % 2 === 0 ? 1 : -1;
            const offset = direction * progress * 40;
            
            step.style.transform = `translateY(${offset}px)`;
        }
    });
    
    // Testimonial cards floating effect
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardTop = rect.top;
        const cardHeight = rect.height;
        
        if (cardTop < windowHeight && cardTop > -cardHeight) {
            const progress = (windowHeight - cardTop) / (windowHeight + cardHeight);
            const offset = Math.sin(progress * Math.PI) * 20;
            const rotation = (index % 2 === 0 ? 1 : -1) * progress * 2;
            
            card.style.transform = `translateY(${offset}px) rotate(${rotation}deg)`;
        }
    });
    
    // Phone mockup 3D rotation effect
    const phoneMockup = document.querySelector('.phone-mockup');
    if (phoneMockup) {
        const rect = phoneMockup.getBoundingClientRect();
        const mockupTop = rect.top;
        const mockupHeight = rect.height;
        
        if (mockupTop < windowHeight && mockupTop > -mockupHeight) {
            const progress = (windowHeight - mockupTop) / (windowHeight + mockupHeight);
            const rotationY = (progress - 0.5) * 15;
            const rotationX = (progress - 0.5) * 5;
            
            phoneMockup.style.transform = `perspective(1000px) rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
        }
    }
    
    // CTA section scale effect
    const cta = document.querySelector('.cta');
    if (cta) {
        const rect = cta.getBoundingClientRect();
        const ctaTop = rect.top;
        
        if (ctaTop < windowHeight && ctaTop > -300) {
            const progress = Math.max(0, Math.min(1, (windowHeight - ctaTop) / windowHeight));
            const scale = 0.95 + progress * 0.05;
            cta.style.transform = `scale(${scale})`;
        }
    }
    
    // Floating background elements
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        const time = Date.now() * 0.0005;
        heroBackground.style.background = `
            radial-gradient(circle at ${20 + Math.sin(time) * 10}% ${50 + Math.cos(time) * 10}%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
            radial-gradient(circle at ${80 + Math.cos(time) * 10}% ${80 + Math.sin(time) * 10}%, rgba(52, 211, 153, 0.15) 0%, transparent 50%)
        `;
    }
    
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

// Use requestAnimationFrame for smooth performance
window.addEventListener('scroll', requestTick);
window.addEventListener('resize', requestTick);

// Initial call
updateParallax();

// Test orange peeling - trigger on page load for testing
window.addEventListener('DOMContentLoaded', () => {
    // Test if orange exists
    const orange = document.querySelector('.orange');
    const peelPieces = document.querySelectorAll('.peel-piece');
    console.log('Orange peeling animation loaded. Orange found:', !!orange, 'Peel pieces:', peelPieces.length);
    
    // Force orange to peel for testing - manually set scroll to trigger peeling
    if (orange && peelPieces.length > 0) {
        // Simulate scroll to test animation
        console.log('Testing orange peel animation...');
        // We'll test with actual scroll instead
    }
});

// Also call orange peel update directly on scroll (separate from parallax)
window.addEventListener('scroll', () => {
    updateOrangePeel();
}, { passive: true });

// Test: Add keyboard shortcut 'P' to manually trigger peeling for testing
window.addEventListener('keydown', (e) => {
    if (e.key === 'p' || e.key === 'P') {
        // Manually set scroll position to trigger peeling
        const orange = document.querySelector('.orange');
        const peelPieces = document.querySelectorAll('.peel-piece');
        if (orange && peelPieces.length > 0) {
            console.log('Manual peel test triggered!');
            // Simulate peeling by directly manipulating progress
            const testProgress = 0.8;
            peelPieces.forEach((peel, index) => {
                const delay = index * 0.12;
                let pieceProgress = 0;
                if (testProgress > delay) {
                    pieceProgress = Math.min(1, (testProgress - delay) / (1 - delay));
                }
                const distance = pieceProgress * 160;
                const extraRotation = pieceProgress * 200;
                const baseRotation = index * 60;
                const angle = (baseRotation * Math.PI) / 180;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                const transformStr = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${baseRotation + extraRotation}deg) scale(${1 + pieceProgress * 0.2})`;
                peel.style.transform = transformStr;
                peel.style.opacity = Math.max(0.3, 1 - pieceProgress * 0.7);
            });
        }
    }

    // Source - https://stackoverflow.com/a
// Posted by Jordy
// Retrieved 2025-11-30, License - CC BY-SA 4.0

const express = require('express');
const cors = require('cors');
// const { test } = require('./script/test.js');

const api = express();
api.use(cors({ origin: '*' }));
api.use(express.static('public'));
api.use('/script', express.static('script'));

api.listen(4200, () => {
    console.log("Server listening");
});



