let labelPolish = document.getElementById('labelId');
let polishOptionArray = document.getElementsByClassName('polishOption');
let manic = document.getElementsByClassName('manicureOption');
let withManic = document.getElementById('withManic');
let withoutManic = document.getElementById('withoutManic');
let manicText = document.forms[0].elements['typeOfManicure'];
let designLabels = document.getElementsByClassName('designLabel');
let design = document.getElementsByClassName('checkboxDesign');
let numOfNails = document.getElementsByClassName('text');
let meansOption = document.getElementsByClassName('means');
const configPath = 'jsonFile.json';
fetch(configPath)
    .then((response) => {response.json().then((json)=> {
        let polishArray = json["polArray"];
        let polishPrice = json["polPrice"];
        let manicureTypes = json["manicureTypes"];
        labelPolish.innerHTML = polishArray[0];
        let designArray = json["designArray"];
        let designPrice = json["designPrice"];
        let strengtheningArray = json["strArray"];
        let strengtheningPrice = json["strPrice"];
        for(let i=0; i<polishOptionArray.length; i++){
			polishOptionArray[i].innerHTML = polishArray[i+1];
		}
		for(let i=0; i<designLabels.length; i++){
			designLabels[i].innerHTML = designArray[i];
		}
		for(let i=0; i<meansOption.length; i++){
			meansOption[i].innerHTML = strengtheningArray[i];
		}
        setValue(polishOptionArray,polishPrice);
        setValue(manic,manicureTypes);
        setValue(design,designPrice);
        setValue(meansOption,strengtheningPrice);
        withManic.addEventListener('input',ableText);
		withoutManic.addEventListener('input',disableText);
		function ableText(e){
			manicText.disabled=false;
		}
		function disableText(e){
			manicText.disabled=true;
		}
    })});

function setValue(array1,array2){
	for(let i=0; i<array1.length; i++){
	array1[i].value = array2[i];
	}
}

let button = document.getElementById('button');
button.addEventListener('click',calculation);
function calculateDesign(counter,array1,array2){
	for(let i=0; i<array1.length; i++){
		if(array1[i].checked){
			counter+=Number(array1[i].value)*Number(array2[i].value);
		}
	}
	return counter;
}

function calculation(e){
	let counter=0;
	for(let polishItem of polishOptionArray){
		if(polishItem.selected){
			counter+=Number(polishItem.value);
		}
	}
	if(withManic.checked){
		counter+=Number(withManic.value);
	}
	counter = calculateDesign(counter,design,numOfNails);
	for(let meanItem of meansOption){
		if(meanItem.selected){
			counter+=Number(meanItem.value);
		}
	}
	result.textContent = 'Total price: ' + counter;
}

