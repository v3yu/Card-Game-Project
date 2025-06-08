let img1 = document.getElementsByClassName('textbox_1')[0];
let img2 = document.getElementsByClassName('textbox_2')[0];


window.onload = function() {
  // code to run animation.
  document.getElementById('transition').style.opacity = 0;
  setTimeout(() => {
    console.log("Delayed for 1.5 second.");
    img1.querySelector('#name').style.opacity = 1;
    img1.querySelector('#text').style.opacity = 1;
  }, 1500);
  setTimeout(() => {
    console.log("Delayed for 8 second.");
    document.getElementById('dots').style.opacity = 1;
    img1.style.pointerEvents = 'auto';
  }, 8000);
};

function loadImg2() {
  img1.style.display = 'none';
  img2.style.display = 'block';
  img2.querySelector('#name').style.opacity = 1;
  img2.querySelector('#text').style.opacity = 1;
  setTimeout(() => {
    console.log("Delayed for 3 second.");
    img2.querySelector('#dots').style.opacity = 1;
    img2.style.pointerEvents = 'auto';
  }, 3000);
}

img1.addEventListener("click", loadImg2);


function loadNextChapter() {
  console.log("loadNextChapter triggered");
  document.getElementById('transition').style.opacity = 1;
	setTimeout(() => {
  	console.log("Delayed for 3 second.");
		location.href="../cutscene2/index.html";
	}, 3000);
}

img2.addEventListener("click", loadNextChapter);