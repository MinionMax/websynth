var notes = ["C", "D", "E", "F", "G", "A", "B"]
const synth = new Tone.PolySynth().toDestination();
var html = ""

for (var octave = 0; octave < 2 ; octave++)
{
    for (var i = 0; i < notes.length; i++) {
        var note = notes[i];
        var hasSharp = true;
    
        if (note === "E" || note === "B"){
            hasSharp = false;
        }
    
        html += `<div class="whitenote"
            onmousedown = "noteDown(this, false)"
            onmouseleave = "noteUp(this, false)"
            data-note="${note + (octave + 4)}">`;
    
        if (hasSharp){
            html += `<div class="blacknote"
            onmousedown = "noteDown(this, true)"
            onmouseleave = "noteUp(this, true)"
            data-note="${note + "#" + (octave + 4)}"></div>`;
        }
        
        html += `</div>`
    }
}


document.getElementById("container").innerHTML = html;

function noteDown(elem, isSharp){
    var note = elem.dataset.note;
    console.log("user triggered", note);
    elem.style.background = isSharp ? "rgb(78, 78, 78)" : "#ccc"
    synth.triggerAttackRelease(note, "16n");
    event.stopPropagation();
}

function noteUp(elem, isSharp){
    elem.style.background = isSharp ? "#777" : "#fff"
}