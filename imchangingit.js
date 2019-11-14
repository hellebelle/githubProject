const searchBtn = document.getElementById('search-btn');
const search = document.getElementById('username');
const tip = document.getElementById('tip');

searchBtn.addEventListener('click', () =>  {
  search.style.width ='80%';
  search.style.paddingLeft ='80px';
  search.style.cursor='text';
  search.focus();
  
  var i = 0;
  var message = 'Type in a username e.g hellebelle';
  var speed = 100;
  
  function typeWriter(){
    if(i<message.length){
      msg = search.getAttribute('placeholder') + message.charAt(i);
      search.setAttribute('placeholder', msg)
      i++;
      setTimeout(typeWriter, speed);
    }
  }
  typeWriter();
})

search.addEventListener('keydown', () => {
  tip.style.visibility = 'visible';
  tip.style.opacity = '1';
})