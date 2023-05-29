/**
 * Game View Object
 */
function View (model) {
    this.model = model;
}

/** Draw current model onto the canvas */
View.prototype.draw = function () {
    /* Add drawing logic */
}

/** Called when one of the models this view is subscribed to changes */
View.prototype.modelChanged = function () {
    this.draw();
}