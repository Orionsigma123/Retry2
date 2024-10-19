// Create scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a platform (floor)
const floorGeometry = new THREE.PlaneGeometry(100, 100);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; // Rotate to horizontal
scene.add(floor);

// Create a simple box to represent the player
const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
const playerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
scene.add(player);

// Set up Pointer Lock Controls
const controls = new THREE.PointerLockControls(camera, document.body);
scene.add(controls.getObject());

// Lock the pointer when the user clicks
document.addEventListener('click', () => {
    controls.lock();
});

// Set initial camera position
camera.position.y = 1; // Set camera height

// Movement variables
const speed = 0.1;
const direction = new THREE.Vector3();
const velocity = new THREE.Vector3();

// Handle keyboard input
const keys = {};
window.addEventListener('keydown', (event) => {
    keys[event.code] = true;
});

window.addEventListener('keyup', (event) => {
    keys[event.code] = false;
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Reset velocity
    velocity.x = 0;
    velocity.z = 0;

    // Handle player movement
    if (keys['KeyW']) velocity.z -= speed; // Move forward
    if (keys['KeyS']) velocity.z += speed; // Move backward
    if (keys['KeyA']) velocity.x -= speed; // Move left
    if (keys['KeyD']) velocity.x += speed; // Move right

    // Update player position based on camera direction
    direction.set(0, 0, 0);
    controls.getDirection(direction); // Get the direction the camera is facing
    direction.normalize(); // Normalize direction vector

    // Move player
    player.position.addScaledVector(direction, velocity.z);
    player.position.x += velocity.x; // Move left/right
    player.position.y = 0.5; // Keep player at a fixed height

    // Update camera position to follow player
    camera.position.x = player.position.x;
    camera.position.z = player.position.z + 5; // Maintain distance behind player
    camera.position.y = 1; // Maintain camera height

    renderer.render(scene, camera);
}

animate();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
