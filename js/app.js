const billvalue = document.querySelector("#bill-value");
const totalvalue = document.querySelector("#total-value");
const tipvalue = document.querySelector(".custom-tip-val");
const tipvaluesgiven = document.querySelector(".input-grid").children;
const resetbtn = document.querySelector("#resetbtn")
var tipselected = false;

function tipslection(){
    if(!this.classList.contains('tip-selected')){
        this.classList.add('tip-selected');
    }
}

for(var i=0; i<tipvaluesgiven.length-1; i++){
    tipvaluesgiven[i].addEventListener('mouseenter', tipslection, false); 
    tipvaluesgiven[i].addEventListener('click', tipslection, false); 

}

function hidetext(element, display){
    if(element === null) return;
    if(!display){
        element.style.display = "none";
        return;
    }
    element.style.display = "block";
}

function evalinput(){
    let invaltext;
    try {
        invaltext = this.parentElement.previousElementSibling.children[1];
    } catch (error) {
        invaltext = null;
    }
    if(this.value==''){
        hidetext(invaltext, 0);
        if(this.classList.contains('invalid-val')){
            this.classList.remove('invalid-val');
        }
        if(this.classList.contains('valid-val')){
            this.classList.remove('valid-val');
        }
    }
    else if(this.value==0){
        if(!this.classList.contains('invalid-val')){
            this.classList.remove('valid-val');
            this.classList.add('invalid-val');
            hidetext(invaltext, 1);
        }
    }
    else{
        if(!this.classList.contains('valid-val')){
            this.classList.remove('invalid-val');
            this.classList.add('valid-val');
            hidetext(invaltext, 0);
        }
    }
}

totalvalue.addEventListener('keyup', evalinput, false);
billvalue.addEventListener('keyup', evalinput, false);
tipvalue.addEventListener('keyup', evalinput, false);


