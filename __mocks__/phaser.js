// Mock Phaser for testing without canvas support

class Scene {
  constructor(config) {
    this.key = config?.key || 'Scene';
  }
}

export default {
  Scene,
  AUTO: 'AUTO',
  Math: {
    Between: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
    Angle: {
      Between: (x1, y1, x2, y2) => Math.atan2(y2 - y1, x2 - x1)
    },
    Distance: {
      Between: (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
    }
  }
};

export { Scene };
