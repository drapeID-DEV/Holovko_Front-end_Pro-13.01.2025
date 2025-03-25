const form = document.querySelector(`form`);
const saveBtn = document.querySelector(`.save-button`)

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getFormData(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const newTable = document.createElement(`table`);

    let langSetted = false;

    for(let key of formData.keys()){
        console.log(formData.get(key));

        const newTr = document.createElement(`tr`);
        newTr.textContent = `${capitalizeFirstLetter(key)}:\t`;
        const newTd = document.createElement(`td`);

        if(key == `languages`) {
            if(langSetted) continue;
            let langArr = formData.getAll(key);
            newTd.textContent = langArr.join(`, `);
            newTr.appendChild(newTd);
            langSetted = true;
        } else {
            if(!formData.get(key)) {
                newTd.textContent = "Not provided!";
            } else {
                newTd.textContent = capitalizeFirstLetter(formData.get(key));
            }
            newTr.appendChild(newTd);
        }
        newTable.appendChild(newTr);
    }
    form.style.display = `none`
    document.body.appendChild(newTable);
}

saveBtn.addEventListener(`click`, getFormData)