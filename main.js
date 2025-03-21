document.addEventListener('DOMContentLoaded', function() {
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');

    navbarToggle.addEventListener('click', function() {
        navbarMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navbarMenu.contains(event.target);
        const isClickOnToggle = navbarToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && navbarMenu.classList.contains('active')) {
            navbarMenu.classList.remove('active');
        }
    });

    // Countdown Timer functionality
    const countdownDate = new Date('December 27, 2025 00:00:00').getTime();
    let previousValues = {
        days: '',
        hours: '',
        minutes: '',
        seconds: ''
    };

    function animateValue(element) {
        element.classList.add('animate');
        setTimeout(() => {
            element.classList.remove('animate');
        }, 300);
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');

        const currentValues = {
            days: days.toString().padStart(3, '0'),
            hours: hours.toString().padStart(2, '0'),
            minutes: minutes.toString().padStart(2, '0'),
            seconds: seconds.toString().padStart(2, '0')
        };

        // Check and update each value with animation if changed
        if (currentValues.days !== previousValues.days) {
            daysElement.innerHTML = currentValues.days;
            animateValue(daysElement);
        }
        if (currentValues.hours !== previousValues.hours) {
            hoursElement.innerHTML = currentValues.hours;
            animateValue(hoursElement);
        }
        if (currentValues.minutes !== previousValues.minutes) {
            minutesElement.innerHTML = currentValues.minutes;
            animateValue(minutesElement);
        }
        if (currentValues.seconds !== previousValues.seconds) {
            secondsElement.innerHTML = currentValues.seconds;
            animateValue(secondsElement);
        }

        // Update previous values
        previousValues = {...currentValues};

        if (distance < 0) {
            clearInterval(countdownInterval);
            daysElement.innerHTML = '000';
            hoursElement.innerHTML = '00';
            minutesElement.innerHTML = '00';
            secondsElement.innerHTML = '00';
        }
    }

    updateCountdown(); // Initial call
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Scroll Animation Observer
    const scrollAnimationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Add 'active' class when element is in view
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it's a stagger animation container, animate its children
                if (entry.target.classList.contains('stagger-animation')) {
                    entry.target.querySelectorAll('*').forEach(child => {
                        child.classList.add('active');
                    });
                }
            }
        });
    }, {
        threshold: 0.1, // Trigger when at least 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before the element comes into view
    });

    // Get all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-up, .fade-in, .slide-in-left, .slide-in-right, .scale-up, .stagger-animation');

    // Observe each animated element
    animatedElements.forEach(element => {
        scrollAnimationObserver.observe(element);
    });
}); 