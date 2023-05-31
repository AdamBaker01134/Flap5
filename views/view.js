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
    rect(0, 0, this.model.width, this.model.height);
    fill(0,154,23);  // grass green
    rect(0, this.model.groundY, this.model.width, this.model.height - this.model.groundY);
    fill(255, 244, 0);  // sun yellow
    circle(this.model.width, 0, 300);

    /* Draw each obstacle in the model */
    fill(102, 51, 153); // obstacle purple
    this.model.obstacles.forEach(obstacle => {
        rect(
            obstacle.x - obstacle.width / 2,
            0,
            obstacle.width,
            obstacle.y - obstacle.openingSize / 2
        );  // Top rectangle
        rect(
            obstacle.x - obstacle.width / 2,
            obstacle.y + obstacle.openingSize / 2,
            obstacle.width,
            this.model.height - (obstacle.y + obstacle.openingSize / 2)
        ); // Bottom rectangle
    });

    fill(255, 244, 0);  // sun yellow
    circle(
        this.model.player.x,
        this.model.player.y,
        this.model.player.diameter
    );

    /* Draw text indicator */
    if (this.model.paused || this.model.gameOver) {
        fill(88, 89, 91);    // dark grey
        rect(
            this.model.paused ? this.model.width / 2 - 120 : this.model.width / 2 - 200,
            this.model.height / 2 - 75,
            this.model.paused ? 240 : 400,
            100
        );
        fill(255, 255, 255);
        stroke(0, 0, 0);
        strokeWeight(2);
        textAlign(CENTER);
        textSize(64);
        let message = this.model.paused ? "Paused" : "Game Over";
        text(message, this.model.width / 2, this.model.height / 2);
    }

    fill(255, 255, 255);
    stroke(0, 0, 0);
    strokeWeight(2);
    textAlign(LEFT);
    textSize(64);
    text(`Score: ${this.model.score}`, 10, 60);
}

/** Called when one of the models this view is subscribed to changes */
View.prototype.modelChanged = function () {
    this.draw();
}