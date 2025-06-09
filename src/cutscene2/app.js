let img1 = document.getElementsByClassName('textbox_1')[0]; //textbox 1
let img2 = document.getElementsByClassName('textbox_2')[0]; //textbox 2
let img3 = document.getElementsByClassName('textbox_3')[0]; //textbox 3

//On load
window.onload = function() {
  //Transition fades out for 3 seconds
  document.getElementById('transition').style.opacity = 0;
  //Render the panda in 2 seconds
  setTimeout(() => {
    console.log("Delayed for 2 second.");
    document.getElementById('panda').style.opacity = 1;
  }, 2000);
  //Render the text in 4.5 seconds
  setTimeout(() => {
    console.log("Delayed for 4.5 second.");
    img1.querySelector('#name').style.opacity = 1;
    img1.querySelector('#text').style.opacity = 1;
    document.getElementById('panda').style.opacity = 1;
  }, 4500);
  //Allow the user to proceed to the next text in 9 seconds
  setTimeout(() => {
    console.log("Delayed for 9 second.");
    document.getElementById('dots').style.opacity = 1;
    img1.style.pointerEvents = 'auto';
  }, 9000);
};

//Load the next text_2
function loadImg2() {
  //Unrender the first text
  img1.style.display = 'none';
  img2.style.display = 'block';
  //Render the next text_2
  img2.querySelector('#name').style.opacity = 1;
  img2.querySelector('#text').style.opacity = 1;
  //Allow the user to proceed to the next text in 3 seconds
  setTimeout(() => {
    console.log("Delayed for 3 second.");
    img2.querySelector('#dots').style.opacity = 1;
    img2.style.pointerEvents = 'auto';
  }, 3000);
}

//Event when user clicks to proceed to go to the next text_2
img1.addEventListener("click", loadImg2);

//Load the next text_3
function loadImg3() {
  //Unrender the second text
  document.getElementById('powell').style.opacity = 0;
  document.getElementById('evil-powell').style.opacity = 1;
  //Render evil powell
  img2.style.display = 'none';
  img3.style.display = 'block';
  //Render the next text_3
  img3.querySelector('#name').style.opacity = 1;
  img3.querySelector('#text').style.opacity = 1;
  //Allow the user to proceed to the next text in 2 seconds
  setTimeout(() => {
    console.log("Delayed for 2 second.");
    img3.querySelector('#dots').style.opacity = 1;
    img3.style.pointerEvents = 'auto';
  }, 2000);
}

//Event when the user wants to go to the next text_3
img2.addEventListener("click", loadImg3);

//Transition to the gameplay
function loadBattle() {
  console.log("loadBattle triggered");
  document.getElementById('transition').style.opacity = 1;
  //Fade into black for 3 seconds
	setTimeout(() => {
  	console.log("Delayed for 3 second.");
		location.href="demo/cardtest.html";
	}, 3000);
}

//Event when user clicks to proceed to go to the gameplay
img3.addEventListener("click", loadBattle);