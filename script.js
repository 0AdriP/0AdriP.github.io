// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navbar = document.getElementById('navbar');
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburger');
    const backToTop = document.getElementById('backToTop');
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-item');
    const profileImg = document.getElementById('profileImg');

    // Skills data
    const physicsDomains = [
        { name: 'Quantum Mechanics', level: 95 },
        { name: 'Statistical Physics', level: 90 },
        { name: 'Thermodynamics', level: 85 },
        { name: 'Electromagnetism', level: 80 },
        { name: 'Relativity', level: 75 },
        { name: 'Particle Physics', level: 70 }
    ];

    const programmingSkills = [
        { name: 'Python', level: 95 },
        { name: 'MATLAB', level: 90 },
        { name: 'C++', level: 85 },
        { name: 'Julia', level: 80 },
        { name: 'R', level: 75 },
        { name: 'Fortran', level: 70 }
    ];

    const toolsSkills = [
        { name: 'LaTeX', level: 95 },
        { name: 'Mathematica', level: 90 },
        { name: 'NumPy/SciPy', level: 90 },
        { name: 'TensorFlow', level: 85 },
        { name: 'Git', level: 80 },
        { name: 'Linux', level: 90 }
    ];

    // Publications data
    const publications = [
        {
            title: "Quantum thing on quantum",
            authors: "A.D.",
            journal: "Journal of oui",
            abstract: "This paper presents something... probably",
            date: "April 2024",
            link: "#"
        }
    ];

    // Populate Skills
    function populateSkills() {
        const physicsDomainsEl = document.getElementById('physicsDomains');
        const programmingSkillsEl = document.getElementById('programmingSkills');
        const toolsSkillsEl = document.getElementById('toolsSkills');

        physicsDomains.forEach(skill => {
            const skillEl = document.createElement('div');
            skillEl.className = 'skill';
            skillEl.textContent = skill.name;
            skillEl.setAttribute('data-level', skill.level);
            physicsDomainsEl.appendChild(skillEl);
        });

        programmingSkills.forEach(skill => {
            const skillEl = document.createElement('div');
            skillEl.className = 'skill';
            skillEl.textContent = skill.name;
            skillEl.setAttribute('data-level', skill.level);
            programmingSkillsEl.appendChild(skillEl);
        });

        toolsSkills.forEach(skill => {
            const skillEl = document.createElement('div');
            skillEl.className = 'skill';
            skillEl.textContent = skill.name;
            skillEl.setAttribute('data-level', skill.level);
            toolsSkillsEl.appendChild(skillEl);
        });
    }

    // Populate Publications
    function populatePublications() {
        const publicationsListEl = document.getElementById('publicationsList');

        publications.forEach(pub => {
            const pubEl = document.createElement('div');
            pubEl.className = 'publication-item';
            pubEl.innerHTML = `
                <h3 class="publication-title">${pub.title}</h3>
                <p class="publication-authors">${pub.authors}</p>
                <p class="publication-journal">${pub.journal}</p>
                <p class="publication-abstract">${pub.abstract}</p>
                <div class="publication-details">
                    <span class="publication-date">${pub.date}</span>
                    <a href="${pub.link}" class="publication-link">Read More</a>
                </div>
            `;
            publicationsListEl.appendChild(pubEl);
        });
    }

    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('#navbar') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Transparent navbar on scroll
    function updateNavbar() {
        if (window.scrollY > 100) {
            navbar.classList.remove('transparent');
        } else {
            navbar.classList.add('transparent');
        }
    }

    // Back to top button visibility
    function updateBackToTop() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    // Highlight active nav item based on scroll position
    function highlightNavItem() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(navItem => {
            navItem.classList.remove('active');
            if (navItem.getAttribute('href') === `#${current}`) {
                navItem.classList.add('active');
            }
        });
    }

    // Handle scroll events
    window.addEventListener('scroll', function() {
        updateNavbar();
        updateBackToTop();
        highlightNavItem();
        animateOnScroll();
        checkCounters();
    });

    // Initialize navbar state
    updateNavbar();

    // Back to top functionality
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Counters animation
    const counters = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    function startCounters() {
        if (countersStarted) return;
        
        counters.forEach(counter => {
            const target = parseInt(counter.closest('.stat-item').getAttribute('data-value'));
            let count = 0;
            const duration = 2000; // ms
            const interval = Math.floor(duration / target);
            
            const timer = setInterval(() => {
                count++;
                counter.textContent = count;
                
                if (count >= target) {
                    clearInterval(timer);
                }
            }, interval);
        });
        
        countersStarted = true;
    }

    function checkCounters() {
        const aboutSection = document.getElementById('about');
        const aboutPosition = aboutSection.getBoundingClientRect();
        
        if (aboutPosition.top < window.innerHeight && aboutPosition.bottom > 0) {
            startCounters();
        }
    }

    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.timeline-item, .skills-category, .research-item, .publication-item, .project-card');
        
        elements.forEach(element => {
            const position = element.getBoundingClientRect();
            
            // If element is in viewport
            if (position.top < window.innerHeight - 100 && position.bottom > 0) {
                element.classList.add('fadeIn');
            }
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simulate form submission
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate network request
            setTimeout(() => {
                // Show success message
                contactForm.innerHTML = `
                    <div class="success-message">
                        <svg viewBox="0 0 24 24" width="48" height="48">
                            <circle cx="12" cy="12" r="11" fill="none" stroke="#b60000" stroke-width="2"/>
                            <path d="M7 13l3 3 7-7" fill="none" stroke="#b60000" stroke-width="2"/>
                        </svg>
                        <h3>Message Sent!</h3>
                        <p>Thank you for reaching out. I'll get back to you soon.</p>
                    </div>
                `;
            }, 1500);
        });
    }

    // Profile image animation
    if (profileImg) {
        profileImg.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05) rotate(5deg)';
        });
        
        profileImg.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Research items hover effect
    const researchItems = document.querySelectorAll('.research-item');
    researchItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            researchItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.style.opacity = '0.6';
                }
            });
        });
        
        item.addEventListener('mouseleave', function() {
            researchItems.forEach(otherItem => {
                otherItem.style.opacity = '1';
            });
        });
    });

    // Parallax effect for header
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        document.querySelector('header').style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    });

    // Initialize skills and publications
    populateSkills();
    populatePublications();

    // Add random animation delay to skills
    document.querySelectorAll('.skill').forEach(skill => {
        skill.style.animationDelay = `${Math.random() * 1}s`;
    });

    // Initialize animations on page load
    setTimeout(() => {
        animateOnScroll();
        checkCounters();
    }, 300);

    // Timeline animation on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    window.addEventListener('scroll', function() {
        timelineItems.forEach(item => {
            const position = item.getBoundingClientRect();
            
            if (position.top < window.innerHeight - 100) {
                const isEven = Array.from(timelineItems).indexOf(item) % 2 === 0;
                item.classList.add(isEven ? 'slideInLeft' : 'slideInRight');
            }
        });
    });

    // Typing effect for header title
    function typeEffect(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }

    // Apply typing effect to header title
    const headerTitle = document.querySelector('.title');
    if (headerTitle) {
        const originalText = headerTitle.textContent;
        setTimeout(() => {
            typeEffect(headerTitle, originalText, 80);
        }, 1000);
    }

    // Particle animation for header background
    function createParticles() {
        const header = document.querySelector('header');
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        header.appendChild(particleContainer);
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.width = `${Math.random() * 5 + 2}px`;
            particle.style.height = particle.style.width;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particleContainer.appendChild(particle);
        }
    }

    // Initialize particle effect
    createParticles();

    // Add CSS for particles
    const style = document.createElement('style');
    style.textContent = `
        .particle-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 0;
        }
        
        .particle {
            position: absolute;
            background-color: white;
            border-radius: 50%;
            opacity: 0.3;
            animation: float linear infinite;
        }
        
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.3;
            }
            90% {
                opacity: 0.3;
            }
            100% {
                transform: translateY(-100vh) translateX(100px) rotate(360deg);
                opacity: 0;
            }
        }
        
        .success-message {
            text-align: center;
            padding: 30px;
            animation: fadeIn 0.5s;
        }
        
        .success-message svg {
            margin-bottom: 20px;
        }
        
        .success-message h3 {
            color: #b60000;
            margin-bottom: 10px;
        }
    `;
    document.head.appendChild(style);
});
