const dialogue = [
  {
    name: "Main Character",
    text: "Surrender yourself Powell. It's time to admit that I can use JavaScript Frameworks on my project.",
    characters: [
      { src: "imgs/panda.png", alt: "Panda" },
      { src: "imgs/powell-smile.png", alt: "Professor Powell" }
    ]
  },
  {
    name: "Professor Powell",
    text: "I will admit to that under one condition...",
    characters: [
      { src: "imgs/panda.png", alt: "Panda" },
      { src: "imgs/powell-smile.png", alt: "Professor Powell" }
    ]
  },
  {
    name: "Professor Powell",
    text: "If you can beat me in battle!!!!!!!!!!",
    characters: [
      { src: "imgs/panda.png", alt: "Panda" },
      { src: "imgs/powell-evil.png", alt: "Evil Professor Powell" }
    ]
  }
];

let current = 0;

function showLine() {
  const line = dialogue[current];
  document.getElementById("character-name").textContent = line.name;
  document.getElementById("dialogue-text").textContent = line.text;

  const charDiv = document.getElementById("characters");
  charDiv.innerHTML = '';
  line.characters.forEach(char => {
    const img = document.createElement("img");
    img.src = char.src;
    img.alt = char.alt;
    charDiv.appendChild(img);
  });

  current++;

  if (current >= dialogue.length) {
    setTimeout(() => {
      alert("Cutscene complete! Transition to battle or game start.");
    }, 1000);
  }
}

document.getElementById("dialogue-box").addEventListener("click", showLine);
showLine();
