const newsBoxList = document.querySelector(".news-box__list");

// newsapi.org
const apiKey = "365f942a0408494e80779112a6187395";

const newsUrl = `https://newsapi.org/v2/top-headlines?country=kr&category=technology&apiKey=${apiKey}`;

function paintNewsList(json) {
    const newses = json.articles;
    
    for(let i = 0; i < 10; i++) {
        const title = newses[i].title;
        const url = newses[i].url;
        const urlImage = newses[i].urlToImage;
        makeNewsHtml(title, url, urlImage);
    }

}

function makeNewsHtml(title, url, urlImage) {
    // make html
    const newsLink = document.createElement("a");
    newsLink.href = url;
    newsLink.style.marginBottom = "20px";
    const newsDiv = document.createElement("div");
    newsDiv.style.display = "flex";
    newsDiv.style.alignItems = "center";

    const newsImg = document.createElement("img");
    newsImg.src = urlImage;
    newsImg.style.width = "100px";
    newsImg.style.height = "70px";
    newsImg.style.borderRadius = "10px";

    const newsTitleDiv = document.createElement("div");
    newsTitleDiv.style.height = "70px";
    newsTitleDiv.style.marginLeft = "10px";
    newsTitleDiv.style.display = "flex";
    newsTitleDiv.style.alignItems = "flex-start";
    const newsTitle = document.createElement("span");
    newsTitle.innerText = title;

    newsTitleDiv.append(newsTitle);
    newsDiv.append(newsImg, newsTitleDiv);
    newsLink.append(newsDiv);

    newsBoxList.append(newsLink);
}


function init() {

    fetch(newsUrl).then(function(response) {
        return response.json();
    }).then(function(json) {
        paintNewsList(json);
    });
}

init();