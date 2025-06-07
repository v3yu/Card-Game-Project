const lines = [
  {
    name: "Main Character",
    text: "I finished studying... I formed, stormed, normed, performed, and adjourned these past 10 weeks of my training. I am now the 10x Developer that I’ve dreamed to be."
  },
  {
    name: "Main Character",
    text: "I am ready to face him."
  }
];

let currentLine = 0;

function showLine() {
  const line = lines[currentLine];
  document.getElementById('character-name').textContent = line.name;
  document.getElementById('dialogue-text').textContent = line.text;

  currentLine++;

  if (currentLine >= lines.length) {
    setTimeout(() => {
      location.href = "../cutscene2/index.html";
    }, 1000);
  }
}

document.getElementById("dialogue-box").addEventListener("click", showLine);
showLine();
