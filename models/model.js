/**
 * Game Model Object
 */

function Model (width, height) {
    this.width = width;
    this.height = height;
    this.paused = false;
    this.gameOver = false;
    this.groundY = this.height - 200;
    this.player = new Player(300, this.groundY, 20);
    this.score = 0;
    this.obstacles = [];
    this.subscribers = [];
}

/** Reset model after a game over */
Model.prototype.reset = function () {
    this.player.setPosition(300, this.groundY);
    this.obstacles = [];
    this.score = 0;
    this.gameOver = false;
    this.notifySubscribers();
}

/** Add an obstacle to the game environment */
Model.prototype.addObstacle = function () {
    let minOpening = 300;
    let maxOpening = this.height - 300;
    this.obstacles.push(new Obstacle(this.width, Math.random() * (maxOpening - minOpening) + minOpening));
    this.notifySubscribers();
}

/** Update all objects from a clock update. */
Model.prototype.clockUpdate = function () {
    this.obstacles.forEach(obstacle => {
        obstacle.setPosition(obstacle.x - 2);
    });
    if (this.obstacles.length > 0 && this.obstacles[0].x < 0) {
        this.obstacles.shift();
    }
    if (this.player.y > this.groundY) {
        this.player.setVelocity(0.0);
        this.player.setPosition(this.player.x, this.groundY);
    } else if (this.player.y < 0) {
        this.player.setVelocity(0.0);
        this.player.setPosition(this.player.x, 0);
    } else {
        this.player.movePlayer();
    }
    this.notifySubscribers();
}

/** Make the player jump */
Model.prototype.jump = function () {
    if (this.player.velocity > 0) this.player.setVelocity(0.0);
    this.player.jump();
    this.player.movePlayer();
    this.notifySubscribers();
}

/** Add a point to the score */
Model.prototype.point = function () {
    this.score++;
    this.notifySubscribers();
}

/** Toggle the paused state in the model */
Model.prototype.togglePause = function () {
    this.paused = !this.paused;
    this.notifySubscribers();
}

/** Player hit an obstacle. Game over... */
Model.prototype.toggleGameOver = function () {
    this.gameOver = !this.gameOver;
    this.notifySubscribers();
}

/**
 * Check if the player is within the horizontal bounds of an obstacle
 * @returns {Obstacle|null}
 */
Model.prototype.checkObstacleXHit = function () {
    let x = this.player.x;
    for (let i = 0; i < this.obstacles.length; i++) {
        let obstacle = this.obstacles[i];
        if (x > obstacle.x && x < obstacle.x + obstacle.width) {
            return obstacle;
        }
    }
    return null;
}

/**
 * Check if the player y hit the obstacle
 * @param {Obstacle} obstacle obstacle we are checking
 * @returns {boolean}
 */
Model.prototype.checkObstacleYHit = function (obstacle) {
    let y = this.player.y;
    return y < obstacle.y - obstacle.openingSize / 2 || y > obstacle.y + obstacle.openingSize / 2;
}

/** Subscribe an object to model updates */
Model.prototype.addSubscriber = function (subscriber) {
    this.subscribers.push(subscriber);
}

/** Notify all subscribed objects that the model has changed */
Model.prototype.notifySubscribers = function () {
    this.subscribers.forEach(subscriber => subscriber.modelChanged());
}