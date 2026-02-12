// Shared JavaScript for Text Tools Hub
// Handles: Dark mode, mobile nav, toast notifications, scroll reveal, FAQ accordion, keyboard shortcuts, back to top

(function() {
    'use strict';

    // ==================== DARK MODE ====================
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;
    
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'enabled') {
        html.classList.add('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.setAttribute('aria-pressed', 'true');
        }
    }
    
    // Dark mode toggle handler
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            html.classList.toggle('dark-mode');
            const isDarkMode = html.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
            darkModeToggle.setAttribute('aria-pressed', isDarkMode);
        });
    }

    // ==================== MOBILE NAVIGATION ====================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    
    function openMobileMenu() {
        if (mobileMenu && mobileMenuOverlay) {
            mobileMenu.classList.add('active');
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeMobileMenu() {
        if (mobileMenu && mobileMenuOverlay) {
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', openMobileMenu);
    }
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Close mobile menu when clicking on a link
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-content a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // ==================== TOAST NOTIFICATIONS ====================
    window.showToast = function(message, duration = 3000) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 10);
        
        // Auto dismiss
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    };

    // ==================== SCROLL REVEAL ====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with scroll-reveal class
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });

    // ==================== FAQ ACCORDION ====================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });

    // ==================== KEYBOARD SHORTCUTS ====================
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + Enter: Trigger primary action button
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const primaryBtn = document.querySelector('[data-primary-action]');
            if (primaryBtn) {
                e.preventDefault();
                primaryBtn.click();
            }
        }
        
        // Ctrl/Cmd + Shift + C: Copy result
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
            const copyBtn = document.querySelector('[data-copy-action]');
            if (copyBtn) {
                e.preventDefault();
                copyBtn.click();
            }
        }
    });

    // ==================== BACK TO TOP BUTTON ====================
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ==================== PAGE LOAD ANIMATION ====================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // ==================== COPY TO CLIPBOARD HELPER ====================
    window.copyToClipboard = async function(text, button) {
        try {
            await navigator.clipboard.writeText(text);
            showToast('✓ Copied to clipboard!');
            
            // Temporarily change button text
            if (button) {
                const originalText = button.textContent;
                button.textContent = '✓ Copied!';
                button.classList.add('success-state');
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.classList.remove('success-state');
                }, 2000);
            }
            
            return true;
        } catch (err) {
            showToast('Failed to copy to clipboard');
            return false;
        }
    };

    // ==================== DROPDOWN MENU HANDLING ====================
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
    
    dropdownTriggers.forEach(trigger => {
        const dropdown = trigger.nextElementSibling;
        
        if (dropdown && dropdown.classList.contains('dropdown-menu')) {
            trigger.addEventListener('mouseenter', () => {
                dropdown.classList.add('show');
            });
            
            trigger.parentElement.addEventListener('mouseleave', () => {
                dropdown.classList.remove('show');
            });
        }
    });

})();
