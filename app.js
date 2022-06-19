// const $INCORRECT_WORD_TEMPLATE = $("#incorrect-letter-template").content;
// const $INCORRECT_LETTERS_SECT = $(".visual__incorrect-words");
// const $FAILED_POINTS = $(".visual__points__fails");
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const randomNum = (max, min) => Math.round(Math.random() * (max - min) + min);
const $INCORRECT_LETTER_PGPH = $("#incorrect-letter-pgph");
const $WORD_PGPH = $("#word-pgph");
const $INPUT_TEMPLATE = $("#input-template").content;
const $FORM = $("#letter-form");
const $WORD_SECTION = $("#word-form");
const $FRAGMENT = document.createDocumentFragment();
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
const SELECTED_WORD =
  WORDS_ARRAY[Math.floor(Math.random() * WORDS_ARRAY.length)];
$WORD_PGPH.textContent = SELECTED_WORD;

for (const LETTER of SELECTED_WORD) {
  $FRAGMENT.appendChild($INPUT_TEMPLATE.cloneNode(true));
}
$WORD_SECTION.appendChild($FRAGMENT);

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

// const INCORRECT_LETTERS = [];
// let errorsCount = 0;
// $FORM.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const $INPUTS = $FORM.querySelectorAll("input.entry__form__input");
//   const WORD_LETTERS = SELECTED_WORD.split("");
//   if (
//     SELECTED_WORD ===
//     Array.from($INPUTS).reduce((str, $input) => str + $input.textContent, "")
//   ) {
//     $WORD_PGPH.textContent = SELECTED_WORD;
//     $WORD_PGPH.style.display = "block";
//   }
//   for (let i = 0; i < $INPUTS.length; i++) {
//     const $INPUT = $INPUTS[i];
//     const LETTER = WORD_LETTERS[i];
//     const UPPER_INPUT_VALUE = $INPUT.value.toUpperCase();

//     if (UPPER_INPUT_VALUE === LETTER) {
//       $INPUT.classList.add("correct-input");
//       $INPUT.classList.remove("incorrect-input");
//       $INPUT.disabled = true;
//     } else {
//       if (INCORRECT_LETTERS.includes(UPPER_INPUT_VALUE))
//         renderIncorrectLetter(UPPER_INPUT_VALUE);
//       else {
//         const $INCORRECT_LETTER = $INCORRECT_WORD_TEMPLATE
//           .cloneNode(true)
//           .querySelector(".incorrect-letter-box");
//         $FAILED_POINTS.textContent = errorsCount;
//         INCORRECT_LETTERS.push(UPPER_INPUT_VALUE);
//         $INCORRECT_LETTER.textContent = UPPER_INPUT_VALUE;
//         $INCORRECT_LETTERS_SECT.appendChild($INCORRECT_LETTER);
//         errorsCount++;
//         drawCanvas(errorsCount);
//       }
//       $INPUT.value = "";
//       $INPUT.classList.add("incorrect-input");
//       // $INPUT.classList.remove("correct-input");
//     }
//   }
//   if (errorsCount === 7) {
//     $WORD_PGPH.textContent = SELECTED_WORD;
//     $WORD_PGPH.style.display = "block";
//     // $FORM.removeEventListener()
//   }
// });

const INCORRECT_LETTERS = [];
let errorsCount = 0;
let acertsCount = 0;
$FORM.addEventListener("submit", (e) => {
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
  )
    document.write("ganaste :(");//userWins()

  console.log({ errorsCount });
  if (errorsCount === 7) document.write("perdiste :(");//userLoses()
});

function renderIncorrectLetter(letter) {
  $INCORRECT_LETTER_PGPH.innerHTML += `<s>${letter}</s>\n`;
}
