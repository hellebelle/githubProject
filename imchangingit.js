const Http = new XMLHttpRequest();
const url='https://api.github.com/users/octocat/orgs';
Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => {
  console.log(Http.responseText)
}