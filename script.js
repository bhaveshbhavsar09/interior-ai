// Planner Logic
function getSuggestion() {
  const room = document.getElementById("room")?.value || "living";
  const style = document.getElementById("style")?.value || "minimalist";
  const color = document.getElementById("color")?.value || "warm";
  
  const gallery = document.getElementById("gallery");
  const resultsContent = document.getElementById("results-content");
  const loadingState = document.getElementById("loading-state");
  
  if(gallery) gallery.style.display = "block";
  if(resultsContent) resultsContent.style.display = "none";
  if(loadingState) loadingState.style.display = "block";
  
  setTimeout(() => {
    if(loadingState) loadingState.style.display = "none";
    if(resultsContent) resultsContent.style.display = "block";
    
    let suggestion = `A stunning ${style} ${room} featuring ${color} tones.`;
    let imagePaths = [];
    let colors = [];
    let products = [];

    if (room === "living") {
      suggestion += " Focus on a comfortable seating area, a statement rug, and ambient lighting.";
      imagePaths = ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop"];
      products = [
        {name: "Velvet Sofa", price: "$899", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200"},
        {name: "Abstract Rug", price: "$150", img: "https://images.unsplash.com/photo-1579656592043-a20d25a4aa4b?w=200"}
      ];
    } else if (room === "bedroom") {
      suggestion += " Layered bedding, soft textures, and a calming atmosphere are key.";
      imagePaths = ["https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1615874959474-2d3d7e1a8f8a?w=800&h=600&fit=crop"];
      products = [
        {name: "Linen Duvet Set", price: "$120", img: "https://images.unsplash.com/photo-1584100936595-c0654b355040?w=200"},
        {name: "Bedside Lamp", price: "$45", img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200"}
      ];
    } else {
      suggestion += " Functional layout with a cohesive aesthetic.";
      imagePaths = ["https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop"];
      products = [
        {name: "Modern Chair", price: "$199", img: "https://images.unsplash.com/photo-1506898667547-42e22a46e125?w=200"}
      ];
    }

    if (color === "warm") colors = ["#d4a373", "#faedcd", "#fefae0", "#e9edc9"];
    else if (color === "cool") colors = ["#caf0f8", "#90e0ef", "#00b4d8", "#0077b6"];
    else if (color === "monochromatic") colors = ["#ced4da", "#adb5bd", "#6c757d", "#495057"];
    else colors = ["#ffcbf2", "#f3c4fb", "#ecbcfd", "#e5b3fe"];

    const suggestionText = document.getElementById("suggestion-text");
    if(suggestionText) suggestionText.innerText = suggestion;
    
    renderImages(imagePaths, `${style} ${room}`, "suggestion-image");
    renderPalette(colors);
    renderProducts(products);
    
    // Re-initialize tilt for new elements
    initTilt();
    
    if(gallery) gallery.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 2000); // 2 second delay to show off skeleton loader
}

function renderImages(imagePaths, altPrefix, targetId) {
  const container = document.getElementById(targetId);
  if (!container) return;
  
  const gallery = document.createElement("div");
  gallery.className = "image-gallery";
  imagePaths.forEach((path, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "tilt-card";
    const image = document.createElement("img");
    image.src = path;
    image.alt = `${altPrefix} ${index + 1}`;
    image.loading = "lazy";
    image.className = "tilt-card-inner";
    wrapper.appendChild(image);
    gallery.appendChild(wrapper);
  });
  container.replaceChildren(gallery);
}

function renderPalette(colors) {
  const container = document.getElementById("color-palette");
  if(!container) return;
  container.innerHTML = "";
  colors.forEach(hex => {
    const swatch = document.createElement("div");
    swatch.className = "color-swatch";
    swatch.style.backgroundColor = hex;
    const label = document.createElement("span");
    label.innerText = hex;
    swatch.appendChild(label);
    container.appendChild(swatch);
  });
}

function renderProducts(products) {
  const container = document.getElementById("shoppable-items");
  if(!container) return;
  container.innerHTML = "";
  products.forEach(p => {
    const wrapper = document.createElement("div");
    wrapper.className = "tilt-card";
    const card = document.createElement("div");
    card.className = "shop-card tilt-card-inner";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h4>${p.name}</h4>
      <p>${p.price}</p>
      <button onclick="showToast('Added ${p.name} to cart!')">Buy Now</button>
    `;
    wrapper.appendChild(card);
    container.appendChild(wrapper);
  });
}

function loadGalleryPage() {
  const galleryImages = [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1615874959474-2d3d7e1a8f8a?w=800&h=600&fit=crop"
  ];
  renderImages(galleryImages, "Gallery Interior", "gallery-container");
  initTilt();
}

// Assistant Logic
const assistantResponses = {
  colors: {
    living: "Try warm white walls with olive, terracotta, or muted navy accents. Keep the largest furniture neutral.",
    bedroom: "Use calm tones such as soft sage, dusty blue, or warm white. Add contrast with one darker textile.",
    kitchen: "Pair warm white or pale greige cabinets with natural wood and one restrained accent color.",
    office: "Choose a quiet base like warm white or light gray, then add one focused accent such as forest green."
  },
  lighting: "Layer three types of light: bright overhead, a task light, and a warm lamp for the evening.",
  bigger: "Keep a clear walking path, use furniture with visible legs, and a large mirror opposite a window.",
  storage: "Use the vertical space first: tall shelving, wall hooks, and storage baskets keep the floor open.",
  budget: "Start with layout and lighting before buying decor. A new rug or bulbs create huge impact."
};

function getAssistantResponse(question) {
  const roomEl = document.getElementById("room");
  const room = roomEl ? roomEl.value : "living";
  const normalizedQuestion = question.toLowerCase();

  if (normalizedQuestion.includes("color") || normalizedQuestion.includes("paint")) return assistantResponses.colors[room] || assistantResponses.colors.living;
  if (normalizedQuestion.includes("light") || normalizedQuestion.includes("bright")) return assistantResponses.lighting;
  if (normalizedQuestion.includes("bigger") || normalizedQuestion.includes("small")) return assistantResponses.bigger;
  if (normalizedQuestion.includes("storage") || normalizedQuestion.includes("organize")) return assistantResponses.storage;
  if (normalizedQuestion.includes("budget") || normalizedQuestion.includes("cheap")) return assistantResponses.budget;

  return `For your space, start with a focal point and good lighting. Want help with colors, lighting, storage, or budget?`;
}

function addChatMessage(message, sender) {
  const chatMessages = document.getElementById("chat-messages");
  if(!chatMessages) return;
  const messageElement = document.createElement("div");
  messageElement.className = `chat-message ${sender}`;
  messageElement.textContent = message;
  chatMessages.appendChild(messageElement);
  messageElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function askAssistant(question) {
  const trimmedQuestion = question.trim();
  if (!trimmedQuestion) return;
  addChatMessage(trimmedQuestion, "user");
  
  setTimeout(() => {
    addChatMessage(getAssistantResponse(trimmedQuestion), "assistant");
  }, 600);
}

// UI Utilities
function showToast(message) {
  const container = document.getElementById("toast-container");
  if(!container) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);
  
  void toast.offsetWidth; // Trigger reflow
  toast.classList.add("show");
  
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function initScrollAnimations() {
  if (typeof IntersectionObserver !== 'undefined') {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(".animate-on-scroll").forEach(el => observer.observe(el));
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.innerText = savedTheme === "dark" ? "☀️" : "🌙";
    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      themeToggle.innerText = newTheme === "dark" ? "☀️" : "🌙";
    });
  }
}

function initUpload() {
  const uploadArea = document.getElementById("upload-area");
  const fileInput = document.getElementById("room-upload");
  if (!uploadArea || !fileInput) return;
  
  uploadArea.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      uploadArea.innerHTML = `<p>✅ File <strong>${e.target.files[0].name}</strong> ready for AI magic!</p>`;
      showToast("Room photo uploaded successfully!");
    }
  });
}

function initFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}

function initTilt() {
  const cards = document.querySelectorAll('.tilt-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10; 
      const rotateY = ((x - centerX) / centerX) * 10;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      
      const inner = card.querySelector('.tilt-card-inner');
      if(inner) {
        inner.style.transform = 'translateZ(30px)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
      card.style.transition = 'transform 0.5s ease';
      const inner = card.querySelector('.tilt-card-inner');
      if(inner) inner.style.transform = 'translateZ(0px)';
    });
    
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initScrollAnimations();
  initFAQ();
  initTilt();
  
  // Mobile menu
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      document.getElementById("main-nav").classList.toggle("active");
    });
  }

  // Planner Init
  initUpload();
  const saveBtn = document.getElementById("save-design-btn");
  if (saveBtn) {
    saveBtn.addEventListener("click", function() {
      if (this.innerText.includes("Saved")) return;
      this.innerText = "❤️ Saved!";
      this.style.background = "rgba(239, 68, 68, 0.1)";
      this.style.color = "#ef4444";
      this.style.borderColor = "#ef4444";
      showToast("✅ Design saved to your mood board!");
    });
  }

  // Assistant Init
  const form = document.getElementById("assistant-form");
  if (form) {
    addChatMessage("Hi! I can help you shape the space with practical design ideas. What would you like to improve first?", "assistant");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("assistant-input");
      askAssistant(input.value);
      input.value = "";
    });
    document.querySelectorAll("[data-question]").forEach(btn => {
      btn.addEventListener("click", () => askAssistant(btn.dataset.question));
    });
  }

  // Gallery Init
  if (document.getElementById("gallery-container")) {
    loadGalleryPage();
  }
});
