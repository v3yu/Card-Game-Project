document.getElementById('play').addEventListener('click', loadStory);

//Audio files
const audioElem1 = document.getElementById('hidden');
audioElem1.src = 'assets/soundtrack.mp3';
const audioElem2 = document.getElementById('button-fx1');
audioElem2.src = 'assets/button-fx1.mp3';
const audioElem3 = document.getElementById('button-fx2');
audioElem3.src = 'assets/button-fx2.mp3';

/**
 *Play button fades into the cutscenes
 */
function loadStory() {
  audioElem3.play();
  console.log('loadStory triggered');
  document.getElementById('transition').style.opacity = 1;
	setTimeout(() => {
    console.log('Delayed for 3 second.');
    location.href='../cutscene1/index.html';
	}, 3000);
}

let vol = document.getElementById('volume');

/**
 *Displaying the volume
 */
function showVolume(){
    vol.style.display = 'grid';
}
/**
 *Hide Volume
 */
function hideVolume(){
    vol.style.display = 'none';
}

/***
 * Settings for volume
 */
let settings = document.getElementsByClassName('volSettings')[0];
let innerSettings = document.getElementsByClassName('innerSettings')[0];

/**
 *Display Settings
 */
function showSettings(){
    settings.style.display = 'block';
    innerSettings.style.display = 'block';
}

/**
 *Hide Settings
 */
function hideSettings(){
    settings.style.display = 'none';
    innerSettings.style.display = 'none';
}

/**
 *Dim screen when press on tutorial or setting button
 */
function dimScreen(){
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('exit').style.display = 'block';
    showVolume();
    showSettings();
}

/**
 *Go back to regular menu screen
 */
function unDimScreen(){
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('exit').style.display = 'none';
    hideVolume();
    hideSettings();
}

//Image for the tutorial
let tutorial = document.getElementById('tutorial-image');

/**
 *Display the tutorial
 */
function showTutorial() {
    tutorial.style.display = 'grid';
}

/**
 *Hide the tutorial
 */
function hideTutorial() {
    tutorial.style.display = 'none';
}

/***
 * Play button audio and dim the screen when settings is on
 */
document.getElementById('settings').addEventListener('click', () => {
    audioElem2.play();
    dimScreen();
});

/***
 * Play button audio and dim the screen when tutorial is on
 */
document.getElementById('tutorial').addEventListener('click', () => {
    audioElem2.play();
    dimScreen();
    showTutorial();
});

/***
 * Exit button functionality
 */
document.getElementById('exit').addEventListener('click', () => {
    unDimScreen();
    hideTutorial();
});

/***
 * Volume implementation
 */
const volSlider = document.querySelector('input[type="range"]');

volSlider.addEventListener('input', function() {
    const volVal = parseInt(this.value);
    audioElem1.volume = volVal / 100;
});

/***
 * To turn on the music
 */
let musicIcon = document.getElementById('music');

musicIcon.addEventListener('click', function() {
    audioElem1.play();
});