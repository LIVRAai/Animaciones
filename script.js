const scenes = [...document.querySelectorAll('.scene')];
const progressBar = document.getElementById('progressBar');
const playBtn = document.getElementById('playBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const speedSelect = document.getElementById('speedSelect');

let current = 0;
let timer = null;
let playing = false;
let speed = 1;

// Duración base sugerida por escena.
// La velocidad seleccionada divide estas duraciones.
const durations = [3600, 3900, 4300, 4200];

function applySpeed(){
  speed = Number(speedSelect.value) || 1;
  document.documentElement.style.setProperty('--anim-speed', speed);

  // Si ya está reproduciendo, reinicia el temporizador de la escena
  // usando la nueva velocidad para que el cambio sea inmediato.
  if(playing){
    clearTimeout(timer);
    scheduleNext();
  }
}

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

function scheduleNext(){
  clearTimeout(timer);
  const sceneDuration = durations[current] / speed;

  timer = setTimeout(() => {
    if(current < scenes.length - 1){
      showScene(current + 1);
      scheduleNext();
    } else {
      stopPlayback();
    }
  }, sceneDuration);
}

function playFromCurrent(){
  playing = true;
  playBtn.textContent = '❚❚ Pausar';
  scheduleNext();
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

speedSelect.addEventListener('change', applySpeed);

document.addEventListener('keydown', (e) => {
  if(e.key === 'ArrowRight') nextBtn.click();
  if(e.key === 'ArrowLeft') prevBtn.click();
  if(e.key === ' ') {
    e.preventDefault();
    playBtn.click();
  }
});

applySpeed();
showScene(0);
