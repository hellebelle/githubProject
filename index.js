$(document).ready(function () {
    //when search button is pressed
    $("#search-bar").click(function () {
        $("#search").css("width", "80%");
        $("#search").css("paddingLeft", "60px");
        $("#search").css("cursor", "text");
        $("#search").focus();

        var i = 0;
        var message = 'Search for a GitHub User';
        var speed = 100;

        function typeWriter() {
            if (i < message.length) {
                msg = $("#search").attr("placeholder") + message.charAt(i);
                $("#search").attr("placeholder", msg)
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        typeWriter();
    })
    //making search button visible
    $("#search").keydown(function () {
        $("#btn").css("visibility", "visible");
    })

    function executeProg() {
        //clear the page

        $(".dropbtn").text("REPOSITORIES");
        $("div.content").text("");
        $("#repo_name").text("");
        $("#bio").text("");
        $("#followers").text("");
        d3.selectAll("svg").remove();
        //retrieving user from search input
        var user = $("#search").val() ? $("#search").val() : "github";
        var url_user = "https://api.github.com/users/" + user;
        //loading user and repositories
        loadUser(url_user, displayUser);
        loadRepos(url_user, displayRepos);

        //getting user's data
        function loadUser(url_user, callback1) {

            $.get(url_user,
                function (data, status) {
                    console.log(status);
                    callback1(data);
                }).fail(function () {
                    alert("User Not Found. Please refresh and try again with a valid username.");
                });
        };
        //getting repositories
        function loadRepos(url_user, callback2) {
            $.get(url_user + "/repos",
                function (data, status) {
                    console.log(status);
                    success: callback2(data, status);
                });
        }
        //getting the languages used in a repository
        function getLanguages(callback, repo) {
            $.get("https://api.github.com/repos/" + user + "/" + repo + "/languages",
                function (data, status) {
                    console.log(status);
                    success: callback(data, repo);
                });
        };
        //displaying page with user info
        function displayUser(data) {

            $("div.user_container").css("visibility", "visible");

            $("#user_img").attr("src", data.avatar_url);
            $("#bio").append(data.bio);
            $("#followers").append("Followers: " + data.followers);


        }
        //displaying repo information
        function displayRepos(data) {
            for (var i = 0; i < data.length; i++) {
                $("div.content").append("<li id='repo" + i + "'>" + data[i].name + "</li>");
            };
            //dropdown button containing first 30 repos returned
            $("button.dropbtn").css("visibility", "visible");
            $("div.content").children().click(function () {

                // get the chosen repo id by reference to the id of the element in list that was clicked

                var repoChoice = $("#" + this.id).html();
                $(".dropbtn").text("");
                $(".dropbtn").text(repoChoice);
                getLanguages(displayLanguages, repoChoice);
            });
        }
        //displaying graph
        function displayLanguages(data_real, repoChoice) {
            $("#repo_name").remove();
            d3.selectAll("svg").remove();
            $("div.repos_links").after("<div id = 'repo_name'> Languages used:" + repoChoice + "</div>")
            // set the dimensions and margins of the graph
            var values = Object.keys(data_real).map(function (key) { return data_real[key]; });
            var keys = Object.keys(data_real);
            var width = 500,
                height = 500,
                radius = width / 3;

            // set the color scale
            var color = d3.scaleOrdinal()
                .domain(Object.keys(data_real))
                .range(d3.schemePaired);

            var arc = d3.arc()
                .outerRadius(radius - 10)
                .innerRadius(0);

            var pie = d3.pie()
                .sort(null)
                .value(function (d) { return d.value; });

            var svg = d3.select("#graph").append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


            var data_values = values;
            var titles = keys;

            var data = []

            for (var x = 0; x < data_values.length; x++) {
                var tmp = {}
                tmp.label = titles[x]
                tmp.value = data_values[x]
                data.push(tmp)
            }

            var g = svg.selectAll(".arc")
                .data(pie(data))
                .enter().append("g")
                .attr("class", "arc");

            g.append("path")
                .attr("d", arc)
                .style("fill", function (d) { return color(d.data.label); });

            var pos = d3.arc().innerRadius(radius + 2).outerRadius(radius + 2);

            var getAngle = function (d) {
                return (180 / Math.PI * (d.startAngle + d.endAngle) / 2 - 90);
            };

            g.append("text")
                .attr("transform", function (d) {
                    return "translate(" + pos.centroid(d) + ") " +
                        "rotate(" + getAngle(d) + ")";
                })
                .attr("dy", 5)
                .style("text-anchor", "start")
                .text(function(d) {
                    if(d.endAngle - d.startAngle<4*Math.PI/180){return ""}
                    return d.data.label; });
        }
    }
    //when search button is pressed
    $("#btn").click(executeProg);
    //when enter key is pressed
    $("#search").keypress(function(e){
        if(e.which == 13) {
            executeProg();
        }
    })

});


