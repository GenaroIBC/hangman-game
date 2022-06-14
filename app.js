const $ = (selector) => document.querySelector(selector);
const randomNum = (max, min) => Math.round(Math.random() * (max - min) + min);

const $FORM = $("#word-form");

const WORDS_ARRAY = [
  "BREAD",
  "COFEE",
  "COMPUTER",
  "SOFTWARE",
  "TECHNOLOGY",
  "JAVASCRIPT",
];
const WORD = WORDS_ARRAY[Math.floor(Math.random * WORDS_ARRAY.length)];

$FORM.addEventListener("submit", (e) => {
  e.preventDefault();

  const USER_LETTERS = [];
  $FORM.querySelectorAll("input.entry__form__input").forEach((input) => {
    USER_LETTERS.push(input.value);
  });

  const USER_WORD = USER_LETTERS.join("").toUpperCase();
  if (WORD === USER_WORD) console.log("yasss");
  else console.log("nope");
});
