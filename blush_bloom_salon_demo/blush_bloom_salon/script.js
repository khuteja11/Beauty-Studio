// Blush & Bloom demo interactions
// IMPORTANT: Replace this with the salon owner's WhatsApp number, including country code,
// but without +, spaces, or dashes. Example format for India: 919876543210.
const SALON_WHATSAPP_NUMBER = "919876543210";

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const bookingForm = document.getElementById("bookingForm");
const formStatus = document.getElementById("formStatus");
const year = document.getElementById("year");
const preferredDate = document.getElementById("preferredDate");

year.textContent = new Date().getFullYear();

// Prevent visitors from selecting a date in the past.
if (preferredDate) {
  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
  preferredDate.min = localToday;
}

// Mobile navigation toggle.
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

// Service links preselect the service in the enquiry form.
document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    const serviceSelect = document.getElementById("customerService");
    serviceSelect.value = link.dataset.service;
  });
});

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!bookingForm.reportValidity()) return;

  if (!/^\d{10,15}$/.test(SALON_WHATSAPP_NUMBER) || SALON_WHATSAPP_NUMBER === "919876543210") {
    formStatus.textContent = "Demo mode: replace SALON_WHATSAPP_NUMBER in script.js with the salon's real WhatsApp number to test booking enquiries.";
    return;
  }

  const name = document.getElementById("customerName").value.trim();
  const service = document.getElementById("customerService").value;
  const date = document.getElementById("preferredDate").value || "Flexible";
  const message = document.getElementById("customerMessage").value.trim();

  const text = [
    "Hello Blush & Bloom Beauty Studio!",
    "",
    `My name is ${name}.`,
    `I'm interested in: ${service}.`,
    `Preferred date: ${date}.`,
    message ? `Additional details: ${message}` : "",
    "",
    "Please let me know the available appointment times and pricing."
  ].filter(Boolean).join("\n");

  const whatsappUrl = `https://wa.me/${SALON_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  formStatus.textContent = "WhatsApp opened in a new tab. Please send the message there to complete your enquiry.";
});
