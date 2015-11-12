"use strict"
window.onload = function () {
    var stack = [];
    var displayVal = "0";
    for (var i in $$('button')) {
        $$('button')[i].onclick = function () {
            var value = this.innerHTML;
            if (!(isNaN(value))) {
              if (displayVal == "0") displayVal = value;
              else displayVal += value;
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


                if (value == "=") {
                  stack = highPriorityCalculator(stack, displayVal);                  
                  displayVal = calculator(stack);
                  stack = [];
                  document.getElementById('expression').innerHTML = "0";
                }
                else {
                  stack = highPriorityCalculator(stack, displayVal);
                  stack.push(value);
                  displayVal = "0";
                }


              }

              else if (value == "!") {
                if (stack.length != 0) {
                  var temp = stack.pop();
                  if (temp == "!") stack.push(temp);
                  else {
                    stack.push(temp);
                    //displayVal = factorial(displayVal);
                    stack.push(parseFloat(displayVal));
                    stack.push(value);
                  }
                }
                else {
                  stack.push(parseFloat(displayVal));
                  stack.push(value);
                }
                displayVal = "0";
              }

              else if (value == "=") {
                stack.push(parseFloat(displayVal));
                displayVal = calculator(stack);
                stack = [];
                document.getElementById('expression').innerHTML = "0";
              }

              else {
                if (stack.length != 0) {
                  var temp = stack.pop();
                  if (!(isNaN(temp))) stack.push(temp);
                  else if (temp == "!") {
                    stack.push(temp);
                  }
                  else {
                    stack.push(temp);
                    stack.push(parseFloat(displayVal));
                  }
                }
                else stack.push(parseFloat(displayVal));
                stack.push(value);

                displayVal = "0";
              }


              for (var j=0; j<stack.length; j++) {
                if (j == 0) {
                  document.getElementById('expression').innerHTML = stack[j];
                }
                else {
                  document.getElementById('expression').innerHTML += stack[j];
                }
              }
            }
            document.getElementById('result').innerHTML = displayVal;
            if (value == "=") displayVal = "0";
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
    s.push(s.pop() * parseFloat(val));
  }
  else if (s[(s.length)-1] == "/") {
    s.pop();
    s.push(s.pop() / parseFloat(val));
  }
  else if (s[(s.length)-1] == "^") {
    s.pop();
    s.push(Math.pow(s.pop(), parseFloat(val)));
  }
  return s;
}

function calculator(s) {
    var result = 0;
    var flag = 1;
    var operator = "+";
    for (var i=0; i< s.length; i++) {
      if (!(isNaN(s[i]))) {
        if (i == 0) result = s[i];
        else if (flag == 1) result += s[i];
        else if (flag == 0) result -= s[i];
      }
      else if (s[i] == "!") {
        if (flag == 1) {
          result -= s[i-1];
          result += factorial(s[i-1]);
        }
        else if (flag == 0) {
          result += s[i-1];
          result -= factorial(s[i-1]);
        }
      }
      else if (s[i] == operator) {
        flag = 1;
      }
      else {
        flag = 0;
      }
    }
    return result;
}
