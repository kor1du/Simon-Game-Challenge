const title = document.querySelector('#level-title');
const btns = document.querySelectorAll('.btn');
var randomNum;
var stage = 1;
var step = 1;
var answer = [];
var isPlaying = false;
const defaultTitle = title.innerText;

//처음 게임 시작
document.addEventListener('keypress', (event) => {
  if (event.key === 'a' && isPlaying === false) {
    //버튼클릭사운드 이벤트 추가
    btnsOnClickPlaySound();
    //버튼클릭답체크 이벤트 추가
    btnsOnClickCheckAnswer();
    console.log('a키가 눌렸습니다!');
    isPlaying = true;
    title.innerText = 'Level ' + stage;
    input = [];
    playGame();
  }
});

//버튼 클릭시 해당 오디오 재생
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

//버튼 클릭시 답 제출 및 채점
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

//게임 시작시 랜덤 숫자 생성기
function chooseRandomNum() {
  randomNum = Math.floor(Math.random() * 4);
}

//버튼 켜기
function lightBtn() {
  btns[randomNum].classList.toggle('pressed');
}

//버튼 끄기(1초후)
function offBtn(x, rNum) {
  setTimeout(() => {
    btns[rNum].classList.toggle('pressed');
  }, 1000 * x);
}

//버튼 오디오 재생
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
  answer.push(randomNum);

  // console.log(randomNum);
}

//채점
function checkAnswer(num) {
  if (num === answer[0]) {
    console.log('정답입니다.');
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
    .then((message) => {
      console.log(message);
      playSuccessAudio();
      stage++;
      step = 1;
      console.log('현재 stage는 ' + stage + '입니다!');
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
  console.log('오답입니다.');
  stage = 1;
  answer = [];
  title.innerText = defaultTitle;
  isPlaying = false;
}

//게임진행
function playGame() {
  setTimeout(function () {
    chooseRandomNum();

    lightBtn();

    playBtnAudio(randomNum);

    offBtn(1, randomNum);

    answerPush();

    step++;

    if (step <= stage) {
      playGame();
    }
  }, 1500);
}
