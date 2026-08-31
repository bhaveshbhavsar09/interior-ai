function getSuggestion() {
  const room = document.getElementById("room").value;
  let suggestion = "";
  let imagePaths = [];

  switch(room) {
    case "living":
      suggestion = "Modern sofa, marble accent wall, warm lighting.";
      imagePaths = [
        "https://images.unsplash.com/photo-1600585154340-1e4f7f1f9b8f?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1567016376408-0d4c72a11df0?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
      ];
      break;
    case "bedroom":
      suggestion = "Cozy layered bedding, plants, soft lighting.";
      imagePaths = [
        "https://images.unsplash.com/photo-1615874959474-df3a8f7d8e3b?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1540932239986-4f80e7b91d25?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&h=300&fit=crop"
      ];
      break;
    case "kitchen":
      suggestion = "Marble island, sleek cabinets, pendant lights.";
      imagePaths = [
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1507652313519-d4dc28e7e4f0?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop"
      ];
      break;
    case "office":
      suggestion = "Minimalist desk, ergonomic chair, natural light.";
      imagePaths = [
        "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1591056890814-c3fb948e5e07?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
      ];
      break;
    default:
      suggestion = "Select a room to get suggestions!";
  }

  document.getElementById("suggestion-text").innerText = suggestion;
  
  let imageHTML = '<div class="image-gallery">';
  imagePaths.forEach((path, index) => {
    imageHTML += `<img src="${path}" alt="${room} interior ${index + 1}">`;
  });
  imageHTML += '</div>';
  
  document.getElementById("suggestion-image").innerHTML = imageHTML;
}

function showGallery() {
  document.getElementById("suggestion-text").innerText = "Explore our gallery of interiors!";
  const galleryImages = [
    "https://images.unsplash.com/photo-1600585154340-1e4f7f1f9b8f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1615874959474-df3a8f7d8e3b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1567016376408-0d4c72a11df0?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1507652313519-d4dc28e7e4f0?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1591056890814-c3fb948e5e07?w=400&h=300&fit=crop"
  ];
  
  let galleryHTML = '<div class="image-gallery">';
  galleryImages.forEach((img, index) => {
    galleryHTML += `<img src="${img}" alt="Interior ${index + 1}">`;
  });
  galleryHTML += '</div>';
  
  document.getElementById("suggestion-image").innerHTML = galleryHTML;
}
