"use strict"
window.onload = function () {
    var stack = [];
    var displayVal = "0";
    for (var i in $$('button')) {
        $$('button')[i].onclick = function () {
            var value = this.innerHTML;
            if (!(isNaN(value))) {
              if (displayVal == "0") displayVal = value;
              else if (!(isNaN(value))) displayVal += value;
              else calculator(displayVal);
            }
            else if (value == "AC") {
              displayVal = "0";
              stack = [];

              document.getElementById('expression').innerHTML = "0";
            }
            else if (value == ".") {
              if (displayVal.indexOf(".") == -1) displayVal += value;
            }
            else {
              if (stack[(stack.length)-1] == "*" || stack[(stack.length)-1] == "/" || stack[(stack.length)-1] == "^") {
                stack = highPriorityCalculator(stack, displayVal);
                stack.push(value);
              }


              else if (value == "!") {

              }
              else {
                stack.push(displayVal);
                stack.push(value);
              }

              document.getElementById('expression').innerHTML = stack;




              displayVal = "0";
            }
            document.getElementById('result').innerHTML = displayVal;
        };
    }
};
function factorial (x) {
  var result = 1;
  for (var i=1; i<=x; i++) {
    result = result * i;
  }
  return result;
}
function highPriorityCalculator(s, val) {
  if (s[(s.length)-1] == "*") {
    s.pop();
    s.push(parseInt(val) * parseInt(s.pop()));
  }
  else if (s[(s.length)-1] == "/") {
    s.pop();
    s.push(parseInt(val) / parseInt(s.pop()));
  }
  else if (s[(s.length)-1] == "^") {
    s.pop();
    s.push(parseInt(val) ^ parseInt(s.pop()));
  }
  return s;
}
function calculator(s) {
    var result = 0;
    var operator = "+";
    for (var i=0; i< s.length; i++) {

    }
    return result;
}
