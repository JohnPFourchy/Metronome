// Define Audio Sources
let click1 = new Audio('audio/click1.mp3');
let click2 = new Audio('audio/click2.mp3');
let audioSource;

// A counter to play the correct click
let counter = 0;

let stoppedPressed = true;
// A counter to display the beat number
let beatCounter = 1;
// Boolean for if the audio has been played before
let firstPlay = false;
// array to hold the dots for visual tempo
let dotArray = document.getElementsByClassName("sec");


// Increases the tempo of the metronome when the '+' button is pressed
function increaseTempo() {
    let sliderVal = parseInt(document.getElementById("mainSlider").value);
    
    // Change the paragraph text
    if(sliderVal <= 250) {
        document.getElementById("mainSlider").value = sliderVal + 1;
        document.getElementById("bpm").innerHTML = document.getElementById("mainSlider").value + " BPM";
    }

    // Reset the audio when the button is pressed - creates smooth transitions with audio when changing tempos
    counter = 0;
    beatCounter = 1;
    window.clearTimeout(audioSource);
    resetDotColors();

    if(firstPlay && stoppedPressed == false) {
        figureInterval();
    }
}

// Increases the tempo of the metronome when the '-' button is pressed
function decreaseTempo() {
    let sliderVal = parseInt(document.getElementById("mainSlider").value);
    
    // Change the paragraph text
    if(sliderVal >= 30) {
        document.getElementById("mainSlider").value = sliderVal - 1;
        document.getElementById("bpm").innerHTML = document.getElementById("mainSlider").value + " BPM";
    }

    // Reset the audio when the button is pressed - creates smooth transitions with audio when changing tempos
    counter = 0;
    window.clearTimeout(audioSource);
    beatCounter = 1;
    resetDotColors();

    if(firstPlay && stoppedPressed == false) {
        figureInterval();
    }
}

// Increase or decrease the tempo of the metronome when the slider is dragged
function draggingTempo() {
    document.getElementById("bpm").innerHTML = document.getElementById("mainSlider").value + " BPM";
    // Reset the audio for smooth transitions when changing tempos
    window.clearTimeout(audioSource);
    counter = 0;
    beatCounter = 1;
    resetDotColors();

    // Check to only play sound by dragging slider when 
    if(firstPlay && stoppedPressed == false) {
        figureInterval();
    }
}

// Figure out the correct amount of time between beats
function figureInterval() {
    stoppedPressed = false;
    firstPlay = true;
    let sliderVal = parseInt(document.getElementById("mainSlider").value);
    let seconds = 60.0 / sliderVal;
    let milliseconds = seconds * 1000;

    // Play a beat at the correct time interval
    audioSource = window.setInterval(function(){playClick()}, milliseconds);

}

// Play a click sound. If the beat is at the top of the measure (in 4/4 time)
// a different sound is played. Also handles changing the colors of the visual dots.
function playClick() {
    // Change the color of a visual dot to white
    if((counter % 4) != 0) {
        dotArray[(counter % 4) - 1].style.backgroundColor = "#FFF";
    } else {
        dotArray[3].style.backgroundColor = "#FFF";
    }
    
    // play a sound
    if(counter % 4 == 0) { 
        click2.play();
    } else {
        click1.play();
    }

    // Set the beat counter back to 1
    if(beatCounter > 4) {
        beatCounter = 1;
    }

    document.getElementById("beatNumber").innerHTML = beatCounter;
    beatCounter += 1;

    // change the color of a visual dot to green
    dotArray[counter % 4].style.backgroundColor = "#4CAF50";
    counter += 1;
}

// Stop audio when stop is pressed.
function stopClick() {
    stoppedPressed = true;
    counter = 0;
    beatCounter = 1;
    document.getElementById("beatNumber").innerHTML = "- -"
    window.clearTimeout(audioSource);
    resetDotColors();
}

// Resets the dot colors for smooth transitions when changing tempos
function resetDotColors() {
    for(let i = 0; i < dotArray.length; i++) {
        dotArray[i].style.backgroundColor = "#FFF";
    }
}