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
  li.setAttribute('data-entry-id', data.nextEntryId);

  var rowOneDiv = document.createElement('div');
  rowOneDiv.setAttribute('class', 'row');

  var imgColHalf = document.createElement('div');
  imgColHalf.setAttribute('class', 'column-half');

  var img = document.createElement('img');
  img.setAttribute('src', entry.photoURL);
  img.setAttribute('class', 'editPhoto');

  var colHalfDiv = document.createElement('div');
  colHalfDiv.setAttribute('class', 'column-half');

  var h3Row = document.createElement('div');
  h3Row.setAttribute('class', 'row');
  h3Row.setAttribute('class', 'flex');

  var hThree = document.createElement('h3');
  hThree.textContent = entry.title;
  hThree.setAttribute('class', 'editTitle');

  var editImageDiv = document.createElement('div');
  editImageDiv.setAttribute('class', 'pen');

  var faPen = document.createElement('i');
  faPen.setAttribute('class', 'fa-sharp fa-solid fa-pen');
  faPen.setAttribute('style', 'color: #552b81');
  faPen.setAttribute('style', 'font-size: 30px');

  var pRow = document.createElement('div');
  pRow.setAttribute('class', 'row');

  var p = document.createElement('p');
  p.textContent = entry.notes;
  p.setAttribute('class', 'editNotes');

  li.appendChild(rowOneDiv);
  rowOneDiv.appendChild(imgColHalf);
  imgColHalf.appendChild(img);
  rowOneDiv.appendChild(colHalfDiv);
  colHalfDiv.appendChild(h3Row);
  h3Row.appendChild(hThree);
  h3Row.appendChild(editImageDiv);
  editImageDiv.appendChild(faPen);
  colHalfDiv.appendChild(pRow);
  pRow.appendChild(p);

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

$entryList.addEventListener('click', function (event) {
  var selected = event.target.closest('li');
  if (event.target.className === 'fa-sharp fa-solid fa-pen') {
    $new.className = 'new';
    $entries.className = 'entries hidden';
    data.editing = selected;

    var $formTitle = document.querySelector('.title');
    var $editTitle = document.querySelector('.editTitle');
    $formTitle.value = $editTitle.textContent;

    var $placeHolder = document.querySelector('.place-holder');
    var $formPhoto = document.querySelector('.photo-input');
    var $editPhoto = document.querySelector('.editPhoto');
    $formPhoto.value = $editPhoto.src;
    $placeHolder.src = $editPhoto.src;

    var $formNotes = document.querySelector('textarea');
    var $editNotes = document.querySelector('.editNotes');
    $formNotes.value = $editNotes.textContent;
  }
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
