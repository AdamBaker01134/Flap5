/**
 * Game Player Object
 */
function Player (x, y) {
    this.x = x;
    this.y = y;
    this.acceleration = 0.025;
    this.velocity = 0.0;
}

/**
 * Update the players location then update the velocity with acceleration
 */
Player.prototype.movePlayer = function () {
    this.y += this.velocity;
    if (this.velocity < 0) {
        this.velocity += Math.abs(this.acceleration * (this.velocity - 1));
    } else {
        this.velocity += Math.abs(this.acceleration * (this.velocity + 1));
    }
}

/**
 * Jump the player
 */
Player.prototype.jump = function () {
    this.velocity -= 2.0;
}

/**
 * Set the velocity of the player
 * @param {number} velocity velocity scalar
 */
Player.prototype.setVelocity = function (velocity) {
    this.velocity = velocity;
}

/**
 * Set the position of the player
 * @param {number} x new x coordinate
 * @param {number} y new y coordinate
 */
Player.prototype.setPosition = function (x, y) {
    this.x = x;
    this.y = y;
}