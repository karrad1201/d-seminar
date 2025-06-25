function createElement(block) {
  switch (block.type) {
    case 'header': {
      const h1 = document.createElement('h1');
      h1.textContent = block.text;
      return h1;
    }
    case 'text': {
      const p = document.createElement('p');
      block.text.split('\n').forEach((line, i) => {
        if (i > 0) p.appendChild(document.createElement('br'));
        p.appendChild(document.createTextNode(line));
      });
      return p;
    }
    case 'list-title': {
      const p = document.createElement('p');
      p.className = 'bold';
      p.textContent = block.text;
      return p;
    }
    case 'list': {
      const ul = document.createElement('ul');
      block.items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
      });
      return ul;
    }
    case 'image': {
      const img = document.createElement('img');
      img.src = block.src;
      img.alt = block.alt;
      return img;
    }
    case 'footer': {
      const div = document.createElement('div');
      div.className = 'footer';
      block.text.split('\n').forEach((line, i) => {
        if (i > 0) div.appendChild(document.createElement('br'));
        div.appendChild(document.createTextNode(line));
      });
      return div;
    }
    default:
      return document.createTextNode('');
  }
}

function renderApp() {
  const app = document.getElementById('app');
  const container = document.createElement('div');
  container.className = 'container fade-in';
  content.forEach(block => {
    container.appendChild(createElement(block));
  });
  app.appendChild(container);
}

// Анимированные размытые кружки на фоне
const colors = [
  'rgba(120, 60, 180, 0.52)',   // насыщенный фиолетовый
  'rgba(255, 90, 160, 0.48)',   // ярко-розовый
  'rgba(160, 80, 220, 0.50)',   // сиреневый
  'rgba(80, 140, 220, 0.45)',   // голубой
  'rgba(255, 120, 180, 0.50)',  // розово-сиреневый
  'rgba(140, 60, 200, 0.55)',   // тёмно-сиреневый
  'rgba(255, 170, 80, 0.48)'    // персиковый
];
const circles = [];
const N = 7;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createCircles() {
  const bg = document.querySelector('.bg-anim');
  for (let i = 0; i < N; i++) {
    const c = document.createElement('div');
    c.className = 'bg-circle';
    const size = random(120, 260);
    c.style.width = c.style.height = size + 'px';
    c.style.background = colors[i % colors.length];
    c.style.left = random(0, 80) + 'vw';
    c.style.top = random(0, 80) + 'vh';
    bg.appendChild(c);
    circles.push({
      el: c,
      baseX: parseFloat(c.style.left),
      baseY: parseFloat(c.style.top),
      r: random(10, 30),
      speed: random(0.3, 0.7),
      phase: random(0, Math.PI * 2),
      axis: Math.random() > 0.5 ? 'x' : 'y'
    });
  }
}

function animateCircles(ts) {
  circles.forEach((c, i) => {
    const t = ts * 0.0002 * c.speed + c.phase;
    const dx = c.axis === 'x' ? Math.sin(t) * c.r : 0;
    const dy = c.axis === 'y' ? Math.cos(t) * c.r : 0;
    c.el.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  requestAnimationFrame(animateCircles);
}

document.addEventListener('DOMContentLoaded', () => {
  createCircles();
  requestAnimationFrame(animateCircles);

  // Футер с Телеграм
  const footerText = 'Присоединяйтесь!<br>Ждём Вас в ';
  const tgLink = document.createElement('a');
  tgLink.href = 'https://t.me/pro_pedagogi';
  tgLink.target = '_blank';
  tgLink.textContent = 'Телеграм';
  tgLink.style.fontWeight = 'bold';

  const footer = document.querySelector('.footer');
  footer.innerHTML = '';
  footer.innerHTML = `<span class="bold">${footerText}</span>`;
  footer.appendChild(tgLink);
});

document.addEventListener('DOMContentLoaded', renderApp); 