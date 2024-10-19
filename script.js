// Create scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a platform (floor)
const floorGeometry = new THREE.PlaneGeometry(100, 100);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI / 2; // Rotate to horizontal
scene.add(floor);

// Create a simple box to represent the player
const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
const playerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
scene.add(player);

// Set initial camera position
camera.position.z = 5;

// Movement variables
const speed = 0.1;
const keys = {};

// Handle keyboard input
window.addEventListener('keydown', (event) => {
    keys[event.code] = true;
});

window.addEventListener('keyup', (event) => {
    keys[event.code] = false;
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Handle player movement
    if (keys['KeyW']) player.position.z -= speed; // Move forward
    if (keys['KeyS']) player.position.z += speed; // Move backward
    if (keys['KeyA']) player.position.x -= speed; // Move left
    if (keys['KeyD']) player.position.x += speed; // Move right

    // Update camera position to follow player
    camera.position.x = player.position.x;
    camera.position.z = player.position.z + 5; // Maintain distance behind player
    camera.lookAt(player.position); // Look at player

    renderer.render(scene, camera);
}

animate();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
