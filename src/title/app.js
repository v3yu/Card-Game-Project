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

function toggleVolume(){
    if(vol.style.display === 'grid'){
        hideVolume();
    }else{
        showVolume();
    }
}

function dimScreen(){
    document.getElementById('overlay').style.display = 'block';
}

document.getElementById('settings').addEventListener('click', () => {
    toggleVolume();
    dimScreen();
});