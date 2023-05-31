/**
 * Game Model Object
 */

function Model (width, height) {
    this.width = width;
    this.height = height;
    this.paused = false;
    this.player = new Player(300, this.height - 220, 20);
    this.groundY = this.height - 200;
    this.obstacles = [];
    this.subscribers = [];
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
        obstacle.setPosition(obstacle.x - 1);
    });
    if (this.obstacles.length > 0 && this.obstacles[0].x < 0) {
        this.obstacles.shift();
    }
    if (this.player.y >= this.groundY) {
        this.player.setVelocity(0.0);
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

/** Toggle the paused state in the model */
Model.prototype.togglePause = function () {
    this.paused = !this.paused;
    this.notifySubscribers();
}

/** Subscribe an object to model updates */
Model.prototype.addSubscriber = function (subscriber) {
    this.subscribers.push(subscriber);
}

/** Notify all subscribed objects that the model has changed */
Model.prototype.notifySubscribers = function () {
    this.subscribers.forEach(subscriber => subscriber.modelChanged());
}