const newsBoxList = document.querySelector(".news-box__list");

function paintNewsList(json) {
    const newses = json.articles;
    
    for(let i = 0; i < 10; i++) {
        const title = newses[i].title;
        const url = newses[i].link;
        const urlImage = newses[i].media;
        makeNewsHtml(title, url, urlImage);
    }

}

function makeNewsHtml(title, url, urlImage) {
    // make html
    const newsLink = document.createElement("a");
    newsLink.href = url;
    newsLink.style.width = "350px";
    newsLink.style.marginBottom = "20px";
    newsLink.target = "_blank";
    // animation
    newsLink.style.transition = "all 0.3s ease";
    newsLink.onmouseenter = function() {
        this.classList.add("news__div");
    };
    newsLink.onmouseleave = function() {
        setTimeout(function() {
            this.classList.remove("news__div");
        }.bind(this, 300));
    }

    const newsDiv = document.createElement("div");
    newsDiv.style.display = "flex";
    newsDiv.style.alignItems = "center";

    const newsImgDiv = document.createElement("div");

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

    newsImgDiv.append(newsImg);
    newsTitleDiv.append(newsTitle);
    newsDiv.append(newsImgDiv, newsTitleDiv);
    newsLink.append(newsDiv);

    newsBoxList.append(newsLink);
}


function init() {

    const query = `marvel comics`;
    const encodeQuery = encodeURI(query);

    fetch(`https://free-news.p.rapidapi.com/v1/search?q=${encodeQuery}&lang=en`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "78703eb276msh50c7d5d50042338p17b171jsn674f786a647e",
            "x-rapidapi-host": "free-news.p.rapidapi.com"
        }
    })
    .then(response => {
        return response.json();
    }).then(json => {
        paintNewsList(json);
    })
    .catch(err => {
        console.error(err);
    });

}

init();