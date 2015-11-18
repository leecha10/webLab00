"use strict";

var interval = 2000;
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
      if (targetBlocks.length == numberOfTarget) break;
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
              selectedBlocks += this.readAttribute("data-index");
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

    var answer;
    var result = $("answer").innerHTML.split("/");
    result[0] = parseInt(result[0]);
    result[1] = parseInt(result[1]);

    for (var i=0; i<targetBlocks.length; i++) {
      for (var j=0; j<selectedBlocks.length; j++) {
          if (targetBlocks[i] == selectedBlocks[j]) result[0] += 1;
      }
    }

    result[1] += numberOfTarget;
    answer = result.join("/");

    $("answer").innerHTML = answer;

    timer = setTimeout(startToSetTarget, interval);

}
