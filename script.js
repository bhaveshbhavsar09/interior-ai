function getSuggestion() {
  const room = document.getElementById("room").value;
  let suggestion = "";
  let imagePaths = [];

  switch(room) {
    case "living":
      suggestion = "Modern sofa, marble accent wall, warm lighting.";
      imagePaths = [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=600&fit=crop"
      ];
      break;
    case "bedroom":
      suggestion = "Cozy layered bedding, plants, soft lighting.";
      imagePaths = [
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1615874959474-2d3d7e1a8f8a?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&h=600&fit=crop"
      ];
      break;
    case "kitchen":
      suggestion = "Marble island, sleek cabinets, pendant lights.";
      imagePaths = [
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600566753051-7b2c3c6f6d9b?w=800&h=600&fit=crop"
      ];
      break;
    case "office":
      suggestion = "Minimalist desk, ergonomic chair, natural light.";
      imagePaths = [
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop"
      ];
      break;
    default:
      suggestion = "Select a room to get suggestions!";
  }

  document.getElementById("suggestion-text").innerText = suggestion;
  
  renderImages(imagePaths, `${room} interior`);
}

function renderImages(imagePaths, altPrefix) {
  const gallery = document.createElement("div");
  gallery.className = "image-gallery";

  imagePaths.forEach((path, index) => {
    const image = document.createElement("img");
    image.src = path;
    image.alt = `${altPrefix} ${index + 1}`;
    image.loading = "lazy";
    image.onerror = () => {
      image.onerror = null;
      image.src = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="#d9c7b8"/><text x="400" y="300" text-anchor="middle" fill="#3d3028" font-family="sans-serif" font-size="28">${altPrefix}</text></svg>`
      )}`;
    };
    gallery.appendChild(image);
  });

  const container = document.getElementById("suggestion-image");
  container.replaceChildren(gallery);
  container.scrollIntoView({ behavior: "smooth", block: "start" });
}

function showGallery() {
  document.getElementById("suggestion-text").innerText = "Explore our gallery of interiors!";
  const galleryImages = [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop"
  ];
  
  renderImages(galleryImages, "Interior");
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

  if (normalizedQuestion.includes("color") || normalizedQuestion.includes("paint")) {
    return assistantResponses.colors[room];
  }
  if (normalizedQuestion.includes("light") || normalizedQuestion.includes("bright")) {
    return assistantResponses.lighting;
  }
  if (normalizedQuestion.includes("bigger") || normalizedQuestion.includes("small") || normalizedQuestion.includes("space")) {
    return assistantResponses.bigger;
  }
  if (normalizedQuestion.includes("storage") || normalizedQuestion.includes("organize") || normalizedQuestion.includes("clutter")) {
    return assistantResponses.storage;
  }
  if (normalizedQuestion.includes("budget") || normalizedQuestion.includes("cheap") || normalizedQuestion.includes("cost")) {
    return assistantResponses.budget;
  }

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
  addChatMessage(getAssistantResponse(trimmedQuestion), "assistant");
}

function updateAssistantRoom() {
  const room = document.getElementById("room");
  const roomName = room.options[room.selectedIndex].text.toLowerCase();
  document.getElementById("assistant-room").textContent = roomName;
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
});
