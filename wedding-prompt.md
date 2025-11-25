# Claude Code Prompt: Beach Chic Wedding Website

Copy and paste this entire prompt into Claude Code:

---

## PROMPT START

I need you to build a complete, elegant beach chic wedding website for **Amilee & Mitchell** getting married on **May 23, 2026** at **Salt Rock Hotel, KwaZulu-Natal, South Africa**.

### DESIGN INSPIRATION & AESTHETIC

The design should match the "Coastal Bride Vibes" aesthetic - think moody ocean, elegant typography, and sophisticated beach chic. NOT bright tropical - this is refined, muted, and luxurious.

### EXACT COLOR PALETTE (Use these CSS variables)

```css
:root {
  /* Primary - Moody Ocean */
  --ocean-dark: #3D5A5B;        /* Deep moody teal */
  --ocean-mid: #5A7A7C;         /* Muted ocean teal */
  --ocean-light: #7A9A9C;       /* Soft sea foam */
  
  /* Neutrals - Sand & Stone */
  --sand-light: #E8E4DE;        /* Light sand */
  --sand-mid: #D4CFC6;          /* Warm sand */
  --cream: #F5F3EF;             /* Cream background */
  --stone: #8B8680;             /* Warm grey stone */
  
  /* Accent - Champagne & Blush */
  --champagne: #C9B896;         /* Champagne gold */
  --blush: #D4B8A8;             /* Soft blush */
  --rose-gold: #B8A090;         /* Muted rose gold */
  
  /* Text */
  --text-dark: #2C3E3E;         /* Dark teal text */
  --text-light: #F5F3EF;        /* Light cream text */
}
```

### TYPOGRAPHY (Google Fonts)

```css
/* Import these fonts */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Josefin+Sans:wght@300;400&display=swap');

/* Usage */
--font-serif: 'Cormorant Garamond', serif;    /* For headings, names */
--font-sans: 'Josefin Sans', sans-serif;      /* For body, labels */
```

### HERO SECTION REQUIREMENTS

1. **Full viewport height** (100vh) hero section
2. **Background**: Ocean/beach image with subtle dark overlay for text readability
   - Use a placeholder gradient for now: `linear-gradient(to bottom, #3D5A5B 0%, #5A7A7C 50%, #7A9A9C 100%)`
   - Add a comment showing where to add the background image
3. **Layout** (centered, vertical stack):
   - Small caps text: "THE WEDDING OF" (letter-spacing: 0.3em, font-size: 0.9rem)
   - Large elegant names: "Amilee" in serif with decorative script "&" then "Mitchell"
   - Bottom row: Date "MAY 23, 2026" on left | Location "SALT ROCK HOTEL" on right
