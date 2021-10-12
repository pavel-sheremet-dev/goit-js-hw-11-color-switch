const colors = [
  '#FFFFFF',
  '#2196F3',
  '#4CAF50',
  '#FF9800',
  '#009688',
  '#795548',
];

const refs = {
  startBtn: document.querySelector('button[data-action="start"]'),
  stopBtn: document.querySelector('button[data-action="stop"]'),
};

let setIntervalId = null;
let colorsIndex = 0;

const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateNonRepeatBodyBgColor = () => {
  const colorsCopy = [...colors];
  colorsCopy.splice(colorsIndex, 1);
  const randomIndex = randomIntegerFromInterval(0, colorsCopy.length - 1);
  const switchColor = colorsCopy[randomIndex];
  document.body.style.backgroundColor = switchColor;
  colorsIndex = colors.indexOf(switchColor);
};

const onStartBtnClick = () => {
  if (!setIntervalId) {
    generateNonRepeatBodyBgColor();
    setIntervalId = setInterval(() => {
      generateNonRepeatBodyBgColor();
    }, 1000);

    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
  }
};

const onStopBtnClick = () => {
  if (setIntervalId) {
    clearInterval(setIntervalId);
    setIntervalId = null;

    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
  }
};

refs.stopBtn.disabled = true;
refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);
