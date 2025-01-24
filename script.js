let userAge = prompt("Введіть свій вік: ");
let ageMessage = "";

if (userAge == null || userAge == ""){
    ageMessage = "Шкода, що Ви не захотіли ввести своій вік";
}
else {
    ageMessage = userAge;
}

let userCity = prompt("В якому місті мешкаєте?");
let userSport = prompt("Який спорт вам більше подобається?(бокс, теніс, футбол)");
alert(typeof(userSport))
let cityMessage = "";
let sportMessage = "";

switch(userCity){
    case "Київ":
        cityMessage = "Ти живеш у столиці України";
        break;
    case "Вашингтон":
        cityMessage = "Ти живеш у столиці США";
        break;
    case "Лондон":
        cityMessage = "Ти живеш у столиці Англії";
        break;
    case null:
        cityMessage = "Шкода, що Ви не захотіли ввести своє місто";
        break;
    default:
        cityMessage = `Ти живеш у місті ${userCity}`;
        break;
}

switch(userSport){
    case "футбол":
        sportMessage = "Круто! Хочеш стати Ліонелєм Мессі";
        break;
    case "бокс":
        sportMessage = "Круто! Хочеш стати Олександром Усиком";
        break;
    case "теніс":
        sportMessage = "Круто! Хочеш стати Новаком Джоковичем";
        break;
    default:
        sportMessage = "Шкода, що Ви не захотіли ввести свій улюблений спорт";
        break;
}

alert(`${ageMessage} \n${cityMessage} \n${sportMessage}`)