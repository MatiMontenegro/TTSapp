//Init SpeechSynth API
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-Value');

//Init Voices Array
let voices = [];

const getVoices = () => {
	voices = synth.getVoices();
	
	//Loop through voices and create an option for each one
	voices.forEach(voice =>{
		//Create an option element
		const option = document.createElement('option');
		//fill option with voice and language
		option.textContent = voice.name + ('+ voice.lang +');
		//Set needed option attributes
		option.setAttribute('data-lang', voice.lang);
		option.setAttribute('data-name', voice.name);
		voiceSelect.appendChild(option);
	});
};

getVoices();
if(synth.onvoiceschanged !== undefined){
	synth.onvoiceschanged = getVoices;
}

//Speak
const speak = () => {
	//Check if speaking
	if(synth.speaking){
		console.error('Already Speaking');
		return;
	}
	if(textInput.value !== ''){
		//Get speak text
		const speakText = new SpeechSynthesisUtterance(textInput.value);
		//Speak End
		speakText.onend = e =>{
			console.log('Done Speaking');
		}

		//Speak Error
		speakText.onerror = e =>{
			console.error('Something Wrong');
		}

		//Selected Voice
		const selectedVoice = voiceSelect.selectedOptions[0]
		.getAttribute('data-name');

		//Loop through voices
		voices.forEach(voice => {
			if(voice.name === selectedVoice){
				speakText.voice = voice;
			}
		});

		//Set Pitch Rate
		speakText.rate = rate.value;
		speakText.pitch = pitch.value;
		//Speak
		synth.speak(speakText);

	}
};

// Event Listeners

// Text form submit
textForm.addEventListener('submit', e => {
	e.preventDefault();
	speak();
	textInput.blur();
});

//Rate Value Change
rate.addEventListener('change', e => rateValue.textContent.textContent = rate.value);

//Pitch Value Change
pitch.addEventListener('change', e => pitchValue.textContent.textContent = pitch.value);

//Voice select changed
voiceSelect.addEventListener('change', e=> speak());