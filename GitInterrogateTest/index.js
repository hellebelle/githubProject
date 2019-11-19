
$(document).ready(function(){
    const client_id = "Iv1.e4951da8a6463f1a";
    const client_secret = "76b3aeea23ceb4702e2810ff301d8effc65fda2e";
    
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

        var user = $("#search").val() ? $("#search").val() : "github";
        loadData(user, displayUser, displayRepos);

        async function loadData(user,callback1,callback2) {
            
            //var url_User = "https://api.github.com/users/" + user;
            const response = await fetch(`https://api.github.com/users/${user}?client_id=${client_id}&
            client_secret=${client_secret}`);
            const result = await response.json();
            console.log(result);
/*             $.get( url_User, function (data, status) {
                console.log(status);
                success: callback1(data, status);
            }); */
           // var url_Repos = ;
            const repos_response = await fetch(result.repos_url + `?client_id=${client_id}&
            client_secret=${client_secret}`);
            const repos_result = await repos_response.json();
            console.log(repos_result);
            
            //number of commits
            //var commits = [];
/*             for(var i = 0; i< repos_result.length; i++){
                var obj = repos_result[i];
                const contributors = await fetch(obj.contibutors_url + `?client_id=${client_id}&
                client_secret=${client_secret}`);
                const con_results = await contributors.json();
                console.log(con_results);

            } */
           /*  repos_result.items.forEach(i => {
                var repo = new Object();
                repo.key = i.name;
                const contributors = i.contributors_url;
                var commits = 0
                contributors.items.forEach(j => {
                   commits+=j.contributions;
                   console.log(commits);
                });
                repo.value = commits;  
            }); */
            //"https://api.github.com/users/" + user + "/repos"
/*             $.get(url_Repos,function(data, status){
                console.log(status);
                success: callback2(data,status);
            }); */
        };

        function displayUser(data, status) {
            $("div.container").remove();
            $("#username").append(data.login);
        }

        function displayRepos(data,status) {
            
        }

    })
    


});


