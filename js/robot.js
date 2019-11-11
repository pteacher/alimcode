'use strict';
var task = {};
var FIELD_SIZE_IN_CELLS = 8;
var CELL_SIZE_PX = 32;
var cmds = [];

var app = new PIXI.Application(FIELD_SIZE_IN_CELLS * CELL_SIZE_PX * 2, FIELD_SIZE_IN_CELLS * CELL_SIZE_PX * 2, { backgroundColor: 0xffffff });
var cw = app.renderer.width;
var ch = app.renderer.height;
$('.preview-pane').append(app.view);
app.view.id = 'pixi-canvas';

/*
var background = PIXI.Sprite.fromImage('assets/hqdefault.jpg');
background.width = app.renderer.width;
background.height = app.renderer.height;
app.stage.addChild(background);
*/


var chickTexture = PIXI.Texture.fromImage('assets/chicken.png');
var eggTexture = PIXI.Texture.fromImage('assets/egg.png');
var foodTexture = PIXI.Texture.fromImage('assets/food.png');


var field = new PIXI.Container();
var chick = newItem(CELL_SIZE_PX, CELL_SIZE_PX, 1, chickTexture);

for (var x = 0; x < FIELD_SIZE_IN_CELLS; x++) {
    for (var y = 0; y < FIELD_SIZE_IN_CELLS; y++) {
        var dot = new PIXI.Graphics()
        dot.beginFill(0x9966FF);
        dot.drawCircle(CELL_SIZE_PX + x * CELL_SIZE_PX * 2, CELL_SIZE_PX + y * CELL_SIZE_PX * 2, 3);
        dot.endFill();
        field.addChild(dot);
    }
}


app.stage.addChild(field);
getTask(0);
app.stage.addChild(chick);

function newItem(x, y, scale, texture) {
    var item = new PIXI.Sprite(texture);
    item.x = x;
    item.scale.x = scale;
    item.scale.y = scale;
    item.y = y;
    item.anchor.set(0.5, 0.5);
    return item;
}

function getTask(lvl) {
    loadJSON(function(response) {
        var data = JSON.parse(response);
        task = data[lvl].task;
        for (var i = task.length - 1; i >= 0; i--) {
            for (var j = task[i].length - 1; j >= 0; j--) {
                if (task[i][j] == 1) {
                    task[i][j] = 0;
                }
            }
        }
        task[0][0] = 1;

        for (var y = 0; y < FIELD_SIZE_IN_CELLS; y++) {
            for (var x = 0; x < FIELD_SIZE_IN_CELLS; x++) {
                if (data[lvl].task[y][x] == 2) {
                    console.log(x + " " + y);
                    var egg = newItem(x * (CELL_SIZE_PX * 2) + CELL_SIZE_PX, y * (CELL_SIZE_PX * 2) + CELL_SIZE_PX, 0.5, eggTexture);
                    app.stage.addChild(egg);
                }

                if (data[lvl].task[y][x] == 3) {
                    console.log(x + " " + y);
                    var food = newItem(x * (CELL_SIZE_PX * 2) + CELL_SIZE_PX, y * (CELL_SIZE_PX * 2) + CELL_SIZE_PX, 0.5, foodTexture);
                    app.stage.addChild(food);
                }
                
            }
        }
     });
}

function checkTask(argument) {
	
}

function getRandInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function move() {
    var cmd = function () {
        chick.x += Math.cos(chick.rotation) * CELL_SIZE_PX * 2;
        chick.y += Math.sin(chick.rotation) * CELL_SIZE_PX * 2;
    }
    cmds.push(cmd);
}


function turnLeft() {
    var cmd = function() {
        chick.rotation -= Math.PI / 2;
    }
    cmds.push(cmd);
}

function turnRight() {
    var cmd = function() {
        chick.rotation += Math.PI / 2;
    }
    cmds.push(cmd);
}

function layEgg() {
    
}

function getFood() {
    
}


function reset() {
    chick.x = CELL_SIZE_PX;
    chick.y = CELL_SIZE_PX;
    chick.rotation = 0;
}


function run() {
    reset();
    cmds.unshift(function () {});
    for (var i = 0; i < cmds.length; i++) {
        setTimeout(eval(cmds[i]), 1000 * i);
    }
    cmds = [];
}

function loadJSON(callback) {   

   var xobj = new XMLHttpRequest();
       xobj.overrideMimeType("application/json");
   xobj.open('GET', './js/tasks.json', true); 
   xobj.onreadystatechange = function () {
         if (xobj.readyState == 4 && xobj.status == "200") {
           callback(xobj.responseText);
         }
   };
   xobj.send(null);  
}