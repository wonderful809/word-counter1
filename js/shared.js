// Shared JavaScript for Text Tools & Word Counter Hub
// Handles dark mode, toast notifications, keyboard shortcuts, drag-and-drop, auto-save, and more

(function() {
    'use strict';

    // ==================== Dark Mode ====================
    const DarkMode = {
        init() {
            this.toggle = document.createElement('button');
            this.toggle.className = 'dark-mode-toggle';
            this.toggle.setAttribute('aria-label', 'Toggle dark mode');
            this.toggle.innerHTML = `
                <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
                <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            `;
            
            const nav = document.querySelector('nav .container');
            if (nav) {
                nav.appendChild(this.toggle);
            }

            // Load saved preference
            const savedMode = localStorage.getItem('darkMode');
            if (savedMode === 'true') {
                document.body.classList.add('dark-mode');
            }

            this.toggle.addEventListener('click', () => this.toggleMode());
        },

        toggleMode() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark);
            
            // Animate the toggle
            this.toggle.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                this.toggle.style.transform = 'rotate(0deg)';
            }, 300);
        }
    };

    // ==================== Toast Notifications ====================
    const Toast = {
        container: null,

        init() {
            this.container = document.createElement('div');
            this.container.className = 'toast-container';
            document.body.appendChild(this.container);
        },

        show(message, type = 'info', duration = 3000) {
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.innerHTML = `
                <div class="toast-content">
                    <span class="toast-icon">${this.getIcon(type)}</span>
                    <span class="toast-message">${message}</span>
                </div>
            `;

            this.container.appendChild(toast);

            // Trigger animation
            setTimeout(() => toast.classList.add('show'), 10);

            // Auto dismiss
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }, duration);
        },

        getIcon(type) {
            const icons = {
                success: '✓',
                error: '✕',
                info: 'ℹ',
                warning: '⚠'
            };
            return icons[type] || icons.info;
        }
    };

    // Override window.alert to use toast
    window.showToast = (message, type) => Toast.show(message, type);

    // ==================== Back to Top Button ====================
    const BackToTop = {
        button: null,

        init() {
            this.button = document.createElement('button');
            this.button.className = 'back-to-top';
            this.button.setAttribute('aria-label', 'Back to top');
            this.button.innerHTML = '↑';
            document.body.appendChild(this.button);

            window.addEventListener('scroll', () => this.handleScroll());
            this.button.addEventListener('click', () => this.scrollToTop());
        },

        handleScroll() {
            if (window.scrollY > 200) {
                this.button.classList.add('show');
            } else {
                this.button.classList.remove('show');
            }
        },

        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    // ==================== Keyboard Shortcuts ====================
    const KeyboardShortcuts = {
        shortcuts: {
            'ctrl+enter': 'Execute primary action',
            'ctrl+shift+c': 'Copy result to clipboard',
            'ctrl+shift+x': 'Clear all inputs'
        },

        init() {
            this.createBadge();
            document.addEventListener('keydown', (e) => this.handleShortcut(e));
        },

        createBadge() {
            const badge = document.createElement('div');
            badge.className = 'shortcuts-badge';
            badge.innerHTML = `
                <div class="shortcuts-trigger">⌨️ Shortcuts</div>
                <div class="shortcuts-list">
                    ${Object.entries(this.shortcuts).map(([key, desc]) => `
                        <div class="shortcut-item">
                            <kbd>${key.replace('ctrl', 'Ctrl').replace('shift', 'Shift').replace('+', ' + ')}</kbd>
                            <span>${desc}</span>
                        </div>
                    `).join('')}
                </div>
            `;
            document.body.appendChild(badge);
        },

        handleShortcut(e) {
            const key = this.getKeyCombo(e);
            
            if (key === 'ctrl+enter') {
                e.preventDefault();
                this.executePrimaryAction();
            } else if (key === 'ctrl+shift+c') {
                e.preventDefault();
                this.copyResult();
            } else if (key === 'ctrl+shift+x') {
                e.preventDefault();
                this.clearInputs();
            }
        },

        getKeyCombo(e) {
            const parts = [];
            if (e.ctrlKey) parts.push('ctrl');
            if (e.shiftKey) parts.push('shift');
            if (e.altKey) parts.push('alt');
            parts.push(e.key.toLowerCase());
            return parts.join('+');
        },

        executePrimaryAction() {
            // Look for the primary button on the page
            const primaryBtn = document.querySelector('.btn-group button:not(.secondary)');
            if (primaryBtn) {
                primaryBtn.click();
                Toast.show('Action executed', 'success');
            }
        },

        copyResult() {
            const output = document.querySelector('textarea.output, #output');
            if (output) {
                navigator.clipboard.writeText(output.value || output.textContent)
                    .then(() => Toast.show('Copied to clipboard!', 'success'))
                    .catch(() => Toast.show('Failed to copy', 'error'));
            }
        },

        clearInputs() {
            const inputs = document.querySelectorAll('textarea:not(.output)');
            inputs.forEach(input => input.value = '');
            
            // Trigger input event to update counts
            inputs.forEach(input => input.dispatchEvent(new Event('input')));
            Toast.show('Inputs cleared', 'info');
        }
    };

    // ==================== Drag and Drop File Support ====================
    const DragDrop = {
        init() {
            const textareas = document.querySelectorAll('textarea:not(.output)');
            
            textareas.forEach(textarea => {
                const wrapper = this.createDropzone(textarea);
                
                ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                    wrapper.addEventListener(eventName, this.preventDefaults, false);
                });

                ['dragenter', 'dragover'].forEach(eventName => {
                    wrapper.addEventListener(eventName, () => {
                        wrapper.classList.add('drag-over');
                    }, false);
                });

                ['dragleave', 'drop'].forEach(eventName => {
                    wrapper.addEventListener(eventName, () => {
                        wrapper.classList.remove('drag-over');
                    }, false);
                });

                wrapper.addEventListener('drop', (e) => this.handleDrop(e, textarea), false);
            });
        },

        createDropzone(textarea) {
            const wrapper = document.createElement('div');
            wrapper.className = 'dropzone-wrapper';
            textarea.parentNode.insertBefore(wrapper, textarea);
            wrapper.appendChild(textarea);
            
            const overlay = document.createElement('div');
            overlay.className = 'dropzone-overlay';
            overlay.innerHTML = '<div class="dropzone-message">Drop .txt file here</div>';
            wrapper.appendChild(overlay);
            
            return wrapper;
        },

        preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        },

        handleDrop(e, textarea) {
            const files = e.dataTransfer.files;
            
            if (files.length > 0) {
                const file = files[0];
                
                if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        textarea.value = e.target.result;
                        textarea.dispatchEvent(new Event('input'));
                        Toast.show('File loaded successfully!', 'success');
                    };
                    reader.readAsText(file);
                } else {
                    Toast.show('Please drop a .txt file', 'warning');
                }
            }
        }
    };

    // ==================== Character Count Badge ====================
    const CharCountBadge = {
        init() {
            const textareas = document.querySelectorAll('textarea:not(.output)');
            
            textareas.forEach(textarea => {
                const badge = document.createElement('div');
                badge.className = 'char-count-badge';
                badge.textContent = '0';
                
                const wrapper = textarea.closest('.dropzone-wrapper') || textarea.parentNode;
                if (wrapper.style.position !== 'relative') {
                    wrapper.style.position = 'relative';
                }
                wrapper.appendChild(badge);
                
                textarea.addEventListener('input', () => {
                    badge.textContent = textarea.value.length;
                });
            });
        }
    };

    // ==================== Auto-save Drafts ====================
    const AutoSave = {
        init() {
            const textareas = document.querySelectorAll('textarea:not(.output)');
            
            textareas.forEach((textarea, index) => {
                const storageKey = `draft_${window.location.pathname}_${index}`;
                
                // Restore saved draft
                const savedDraft = localStorage.getItem(storageKey);
                if (savedDraft) {
                    textarea.value = savedDraft;
                    textarea.dispatchEvent(new Event('input'));
                    Toast.show('Draft restored', 'info', 2000);
                }
                
                // Auto-save on input
                let saveTimeout;
                textarea.addEventListener('input', () => {
                    clearTimeout(saveTimeout);
                    saveTimeout = setTimeout(() => {
                        if (textarea.value) {
                            localStorage.setItem(storageKey, textarea.value);
                        } else {
                            localStorage.removeItem(storageKey);
                        }
                    }, 1000);
                });
            });
        }
    };

    // ==================== Page Transitions ====================
    const PageTransitions = {
        init() {
            // Add page load animation
            document.body.classList.add('page-loading');
            
            setTimeout(() => {
                document.body.classList.remove('page-loading');
                document.body.classList.add('page-loaded');
            }, 50);

            // Handle navigation clicks
            const navLinks = document.querySelectorAll('nav a');
            navLinks.forEach(link => {
                if (link.href && !link.href.includes('#')) {
                    link.addEventListener('click', (e) => {
                        // Only for same-origin links
                        if (link.hostname === window.location.hostname) {
                            e.preventDefault();
                            document.body.classList.add('page-transitioning');
                            
                            setTimeout(() => {
                                window.location.href = link.href;
                            }, 300);
                        }
                    });
                }
            });
        }
    };

    // ==================== Hamburger Menu ====================
    const HamburgerMenu = {
        init() {
            const nav = document.querySelector('nav .container');
            const navLinks = document.querySelector('nav .nav-links');
            
            if (!nav || !navLinks) return;

            // Create hamburger button
            const hamburger = document.createElement('button');
            hamburger.className = 'hamburger-menu';
            hamburger.setAttribute('aria-label', 'Toggle menu');
            hamburger.innerHTML = `
                <span></span>
                <span></span>
                <span></span>
            `;
            
            nav.insertBefore(hamburger, navLinks);
            
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navLinks.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });

            // Close menu when clicking a link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            });
        }
    };

    // ==================== Button Ripple Effect ====================
    const ButtonRipple = {
        init() {
            document.addEventListener('click', (e) => {
                if (e.target.matches('button, .btn')) {
                    this.createRipple(e);
                }
            });
        },

        createRipple(event) {
            const button = event.target;
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        }
    };

    // ==================== Copy Button Feedback ====================
    const CopyFeedback = {
        init() {
            // Add copy buttons where needed
            const outputs = document.querySelectorAll('textarea.output');
            outputs.forEach(output => {
                const btnGroup = output.nextElementSibling;
                if (btnGroup && btnGroup.classList.contains('btn-group')) {
                    const copyBtn = Array.from(btnGroup.querySelectorAll('button'))
                        .find(btn => btn.textContent.includes('Copy'));
                    
                    if (copyBtn) {
                        copyBtn.addEventListener('click', () => this.showFeedback(copyBtn));
                    }
                }
            });
        },

        showFeedback(button) {
            const originalText = button.innerHTML;
            button.innerHTML = '✓ Copied!';
            button.classList.add('copied');
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.classList.remove('copied');
            }, 1500);
        }
    };

    // ==================== Mobile Action Bar ====================
    const MobileActionBar = {
        init() {
            // Only create on tool pages (not homepage) and on mobile
            if (window.innerWidth <= 768 && !window.location.pathname.includes('index.html') 
                && window.location.pathname !== '/') {
                this.createActionBar();
            }
            
            // Handle resize
            window.addEventListener('resize', () => {
                const bar = document.querySelector('.mobile-action-bar');
                if (window.innerWidth <= 768 && !bar) {
                    this.createActionBar();
                } else if (window.innerWidth > 768 && bar) {
                    bar.remove();
                }
            });
        },

        createActionBar() {
            const existingBar = document.querySelector('.mobile-action-bar');
            if (existingBar) return;

            const bar = document.createElement('div');
            bar.className = 'mobile-action-bar';
            
            // Find primary buttons on the page
            const btnGroup = document.querySelector('.btn-group');
            if (!btnGroup) return;
            
            const buttons = Array.from(btnGroup.querySelectorAll('button'));
            
            buttons.forEach(button => {
                const clone = button.cloneNode(true);
                // Copy event listeners by recreating click events
                clone.addEventListener('click', () => button.click());
                bar.appendChild(clone);
            });
            
            document.body.appendChild(bar);
        }
    };

    // ==================== Initialize Everything ====================
    document.addEventListener('DOMContentLoaded', function() {
        // Check for prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            document.body.classList.add('reduced-motion');
        }

        // Initialize all features
        Toast.init();
        DarkMode.init();
        BackToTop.init();
        KeyboardShortcuts.init();
        DragDrop.init();
        CharCountBadge.init();
        AutoSave.init();
        PageTransitions.init();
        HamburgerMenu.init();
        ButtonRipple.init();
        CopyFeedback.init();
        MobileActionBar.init();
    });

})();
