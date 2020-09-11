//Master Synth Engine
var notes = ["C", "D", "E", "F", "G", "A", "B"]//available note
const synth = new Tone.Synth().toDestination();//creates new synth instrument
var html = ""

//set max amount of octaves
for (var octave = 0; octave < 2 ; octave++)
{
    for (var i = 0; i < notes.length; i++) {
        var note = notes[i];
        var hasSharp = true;
        
        //eliminate E# and B# keys
        if (note === "E" || note === "B"){
            hasSharp = false;
        }
        //create white key class within keyboard container
        html += `<div class="whitenote"
            onmousedown = "noteDown(this, false)"
            onmouseleave = "noteUp(this, false)"
            ontouchstart = "noteDown(this, false)"
            ontouchend = "noteUp(this, false)"
            data-note="${note + (octave + 3)}">`;
        //create black key class within keyboard container
        if (hasSharp){
            html += `<div class="blacknote"
            onmousedown = "noteDown(this, true)"
            onmouseleave = "noteUp(this, true)"
            data-note="${note + "#" + (octave + 3)}"></div>`;
        }
        
        html += `</div>`
    }
}

document.getElementById("keyboard").innerHTML = html;

function noteDown(elem, isSharp){
    var note = elem.dataset.note;
    console.log("user triggered", note);
    elem.style.background = isSharp ? "rgb(78, 78, 78)" : "#ccc"
    synth.triggerAttackRelease(note);
    event.stopPropagation();
}

function noteUp(elem, isSharp){
    elem.style.background = isSharp ? "rgb(158, 158, 158)" : "none"
    synth.triggerRelease();
}


var OSCbuttons = document.getElementsByClassName("oscbuttons")
for(let div of OSCbuttons) {
    div.onclick = (activeOSC) => {
        for(let notactiveOSC of OSCbuttons) {
            if(notactiveOSC != activeOSC.target) {
                notactiveOSC.dataset.active = false;
                activeOSC.target.dataset.active = true;
                
                switch(activeOSC.target.name){
                    case "sine":
                        synth.oscillator.type = "sine";
                    break;
                    case "saw":
                        synth.oscillator.type ="sawtooth";
                    break;
                    case "triangle":
                        synth.oscillator.type ="triangle";
                    break;
                    case "square":
                        synth.oscillator.type ="square";
                    break;
                }
                console.log("OSC has been set to:", activeOSC.target.name);
            }
        }
      
    }
}

var volumeSlider = document.getElementById("volume-slider");
volumeSlider.oninput = function(){
    volumeSlider.innerHTML = this.value;
    synth.volume.value = this.value
}

volumeSlider.addEventListener("mousemove", function(){
    var volumeValue = (Number(volumeSlider.value)+100)/104*100;
    volumeSlider.style.background = `linear-gradient(90deg, #18c947 ${volumeValue}%, rgb(158, 158, 158)   ${volumeValue}%)`;
    if(volumeValue === undefined){
        volumeSlider.style.background = "rgb(158, 158, 158)"
    }
})

var envelopeSlider = document.getElementById("envelope-sliders")
envelopeSlider.oninput = function(event){
    switch(event.target.id){
        case "attack-slider":
            synth.envelope.attack = event.target.value; 
        break;
        case "decay-slider":
            synth.envelope.decay = event.target.value; 
        break;
        case "sustain-slider":
            synth.envelope.sustain = Number(event.target.value)/100; 
        break;
        case "release-slider":
            synth.envelope.release = event.target.value; 
        break;
    }
}
