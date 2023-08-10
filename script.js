const images = [
  "projectfiles🙂/image (1).jpg",
  "projectfiles🙂/image (2).jpg",
  "projectfiles🙂/image (3).jpg",
  "projectfiles🙂/image (4).jpg",
  "projectfiles🙂/image (7).jpg",
  "projectfiles🙂/image (8).jpg",
];

// Function to preload images
function preloadImages() {
  const promises = images.map((src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject();
      img.src = src;
    });
  });
  return Promise.all(promises);
}

// Function to create a bubble with a random image
function createBubble() {
  if (images.length === 0) return;

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  const randomImageSrc = images[Math.floor(Math.random() * images.length)];
  bubble.style.backgroundImage = `url(${randomImageSrc})`;

  const container = document.querySelector(".container");
  container.appendChild(bubble);

  const size = Math.random() * 100 + 50; // Random bubble size between 50 and 150 pixels
  const startPositionX = Math.random() * (window.innerWidth - size);
  const startPositionY = Math.random() * (window.innerHeight - size);

  let animationDuration = 5000 + Math.random() * 3000; // Varying animation duration

  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = startPositionX + "px";
  bubble.style.top = startPositionY + "px";

  const endPositionX = Math.random() * (window.innerWidth - size);
  const endPositionY = Math.random() * (window.innerHeight - size);

  let xDirection = 1;
  let yDirection = 1;

  function animate() {
    if (
      parseInt(bubble.style.left) <= 0 ||
      parseInt(bubble.style.left) >= window.innerWidth - size
    ) {
      xDirection *= -1;
    }
    if (
      parseInt(bubble.style.top) <= 0 ||
      parseInt(bubble.style.top) >= window.innerHeight - size
    ) {
      yDirection *= -1;
    }

    bubble.style.left = parseInt(bubble.style.left) + 2 * xDirection + "px";
    bubble.style.top = parseInt(bubble.style.top) + 2 * yDirection + "px";
    requestAnimationFrame(animate);
  }

  animate();

  setTimeout(() => {
    bubble.remove();
  }, animationDuration + 1000);
}

// Preload images and start the bubble creation interval
preloadImages()
  .then(() => {
    setInterval(createBubble, 200);
  })
  .catch((error) => {
    console.error("Error loading images:", error);
  });
