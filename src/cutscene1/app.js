let img1 = document.getElementById('cutscene1-bg');
let img2 = document.getElementById('cutscene2-bg');



/**
 *
 */
function loadImg2() {
  img1.style.display = 'none';
  img2.style.display = 'block';
}

img1.addEventListener('click', loadImg2);


/**
 *
 */
function loadNextChapter() {
  console.log('loadNextChapter triggered');
  document.getElementById('transition').style.opacity = 1;
	setTimeout(() => {


  console.log('Delayed for 3 second.');
  location.href='../cutscene2/index.html';
	}, 3000);
}

img2.addEventListener('click', loadNextChapter);