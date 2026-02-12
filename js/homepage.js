// Homepage-specific animations and effects

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== Typewriter Effect for Hero Title ====================
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '3px solid var(--primary-orange)';
        
        let charIndex = 0;
        const typeSpeed = 80;
        
        function typeWriter() {
            if (charIndex < originalText.length) {
                heroTitle.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, typeSpeed);
            } else {
                // Remove cursor after typing completes
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 500);
            }
        }
        
        // Start typewriter effect after page loads
        setTimeout(typeWriter, 300);
    }
    
    // ==================== Animated Stats Counter ====================
    const statsCounter = document.querySelector('.stats-counter');
    
    if (statsCounter) {
        const target = parseInt(statsCounter.dataset.target);
        let hasAnimated = false;
        
        function animateCounter() {
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            statsCounter.classList.add('counting');
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                    setTimeout(() => {
                        statsCounter.classList.remove('counting');
                    }, 500);
                }
                statsCounter.textContent = Math.floor(current).toLocaleString() + '+';
            }, 16);
        }
        
        // Use Intersection Observer to trigger animation when scrolled into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    animateCounter();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsCounter);
    }
    
    // ==================== Add hover previews to tool cards ====================
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        // Make cards relative positioned
        card.style.position = 'relative';
        
        const title = card.querySelector('h3').textContent;
        const preview = document.createElement('div');
        preview.className = 'preview';
        
        // Create preview content based on the tool
        let previewText = '';
        if (title.includes('Word Counter')) {
            previewText = 'Track your writing progress with real-time word counts, character limits, and reading time estimates.';
        } else if (title.includes('Character Counter')) {
            previewText = 'Stay within platform limits with Twitter and Instagram character counters built right in.';
        } else if (title.includes('Case Converter')) {
            previewText = 'Instantly convert between 5 different text cases with a single click.';
        } else if (title.includes('Line Breaks')) {
            previewText = 'Remove unwanted line breaks to create clean, flowing paragraphs.';
        } else if (title.includes('Formatter')) {
            previewText = 'Professional text formatting with sorting, numbering, and whitespace control.';
        }
        
        preview.innerHTML = `<p style="margin: 0; font-size: 0.95rem;">${previewText}</p>`;
        card.appendChild(preview);
    });
});
