/**
 * Template Name: Logis
 * Template URL: https://bootstrapmade.com/logis-bootstrap-logistics-website-template/
 * Updated: Aug 07 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  mobileNavToggleBtn.addEventListener("click", mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document
    .querySelectorAll(".faq-item h3, .faq-item .faq-toggle")
    .forEach((faqItem) => {
      faqItem.addEventListener("click", () => {
        faqItem.parentNode.classList.toggle("faq-active");
      });
    });

  // CHAT BOOT

  // Open chatbot modal
  document
    .getElementById("chatbot-widget")
    .addEventListener("click", function () {
      document.getElementById("chatbot-modal").style.display = "block";
    });

  // Close chatbot modal
  document
    .getElementById("close-chatbot")
    .addEventListener("click", function () {
      document.getElementById("chatbot-modal").style.display = "none";
    });

  // Gibberish detection function
  function isGibberish(message) {
    // Check for all uppercase with no spaces
    if (
      message === message.toUpperCase() &&
      !message.includes(" ") &&
      message.length > 5
    )
      return true;

    // Check for excessive consecutive consonants
    if (/([bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]{5,})/.test(message))
      return true;

    // Check for lack of vowels in longer messages
    const vowels = /[aeiouAEIOU]/;
    return message.length > 6 && !vowels.test(message);
  }

  // Chatbot logic
  document
    .getElementById("chatbot-input")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        const userMessage = this.value.trim();
        if (userMessage) {
          displayMessage(userMessage, "user");
          let botResponse;

          if (
            userMessage.toLowerCase().includes("hello") ||
            userMessage.toLowerCase().includes("hi") ||
            userMessage.toLowerCase().includes("assist") ||
            userMessage.toLowerCase().includes("help")
          ) {
            botResponse =
              'Hello! How can I assist you today? <br> If you need help, please <a href="contact.html">contact us here</a>.';
          } else if (isGibberish(userMessage)) {
            botResponse =
              "I'm sorry, I didn't understand that. Could you please rephrase your question?";
          } else {
            botResponse = "I’m here to help! Let me know if you need anything.";
          }

          setTimeout(() => {
            displayMessage(botResponse, "bot");
          }, 500);

          this.value = "";
        }
      }
    });

  // Function to display messages
  function displayMessage(message, sender) {
    const messagesContainer = document.getElementById("chatbot-messages");
    const messageElement = document.createElement("div");
    messageElement.innerHTML = message;
    messageElement.classList.add("message", sender);
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  // email
  (function () {
    emailjs.init("4j6X1UEgTVwzLpBXN");
  })();

  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const loading = document.querySelector(".loading");
      const errorMessage = document.querySelector(".error-message");
      const sentMessage = document.querySelector(".sent-message");

      loading.style.display = "block";
      errorMessage.style.display = "none";
      sentMessage.style.display = "none";

      emailjs.sendForm("service_fwti4nq", "template_63qsna9", this).then(
        () => {
          loading.style.display = "none";
          sentMessage.style.display = "block";
          this.reset();
        },
        (error) => {
          loading.style.display = "none";
          errorMessage.style.display = "block";
          errorMessage.textContent = "Error sending message: " + error.text;
        }
      );
    });
})();
