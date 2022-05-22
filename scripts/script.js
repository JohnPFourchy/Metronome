// Define Audio Sources
let click1 = new Audio('audio/click1.mp3');
let click2 = new Audio('audio/click2.mp3');
let audioSource;

// A counter to play the correct click
let counter = 0;
// Boolean for if the audio has been played before
let firstPlay = false;


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
    window.clearTimeout(audioSource);
    if(firstPlay) {
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
    if(firstPlay) {
        figureInterval();
    }
}

// Increase or decrease the tempo of the metronome when the slider is dragged
function draggingTempo() {
    document.getElementById("bpm").innerHTML = document.getElementById("mainSlider").value + " BPM";
    // Reset the audio for smooth transitions when changing tempos
    window.clearTimeout(audioSource);
    counter = 0;

    // Check to only play sound by dragging slider when 
    if(firstPlay && stopPressed == true) {
        figureInterval();
    }
}

// Figure out the correct amount of time between beats
function figureInterval() {
    firstPlay = true;
    let sliderVal = parseInt(document.getElementById("mainSlider").value);
    let seconds = 60.0 / sliderVal;
    let milliseconds = seconds * 1000;

    // Play a beat at the correct time interval
    audioSource = window.setInterval(function(){playClick()}, milliseconds);

}

// Play a click sound. If the beat is at the top of the measure (in 4/4 time)
// a different sound is played
function playClick() {
    if(counter % 4 == 0) {
        click2.play();
    } else {
        click1.play();
    }
    counter += 1;
}

// Stop audio when stop is pressed.
function stopClick() {
    counter = 0;
    window.clearTimeout(audioSource);
}