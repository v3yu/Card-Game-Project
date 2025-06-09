document.getElementById('play').addEventListener('click', loadStory);

/**
 *
 */
function loadStory() {
  console.log('loadStory triggered');
  document.getElementById('transition').style.opacity = 1;
	setTimeout(() => {
    console.log('Delayed for 3 second.');
    location.href='../cutscene1/index.html';
	}, 3000);
}

let vol = document.getElementById('volume');

/**
 *
 */
function showVolume(){
    vol.style.display = 'grid';
}
/**
 *
 */
function hideVolume(){
    vol.style.display = 'none';
}

let settings = document.getElementsByClassName('volSettings')[0];
let innerSettings = document.getElementsByClassName('innerSettings')[0];

/**
 *
 */
function showSettings(){
    settings.style.display = 'block';
    innerSettings.style.display = 'block';
}

/**
 *
 */
function hideSettings(){
    settings.style.display = 'none';
    innerSettings.style.display = 'none';
}

/**
 *
 */
function dimScreen(){
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('exit').style.display = 'block';
    showVolume();
    showSettings();
}

/**
 *
 */
function unDimScreen(){
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('exit').style.display = 'none';
    hideVolume();
    hideSettings();
}

let tutorial = document.getElementById('tutorial-image');

/**
 *
 */
function showTutorial() {
    tutorial.style.display = 'grid';
}

/**
 *
 */
function hideTutorial() {
    tutorial.style.display = 'none';
}


document.getElementById('settings').addEventListener('click', () => {
    dimScreen();
});

document.getElementById('tutorial').addEventListener('click', () => {
    dimScreen();
    showTutorial();
});

document.getElementById('exit').addEventListener('click', () => {
    unDimScreen();
    hideTutorial();
});

const volSlider = document.querySelector('input[type="range"]');
const audioElem = document.querySelector('audio');

audioElem.src = 'assets/soundtrack.mp3';


volSlider.addEventListener('input', function() {
    const volVal = parseInt(this.value);
    audioElem.volume = volVal / 100;
});

let musicIcon = document.getElementById('music');

musicIcon.addEventListener('click', function() {
    audioElem.play();
});