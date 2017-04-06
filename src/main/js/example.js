$(document).ready(function () {
  $('.example-code-foo').click(function () {
    $('.example-code-bar').toggleClass('green')
  });
  $('.example-code-bar').click(function () {
    $('.example-code-foo').toggleClass('red')
  });
});

