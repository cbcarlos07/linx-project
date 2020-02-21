let liEls = document.querySelectorAll('.itens-most ul li');
let liEls2 = document.querySelectorAll('.itens-price ul li');
let index = 0;
window.show = function(increase) {
  index = index + increase;
  index = Math.min(
    Math.max(index,0),
    liEls.length-1
  );
  liEls[index].scrollIntoView({behavior: 'smooth'});
}


window.show1 = function(increase) {
  index = index + increase;
  index = Math.min(
    Math.max(index,0),
    liEls2.length-1
  );
  liEls2[index].scrollIntoView({behavior: 'smooth'});
}
