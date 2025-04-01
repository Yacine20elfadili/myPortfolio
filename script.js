
// Typewriter Effect
var typed = new Typed(".input", {
    strings: ["Frontend Developer", "UX Designer", "Web Developer"],
    typeSpeed: 80,
    backSpeed: 40,
    backDelay: 1000,
    loop: true
});


// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function () {
    // Elements
    const header = document.querySelector('.sticky-header');
    const skillBars = document.querySelectorAll('.progress-bar');
    const projectCards = document.querySelectorAll('.project-card');
    const navLinks = document.querySelectorAll('.navlinks li a');
    const sections = document.querySelectorAll('section');
    const toggleBtn = document.querySelector('.togglebtn');
    const nav = document.querySelector('.navlinks');

    // Create scroll indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);

    // Create dark mode toggle
    const darkModeToggle = document.createElement('div');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(darkModeToggle);

    // Header scroll effect
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Update scroll indicator
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        scrollIndicator.style.width = scrollPercent + '%';

        // Check which section is in view
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });

        // Animate skill bars when Skills section is in view
        if (current === 'Skills') {
            skillBars.forEach(bar => {
                bar.style.animation = 'fillBar 1.5s ease forwards';
            });
        }

        // Animate project cards when Projects section is in view
        if (current === 'Projects') {
            projectCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.animation = 'fadeInUp 0.6s ease forwards';
                }, index * 200);
            });
        }
    });

    // Toggle menu
    toggleBtn.addEventListener('click', function () {
        this.classList.toggle('click');
        nav.classList.toggle('open');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleBtn.classList.remove('click');
            nav.classList.remove('open');
        });
    });

    // Dark mode toggle
    darkModeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            this.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            this.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add hover effect to social icons
    const socialLinks = document.querySelectorAll('.social a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px) rotate(10deg)';
        });

        link.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });

    // Animate timeline items on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });

    // Add hover animation to profile image
    const profileImg = document.querySelector('.hero-pic img');
    if (profileImg) {
        profileImg.addEventListener('mouseenter', function () {
            this.style.borderRadius = '50%';
            this.style.transform = 'scale(1.05) rotate(5deg)';
        });

        profileImg.addEventListener('mouseleave', function () {
            this.style.borderRadius = '30% 70% 70% 30% / 30% 30% 70% 70%';
            this.style.transform = '';
        });
    }
});
