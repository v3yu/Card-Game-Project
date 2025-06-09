let img1 = document.getElementsByClassName('textbox_1')[0]; //textbox 1
let img2 = document.getElementsByClassName('textbox_2')[0]; //textbox 2

//On load
window.onload = function() {
  //Transition fades out for 3 seconds
  document.getElementById('transition').style.opacity = 0;
  //Render the text in the next 1.5 seconds
  setTimeout(() => {
    console.log("Delayed for 1.5 second.");
    img1.querySelector('#name').style.opacity = 1;
    img1.querySelector('#text').style.opacity = 1;
  }, 1500);
  //Allow the user to proceed to the next text in 7 seconds
  setTimeout(() => {
    console.log("Delayed for 7 second.");
    document.getElementById('dots').style.opacity = 1;
    img1.style.pointerEvents = 'auto';
  }, 7000);
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

//Event when user clicks to proceed to go to the next text
img1.addEventListener("click", loadImg2);

//Transition then go to the next cutscene
function loadNextChapter() {
  console.log("loadNextChapter triggered");
  //Fade into black for 3 seconds
  document.getElementById('transition').style.opacity = 1;
	setTimeout(() => {
  	console.log("Delayed for 3 second.");
		location.href="../cutscene2/index.html";
	}, 3000);
}

//Event when user clicks to proceed to go to the next cutscene
img2.addEventListener("click", loadNextChapter);