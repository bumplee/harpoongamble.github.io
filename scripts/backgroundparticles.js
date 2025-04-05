// Настройки
const config = {
  particleCount: 39, // Smaller number of particles
  colors: [
    'rgba(74, 92, 255, 0.7)',
    'rgba(106, 123, 255, 0.6)',
    'rgba(127, 86, 255, 0.5)',
    'rgba(255, 215, 0, 0.3)'
  ],
  maxSpeed: 0.3, // Smaller maximum speed
  minSpeed: 0.1, // Smaller minimum speed
  connectionDistance: 200, // Connection Distance
  lineOpacity: 0.5 // Line opacity
};

const container = document.getElementById('particles-container');
const canvas = document.getElementById('connections-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

// Initialization canvas
function initCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Particle class
class Particle {
  constructor() {
    this.size = Math.random() * 2 + 1; // Smaller size for particles
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.color = Math.random() > 0.95 ? config.colors[3] : 
                config.colors[Math.floor(Math.random() * 3)];
    this.speed = Math.random() * config.maxSpeed + config.minSpeed;
    this.angle = Math.random() * Math.PI * 2;
    
    this.element = document.createElement('div');
    this.element.className = 'particle';
    this.element.style.width = `${this.size}px`;
    this.element.style.height = `${this.size}px`;
    this.element.style.backgroundColor = this.color;
    container.appendChild(this.element);
  }
  
  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    
    // Turning the particle around when it reaches the edge of the canvas
    if (this.x < 0 || this.x > canvas.width || 
        this.y < 0 || this.y > canvas.height) {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
    }
    
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }
}

// Connections
function drawConnections() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const p1 = particles[i];
      const p2 = particles[j];
      
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < config.connectionDistance) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(106, 123, 255, ${
          config.lineOpacity * (1 - distance/config.connectionDistance)
        })`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
  }
}

// Animation
function animate() {
  particles.forEach(p => p.update());
  drawConnections();
  requestAnimationFrame(animate);
}

// Initialization
initCanvas();
for (let i = 0; i < config.particleCount; i++) {
  particles.push(new Particle());
}
animate();

// Resize
window.addEventListener('resize', () => {
  initCanvas();
  particles.forEach(p => {
    p.x = Math.random() * canvas.width;
    p.y = Math.random() * canvas.height;
  });
});