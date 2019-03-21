var yesButton = document.getElementById("yesBtn");
var noButton = document.getElementById("noBtn");
var yesDisplay = document.getElementById("yesDisplay");
var noDisplay = document.getElementById("noDisplay"); 
var timeInMinutes = document.getElementById("minSet");
var idkButton = document.getElementById("idkBtn");
var audio = document.getElementById("bell");
var clear = document.getElementById("clearBtn");

function yesCheck() {
    var lastTaken = new Date();
    myJSON = JSON.stringify(lastTaken);
    localStorage.setItem("lastTakenJSON", myJSON);
    var text = localStorage.getItem("lastTakenJSON");
    yesDisplay.innerHTML="Good Job! You last took your medication " + text;
}


function idk() {
    var text = localStorage.getItem("lastTakenJSON");
    yesDisplay.innerHTML="You took your medication last on: " + text;
}

function noCheck(){
    var deadline;
    
    //function to get alarm "date" starts here //
    function getTime(deadline) {
            var d = Date.parse(new Date());
            var x = timeInMinutes.value;
            deadline = new Date(d + x * 60 * 1000);
            return deadline;
    
   
        }
    var endTime = getTime(deadline);
    
    
    //Ends Here//
    //Function to modify countdown component will start here //
    UIkit.util.$$('[js-countdown]').forEach(function(el) {
                UIkit.countdown(el, {date: endTime});
            });
    
    //End Here//
    //function to start alarm will start Here//
    var alarm;
    var timeout
    
    function alarmTimer() {
        alarm = setInterval(alert, 1000);
    }
    alarmTimer();
    clear.addEventListener("click", function(){
        clearInterval(alarm);
        yesDisplay.innerHTML="";
        UIkit.countdown('[js-countdown]').stop();
        UIkit.countdown('[js-countdown]', {date: 0});
    });
    function alert() {
        var distance = endTime - new Date().getTime();
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if (distance < 0) {
            audio.play();
            yesDisplay.innerHTML="You Win!!!";
            timeout = setTimeout(function(){clearInterval(alarm)}, 12000);
            
        } else {
            yesDisplay.innerHTML="Counting Down " + minutes + " minutes and " + seconds + " seconds to go";
        }
    }
        
    
    //End Here//
}
   



function medCheck() {
   yesButton.addEventListener("click",yesCheck);
    noButton.addEventListener("click", noCheck);
    idkButton.addEventListener("click", idk);
    

}
medCheck()
