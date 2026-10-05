// Edit these to change the typing effect
const roles = ["Gorilla Tag modder", "C# developer", "app maker", "website builder"];
const typed = document.getElementById("typed");
let r = 0, c = 0, del = false;
function type() {
  const word = roles[r];
  typed.textContent = word.slice(0, c);
  if (!del && c === word.length) { del = true; return setTimeout(type, 1400); }
  if (del && c === 0) { del = false; r = (r + 1) % roles.length; }
  c += del ? -1 : 1;
  setTimeout(type, del ? 40 : 90);
}
type();

// Live clock (change the timeZone to yours)
const clock = document.getElementById("clock");
function tick() {
  clock.textContent = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit", timeZone: "America/New_York" });
}
tick(); setInterval(tick, 30000);

// Dark mode, remembered between visits
const root = document.documentElement;
try { const t = localStorage.getItem("theme"); if (t) root.dataset.theme = t; } catch (e) {}
document.getElementById("theme").addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// Project filters
document.querySelectorAll(".chip").forEach(chip => chip.addEventListener("click", () => {
  document.querySelectorAll(".chip").forEach(x => x.classList.remove("on"));
  chip.classList.add("on");
  document.querySelectorAll(".card").forEach(card =>
    card.classList.toggle("hide", chip.dataset.f !== "all" && card.dataset.t !== chip.dataset.f));
}));

// Skill bars fill when scrolled into view
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add("show"); }), { threshold: .4 });
document.querySelectorAll(".skill").forEach(s => io.observe(s));

// Contact form opens the visitor's email app (change the address)
document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(e.target);
  location.href = "mailto:aceutilsdevelopment@gmail.com?subject=" + encodeURIComponent("Hello from " + f.get("name")) + "&body=" + encodeURIComponent(f.get("message"));
});

document.getElementById("year").textContent = new Date().getFullYear();
