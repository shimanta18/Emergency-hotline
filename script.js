let copyCount = 0;

function copyNumber(number) {
  navigator.clipboard.writeText(number)
    .then(() => {
      copyCount++;
      const counterEl = document.querySelector('#nav-copy-count');
      if (counterEl) {
        counterEl.textContent = copyCount;
      }
      alert(`Copied: ${number}`);
    })
    .catch(() => alert("Copy failed"));
}

// ====== HISTORY STORAGE ======
function getHistory() {
  return JSON.parse(localStorage.getItem("callHistory") || "[]");
}

function setHistory(arr) {
  localStorage.setItem("callHistory", JSON.stringify(arr));
}

// ====== ADD TO HISTORY ======
function addToHistory(name, number) {
  const now = new Date();
  const entry = {
    name,
    number,
    time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  };
  const history = getHistory();
  history.unshift(entry);
  setHistory(history);
  renderHistory(); // ✅ fixed
}

// ====== CLEAR HISTORY ======
function clearHistory() {
  setHistory([]);
  renderHistory();
}

// ====== RENDER HISTORY ======
function renderHistory() {
  const history = getHistory();
  const historyList = document.getElementById("history");
  const emptyState = document.getElementById("emptyState");

  if (history.length === 0) {
    historyList.innerHTML = "";
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";
  historyList.innerHTML = history.map(h => `
    <li class="bg-gray-100 border border-gray-200 p-3 rounded">
      <div class="font-semibold">${h.name}</div>
      <div class="text-sm text-gray-600">${h.number}</div>
      <div class="text-xs text-gray-500">${h.time}</div>
    </li>
  `).join("");
}

// ====== INIT ON LOAD ======
document.addEventListener("DOMContentLoaded", renderHistory);

//heart//
let heartCount=0;
function incrementHeart() {
  heartCount++;
  const heartEl = document.getElementById("nav-heart-count")
  if(heartEl){
    heartEl.textContent = heartCount;
  }
}

//coin//
let coinCount = 100;
function updateCoinDisplay() {

  const coinEl = document.getElementById("nav-coin-count")
  if(coinEl){
    coinEl.textContent = coinCount;
  }
}

function handleCall(name,number){
  if(coinCount<20){
    alert("Not enough coins to make a call. You need at least 20 coins.");
    return;
  }
  coinCount -=20;
  updateCoinDisplay();
  addToHistory(name,number);
}

document.addEventListener('DOMContentLoaded',() => {
  updateCoinDisplay();
  renderHistory();
});