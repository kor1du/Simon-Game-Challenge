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

//창 크기 감지(모바일)
window.onresize = () => {
  if (window.innerWidth > 992) {
    startBtn.style.display = 'none';
    mobileTitle.style.display = 'none';
  } else {
    startBtn.style.display = 'block';
    mobileTitle.style.display = 'block';
  }
};

//처음 게임 시작
//a키 입력 감지
document.addEventListener('keypress', (event) => {
  if (event.key === 'a') initializer();
});

//버튼 클릭(모바일)
startBtn.addEventListener('click', initializer);

function checkColor(color) {
  if (color.id === 'green') {
    return btns[0];
  } else if (color.id === 'red') {
    return btns[1];
  } else if (color.id === 'yellow') {
    return btns[2];
  } else if (color.id === 'blue') {
    return btns[3];
  } else return btns[randomNum];
}

//게임 초기화
function initializer() {
  if (isPlaying === false) {
    //버튼클릭 사운드 이벤트 추가
    btnsOnClick();

    isPlaying = true;
    title.innerText = 'Level ' + stage;
    input = [];
    playGame();

    startBtn.style.display = 'none';
    mobileTitle.style.display = 'none';
  }
}

//게임진행
function playGame() {
  setTimeout(function () {
    chooseRandomNum();

    console.log('랜덤 넘버는 : ' + randomNum);

    playBtnAudio(randomNum);

    lightBtn();

    offBtn();

    answerPush();

    step++;

    if (step <= stage) {
      playGame();
    }
  }, 1500);
}

//버튼 클릭시 이벤트 추가
function btnsOnClick() {
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', playBtnAudio); //버튼 클릭시 사운드 재생
    btns[i].addEventListener('click', lightBtn); //버튼 클릭시 불 켜기
    btns[i].addEventListener('click', offBtn); // 버튼 클릭시 불 끄기
    btns[i].addEventListener('click', checkAnswer); //버튼 클릭시 정답 확인
  }
}

//버튼 오디오 재생
function playBtnAudio(num) {
  if (this.id === 'green' || num === 0) new Audio('sounds/green.mp3').play();
  else if (this.id === 'red' || num === 1) new Audio('sounds/red.mp3').play();
  else if (this.id === 'yellow' || num === 2) new Audio('sounds/yellow.mp3').play();
  else new Audio('sounds/blue.mp3').play();
}

//정답 체크
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

//게임 시작시 랜덤 숫자 생성기
function chooseRandomNum() {
  randomNum = Math.floor(Math.random() * 4);
}

//버튼 켜기
function lightBtn() {
  checkColor(this).classList.toggle('pressed');
}

//버튼 끄기(1초후)
function offBtn() {
  setTimeout(() => {
    checkColor(this).classList.toggle('pressed');
  }, 1000);
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
