// Accent color picker: sets data-accent on <html> and remembers the choice.
const root = document.documentElement;
const buttons = document.querySelectorAll(".picker button");

function setAccent(name) {
  root.dataset.accent = name;
  buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.accent === name)));
  try { localStorage.setItem("accent", name); } catch (e) { /* storage may be blocked */ }
}

buttons.forEach((b) => b.addEventListener("click", () => setAccent(b.dataset.accent)));

try {
  const saved = localStorage.getItem("accent");
  if (saved) setAccent(saved);
} catch (e) { /* ignore */ }
