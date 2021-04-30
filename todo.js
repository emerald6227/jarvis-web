const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];
let idNumbers = 1;

function deleteToDos(event) {
    // console.dir(event.target.parentNode);

    // html 태그에서 li 태그 제거
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    
    // localStorage에서 제거
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id); // li.id가 삭제를 위해 선택한 id이므로, 이번에 선택하지 않은 친구들만 return함
    })
    toDos = cleanToDos; // 삭제한 li.id를 뺀 cleanToDos 배열로 덮어 씌움 (const면 덮어씌울 수 없으므로 let으로 접근지정자 변경)
    // console.log(toDos);
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const deleteBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = idNumbers;
    idNumbers += 1;

    // html 태그에 자식 추가
    deleteBtn.innerText = `❌`;
    deleteBtn.addEventListener("click", deleteToDos);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.id = newId; // id 생성
    toDoList.appendChild(li);

    // 객체 배열에 넣을 obj
    const toDoObj = {
        text: text,
        id: newId
    };

    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault(); // input의 submit 기본 동작을 막는다. (새로고침 X)
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = ""; // 입력란 초기화
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        // console.log(loadedToDos);
        const parsedToDos = JSON.parse(loadedToDos);
        // console.log(parsedToDos);

        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
        // for (const data of parsedToDos) {
        //     console.log(data);
        // }

    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();