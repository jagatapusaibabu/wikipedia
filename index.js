let searchInput=document.getElementById("searchInput");
let searchResults=document.getElementById("searchResults");
let spinner=document.getElementById("spinner");

function createAndAppend(result){
    let {title,link,description}=result;
    let divEl=document.createElement("div");
    divEl.classList.add("result-item");
    searchResults.appendChild(divEl);

    let Anchor_title=document.createElement("a");
    Anchor_title.classList.add("result-title");
    Anchor_title.textContent=title;
    Anchor_title.href=link;
    Anchor_title.target="_blank";
    divEl.appendChild(Anchor_title);

    let line_break=document.createElement("br");
    divEl.appendChild(line_break);

    let Anchor_url=document.createElement("a");
    Anchor_url.classList.add("result-url");
    Anchor_url.textContent=link;
    Anchor_url.href=link;
    Anchor_url.target="_blank";
    divEl.appendChild(Anchor_url);

    let line_break2=document.createElement("br");
    divEl.appendChild(line_break2);

    let dec=document.createElement("p");
    dec.classList.add("line-description");
    dec.textContent=description;
    divEl.appendChild(dec);
}

function displayResults(search_Result){
    spinner.classList.toggle("d-none");
    for(let result of search_Result){
        createAndAppend(result);
    }
}

function searchWiki(event){
    if(event.key === "Enter" && searchInput.value!==''){
        searchResults.textContent="";
        spinner.classList.toggle("d-none");
        let url="https://apis.ccbp.in/wiki-search?search=" +searchInput.value;
        let options={
            method:"GET"
        };
        fetch(url,options)
        .then(function(response){
            return response.json();
        })
        .then(function(jsonData){
            let {search_results}=jsonData;
            console.log(search_results);
            displayResults(search_results);
        });
    } 
}

searchInput.addEventListener('keydown',searchWiki);
