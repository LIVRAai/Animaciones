
const beats = [...document.querySelectorAll('.beat')];
const progressBar = document.getElementById('progressBar');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const hideBtn = document.getElementById('hideBtn');
const showBtn = document.getElementById('showBtn');
const speedSelect = document.getElementById('speedSelect');
const stage = document.getElementById('stage');

let current = 0;
let playing = false;
let timer = null;
let speed = 1;

// Aproximadamente 21 segundos a 1×.
const durations = [5200, 5200, 5200, 5600];

function showBeat(index){
  current = Math.max(0, Math.min(index, beats.length - 1));

  beats.forEach((beat, i) => {
    beat.classList.toggle('active', i === current);
  });

  progressBar.style.width = `${((current + 1) / beats.length) * 100}%`;
}

function stop(){
  playing = false;
  clearTimeout(timer);
  timer = null;
  playBtn.textContent = '▶ Reproducir';
}

function schedule(){
  clearTimeout(timer);
  timer = setTimeout(() => {
    if(current < beats.length - 1){
      showBeat(current + 1);
      schedule();
    }else{
      stop();
    }
  }, durations[current] / speed);
}

function play(){
  playing = true;
  playBtn.textContent = '❚❚ Pausar';
  schedule();
}

function updateSpeed(){
  speed = Number(speedSelect.value) || 1;
  document.documentElement.style.setProperty('--speed', speed);

  if(playing){
    clearTimeout(timer);
    schedule();
  }
}

playBtn.addEventListener('click', () => {
  if(playing){
    stop();
    return;
  }

  if(current === beats.length - 1){
    showBeat(0);
  }
  play();
});

prevBtn.addEventListener('click', () => {
  stop();
  showBeat(current - 1);
});

nextBtn.addEventListener('click', () => {
  stop();
  showBeat(current + 1);
});

speedSelect.addEventListener('change', updateSpeed);

hideBtn.addEventListener('click', () => {
  stage.classList.add('clean');
  showBtn.classList.remove('hidden');
});

showBtn.addEventListener('click', () => {
  stage.classList.remove('clean');
  showBtn.classList.add('hidden');
});

document.addEventListener('keydown', (e) => {
  if(e.key === 'ArrowRight') nextBtn.click();
  if(e.key === 'ArrowLeft') prevBtn.click();
  if(e.key === ' '){
    e.preventDefault();
    playBtn.click();
  }
  if(e.key.toLowerCase() === 'h'){
    if(stage.classList.contains('clean')){
      showBtn.click();
    }else{
      hideBtn.click();
    }
  }
});

updateSpeed();
showBeat(0);
