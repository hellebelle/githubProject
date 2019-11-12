const btnRepo = document.getElementById("btnRepos")
const btnIss = document.getElementById("btnIss")
const btnCommits = document.getElementById("btnCommits")
const divResult = document.getElementById("divResult")
btnRepo.addEventListener("click", getRepos)
btnIss.addEventListener("click", getIssues)
btnCommits.addEventListener("click", getCommits)
async function getRepos(){
    clear();
    const url = "https://api.github.com/search/repositories?q=stars:>150000"
    const response = await fetch(url)
    const result = await response.json()
        
    result.items.forEach(i =>{
        const anchor = document.createElement("a")
        anchor.href = i.html_url
        anchor.textContent = i.full_name
        divResult.appendChild(anchor)
        divResult.appendChild(document.createElement("br"))

    })    
}

async function getIssues(){
    clear();
    const url = "https://api.github.com/search/issues?q=author:raisedadead repo:freecodecamp/freecodecamp type:issue"
    const response = await fetch(url)
    const result = await response.json()
        
    result.items.forEach(i =>{
        const anchor = document.createElement("a")
        anchor.href = i.html_url
        anchor.textContent = i.title
        divResult.appendChild(anchor)
        divResult.appendChild(document.createElement("br"))

    })  
}

async function getCommits(){
    clear();
    const url = "https://api.github.com/search/commits?q=repo:freecodecamp/freecodecamp author-date:2019-03-01..2019-03-31"
    const headers = {
        "Accept" : "application/vnd.github.cloak-preview"
    }
    const response = await fetch(url, {
        "method" : "GET",
        "headers" : headers
    })
    const result = await response.json()
        
    result.items.forEach(i =>{
        const anchor = document.createElement("a")
        anchor.href = i.html_url
        anchor.textContent = i.commit.message
        divResult.appendChild(anchor)
        divResult.appendChild(document.createElement("br"))

    })  
}

function clear(){
    while(divResult.firstChild)
        divResult.removeChild(divResult.firstChild)
}