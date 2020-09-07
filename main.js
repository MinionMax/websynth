//Master Synth Engine
var notes = ["C", "D", "E", "F", "G", "A", "B"]//available note
const synth = new Tone.PolySynth().toDestination();//creates new synth instrument
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
    synth.triggerRelease(note)
}

function toggleOSC(OSC){
    var OSCbuttons = document.getElementsByClassName("oscbuttons")
    for (var i = 0; i < OSCbuttons.length; i++){
        if(OSC != OSCbuttons[i]){
            OSCbuttons.dataset.active = false
        }
    }
}


/* //Chain
const osc = new Tone.Oscillator()
const env
const filter
const distortion

synth.chain(osc, env, filter, distortion, Tone.Destination)
*/