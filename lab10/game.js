"use strict";

var interval = 3000;
var numberOfBlocks = 9;
var numberOfTarget = 3;
var targetBlocks = [];
var selectedBlocks = [];
var timer;

document.observe('dom:loaded', function(){
    $("start").observe("click", stopToStart);
    $("stop").observe("click", stopGame);

});

function stopToStart(){
    stopGame();
    startToSetTarget();
}

function stopGame(){
    $("state").innerHTML = "Stop!";
    $("answer").innerHTML = "0/0";

    var blocks = $$(".block");
    for (var i=0; i<blocks.length; i++) {
      blocks[i].removeClassName("selected");
      blocks[i].removeClassName("target");
    }
    targetBlocks = [];
    selectedBlocks = [];
    clearTimeout(timer);
}

function startToSetTarget(){
    $("state").innerHTML = "Ready!";

    targetBlocks = [];
    selectedBlocks = [];

    while (true) {
      if (targetBlocks.length == 3) break;
      var temp = Math.floor(Math.random() * numberOfBlocks);
      if (targetBlocks[(targetBlocks.length)-1] != temp) targetBlocks += temp;
    }

    timer = setTimeout(setTargetToShow, interval);
}

function setTargetToShow(){
    $("state").innerHTML = "Memorize!";

    var blocks = $$(".block");
    for (var i=0; i<targetBlocks.length; i++) {
      blocks[targetBlocks[i]].addClassName("target");
    }

    timer = setTimeout(showToSelect, interval);
}

function showToSelect(){
    $("state").innerHTML = "Select!";

    var blocks = $$(".block");
    for (var i=0; i<targetBlocks.length; i++) {
      blocks[targetBlocks[i]].removeClassName("target");
    }

    for (var i=0; i<blocks.length; i++) {
      blocks[i].observe("click", function(){
        if (!(this.hasClassName("selected"))) {
          if ($("state").innerHTML == "Select!") {
            if (selectedBlocks.length < numberOfTarget) {
              this.addClassName("selected");
              selectedBlocks += i;
            }
          }
        }
      });
    }

    timer = setTimeout(selectToResult, interval);

}

function selectToResult(){
    $("state").innerHTML = "Checking!";

    var blocks = $$(".block");
    for (var i=0; i<blocks.length; i++) {
        blocks[i].removeClassName("selected");
    }

    /* answer도 아직
    var answer = 0;
    for (var i=0; i<targetBlocks.length; i++) {
      for (var j=0; j<selectedBlocks.length; i++) {
          if (targetBlocks[i] == selectedBlocks[j]) answer++;
      }
    }
    $("answer").innerHTML = answer + "/" + numberOfTarget;
    */
    timer = setTimeout(startToSetTarget, interval);

}
