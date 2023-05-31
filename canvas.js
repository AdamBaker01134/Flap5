"use strict";

// █▀ █▀▀ ▀█▀ █░█ █▀█
// ▄█ ██▄ ░█░ █▄█ █▀▀

const DISPLAY_WIDTH = 1280;
const DISPLAY_HEIGHT = 1024;

let model;
let view;

function setup() {
    createCanvas(DISPLAY_WIDTH, DISPLAY_HEIGHT);
    model = new Model(DISPLAY_WIDTH, DISPLAY_HEIGHT);
    view = new View(model);
    model.addSubscriber(view);
}

// █▀▀ █▀█ █▄░█ ▀█▀ █▀█ █▀█ █░░ █░░ █▀▀ █▀█
// █▄▄ █▄█ █░▀█ ░█░ █▀▄ █▄█ █▄▄ █▄▄ ██▄ █▀▄

const state = {
    READY: "ready",
    PAUSED: "paused",
    GAME_OVER: "gameOver",
}

let currentState = state.READY;

function keyPressed () {
    switch (currentState) {
        case state.READY:
            if (keyCode  === ESCAPE) {
                model.togglePause();
                currentState = state.PAUSED;
            }
            if (keyCode === 32) {
                model.jump();
            }
            break;
        case state.PAUSED:
            if (keyCode === ESCAPE) {
                model.togglePause();
                currentState = state.READY;
            }
            break;
        case state.GAME_OVER:
            if (keyCode === 32) {
                model.reset();
                currentState = state.READY;
            }
            break;
    }
}

function mousePressed () {}

// █▀▀ ▄▀█ █▀▄▀█ █▀▀   █░░ █▀█ █▀█ █▀█
// █▄█ █▀█ █░▀░█ ██▄   █▄▄ █▄█ █▄█ █▀▀

let clock = 0;

function draw() {
    if (model.paused || model.gameOver) {
        return;
    }
    if (++clock >= 150) {
        clock = 0;
        model.addObstacle();
    }
    model.clockUpdate();
    if (model.checkObstacleHit()) {
        model.toggleGameOver();
        currentState = state.GAME_OVER;
    }
}