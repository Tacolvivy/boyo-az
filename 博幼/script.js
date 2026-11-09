// 1. 純英文字母 A~Z 資料庫（只保留大寫與小寫）
const alphabetList = [
  { upper: "A", lower: "a" },
  { upper: "B", lower: "b" },
  { upper: "C", lower: "c" },
  { upper: "D", lower: "d" },
  { upper: "E", lower: "e" },
  { upper: "F", lower: "f" },
  { upper: "G", lower: "g" },
  { upper: "H", lower: "h" },
  { upper: "I", lower: "i" },
  { upper: "J", lower: "j" },
  { upper: "K", lower: "k" },
  { upper: "L", lower: "l" },
  { upper: "M", lower: "m" },
  { upper: "N", lower: "n" },
  { upper: "O", lower: "o" },
  { upper: "P", lower: "p" },
  { upper: "Q", lower: "q" },
  { upper: "R", lower: "r" },
  { upper: "S", lower: "s" },
  { upper: "T", lower: "t" },
  { upper: "U", lower: "u" },
  { upper: "V", lower: "v" },
  { upper: "W", lower: "w" },
  { upper: "X", lower: "x" },
  { upper: "Y", lower: "y" },
  { upper: "Z", lower: "z" }
];

const container = document.getElementById("card-container");
const prevBtn = document.getElementById("prev-btn");
const speakBtn = document.getElementById("speak-btn");
const randomBtn = document.getElementById("random-btn");

let currentIndex = 0;

// 2. 朗讀「字母名稱」的函式
function speakLetter(letter) {
  window.speechSynthesis.cancel();
  // 轉成小寫再唸，避免瀏覽器把大寫 A 唸成 "Capital A"
  const voice = new SpeechSynthesisUtterance(letter.toLowerCase());
  voice.lang = "en-US";
  voice.rate = 0.85; // 語速稍微放慢一點，讓學生聽得更清楚
  window.speechSynthesis.speak(voice);
}

// 3. 畫出目前這一張純字母卡片
function showCurrentCard() {
  container.innerHTML = "";
  const item = alphabetList[currentIndex];

  const card = document.createElement("div");
  card.className = "card big-card";

  // 畫面只放超大「大寫 + 小寫」字母
  card.innerHTML = `
    <span class="progress">字母順序：${currentIndex + 1} / ${alphabetList.length}</span>
    <h2 class="pure-letter">${item.upper} ${item.lower}</h2>
    <small>👆 點擊卡片聽字母發音並跳下一個</small>
  `;

  // 點卡片：唸出字母並跳下一張
  card.addEventListener("click", () => {
    speakLetter(item.lower);
    currentIndex++;
    if (currentIndex >= alphabetList.length) {
      currentIndex = 0;
    }
    setTimeout(() => {
      showCurrentCard();
    }, 800);
  });

  container.appendChild(card);
}

// 4. 按鈕一：「⬅️ 上一張」
prevBtn.addEventListener("click", () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = alphabetList.length - 1;
  }
  showCurrentCard();
  speakLetter(alphabetList[currentIndex].lower);
});

// 5. 按鈕二：「🔊 再聽一次」
speakBtn.addEventListener("click", () => {
  speakLetter(alphabetList[currentIndex].lower);
});

// 6. 按鈕三：「🔀 隨機抽考」
randomBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * alphabetList.length);
  currentIndex = randomIndex;
  showCurrentCard();
  speakLetter(alphabetList[currentIndex].lower);
});

// 網頁載入時顯示第一張 A a
showCurrentCard();
