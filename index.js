const title = document.querySelector('#level-title');
const btns = document.querySelectorAll('.btn');
var randomNum;
var stage = 1;
var answer = [];

// StartGame

//1회만 실행
//버튼클릭사운드 이벤트 추가
btnsOnClickPlaySound();
//버튼클릭답체크 이벤트 추가
btnsOnClickCheckAnswer();

document.addEventListener('keypress', (event) => {
  if (event.key === 'a') {
    title.innerText = 'Level ' + stage;
    input = [];
    playGame();
  }
});

function btnsOnClickPlaySound() {
  btns[0].addEventListener('click', () => {
    playBtnAudio(0);
  });

  btns[1].addEventListener('click', () => {
    playBtnAudio(1);
  });

  btns[2].addEventListener('click', () => {
    playBtnAudio(2);
  });

  btns[3].addEventListener('click', () => {
    playBtnAudio(3);
  });
}

function btnsOnClickCheckAnswer() {
  btns[0].addEventListener('click', () => {
    checkAnswer(0);
  });

  btns[1].addEventListener('click', () => {
    checkAnswer(1);
  });

  btns[2].addEventListener('click', () => {
    checkAnswer(2);
  });

  btns[3].addEventListener('click', () => {
    checkAnswer(3);
  });
}

function chooseRandomNum() {
  randomNum = Math.floor(Math.random() * 4);
}

function lightBtn() {
  btns[randomNum].classList.toggle('pressed');
}

function offBtn() {
  setTimeout(() => {
    btns[randomNum].classList.toggle('pressed');
  }, 1000);
}

function playBtnAudio(num) {
  switch (num) {
    case 0: {
      new Audio('sounds/green.mp3').play();
      break;
    }
    case 1: {
      new Audio('sounds/red.mp3').play();
      break;
    }
    case 2: {
      new Audio('sounds/yellow.mp3').play();
      break;
    }
    case 3: {
      new Audio('sounds/blue.mp3').play();
      break;
    }
    default: {
      console.log('playBtnAudio ERR!!');
      break;
    }
  }
}

function playSuccessAudio() {
  new Audio('sounds/success.mp3').play();
}

function playWrongAudio() {
  new Audio('sounds/wrong.mp3').play();
}

function answerPush() {
  answer.push(randomNum);

  console.log('현재 저장된 정답들 : ' + answer);
}

function checkAnswer(num) {
  if (num === answer[0]) {
    console.log('정답입니다.');
    answer.shift();
    if (answer.length === 0) {
      console.log('스테이지를 증가시킵니다.');
      stage++;
      console.log('현재 스테이지는 : ' + stage + '층입니다!');
    }
  } else {
    console.log('오답입니다.');
    console.log('스테이지를 초기화시킵니다!');
    stage = 1;
    playWrongAudio();
    console.log('현재 스테이지는 : ' + stage + '층입니다!');
  }
}

//게임 진행
function playGame() {
  chooseRandomNum();

  lightBtn();

  offBtn();

  playBtnAudio(randomNum);

  answerPush();
}
