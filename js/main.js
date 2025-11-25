// Countdown Timer
function updateCountdown() {
    const weddingDate = new Date("May 23, 2026 16:00:00").getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
    
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.querySelector(".countdown-container").innerHTML = 
            '<h2 style="color: var(--ocean-dark); font-size: 2rem; font-family: var(--font-serif);">We\'re Married!</h2>';
    }
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Navigation Scroll Effect
const navigation = document.getElementById('navigation');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navigation.classList.add('scrolled');
    } else {
        navigation.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    navToggle.classList.toggle('active');
    
    if (navToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
        
        // Scroll to section
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// RSVP Form Handler with Dynamic Guest Fields
const rsvpForm = document.getElementById('rsvpForm');
const attendingSelect = document.getElementById('attending');
const guestCountGroup = document.getElementById('guest-count-group');
const guestCountSelect = document.getElementById('guest-count');
const guestNamesContainer = document.getElementById('guest-names-container');
const dietaryContainer = document.getElementById('dietary-container');

// Show/hide sections based on attendance
if (attendingSelect) {
    attendingSelect.addEventListener('change', function() {
        if (this.value === 'yes') {
            guestCountGroup.style.display = 'block';
            // Don't show guest names/dietary until guest count is selected
            hideAllGuestFields();
            hideAllDietaryFields();
        } else {
            guestCountGroup.style.display = 'none';
            hideAllGuestFields();
            hideAllDietaryFields();
            if (guestCountSelect) {
                guestCountSelect.value = '';
            }
        }
    });
}

// Show/hide guest fields when count changes
if (guestCountSelect) {
    guestCountSelect.addEventListener('change', function() {
        const count = parseInt(this.value);
        if (!isNaN(count) && count > 0) {
            showGuestFields(count);
            showDietaryFields(count);
        } else {
            hideAllGuestFields();
            hideAllDietaryFields();
        }
    });
}

function showGuestFields(count) {
    // Show the guest names container
    guestNamesContainer.style.display = 'block';
    
    // Hide all guest fields first
    for (let i = 1; i <= 6; i++) {
        const field = document.getElementById(`guest-field-${i}`);
        if (field) {
            field.style.display = 'none';
            // Clear the input
            const input = document.getElementById(`guest_${i}`);
            if (input && i > 1) {
                input.value = '';
                input.required = false;
            }
        }
    }
    
    // Show only the needed guest fields
    for (let i = 1; i <= count; i++) {
        const field = document.getElementById(`guest-field-${i}`);
        if (field) {
            field.style.display = 'block';
            // Set required attribute for all except first guest
            const input = document.getElementById(`guest_${i}`);
            if (input && i > 1) {
                input.required = true;
            }
        }
    }
    
    // Auto-fill first guest with primary name
    const primaryName = document.getElementById('primary-name');
    const guest1 = document.getElementById('guest_1');
    if (primaryName && guest1) {
        guest1.value = primaryName.value;
    }
}

function showDietaryFields(count) {
    // Show the dietary container
    dietaryContainer.style.display = 'block';
    
    // Hide all dietary fields first
    for (let i = 1; i <= 6; i++) {
        const field = document.getElementById(`dietary-field-${i}`);
        if (field) {
            field.style.display = 'none';
            // Clear the input
            const input = document.getElementById(`dietary_${i}`);
            if (input) {
                input.value = '';
            }
        }
    }
    
    // Show only the needed dietary fields
    for (let i = 1; i <= count; i++) {
        const field = document.getElementById(`dietary-field-${i}`);
        if (field) {
            field.style.display = 'block';
        }
    }
}

function hideAllGuestFields() {
    guestNamesContainer.style.display = 'none';
    for (let i = 1; i <= 6; i++) {
        const field = document.getElementById(`guest-field-${i}`);
        if (field) {
            field.style.display = 'none';
            const input = document.getElementById(`guest_${i}`);
            if (input) {
                input.value = '';
                input.required = false;
            }
        }
    }
}

function hideAllDietaryFields() {
    dietaryContainer.style.display = 'none';
    for (let i = 1; i <= 6; i++) {
        const field = document.getElementById(`dietary-field-${i}`);
        if (field) {
            field.style.display = 'none';
            const input = document.getElementById(`dietary_${i}`);
            if (input) {
                input.value = '';
            }
        }
    }
}

// Auto-sync primary name with guest 1
const primaryNameInput = document.getElementById('primary-name');
if (primaryNameInput) {
    primaryNameInput.addEventListener('input', function() {
        const guest1 = document.getElementById('guest_1');
        if (guest1) {
            guest1.value = this.value;
        }
    });
}

// RSVP Form Validation (Let Netlify handle submission)
if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(e) {
        // Only validate - don't prevent default submission
        const attending = document.getElementById('attending').value;
        if (attending === 'yes') {
            const guestCount = document.getElementById('guest-count').value;
            if (!guestCount || guestCount === '') {
                e.preventDefault();
                alert('Please select the number of guests attending.');
                return false;
            }
        }
        
        // Let Netlify handle the form submission naturally
        // Show a loading state on the button
        const submitBtn = this.querySelector('.btn-submit');
        if (submitBtn) {
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
        }
    });
}

// Add parallax effect to hero section (optional)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add hover effect to cards
document.querySelectorAll('.detail-card, .info-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Preload images for better performance
function preloadImages() {
    const imageUrls = [
        'images/background.jpeg',
        'images/couple.jpeg'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    preloadImages();
    updateActiveLink();
});