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



var goalTexture = PIXI.Texture.from('assets/flag.png');
var wallTexture = PIXI.Texture.from('assets/rock.png');
var robotTexture = PIXI.Texture.from('assets/robot.png');
var bg = new PIXI.Graphics().beginFill(0xffffff).drawRect(0,0, cw, ch).endFill();


var field = new PIXI.Container();
var level = new PIXI.Container();
level.sortableChildren  = true;

var robot;
field.addChild(bg);

for (var x = 0; x < FIELD_SIZE_IN_CELLS; x++) {
    for (var y = 0; y < FIELD_SIZE_IN_CELLS; y++) {
        var dot = new PIXI.Graphics()
        dot.beginFill(0x9966FF);
        dot.drawCircle(CELL_SIZE_PX + x * CELL_SIZE_PX * 2, CELL_SIZE_PX + y * CELL_SIZE_PX * 2, 2);
        dot.endFill();
        field.addChild(dot);
    }
}


app.stage.addChild(field);
getTask(0);

var cd = $('.code-tools');
for (var i = 0; i < 3; i++) {
    var span = $('<span />').addClass('clear-editor').html(i + 1);
    span.click((function(index) {
        return function() {
            getTask(index); 
            console.log(index);
        };
    })(i));
    cd.append(span);          
}


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
        level.removeChildren();

        for (var y = 0; y < FIELD_SIZE_IN_CELLS; y++) {
            for (var x = 0; x < FIELD_SIZE_IN_CELLS; x++) {

                if (data[lvl].task[y][x] == 2) {

                    var goal = newItem(x * (CELL_SIZE_PX * 2) + CELL_SIZE_PX, y * (CELL_SIZE_PX * 2) + CELL_SIZE_PX, 0.5, goalTexture);

                    goal.zIndex = 9;
                    level.addChild(goal);
                }

                if (data[lvl].task[y][x] == 3) {
                    var wall = newItem(x * (CELL_SIZE_PX * 2) + CELL_SIZE_PX, y * (CELL_SIZE_PX * 2) + CELL_SIZE_PX, 0.5, wallTexture);

                    wall.zIndex = 6;
                    level.addChild(wall);
                    
                }

                if (data[lvl].task[y][x] == 1) {
                    robot = newItem(x * (CELL_SIZE_PX * 2) + CELL_SIZE_PX, y * (CELL_SIZE_PX * 2) + CELL_SIZE_PX, 0.5, robotTexture); 

                    robot.zIndex = 99;
                    level.addChild(robot);
                }
                
            }
        }
        app.stage.addChild(level);
     });
}

function checkTask(argument) {
	
}

function getRandInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function move() {
    var cmd = function () {
        robot.x += Math.cos(robot.rotation) * CELL_SIZE_PX * 2;
        robot.y += Math.sin(robot.rotation) * CELL_SIZE_PX * 2;
    }
    cmds.push(cmd);
}


function turnLeft() {
    var cmd = function() {
        robot.rotation -= Math.PI / 2;
    }
    cmds.push(cmd);
}

function turnRight() {
    var cmd = function() {
        robot.rotation += Math.PI / 2;
    }
    cmds.push(cmd);
}

function laygoal() {
    
}

function getwall() {
    
}


function reset() {
    /*
    robot.x = CELL_SIZE_PX;
    robot.y = CELL_SIZE_PX;
    */
    robot.rotation = 0;
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

var ticker = new PIXI.Ticker();

ticker.add(function (deltaTime) {
    //app.render(root);
});

ticker.start();