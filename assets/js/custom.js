$(document).ready(function () {
  // Check if target time is stored in local storage
  var targetTime = localStorage.getItem("targetTime");

  if (!targetTime) {
    // If not stored, set a new target time (18 hours, 60 minutes, 24 seconds)
    targetTime = new Date();
    targetTime.setHours(targetTime.getHours() + 18);
    targetTime.setMinutes(targetTime.getMinutes() + 24);
    targetTime.setSeconds(targetTime.getSeconds() + 10);

    // Store the target time in local storage
    localStorage.setItem("targetTime", targetTime);
  } else {
    // If target time is stored, parse it
    targetTime = new Date(targetTime);
  }

  function updateCountdown() {
    var currentTime = new Date();
    var remainingTime = targetTime - currentTime;

    if (remainingTime <= 0) {
      $("#hours_counter").text("00");
      $("#minutes_counter").text("00");
      $("#seconds_counter").text("00");
      clearInterval(intervalId);
      // Clear the target time from local storage when the countdown expires
      localStorage.removeItem("targetTime");
      return;
    }

    var hours = Math.floor(remainingTime / 3600000);
    var minutes = Math.floor((remainingTime % 3600000) / 60000);
    var seconds = Math.floor((remainingTime % 60000) / 1000);

    $("#hours_counter").text(pad(hours));
    $("#minutes_counter").text(pad(minutes));
    $("#seconds_counter").text(pad(seconds));
  }

  // Update every second (1000 milliseconds)
  var intervalId = setInterval(updateCountdown, 1000);

  // Function to pad single-digit numbers with leading zeros
  function pad(num) {
    return (num < 10 ? "0" : "") + num;
  }

  //Faqs
  jQuery(".faqs .question").on("click", function (e) {
    e.preventDefault();
    jQuery(this).parent().toggleClass("active");
    jQuery(this).next().slideToggle();
  });
  jQuery(".faqs .question").first().click();
});

// Animation on scroll
        document.addEventListener('DOMContentLoaded', function() {
            const animateOnScroll = function() {
                const elements = document.querySelectorAll('.about-title, .about-text, .about-list li');
                elements.forEach(element => {
                    const elementPosition = element.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (elementPosition < windowHeight - 100) {
                        if (element.classList.contains('about-title')) {
                            element.style.animation = `slideInLeft ${getComputedStyle(element).getPropertyValue('--animation-duration')} ease-out forwards`;
                        } else {
                            element.style.animation = `fadeIn ${getComputedStyle(element).getPropertyValue('--animation-duration')} ease-out forwards`;
                        }
                    }
                });
            };
            
            window.addEventListener('scroll', animateOnScroll);
            animateOnScroll(); // Run once on load
        });
