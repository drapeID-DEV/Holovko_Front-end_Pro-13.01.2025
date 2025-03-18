const wrapper = document.querySelector('.wrapper');
const input = document.querySelector('input');

const inputInfo = document.createElement('div');
inputInfo.textContent = 'More info about input';

input.addEventListener(`focus`, showInfo)
input.addEventListener(`blur`, hideInfo)

function showInfo() {
    wrapper.appendChild(inputInfo)
}

function hideInfo() {
    inputInfo.remove();
}

////////////

const inputBtn = document.querySelector(`.input-link`);
const openBtn = document.querySelector(`.open-link`);

inputBtn.addEventListener(`click`, setLink);

function setLink() {
    let link;

    do{
        link = prompt("Please input the link: ");
    } while(!link);

    if(!link.startsWith("http://") && !link.startsWith("https://")) {
        link = "http://" + link;
    }
    openBtn.setAttribute(`href`, link);
}

/////////////

const newTable = document.createElement(`table`);
newTable.style.textAlign = `center`;
document.body.appendChild(newTable);

let value = 1;

for(let i = 0; i < 10; i++) {
    const newTr = document.createElement(`tr`);
    newTable.appendChild(newTr);
    for(let j = 0; j < 10; j++) {
        const newTd = document.createElement(`td`);
        newTd.textContent = value++;
        newTable.children[i].appendChild(newTd);
    }
}

///////////////

const newImg = document.createElement(`img`);
newImg.style.width = `400px`;
document.body.appendChild(newImg);

let imgNumber = Math.floor(Math.random() * 9) + 1;

newImg.setAttribute(`src`, `./images/${imgNumber}.jpg`);