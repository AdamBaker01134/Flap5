/**
 * Game Obstacle Object
 */
function Obstacle (x, opening) {
    this.x = x;
    this.opening = opening;
}

/**
 * Update the x position of the obstacle in the game
 * @param {number} x new x coordinate
 */
Obstacle.prototype.setPosition = function (x) {
    this.x = x;
}