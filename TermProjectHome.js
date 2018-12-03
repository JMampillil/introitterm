var filename = "";
function setAudio(event) {
  filename = event.target.value;
  audioAlert(filename);
}

function audioAlert(f){//gets called with a select event
  var mp3 = '<source src="' + "files/" + f + '.mp3" type="audio/mpeg">';
  var ogg = '<source src="' + "files/" + f + '.ogg" type="audio/ogg">';
  var embed = '<embed hidden="true" autostart="true" loop="false" src="' + filename +'.mp3">';
  document.getElementById("sound").innerHTML='<audio autoplay="autoplay">' + mp3 + ogg + embed + '</audio>';
}

var timerStop = false;//global flag to know when to stop the timer
var firstTimer = true;//flag to make sure the user isn't creating overlapping timers
function MyTimer(val){
var start = Date.now();
setInterval(function() {
  firstTimer = false;
    var delta = Date.now() - start; // milliseconds elapsed since start
    var minutes = Math.floor(delta/ 60000)+1 //minutes elapsed
    var seconds = Math.floor(delta/ 1000)//seconds elapsed

    if(timerStop){//stop the timer when it is at 0 mins 0 secs
      document.getElementById('timer').innerHTML = 'Timer complete!';
    }

    if(!timerStop){//make sure the timer doesn't go negative
      output(minutes, val, seconds);
  }
}, 1000); // update about every second
}


function testCookie(name,val){
Cookies.set('ttt', 'value');
alert(Cookies.get('ttt'));
}

//takes in information from the timer and creates+outputs a message
function output(numMin,initVal, secondsPassed){
 var totalSec = initVal*60;
 if(secondsPassed == totalSec){
   timerStop = true;//stop the timer when it is at 0 minutes 0 seconds
 }
 totalSec = (totalSec-secondsPassed)%60;
 document.getElementById('timer').innerHTML = 'Time left = ' + (initVal-numMin) + ' minutes and ' + totalSec + ' seconds';
}

function StartTimer(){//this starts the timer loop by calling it with the input value
 if(firstTimer){//make sure the user isn't creating overlapping timers
    MyTimer(document.getElementById("userTimerInput").value);
 }
}

var siteCounter;
var noRepeatLoop = false;
function sites()
{
 if(Cookies.get('numOfCookies') === undefined){
   var siteCounter = 0;
   //check if the user has previously stored sites and initialize var if not
   document.getElementById('siteList').innerHTML = 'Sites: '
   noRepeatLoop = true;//prevent the below for loop from outputting garbage on future uses
 }else{
   var siteCounter = parseInt(Cookies.get('numOfCookies'),10);
   if(!noRepeatLoop){
     document.getElementById('siteList').innerHTML = 'Sites: '
     for (var i = 0; i<siteCounter; i++){
       document.getElementById('siteList').innerHTML += '<br> ' + Cookies.get(i.toString());
     }//if the user has previously stored sites, output them to the page
     //but only the first time this runs per page reload
   }
   noRepeatLoop = true;
 }
 var input = document.getElementById("userSiteInput").value;//grab input from page
 Cookies.set(siteCounter, input);//create cookie for that site with an incrementing value
 document.getElementById('siteList').innerHTML += '<br> ' + input;//output to page
 siteCounter++;
 Cookies.set('numOfCookies',siteCounter);
 //increment the site counter and update the cookie
}

function resetSites(){
for(var i = 0; i<Cookies.get('numOfCookies'); i++){
  Cookies.remove(i.toString());//remove all the cookies
}
Cookies.remove('numOfCookies');
document.getElementById('siteList').innerHTML = "Sites:";
siteCounter = 0;
}