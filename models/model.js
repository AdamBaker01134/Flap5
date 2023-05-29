/**
 * Game Model Object
 */

function Model (width, height) {
    this.width = width;
    this.height = height;
    this.subscribers = [];
}

/** Subscribe an object to model updates */
Model.prototype.addSubscriber = function (subscriber) {
    this.subscribers.push(subscriber);
}

/** Notify all subscribed objects that the model has changed */
Model.prototype.notifySubscribers = function () {
    this.subscribers.forEach(subscriber => subscriber.modelChanged());
}