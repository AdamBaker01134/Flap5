/**
 * Game View Object
 */
function View (model) {
    this.model = model;
}

/** Draw current model onto the canvas */
View.prototype.draw = function () {
    clear();
    noStroke();
    /* Draw background */
    fill(135, 206, 235); // sky blue
    rect(0, 0, model.width, model.height);
    fill(0,154,23);  // grass green
    rect(0, model.height - 200, model.width, 200);
    fill(255, 244, 0);  // sun yellow
    circle(model.width, 0, 300);

    /* Draw each obstacle in the model */
    fill(102, 51, 153); // obstacle purple
    this.model.obstacles.forEach(obstacle => {
        rect(
            obstacle.x - 20,
            0,
            40,
            obstacle.opening - 80
        );  // Top rectangle
        rect(
            obstacle.x - 20,
            obstacle.opening + 80,
            40,
            model.height - (obstacle.opening + 80)
        ); // Bottom rectangle
    });
}

/** Called when one of the models this view is subscribed to changes */
View.prototype.modelChanged = function () {
    this.draw();
}