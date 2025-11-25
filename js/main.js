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
const dietaryGroup = document.getElementById('dietary-group');

// Show/hide sections based on attendance
if (attendingSelect) {
    attendingSelect.addEventListener('change', function() {
        if (this.value === 'yes') {
            guestCountGroup.style.display = 'block';
            dietaryGroup.style.display = 'block';
            generateGuestFields(parseInt(guestCountSelect.value));
        } else {
            guestCountGroup.style.display = 'none';
            dietaryGroup.style.display = 'none';
            guestNamesContainer.innerHTML = '';
        }
    });
}

// Generate guest name fields when count changes
if (guestCountSelect) {
    guestCountSelect.addEventListener('change', function() {
        generateGuestFields(parseInt(this.value));
    });
}

function generateGuestFields(count) {
    guestNamesContainer.innerHTML = '';
    
    for (let i = 1; i <= count; i++) {
        const guestDiv = document.createElement('div');
        guestDiv.className = 'form-group guest-field';
        guestDiv.innerHTML = `
            <label for="guest-${i}">${i === 1 ? 'Guest 1 (Primary Contact)' : 'Guest ' + i + ' Full Name'}</label>
            <input type="text" id="guest-${i}" name="guest-${i}" placeholder="${i === 1 ? 'Your name (same as above)' : 'Enter guest name'}" ${i === 1 ? 'readonly' : 'required'}>
        `;
        guestNamesContainer.appendChild(guestDiv);
        
        // Auto-fill first guest with primary name
        if (i === 1) {
            const primaryName = document.getElementById('primary-name');
            const guest1 = document.getElementById('guest-1');
            if (primaryName && guest1) {
                guest1.value = primaryName.value;
                
                primaryName.addEventListener('input', function() {
                    guest1.value = this.value;
                });
            }
        }
    }
    
    // Add animation
    const fields = guestNamesContainer.querySelectorAll('.guest-field');
    fields.forEach((field, index) => {
        field.style.opacity = '0';
        field.style.transform = 'translateY(10px)';
        setTimeout(() => {
            field.style.transition = 'all 0.3s ease';
            field.style.opacity = '1';
            field.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// RSVP Form Submit Handler
if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(rsvpForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Here you would normally send the data to a server
        console.log('RSVP Data:', data);
        
        // Show success message
        alert('Thank you for your RSVP! We\'ll send you a confirmation email soon.');
        
        // Reset form
        rsvpForm.reset();
        guestCountGroup.style.display = 'none';
        dietaryGroup.style.display = 'none';
        guestNamesContainer.innerHTML = '';
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