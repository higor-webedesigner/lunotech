const compare = document.querySelector('.compare');
const range = document.querySelector('#compare-range');
const comparisonButtons = document.querySelectorAll('[data-compare]');
function updateComparison(value) {
  const position = Math.max(0, Math.min(100, Number(value)));
  range.value = position;
  compare.style.setProperty('--split', position + '%');
  range.setAttribute('aria-valuetext', position === 100 ? 'Antes completo' : position === 0 ? 'Depois completo' : position + '% antes, ' + (100-position) + '% depois');
  compare.dataset.view = position === 100 ? 'before' : position === 0 ? 'after' : 'split';
  comparisonButtons.forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.compare) === position)));
}
function positionFromPointer(event) {
  const bounds = range.getBoundingClientRect();
  updateComparison(Math.round((event.clientX - bounds.left) / bounds.width * 100));
}
let activePointer = null;
range.addEventListener('pointerdown', event => {
  if (!event.isPrimary || event.button !== 0) return;
  event.preventDefault();
  activePointer = event.pointerId;
  range.focus({preventScroll: true});
  range.setPointerCapture(event.pointerId);
  positionFromPointer(event);
});
range.addEventListener('pointermove', event => {
  if (event.pointerId === activePointer) positionFromPointer(event);
});
function endPointer(event) {
  if (event.pointerId !== activePointer) return;
  activePointer = null;
  if (range.hasPointerCapture(event.pointerId)) range.releasePointerCapture(event.pointerId);
}
range.addEventListener('pointerup', endPointer);
range.addEventListener('pointercancel', endPointer);
range.addEventListener('lostpointercapture', () => { activePointer = null; });
range.addEventListener('input', () => updateComparison(range.value));
comparisonButtons.forEach(button => button.addEventListener('click', () => updateComparison(button.dataset.compare)));
updateComparison(range.value);
document.querySelector('#brief-form').addEventListener('submit',e=>{e.preventDefault();const data=new FormData(e.currentTarget);const text=`Olá, Luno Tech! Gostaria de conversar sobre um projeto.\n\nNome: ${data.get('nome')}\nEmpresa: ${data.get('empresa')}\nProjeto: ${data.get('tipo')}\nIdeia: ${data.get('mensagem')||'Quero orientação para definir o projeto.'}`;window.open('https://wa.me/5541988361393?text='+encodeURIComponent(text),'_blank','noopener');document.querySelector('#brief-text').value=text;document.querySelector('#brief-result').hidden=false;document.querySelector('#brief-result').scrollIntoView({behavior:'smooth',block:'nearest'});});document.querySelector('#copy-brief').addEventListener('click',async()=>{const field=document.querySelector('#brief-text');try{await navigator.clipboard.writeText(field.value);document.querySelector('#copy-status').textContent='Resumo copiado!';}catch{field.focus();field.select();document.querySelector('#copy-status').textContent='Selecione e copie o texto.'}});

