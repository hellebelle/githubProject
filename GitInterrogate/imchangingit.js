const searchBr = document.getElementById('search-bar')
const search = document.getElementById('search')
const searchBtn = document.getElementById('btn')


searchBr.addEventListener('click', () => {
    search.style.width = '80%';
    search.style.paddingLeft = '60px';
    search.style.cursor = 'text';
    search.focus();

    var i = 0;
    var message = 'Search for a GitHub User';
    var speed = 100;

    function typeWriter() {
        if (i < message.length) {
            msg = search.getAttribute('placeholder') + message.charAt(i);
            search.setAttribute('placeholder', msg)
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    typeWriter();
})

search.addEventListener('keydown', () => {
    searchBtn.style.visibility = 'visible';
})

searchBtn.addEventListener('click', () =>{
    
})

function loadData() {
    var input = document.getElementById("search").value;
    var output = "https://api.github.com/users/"+input;
    console.log(output);
    var output_parsed = parseJson(output);
    console.log(output_parsed);
   // window.location = 'user.html';

}

function parseJson(url) {
    var Http = new XMLHttpRequest();
    var result = null;
    Http.open("GET",url);
    Http.send();
    Http.onreadystatechange = (e) => {
        console.log(Http.responseText)
        result = JSON.parse(Http.responseText);
        console.log(result)
    }
   //result = JSON.parse(Http.responseText);
    //console.log(result);
    return result;
    //return result;
} 


/*  $(document).ready(function () {
     $("#search-bar").click(function(){

     })
 }) */