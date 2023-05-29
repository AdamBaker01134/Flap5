/**
 * Game Obstacle Object
 */
function Obstacle (x, y) {
    this.x = x;                // x position of the obstacle
    this.y = y;                // y position of the obstacles opening
    this.width = 40;           // width of the obstacle
    this.openingSize = 160;    // size of the obstacles opening
}

/**
 * Update the x position of the obstacle in the game
 * @param {number} x new x coordinate
 */
Obstacle.prototype.setPosition = function (x) {
    this.x = x;
}

/**
 * Check if the player hit the obstacle.
 * @param {number} x x coordinate of the player
 * @param {number} y y coordinate of the player
 * @returns {boolean}
 */
Obstacle.prototype.checkHit = function (x, y) {
    return x > this.x - this.width / 2 && x < this.x + this.width / 2 &&
            y > this.y - this.openingSize / 2 && y < this.y + this.openingSize / 2;
}