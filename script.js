// ==========================================================================
// SRIJOYEE GHOSH — PORTFOLIO CLIENT SCRIPTS
// ==========================================================================

const root = document.documentElement;

// 1. Aesthetic Theme Accent Selector
const themeButtons = document.querySelectorAll(".palette-swatches button, .picker button");

function setAccent(name) {
  if (!name) return;
  root.dataset.accent = name;
  themeButtons.forEach((b) => {
    const isCurrent = b.dataset.accent === name;
    b.setAttribute("aria-pressed", String(isCurrent));
  });
  try {
    localStorage.setItem("accent", name);
  } catch (e) {
    /* storage may be blocked */
  }
}

themeButtons.forEach((b) => {
  b.addEventListener("click", () => setAccent(b.dataset.accent));
});

// Load saved preference or default to yellow-blue
try {
  const savedAccent = localStorage.getItem("accent");
  const validAccents = ["yellow-blue", "cobalt", "sunflower", "cyan-gold", "navy-yellow"];
  if (savedAccent && validAccents.includes(savedAccent)) {
    setAccent(savedAccent);
  } else {
    setAccent("yellow-blue");
  }
} catch (e) {
  setAccent("yellow-blue");
}

// 2. Interactive Email Copy to Clipboard
const emailPill = document.getElementById("email-pill");
const copyBtn = document.getElementById("copy-btn");
const copyText = document.getElementById("copy-text");
const emailAddress = document.getElementById("email-address");

function copyEmailToClipboard() {
  if (!emailAddress) return;
  const email = emailAddress.textContent.trim();

  navigator.clipboard.writeText(email).then(() => {
    if (copyText) copyText.textContent = "Copied! ✓";
    if (copyBtn) copyBtn.classList.add("copied");

    setTimeout(() => {
      if (copyText) copyText.textContent = "Copy";
      if (copyBtn) copyBtn.classList.remove("copied");
    }, 2200);
  }).catch(() => {
    // Fallback if clipboard API is blocked
    const textarea = document.createElement("textarea");
    textarea.value = email;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      if (copyText) copyText.textContent = "Copied! ✓";
      if (copyBtn) copyBtn.classList.add("copied");
      setTimeout(() => {
        if (copyText) copyText.textContent = "Copy";
        if (copyBtn) copyBtn.classList.remove("copied");
      }, 2200);
    } catch (err) {}
    document.body.removeChild(textarea);
  });
}

if (emailPill) {
  emailPill.addEventListener("click", (e) => {
    // Avoid double triggering if button itself clicked
    copyEmailToClipboard();
  });
}
