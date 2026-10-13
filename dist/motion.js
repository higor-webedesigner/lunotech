(() => {
  const root = document.documentElement;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = document.querySelector('.motion-toggle');
  let userPaused = false;
  try { userPaused = localStorage.getItem('luno-motion-paused') === 'true'; } catch {}
  const running = new Set();
  const enabled = () => !preference.matches && !userPaused;
  function play(element, frames, options) {
    if (!enabled() || !element.animate) return;
    const animation = element.animate(frames, options);
    running.add(animation);
    const cleanup = () => running.delete(animation);
    animation.addEventListener('finish', cleanup, {once:true});
    animation.addEventListener('cancel', cleanup, {once:true});
  }
  function syncMotion() {
    root.classList.toggle('motion-paused', !enabled());
    toggle.textContent = enabled() ? 'Pausar animações' : 'Ativar animações';
    toggle.setAttribute('aria-pressed', String(!enabled()));
    toggle.disabled = preference.matches;
    if (preference.matches) toggle.textContent = 'Movimento reduzido';
    if (!enabled()) running.forEach(animation => animation.cancel());
  }
  toggle.addEventListener('click', () => {
    userPaused = !userPaused;
    try { localStorage.setItem('luno-motion-paused', String(userPaused)); } catch {}
    syncMotion();
  });
  preference.addEventListener('change', syncMotion);
  syncMotion();
  const entrance = [
    {opacity:0, transform:'translateY(22px)'},
    {opacity:1, transform:'translateY(0)'}
  ];
  const easing = 'cubic-bezier(.22,1,.36,1)';
  // Animate only as content enters; nothing is hidden while waiting for JS.
  if ('IntersectionObserver' in window) {
    const reveal = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        reveal.unobserve(element);
        const siblings = element.parentElement.matches('.benefit-grid,.steps');
        const delay = siblings ? [...element.parentElement.children].indexOf(element) * 75 : 0;
        play(element, entrance, {duration:750, delay, easing, fill:'backwards'});
      });
    }, {threshold:0.08});
    document.querySelectorAll('.section-heading,.benefit-grid article,.steps article,.contact>div,.contact form').forEach(element=>reveal.observe(element));
    const loops = new IntersectionObserver(entries => entries.forEach(entry => {
      entry.target.classList.toggle('motion-in-view',entry.isIntersecting);
    }));
    document.querySelectorAll('.hero,.ticker').forEach(element=>loops.observe(element));
  }
  const hero = document.querySelector('.hero');
  if (hero.getBoundingClientRect().bottom > 0 && hero.getBoundingClientRect().top < innerHeight) {
    document.querySelectorAll('.hero-copy .eyebrow,.hero h1,.hero .intro,.hero .actions,.hero-note,.hero-visual').forEach((element,index)=>{
      play(element, entrance, {duration:900,delay:index*75,easing,fill:'backwards'});
    });
  }
  document.querySelectorAll('.services details').forEach(detail => {
    detail.addEventListener('toggle', () => {
      if (detail.open) play(detail.querySelector('p'), [{opacity:0,transform:'translateY(-7px)'},{opacity:1,transform:'translateY(0)'}], {duration:300,easing});
    });
  });
  document.addEventListener('visibilitychange',()=>{
    root.classList.toggle('page-inactive',document.hidden);
  });
})();
