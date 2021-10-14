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

const setBodyColor = () => {
  document.body.style.backgroundColor = colors[0];
};

const clearBodyColor = () => {
  document.body.style.backgroundColor = '';
};

const generateNonRepeatBodyBgColor = () => {
  // let newIndex = randomIntegerFromInterval(0, colors.length - 1);
  // while (colorsIndex === newIndex) {
  //   newIndex = randomIntegerFromInterval(0, colors.length - 1);
  // }
  // colorsIndex = newIndex;
  // document.body.style.backgroundColor = colors[newIndex];

  const colorsCopy = [...colors];
  colorsCopy.splice(colorsIndex, 1);
  const randomIndex = randomIntegerFromInterval(0, colorsCopy.length - 1);
  const switchColor = colorsCopy[randomIndex];
  document.body.style.backgroundColor = switchColor;
  colorsIndex = colors.indexOf(switchColor);
};

const toggleDisabled = () => {
  refs.startBtn.disabled = refs.startBtn.disabled ? false : true;
  refs.stopBtn.disabled = refs.startBtn.disabled ? false : true;
};

const onStartBtnClick = () => {
  if (!colors.length) {
    refs.startBtn.disabled = true;
    return;
  }
  if (colors.length === 1) {
    setBodyColor();
    toggleDisabled();
    return;
  }
  if (!setIntervalId) {
    generateNonRepeatBodyBgColor();
    setIntervalId = setInterval(() => {
      generateNonRepeatBodyBgColor();
    }, 1000);
    toggleDisabled();
  }
};

const onStopBtnClick = () => {
  if (colors.length === 1) {
    clearBodyColor();
    toggleDisabled();
    return;
  }
  if (setIntervalId) {
    clearInterval(setIntervalId);
    setIntervalId = null;
    toggleDisabled();
  }
};

refs.stopBtn.disabled = true;
refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);
