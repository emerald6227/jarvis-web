const newsBoxList = document.querySelector(".news-box__list");

// newsapi.org
const apiKey = "365f942a0408494e80779112a6187395";

const newsUrl = `https://newsapi.org/v2/top-headlines?country=kr&category=technology&apiKey=${apiKey}`;

function paintNewsList(json) {
    const newses = json.articles;
    console.log(newses);
    
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

    const query = `apple`;
    const encodeQuery = encodeURI(query);
    // console.log(encodeQuery);

    fetch(`https://free-news.p.rapidapi.com/v1/search?q=${encodeQuery}&lang=en`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "78703eb276msh50c7d5d50042338p17b171jsn674f786a647e",
            "x-rapidapi-host": "free-news.p.rapidapi.com"
        }
    })
    .then(response => {
        // console.log(response);
        return response.json();
    }).then(json => {
        // console.log(json);
        paintNewsList(json);
    })
    .catch(err => {
        console.error(err);
    });



    // fetch(newsUrl).then(function(response) {
    //     console.log(response);
    //     return response.json();
    // }).then(function(json) {
    //     paintNewsList(json);
    // }).catch(function(error) {
    //     console.log(`news api error: ${error}`);
    // });
}

init();