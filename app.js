const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const randomNum = (max, min) => Math.round(Math.random() * (max - min) + min);
const $INCORRECT_LETTERS_PGPH = $("#incorrect-letters-pgph");
const $WORD_PGPH = $("#word-pgph");
const $INPUT_TEMPLATE = $("#input-template").content;
const $FORM = $("#letter-form");
const $WORD_SECTION = $("#word-form");
const $FRAGMENT = document.createDocumentFragment();
const $STATUS_MODAL = $("#status-modal")
const $STATUS_MODAL_PGPH = $("#status-modal-pgph")
const WORDS_ARRAY = [
  "ARGENTINA",
  "CHILE",
  "URUGUAY",
  "PARAGUAY",
  "BOLIVIA",
  "BRASIL",
  "PERU",
  "VENEZUELA",
  "COLOMBIA",
  "ECUADOR",
  "MEXICO",
  "PANAMA",
  "SALVADOR",
];
let SELECTED_WORD;

if (navigator.onLine) {
  // with internet connection
  fetch("https://palabras-aleatorias-public-api.herokuapp.com/random")
    .then((res) => res.json())
    .then((WORD) => {
      SELECTED_WORD = WORD.body.Word.toUpperCase();
      for (const LETTER of SELECTED_WORD) {
        $FRAGMENT.appendChild($INPUT_TEMPLATE.cloneNode(true));
      }
      $WORD_SECTION.appendChild($FRAGMENT);
    });
} else {
  // without internet connection
  SELECTED_WORD = WORDS_ARRAY[Math.floor(Math.random() * WORDS_ARRAY.length)];

  for (const LETTER of SELECTED_WORD) {
    $FRAGMENT.appendChild($INPUT_TEMPLATE.cloneNode(true));
  }
  $WORD_SECTION.appendChild($FRAGMENT);
}

document.addEventListener("click", (e)=> {
  if(e.target.matches("#play-again-btn")) location.reload()
})
const $CANVAS = $("#canvas").getContext("2d");
// STRUCTURE
$CANVAS.beginPath();
$CANVAS.moveTo(1, 199);
$CANVAS.lineTo(50, 150);
$CANVAS.lineTo(150, 150);
$CANVAS.lineTo(199, 199);
$CANVAS.fill();
$CANVAS.closePath();
$CANVAS.fillRect(100, 50, 10, 100);
$CANVAS.fillRect(100, 50, 100, 10);
$CANVAS.fillRect(191.5, 50, 3, 25);

function drawCanvas(error, color) {
  $CANVAS.fillStyle = color;
  switch (error) {
    case 1:
      // HEAD
      $CANVAS.beginPath();
      $CANVAS.arc(193, 80, 10, 0, Math.PI * 2, true);
      $CANVAS.fill();
      break;
    case 2:
      // NECK
      $CANVAS.fillRect(190, 90, 5, 5);
      break;
    case 3:
      // BODY
      // $CANVAS.fillRect(180, 95, 25, 10);
      $CANVAS.fillRect(187.5, 95, 10, 25);
      break;
    case 4:
      // LEFT-ARM
      $CANVAS.beginPath();
      $CANVAS.moveTo(188, 95);
      $CANVAS.lineTo(168, 110);
      $CANVAS.lineTo(173, 115);
      $CANVAS.lineTo(193, 100);
      $CANVAS.fill();
      $CANVAS.closePath();
      break;
    case 5:
      // RIGHT-ARM
      $CANVAS.beginPath();
      $CANVAS.moveTo(198, 95);
      $CANVAS.lineTo(218, 110);
      $CANVAS.lineTo(213, 115);
      $CANVAS.lineTo(193, 100);
      $CANVAS.fill();
      $CANVAS.closePath();
      break;
    case 6:
      // LEFT-LEG
      $CANVAS.beginPath();
      $CANVAS.moveTo(188, 115);
      $CANVAS.lineTo(168, 130);
      $CANVAS.lineTo(173, 135);
      $CANVAS.lineTo(193, 120);
      $CANVAS.fill();
      $CANVAS.closePath();
      break;
    case 7:
      // RIGHT-LEG
      $CANVAS.beginPath();
      $CANVAS.moveTo(198, 115);
      $CANVAS.lineTo(218, 130);
      $CANVAS.lineTo(213, 135);
      $CANVAS.lineTo(193, 120);
      $CANVAS.fill();
      $CANVAS.closePath();
      break;
  }
}

$FORM.addEventListener("submit", mainFunction);

function renderIncorrectLetter(letter) {
  $INCORRECT_LETTERS_PGPH.innerHTML += `<s>${letter}</s>\n`;
}

const INCORRECT_LETTERS = [];
let errorsCount = 0;
let acertsCount = 0;
function mainFunction(e) {
  e.preventDefault();
  const LETTER = $FORM.letter.value.toUpperCase();
  const $INPUTS = $WORD_SECTION.querySelectorAll("input[type='text']");
  if (SELECTED_WORD.includes(LETTER)) {
    for (let i = 0; i < SELECTED_WORD.length; i++) {
      if (LETTER === SELECTED_WORD[i]) {
        acertsCount++;
        console.log({ acertsCount, errorsCount });
        $INPUTS[i].value = LETTER;
        $INPUTS[i].classList.add("correct-input");
        $INPUTS[i].classList.remove("incorrect-input");
      }
    }
  } else {
    if (!INCORRECT_LETTERS.includes(LETTER)) {
      INCORRECT_LETTERS.push(LETTER);
      errorsCount++;
      drawCanvas(errorsCount, "black");
      renderIncorrectLetter(LETTER);
    }
  }
  // and finaly
  $FORM.letter.value = "";
  if (
    Array.from($INPUTS).reduce((word, $input) => word + $input.value, "") ===
    SELECTED_WORD
  ) showModal(true)

  console.log({ errorsCount });
  if (errorsCount === 7) showModal(false)
}


function showModal(user_wins) {
  let message;
  if (user_wins) {
    message = "You win!"
  } else {
    message = "You lose :("
    const $CORRECT_WORD = document.createElement("p")
    $CORRECT_WORD.textContent = `The correct word was ${SELECTED_WORD}`
    $STATUS_MODAL_PGPH.insertAdjacentElement("afterend", $CORRECT_WORD)
  }
  $STATUS_MODAL_PGPH.textContent = message
  $STATUS_MODAL.showModal();
}
// $STATUS_MODAL.showModal();