const scenes = [...document.querySelectorAll('.scene')];
const progressBar = document.getElementById('progressBar');
const playBtn = document.getElementById('playBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

let current = 0;
let timer = null;
let playing = false;

// Duración sugerida por escena para un Short.
// Puedes modificar estos valores libremente.
const durations = [3600, 3900, 4300, 4200];

function showScene(index){
  current = (index + scenes.length) % scenes.length;

  scenes.forEach((scene, i) => {
    scene.classList.toggle('active', i === current);
  });

  progressBar.style.width = `${((current + 1) / scenes.length) * 100}%`;
}

function stopPlayback(){
  clearTimeout(timer);
  timer = null;
  playing = false;
  playBtn.textContent = '▶ Reproducir';
}

function playFromCurrent(){
  playing = true;
  playBtn.textContent = '❚❚ Pausar';

  clearTimeout(timer);
  timer = setTimeout(() => {
    if(current < scenes.length - 1){
      showScene(current + 1);
      playFromCurrent();
    } else {
      stopPlayback();
    }
  }, durations[current]);
}

playBtn.addEventListener('click', () => {
  if(playing){
    stopPlayback();
  } else {
    if(current === scenes.length - 1){
      showScene(0);
    }
    playFromCurrent();
  }
});

nextBtn.addEventListener('click', () => {
  stopPlayback();
  showScene(current + 1);
});

prevBtn.addEventListener('click', () => {
  stopPlayback();
  showScene(current - 1);
});

document.addEventListener('keydown', (e) => {
  if(e.key === 'ArrowRight') nextBtn.click();
  if(e.key === 'ArrowLeft') prevBtn.click();
  if(e.key === ' ') {
    e.preventDefault();
    playBtn.click();
  }
});

showScene(0);
