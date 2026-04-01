
(function () {
  const STORAGE_KEYS = {
    lang: 'll_site_lang',
    theme: 'll_site_theme',
    siteContent: 'll_site_content',
    adminHash: 'll_admin_password_hash',
    adminSession: 'll_admin_session',
    adminCustom: 'll_admin_custom_password'
  };

  const DEFAULT_ADMIN_HASH = '9d88dcf23ddc8847acde16ffd32fd569525f0b5f1ef12a5ca8a3415089e9b889';
  const AVATAR_PLACEHOLDER = 'assets/img/avatar-placeholder.svg';
  const COLLECTION_KEYS = ['skills', 'certificates', 'publications'];

  const DEFAULT_CONTENT = {
    name_zh: '李林峰',
    name_en: 'Linfeng Li',
    title_zh: '地球物理学硕士研究生',
    title_en: 'M.S. Student in Geophysics',
    school_zh: '南方科技大学',
    school_en: 'Southern University of Science and Technology',
    city_zh: '中国广东省深圳市',
    city_en: 'Shenzhen, Guangdong, China',
    phone: '+86 13481156117',
    contact_email: '12432261@mail.sustech.edu.cn',
    home_bg: 'linear-gradient(135deg, #e67f2a 0%, #d4681d 52%, #c75813 100%)',
    avatar_data_url: '',

    edu_intro_zh: '围绕地球物理方向的系统学习路径。',
    edu_intro_en: 'Systematic academic training focused on geophysics.',
    edu1_zh: '南方科技大学',
    edu1_en: 'Southern University of Science and Technology',
    edu1_desc_zh: '理学硕士，地球物理',
    edu1_desc_en: 'M.S., Geophysics',
    edu1_location_zh: '中国深圳',
    edu1_location_en: 'Shenzhen, China',
    edu1_date: '2024.09 - 至今',
    edu2_zh: '长江大学',
    edu2_en: 'Yangtze University',
    edu2_desc_zh: '理学学士，地球物理',
    edu2_desc_en: 'B.S., Geophysics',
    edu2_location_zh: '中国武汉',
    edu2_location_en: 'Wuhan, China',
    edu2_date: '2020.09 - 2024.06',
    edu3_zh: '',
    edu3_en: '',
    edu3_desc_zh: '',
    edu3_desc_en: '',
    edu3_location_zh: '',
    edu3_location_en: '',
    edu3_date: '',

    res1_zh: '基于高密度电法的人体组织成像',
    res1_en: 'Human Tissue Imaging with High-Density Electrical Methods',
    res1_desc_zh:
      '通过在皮肤上部署高密度电极阵列，并采用偶极-偶极激励的有限差分正向建模，利用组织间生物电阻抗差异，实现高分辨率区分，并通过时空电阻率变化量化区域和全身含水量。',
    res1_desc_en:
      'Built high-density electrode arrays with dipole-dipole finite-difference forward modeling to distinguish tissues using bio-impedance contrasts and quantify regional/full-body hydration changes.',
    res1_location_zh: '南方科技大学',
    res1_location_en: 'SUSTech',
    res1_date: '2024.09 - 至今',

    res2_zh: '水化合物实验',
    res2_en: 'Hydrate Experiments',
    res2_desc_zh:
      '将细石英砂在高压下压实模拟海底沉积物，孔隙充满天然气；利用天然气和盐水饱和砂之间的电阻率差异，反演得到高分辨率海底天然气分布图。',
    res2_desc_en:
      'Compacted fine quartz sand under high pressure to simulate seabed sediments and inverted high-resolution gas distribution maps using resistivity contrasts between gas and brine saturation.',
    res2_location_zh: '南方科技大学',
    res2_location_en: 'SUSTech',
    res2_date: '2025.10 - 至今',

    res3_zh: '基于集群机的MT实时动态监测系统建设与软件开发',
    res3_en: 'MT Real-Time Dynamic Monitoring System on Linux Cluster',
    res3_desc_zh:
      '建立实时现场大地电磁监测平台，数据通过4G网络传输到Linux集群进行存储和实时处理；基于PyQt和Python实现实时大地电磁数据远程可视化与即时分析。',
    res3_desc_en:
      'Built a real-time MT monitoring platform with 4G transmission to Linux clusters for storage/processing, and developed PyQt/Python software for remote visualization and instant analysis.',
    res3_location_zh: '长江大学',
    res3_location_en: 'Yangtze University',
    res3_date: '2023.05 - 2024.05',

    res4_zh: '基于井震资料地电模型建模与软件实现',
    res4_en: 'Geoelectric Modeling from Seismic and Well-Logging Data',
    res4_desc_zh:
      '读取并转换地震与测井数据为地形结构，在COMSOL中构建分层模型并分配电阻率后完成有限元正演建模；开发基于PyQt的界面用于高效数据处理与可视化。',
    res4_desc_en:
      'Converted seismic and logging data into terrain structures, built layered COMSOL models with resistivity assignments for FEM forward modeling, and developed a PyQt UI for efficient processing and visualization.',
    res4_location_zh: '长江大学',
    res4_location_en: 'Yangtze University',
    res4_date: '2023.05 - 2024.06',

    skills: [
      {
        title_zh: 'MATLAB / Python',
        title_en: 'MATLAB / Python',
        desc_zh: '熟练掌握数据处理，能够独立完成项目代码编写。',
        desc_en: 'Proficient in data processing and able to independently deliver project code.',
        org_zh: '科研与工程开发',
        org_en: 'Research & Engineering',
        date: '',
        link: ''
      },
      {
        title_zh: '地球物理数据处理与建模',
        title_en: 'Geophysical Data Processing & Modeling',
        desc_zh: '具备有限差分与有限元建模经验，熟悉 COMSOL、PyQt 及实时监测系统流程。',
        desc_en: 'Hands-on experience with FDM/FEM modeling, COMSOL, PyQt, and real-time monitoring pipelines.',
        org_zh: '研究方法',
        org_en: 'Research Methodology',
        date: '',
        link: ''
      },
      {
        title_zh: '乒乓球',
        title_en: 'Table Tennis',
        desc_zh: '作为学校主力球员，获得多项省级奖项。',
        desc_en: 'Core team player with multiple provincial-level awards.',
        org_zh: '体育特长',
        org_en: 'Athletic Strength',
        date: '',
        link: ''
      }
    ],

    certificates: [],

    publications: [
      {
        title_zh: '基于高密度电法的人体组织成像（已录用）',
        title_en: 'Human Tissue Imaging with High-Density Electrical Methods (Accepted)',
        desc_zh: '作者：李林峰、宋真龙、何展翔、杨迪琨。',
        desc_en: 'Authors: Linfeng Li, Zhenlong Song, Zhanxiang He, Dikun Yang.',
        org_zh: '会议论文',
        org_en: 'Conference Paper',
        date: '2025.10',
        link: ''
      }
    ]
  };

  const FIELD_DEFS = [
    { group: 'basic', key: 'name_zh', label: '中文姓名' },
    { group: 'basic', key: 'name_en', label: 'English Name' },
    { group: 'basic', key: 'title_zh', label: '中文头衔' },
    { group: 'basic', key: 'title_en', label: 'English Title' },
    { group: 'basic', key: 'school_zh', label: '中文学校' },
    { group: 'basic', key: 'school_en', label: 'English School' },
    { group: 'basic', key: 'city_zh', label: '中文城市' },
    { group: 'basic', key: 'city_en', label: 'English City' },
    { group: 'basic', key: 'phone', label: 'Phone' },
    { group: 'basic', key: 'contact_email', label: 'Public Email' },
    { group: 'basic', key: 'home_bg', label: '头图背景 CSS' },

    { group: 'education', key: 'edu_intro_zh', label: '教育引导中文', type: 'textarea' },
    { group: 'education', key: 'edu_intro_en', label: 'Education Intro English', type: 'textarea' },
    { group: 'education', key: 'edu1_zh', label: '教育1中文' },
    { group: 'education', key: 'edu1_en', label: 'Education 1 English' },
    { group: 'education', key: 'edu1_desc_zh', label: '教育1描述中文', type: 'textarea' },
    { group: 'education', key: 'edu1_desc_en', label: 'Education 1 Desc English', type: 'textarea' },
    { group: 'education', key: 'edu1_location_zh', label: '教育1地点中文' },
    { group: 'education', key: 'edu1_location_en', label: 'Education 1 Location English' },
    { group: 'education', key: 'edu1_date', label: '教育1日期' },
    { group: 'education', key: 'edu2_zh', label: '教育2中文' },
    { group: 'education', key: 'edu2_en', label: 'Education 2 English' },
    { group: 'education', key: 'edu2_desc_zh', label: '教育2描述中文', type: 'textarea' },
    { group: 'education', key: 'edu2_desc_en', label: 'Education 2 Desc English', type: 'textarea' },
    { group: 'education', key: 'edu2_location_zh', label: '教育2地点中文' },
    { group: 'education', key: 'edu2_location_en', label: 'Education 2 Location English' },
    { group: 'education', key: 'edu2_date', label: '教育2日期' },
    { group: 'education', key: 'edu3_zh', label: '教育3中文' },
    { group: 'education', key: 'edu3_en', label: 'Education 3 English' },
    { group: 'education', key: 'edu3_desc_zh', label: '教育3描述中文', type: 'textarea' },
    { group: 'education', key: 'edu3_desc_en', label: 'Education 3 Desc English', type: 'textarea' },
    { group: 'education', key: 'edu3_location_zh', label: '教育3地点中文' },
    { group: 'education', key: 'edu3_location_en', label: 'Education 3 Location English' },
    { group: 'education', key: 'edu3_date', label: '教育3日期' },

    { group: 'research', key: 'res1_zh', label: 'Research 1 (ZH)' },
    { group: 'research', key: 'res1_en', label: 'Research 1 (EN)' },
    { group: 'research', key: 'res1_desc_zh', label: 'Research 1 Desc (ZH)', type: 'textarea' },
    { group: 'research', key: 'res1_desc_en', label: 'Research 1 Desc (EN)', type: 'textarea' },
    { group: 'research', key: 'res1_location_zh', label: 'Research 1 Location (ZH)' },
    { group: 'research', key: 'res1_location_en', label: 'Research 1 Location (EN)' },
    { group: 'research', key: 'res1_date', label: 'Research 1 Date' },
    { group: 'research', key: 'res2_zh', label: 'Research 2 (ZH)' },
    { group: 'research', key: 'res2_en', label: 'Research 2 (EN)' },
    { group: 'research', key: 'res2_desc_zh', label: 'Research 2 Desc (ZH)', type: 'textarea' },
    { group: 'research', key: 'res2_desc_en', label: 'Research 2 Desc (EN)', type: 'textarea' },
    { group: 'research', key: 'res2_location_zh', label: 'Research 2 Location (ZH)' },
    { group: 'research', key: 'res2_location_en', label: 'Research 2 Location (EN)' },
    { group: 'research', key: 'res2_date', label: 'Research 2 Date' },
    { group: 'research', key: 'res3_zh', label: 'Research 3 (ZH)' },
    { group: 'research', key: 'res3_en', label: 'Research 3 (EN)' },
    { group: 'research', key: 'res3_desc_zh', label: 'Research 3 Desc (ZH)', type: 'textarea' },
    { group: 'research', key: 'res3_desc_en', label: 'Research 3 Desc (EN)', type: 'textarea' },
    { group: 'research', key: 'res3_location_zh', label: 'Research 3 Location (ZH)' },
    { group: 'research', key: 'res3_location_en', label: 'Research 3 Location (EN)' },
    { group: 'research', key: 'res3_date', label: 'Research 3 Date' },
    { group: 'research', key: 'res4_zh', label: 'Research 4 (ZH)' },
    { group: 'research', key: 'res4_en', label: 'Research 4 (EN)' },
    { group: 'research', key: 'res4_desc_zh', label: 'Research 4 Desc (ZH)', type: 'textarea' },
    { group: 'research', key: 'res4_desc_en', label: 'Research 4 Desc (EN)', type: 'textarea' },
    { group: 'research', key: 'res4_location_zh', label: 'Research 4 Location (ZH)' },
    { group: 'research', key: 'res4_location_en', label: 'Research 4 Location (EN)' },
    { group: 'research', key: 'res4_date', label: 'Research 4 Date' }
  ];

  const FIELD_GROUPS = [
    { id: 'basic', zh: '基础信息', en: 'Basic Info' },
    { id: 'education', zh: '教育经历字段', en: 'Education Fields' },
    { id: 'research', zh: '研究方向字段', en: 'Research Fields' }
  ];

  let siteContent = {};
  const adminCollectionRenderers = [];

  function byQuery(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  }

  function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function setYear() {
    byQuery('[data-year]').forEach((el) => {
      el.textContent = String(new Date().getFullYear());
    });
  }

  function initLanguage() {
    const saved = localStorage.getItem(STORAGE_KEYS.lang);
    const browserLang = navigator.language && navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';
    setLanguage(saved || browserLang);
    byQuery('[data-lang-btn]').forEach((btn) => {
      btn.addEventListener('click', () => setLanguage(btn.dataset.langBtn));
    });
  }

  function setLanguage(lang) {
    const nextLang = lang === 'en' ? 'en' : 'zh';
    document.body.dataset.lang = nextLang;
    document.documentElement.lang = nextLang;
    localStorage.setItem(STORAGE_KEYS.lang, nextLang);
    byQuery('[data-lang-btn]').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.langBtn === nextLang);
    });
  }

  function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEYS.theme);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    setTheme(theme);

    const toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) {
      toggle.addEventListener('click', () => {
        setTheme(document.body.dataset.theme === 'dark' ? 'light' : 'dark');
      });
    }
  }

  function setTheme(theme) {
    const nextTheme = theme === 'dark' ? 'dark' : 'light';
    document.body.dataset.theme = nextTheme;
    localStorage.setItem(STORAGE_KEYS.theme, nextTheme);

    const toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) {
      toggle.textContent = nextTheme === 'dark' ? '☀' : '◐';
      toggle.setAttribute('aria-label', nextTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  function initAnchorNav() {
    const links = byQuery('.nav-link[href^="#"]');
    if (links.length === 0) {
      return;
    }

    const sectionMap = links
      .map((link) => ({ link, section: document.querySelector(link.getAttribute('href')) }))
      .filter((item) => item.section);

    const setActive = (id) => {
      sectionMap.forEach(({ link, section }) => {
        link.classList.toggle('active', section.id === id);
      });
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActive(entry.target.id);
            }
          });
        },
        { threshold: 0.4, rootMargin: '-25% 0px -50% 0px' }
      );
      sectionMap.forEach(({ section }) => observer.observe(section));
    }

    links.forEach((link) => {
      link.addEventListener('click', () => {
        setActive(link.getAttribute('href').slice(1));
      });
    });

    const current = window.location.hash ? window.location.hash.slice(1) : sectionMap[0].section.id;
    setActive(current);
  }

  function initReveal() {
    const revealEls = byQuery('.reveal');
    if (!('IntersectionObserver' in window) || revealEls.length === 0) {
      revealEls.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    revealEls.forEach((el) => observer.observe(el));
  }

  function ensureDefaultAdminPassword() {
    const custom = localStorage.getItem(STORAGE_KEYS.adminCustom) === '1';
    if (!custom) {
      localStorage.setItem(STORAGE_KEYS.adminHash, DEFAULT_ADMIN_HASH);
    }
  }

  function normalizeCollectionItem(item) {
    const next = item && typeof item === 'object' ? item : {};
    return {
      title_zh: String(next.title_zh || ''),
      title_en: String(next.title_en || ''),
      desc_zh: String(next.desc_zh || ''),
      desc_en: String(next.desc_en || ''),
      org_zh: String(next.org_zh || ''),
      org_en: String(next.org_en || ''),
      date: String(next.date || ''),
      link: String(next.link || '')
    };
  }

  function mergeSiteContent(rawValue) {
    const base = deepClone(DEFAULT_CONTENT);
    const raw = rawValue && typeof rawValue === 'object' ? rawValue : {};

    Object.keys(base).forEach((key) => {
      if (COLLECTION_KEYS.includes(key)) {
        const source = raw[key];
        base[key] = Array.isArray(source) ? source.map(normalizeCollectionItem) : deepClone(DEFAULT_CONTENT[key]);
        return;
      }

      const value = raw[key];
      if (typeof value === 'string') {
        base[key] = value;
      }
    });

    return base;
  }

  function loadSiteContent() {
    try {
      const rawText = localStorage.getItem(STORAGE_KEYS.siteContent);
      const raw = rawText ? JSON.parse(rawText) : {};
      return mergeSiteContent(raw);
    } catch (error) {
      return mergeSiteContent({});
    }
  }

  function saveSiteContent(content) {
    localStorage.setItem(STORAGE_KEYS.siteContent, JSON.stringify(content));
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function toBilingualHtml(zh, en) {
    const zhText = String(zh || '').trim();
    const enText = String(en || '').trim();
    const displayZh = zhText || enText;
    const displayEn = enText || zhText;
    return `<span class="lang zh">${escapeHtml(displayZh)}</span><span class="lang en">${escapeHtml(displayEn)}</span>`;
  }

  function safeLink(linkText) {
    const value = String(linkText || '').trim();
    if (!value) {
      return '';
    }
    try {
      const parsed = new URL(value, window.location.origin);
      if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
        return parsed.href;
      }
      return '';
    } catch (error) {
      return '';
    }
  }

  function updateEntryVisibility(content) {
    byQuery('[data-entry-prefix]').forEach((row) => {
      const prefix = row.dataset.entryPrefix;
      if (!prefix) {
        return;
      }

      const keys = [
        `${prefix}_zh`,
        `${prefix}_en`,
        `${prefix}_desc_zh`,
        `${prefix}_desc_en`,
        `${prefix}_location_zh`,
        `${prefix}_location_en`,
        `${prefix}_date`
      ];
      const hasValue = keys.some((key) => String(content[key] || '').trim().length > 0);
      row.hidden = !hasValue;
    });
  }

  function renderCollectionPublic(type, items) {
    const container = document.querySelector(`[data-list="${type}"]`);
    const empty = document.querySelector(`[data-list-empty="${type}"]`);
    if (!container) {
      return;
    }

    container.innerHTML = '';
    const list = Array.isArray(items) ? items : [];

    if (list.length === 0) {
      if (empty) {
        empty.hidden = false;
      }
      return;
    }

    if (empty) {
      empty.hidden = true;
    }

    list.forEach((item) => {
      const row = normalizeCollectionItem(item);
      const article = document.createElement('article');
      article.className = 'card research-row';

      const main = document.createElement('div');
      main.className = 'entry-main';
      const title = toBilingualHtml(row.title_zh, row.title_en);
      const desc = toBilingualHtml(row.desc_zh, row.desc_en);
      main.innerHTML = `<h3>${title}</h3>${row.desc_zh || row.desc_en ? `<p>${desc}</p>` : ''}`;

      const side = document.createElement('div');
      side.className = 'entry-side';
      const org = toBilingualHtml(row.org_zh, row.org_en);
      const link = safeLink(row.link);
      side.innerHTML =
        `${row.org_zh || row.org_en ? `<p>${org}</p>` : ''}` +
        `${row.date ? `<p class="entry-date">${escapeHtml(row.date)}</p>` : ''}` +
        `${link ? `<p class="entry-link"><a href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link)}</a></p>` : ''}`;

      article.appendChild(main);
      article.appendChild(side);
      container.appendChild(article);
    });
  }

  function applySiteContent(content) {
    byQuery('[data-bind]').forEach((el) => {
      const key = el.dataset.bind;
      if (Object.prototype.hasOwnProperty.call(content, key)) {
        el.textContent = content[key];
      }
    });

    const contactForm = document.querySelector('[data-contact-form]');
    if (contactForm) {
      contactForm.dataset.contactEmail = content.contact_email || '';
    }

    const homePanel = document.querySelector('[data-home-panel]');
    if (homePanel) {
      if (content.home_bg && content.home_bg.trim()) {
        homePanel.style.background = content.home_bg.trim();
      } else {
        homePanel.style.removeProperty('background');
      }
    }

    const avatarImg = document.querySelector('[data-avatar-image]');
    if (avatarImg) {
      avatarImg.src = String(content.avatar_data_url || '').trim() || AVATAR_PLACEHOLDER;
    }

    updateEntryVisibility(content);
    renderCollectionPublic('skills', content.skills);
    renderCollectionPublic('certificates', content.certificates);
    renderCollectionPublic('publications', content.publications);
  }

  function initSiteContent() {
    siteContent = loadSiteContent();
    applySiteContent(siteContent);
  }

  async function hashPassword(password) {
    if (!window.crypto || !window.crypto.subtle || !window.TextEncoder) {
      return btoa(unescape(encodeURIComponent(password)));
    }

    const encoded = new TextEncoder().encode(password);
    const digest = await window.crypto.subtle.digest('SHA-256', encoded);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }

  function initAdminPanel() {
    ensureDefaultAdminPassword();

    const openBtn = document.querySelector('[data-admin-open]');
    const closeBtn = document.querySelector('[data-admin-close]');
    const overlay = document.querySelector('[data-admin-overlay]');
    const panel = document.querySelector('[data-admin-panel]');
    const editorWrap = document.querySelector('[data-admin-editor]');
    const passwordInput = document.querySelector('[data-admin-password]');
    const loginBtn = document.querySelector('[data-admin-login]');
    const changeBtn = document.querySelector('[data-admin-change]');
    const authStatus = document.querySelector('[data-admin-auth-status]');
    const fieldGroupWraps = byQuery('[data-admin-fields-group]', editorWrap);
    const saveBtn = document.querySelector('[data-admin-save]');
    const resetBtn = document.querySelector('[data-admin-reset]');
    const exportBtn = document.querySelector('[data-admin-export]');
    const importTrigger = document.querySelector('[data-admin-import-trigger]');
    const importInput = document.querySelector('[data-admin-import]');
    const logoutBtn = document.querySelector('[data-admin-logout]');
    const editStatus = document.querySelector('[data-admin-edit-status]');
    const avatarUploadBtn = document.querySelector('[data-admin-avatar-upload]');
    const avatarResetBtn = document.querySelector('[data-admin-avatar-reset]');
    const avatarInput = document.querySelector('[data-admin-avatar-input]');
    const avatarStatus = document.querySelector('[data-admin-avatar-status]');

    if (!panel || !editorWrap || fieldGroupWraps.length === 0) {
      return;
    }

    const fieldGroupMap = {};
    fieldGroupWraps.forEach((wrap) => {
      const groupId = wrap.dataset.adminFieldsGroup;
      if (groupId) {
        fieldGroupMap[groupId] = wrap;
      }
    });

    const setAuthStatus = (text) => {
      if (authStatus) {
        authStatus.textContent = text;
      }
    };

    const setEditStatus = (text) => {
      if (editStatus) {
        editStatus.textContent = text;
      }
    };

    const setAvatarStatus = (text) => {
      if (avatarStatus) {
        avatarStatus.textContent = text;
      }
    };

    const isLoggedIn = () => localStorage.getItem(STORAGE_KEYS.adminSession) === '1';
    const hasPassword = () => !!localStorage.getItem(STORAGE_KEYS.adminHash);

    const buildFieldForm = () => {
      Object.values(fieldGroupMap).forEach((wrap) => {
        wrap.innerHTML = '';
      });

      FIELD_GROUPS.forEach((group) => {
        const targetWrap = fieldGroupMap[group.id];
        if (!targetWrap) {
          return;
        }

        const grid = document.createElement('div');
        grid.className = 'admin-grid';

        FIELD_DEFS.filter((field) => field.group === group.id).forEach((field) => {
          const row = document.createElement('div');
          row.className = 'admin-field-row';

          const label = document.createElement('label');
          label.className = 'admin-note';
          label.textContent = field.label;

          const control = document.createElement(field.type === 'textarea' ? 'textarea' : 'input');
          control.className = 'input';
          control.dataset.adminField = field.key;
          if (field.type === 'textarea') {
            control.rows = 3;
          } else {
            control.type = 'text';
          }

          row.appendChild(label);
          row.appendChild(control);
          grid.appendChild(row);
        });

        targetWrap.appendChild(grid);
      });
    };

    const fillFields = () => {
      byQuery('[data-admin-field]', editorWrap).forEach((input) => {
        const key = input.dataset.adminField;
        input.value = Object.prototype.hasOwnProperty.call(siteContent, key) ? siteContent[key] : '';
      });
    };

    const readFields = () => {
      const next = deepClone(siteContent);
      byQuery('[data-admin-field]', editorWrap).forEach((input) => {
        next[input.dataset.adminField] = input.value.trim();
      });
      return next;
    };

    const refreshAuthView = () => {
      const logged = isLoggedIn();
      editorWrap.hidden = !logged;
      if (changeBtn) {
        changeBtn.hidden = !logged;
      }

      if (!hasPassword()) {
        setAuthStatus('未找到管理员密码，请刷新后重试。');
      } else if (!logged) {
        setAuthStatus('请输入管理员密码登录。');
      } else {
        setAuthStatus('已登录，可直接编辑网站内容。');
      }

      if (logged) {
        fillFields();
        adminCollectionRenderers.forEach((render) => render());
      }
    };

    const openPanel = () => {
      panel.hidden = false;
      if (overlay) {
        overlay.hidden = false;
      }
      refreshAuthView();
    };

    const closePanel = () => {
      panel.hidden = true;
      if (overlay) {
        overlay.hidden = true;
      }
    };

    const bindCollectionManagers = () => {
      byQuery('[data-admin-collection]').forEach((block) => {
        const type = block.dataset.adminCollection;
        if (!type || !COLLECTION_KEYS.includes(type)) {
          return;
        }

        const form = block.querySelector('[data-admin-collection-form]');
        const list = block.querySelector('[data-admin-collection-list]');
        const empty = block.querySelector('[data-admin-collection-empty]');
        const submitBtn = block.querySelector('[data-admin-collection-submit]');
        const cancelBtn = block.querySelector('[data-admin-collection-cancel]');
        if (!form || !list || !submitBtn || !cancelBtn) {
          return;
        }

        let editingIndex = -1;

        const resetForm = () => {
          form.reset();
          editingIndex = -1;
          cancelBtn.hidden = true;
          submitBtn.innerHTML = '<span class="lang zh">新增条目</span><span class="lang en">Add Item</span>';
        };

        const renderAdminList = () => {
          const items = Array.isArray(siteContent[type]) ? siteContent[type] : [];
          list.innerHTML = '';

          if (items.length === 0) {
            if (empty) {
              empty.hidden = false;
            }
            return;
          }

          if (empty) {
            empty.hidden = true;
          }

          items.forEach((item, index) => {
            const row = normalizeCollectionItem(item);
            const li = document.createElement('li');
            li.className = 'list-item';
            li.innerHTML = `
              <div class="head">
                <strong>${escapeHtml(row.title_zh || row.title_en || '未命名条目')}</strong>
                <span class="admin-mini-actions">
                  <button type="button" class="btn subtle" data-collection-action="edit" data-index="${index}">编辑</button>
                  <button type="button" class="btn subtle" data-collection-action="remove" data-index="${index}">删除</button>
                </span>
              </div>
              <div class="meta">${escapeHtml(row.org_zh || row.org_en || '')}${row.date ? ` | ${escapeHtml(row.date)}` : ''}</div>
            `;
            list.appendChild(li);
          });
        };

        const saveCollection = (items, successText) => {
          siteContent[type] = items.map(normalizeCollectionItem);
          saveSiteContent(siteContent);
          applySiteContent(siteContent);
          renderAdminList();
          setEditStatus(successText);
        };

        form.addEventListener('submit', (event) => {
          event.preventDefault();
          if (!isLoggedIn()) {
            setEditStatus('请先登录管理员账号。');
            return;
          }

          const values = normalizeCollectionItem({
            title_zh: form.elements.title_zh?.value,
            title_en: form.elements.title_en?.value,
            desc_zh: form.elements.desc_zh?.value,
            desc_en: form.elements.desc_en?.value,
            org_zh: form.elements.org_zh?.value,
            org_en: form.elements.org_en?.value,
            date: form.elements.date?.value,
            link: safeLink(form.elements.link?.value || '')
          });

          if (!values.title_zh && !values.title_en) {
            setEditStatus('请至少填写一个标题。');
            return;
          }

          const items = Array.isArray(siteContent[type]) ? siteContent[type].map(normalizeCollectionItem) : [];
          if (editingIndex >= 0 && editingIndex < items.length) {
            items[editingIndex] = values;
            saveCollection(items, '条目更新成功。');
          } else {
            items.unshift(values);
            saveCollection(items, '条目新增成功。');
          }
          resetForm();
        });

        cancelBtn.addEventListener('click', resetForm);

        list.addEventListener('click', (event) => {
          const target = event.target;
          if (!(target instanceof HTMLElement)) {
            return;
          }

          const action = target.dataset.collectionAction;
          const index = Number(target.dataset.index);
          if (!action || Number.isNaN(index)) {
            return;
          }

          const items = Array.isArray(siteContent[type]) ? siteContent[type].map(normalizeCollectionItem) : [];
          const item = items[index];
          if (!item) {
            return;
          }

          if (action === 'remove') {
            if (!isLoggedIn()) {
              setEditStatus('请先登录管理员账号。');
              return;
            }
            const next = items.filter((_, i) => i !== index);
            saveCollection(next, '条目删除成功。');
            if (editingIndex === index) {
              resetForm();
            }
            return;
          }

          if (action === 'edit') {
            form.elements.title_zh.value = item.title_zh;
            form.elements.title_en.value = item.title_en;
            form.elements.desc_zh.value = item.desc_zh;
            form.elements.desc_en.value = item.desc_en;
            form.elements.org_zh.value = item.org_zh;
            form.elements.org_en.value = item.org_en;
            form.elements.date.value = item.date;
            form.elements.link.value = item.link;
            editingIndex = index;
            cancelBtn.hidden = false;
            submitBtn.innerHTML = '<span class="lang zh">更新条目</span><span class="lang en">Update Item</span>';
          }
        });

        adminCollectionRenderers.push(renderAdminList);
        renderAdminList();
      });
    };

    buildFieldForm();
    fillFields();
    bindCollectionManagers();
    refreshAuthView();

    openBtn && openBtn.addEventListener('click', openPanel);
    closeBtn && closeBtn.addEventListener('click', closePanel);
    overlay && overlay.addEventListener('click', closePanel);

    loginBtn &&
      loginBtn.addEventListener('click', async () => {
        const pwd = passwordInput ? passwordInput.value.trim() : '';
        if (!pwd) {
          setAuthStatus('请输入密码。');
          return;
        }
        const hash = await hashPassword(pwd);
        if (hash === localStorage.getItem(STORAGE_KEYS.adminHash)) {
          localStorage.setItem(STORAGE_KEYS.adminSession, '1');
          if (passwordInput) {
            passwordInput.value = '';
          }
          refreshAuthView();
        } else {
          setAuthStatus('密码错误。');
        }
      });

    changeBtn &&
      changeBtn.addEventListener('click', async () => {
        if (!isLoggedIn()) {
          setEditStatus('请先登录管理员账号。');
          return;
        }
        const newPwd = window.prompt('请输入新的管理员密码：');
        if (!newPwd || !newPwd.trim()) {
          return;
        }
        const hash = await hashPassword(newPwd.trim());
        localStorage.setItem(STORAGE_KEYS.adminHash, hash);
        localStorage.setItem(STORAGE_KEYS.adminCustom, '1');
        setEditStatus('管理员密码已更新。');
      });

    saveBtn &&
      saveBtn.addEventListener('click', () => {
        if (!isLoggedIn()) {
          setEditStatus('请先登录管理员账号。');
          return;
        }
        siteContent = readFields();
        saveSiteContent(siteContent);
        applySiteContent(siteContent);
        setEditStatus('页面文本保存成功。');
      });

    resetBtn &&
      resetBtn.addEventListener('click', () => {
        if (!isLoggedIn()) {
          setEditStatus('请先登录管理员账号。');
          return;
        }
        if (!window.confirm('确定恢复所有内容为默认值吗？')) {
          return;
        }
        siteContent = mergeSiteContent({});
        saveSiteContent(siteContent);
        applySiteContent(siteContent);
        fillFields();
        adminCollectionRenderers.forEach((render) => render());
        setEditStatus('已恢复默认内容。');
        setAvatarStatus('头像已恢复默认。');
      });

    exportBtn &&
      exportBtn.addEventListener('click', () => {
        const data = JSON.stringify(siteContent, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'site-content.json';
        a.click();
        URL.revokeObjectURL(url);
        setEditStatus('内容已导出为 JSON。');
      });

    importTrigger &&
      importTrigger.addEventListener('click', () => {
        importInput && importInput.click();
      });

    importInput &&
      importInput.addEventListener('change', (event) => {
        if (!isLoggedIn()) {
          setEditStatus('请先登录管理员账号。');
          return;
        }
        const file = event.target.files && event.target.files[0];
        if (!file) {
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          try {
            const parsed = JSON.parse(String(reader.result || '{}'));
            siteContent = mergeSiteContent(parsed);
            saveSiteContent(siteContent);
            applySiteContent(siteContent);
            fillFields();
            adminCollectionRenderers.forEach((render) => render());
            setEditStatus('JSON 导入并应用成功。');
          } catch (error) {
            setEditStatus('JSON 文件格式不正确。');
          }
        };
        reader.readAsText(file, 'utf-8');
        importInput.value = '';
      });

    logoutBtn &&
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem(STORAGE_KEYS.adminSession);
        refreshAuthView();
        setEditStatus('已退出管理员登录。');
      });

    avatarUploadBtn &&
      avatarUploadBtn.addEventListener('click', () => {
        if (!isLoggedIn()) {
          setAvatarStatus('请先登录管理员账号。');
          return;
        }
        avatarInput && avatarInput.click();
      });

    avatarInput &&
      avatarInput.addEventListener('change', (event) => {
        if (!isLoggedIn()) {
          setAvatarStatus('请先登录管理员账号。');
          return;
        }
        const file = event.target.files && event.target.files[0];
        if (!file) {
          return;
        }

        if (!file.type.startsWith('image/')) {
          setAvatarStatus('请上传图片文件。');
          avatarInput.value = '';
          return;
        }

        if (file.size > 5 * 1024 * 1024) {
          setAvatarStatus('图片超过 5MB，请压缩后重试。');
          avatarInput.value = '';
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          const result = typeof reader.result === 'string' ? reader.result : '';
          if (!result) {
            setAvatarStatus('头像读取失败。');
            return;
          }
          siteContent.avatar_data_url = result;
          saveSiteContent(siteContent);
          applySiteContent(siteContent);
          setAvatarStatus('头像已更新并保存。');
        };
        reader.readAsDataURL(file);
        avatarInput.value = '';
      });

    avatarResetBtn &&
      avatarResetBtn.addEventListener('click', () => {
        if (!isLoggedIn()) {
          setAvatarStatus('请先登录管理员账号。');
          return;
        }
        siteContent.avatar_data_url = '';
        saveSiteContent(siteContent);
        applySiteContent(siteContent);
        setAvatarStatus('头像已重置为默认。');
      });
  }

  function initContactForm() {
    const form = document.querySelector('[data-contact-form]');
    if (!form) {
      return;
    }

    const status = form.querySelector('[data-contact-status]');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = form.querySelector('[name="name"]')?.value.trim() || '';
      const email = form.querySelector('[name="email"]')?.value.trim() || '';
      const message = form.querySelector('[name="message"]')?.value.trim() || '';
      const targetEmail = form.dataset.contactEmail ? form.dataset.contactEmail.trim() : '';

      if (!targetEmail || targetEmail === 'your-email@example.com') {
        if (status) {
          status.textContent = '请先在后台设置有效公开邮箱。';
        }
        return;
      }

      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:${targetEmail}?subject=Website Contact&body=${body}`;

      if (status) {
        status.textContent = '已调用本地邮件客户端，可继续编辑后发送。';
      }
    });
  }

  function init() {
    setYear();
    initLanguage();
    initTheme();
    initSiteContent();
    initAnchorNav();
    initReveal();
    initAdminPanel();
    initContactForm();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
