function increaseTempo() {
    let sliderVal = parseInt(document.getElementById("mainSlider").value);
    
    if(sliderVal <= 255) {
        document.getElementById("mainSlider").value = sliderVal + 1;
        document.getElementById("bpm").innerHTML = document.getElementById("mainSlider").value + " BPM";
    }
}

function decreaseTempo() {
    let sliderVal = parseInt(document.getElementById("mainSlider").value);
    
    if(sliderVal >= 30) {
        document.getElementById("mainSlider").value = sliderVal - 1;
        document.getElementById("bpm").innerHTML = document.getElementById("mainSlider").value + " BPM";
    }
}

function draggingTempo() {
    document.getElementById("bpm").innerHTML = document.getElementById("mainSlider").value + " BPM";
}