/**
 * Game Model Object
 */

function Model (width, height) {
    this.width = width;
    this.height = height;
    this.paused = false;
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

/** Update the positions of each obstacle in the model */
Model.prototype.moveObstacles = function () {
    this.obstacles.forEach(obstacle => {
        obstacle.setPosition(obstacle.x - 1);
    });
    if (this.obstacles.length > 0 && this.obstacles[0].x < 0) {
        this.obstacles.shift();
    }
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