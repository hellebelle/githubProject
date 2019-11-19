$(document).ready(function(){
    $("#search-bar").click(function() {
       $("#search").css("width","80%"); 
       $("#search").css("paddingLeft","60px");
       $("#search").css("cursor","text");
       $("#search").focus();

       var i = 0;
       var message = 'Search for a GitHub User';
       var speed = 100;

       function typeWriter(){
           if (i < message.length){
               msg = $("#search").attr("placeholder") + message.charAt(i);
               $("#search").attr("placeholder",msg)
               i++;
               setTimeout(typeWriter,speed);
           }
       }
       typeWriter();
    })

    $("#search").keydown(function () {
        $("#btn").css("visibility", "visible");
    })

    $("#btn").click(function () {
        $("div.container").css("visibility","hidden");
        $("#btn").css("visibility","hidden");
        loadData();

        function loadData() {
            var user = $("#search").val() ? $("#search").val() : "github";
            var url = "https://api.github.com/users/" + user;
            console.log(url);
            $.get( url, function (data, status) {
                console.log(status);
                
            });
        }
    })
    


});
/* const searchBr = document.getElementById('search-bar')
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
    //tip.style.visibility = 'visible';
    searchBtn.style.visibility = 'visible';
    //tip.style.opacity = '1';
})

function loadXML() {
    var input = document.getElementById("search").value;
    var output = "https://api.github.com/users/"+input;
    console.log(output);
    var result = parseJson(output);
    console.log(result);

}

function parseJson(url) {
    const Http = new XMLHttpRequest();
   // var result = null;
    Http.open("GET",url);
    Http.send();
    Http.onreadystatechange = function(){
        if(this.status==200){
            console.log(Http.responseText)
            result = JSON.parse(Http.responseText)
            return result;
        }
    }
    return null;
} 
 */