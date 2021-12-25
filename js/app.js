const billvalue = document.querySelector("#bill-value");
const totalperson = document.querySelector("#total-person");
const tipvalue = document.querySelector(".custom-tip-val");
const numpeople = document.querySelector("#total-person");
const tipperp = document.querySelector("#tip-amount-perp");
const amountperp = document.querySelector("#total-amount-perp");
const tipvaluesgiven = document.querySelector(".tip-input-grid").children;
const resetbtn = document.querySelector("#resetbtn");
var tip_select = 0;

const keyupevent = new KeyboardEvent('keyup')

function tipslection(){
    if(!this.classList.contains('tip-selected')){
        this.classList.add('tip-selected');
    }
}

function preventNonNumericalInput(e) {
    e = e || window.event;
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);
    if(!charStr.match(/[0-9]|\./)){
        e.preventDefault();
    }
    var bfstr = e.target.value;
    var tmpstr = bfstr+charStr;
    if([...tmpstr].filter(ch => ch==='.').length > 1){
        e.preventDefault();
    }
  }

function calculate() {
    let billval_final = Number(billvalue.value) || 0;
    let numpep_final = Number(numpeople.value) || 0;
    let tipval = tip_select || 0;
    if(!(numpep_final && tipval)) return;
    let tipamountperp = (billval_final*tipval)/(100*numpep_final);
    tipperp.innerText = '$' + Math.round((tipamountperp + Number.EPSILON) * 100) / 100
    let totalamountperp = (billval_final/numpep_final) + tipamountperp;
    amountperp.innerText = '$' + Math.round((totalamountperp + Number.EPSILON) * 100) / 100
}

for(var i=0; i<tipvaluesgiven.length-1; i++){
    tipvaluesgiven[i].addEventListener('mouseenter', tipslection, false); 
    tipvaluesgiven[i].addEventListener('click', settip, false); 
    tipvaluesgiven[i].addEventListener('click', calculate);
}

function settip() {
    tipvalue.value = '';
    tipvalue.dispatchEvent(keyupevent);
    tip_select = Number(this.innerText.slice(0, -1));
}

resetbtn.addEventListener('click', () => {
    billvalue.value = '';
    numpeople.value = '';
    amountperp.innerText = tipperp.innerText ="$0.00"; 
    numpeople.dispatchEvent(keyupevent);
    billvalue.dispatchEvent(keyupevent);
})

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

totalperson.addEventListener('keyup', evalinput, false);
totalperson.addEventListener('keyup', calculate, false);
billvalue.addEventListener('keyup', evalinput, false);
billvalue.addEventListener('keyup', calculate, false);
tipvalue.addEventListener('keyup', evalinput, false);
tipvalue.addEventListener('keyup', () => {
    tip_select = Number(tipvalue.value);
    calculate();
})


