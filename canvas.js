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
    PREPARE_CREATE: "prepare_create",
    CREATING: "creating",
}

let currentState = state.READY;

function keyPressed () {
    if (keyCode  === ESCAPE) {
        model.togglePause();
    }
}

function mousePressed () {}

// █▀▀ ▄▀█ █▀▄▀█ █▀▀   █░░ █▀█ █▀█ █▀█
// █▄█ █▀█ █░▀░█ ██▄   █▄▄ █▄█ █▄█ █▀▀

function draw() {
    if (model.paused) {
        return;
    }
    /* Check current state to ensure that we create a new obstacle once per 5 seconds */
    switch (currentState) {
        case state.PREPARE_CREATE:
            model.addObstacle();
            currentState = state.CREATING;
            setTimeout(() => currentState = state.READY, 100);
            break;
        case state.CREATING:
            break;
        default:
            if (millis() % 5000 < 50) {
                currentState = state.PREPARE_CREATE;
            }
            break;
    }
    model.moveObstacles();
}