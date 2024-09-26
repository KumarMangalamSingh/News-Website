const API_key="dd3eaed8a2de4114add3042b1eb0de98";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=>fetchNews("tech"));
 
//  Fetching news from API
async function fetchNews(query){
 const res=await fetch(`${url}${query}&apiKey=${API_key}`);
 const data=await res.json();
 bindData(data.articles);
}
 
// Cloning and adding carts dynamically 
function bindData(articles){
    const cardcontainer=document.getElementById('card-container');
    const template=document.getElementById('template');

    cardcontainer.innerHTML='';

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone=template.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardcontainer.appendChild(cardClone);
    });
}
function fillDataInCard(cardClone,article){
  const newsimg=cardClone.querySelector("#news-img");
  const newstitle=cardClone.querySelector("#news");
  const newssource=cardClone.querySelector("#newssource");
  const newsdesc=cardClone.querySelector("#newsdesc");

  newsimg.src=article.urlToImage;
  newstitle.innerHTML=article.title;
  newsdesc.innerHTML=article.description;
  newssource.innerHTML=article.source.name;
  cardClone.firstElementChild.addEventListener("click",()=>{
    window.open(article.url,"_blank");
  })  
}


function onNav(id){
  fetchNews(id);
}

const search=document.getElementById("news-inp");
const button=document.getElementById("news-btn");

button.addEventListener('click',()=>{
  const query=search.value;
  if(!query) return;
  fetchNews(query);
})
