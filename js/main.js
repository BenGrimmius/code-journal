var $photoInput = document.querySelector('.photo-input');
var $img = document.querySelector('img');
var $form = document.querySelector('form');
var $entriesNav = document.querySelector('.entries-nav');
var $new = document.querySelector('.new');
var $entries = document.querySelector('.entries');
var $button = document.querySelector('button');
var $entryList = document.querySelector('ul');
var $noEntries = document.querySelector('.no-entries');

function isImageValid(url) {
  return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

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
  $new.className = 'new hidden';
  $entries.className = 'entries';
  $noEntries.className = 'no-entries hidden';
  data.view = 'entries';
});

function renderEntries(entry) {

  var li = document.createElement('li');

  var rowOneDiv = document.createElement('div');
  rowOneDiv.setAttribute('class', 'row');

  var imgColHalf = document.createElement('div');
  imgColHalf.setAttribute('class', 'column-half');

  var img = document.createElement('img');
  img.setAttribute('src', entry.photoURL);

  var colHalfDiv = document.createElement('div');
  colHalfDiv.setAttribute('class', 'column-half');

  var hThree = document.createElement('h3');
  hThree.textContent = entry.title;

  var p = document.createElement('p');
  p.textContent = entry.notes;
  p.className = 'text-box';

  li.appendChild(rowOneDiv);
  rowOneDiv.appendChild(imgColHalf);
  imgColHalf.appendChild(img);
  rowOneDiv.appendChild(colHalfDiv);
  colHalfDiv.appendChild(hThree);
  colHalfDiv.appendChild(p);

  return li;

}

$photoInput.addEventListener('input', function (event) {
  var valid = isImageValid(event.target.value);
  if (valid) {
    $img.attributes.src.textContent = event.target.value;
  } else {
    $img.attributes.src.textContent = 'images/placeholder-image-square.jpg';
  }

});

window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    var list = renderEntries(data.entries[i]);
    $entryList.append(list);
  }
});

$entriesNav.addEventListener('click', function (event) {
  $new.className = 'new hidden';
  $entries.className = 'entries';
  data.view = 'entries';
});

$button.addEventListener('click', function (event) {
  $new.className = 'new';
  $entries.className = 'entries hidden';
  data.view = 'entry-form';
});

if (data.entries.length === 0) {
  $noEntries.className = 'no-entries';
} else {
  $noEntries.className = 'no-entries hidden';
}

if (data.view === 'entry-form') {
  $entries.className = 'entries hidden';
  $new.className = 'new';
} else {
  $entries.className = 'entries';
  $new.className = 'new hidden';
}
