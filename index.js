const title = document.querySelector('#level-title');
const startBtn = document.querySelector('#startBtn');
const mobileTitle = document.querySelector('#mobile-title');
const btns = document.querySelectorAll('.button');
var randomNum;
var stage = 1;
var step = 1;
var answer = [];
var isPlaying = false;
const defaultTitle = title.innerText;

//처음 게임 시작
document.addEventListener('keypress', (event) => {
  if (event.key === 'a') initializer();
});

startBtn.addEventListener('click', initializer);

// window.onresize = () => {
//   if (window.innerWidth < 993) {
//     startBtn.style.display = 'block';
//     defaultTitle.style.display = 'block';
//   } else {
//     startBtn.style.display = 'none';
//     mobileTitle.style.display = 'none';
//   }
// };

function initializer() {
  if (isPlaying === false) {
    //버튼클릭 사운드 이벤트 추가
    btnsOnClickPlaySound();
    // //버튼클릭 답체크 이벤트 추가
    btnsOnClickCheckAnswer();

    isPlaying = true;
    title.innerText = 'Level ' + stage;
    input = [];
    playGame();

    startBtn.style.display = 'none';
    mobileTitle.style.display = 'none';
  }
}

//버튼 클릭시 해당 오디오 재생
function btnsOnClickPlaySound() {
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', playBtnAudio);
  }
}

//버튼 클릭시 답 제출 및 채점
function btnsOnClickCheckAnswer() {
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', checkAnswer);
  }
}

//게임 시작시 랜덤 숫자 생성기
function chooseRandomNum() {
  randomNum = Math.floor(Math.random() * 4);
}

//버튼 켜기
function lightBtn() {
  btns[randomNum].classList.toggle('pressed');
}

//버튼 끄기(1초후)
function offBtn(x, num) {
  setTimeout(() => {
    btns[num].classList.toggle('pressed');
  }, 1000 * x);
}

//버튼 오디오 재생
function playBtnAudio(num) {
  if (this.id === 'green' || num === 0) new Audio('sounds/green.mp3').play();
  else if (this.id === 'red' || num === 1) new Audio('sounds/red.mp3').play();
  else if (this.id === 'yellow' || num === 2) new Audio('sounds/yellow.mp3').play();
  else new Audio('sounds/blue.mp3').play();
}

//성공 오디오 재생
function playSuccessAudio() {
  new Audio('sounds/success.mp3').play();
}

//실패 오디오 재생
function playWrongAudio() {
  new Audio('sounds/wrong.mp3').play();
}

//정답 저장
function answerPush() {
  switch (randomNum) {
    case 0: {
      answer.push('green');
      break;
    }
    case 1: {
      answer.push('red');
      break;
    }
    case 2: {
      answer.push('yellow');
      break;
    }
    case 3: {
      answer.push('blue');
      break;
    }
  }
}

//채점
function checkAnswer() {
  if (this.id === answer[0]) {
    answer.shift();
    if (answer.length === 0) {
      moveToNextStage();
      return true;
    }
  } else {
    failToClear();
    return false;
  }
}

//다음 스테이지 이동
function moveToNextStage() {
  const successPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Success!');
    }, 1000);
  });

  successPromise
    .then(() => {
      playSuccessAudio();
      stage++;
      step = 1;
      title.innerText = 'Level ' + stage;
      playGame();
    })
    .catch(() => {
      alert('다음스테이지로 이동중 에러 발생!!');
    });
}

//스테이지 클리어 실패
function failToClear() {
  playWrongAudio();
  stage = 1;
  answer = [];
  title.innerText = defaultTitle;
  isPlaying = false;
  for (var i = 0; i < btns.length; i++) {
    btns[i].removeEventListener('click', playBtnAudio);
    btns[i].removeEventListener('click', checkAnswer);
  }
  alert('오답입니다!');
  if (window.innerWidth < 993) {
    startBtn.style.display = 'block';
    mobileTitle.style.display = 'block';
  }
}

//게임진행
function playGame() {
  setTimeout(function () {
    chooseRandomNum();

    console.log('랜덤 넘버는 : ' + randomNum);

    playBtnAudio(randomNum);

    lightBtn();

    offBtn(1, randomNum);

    answerPush();

    step++;

    if (step <= stage) {
      playGame();
    }
  }, 1500);
}
