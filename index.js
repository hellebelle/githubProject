$(document).ready(function(){
    //when search button is pressed
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
    //making search button visible
    $("#search").keydown(function () {
        $("#btn").css("visibility", "visible");
    })
    //when search button is pressed
    $("#btn").click(function () {
        //clear the page
        //$("div.container").css("visibility","hidden");
        //$("#btn").css("visibility","hidden");
        // $("h2").text("");
        $(".dropbtn").text("REPOSITORIES");
        $("div.content").text("");
        $("#repo_name").text("");
        d3.selectAll("svg").remove();
        //retrieving user from search input
        var user = $("#search").val() ? $("#search").val() : "github";
        var url_user = "https://api.github.com/users/" + user;
        //loading user and repositories
        loadUser(url_user, displayUser );
        loadRepos(url_user,displayRepos);
        
        //getting user's data
        function loadUser(url_user,callback1) {
            
            $.get(url_user,
                function (data, status) {
                    console.log(status);
                    callback1(data);
                }).fail(function(){
                    alert("User Not Found. Please refresh and try again with a valid username.");
                });
        };
        //getting repositories
        function loadRepos(url_user,callback2) {
            $.get(url_user + "/repos",
                function (data,status) {
                    console.log(status);
                    success: callback2(data,status);
            });
        }
        //getting the languages used in a repository
        function getLanguages(callback, repo){
            $.get("https://api.github.com/repos/" + user + "/" + repo + "/languages",
                function (data, status) {
                    console.log(status);
                    success: callback(data,repo);
            });
        };
        //displaying page with user info
        function displayUser(data) {
           // $("div.container").remove();
            $("div.user_container").css("visibility", "visible");
            // $("h2").text(data.login);
            $("#user_img").attr("src", data.avatar_url);
            // var h2 =  $("<h2></h2>").text(data.login)
            //$("#repo_details").before(h2);
            //$("#username").append(data.login);
            
        }
        //displaying repo information
        function displayRepos(data) {
            for (var i = 0; i < data.length; i++) {
				$("div.content").append("<li id='repo" + i + "'>" + data[i].name + "</li>");
            };
            //dropdown button containing first 30 repos returned
            $("button.dropbtn").css("visibility", "visible");
			$("div.content").children().click(function(){
			
                // get the chosen repo id by reference to the id of the element in list that was clicked
                
                var repoChoice = $("#"+this.id).html();
                $(".dropbtn").text("");
                $(".dropbtn").text(repoChoice);
                getLanguages(displayLanguages, repoChoice);
			});
        }
        //displaying graph
        function displayLanguages(data, repoChoice){
            $("#repo_name").remove();
            d3.selectAll("svg").remove();
            $("div.repos_links").after("<div id = 'repo_name'> Languages used:"+ repoChoice +"</div>")
            // set the dimensions and margins of the graph
            var width = 1050
            var height = 650
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
                .domain(Object.keys(data))
                .range(d3.schemePaired)

            // Compute the position of each group on the pie:
            var pie = d3.pie()
                .value(function(d) {return d.value; })
            var data_ready = pie(d3.entries(data))
            console.log(data_ready);

            // The arc generator
            var arc = d3.arc()
                .innerRadius(radius * 0.5)         // This is the size of the donut hole
                .outerRadius(radius * 0.8)

            // Another arc that won't be drawn. Just for labels positioning
            var outerArc = d3.arc()
                .innerRadius(radius * 0.9)
                .outerRadius(radius * 0.9)

            // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
            svg
                .selectAll('all')
                .data(data_ready)
                .enter()
                .append('path')
                .attr('d', arc)
                .attr('fill', function(d){ return(color(d.data.key)) })
                .attr("stroke", "white")
                .style("stroke-width", "2px")
                
                
            // Add the polylines between chart and labels:
            svg
                .selectAll('allPolylines')
                .data(data_ready)
                .enter()
                .append('polyline')
                .attr("stroke", "black")
                .style("fill", "none")
                .attr("stroke-width", 1)
                .attr('points', function(d) {
                    var posA = arc.centroid(d) // line insertion in the slice
                    var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
                    var posC = outerArc.centroid(d) + 1 ; // Label position = almost the same as posB
                    var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
                    posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
                    return [posA, posB, posC]
                })

            // Add the polylines between chart and labels:
            svg
                .selectAll('allLabels')
                .data(data_ready)
                .enter()
                .append('text')
                .text( function(d) { console.log(d.data.key) ; return d.data.key } )
                .attr('transform', function(d) {
                    var pos = outerArc.centroid(d) + 50;
                    var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                    pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                    return 'translate(' + pos + ')';
                })
                .style('text-anchor', function(d) {
                    var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                    return (midangle < Math.PI ? 'start' : 'end')
                })
        }

    })
    


});
