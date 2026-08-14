function getSuggestion() {
  const room = document.getElementById("room").value;
  let suggestion = "";
  let imagePath = "";

  switch(room) {
    case "living":
      suggestion = "Modern sofa, marble accent wall, warm lighting.";
      imagePath = "https://images.unsplash.com/photo-1600585154340-1e4f7f1f9b8f"; // Living Room
      break;
    case "bedroom":
      suggestion = "Cozy layered bedding, plants, soft lighting.";
      imagePath = "https://images.unsplash.com/photo-1615874959474-df3a8f7d8e3b"; // Bedroom
      break;
    case "kitchen":
      suggestion = "Marble island, sleek cabinets, pendant lights.";
      imagePath = "https://images.unsplash.com/photo-1600891964599-f61ba0e24092"; // Kitchen
      break;
    case "office":
      suggestion = "Minimalist desk, ergonomic chair, natural light.";
      imagePath = "https://images.unsplash.com/photo-1593642532973-d31b6557fa68"; // Office
      break;
    default:
      suggestion = "Select a room to get suggestions!";
  }

  document.getElementById("suggestion-text").innerText = suggestion;
  document.getElementById("suggestion-image").innerHTML = `<img src="${imagePath}" alt="${room} interior">`;
}

function showGallery() {
  document.getElementById("suggestion-text").innerText = "Explore our gallery of interiors!";
  document.getElementById("suggestion-image").innerHTML = `
    <img src="https://images.unsplash.com/photo-1600585154340-1e4f7f1f9b8f" alt="Living Room">
    <img src="https://images.unsplash.com/photo-1615874959474-df3a8f7d8e3b" alt="Bedroom">
    <img src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092" alt="Kitchen">
    <img src="https://images.unsplash.com/photo-1593642532973-d31b6557fa68" alt="Office">
  `;
}
