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
}

let currentState = state.READY;

function keyPressed () {
    if (keyCode  === ESCAPE) {
        model.togglePause();
        currentState = model.paused ? currentState = state.PAUSED : currentState = state.READY;
    } else if (keyCode === 32) {
        model.jump();
    }
}

function mousePressed () {}

// █▀▀ ▄▀█ █▀▄▀█ █▀▀   █░░ █▀█ █▀█ █▀█
// █▄█ █▀█ █░▀░█ ██▄   █▄▄ █▄█ █▄█ █▀▀

let clock = 0;

function draw() {
    if (model.paused) {
        return;
    }
    if (++clock >= 300) {
        clock = 0;
        model.addObstacle();
    }
    model.clockUpdate();
}