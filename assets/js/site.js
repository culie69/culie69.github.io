(function () {
  const STORAGE_KEYS = {
    lang: 'll_site_lang',
    theme: 'll_site_theme',
    avatar: 'll_profile_avatar_data_url',
    siteContent: 'll_site_content',
    adminHash: 'll_admin_password_hash',
    adminSession: 'll_admin_session'
  };

  const DEFAULT_CONTENT = {
    name_zh: '李林峰',
    name_en: 'Linfeng Li',
    title_zh: '南方科技大学地球物理学博士',
    title_en: 'Ph.D. in Geophysics, SUSTech',
    school_zh: '南方科技大学',
    school_en: 'Southern University of Science and Technology',
    city_zh: '中国广东省深圳市',
    city_en: 'Shenzhen, Guangdong, China',
    phone: '13481156117',
    contact_email: 'your-email@example.com',
    home_bg: 'linear-gradient(145deg, rgba(235, 246, 255, 0.84), rgba(255, 247, 232, 0.88))',
    edu_intro_zh: '从高中到博士阶段的完整学术路径。',
    edu_intro_en: 'A complete academic path from high school to doctoral studies.',
    edu1_zh: '广西大学附属中学',
    edu1_en: 'High School Affiliated to Guangxi University',
    edu1_desc_zh: '高中阶段，完成基础学科训练并形成科学兴趣。',
    edu1_desc_en: 'Built solid fundamentals and developed early scientific interest.',
    edu2_zh: '长江大学（武汉校区）',
    edu2_en: 'Yangtze University (Wuhan Campus)',
    edu2_desc_zh: '本科阶段，打下专业课程与工程实践基础。',
    edu2_desc_en: 'Undergraduate stage focused on disciplinary courses and engineering practice.',
    edu3_zh: '南方科技大学（硕士、博士）',
    edu3_en: 'SUSTech (Master and Ph.D.)',
    edu3_desc_zh: '硕士和博士阶段，专注地球物理研究与科学计算。',
    edu3_desc_en: 'Master and doctoral stages focused on geophysics research and scientific computing.',
    res1_zh: '地球物理数值模拟',
    res1_en: 'Geophysical Numerical Simulation',
    res1_desc_zh: '研究波动传播、离散算法和稳定性分析。',
    res1_desc_en: 'Study wave propagation, discretization schemes, and stability analysis.',
    res2_zh: '科学计算与建模',
    res2_en: 'Scientific Computing & Modeling',
    res2_desc_zh: '使用 MATLAB/Python 进行模型构建和实验验证。',
    res2_desc_en: 'Use MATLAB/Python for model building and experimental verification.',
    res3_zh: '方法优化',
    res3_en: 'Method Optimization',
    res3_desc_zh: '面向复杂地学场景优化计算流程和效率。',
    res3_desc_en: 'Optimize workflows and efficiency for complex geoscience scenarios.'
  };

  const EDITABLE_FIELDS = [
    { key: 'name_zh', label: '中文姓名' },
    { key: 'name_en', label: 'English Name' },
    { key: 'title_zh', label: '中文头衔' },
    { key: 'title_en', label: 'English Title' },
    { key: 'school_zh', label: '中文学校' },
    { key: 'school_en', label: 'English School' },
    { key: 'city_zh', label: '中文城市' },
    { key: 'city_en', label: 'English City' },
    { key: 'phone', label: 'Phone' },
    { key: 'contact_email', label: 'Public Email' },
    { key: 'home_bg', label: '个人介绍背景CSS' },
    { key: 'edu_intro_zh', label: '教育引导中文' },
    { key: 'edu_intro_en', label: 'Education Intro English' },
    { key: 'edu1_zh', label: '教育1中文' },
    { key: 'edu1_en', label: 'Education 1 English' },
    { key: 'edu1_desc_zh', label: '教育1描述中文', type: 'textarea' },
    { key: 'edu1_desc_en', label: 'Education 1 Desc English', type: 'textarea' },
    { key: 'edu2_zh', label: '教育2中文' },
    { key: 'edu2_en', label: 'Education 2 English' },
    { key: 'edu2_desc_zh', label: '教育2描述中文', type: 'textarea' },
    { key: 'edu2_desc_en', label: 'Education 2 Desc English', type: 'textarea' },
    { key: 'edu3_zh', label: '教育3中文' },
    { key: 'edu3_en', label: 'Education 3 English' },
    { key: 'edu3_desc_zh', label: '教育3描述中文', type: 'textarea' },
    { key: 'edu3_desc_en', label: 'Education 3 Desc English', type: 'textarea' },
    { key: 'res1_zh', label: '研究方向1中文' },
    { key: 'res1_en', label: 'Research 1 English' },
    { key: 'res1_desc_zh', label: '研究方向1描述中文', type: 'textarea' },
    { key: 'res1_desc_en', label: 'Research 1 Desc English', type: 'textarea' },
    { key: 'res2_zh', label: '研究方向2中文' },
    { key: 'res2_en', label: 'Research 2 English' },
    { key: 'res2_desc_zh', label: '研究方向2描述中文', type: 'textarea' },
    { key: 'res2_desc_en', label: 'Research 2 Desc English', type: 'textarea' },
    { key: 'res3_zh', label: '研究方向3中文' },
    { key: 'res3_en', label: 'Research 3 English' },
    { key: 'res3_desc_zh', label: '研究方向3描述中文', type: 'textarea' },
    { key: 'res3_desc_en', label: 'Research 3 Desc English', type: 'textarea' }
  ];

  let siteContent = {};
  const certRenderers = [];

  function byQuery(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  }

  function setYear() {
    byQuery('[data-year]').forEach((el) => {
      el.textContent = String(new Date().getFullYear());
    });
  }

  function initLanguage() {
    const saved = localStorage.getItem(STORAGE_KEYS.lang);
    const browserLang = navigator.language && navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';
    const lang = saved || browserLang;
    setLanguage(lang);

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

    certRenderers.forEach((render) => render());
  }

  function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEYS.theme);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    setTheme(theme);

    const toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) {
      toggle.addEventListener('click', () => {
        const current = document.body.dataset.theme === 'dark' ? 'dark' : 'light';
        setTheme(current === 'dark' ? 'light' : 'dark');
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
        { threshold: 0.45, rootMargin: '-20% 0px -45% 0px' }
      );

      sectionMap.forEach(({ section }) => observer.observe(section));
    }

    links.forEach((link) => {
      link.addEventListener('click', () => {
        const target = link.getAttribute('href').slice(1);
        setActive(target);
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
      { threshold: 0.16 }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  function initAvatarUpload() {
    const avatarImg = document.querySelector('[data-avatar-image]');
    if (!avatarImg) {
      return;
    }

    const uploadInput = document.querySelector('[data-avatar-input]');
    const uploadTrigger = document.querySelector('[data-avatar-trigger]');
    const resetBtn = document.querySelector('[data-avatar-reset]');
    const status = document.querySelector('[data-avatar-status]');

    const savedAvatar = localStorage.getItem(STORAGE_KEYS.avatar);
    if (savedAvatar) {
      avatarImg.src = savedAvatar;
      if (status) {
        status.textContent = 'Avatar loaded from local storage.';
      }
    }

    if (uploadTrigger && uploadInput) {
      uploadTrigger.addEventListener('click', () => uploadInput.click());
    }

    if (uploadInput) {
      uploadInput.addEventListener('change', (event) => {
        const file = event.target.files && event.target.files[0];
        if (!file) {
          return;
        }

        if (!file.type.startsWith('image/')) {
          if (status) {
            status.textContent = 'Please upload an image file.';
          }
          return;
        }

        if (file.size > 5 * 1024 * 1024) {
          if (status) {
            status.textContent = 'Image too large. Keep it under 5MB.';
          }
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          const result = typeof reader.result === 'string' ? reader.result : '';
          if (!result) {
            return;
          }

          avatarImg.src = result;
          localStorage.setItem(STORAGE_KEYS.avatar, result);
          if (status) {
            status.textContent = 'Avatar updated and saved in your browser.';
          }
        };
        reader.readAsDataURL(file);
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        avatarImg.src = 'assets/img/avatar-placeholder.svg';
        localStorage.removeItem(STORAGE_KEYS.avatar);
        if (status) {
          status.textContent = 'Avatar reset to default placeholder.';
        }
        if (uploadInput) {
          uploadInput.value = '';
        }
      });
    }
  }

  function initCertificates() {
    const managers = byQuery('[data-cert-manager]');
    if (managers.length === 0) {
      return;
    }

    managers.forEach((manager) => {
      const skill = manager.dataset.certManager;
      const form = manager.querySelector('.cert-form');
      const list = manager.querySelector('.cert-list');
      const empty = manager.querySelector('.empty');
      const storageKey = `ll_certificates_${skill}`;

      if (!form || !list) {
        return;
      }

      const readItems = () => {
        try {
          const raw = localStorage.getItem(storageKey);
          const parsed = raw ? JSON.parse(raw) : [];
          return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
          return [];
        }
      };

      const saveItems = (items) => {
        localStorage.setItem(storageKey, JSON.stringify(items));
      };

      const render = () => {
        const items = readItems();
        const removeLabel = document.body.dataset.lang === 'zh' ? '删除' : 'Remove';
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
          const li = document.createElement('li');
          li.className = 'list-item';

          const head = document.createElement('div');
          head.className = 'head';
          head.innerHTML = `<strong>${escapeHtml(item.name)}</strong>`;

          const removeBtn = document.createElement('button');
          removeBtn.type = 'button';
          removeBtn.className = 'btn subtle';
          removeBtn.textContent = removeLabel;
          removeBtn.addEventListener('click', () => {
            const next = readItems().filter((_, i) => i !== index);
            saveItems(next);
            render();
          });

          head.appendChild(removeBtn);

          const meta = document.createElement('div');
          meta.className = 'meta';
          const parts = [item.issuer, item.date].filter(Boolean).map(escapeHtml);
          meta.textContent = parts.join(' | ');

          li.appendChild(head);
          if (parts.length > 0) {
            li.appendChild(meta);
          }

          if (item.link) {
            const link = document.createElement('a');
            link.href = item.link;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.className = 'meta';
            link.textContent = item.link;
            li.appendChild(link);
          }

          list.appendChild(li);
        });
      };

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = form.querySelector('[name="name"]');
        const issuer = form.querySelector('[name="issuer"]');
        const date = form.querySelector('[name="date"]');
        const link = form.querySelector('[name="link"]');

        if (!name || !name.value.trim()) {
          name && name.focus();
          return;
        }

        const next = readItems();
        next.unshift({
          name: name.value.trim(),
          issuer: issuer ? issuer.value.trim() : '',
          date: date ? date.value.trim() : '',
          link: link ? link.value.trim() : ''
        });

        saveItems(next);
        form.reset();
        render();
      });

      certRenderers.push(render);
      render();
    });
  }

  function loadSiteContent() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.siteContent);
      const parsed = raw ? JSON.parse(raw) : {};
      return { ...DEFAULT_CONTENT, ...(parsed || {}) };
    } catch (error) {
      return { ...DEFAULT_CONTENT };
    }
  }

  function saveSiteContent(content) {
    localStorage.setItem(STORAGE_KEYS.siteContent, JSON.stringify(content));
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
    const openBtn = document.querySelector('[data-admin-open]');
    const closeBtn = document.querySelector('[data-admin-close]');
    const overlay = document.querySelector('[data-admin-overlay]');
    const panel = document.querySelector('[data-admin-panel]');
    const authWrap = document.querySelector('[data-admin-auth]');
    const editorWrap = document.querySelector('[data-admin-editor]');
    const passwordInput = document.querySelector('[data-admin-password]');
    const loginBtn = document.querySelector('[data-admin-login]');
    const setupBtn = document.querySelector('[data-admin-setup]');
    const changeBtn = document.querySelector('[data-admin-change]');
    const authStatus = document.querySelector('[data-admin-auth-status]');
    const fieldsWrap = document.querySelector('[data-admin-fields]');
    const saveBtn = document.querySelector('[data-admin-save]');
    const resetBtn = document.querySelector('[data-admin-reset]');
    const exportBtn = document.querySelector('[data-admin-export]');
    const importTrigger = document.querySelector('[data-admin-import-trigger]');
    const importInput = document.querySelector('[data-admin-import]');
    const logoutBtn = document.querySelector('[data-admin-logout]');
    const editStatus = document.querySelector('[data-admin-edit-status]');

    if (!panel || !fieldsWrap) {
      return;
    }

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

    const isLoggedIn = () => localStorage.getItem(STORAGE_KEYS.adminSession) === '1';
    const hasPassword = () => !!localStorage.getItem(STORAGE_KEYS.adminHash);

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

    const buildFieldForm = () => {
      fieldsWrap.innerHTML = '';
      EDITABLE_FIELDS.forEach((field) => {
        const row = document.createElement('div');
        row.style.display = 'grid';
        row.style.gap = '0.3rem';

        const label = document.createElement('label');
        label.className = 'admin-note';
        label.textContent = field.label;

        const control = document.createElement(field.type === 'textarea' ? 'textarea' : 'input');
        control.className = 'input';
        control.dataset.adminField = field.key;
        if (field.type !== 'textarea') {
          control.type = 'text';
        } else {
          control.rows = 3;
        }

        row.appendChild(label);
        row.appendChild(control);
        fieldsWrap.appendChild(row);
      });
    };

    const fillFields = () => {
      byQuery('[data-admin-field]', fieldsWrap).forEach((input) => {
        const key = input.dataset.adminField;
        input.value = Object.prototype.hasOwnProperty.call(siteContent, key) ? siteContent[key] : '';
      });
    };

    const readFields = () => {
      const next = { ...siteContent };
      byQuery('[data-admin-field]', fieldsWrap).forEach((input) => {
        next[input.dataset.adminField] = input.value.trim();
      });
      return next;
    };

    const refreshAuthView = () => {
      const logged = isLoggedIn();
      if (editorWrap) {
        editorWrap.hidden = !logged;
      }
      if (changeBtn) {
        changeBtn.hidden = !logged;
      }

      if (!hasPassword()) {
        setAuthStatus('No admin password yet. Use "Set Initial Password" first.');
      } else if (!logged) {
        setAuthStatus('Password is set. Login to edit content.');
      } else {
        setAuthStatus('Logged in. You can edit and save content now.');
      }

      if (logged) {
        fillFields();
      }
    };

    buildFieldForm();
    fillFields();
    refreshAuthView();

    openBtn && openBtn.addEventListener('click', openPanel);
    closeBtn && closeBtn.addEventListener('click', closePanel);
    overlay && overlay.addEventListener('click', closePanel);

    setupBtn && setupBtn.addEventListener('click', async () => {
      const pwd = passwordInput ? passwordInput.value.trim() : '';
      if (!pwd) {
        setAuthStatus('Enter a password first, then click setup.');
        return;
      }
      const hash = await hashPassword(pwd);
      localStorage.setItem(STORAGE_KEYS.adminHash, hash);
      localStorage.setItem(STORAGE_KEYS.adminSession, '1');
      if (passwordInput) {
        passwordInput.value = '';
      }
      setEditStatus('Admin password created.');
      refreshAuthView();
    });

    loginBtn && loginBtn.addEventListener('click', async () => {
      if (!hasPassword()) {
        setAuthStatus('No password found. Please set initial password first.');
        return;
      }
      const pwd = passwordInput ? passwordInput.value.trim() : '';
      if (!pwd) {
        setAuthStatus('Please enter password.');
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
        setAuthStatus('Password incorrect.');
      }
    });

    changeBtn && changeBtn.addEventListener('click', async () => {
      const newPwd = window.prompt('Set new admin password:');
      if (!newPwd || !newPwd.trim()) {
        return;
      }
      const hash = await hashPassword(newPwd.trim());
      localStorage.setItem(STORAGE_KEYS.adminHash, hash);
      setEditStatus('Admin password changed.');
    });

    saveBtn && saveBtn.addEventListener('click', () => {
      if (!isLoggedIn()) {
        setEditStatus('Please login first.');
        return;
      }
      siteContent = readFields();
      saveSiteContent(siteContent);
      applySiteContent(siteContent);
      setEditStatus('Saved and applied successfully.');
    });

    resetBtn && resetBtn.addEventListener('click', () => {
      if (!isLoggedIn()) {
        setEditStatus('Please login first.');
        return;
      }
      const ok = window.confirm('Reset all editable content to defaults?');
      if (!ok) {
        return;
      }
      siteContent = { ...DEFAULT_CONTENT };
      saveSiteContent(siteContent);
      applySiteContent(siteContent);
      fillFields();
      setEditStatus('Reset to defaults completed.');
    });

    exportBtn && exportBtn.addEventListener('click', () => {
      const data = JSON.stringify(siteContent, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'site-content.json';
      a.click();
      URL.revokeObjectURL(url);
      setEditStatus('JSON exported.');
    });

    importTrigger && importTrigger.addEventListener('click', () => {
      importInput && importInput.click();
    });

    importInput && importInput.addEventListener('change', (event) => {
      const file = event.target.files && event.target.files[0];
      if (!file) {
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(String(reader.result || '{}'));
          siteContent = { ...DEFAULT_CONTENT, ...parsed };
          saveSiteContent(siteContent);
          applySiteContent(siteContent);
          fillFields();
          setEditStatus('JSON imported and applied.');
        } catch (error) {
          setEditStatus('Invalid JSON file.');
        }
      };
      reader.readAsText(file, 'utf-8');
      importInput.value = '';
    });

    logoutBtn && logoutBtn.addEventListener('click', () => {
      localStorage.removeItem(STORAGE_KEYS.adminSession);
      refreshAuthView();
      setEditStatus('Logged out.');
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
          status.textContent = 'Please set your real contact email in admin panel first.';
        }
        return;
      }

      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:${targetEmail}?subject=Website Contact&body=${body}`;

      if (status) {
        status.textContent = 'Mail client opened. You can edit and send the message.';
      }
    });
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function init() {
    setYear();
    initLanguage();
    initTheme();
    initSiteContent();
    initAnchorNav();
    initReveal();
    initAvatarUpload();
    initCertificates();
    initAdminPanel();
    initContactForm();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
