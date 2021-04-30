const clothesTempText = document.querySelector(".clothes-box__temp-text"),
clothesInfo = document.querySelector(".clothes-box__clothes-info");

const temp = weatherTemp;
let tempText = "";
let clothes = [];

function getTemp() {
    tempText = temp.innerText;
    const tempNum = tempText.replace(/[^0-9]/g,'');
    // console.log(tempNum);

    recommandToClothes(tempNum);
}

function recommandToClothes(tempNum) {
    console.log(tempNum);

    if(tempNum <= -5 ) {
        clothes.push("방한 아웃도어 제품");
    } else if (tempNum <= 0) {
        clothes.push(`모자달린 두꺼운 패딩`, `스웨터`, `귀마개`, `부츠`);
    } else if (tempNum <= 4) {
        clothes.push(`패딩`, `두꺼운 코트`, `목도리`, `기모 제품`);
    } else if (tempNum >= 5 && tempNum <= 8) {
        clothes.push(`코트`, `히트텍`, `니트`, `청바지`, `레깅스`);
    } else if (tempNum >= 9 && tempNum <= 11) {
        clothes.push(`재킷`, `트렌치코트`, `야상`, `니트`, `스타킹`, `청바지`, `면바지`);
    } else if (tempNum >= 12 && tempNum <= 16) {
        clothes.push(`코트`, `가디건`, `야상`, `맨투맨`, `니트`, `스타킹`, `청바지`, `면바지`);
    } else if (tempNum >= 17 && tempNum <= 19) {
        clothes.push(`얇은 니트`, `가디건`, `맨투맨`, `얇은 재킷`, `면바지`, `청바지`);
    } else if (tempNum >= 20 && tempNum <= 22) {
        clothes.push(`얇은 가디건`, `긴팔티`, `면바지`, `청바지`);
    } else if (tempNum >= 23 && tempNum <= 27) {
        clothes.push(`반팔`, `얇은 셔츠`, `반바지`, `면바지`);
    } else if (tempNum >= 28) {
        clothes.push(`민소매`, `반팔`, `반바지`, `치마`);
    }

    // console.log(clothes);
    paintClothes();
}

function paintClothes() {

    clothesTempText.innerText = `${tempText}에 적합한 옷을 추천합니다.`;
    clothesTempText.style.color = "#4BA8D3";
    clothesTempText.style.fontSize = "16px";

    for (const clothing of clothes) {
        // console.log(clothing);
        const div = document.createElement("div");
        div.classList.add(".clothes-info__item");
        div.style.marginBottom ="10px";
        div.style.width = "250px";

        const icon = document.createElement("i");
        icon.innerHTML = `<i class="fas fa-check"></i>`;
        icon.style.color = "#4BA8D3";

        const span = document.createElement("span");
        span.innerText = `${clothing}`;
        span.style.color = "white";
        span.style.fontSize = "20px";
        span.style.fontWeight = "700";
        span.style.marginLeft = "20px";

        div.append(icon, span);
        clothesInfo.append(div);
    }

}

function init() {
    setTimeout(getTemp, 1000);
}

init();