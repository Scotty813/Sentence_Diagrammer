//declare global vars
    var preConf = 5,
        preScore = 0,
        elDragged = 0;
        maxScore = 0;

    var diagram = {sent: 0, adj: 0, adv: 0};

    var sentence = "Re34d'     Ro'!@ver        Bark,.ed   Loudly",
        words = [],
        proposal = ["", "", "", ""];

    //scrubs sentence
    convertSentence();

    //focus on input when page loads
    $( document ).ready(function() {
      $( "#fname" ).focus();
    });     //jQuery

    

    //populates mainL
    function loadMainL() {
      var mainLeft = $("#mainL");
      var images = "";
      images += "<img src='img/mainSentence.jpg' id='mainSentence' draggable='true' ondragstart='drag(event)' value='1' style='width: 150px; height: 70px'><img src='img/modifier.jpg' id='modifier' draggable='true' value='2' ondragstart='drag(event)' style='width: 150px; height: 70px'>";
      return mainLeft.html(images);
    };

    //populates mainR
    function loadMainR() {
      var mainRight = $("#mainR");
      var buttons = "";
          buttons += '<button type="button" id="Red" class="slidable btn btn-primary btn-list" draggable="true" value="3" ondragstart="drag(event)"><strong>Red</strong></button>';
          buttons += '<button type="button" id="Rover" class="slidable btn btn-primary btn-list" draggable="true" value="4" ondragstart="drag(event)"><strong>Rover</strong></button>';
          buttons += '<button type="button" id="Barked" class="slidable btn btn-primary btn-list" draggable="true" value="5" ondragstart="drag(event)"><strong>Barked</strong></button>';
          buttons += '<button type="button" id="Loudly" class="slidable btn btn-primary mb-4 btn-list" draggable="true" value="6" ondragstart="drag(event)"><strong>Loudly</strong></button>';

          buttons += '<button type="button" class="btn btn-danger btn-list" onclick="return resetAll()"><strong>Reset</strong></button>';
          buttons += '<button type="button" class="btn btn-warning btn-list" onclick="return checkProposal()"><strong>Check Answer</strong></button>';
          buttons += '<button type="button" class="btn btn-success btn-list" onclick="displayClosing()"><strong>Done</strong></button>';
          
          return mainRight.html(buttons);
    };

    //checks to see if input is blank
    function validName() {
        firstname = $("#fname").val();
        message = document.getElementById("error");
        if(firstname == "") {
          message.innerHTML = "**Please fill in your name**";
          return false;
        } else {
          message.innerHTML = "";
          return displayPrelimQ(preConf);
        }
    };

    //display prelim questions if name is given
    function displayPrelimQ(preConf) {
        var $mainB = $("#mainB"),
            newSection = "";
        newSection += "<p class='lead text-center mt-2'>Hello " + firstname + "!</p>";
        newSection += "<p class='lead text-center'>Before we get started, please answer two questions for us.</p>";
        newSection += "<p class='lead text-center'>How confident do you feel in your ability to diagram sentences?</p>";
        newSection += "<p class='text-center'>Very Uncertain<input class='mx-3' id='preConf' type='range' min='1' max='10' value='" + preConf + "'>Very Confident</p>";
        newSection += "<p class='lead text-center'>If you were to take a test right now, what do you think you'd score out of 100 points?</p>";
        newSection += "<div class='text-center'><p class='d-inline'>I'd score<form class='d-inline mx-2'><input class='form-control d-inline' style='width: 100px' type='text' id='preScore'></form>points.</p><button type='submit' onclick='validConf()' class='btn btn-primary my-2'>Submit</button><p id='error' class='text-danger font-weight-bold'></p></div>";
        mainB.innerHTML = newSection;
        return $mainB;
    };

    //scrubs out extra white space and punctuation from sentence
    function convertSentence() {
      sentence = sentence.replace(/ +/g, ' '); //takes out extra whitespace
      words = sentence.split(" "); //cycles through each word in array and scrubs out punctuation
      for (var i = 0; i < words.length; i++) {
        words[i] = words[i].replace(/[^a-zA-Z]+/g,'');
      };
      sentence = words.join(" "); //place scrubbed words back into sentence string
    };

    //validates that score is between 1 and 100
    function validConf() {
      preScore = document.getElementById("preScore").value;
      preConf = document.getElementById("preConf").value;
      var message = document.getElementById("error");
      try {
        if(preScore == "") throw "empty**";
        if(isNaN(preScore)) throw "not a number**";
        preScore = Number(preScore);
        if(preScore <= 0) throw "too low**";
        if(preScore > 100) throw "too high**";
      }
      catch(err) {
        message.innerHTML = "**Pre-score is " + err;
      }
      finally {
        if((preScore >= 1) && (preScore <= 100)){
          return displayDiagram();
        } else {
            document.getElementById("preScore").value = "";
            $("#preScore").focus(); //jQuery
          }
      }

    };

    function displayDiagram() {
      loadMainL();
      loadMainR();

      //resets values after "Practice More" button is clicked at the end of program
      //No need for redundant code in resetAll function
      for(var key in diagram) {  //cycles through diagram and resets all to 0
              diagram[key] = 0;
          }  

      proposal = ["", "", "", ""]; //clears out proposal array

      w = document.getElementById("mainB").offsetWidth;
      h = document.getElementById("mainB").offsetHeight - 8;
      mainB.style.paddingLeft = 0;
      //set new header greeting
      newGreeting = document.getElementById("header");
      newGreeting.innerHTML = '<h1 class="display-4">Please diagram this sentence.</h1>';
      newGreeting.innerHTML += '<h2 class="display-6"><strong>' + sentence + '<strong></h2>';
      //insert canvas
      mainB.innerHTML = '<canvas id="myCanvas" width="' + w + '" height="' + h + '" ondrop="processChoice(event)" ondragover="allowDrop(event)"></canvas><p id="errorM" class="text-danger font-weight-bold"></p>';

    };

    function processChoice(ev){ 
      var choice = elDragged;
      var c = document.getElementById("myCanvas");
      var rect = c.getBoundingClientRect();  //gets coordinates of canvas relative to the viewport
      var w = c.width;
      var h = c.height;
      var ctx = c.getContext("2d");
      ctx.font = "20px Arial";
      var dropX = ev.clientX - rect.left; // x value of drop event on canvas
      var dropY = ev.clientY - rect.top; // y value of drop event on canvas
      var wordText = ev.dataTransfer.getData("text"); //grab id of button being dragged. 
      console.log(wordText);

      if (choice == 1) {
        drawMainSentence(ctx, w, h);
      } else if ((choice == 2) && (dropX < w*.5)) { //modifier on left side
        drawAdjLine(ctx, w, h);
      } else if ((choice == 2) && (dropX > w*.5)) { //modifier on right side
        drawAdvLine(ctx, w, h);
      }
      if (choice > 2) {
        if ((dropX < w*.5) && (dropY < h*.4)) {  //top left quadrant
          drawSubject(ctx, w, h, wordText);
        } else if ((dropX > w*.5) && (dropY < h*.4)) { //top right 
          drawPredicate(ctx, w, h, wordText);
        } else if ((dropX < w*.5) && (dropY > h*.5)) {  //bottom left
          drawAdj(ctx, w, h, wordText);
        } else {   //bottom right
          drawAdv(ctx, w, h, wordText);
        }
      }

    };

    function allowDrop(ev) {
    ev.preventDefault();
    };

    function drag(ev) {
        elDragged = ev.target.getAttribute("value");
        ev.dataTransfer.setData("text", ev.target.id); //grabs id of item being dragged
    };

    function drawMainSentence(ctx, w, h) {
      if (diagram.sent) {
          document.getElementById("errorM").innerHTML =
               "You already have the main sentence structure.";
     } else {
          diagram.sent = 1;
          document.getElementById("errorM").innerHTML = "";

          // draw horizontal line for sentence structure
          ctx.beginPath ();
          ctx.moveTo (.2*w, .4*h);
          ctx.lineTo (.8*w, .4*h);
          ctx.stroke ();

          // draw vertical line for sentence structure
          ctx.beginPath ();
          ctx.moveTo(.5*w,.3*h);
          ctx.lineTo(.5*w,.5*h);
          ctx.stroke ();
     } //ends else statement
    };

    function drawAdjLine(ctx, w, h) {
      if (!diagram.sent) {
          document.getElementById("errorM").innerHTML = 
               "You need to send the main sentence structure first.";
     }
     else if (diagram.adj){
          document.getElementById("errorM").innerHTML = 
               "The adjective structure already exists";
     }
     else {
          diagram.adj = 1;
          document.getElementById("errorM").innerHTML = "";

          // draw adjective line for sentence structure
          ctx.beginPath ( );
          ctx.moveTo (.25*w,.4*h);
          ctx.lineTo (.5*w,.8*h);
          ctx.stroke ( );
     }
    };

    function drawAdvLine(ctx, w, h) {
      if (!diagram.sent) {
          document.getElementById("errorM").innerHTML = 
               "You need to send the main sentence structure first.";
     }
     else if (diagram.adv){
          document.getElementById("errorM").innerHTML = 
               "The adverb structure already exists";
     }
     else {
          diagram.adv = 1;
          document.getElementById("errorM").innerHTML = "";

          // draw adjective line for sentence structure
          ctx.beginPath ();
          ctx.moveTo (.55*w,.4*h);
          ctx.lineTo (.8*w,.8*h);
          ctx.stroke ();
     }
    };

    function drawSubject(ctx, w, h, sub) {
     // Checks if a sentence structure has been drawn.
     // Displays an error if it hasn't been.
     if(diagram.sent != 1) { 
          document.getElementById("errorM").innerHTML = 
          "You need to draw the main sentence structure first.";
          return false;
     } 

     // Only executes if sentence structure drawn.  
     else { 
          if(proposal[1]) {
               document.getElementById("errorM").innerHTML =
               "You have already selected a subject.";
          }
          else {
              proposal[1] = sub;
              document.getElementById("errorM").innerHTML = "";
              ctx.fillText(sub, .25*w, .35*h);
          }
     }
    };

    function drawPredicate(ctx, w, h, pred) {
      // Checks if a sentence structure has been drawn.
     // Displays an error if it hasn't been.
     if(diagram.sent != 1) { 
          document.getElementById("errorM").innerHTML = 
          "You need to draw the main sentence structure first.";
          return false;
     } 

     // Only executes if sentence structure drawn.  
     else { 
          if(proposal[2]) {
               document.getElementById("errorM").innerHTML =
               "You have already selected a predicate.";
          }
          else {
              proposal[2] = pred;
              document.getElementById("errorM").innerHTML = "";
              ctx.fillText(pred, .55*w, .35*h);
          }
     }
    };

    function drawAdj(ctx, w, h, adj) {
      var error = document.getElementById("errorM");

      if (diagram.sent == 0) {  //makes sure main sentence has been placed
        error.innerHTML = "**Sentence structure must be placed first**";
        return false;
      } 
      else if (diagram.adj == 0) {
        error.innerHTML = "**Adjective structure must be placed first**";
        return false;
      } 
      else {
        if (proposal[0]) { //checks to see if adj has already been selected
          error.innerHTML = "**You already have selected an adjective**";
        } else {
          error.innerHTML = "";
          proposal[0] = adj;

          ctx.save();
          ctx.translate((w*.33), (h*.45));
          ctx.rotate(42*Math.PI/180);
          ctx.fillText(adj, 0, 10);
          ctx.restore();
        }
      }

    };

    function drawAdv(ctx, w, h, adv) {
      var error = document.getElementById("errorM");

      if (diagram.sent == 0) {  //makes sure main sentence has been placed
        error.innerHTML = "**Sentence structure must be placed first**";
        return false;
      } 
      else if (diagram.adv == 0) {
        error.innerHTML = "**Adverb structure must be placed first**";
        return false;
      } 
      else {
        if (proposal[3]) { //checks to see if adj has already been selected
          error.innerHTML = "**You already have selected an adverb**";
        } else {
          error.innerHTML = "";
          proposal[3] = adv;

          ctx.save();
          ctx.translate((w*.63), (h*.45));
          ctx.rotate(42*Math.PI/180);
          ctx.fillText(adv, 0, 10);
          ctx.restore();
        }
      }
    };

    function checkProposal() {
        var numCorrect = 0;
        var percentCorrect = 0;
        var info = document.getElementById("errorM");
        var message = "", wordsIncorrect = "";
        for(var i = 0; i < 4; i++) {  //compares words array to proposal for sameness
            if(words[i] === proposal[i]) {
                numCorrect++;
            } 
            else {
                wordsIncorrect += proposal[i] + " ";
            }
        }
        
        percentCorrect = (numCorrect/4) * 100;

        if (percentCorrect == 100) {
          message = "<p class='text-info pl-3'>Congratulations, you scored a 100%!</p>";
          info.innerHTML = message;
        } 
        else {
          message += "<p class='text-info pl-3'>These words require a different placement: " + wordsIncorrect + "</p>";
          message += "<p class='text-info pl-3'>You earned a " + percentCorrect + "% correct, " + firstname + "</p>";
          
          info.innerHTML = message;
        }
        
        return percentCorrect;
        
    };
      
    function displayClosing() {
        var newGreeting = document.getElementById("header");
        var message = "";
        var mainB = document.getElementById("mainB");
        var percentCorrect = checkProposal();  //returns percent correct and stores in variable
        document.getElementById("mainL").innerHTML = "";
        document.getElementById("mainR").innerHTML = "";
        
        //Change header
        message = "<h1 class='display-4'>Thank you for using the Sentence Diagrammer!</h1>";
        message +="<h2 class='display-6'>How do you feel you did, " + firstname + "?</h2>";
        newGreeting.innerHTML = message;
        
        //change mainB
        message = "<p class='lead text-center mt-2'>You anticipated earning " + preScore + "%, and you ended up earning " + percentCorrect + "%.</p>";
        message += "<p class='lead text-center'>Based on this information, how confident are you about diagramming sentences now?</p>";
        message += "<p class='text-center'>Very Uncertain<input class='mx-3' id='preConf' type='range' min='1' max='10' value='" + preConf + "'>Very Confident</p>";
        message += "<div class='text-center'><button type='submit' onclick='return displayGoodbye()' class='btn btn-primary my-2'>Submit</button></div>";
        
        mainB.innerHTML = message;
        
    };
      
    function displayGoodbye() {
        postConf = document.getElementById("preConf").value;
        
        if (postConf > preConf) {
            mainB.innerHTML = "<p class='lead mt-3 mb-3 text-center'>We're so glad you feel more confident!</p>";
        } else {
            mainB.innerHTML = "<p class='lead text-center'>We're sorry to hear you don't feel more confident now.</p>";
            mainB.innerHTML += "<p class='lead text-center'>Perhaps you would like more practice</p>";
            mainB.innerHTML += "<div class='text-center'><button type='submit' onclick='return displayDiagram()' class='btn btn-primary my-2'>Practice More</button></div>";
        }
        
    };

    function resetAll() {
          //**SEE COMMENTS IN DISPLAYDIAGRAM
          // -----------------------------------
          // for(var key in diagram) {  //cycles through diagram and resets all to 0
          //     diagram[key] = 0;
          // }  
          // proposal = ["", "", "", ""]; //clears out proposal array
          $("#errorM").hide(); //jQuery
          return displayDiagram();
    };
