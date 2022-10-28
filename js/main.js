var $photoInput = document.querySelector('.photo-input');
// console.log($photoInput);

var $img = document.querySelector('img');
// console.log($img);

$photoInput.addEventListener('input', function (event) {
  $img.attributes.src.textContent = event.target.value;
});

var $form = document.querySelector('form');

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  var submission = {};
  submission.title = $form[0].value;
  submission.photoURL = $form[1].value;
  submission.notes = $form[2].value;
  submission.EntryID = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(submission);
  this.reset();
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
});
