document.getElementById("play").addEventListener("click", loadStory);

function loadStory() {
  location='https://example.com';
}

let vol = document.getElementById('volume-controls');

function showVolume(){
    vol.style.display = 'grid';
}
function hideVolume(){
    vol.style.display = 'none';
}

let settings = document.getElementsByClassName('volSettings')[0];

function showSettings(){
    settings.style.display = 'block';
}

function hideSettings(){
    settings.style.display = 'none';
}

function dimScreen(){
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('exit').style.display = 'block';
    showVolume();
    showSettings();
}

function unDimScreen(){
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('exit').style.display = 'none';
    hideVolume();
    hideSettings();
}

document.getElementById('settings').addEventListener('click', () => {
    dimScreen();
});

document.getElementById('exit').addEventListener('click', () => {
    unDimScreen();
})