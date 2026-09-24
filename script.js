function getSuggestion() {
  const room = document.getElementById("room").value;
  const style = document.getElementById("style").value;
  const color = document.getElementById("color").value;
  
  // Show UI elements
  document.getElementById("gallery").style.display = "block";
  document.getElementById("results-content").style.display = "none";
  document.getElementById("loading-state").style.display = "block";
  
  // Simulate AI Loading
  setTimeout(() => {
    document.getElementById("loading-state").style.display = "none";
    document.getElementById("results-content").style.display = "block";
    
    let suggestion = `A stunning ${style} ${room} featuring ${color} tones.`;
    let imagePaths = [];
    let colors = [];
    let products = [];

    // Simple mock logic for images and colors based on selections
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

    document.getElementById("suggestion-text").innerText = suggestion;
    
    renderImages(imagePaths, `${style} ${room}`);
    renderPalette(colors);
    renderProducts(products);
    
    // Scroll to results
    document.getElementById("gallery").scrollIntoView({ behavior: "smooth", block: "start" });
  }, 1200); // 1.2s fake delay
}

function renderImages(imagePaths, altPrefix) {
  const gallery = document.createElement("div");
  gallery.className = "image-gallery";

  imagePaths.forEach((path, index) => {
    const image = document.createElement("img");
    image.src = path;
    image.alt = `${altPrefix} ${index + 1}`;
    image.loading = "lazy";
    gallery.appendChild(image);
  });

  const container = document.getElementById("suggestion-image");
  container.replaceChildren(gallery);
}

function renderPalette(colors) {
  const container = document.getElementById("color-palette");
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
  container.innerHTML = "";
  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "shop-card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h4>${p.name}</h4>
      <p>${p.price}</p>
      <button>Buy Now</button>
    `;
    container.appendChild(card);
  });
}

function showGallery() {
  document.getElementById("gallery").style.display = "block";
  document.getElementById("results-content").style.display = "block";
  document.getElementById("loading-state").style.display = "none";
  
  document.getElementById("suggestion-text").innerText = "Explore our gallery of interiors!";
  const galleryImages = [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop"
  ];
  renderImages(galleryImages, "Interior");
  document.getElementById("color-palette").innerHTML = "";
  document.getElementById("shoppable-items").innerHTML = "";
}

const assistantResponses = {
  colors: {
    living: "Try warm white walls with olive, terracotta, or muted navy accents. Keep the largest furniture neutral so the room stays easy to refresh.",
    bedroom: "Use calm tones such as soft sage, dusty blue, or warm white. Add contrast with one darker textile behind the bed rather than painting every wall.",
    kitchen: "Pair warm white or pale greige cabinets with natural wood and one restrained accent color. A colored backsplash is an easy way to add personality without visual clutter.",
    office: "Choose a quiet base like warm white or light gray, then add one focused accent such as forest green or clay. This keeps the background calm for work and video calls."
  },
  lighting: "Layer three types of light: bright overhead light for general use, a task light where you read or work, and a warm lamp or wall light for the evening. Aim for warm bulbs around 2700K to 3000K.",
  bigger: "Keep a clear walking path, use furniture with visible legs, and repeat one light color through the walls and largest pieces. A large mirror opposite a window can also spread natural light through the room.",
  storage: "Use the vertical space first: tall shelving, wall hooks, and storage baskets keep the floor open. Choose closed storage for visual calm and leave a small amount of display space for character.",
  budget: "Start with layout and lighting before buying decor. Repositioning furniture, adding a rug, and changing bulbs usually create more impact per dollar than replacing large pieces."
};

function getAssistantResponse(question) {
  const room = document.getElementById("room").value;
  const normalizedQuestion = question.toLowerCase();

  if (normalizedQuestion.includes("color") || normalizedQuestion.includes("paint")) return assistantResponses.colors[room] || assistantResponses.colors.living;
  if (normalizedQuestion.includes("light") || normalizedQuestion.includes("bright")) return assistantResponses.lighting;
  if (normalizedQuestion.includes("bigger") || normalizedQuestion.includes("small") || normalizedQuestion.includes("space")) return assistantResponses.bigger;
  if (normalizedQuestion.includes("storage") || normalizedQuestion.includes("organize") || normalizedQuestion.includes("clutter")) return assistantResponses.storage;
  if (normalizedQuestion.includes("budget") || normalizedQuestion.includes("cheap") || normalizedQuestion.includes("cost")) return assistantResponses.budget;

  return `For your ${room} room, start with one clear focal point, two supporting textures, and a simple lighting layer. Tell me whether you want help with colors, lighting, storage, space, or budget.`;
}

function addChatMessage(message, sender) {
  const messageElement = document.createElement("div");
  messageElement.className = `chat-message ${sender}`;
  messageElement.textContent = message;
  document.getElementById("chat-messages").appendChild(messageElement);
  messageElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function askAssistant(question) {
  const trimmedQuestion = question.trim();
  if (!trimmedQuestion) return;
  addChatMessage(trimmedQuestion, "user");
  
  // Micro-animation fake typing delay
  setTimeout(() => {
    addChatMessage(getAssistantResponse(trimmedQuestion), "assistant");
  }, 600);
}

function updateAssistantRoom() {
  const room = document.getElementById("room");
  const roomName = room.options[room.selectedIndex].text.toLowerCase();
  document.getElementById("assistant-room").textContent = roomName;
}

// Theme toggling
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);
  
  document.getElementById("theme-toggle").addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const icon = theme === "dark" ? "☀️" : "🌙";
  document.getElementById("theme-toggle").innerText = icon;
}

// Upload Area Mock
function initUpload() {
  const uploadArea = document.getElementById("upload-area");
  const fileInput = document.getElementById("room-upload");
  
  uploadArea.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      uploadArea.innerHTML = `<p>✅ File <strong>${e.target.files[0].name}</strong> ready for AI magic!</p>`;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("assistant-form");
  const input = document.getElementById("assistant-input");
  const room = document.getElementById("room");

  addChatMessage("Hi! I can help you shape the room with practical design ideas. What would you like to improve first?", "assistant");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    askAssistant(input.value);
    input.value = "";
    input.focus();
  });
  document.querySelectorAll("[data-question]").forEach((button) => {
    button.addEventListener("click", () => {
      askAssistant(button.dataset.question);
    });
  });
  room.addEventListener("change", updateAssistantRoom);
  updateAssistantRoom();
  
  initTheme();
  initUpload();
  
  // Save design mock
  const saveBtn = document.getElementById("save-design-btn");
  if (saveBtn) {
    saveBtn.addEventListener("click", function() {
      this.innerText = "❤️ Saved!";
      this.style.background = "rgba(231, 76, 60, 0.1)";
      this.style.color = "#e74c3c";
      this.style.borderColor = "#e74c3c";
    });
  }
});
