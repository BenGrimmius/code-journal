var $photoInput = document.querySelector('.photo-input');

var $img = document.querySelector('img');

function isImageValid(url) {
  return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

$photoInput.addEventListener('input', function (event) {
  var valid = isImageValid(event.target.value);
  if (valid) {
    $img.attributes.src.textContent = event.target.value;
  } else {
    $img.attributes.src.textContent = 'images/placeholder-image-square.jpg';
  }

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
  var newEntry = renderEntries(submission);
  $entryList.prepend(newEntry);
});

function renderEntries(entry) {

  var li = document.createElement('li');

  var rowOneDiv = document.createElement('div');
  rowOneDiv.setAttribute('class', 'row');

  var img = document.createElement('img');
  img.setAttribute('class', 'column-half');
  img.setAttribute('src', entry.photoURL);

  var colHalfDiv = document.createElement('div');
  colHalfDiv.setAttribute('class', 'column-half');

  var hThree = document.createElement('h3');
  hThree.textContent = entry.title;

  var p = document.createElement('p');
  p.textContent = entry.notes;

  li.appendChild(rowOneDiv);
  rowOneDiv.appendChild(img);
  rowOneDiv.appendChild(colHalfDiv);
  colHalfDiv.appendChild(hThree);
  colHalfDiv.appendChild(p);

  return li;

}

var $entryList = document.querySelector('ul');

window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    var list = renderEntries(data.entries[i]);
    $entryList.append(list);
  }
});
