/* "Ask Marlon" — predefined-answer portfolio assistant (no backend, no dependencies). */
(function () {
  'use strict';

  const EMAIL = 'sinadjanbit2@gmail.com';
  const LINKEDIN = 'https://www.linkedin.com/in/marlon-sinadjan-057580258';

  // Answers use {B} for the site root so links work from / and /projects/.
  const INTENTS = [
    {
      id: 'intro', q: 'What do you do?',
      keywords: ['who are you', 'who is marlon', 'about you', 'about yourself', 'introduce', 'what do you do', 'tell me about you', 'yourself', 'hello', 'hi', 'hey', 'role', 'job', 'title', 'summary', 'overview'],
      answer: "Hi! I'm <b>Marlon Sinadjan</b>, a Software Developer from Cebu, Philippines 👋<br><br>I engineer <b>commerce systems</b>: WooCommerce platforms, Laravel business apps, retail integrations, and the cloud servers they run on. On the side, I build my own SaaS and mobile products.",
      followUps: ['experience', 'skills', 'projects']
    },
    {
      id: 'experience', q: 'Your experience?',
      keywords: ['experience', 'work history', 'career', 'background', 'company', 'employer', 'metro retail', 'current job', 'where do you work', 'how long', 'years', 'worked', 'position'],
      answer: "I work at <b>Metro Retail Stores Group Inc.</b>:<br>• <b>Software Developer</b>, Aug 2024 – present: ShopMetro, Marengems and an internal Captive Portal CRM.<br>• <b>Quality Assurance &amp; Technical Writer</b>, Mar 2023 – Jul 2024: testing, UAT and technical documentation.<br><br>Starting in QA gave me a sharp debugging mindset that I still use in development.",
      followUps: ['shopmetro', 'qa', 'resume']
    },
    {
      id: 'skills', q: 'Tech stack?',
      keywords: ['skill', 'stack', 'tech', 'technology', 'technologies', 'language', 'programming', 'framework', 'tools', 'proficient', 'expertise', 'php', 'java', 'javascript', 'mysql', 'vue', 'nextjs', 'next js', 'supabase'],
      answer: "My main stack:<br>• <b>Languages:</b> PHP, JavaScript, Java, HTML/CSS, MySQL<br>• <b>Frameworks:</b> Laravel, Vue.js, Next.js, Flutter, Supabase<br>• <b>Commerce:</b> WooCommerce, WordPress Multisite<br>• <b>Infra:</b> Linux, OCI, AWS, Nginx, PHP-FPM, Redis, Cloudflare",
      followUps: ['woocommerce', 'laravel', 'cloud']
    },
    {
      id: 'woocommerce', q: 'WooCommerce experience?',
      keywords: ['!woocommerce', '!woo', 'wordpress', 'multisite', '!ecommerce', 'e commerce', 'online store', 'plugin', 'plugins', 'storefront', 'shop', 'checkout', 'theme'],
      answer: "WooCommerce is my strongest area. On <b>ShopMetro</b>, I work on a WordPress Multisite network serving four retail storefronts:<br>• Custom plugins for checkout, account, coupon and product-pricing behavior<br>• Oracle RMS → WooCommerce inventory sync automation<br>• Multisite administration, SEO and production maintenance",
      followUps: ['shopmetro', 'integrations', 'marengems']
    },
    {
      id: 'laravel', q: 'Do you know Laravel?',
      keywords: ['!laravel', 'backend', 'back end', 'api', 'apis', 'rest', 'oms', 'order management', 'server side', 'php framework'],
      answer: "Yes, Laravel is my go-to backend:<br>• <b>Marengems OMS</b>: fixes, usability, performance and security hardening, plus its WooCommerce REST integration<br>• <b>Captive Portal CRM</b>: Laravel backend with a Vue.js frontend<br>• <b>Pairnest</b>: the Laravel REST API behind my Flutter app",
      followUps: ['marengems', 'crm', 'pairnest']
    },
    {
      id: 'cloud', q: 'Cloud & DevOps?',
      keywords: ['cloud', 'devops', 'oci', 'oracle cloud', 'aws', 'amazon', 'server', 'linux', 'nginx', 'apache', 'deploy', 'deployment', 'hosting', 'migration', 'ssl', 'infrastructure', 'redis', 'ssh', 'cloudflare'],
      answer: "I handle the delivery side too:<br>• Deploying and configuring Linux servers (Nginx, Apache, PHP-FPM, OPcache) over SSH<br>• The <b>AWS → Oracle Cloud (OCI)</b> migration for the Marengems OMS<br>• SSL through an OCI Load Balancer for the Marengems storefront<br>• Log analysis and debugging in production",
      followUps: ['marengems', 'skills', 'available']
    },
    {
      id: 'integrations', q: 'What integrations have you built?',
      keywords: ['integration', 'integrate', 'sync', 'synchronization', 'rms', 'oracle rms', 'inventory', 'foodpanda', 'grab', 'sftp', 'retainful', 'automation', 'automate', 'batch', 'cron'],
      answer: "Connecting systems is a big part of my work:<br>• <b>Oracle RMS → WooCommerce</b> product and inventory sync<br>• FoodPanda and Grab delivery-platform support<br>• SFTP-based scheduled retail data jobs<br>• <b>Retainful</b> for marketing workflows<br>• WooCommerce ↔ Laravel OMS over REST",
      followUps: ['shopmetro', 'marengems', 'laravel']
    },
    {
      id: 'seo', q: 'Do you do SEO?',
      keywords: ['seo', 'search engine', 'google', 'search console', 'rank math', 'ranking', 'sitemap', 'metadata', 'indexing'],
      answer: "Yes, mostly technical and on-page SEO:<br>• SEO improvements on the ShopMetro commerce platform<br>• LayerFlow's public site: metadata, sitemaps, Google Search Console setup and indexing",
      followUps: ['layerflow', 'shopmetro']
    },
    {
      id: 'mobile', q: 'Mobile app experience?',
      keywords: ['mobile', 'flutter', 'android', 'ios', 'app store', 'play store', 'google play', 'apple', 'app', 'apps', 'dart'],
      answer: "Two sides:<br>• <b>Building:</b> Pairnest, my couples budgeting app in Flutter with a Laravel API (in development)<br>• <b>Publishing:</b> I manage ShopMetro's app releases on Google Play and the Apple App Store. That's release management only; I didn't develop that app.",
      followUps: ['pairnest', 'projects']
    },
    {
      id: 'qa', q: 'Your QA background?',
      keywords: ['qa', 'quality assurance', 'testing', 'test', 'tester', 'uat', 'regression', 'bug', 'bugs', 'documentation', 'technical writer', 'manual testing'],
      answer: "Before development, I was a <b>QA &amp; Technical Writer</b> (Mar 2023 – Jul 2024): manual, regression and UAT testing, test plans with developers, and technical docs, user manuals and API references.<br><br>It's why I care about edge cases and clear documentation.",
      followUps: ['experience', 'skills']
    },
    {
      id: 'projects', q: 'Show me your projects',
      keywords: ['project', 'projects', 'portfolio', 'work samples', 'case study', 'case studies', 'built', 'build', 'show me', 'examples', 'products'],
      answer: "Here's what I've worked on:<br><b>Company</b><br>• <a href=\"{B}projects/shopmetro.html\">ShopMetro</a>: multi-store WooCommerce<br>• <a href=\"{B}projects/marengems.html\">Marengems</a>: storefront + Laravel OMS<br>• <a href=\"{B}projects/captive-portal-crm.html\">Captive Portal CRM</a>: Vue + Laravel<br><b>Personal</b><br>• <a href=\"{B}projects/layerflow.html\">LayerFlow</a>: farm management SaaS<br>• <a href=\"{B}projects/pairnest.html\">Pairnest</a>: budgeting app",
      followUps: ['shopmetro', 'layerflow', 'pairnest']
    },
    {
      id: 'shopmetro', q: 'Tell me about ShopMetro',
      keywords: ['!shopmetro', '!shop metro', 'metro', 'supermarket', 'department store', 'multi store', 'retail platform'],
      answer: "<b>ShopMetro</b> is an enterprise retail platform: one WordPress Multisite + WooCommerce setup powering four storefronts (Supermarket, Department Store, Metro EGC, Food Avenue). I build custom plugins, RMS inventory automation and integrations, and handle SEO, app releases and production on OCI.<br><a href=\"{B}projects/shopmetro.html\">View case study →</a>",
      followUps: ['integrations', 'woocommerce', 'marengems']
    },
    {
      id: 'marengems', q: 'Tell me about Marengems',
      keywords: ['!marengems', 'maren', 'gems', 'jewelry', 'jewellery'],
      answer: "<b>Marengems</b> connects a WooCommerce storefront to a <b>Laravel Order Management System</b> over REST APIs. I maintained the OMS and its integration, took part in the AWS → OCI migration, and deployed the storefront with SSL on an OCI Load Balancer.<br><a href=\"{B}projects/marengems.html\">View case study →</a>",
      followUps: ['laravel', 'cloud', 'crm']
    },
    {
      id: 'crm', q: 'What is the Captive Portal CRM?',
      keywords: ['!captive portal', '!crm', 'wifi', 'wi fi', 'customer data', 'marketing', 'campaign', 'segmentation'],
      answer: "An internal Metro Retail system (in development) for managing captive-portal customer data and marketing workflows. I'm building the <b>Vue.js</b> frontend and <b>Laravel</b> backend, and supporting the <b>Retainful</b> integration. Customer data is intentionally not shown.<br><a href=\"{B}projects/captive-portal-crm.html\">View case study →</a>",
      followUps: ['laravel', 'projects']
    },
    {
      id: 'layerflow', q: 'Tell me about LayerFlow',
      keywords: ['!layerflow', '!layer flow', 'poultry', 'farm', 'farmer', 'egg', 'eggs', 'chicken', 'saas'],
      answer: "<b>LayerFlow</b> is my own SaaS for Philippine layer (egg) farmers: flock, production, feed, sales and reports. I built it solo from idea to launch with <b>Next.js</b>, <b>Supabase</b> and <b>Cloudflare</b>, plus the SEO. It's live at <a href=\"https://getlayerflow.com\" target=\"_blank\" rel=\"noopener\">getlayerflow.com</a>.<br><a href=\"{B}projects/layerflow.html\">View case study →</a>",
      followUps: ['pairnest', 'seo', 'available']
    },
    {
      id: 'pairnest', q: 'Tell me about Pairnest',
      keywords: ['!pairnest', '!pair nest', 'budget', 'budgeting', 'couple', 'couples', 'expense', 'finance', 'money'],
      answer: "<b>Pairnest</b> is a budgeting and expense-tracking app for couples that I'm building: shared budgets, expenses and financial goals. It's a <b>Flutter</b> app (iOS &amp; Android) with a <b>Laravel</b> REST backend.<br><a href=\"{B}projects/pairnest.html\">View case study →</a>",
      followUps: ['mobile', 'layerflow']
    },
    {
      id: 'education', q: 'Your education?',
      keywords: ['education', 'school', 'college', 'university', 'degree', 'study', 'studied', 'graduate', 'ctu', 'diploma', 'course'],
      answer: "• <b>Bachelor in Industrial Technology</b>, major in Electronics Technology, Cebu Technological University (2018–2022)<br>• <b>Senior High School, STEM</b>, University of Cebu",
      followUps: ['experience', 'resume']
    },
    {
      id: 'location', q: 'Where are you based?',
      keywords: ['where', 'location', 'based', 'live', 'located', 'cebu', 'philippines', 'country', 'city', 'timezone', 'time zone', '!remote', 'onsite', 'relocate'],
      answer: "I'm based in <b>Cebu City, Philippines</b> (UTC+8). For remote or on-site arrangements, let's talk: <a href=\"mailto:" + EMAIL + "\">email me</a>.",
      followUps: ['available', 'contact']
    },
    {
      id: 'available', q: 'Are you available?',
      keywords: ['available', 'availability', 'hire', 'hiring', 'freelance', 'freelancer', 'open to', 'opportunity', 'opportunities', 'job offer', 'collaborate', 'collaboration', 'work with you', 'work together', 'rate', 'salary', 'contract', 'part time', 'full time'],
      answer: "Yes! I'm <b>open to software development opportunities</b>, collaborations and freelance projects. Tell me what you're building and I'll get back to you:<br>• <a href=\"mailto:" + EMAIL + "\">" + EMAIL + "</a><br>• <a href=\"" + LINKEDIN + "\" target=\"_blank\" rel=\"noopener\">LinkedIn</a>",
      followUps: ['resume', 'projects']
    },
    {
      id: 'contact', q: 'How can I contact you?',
      keywords: ['contact', 'email', 'mail', 'reach', 'message', 'linkedin', 'talk', 'call', 'connect', 'get in touch', 'phone', 'number'],
      answer: "The best ways to reach me:<br>• Email: <a href=\"mailto:" + EMAIL + "\">" + EMAIL + "</a><br>• <a href=\"" + LINKEDIN + "\" target=\"_blank\" rel=\"noopener\">Connect on LinkedIn</a>",
      followUps: ['available', 'resume']
    },
    {
      id: 'resume', q: 'Download résumé',
      keywords: ['resume', 'résumé', 'cv', 'curriculum', 'pdf', 'download'],
      answer: "Here you go: <a href=\"{B}Marlon-Sinadjan-Resume.pdf\" target=\"_blank\" rel=\"noopener\">📄 Marlon Sinadjan — Résumé (PDF)</a>",
      followUps: ['experience', 'available']
    },
    {
      id: 'thanks', q: 'Thanks!',
      keywords: ['thanks', 'thank you', 'thank', 'ty', 'cool', 'great', 'awesome', 'nice', 'bye', 'goodbye'],
      answer: "You're welcome! 😊 If you'd like to work together, <a href=\"mailto:" + EMAIL + "\">drop me an email</a>.",
      followUps: ['projects', 'available']
    }
  ];

  const START = ['intro', 'experience', 'skills', 'projects', 'available', 'resume'];
  const SYNONYMS = { cv: 'resume', 'résumé': 'resume', stack: 'tech', hire: 'hire', woo: 'woocommerce', wp: 'wordpress', js: 'javascript', vuejs: 'vue', 'next.js': 'nextjs', db: 'mysql', database: 'mysql', aws: 'aws', ecom: 'ecommerce' };

  const normalize = s => (' ' + String(s).toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/next\.js/g, 'nextjs').replace(/vue\.js/g, 'vue').replace(/e-commerce/g, 'ecommerce')
    .replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim() + ' ');
  const stem = w => (w.length > 3 && w.endsWith('s') && !w.endsWith('ss') ? w.slice(0, -1) : w);

  function match(input) {
    const text = normalize(input);
    const tokens = new Set(text.trim().split(' ').map(t => stem(SYNONYMS[t] || t)));
    let best = null, bestScore = 0;
    for (const intent of INTENTS) {
      let score = 0;
      for (const kw of intent.keywords) {
        const strong = kw[0] === '!';
        const k = normalize(strong ? kw.slice(1) : kw).trim();
        if (!k) continue;
        let hit = 0;
        if (k.includes(' ')) { if (text.includes(' ' + k + ' ')) hit = 3; }
        else if (tokens.has(stem(k))) hit = k.length <= 3 ? 1.5 : 2;
        if (hit) score += strong ? hit + 2 : hit;
      }
      if (text.includes(' ' + normalize(intent.q).trim() + ' ')) score += 4;
      if (score > bestScore) { bestScore = score; best = intent; }
    }
    return bestScore >= 1.5 ? best : null;
  }

  if (typeof module !== 'undefined' && module.exports) { module.exports = { match, INTENTS }; }
  if (typeof document === 'undefined') return;

  // ---------- UI ----------
  const script = document.currentScript;
  const BASE = script ? new URL('.', script.src).href : './';
  const byId = id => INTENTS.find(i => i.id === id);
  const avatarSrc = BASE + 'profile.webp';
  const store = { get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) { /* ignore */ } } };
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function el(tag, cls, html) { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; }

  function init() {
    const root = el('div', 'ask');
    root.innerHTML =
      '<div class="ask-bubble" hidden><button class="ask-bubble-close" type="button" aria-label="Dismiss">×</button><p>Hi! Ask me anything about my work 👋</p></div>' +
      '<section class="ask-panel" id="ask-panel" role="dialog" aria-label="Chat with Marlon (automated replies)" hidden>' +
        '<header class="ask-head"><img src="' + avatarSrc + '" alt="" width="40" height="40"><div><strong>Hi, I&#39;m Marlon</strong><span>Ask me anything!</span></div>' +
        '<button class="ask-close" type="button" aria-label="Close chat"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button></header>' +
        '<div class="ask-log" role="log" aria-live="polite"></div>' +
        '<form class="ask-form" autocomplete="off"><label class="sr-only" for="ask-input">Ask a question</label>' +
        '<input id="ask-input" type="text" maxlength="200" placeholder="Ask about skills, projects, availability…">' +
        '<button type="submit" aria-label="Send"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></form><p class="ask-note">Automated replies based on my portfolio &amp; résumé</p>' +
      '</section>' +
      '<button class="ask-launcher" type="button" aria-expanded="false" aria-controls="ask-panel" aria-label="Hi, I&#39;m Marlon. Ask me anything! Open chat">' +
        '<img src="' + avatarSrc + '" alt="" width="56" height="56"><span class="ask-online" aria-hidden="true"></span><span class="ask-label"><strong>Hi, I&#39;m Marlon</strong><small>Ask me anything!</small></span></button>';
    document.body.appendChild(root);

    const launcher = root.querySelector('.ask-launcher');
    const panel = root.querySelector('.ask-panel');
    const log = root.querySelector('.ask-log');
    const form = root.querySelector('.ask-form');
    const input = root.querySelector('#ask-input');
    const bubble = root.querySelector('.ask-bubble');
    let started = false, busy = false;

    const scroll = () => { log.scrollTop = log.scrollHeight; };

    function addUser(text) { const m = el('div', 'ask-msg ask-user'); m.textContent = text; log.appendChild(m); scroll(); }

    function addChips(ids) {
      log.querySelectorAll('.ask-chips').forEach(c => c.remove());
      const wrap = el('div', 'ask-chips');
      ids.map(byId).filter(Boolean).forEach(intent => {
        const b = el('button', 'ask-chip'); b.type = 'button'; b.textContent = intent.q;
        b.addEventListener('click', () => ask(intent.q, intent));
        wrap.appendChild(b);
      });
      log.appendChild(wrap); scroll();
    }

    function addBot(html, chips) {
      const typing = el('div', 'ask-msg ask-bot ask-typing', '<span></span><span></span><span></span>');
      typing.setAttribute('aria-label', 'Typing');
      log.appendChild(typing); scroll();
      busy = true;
      setTimeout(() => {
        typing.remove();
        log.appendChild(el('div', 'ask-msg ask-bot', html.replace(/\{B\}/g, BASE)));
        if (chips && chips.length) addChips(chips);
        scroll(); busy = false;
      }, reduceMotion ? 0 : 550);
    }

    function ask(text, known) {
      if (busy || !text.trim()) return;
      addUser(text.trim());
      const intent = known || match(text);
      if (intent) addBot(intent.answer, intent.followUps);
      else addBot("I don't have an answer for that one yet 🤔 You can ask Marlon directly at <a href=\"mailto:" + EMAIL + "\">" + EMAIL + "</a> or on <a href=\"" + LINKEDIN + "\" target=\"_blank\" rel=\"noopener\">LinkedIn</a>. Or try one of these:", START);
    }

    function open() {
      panel.hidden = false; launcher.setAttribute('aria-expanded', 'true'); root.classList.add('is-open');
      hideBubble(true);
      if (!started) { started = true; addBot(byId('intro').answer.split('<br><br>')[0] + "<br>What would you like to know?", START); }
      setTimeout(() => input.focus(), 50);
    }
    function close() { panel.hidden = true; launcher.setAttribute('aria-expanded', 'false'); root.classList.remove('is-open'); launcher.focus(); }
    function hideBubble(remember) { bubble.hidden = true; if (remember) store.set('askBubbleSeen', '1'); }

    launcher.addEventListener('click', () => (panel.hidden ? open() : close()));
    root.querySelector('.ask-close').addEventListener('click', close);
    bubble.querySelector('.ask-bubble-close').addEventListener('click', () => hideBubble(true));
    bubble.querySelector('p').addEventListener('click', open);
    form.addEventListener('submit', e => { e.preventDefault(); const v = input.value; input.value = ''; ask(v); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) close(); });

    if (!store.get('askBubbleSeen')) setTimeout(() => { if (panel.hidden) bubble.hidden = false; }, 6000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
