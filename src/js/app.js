const partScreen1 = document.getElementById('partScreen1');
const partScreen2 = document.getElementById('partScreen2');
const startLink = document.getElementById('go');
const partTime = document.querySelector('#partScreen1');
const listOfTime = document.querySelector('.listOfTime');
const timeTableSet = document.querySelector('#time');
const desk = document.querySelector('.desk');
const colors = ['#ff8c8c', '#8cb8ff', '#a3ffb3', '#dbb44f', '#cb8cff', '#ff78ac'];

let timeTable = 0;
let score = 0;
let id = '';

startLink.addEventListener('click', onStartClick);
listOfTime.addEventListener('click', onListOfTimeClick);
desk.addEventListener('click', onDescClick);

function onDescClick(event) {
  if (event.target.classList.contains('circle')) {
    score += 1;
    event.target.remove(); // убраем целевой элемент и вызыаем функцию создания нового кружка
    createCircle();
  }
  if (event.target.classList.contains('restart')) {
    startAgain();
  }
}

function onStartClick() {
  partScreen1.classList.add('up');
}

function onListOfTimeClick(event) {
  if (!event.target.classList.contains('time-button')) {
    return;
  }
  time = parseInt(event.target.getAttribute('data-time'));
  partScreen2.classList.add('up');
  clearDescAndShowTime();
  timeSet(time);
  id = setInterval(timeDecrease, 1000);

  createCircle();
}

function timeSet(time) {
  timeTableSet.innerHTML = `00:${time}`;
}

function timeDecrease() {
  if (time === 0) {
    gameOver();
  } else {
    let currentTime = --time;

    if (currentTime < 10) {
      currentTime = `0${currentTime}`;
    }
    timeSet(currentTime);
  }
}

function createCircle() {
  const circle = document.createElement('div');
  const color = getRandomColor();

  const size = getRandomNumber(20, 70);

  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.backgroundColor = color;
  circle.style.boxShadow = `0 0 2px ${color},0 0 10px ${color}`;
  circle.classList.add('circle');

  const { width, height } = desk.getBoundingClientRect(); //возвращает размер элемента и его позицию относительно viewport

  const x = getRandomNumber(0, width - size); // отнимаем размер шарика чтобы он не вылазил за границы доски
  const y = getRandomNumber(0, height - size); // отнимаем размер шарика чтобы он не вылазил за границы доски

  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  desk.appendChild(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function gameOver() {
  timeTableSet.parentNode.classList.add('hide'); //убираем родителя текущего элемента
  desk.innerHTML = `
  <h2 class="result-title">Cчет: <span class="score">${score}</span></h2>

  <a href='#' class='restart'>Start again</a>`;
  desk.classList.add('isOver');
}
function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
function startAgain() {
  desk.classList.remove('isOver');
  partScreen2.classList.remove('up');
  partScreen1.classList.remove('up');

  timeTable = 0;
  score = 0;
}
function clearDescAndShowTime() {
  desk.innerHTML = '';
  timeTableSet.parentNode.classList.remove('hide');
  clearInterval(id);
}
