const form = document.querySelector(".name__form"),
    input = form.querySelector("input"),
    greetingTitle = document.querySelector(".greetings__title"),
    greeting = document.querySelector(".greetings__name"),
    infoBoxName = document.querySelector(".info-box__name");

const USER_LS = "currentUser",
    GREETINGS = "greetings",
    SHOWING_CN = "showing";

// local Stroage에 text 저장
function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

// Event
function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

// local Storage에 저장 여부에따라 분기
function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greetingTitle.classList.remove(GREETINGS);
    greetingTitle.classList.add(SHOWING_CN);
    greeting.classList.remove(GREETINGS);
    greeting.classList.add(SHOWING_CN);
    infoBoxName.classList.add(GREETINGS);
    greeting.innerText = `'${text}'`;
}

// name 가져오기
function loadName() {
    const currentUser = localStorage.getItem(USER_LS);

    if (currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser); 
    }
}

function init() {
    loadName();
}

init();