4. **Animations**: Subtle fade-in on load (staggered timing for each element)
5. **Text color**: Cream/champagne (#F5F3EF or #C9B896)

### NAVIGATION

- Fixed position, transparent background that becomes solid on scroll
- Simple text links: HOME | OUR STORY | DETAILS | TRAVEL | RSVP | REGISTRY
- Elegant hover effects (underline animation or color shift)
- Font: Josefin Sans, uppercase, letter-spacing: 0.15em

### SECTIONS TO INCLUDE

**1. Hero** (as described above)

**2. Countdown Timer Section**
- Elegant countdown to May 23, 2026 at 4:00 PM
- Display: Days | Hours | Minutes | Seconds
- Style: Large serif numbers with small sans-serif labels
- Background: Cream (#F5F3EF)

**3. Our Story Section**
- Two-column layout (image left, text right on desktop)
- Image placeholder with decorative frame/border
- Heading: "Our Story" in elegant serif
- Paragraph text about the couple (placeholder lorem ipsum is fine)
- Subtle background texture or pattern

**4. Wedding Details Section**
- Three elegant cards side by side:
  - **Ceremony** (time, brief description)
  - **Reception** (time, brief description)  
  - **Dress Code** (Beach Formal)
- Cards should have subtle shadows, hover effects
- Icons optional (use simple line icons if included)

**5. Venue/Travel Section**
- Information about Salt Rock Hotel
- Map embed placeholder
- Accommodation recommendations
- Background: Soft sand color

**6. RSVP Section**
- Elegant form with fields: Name, Email, Attending (Yes/No), Dietary Requirements, Message
- Styled inputs with bottom-border focus effects
- Submit button with hover animation
- Background: Ocean teal gradient

**7. Gift Registry Section**
- Simple, elegant messaging
- Link buttons to registry sites
- Background: Cream

**8. Footer**
- Couple's initials or monogram: "A & M"
- Date: "05.23.2026"
- Optional: Social media links, hashtag
- Background: Dark ocean teal

### SPECIFIC STYLING REQUIREMENTS

**Buttons:**
```css
.btn {
  padding: 1rem 2.5rem;
  border: 1px solid var(--champagne);
  background: transparent;
  color: var(--champagne);
  font-family: var(--font-sans);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.btn:hover {
  background: var(--champagne);
  color: var(--text-dark);
}
```

**Section Titles:**
```css
.section-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  color: var(--ocean-dark);
  letter-spacing: 0.05em;
}
```

**Animations:**
- Use CSS animations for fade-ins
- Intersection Observer for scroll-triggered animations
- Subtle, elegant - nothing flashy

### RESPONSIVE DESIGN

- Mobile-first approach
- Breakpoints: 640px, 768px, 1024px, 1280px
- Navigation becomes hamburger menu on mobile
- Two-column sections stack on mobile
- Adjust font sizes with clamp()

### FILE STRUCTURE

```
wedding-website/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js          (countdown, nav scroll, animations)
├── images/
│   └── (placeholder for images)
└── README.md
```

### TECHNICAL REQUIREMENTS

1. **Pure HTML, CSS, JavaScript** - no frameworks
2. **Semantic HTML5** elements
3. **CSS custom properties** for all colors
4. **Mobile responsive** 
5. **Smooth scroll** behavior
6. **Accessibility**: proper ARIA labels, focus states, color contrast
7. **Performance**: optimized CSS, minimal JS

### SAMPLE HERO HTML STRUCTURE

```html
<section class="hero">
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <p class="hero-subtitle">The Wedding of</p>
    <h1 class="hero-names">
      <span class="name">Amilee</span>
      <span class="ampersand">&</span>
      <span class="name">Mitchell</span>
    </h1>
    <div class="hero-details">
      <span class="hero-date">May 23, 2026</span>
      <span class="hero-location">Salt Rock Hotel</span>
    </div>
  </div>
</section>
```

### IMPORTANT NOTES

- Keep the design **elegant and minimal** - less is more
- All text should be easily readable
- Use **generous whitespace** between sections
- The overall feel should be: sophisticated, romantic, coastal, timeless
- This is NOT a bright, tropical beach wedding - it's **moody, refined beach chic**
- Think: luxury resort aesthetic, not beach party

Please create all the files with complete, working code. Include helpful comments in the code explaining customization points (like where to add images, change text, etc.).

---

## PROMPT END

---

## ADDITIONAL FOLLOW-UP PROMPTS

After the initial build, you can ask Claude Code:

### To add specific features:
- "Add a photo gallery section with a lightbox effect"
- "Add a wedding party section with bridesmaid/groomsman profiles"
- "Add an FAQ accordion section"
- "Add a timeline/schedule section for the wedding day"

### To customize:
- "Change the color scheme to be more [blue/green/neutral]"
- "Make the typography more [modern/traditional/romantic]"
- "Add more animations to the sections"
- "Create a dark mode version"

### To add functionality:
- "Connect the RSVP form to Google Sheets"
- "Add a save-the-date calendar download button"
- "Add background music toggle"
- "Create a password-protected guest area"

### To add images:
- "Add CSS for a hero section with a video background"
- "Show me how to add a parallax scrolling effect to the images"
- "Create image placeholders with the exact dimensions needed"

---

## QUICK REFERENCE - KEY DESIGN ELEMENTS

| Element | Style |
|---------|-------|
| Primary Font | Cormorant Garamond (serif) |
| Secondary Font | Josefin Sans (sans-serif) |
| Main Color | #3D5A5B (moody ocean teal) |
| Accent Color | #C9B896 (champagne) |
| Background | #F5F3EF (cream) |
| Text on Dark | #F5F3EF (cream) |
| Text on Light | #2C3E3E (dark teal) |
| Aesthetic | Beach Chic / Coastal Elegance / Moody Ocean |
| Vibe | Sophisticated, Romantic, Timeless, Refined |
