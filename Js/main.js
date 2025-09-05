// Enhanced Modern Navbar Functionality
let isMobileMenuOpen = false;

// Mobile Menu Toggle
$('.mobile-menu-toggle').click(function() {
    if (!isMobileMenuOpen) {
        openMobileMenu();
    } else {
        closeMobileMenu();
    }
});

// Close mobile menu
$('.mobile-menu-close').click(function() {
    closeMobileMenu();
});

// Close mobile menu when clicking on overlay
$('.mobile-menu-overlay').click(function(e) {
    if (e.target === this) {
        closeMobileMenu();
    }
});

// Close mobile menu when clicking on navigation links
$('.mobile-nav-link').click(function() {
    closeMobileMenu();
});

// Keyboard support
$(document).keydown(function(event) {
    if (event.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
    }
});

function openMobileMenu() {
    $('.mobile-menu-overlay').addClass('active');
    $('.mobile-menu-toggle').addClass('active');
    $('body').css('overflow', 'hidden');
    isMobileMenuOpen = true;
    
    // Focus on close button
    setTimeout(() => {
        $('.mobile-menu-close').focus();
    }, 300);
}

function closeMobileMenu() {
    $('.mobile-menu-overlay').removeClass('active');
    $('.mobile-menu-toggle').removeClass('active');
    $('body').css('overflow', '');
    isMobileMenuOpen = false;
    
    // Return focus to toggle button
    $('.mobile-menu-toggle').focus();
}

// Navbar scroll effect
$(window).scroll(function() {
    const scrollTop = $(window).scrollTop();
    const navbar = $('.modern-navbar');
    
    if (scrollTop > 50) {
        navbar.addClass('scrolled');
    } else {
        navbar.removeClass('scrolled');
    }
});

// Active navigation link based on scroll position
$(window).scroll(function() {
    const scrollPos = $(window).scrollTop() + 100;
    
    $('.nav-link, .mobile-nav-link').removeClass('active');
    
    $('section[id]').each(function() {
        const section = $(this);
        const sectionTop = section.offset().top - 150;
        const sectionBottom = sectionTop + section.outerHeight();
        const sectionId = section.attr('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
            $(`.nav-link[href="#${sectionId}"], .mobile-nav-link[href="#${sectionId}"]`).addClass('active');
        }
    });
});
// Enhanced Artist Card Interactions
$('.expand-btn').click(function(e) {
  e.preventDefault();
  
  const $btn = $(this);
  const $card = $btn.closest('.artist-card');
  const $content = $card.find('.artist-content');
  const $chevron = $btn.find('i');
  
  // Close other cards for better UX
  $('.artist-card').not($card).each(function() {
    const $otherContent = $(this).find('.artist-content');
    const $otherBtn = $(this).find('.expand-btn');
    const $otherChevron = $otherBtn.find('i');
    
    if ($otherContent.hasClass('show')) {
      $otherContent.removeClass('show').slideUp(300);
      $otherBtn.removeClass('active');
      $otherChevron.css('transform', 'rotate(0deg)');
    }
  });
  
  // Toggle current card
  if ($content.hasClass('show')) {
    $content.removeClass('show').slideUp(300);
    $btn.removeClass('active');
    $chevron.css('transform', 'rotate(0deg)');
  } else {
    $content.addClass('show').slideDown(300);
    $btn.addClass('active');
    $chevron.css('transform', 'rotate(180deg)');
    
    // Smooth scroll to card for better UX
    $('html, body').animate({
      scrollTop: $card.offset().top - 100
    }, 400);
  }
});

