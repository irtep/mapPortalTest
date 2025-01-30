import React, { useEffect, useRef } from 'react';

const TerrainCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 2000;
    const height = 2000;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Generate terrain
    const terrain = generateTerrain(width, height);
    drawTerrain(ctx, terrain, width, height);

    // Draw features
    drawLakes(ctx, terrain, width, height);
    drawRivers(ctx, terrain, width, height);
    drawForests(ctx, terrain, width, height);
    drawHouses(ctx, terrain, width, height);
  }, []);

  // Generate terrain height map
  const generateTerrain = (width: number, height: number): number[][] => {
    const terrain: number[][] = [];
    for (let y = 0; y < height; y++) {
      terrain[y] = [];
      for (let x = 0; x < width; x++) {
        // Simple noise for terrain height (0 to 1)
        terrain[y][x] = Math.random();
      }
    }
    return terrain;
  };

  // Draw terrain
  const drawTerrain = (
    ctx: CanvasRenderingContext2D,
    terrain: number[][],
    width: number,
    height: number
  ) => {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const heightValue = terrain[y][x];
        const color = heightValue < 0.3 ? '#0000FF' : // Water
                      heightValue < 0.5 ? '#00FF00' : // Grass
                      heightValue < 0.8 ? '#654321' : // Dirt
                      '#FFFFFF'; // Snow
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  };

  // Draw lakes
  const drawLakes = (
    ctx: CanvasRenderingContext2D,
    terrain: number[][],
    width: number,
    height: number
  ) => {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (terrain[y][x] < 0.3) {
          ctx.fillStyle = '#0000FF'; // Blue for water
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  };

  // Draw rivers
  const drawRivers = (
    ctx: CanvasRenderingContext2D,
    terrain: number[][],
    width: number,
    height: number
  ) => {
    // Simple river generation (just an example)
    for (let x = 0; x < width; x++) {
      const y = Math.floor(height / 2 + Math.sin(x / 100) * 50);
      if (y >= 0 && y < height) {
        ctx.fillStyle = '#0000FF'; // Blue for water
        ctx.fillRect(x, y, 1, 1);
      }
    }
  };

  // Draw forests
  const drawForests = (
    ctx: CanvasRenderingContext2D,
    terrain: number[][],
    width: number,
    height: number
  ) => {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (terrain[y][x] > 0.5 && terrain[y][x] < 0.7 && Math.random() < 0.1) {
          ctx.fillStyle = '#008000'; // Green for trees
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  };

  // Draw houses
  const drawHouses = (
    ctx: CanvasRenderingContext2D,
    terrain: number[][],
    width: number,
    height: number
  ) => {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (terrain[y][x] > 0.5 && terrain[y][x] < 0.6 && Math.random() < 0.01) {
          ctx.fillStyle = '#FF0000'; // Red for houses
          ctx.fillRect(x, y, 5, 5);
        }
      }
    }
  };

  return <canvas ref={canvasRef} style={{ border: '1px solid black' }} />;
};

export default TerrainCanvas;