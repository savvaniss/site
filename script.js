const quests = document.querySelectorAll("#quest-list li");
const xpLabel = document.getElementById("xp");
const xpBar = document.getElementById("xp-bar");
const levelLabel = document.getElementById("level");
const badge = document.getElementById("badge");
const resetButton = document.getElementById("reset");

let xp = 0;
let level = 1;

const updateUI = () => {
  xpLabel.textContent = xp;
  levelLabel.textContent = level;
  xpBar.style.width = `${xp}%`;
  badge.style.display = xp >= 100 ? "block" : "none";
};

const gainXp = (amount) => {
  xp = Math.min(100, xp + amount);
  if (xp >= 100) {
    level = 2;
  }
  updateUI();
};

quests.forEach((quest) => {
  quest.addEventListener("click", () => {
    if (quest.classList.contains("completed")) {
      return;
    }
    quest.classList.add("completed");
    const amount = Number(quest.dataset.xp) || 0;
    gainXp(amount);
  });
});

resetButton.addEventListener("click", () => {
  xp = 0;
  level = 1;
  quests.forEach((quest) => quest.classList.remove("completed"));
  updateUI();
});

updateUI();
