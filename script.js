// Function to generate a chunk
function generateChunk(chunkX, chunkZ) {
    const chunk = new THREE.Group(); // Group to hold all blocks in this chunk
    for (let x = 0; x < chunkSize; x++) {
        for (let z = 0; z < chunkSize; z++) {
            // Generate noise coordinates with absolute world positions to avoid gaps
            const worldX = chunkX * chunkSize + x;
            const worldZ = chunkZ * chunkSize + z;

            // Generate height based on Simplex noise
            const height = Math.floor(simplex.noise2D(worldX * noiseScale, worldZ * noiseScale) * chunkHeight);

            for (let y = 0; y <= height; y++) {
                let texture = grassTexture; // Default texture for the top block
                let type = 'grass'; // Default block type

                if (y < height - 1) {
                    texture = dirtTexture; // Dirt for blocks below the surface
                    type = 'dirt';
                }
                if (y === height) {
                    texture = grassTexture; // Grass on top
                    type = 'grass';
                } else if (y < height - 1) {
                    texture = stoneTexture; // Stone for below dirt
                    type = 'stone';
                }
                
                const block = createBlock(worldX, y, worldZ, texture, type);
                chunk.add(block);
            }
        }
    }
    chunks[`${chunkX},${chunkZ}`] = chunk; // Store the chunk in the chunks object
    scene.add(chunk); // Add the chunk to the scene
}
