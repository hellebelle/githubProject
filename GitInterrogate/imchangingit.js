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

        var user = $("#search").val() ? $("#search").val() : "github";
        var url = "https://api.github.com/users/" + user;
        loadUser(url, displayUser, displayRepos);
        
        
        function loadUser(url,callback1,callback2) {
            $.get(url,
                function (data, status) {
                    console.log(status);
                    success: callback1(data, status);
                });
            
            $.get(url + "/repos",
            function (data,status) {
                console.log(status);
                success: callback2(data,status);
            });
        };
    

        function getLanguages(callback, repo){
            $.get("https://api.github.com/repos/" + user + "/" + repo + "/languages",
                function (data, status) {
                    console.log(data);
                    success: callback(data,status,repo);
            });
        };


 
            // var page = 1;
            // var url_Repos = result.repos_url + `?client_id=${client_id}&
            // client_secret=${client_secret}`;
            // var total_repos = 0;
            // while (true) {
            //     console.log(url_Repos);
            //     const repos_response = await fetch(url_Repos);
            //     const repos_result = await repos_response.json();
            //     console.log(repos_result);
            //     var count_repo = Object.keys(repos_result).length;
            //     //console.log("counttttt:::",count_repo)
            //     total_repos += count_repo;
            //     console.log("total number of repos:",total_repos)
            //     if (count_repo == 30){
            //         page = page + 1;
            //         url_Repos = result.repos_url + `?page=` + page + `?client_id=${client_id}&
            //             client_secret=${client_secret}`; 
                        
            //     }
            //     else{
            //         break;
            //     }
            // }
            // console.log(total_repos);
           /*  const repos_result = await repos_response.json();
            console.log(repos_result);
            
            //number of commits
            var num_commits = 0;
            for(var i = 0; i< repos_result.length; i++){
                var obj = repos_result[i];
                const commits = await fetch(`https://api.github.com/repos/${user}/${obj.name}/commits?per_page=100&client_id=${client_id}&
                    client_secret=${client_secret}`);
                //const contributors = await fetch(obj.contibutors_url + `?client_id=${client_id}&
                //client_secret=${client_secret}`);
                const con_results = await commits.json();
         /*        var item = JSON.parse(con_results);
                console.log(item);
                var item_len = Object.keys(item[0].length);
                console.log(item_len); */
               //console.log(con_results); */

             
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

        

        function displayUser(data, status) {
            $("div.container").remove();
            $("#user_profile").append(data.login);
        }

        function displayRepos(data,status) {
            for (var i = 0; i < data.length; i++) {
				$("div.content").append("<li id='repo" + i + "'>" + data[i].name + "</li>");
			};
            $("button.dropbtn").css("visibility", "visible");
			$("div.content").children().click(function(){
			
				// get the chosen repo id by reference to the id of the element in list that was clicked
                var repoChoice = $("#"+this.id).html();
                getLanguages(displayLanguages, repoChoice);
			});
        }

        function displayLanguages(data, status, repo){
            // set the dimensions and margins of the graph
            var width = 450
            var height = 450
            var margin = 40
            // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
            var radius = Math.min(width, height)/2 - margin
            var svg = d3.select("#graph")
                .append("svg")
                    .attr("width",width)
                    .attr("height",height)
                .append("g")
                    .attr("transform", "translate(" + width/2 + "," + height/2 + ")");
            
            // set the color scale
            var color = d3.scaleOrdinal()
                .domain(data)
                .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

            // Compute the position of each group on the pie:
            var pie = d3.pie()
                .value(function(d) {return d.value; })
            var data_ready = pie(d3.entries(data))
            console.log(data_ready);
            // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
            svg
                .selectAll('whatever')
                .data(data_ready)
                .enter()
                .append('path')
                .attr('d', d3.arc()
                    .innerRadius(100)         // This is the size of the donut hole
                    .outerRadius(radius)
                )
                .attr('fill', function(d){ return(color(d.data.key)) })
                .attr("stroke", "black")
                .style("stroke-width", "2px")
                .style("opacity", 0.7)    
        }

    })
    


});
