document.addEventListener("DOMContentLoaded", () => {
  // Toggle dark/light mode
  const toggleBtn = document.getElementById("toggleTheme");
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggleBtn.textContent = document.body.classList.contains("dark") 
      ? "☀️ Claro" 
      : "🌙 Oscuro";
  });

  // Acciones de íconos
  const actions = {
    location: () => alert("Ubicación: Rosario, Santa Fe, Argentina"),
    phone: () => window.open("tel:+5493412420807"),
    email: () => window.open("mailto:Jeffry2001q@gmail.com"),
    linkedin: () => window.open("https://www.linkedin.com/in/jeffry-quispe/", "_blank")
  };

  document.querySelectorAll(".contact-item i").forEach(icon => {
    icon.addEventListener("click", () => {
      const action = icon.dataset.action;
      if (actions[action]) actions[action]();
    });
  });
});