// Add keyboard support for artist cards
$('.expand-btn').keydown(function(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    $(this).click();
  }
});
// Enhanced Countdown Function
function getCounter(){
  let countDown = new Date("Dec 31, 2023 20:00:00").getTime();
  let current = new Date().getTime();
  let timeLeft = countDown - current;
  
  if (timeLeft > 0) {
    let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    // Update numbers with animation
    updateCountdownNumber("#days .time-number", days);
    updateCountdownNumber("#hours .time-number", hours);
    updateCountdownNumber("#minutes .time-number", minutes);
    updateCountdownNumber("#seconds .time-number", seconds);
    
    // Update progress bars
    updateProgressBar("#days .progress-bar", days, 365);
    updateProgressBar("#hours .progress-bar", hours, 24);
    updateProgressBar("#minutes .progress-bar", minutes, 60);
    updateProgressBar("#seconds .progress-bar", seconds, 60);
  } else {
    // Party has started!
    $("#days .time-number, #hours .time-number, #minutes .time-number, #seconds .time-number").text("00");
    $(".countdown-title").text("Party Time!");
    $(".countdown-subtitle").text("The celebration has begun! 🎉");
  }
}

function updateCountdownNumber(selector, value) {
  const $element = $(selector);
  const currentValue = $element.text();
  const newValue = value.toString().padStart(2, '0');
  
  if (currentValue !== newValue) {
    $element.fadeOut(200, function() {
      $(this).text(newValue).fadeIn(200);
    });
  }
}

function updateProgressBar(selector, current, max) {
  const percentage = (current / max) * 100;
  $(selector).css('width', percentage + '%');
}

setInterval(function(){getCounter();},1000)
  
    
// Enhanced Form Handling
$('#message').keyup(function() {
  let max = 200;
  let current = $(this).val().length;
  const $charCount = $('#char');
  
  if (current >= max) {
    $charCount.text('0').css('color', '#dc3545');
    $('.count-label').text('character limit reached');
  } else {
    let remaining = max - current;
    $charCount.text(remaining).css('color', remaining < 20 ? '#dc3545' : '#E68285');
    $('.count-label').text('characters remaining');
  }
});

// Form Submission with Loading State
$('#partyRegistrationForm').submit(function(e) {
  e.preventDefault();
  
  const $form = $(this);
  const $submitBtn = $('.submit-btn');
  
  // Add loading state
  $submitBtn.addClass('loading').prop('disabled', true);
  
  // Simulate form submission (replace with actual submission logic)
  setTimeout(function() {
    // Success state
    $submitBtn.removeClass('loading').prop('disabled', false);
    $submitBtn.html('<i class="fas fa-check me-2"></i>Registration Successful!');
    $submitBtn.css('background', 'linear-gradient(135deg, #28a745, #20c997)');
    
    // Show success message
    showNotification('Registration successful! We\'ll contact you soon.', 'success');
    
    // Reset form after delay
    setTimeout(function() {
      $form[0].reset();
      $submitBtn.html('<span class="btn-content"><i class="fas fa-paper-plane me-2"></i>Reserve My Spot</span><div class="btn-loader"><i class="fas fa-spinner fa-spin"></i></div>');
      $submitBtn.css('background', 'linear-gradient(135deg, #E68285 0%, #D96668 100%)');
      $('#char').text('200').css('color', '#E68285');
    }, 3000);
    
  }, 2000);
});

// Notification System
function showNotification(message, type = 'info') {
  const notification = $(`
    <div class="notification notification-${type}" style="
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#28a745' : '#E68285'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      z-index: 9999;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    ">
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>
      ${message}
    </div>
  `);
  
  $('body').append(notification);
  
  setTimeout(() => {
    notification.css('transform', 'translateX(0)');
  }, 100);
  
  setTimeout(() => {
    notification.css('transform', 'translateX(100%)');
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

// Smooth scrolling for navigation links
$('a[href^="#"]').click(function(event) {
    event.preventDefault();
    
    const target = $(this.getAttribute('href'));
    if (target.length) {
        $('html, body').animate({
            scrollTop: target.offset().top - 80 // Offset for fixed elements
        }, 800, 'swing');
    }
});

// Add active state to navigation links based on scroll position
$(window).scroll(function() {
    const scrollPos = $(window).scrollTop() + 100;
    
    $('a[href^="#"]').each(function() {
        const target = $(this.getAttribute('href'));
        if (target.length) {
            if (target.offset().top <= scrollPos && target.offset().top + target.outerHeight() > scrollPos) {
                $('a[href^="#"]').removeClass('active');
                $(this).addClass('active');
            }
        }
    });
});