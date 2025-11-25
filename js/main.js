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
            // Don't show dietary until guest count is selected
            // Don't generate fields until a count is selected
            guestNamesContainer.innerHTML = '';
            dietaryContainer.innerHTML = '';
        } else {
            guestCountGroup.style.display = 'none';
            dietaryContainer.style.display = 'none';
            guestNamesContainer.innerHTML = '';
            dietaryContainer.innerHTML = '';
            if (guestCountSelect) {
                guestCountSelect.value = '';
            }
        }
    });
}

// Generate guest name fields when count changes
if (guestCountSelect) {
    guestCountSelect.addEventListener('change', function() {
        const count = parseInt(this.value);
        if (!isNaN(count) && count > 0) {
            generateGuestFields(count);
            generateDietaryFields(count);
            dietaryContainer.style.display = 'block';
        } else {
            guestNamesContainer.innerHTML = '';
            dietaryContainer.innerHTML = '';
            dietaryContainer.style.display = 'none';
        }
    });
}

function generateGuestFields(count) {
    guestNamesContainer.innerHTML = '';
    
    // Add a title for the guest names section
    if (count > 0) {
        const titleDiv = document.createElement('div');
        titleDiv.className = 'guest-names-title';
        titleDiv.innerHTML = '<label>Guest Names</label>';
        guestNamesContainer.appendChild(titleDiv);
    }
    
    for (let i = 1; i <= count; i++) {
        const guestDiv = document.createElement('div');
        guestDiv.className = 'form-group guest-field';
        guestDiv.innerHTML = `
            <label for="guest_${i}">Guest ${i} ${i === 1 ? '(Primary Contact)' : 'Full Name'}</label>
            <input type="text" id="guest_${i}" name="guest_${i}" placeholder="${i === 1 ? ' ' : ' '}" ${i === 1 ? '' : 'required'}>
        `;
        guestNamesContainer.appendChild(guestDiv);
        
        // Auto-fill first guest with primary name
        if (i === 1) {
            setTimeout(() => {
                const primaryName = document.getElementById('primary-name');
                const guest1 = document.getElementById('guest_1');
                if (primaryName && guest1) {
                    guest1.value = primaryName.value;
                    
                    // Remove any existing listeners before adding new one
                    const newPrimaryName = primaryName.cloneNode(true);
                    primaryName.parentNode.replaceChild(newPrimaryName, primaryName);
                    
                    document.getElementById('primary-name').addEventListener('input', function() {
                        const currentGuest1 = document.getElementById('guest_1');
                        if (currentGuest1) {
                            currentGuest1.value = this.value;
                        }
                    });
                }
            }, 50);
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
        }, index * 50);
    });
}

function generateDietaryFields(count) {
    dietaryContainer.innerHTML = '';
    
    // Add a title for the dietary section
    const titleDiv = document.createElement('div');
    titleDiv.className = 'dietary-title';
    titleDiv.innerHTML = '<label>Dietary Requirements</label>';
    dietaryContainer.appendChild(titleDiv);
    
    for (let i = 1; i <= count; i++) {
        const dietaryDiv = document.createElement('div');
        dietaryDiv.className = 'form-group dietary-field';
        dietaryDiv.innerHTML = `
            <label for="dietary_${i}">Guest ${i} Dietary Requirements</label>
            <input type="text" id="dietary_${i}" name="dietary_${i}" placeholder="Any allergies or dietary restrictions">
        `;
        dietaryContainer.appendChild(dietaryDiv);
    }
    
    // Add animation
    const fields = dietaryContainer.querySelectorAll('.dietary-field');
    fields.forEach((field, index) => {
        field.style.opacity = '0';
        field.style.transform = 'translateY(10px)';
        setTimeout(() => {
            field.style.transition = 'all 0.3s ease';
            field.style.opacity = '1';
            field.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

// RSVP Form Submit Handler - using Netlify Forms
if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate that guest names are filled if attending
        const attending = document.getElementById('attending').value;
        if (attending === 'yes') {
            const guestCount = document.getElementById('guest-count').value;
            if (!guestCount || guestCount === '') {
                alert('Please select the number of guests attending.');
                return false;
            }
        }
        
        // Show a loading state on the button
        const submitBtn = this.querySelector('.btn-submit');
        if (submitBtn) {
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
        }
        
        // Submit form using fetch API for better handling
        const formData = new FormData(rsvpForm);
        
        fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        })
        .then(() => {
            // Show success message
            alert('Thank you for your RSVP! We\'ll be in touch soon.');
            // Reset form
            rsvpForm.reset();
            guestCountGroup.style.display = 'none';
            dietaryContainer.style.display = 'none';
            guestNamesContainer.innerHTML = '';
            dietaryContainer.innerHTML = '';
            
            // Reset button
            submitBtn.textContent = 'Send RSVP';
            submitBtn.disabled = false;
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error sending your RSVP. Please try again.');
            
            // Reset button
            submitBtn.textContent = 'Send RSVP';
            submitBtn.disabled = false;
        });
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