
  function audioAlert(filename){
    var mp3 = '<source src="' + "files/" + filename + '.mp3" type="audio/mpeg">';
    var ogg = '<source src="' + "files/" + filename + '.ogg" type="audio/ogg">';
    var embed = '<embed hidden="true" autostart="true" loop="false" src="' + filename +'.mp3">';
    document.getElementById("sound").innerHTML='<audio autoplay="autoplay">' + mp3 + ogg + embed + '</audio>';
  }

var timerStop = false;//global flag to know when to stop the timer
 function MyTimer(val){
   var start = Date.now();
     setInterval(function() {
         var delta = Date.now() - start; // milliseconds elapsed since start
         var minutes = Math.floor(delta/ 60000)+1 //minutes elapsed
         var seconds = Math.floor(delta/ 1000)

         if(timerStop){
           document.getElementById('timer').innerHTML = 'Timer complete!';
         }
         if(!timerStop){
           output(minutes, val, seconds);
         }
     }, 1000); // update about every second
 }

 function output(numMin,initVal, secondsPassed){
   var totalSec = initVal*60;

   if(secondsPassed == totalSec){
     timerStop = true;
   }

   totalSec = (totalSec-secondsPassed)%60;
   document.getElementById('timer').innerHTML = 'Time left = ' + (initVal-numMin) + ' minutes and ' + totalSec + ' seconds';
 }

 function StartTimer(){//this starts the timer loop by calling it with the input value
   MyTimer(document.getElementById("userTimerInput").value);
 }


 var allSites = [];
 function sites()
 {
 var input = document.getElementById("userSiteInput").value;

 allSites.push(input);
 document.getElementById('siteList').innerHTML += '<br>' + input;
 }