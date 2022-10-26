var $photoInput = document.querySelector('.photo-input');
// console.log($photoInput);

var $img = document.querySelector('img');
// console.log($img);

$photoInput.addEventListener('input', function (event) {
  $img.attributes.src.textContent = event.target.value;
});
