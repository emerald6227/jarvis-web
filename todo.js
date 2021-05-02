const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    toDoListBox = document.querySelector(".toDoList-box");

const TODOS_LS = "toDos";

let toDos = [];
let idNumbers = 1;

function completeToDos(event) {
    const toDoDiv = event.target.parentNode.parentNode.parentNode;
    const span = event.target.parentNode.parentNode.parentNode.childNodes[1].firstChild;
    const completeBtn = event.target.parentNode;
    const btnsDiv = event.target.parentNode.parentNode;
    const childs = btnsDiv.childNodes;
    const restoreBtn = childs[1];
    // console.log(event.target.parentNode.parentNode.parentNode.childNodes[1].firstChild);

    completeBtn.style.display = "none";
    restoreBtn.style.display = "inline";
    span.style.textDecoration = "line-through";
    span.style.textDecorationColor = "black";
    span.style.textDecorationThickness = "3px";

    const selectToDos = toDos.filter(function(toDo){
        if (toDo.id === parseInt(toDoDiv.id)) {
            toDo.complete = true;
        }
        return toDo;
    });

    toDos = selectToDos;
    saveToDos();
}

function restoreToDos(event) {
    const toDoDiv = event.target.parentNode.parentNode.parentNode;
    const span = event.target.parentNode.parentNode.parentNode.childNodes[1].firstChild;
    const restoreBtn = event.target.parentNode;
    const btnsDiv = event.target.parentNode.parentNode;
    const childs = btnsDiv.childNodes;
    const completeBtn = childs[0];

    restoreBtn.style.display = "none";
    completeBtn.style.display = "inline";
    span.style.textDecoration = "none";

    const selectToDos = toDos.filter(function(toDo){
        if (toDo.id === parseInt(toDoDiv.id)) {
            toDo.complete = false;
        }
        return toDo;
    });

    toDos = selectToDos;
    saveToDos();
}

function deleteToDos(event) {
    // html 태그에서 li 태그 제거
    const btn = event.target;
    const toDoDiv = btn.parentNode.parentNode.parentNode;
    toDoListBox.removeChild(toDoDiv);
    
    // localStorage에서 제거
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(toDoDiv.id); // li.id가 삭제를 위해 선택한 id이므로, 이번에 선택하지 않은 친구들만 return함
    });
    toDos = cleanToDos; // 삭제한 li.id를 뺀 cleanToDos 배열로 덮어 씌움 (const면 덮어씌울 수 없으므로 let으로 접근지정자 변경)
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text, complete) {
    // div
    const toDo = document.createElement("div"); // 큰박스
    toDo.classList.add("toDo");
    toDo.style.width = "450px";
    toDo.style.height = "40px";
    // toDo.style.marginBottom = "10px";
    toDo.style.margin = "10px 0";
    toDo.style.display = "flex";
    toDo.style.alignItems = "center";
    toDo.style.position = "relative";
    const newId = idNumbers;
    toDo.id = idNumbers;
    idNumbers += 1;

    // left Icon
    const toDoIcon = document.createElement("div");
    toDoIcon.innerHTML = `<i class="fas fa-circle"></i>`;
    toDoIcon.style.fontSize = "5px";
    toDoIcon.style.color = "white";

    // todo Span
    const spanDiv = document.createElement("div");
    spanDiv.style.width = "370px";
    spanDiv.style.marginLeft = "10px";
    spanDiv.style.overflowX = "scroll";
    
    const span = document.createElement("span");
    span.innerText = text;
    span.style.fontSize = "18px";
    span.style.color = "white";
    span.style.fontWeight = 600;

    spanDiv.append(span);

    // buttons
    const btnDiv = document.createElement("div");
    btnDiv.style.position = "absolute";
    btnDiv.style.right = "0";

    const completeBtn = document.createElement("button");
    completeBtn.classList.add("btn__complete");
    completeBtn.innerHTML = `<i class="far fa-check-square fa-2x"></i>`;
    completeBtn.style.padding = "0";
    completeBtn.addEventListener("click", completeToDos);
    if (complete === true) {
        completeBtn.style.display = "none";
        span.style.textDecoration = "line-through";
        span.style.textDecorationColor = "black";
        span.style.textDecorationThickness = "3px";
    }

    const restoreBtn = document.createElement("button");
    restoreBtn.classList.add("btn__restore");
    restoreBtn.innerHTML = `<i class="fas fa-undo-alt fa-2x"></i>`;
    restoreBtn.style.padding = "0";
    restoreBtn.addEventListener("click", restoreToDos);
    if (complete === false) {
        restoreBtn.style.display = "none";
        span.style.textDecoration = "none";
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn_delete");
    deleteBtn.innerHTML = `<i class="fas fa-times fa-2x"></i>`;
    deleteBtn.addEventListener("click", deleteToDos);
    deleteBtn.style.padding = "0";
    deleteBtn.style.marginLeft = "10px";

    btnDiv.append(completeBtn, restoreBtn, deleteBtn);
    toDo.append(toDoIcon, spanDiv, btnDiv);
    toDoListBox.append(toDo);
    
    // 객체 배열에 넣을 obj
    const toDoObj = {
        text: text,
        id: newId,
        complete : complete
    };

    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault(); // input의 submit 기본 동작을 막는다. (새로고침 X)
    const currentValue = toDoInput.value;
    paintToDo(currentValue, false);
    toDoInput.value = ""; // 입력란 초기화
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);

        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text, toDo.complete);
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