let emojis = ["👍", "❤️", "🔥", "🎉", "😂"];

let emojisData = {};
emojis.forEach(emoji => emojisData[emoji] = 0);

const container = document.querySelector(`.emojis-container`);

for(const key in emojisData) {
    const emojiBtn = document.createElement('div');
    emojiBtn.classList.add(`emoji-content`);
    emojiBtn.textContent = key;
    const votesAmount = document.createElement('div');
    votesAmount.style.textAlign = `center`;
    votesAmount.textContent = emojisData[key];
    emojiBtn.addEventListener("click", () => {
        votesAmount.textContent = ++emojisData[key];
    });
    container.appendChild(emojiBtn);
    emojiBtn.appendChild(votesAmount);
}