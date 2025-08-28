
// Menu mobile
const btn = document.querySelector('.menu-btn');
const nav = document.getElementById('menu');
btn?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  btn.setAttribute('aria-expanded', String(isOpen));
});

// Ano no footer
document.getElementById('ano').textContent = new Date().getFullYear();

// Form - resposta fake
const form = document.getElementById('form-contato');
const msg = document.getElementById('form-msg');
form?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const data = new FormData(form);
  const nome = data.get('nome') || 'Tudo certo';
  msg.textContent = `Obrigado, ${nome}! Recebi sua mensagem e vou te retornar em breve.`;
  form.reset();
});

// GitHub repos dinâmicos
async function loadRepos(){
  const el = document.getElementById('repos');
  if(!el) return;
  el.innerHTML = '<p class="muted">Carregando repositórios...</p>';
  try{
    const res = await fetch('https://api.github.com/users/kafu14/repos?sort=updated&per_page=12');
    if(!res.ok) throw new Error('Falha ao consultar GitHub');
    const repos = await res.json();

    const filtered = repos.filter(r => !r.fork); // esconder forks
    if(filtered.length === 0){
      el.innerHTML = '<p class="muted">Nenhum repositório público encontrado.</p>';
      return;
    }

    el.innerHTML = filtered.map(r => `
      <article class="card">
        <div class="card-body">
          <h3>${r.name}</h3>
          <p>${(r.description || 'Sem descrição.').substring(0,140)}</p>
          <p class="muted">★ ${r.stargazers_count} • Forks ${r.forks_count} • ${(r.language || '—')}</p>
          <div class="card-buttons">
            <a class="btn primary" href="${r.html_url}" target="_blank" rel="noopener">Abrir repositório</a>
            ${r.homepage ? `<a class="btn ghost" href="${r.homepage}" target="_blank" rel="noopener">Demo</a>` : ''}
          </div>
        </div>
      </article>
    `).join('');

  }catch(err){
    el.innerHTML = '<p class="muted">Não foi possível carregar os repositórios agora. Veja em <a href="https://github.com/kafu14" target="_blank" rel="noopener">github.com/kafu14</a>.</p>';
  }
}
loadRepos();

// Smooth scroll básico
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const target = document.querySelector(id);
    if(target){
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
