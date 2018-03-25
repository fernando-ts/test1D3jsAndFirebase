/* */
window.onload = initialize;

function initialize() {
    renderGraphFromFire();
}

function renderGraphFromFire() {
    /*Retriving info from firebase */
    refCandidates = firebase.database().ref().child("candidates"); 
    
    refCandidates.on("value", function (snapshot) {
        var dataFromFire = snapshot.val();
        var dataToShow = [];

        var totalPoints = 0;
        for (var key in dataFromFire) {
            totalPoints += dataFromFire[key].points;
        }

        for (var key in dataFromFire) {
            var pointsAverage = dataFromFire[key].points / totalPoints;
            dataToShow.push({ valueX: dataFromFire[key].name, valueY: pointsAverage });
            
        }
        draw(dataToShow); /*calling the function from test1.js */
    });  
}