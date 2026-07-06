"use strict";

/* ==========================================================
   CAFE WEBSITE APPLICATION
========================================================== */

const App = {
    init() {
        this.cacheElements();
        this.bindEvents();
        this.setupContactForm();

        console.log("Brew Haven Cafe Initialized");
    },

    cacheElements() {
        this.body = document.body;
        this.navToggle = document.querySelector(".nav-toggle");
        this.navList = document.querySelector(".nav-list");
        this.navLinks = document.querySelectorAll(".nav-link");
        this.contactForm = document.querySelector(".contact-form");
        this.formMessage = document.querySelector(".form-message");
        this.scrollToTopButton = document.querySelector(".scroll-to-top");
    },

    bindEvents() {
        this.navToggle?.addEventListener("click", () => {
            this.toggleMobileMenu();
        });

        this.navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                this.closeMobileMenu();
            });
        });

        document.addEventListener("click", (event) => {
            this.handleOutsideClick(event);
        });

        document.addEventListener("keydown", (event) => {
            this.handleKeydown(event);
        });

        window.addEventListener("scroll", () => {
            this.updateScrollToTopVisibility();
        }, { passive: true });

        this.scrollToTopButton?.addEventListener("click", () => {
            this.scrollToPageTop();
        });
    },

    toggleMobileMenu() {
        const isOpen = this.body.classList.toggle("nav-open");

        this.navToggle.setAttribute("aria-expanded", String(isOpen));
        this.navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    },

    closeMobileMenu() {
        if (!this.body.classList.contains("nav-open")) {
            return;
        }

        this.body.classList.remove("nav-open");
        this.navToggle?.setAttribute("aria-expanded", "false");
        this.navToggle?.setAttribute("aria-label", "Open menu");
    },

    handleOutsideClick(event) {
        if (!this.body.classList.contains("nav-open")) {
            return;
        }

        const clickedInsideMenu = this.navList?.contains(event.target);
        const clickedToggle = this.navToggle?.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {
            this.closeMobileMenu();
        }
    },

    handleKeydown(event) {
        if (event.key === "Escape") {
            this.closeMobileMenu();
        }
    },

    setupContactForm() {
        if (!this.contactForm) {
            return;
        }

        this.contactForm.addEventListener("submit", (event) => {
            this.handleFormSubmit(event);
        });
    },

    handleFormSubmit(event) {
        event.preventDefault();
        this.clearMessage();

        const formData = new FormData(this.contactForm);
        const fullName = String(formData.get("full-name") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const subject = String(formData.get("subject") || "").trim();
        const message = String(formData.get("message") || "").trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!fullName || !email || !subject || !message) {
            this.showMessage("Please fill in all required fields.", "error");
            return;
        }

        if (!emailPattern.test(email)) {
            this.showMessage("Please enter a valid email address.", "error");
            return;
        }

        this.showMessage("Thank you! Your message has been received.", "success");
        this.contactForm.reset();
    },

    showMessage(message, type) {
        if (!this.formMessage) {
            return;
        }

        this.formMessage.textContent = message;
        this.formMessage.className = `form-message show ${type}`;

        window.setTimeout(() => {
            this.clearMessage();
        }, 4000);
    },

    clearMessage() {
        if (!this.formMessage) {
            return;
        }

        this.formMessage.textContent = "";
        this.formMessage.className = "form-message";
    },

    updateScrollToTopVisibility() {
        if (!this.scrollToTopButton) {
            return;
        }

        this.scrollToTopButton.classList.toggle("is-visible", window.scrollY > 350);
    },

    scrollToPageTop() {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? "auto" : "smooth"
        });
    }
};

/* ==========================================================
   START APPLICATION
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    App.init();
});
