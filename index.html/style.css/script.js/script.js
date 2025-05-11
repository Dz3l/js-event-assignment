// Event Handling
const actionBtn = document.getElementById('action-btn');
const actionMessage = document.getElementById('action-message');

actionBtn.addEventListener('click', () => {
    actionBtn.textContent = 'Clicked!';
    actionBtn.style.backgroundColor = '#28a745';
    actionMessage.textContent = 'Button clicked! Try hovering or double-clicking!';
    setTimeout(() => {
        actionBtn.textContent = 'Click Me!';
        actionBtn.style.backgroundColor = '#1a73e8';
    }, 1000);
});

actionBtn.addEventListener('mouseover', () => {
    actionMessage.textContent = 'Hovering! Double-click for a surprise!';
});

actionBtn.addEventListener('dblclick', () => {
    actionMessage.textContent = 'Double-click detected! You found the secret!';
    actionBtn.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        actionBtn.style.transform = 'rotate(0deg)';
    }, 500);
});

document.addEventListener('keypress', (e) => {
    actionMessage.textContent = `Key pressed: ${e.key.toUpperCase()}! Keep typing!`;
});

// Slideshow
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Accordion
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const isActive = content.classList.contains('active');
        
        // Close all other accordion items
        document.querySelectorAll('.accordion-content').forEach(item => {
            item.classList.remove('active');
        });
        
        // Toggle the clicked item
        if (!isActive) {
            content.classList.add('active');
        }
    });
});

// Form Validation
const form = document.getElementById('contactForm');
const inputs = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    password: document.getElementById('password')
};
const errors = {
    name: document.getElementById('name-error'),
    email: document.getElementById('email-error'),
    password: document.getElementById('password-error')
};

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateField(input, errorElement, validationFn, errorMessage) {
    const value = input.value.trim();
    if (!value) {
        errorElement.textContent = 'This field is required';
        return false;
    } else if (validationFn && !validationFn(value)) {
        errorElement.textContent = errorMessage;
        return false;
    }
    errorElement.textContent = '';
    return true;
}

// Real-time validation
Object.values(inputs).forEach(input => {
    input.addEventListener('input', () => {
        const name = input.name;
        if (name === 'name') {
            validateField(inputs.name, errors.name, null, '');
        } else if (name === 'email') {
            validateField(inputs.email, errors.email, validateEmail, 'Please enter a valid email');
        } else if (name === 'password') {
            validateField(inputs.password, errors.password, val => val.length >= 8, 'Password must be at least 8 characters');
        }
    });
});

// Form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const isValid = [
        validateField(inputs.name, errors.name, null, ''),
        validateField(inputs.email, errors.email, validateEmail, 'Please enter a valid email'),
        validateField(inputs.password, errors.password, val => val.length >= 8, 'Password must be at least 8 characters')
    ].every(Boolean);

    if (isValid) {
        alert('Form submitted successfully!');
        form.reset();
        Object.values(errors).forEach(error => error.textContent = '');
    }
});