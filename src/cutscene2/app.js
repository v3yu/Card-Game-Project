let img1 = document.getElementById('cutscene1-bg');
let img2 = document.getElementById('cutscene2-bg');
let img3 = document.getElementById('cutscene3-bg');



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
function loadImg3() {
  img2.style.display = 'none';
  img3.style.display = 'block';
}

img2.addEventListener('click', loadImg3);


/**
 *
 */
function loadBattle() {
  console.log('loadBattle triggered');
  document.getElementById('transition').style.opacity = 1;
	setTimeout(() => {
  console.log('Delayed for 3 second.');
  location.href='../../demo/cardtest.html';
	}, 3000);
}

img3.addEventListener('click', loadBattle);