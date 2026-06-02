const methods = {
  kakeibo: {
    method: "Okane Kakeibo",
    badge: "The Zen Accountant",
    copy: "Kamu butuh sistem pencatatan yang bikin sadar uang pergi ke mana, tanpa terasa seperti spreadsheet horor.",
    allocation: [["Daily", "Log detail"], ["Weekly", "Reflect"], ["Save", "Adjust"]],
  },
  rule503020: {
    method: "50/30/20 Rule",
    badge: "The Balanced Harmonist",
    copy: "Kamu cocok dengan pembagian simpel: kebutuhan aman, lifestyle tetap hidup, tabungan jalan.",
    allocation: [["50%", "Needs"], ["30%", "Wants"], ["20%", "Save"]],
  },
  zero: {
    method: "Zero-Based Budgeting",
    badge: "The Money Architect",
    copy: "Kamu suka kontrol penuh. Setiap rupiah akan punya tugas jelas sebelum sempat kabur ke checkout.",
    allocation: [["100%", "Assigned"], ["0", "Idle cash"], ["Full", "Control"]],
  },
  sinking: {
    method: "Sinking Fund Strategy",
    badge: "The Goal Crusher",
    copy: "Kamu paling kuat saat uang diarahkan ke target spesifik: nikah, laptop, liburan, atau emergency fund.",
    allocation: [["Goal", "Named"], ["Auto", "Contribute"], ["Track", "Progress"]],
  },
  fire: {
    method: "FIRE Mode",
    badge: "The Freedom Fighter",
    copy: "Kamu siap mode agresif: tekan pengeluaran, naikin saving rate, dan fokus kebebasan finansial.",
    allocation: [["Lean", "Spend"], ["High", "Invest"], ["Early", "Freedom"]],
  },
};

const profileLogos = {
  kakeibo: "zen",
  rule503020: "balance",
  zero: "architect",
  sinking: "goal",
  fire: "fire",
};

const profileBadges = {
  kakeibo: "assets/badges/badge_zen_accountant.svg",
  rule503020: "assets/badges/badge_balanced_harmonist.svg",
  zero: "assets/badges/badge_money_architect.svg",
  sinking: "assets/badges/badge_goal_crusher.svg",
  fire: "assets/badges/badge_freedom_fighter.svg",
};

const profileCardThemes = {
  kakeibo: { a: "#6fcf6f", b: "#2d5a2d", c: "#0a180a", glow: "#7fdf7f" },
  rule503020: { a: "#7abcf8", b: "#3a6ab0", c: "#080d1a", glow: "#5aaaf0" },
  zero: { a: "#f0c040", b: "#b08020", c: "#0d0a02", glow: "#f0c040" },
  sinking: { a: "#ee88ff", b: "#8a20b0", c: "#0a030e", glow: "#cc55ee" },
  fire: { a: "#ff7020", b: "#cc2000", c: "#080200", glow: "#ffcc40" },
};

const budgetTemplates = {
  kakeibo: [["Food", "Daily log limit", "Rp 1.600.000"], ["Transport", "Commute tracker", "Rp 900.000"], ["Impulse", "Review weekly", "Rp 600.000"]],
  rule503020: [["Needs", "Rent, food, transport", "Rp 4.000.000"], ["Wants", "Fun money & lifestyle", "Rp 2.400.000"], ["Savings", "Goals and debt payoff", "Rp 1.600.000"]],
  zero: [["Bills", "Fixed commitments", "Rp 3.200.000"], ["Spending", "Flexible envelopes", "Rp 2.100.000"], ["Assigned", "Savings + investing", "Rp 2.700.000"]],
  sinking: [["Emergency", "Safety fund", "Rp 1.500.000"], ["Wedding", "Target fund", "Rp 2.000.000"], ["Lifestyle", "Monthly spending", "Rp 2.300.000"]],
  fire: [["Essentials", "Lean living", "Rp 3.000.000"], ["Invest", "Aggressive allocation", "Rp 3.500.000"], ["Buffer", "Cash reserve", "Rp 1.500.000"]],
};

const profileRules = {
  kakeibo: {
    summary: "Catat semua income dan expense secara detail, lalu review kebiasaan belanja tiap minggu.",
    rules: [["Log", "Daily", "Semua transaksi masuk buku kas."], ["Reflect", "Weekly", "Lihat kategori yang paling bocor."], ["Adjust", "Next", "Turunkan limit setelah pola terlihat."]],
  },
  rule503020: {
    summary: "Bagi income bulanan ke tiga bucket besar supaya budgeting terasa ringan tapi tetap terarah.",
    rules: [["50%", "Needs", "Makan, sewa, transport, dan tagihan utama."], ["30%", "Wants", "Hiburan, jajan, belanja non-esensial."], ["20%", "Save", "Tabungan, goals, emergency fund, dan utang."]],
  },
  zero: {
    summary: "Setiap rupiah punya tugas sebelum bulan berjalan, jadi tidak ada uang yang menganggur.",
    rules: [["Assign", "Income", "Masukkan seluruh income ke kategori."], ["Zero", "Idle", "Sisa uang harus jelas tujuannya."], ["Review", "Priority", "Pindahkan dana saat prioritas berubah."]],
  },
  sinking: {
    summary: "Uang diarahkan ke target spesifik, lalu kontribusi rutin dibuat otomatis.",
    rules: [["Name", "Goal", "Buat target yang jelas."], ["Split", "Monthly", "Cicil dana sedikit demi sedikit."], ["Track", "Progress", "Pantau progress sampai siap dipakai."]],
  },
  fire: {
    summary: "Mode agresif untuk menekan expense dan memperbesar porsi investasi jangka panjang.",
    rules: [["Lean", "Spend", "Potong expense yang tidak penting."], ["Grow", "Invest", "Naikkan saving dan investing rate."], ["Freedom", "Plan", "Hitung jalan menuju pensiun dini."]],
  },
};

function formatIDR(value) {
  const number = Number(value || 0);
  if (!Number.isFinite(number)) return "0";
  return number.toLocaleString("id-ID");
}

function parseIDRString(value) {
  const digits = String(value || "").replace(/[^\d]/g, "");
  const parsed = Number(digits || 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function roundTo(value, step) {
  const number = Number(value || 0);
  if (!Number.isFinite(number) || !step) return 0;
  return Math.round(number / step) * step;
}

function getDefaultAccounts() {
  return [
    { id: "bank", name: "Tabungan", provider: "Bank", balance: 12450000 },
    { id: "gopay", name: "GoPay", provider: "E-wallet", balance: 350000 },
    { id: "cash", name: "Cash", provider: "Dompet", balance: 120000 },
    { id: "gold_online", name: "Emas online", provider: "Treasury", balance: 7600000, meta: "Online · 6.4g" },
    { id: "gold_physical", name: "Emas fisik", provider: "Antam", balance: 7200000, meta: "Fisik · 6.0g" },
    { id: "stocks", name: "Saham", provider: "Bibit", balance: 4250000, meta: "Investasi · 3 emiten" },
  ];
}

function ensureAccountsSeed(accounts) {
  const defaults = getDefaultAccounts();
  const existing = Array.isArray(accounts) ? accounts : [];
  const legacyGold = existing.find((item) => item?.id === "gold");
  const migratedExisting = legacyGold ? [
    ...existing.filter((item) => item?.id !== "gold"),
    {
      id: "gold_online",
      name: "Emas online",
      provider: "Treasury",
      balance: roundTo((Number(legacyGold.balance) || 0) * 0.52, 50000),
      meta: "Online · 6.4g",
    },
    {
      id: "gold_physical",
      name: "Emas fisik",
      provider: "Antam",
      balance: Math.max(0, (Number(legacyGold.balance) || 0) - roundTo((Number(legacyGold.balance) || 0) * 0.52, 50000)),
      meta: "Fisik · 6.0g",
    },
  ] : existing;
  const merged = defaults.map((fallback) => {
    const current = migratedExisting.find((item) => item?.id === fallback.id);
    return current ? { ...fallback, ...current } : fallback;
  });
  return merged;
}

function parseGoldGram(meta) {
  const matched = String(meta || "").match(/(\d+(?:\.\d+)?)g/i);
  return Number(matched?.[1] || 0);
}

function generateInitialBudgets(methodKey, monthlyIncome) {
  const templates = budgetTemplates[methodKey] || budgetTemplates.rule503020;
  const parsedTemplates = templates.map(([name, hint, limit]) => ({
    name,
    hint,
    baseLimit: parseIDRString(limit),
  }));

  const baseTotal = parsedTemplates.reduce((sum, item) => sum + item.baseLimit, 0) || 1;
  const scale = monthlyIncome / baseTotal;
  const rounded = parsedTemplates.map((item) => ({
    name: item.name,
    hint: item.hint,
    limit: roundTo(item.baseLimit * scale, 50000),
  }));

  const roundedTotal = rounded.reduce((sum, item) => sum + item.limit, 0);
  const delta = monthlyIncome - roundedTotal;
  if (rounded.length) rounded[rounded.length - 1].limit += delta;

  return rounded.map((item) => ({
    name: item.name,
    hint: item.hint,
    limit: Math.max(0, item.limit),
  }));
}

const intros = [
  {
    art: "cashflow",
    title: "Budget kamu, tapi lebih waras.",
    copy: "Catat cashflow, pilih metode budgeting yang cocok, lalu app bantu setup kategori otomatis dari income kamu.",
  },
  {
    art: "quiz",
    title: "Quiz dulu, baru budgeting.",
    copy: "Jawab 5 pertanyaan soal spending, impulsif, goals, comfort level, dan risk appetite.",
  },
  {
    art: "gold",
    title: "Emas juga ikut ke-plan.",
    copy: "Track gram Antam, UBS, atau perhiasan. Goal bisa berbentuk uang maupun target gram.",
  },
];

const questions = [
  {
    question: "Bagaimana cara kamu biasanya mengatur pengeluaran?",
    options: [
      ["Catat detail setiap pengeluaran", "kakeibo", "Sadar uang pergi ke mana"],
      ["Bagi income ke kategori besar", "rule503020", "Simpel dan mudah dipantau"],
      ["Setiap rupiah harus ada alokasi", "zero", "Kontrol super rapi"],
      ["Nabung khusus untuk tujuan", "sinking", "Goal jadi pusat budgeting"],
      ["Hemat demi kebebasan finansial", "fire", "Long game mode"],
    ],
  },
  {
    question: "Kalau ada promo atau flash sale, biasanya kamu...",
    options: [
      ["Tahan diri, jarang tergoda", "zero", "Disiplin kamu lumayan tebal"],
      ["Kadang tergoda, masih kontrol", "rule503020", "Butuh batas fleksibel"],
      ["Sering tergoda", "kakeibo", "Perlu pencatatan detail"],
      ["Lebih baik diarahkan ke goal", "sinking", "Target bikin fokus"],
      ["Tidak tergoda, fokus investasi", "fire", "Mindset future-first"],
    ],
  },
  {
    question: "Apa prioritas utama kamu sekarang?",
    options: [
      ["Kontrol cashflow harian", "kakeibo", "Daily spending jadi jelas"],
      ["Balance kebutuhan dan keinginan", "rule503020", "Hidup tetap manusiawi"],
      ["Disiplin alokasi tiap rupiah", "zero", "Tidak ada uang nganggur"],
      ["Dana khusus nikah/gadget/liburan", "sinking", "Target spesifik"],
      ["Kebebasan finansial jangka panjang", "fire", "Agresif membangun aset"],
    ],
  },
  {
    question: "Kamu lebih nyaman dengan metode...",
    options: [
      ["Sederhana dan cepat", "rule503020", "Tidak ribet"],
      ["Detail dan disiplin", "kakeibo", "Pencatatan lengkap"],
      ["Setiap rupiah ada tugas", "zero", "Full allocation"],
      ["Fleksibel tapi target jelas", "sinking", "Goal-driven"],
      ["Hemat ekstrem demi masa depan", "fire", "Advanced mode"],
    ],
  },
  {
    question: "Fokus utama kamu dalam keuangan adalah...",
    options: [
      ["Mengurangi pengeluaran harian", "kakeibo", "Habit awareness"],
      ["Menabung untuk tujuan pendek", "sinking", "Progress nyata"],
      ["Menyeimbangkan hidup dan tabungan", "rule503020", "Stabil dulu"],
      ["Kontrol penuh setiap rupiah", "zero", "Precision budgeting"],
      ["Investasi besar untuk pensiun dini", "fire", "Financial freedom"],
    ],
  },
];

function getState() {
  return JSON.parse(sessionStorage.getItem("plannerState") || "{}");
}

function setState(patch) {
  sessionStorage.setItem("plannerState", JSON.stringify({ ...getState(), ...patch }));
}

function initialScores() {
  return Object.fromEntries(Object.keys(methods).map((key) => [key, 0]));
}

function resetQuiz() {
  setState({ quizIndex: 0, answers: [], scores: initialScores(), selectedMethod: "rule503020" });
}

function topMethod(scores) {
  return Object.entries(scores || {}).sort((a, b) => b[1] - a[1])[0]?.[0] || "rule503020";
}

function renderAllocation(methodKey) {
  return methods[methodKey].allocation.map(([value, label]) => `<div><strong>${value}</strong><span>${label}</span></div>`).join("");
}

function initOnboarding() {
  const title = document.querySelector("#introTitle");
  const copy = document.querySelector("#introCopy");
  const art = document.querySelector("#introArt");
  const dots = document.querySelector("#introDots");
  const left = document.querySelector("#introLeft");
  const next = document.querySelector("#introNext");
  let index = Number(sessionStorage.getItem("introIndex") || 0);
  if (!Number.isFinite(index) || index < 0 || index >= intros.length) index = 0;

  function goAuth() {
    window.location.assign(new URL("auth.html", window.location.href).href);
  }

  function render() {
    const current = intros[index];
    title.textContent = current.title;
    copy.textContent = current.copy;
    art.dataset.art = current.art;
    left.textContent = index === intros.length - 1 ? "Back" : "Skip";
    dots.innerHTML = intros.map((_, dotIndex) => `<span class="progress-dot ${dotIndex === index ? "active" : ""}"></span>`).join("");
    sessionStorage.setItem("introIndex", String(index));
  }

  left.addEventListener("click", () => {
    if (index === intros.length - 1) {
      index -= 1;
      render();
    } else {
      goAuth();
    }
  });

  next.addEventListener("click", () => {
    if (index < intros.length - 1) {
      index += 1;
      render();
    } else {
      goAuth();
    }
  });

  render();
}

function initAuth() {
  document.querySelectorAll("[data-start-quiz]").forEach((button) => {
    button.addEventListener("click", () => {
      resetQuiz();
      location.href = "quiz.html";
    });
  });
}

function initQuiz() {
  const state = getState();
  let quizIndex = Number(state.quizIndex || 0);
  let answers = Array.isArray(state.answers) ? state.answers : [];
  let selected = "";
  const back = document.querySelector("#quizBack");
  const bar = document.querySelector("#quizBar");
  const count = document.querySelector("#quizCount");
  const question = document.querySelector("#quizQuestion");
  const options = document.querySelector("#quizOptions");
  const next = document.querySelector("#quizNext");

  function render() {
    const current = questions[quizIndex];
    selected = answers[quizIndex] || "";
    back.hidden = quizIndex === 0;
    bar.style.width = `${((quizIndex + 1) / questions.length) * 100}%`;
    count.textContent = `Question ${quizIndex + 1}/5`;
    question.textContent = current.question;
    next.disabled = !selected;
    next.textContent = selected ? (quizIndex === questions.length - 1 ? "Lihat rekomendasi ->" : "Lanjut ->") : "Pilih jawaban dulu";
    options.innerHTML = current.options.map(([label, value, hint], index) => `
      <button class="option-card ${value === selected ? "selected" : ""}" type="button" data-value="${value}">
        <span class="option-mark">${index + 1}</span>
        <span class="option-text"><strong>${label}</strong><span>${hint}</span></span>
      </button>
    `).join("");
    setState({ quizIndex, answers });
  }

  options.addEventListener("click", (event) => {
    const option = event.target.closest(".option-card");
    if (!option) return;
    selected = option.dataset.value;
    options.querySelectorAll(".option-card").forEach((card) => card.classList.remove("selected"));
    option.classList.add("selected");
    next.disabled = false;
    next.textContent = quizIndex === questions.length - 1 ? "Lihat rekomendasi ->" : "Lanjut ->";
  });

  next.addEventListener("click", () => {
    if (!selected) return;
    answers[quizIndex] = selected;
    if (quizIndex < questions.length - 1) {
      quizIndex += 1;
      render();
    } else {
      const scores = initialScores();
      answers.forEach((answer) => {
        if (scores[answer] !== undefined) scores[answer] += 1;
      });
      const selectedMethod = topMethod(scores);
      setState({ quizIndex, answers, scores, selectedMethod });
      location.href = "result.html";
    }
  });

  back.addEventListener("click", () => {
    if (quizIndex === 0) return;
    quizIndex -= 1;
    render();
  });

  render();
}

function renderResult(methodKey) {
  const data = methods[methodKey];
  const resultCard = document.querySelector(".result-card");
  const theme = profileCardThemes[methodKey];
  if (resultCard && theme) {
    resultCard.style.setProperty("--result-grad-a", theme.a);
    resultCard.style.setProperty("--result-grad-b", theme.b);
    resultCard.style.setProperty("--result-grad-c", theme.c);
    resultCard.style.setProperty("--result-glow", theme.glow);
  }
  const medalImg = document.querySelector("#profileMedalImg");
  if (medalImg) medalImg.src = profileBadges[methodKey] || profileBadges.rule503020;
  document.querySelector("#resultBadge").textContent = data.badge;
  document.querySelector("#resultMethod").textContent = data.method;
  document.querySelector("#resultCopy").textContent = data.copy;
  document.querySelector("#methodGrid").innerHTML = Object.entries(methods).map(([key, item]) => `
    <button class="method-choice ${key === methodKey ? "active" : ""}" type="button" data-method="${key}">
      <span class="method-copy"><strong>${item.method}</strong><span>${item.badge}</span></span>
      <span class="method-logo" aria-hidden="true"><img class="badge-svg" alt="" src="${profileBadges[key] || profileBadges.rule503020}" /></span>
    </button>
  `).join("");
}

function initResult() {
  let selectedMethod = getState().selectedMethod || "rule503020";
  renderResult(selectedMethod);
  document.querySelector("#methodGrid").addEventListener("click", (event) => {
    const button = event.target.closest("[data-method]");
    if (!button) return;
    selectedMethod = button.dataset.method;
    setState({ selectedMethod });
    renderResult(selectedMethod);

    const backdrop = document.querySelector("[data-sheet='method']");
    if (backdrop) {
      backdrop.classList.remove("open");
      backdrop.setAttribute("aria-hidden", "true");
    }
  });
  document.querySelector("#previewBudget").addEventListener("click", () => {
    setState({ selectedMethod });
    location.href = "budget-preview.html";
  });
  document.querySelector("#restartQuiz").addEventListener("click", () => {
    resetQuiz();
    location.href = "quiz.html";
  });
}

function initBudgetPreview() {
  let methodKey = getState().selectedMethod || "rule503020";
  function updateIntro() {
    const data = methods[methodKey];
    const intro = document.querySelector("#budgetIntro");
    if (intro) intro.textContent = `Biar auto-budget kamu pas, masukin dulu income bulanan. Metode kamu: ${data.method}.`;
  }
  updateIntro();

  const incomeInput = document.querySelector("#monthlyIncome");
  const continueButton = document.querySelector("#budgetContinue");
  if (!incomeInput || !continueButton) return;

  function parseIncome(raw) {
    const digits = String(raw || "").replace(/[^\d]/g, "");
    const parsed = Number(digits || 0);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function setIncome(value) {
    const parsed = parseIncome(value);
    continueButton.disabled = parsed <= 0;
    incomeInput.value = parsed ? formatIDR(parsed) : "";
    return parsed;
  }

  const existingIncome = getState().monthlyIncome;
  if (typeof existingIncome === "number" && Number.isFinite(existingIncome) && existingIncome > 0) {
    setIncome(existingIncome);
  }

  incomeInput.addEventListener("input", () => {
    setIncome(incomeInput.value);
  });

  incomeInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    if (continueButton.disabled) return;
    continueButton.click();
  });

  document.querySelectorAll("[data-income]").forEach((button) => {
    button.addEventListener("click", () => {
      setIncome(button.dataset.income);
      incomeInput.focus();
    });
  });

  continueButton.addEventListener("click", () => {
    const parsed = parseIncome(incomeInput.value);
    if (!parsed) return;
    const budgets = generateInitialBudgets(methodKey, parsed);
    setState({ selectedMethod: methodKey, monthlyIncome: parsed, budgets });
    location.href = "dashboard.html";
  });
}

function initDashboard() {
  const highlightCard = document.querySelector("#dashboardHighlight");
  const closeHighlight = document.querySelector("[data-close-highlight]");
  if (highlightCard && closeHighlight) {
    closeHighlight.addEventListener("click", () => {
      highlightCard.hidden = true;
    });
  }

  const budgetList = document.querySelector("#dashboardBudgetList");
  if (!budgetList) return;
  const state = getState();
  if (!state?.budgets?.length) return;
  const methodKey = state.selectedMethod || "rule503020";
  const heroCard = document.querySelector(".home-hero-card");
  const heroTheme = profileCardThemes[methodKey];
  if (heroCard && heroTheme) {
    heroCard.style.setProperty("--hero-grad-a", heroTheme.a);
    heroCard.style.setProperty("--hero-grad-b", heroTheme.b);
    heroCard.style.setProperty("--hero-grad-c", heroTheme.c);
    heroCard.style.setProperty("--hero-glow", heroTheme.glow);
  }

  const accounts = ensureAccountsSeed(state.accounts);
  if (JSON.stringify(state.accounts || []) !== JSON.stringify(accounts)) setState({ accounts });
  const accountsSum = accounts.reduce((sum, acc) => sum + (Number(acc.balance) || 0), 0);

  const spendRatios = [0.62, 0.38, 0.74, 0.45, 0.28];
  let totalLimit = 0;
  let totalSpent = 0;
  budgetList.innerHTML = state.budgets.slice(0, 5).map((item, index) => {
    const ratio = spendRatios[index % spendRatios.length];
    const spent = roundTo(item.limit * ratio, 10000);
    const remaining = Math.max(0, item.limit - spent);
    const pct = Math.min(100, Math.max(0, Math.round((spent / Math.max(1, item.limit)) * 100)));
    totalLimit += item.limit;
    totalSpent += spent;
    return `
      <div class="budget-item budget-item-meter" style="--value: ${pct}%">
        <i>${index + 1}</i>
        <div>
          <strong>${item.name}</strong>
          <span>Limit Rp ${formatIDR(item.limit)} · Spent Rp ${formatIDR(spent)}</span>
          <div class="progress-track budget-meter"><i></i></div>
        </div>
        <em>Rp ${formatIDR(remaining)}</em>
      </div>
    `;
  }).join("");

  // Monthly income label removed from dashboard budget header.

  const dateLabel = document.querySelector("#dashboardDateLabel");
  if (dateLabel) {
    const now = new Date();
    dateLabel.textContent = now.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "short" });
  }

  const totalRemaining = Math.max(0, totalLimit - totalSpent);
  const spentPct = totalLimit ? Math.round((totalSpent / totalLimit) * 100) : 0;

  const heroRemaining = document.querySelector("#heroRemaining");
  if (heroRemaining) heroRemaining.textContent = `Rp ${formatIDR(totalRemaining)}`;

  const heroSpentPct = document.querySelector("#heroSpentPct");
  if (heroSpentPct) heroSpentPct.textContent = `${Math.min(100, Math.max(0, spentPct))}%`;

  const heroSpentTotal = document.querySelector("#heroSpentTotal");
  if (heroSpentTotal) heroSpentTotal.textContent = `Rp ${formatIDR(totalSpent)}`;

  const heroProgress = document.querySelector("#heroProgress");
  if (heroProgress) heroProgress.style.setProperty("--value", `${Math.min(100, Math.max(0, spentPct))}%`);

  const heroSavings = document.querySelector("#heroSavings");
  if (heroSavings) heroSavings.textContent = `Rp ${formatIDR(accountsSum)}`;

}

function initAccounts() {
  const state = getState();
  const accounts = ensureAccountsSeed(state.accounts);
  if (JSON.stringify(state.accounts || []) !== JSON.stringify(accounts)) setState({ accounts });

  const liquidAccountsList = document.querySelector("#liquidAccountsList");
  const assetAccountsList = document.querySelector("#assetAccountsList");
  const accountsTotal = document.querySelector("#accountsTotal");
  const icons = { bank: "🏦", gopay: "💳", cash: "💵", gold_online: "🪙", gold_physical: "🥇", stocks: "📈" };
  const renderAccountRow = (acc) => `
      <${acc.href ? "a" : "div"} class="account-row${acc.href ? " account-row-link" : ""}"${acc.href ? ` href="${acc.href}"` : ""}>
        <div class="account-icon" aria-hidden="true">${icons[acc.id] || "💰"}</div>
        <div class="account-main"><b>${acc.name}</b><span>${acc.meta ? `${acc.provider} · ${acc.meta}` : acc.provider}</span></div>
        <div class="account-balance">Rp ${formatIDR(acc.balance)}</div>
      </${acc.href ? "a" : "div"}>
    `;
  const liquidAccounts = accounts.filter((acc) => ["bank", "gopay", "cash"].includes(acc.id));
  const goldAccounts = accounts.filter((acc) => ["gold_online", "gold_physical"].includes(acc.id));
  const stockAccounts = accounts.filter((acc) => !["bank", "gopay", "cash", "gold_online", "gold_physical"].includes(acc.id));
  const totalGoldBalance = goldAccounts.reduce((sum, acc) => sum + (Number(acc.balance) || 0), 0);
  const totalGoldGram = goldAccounts.reduce((sum, acc) => {
    const matched = String(acc.meta || "").match(/(\d+(?:\.\d+)?)g/i);
    return sum + Number(matched?.[1] || 0);
  }, 0);
  const goldProviders = [...new Set(goldAccounts.map((acc) => acc.provider).filter(Boolean))];
  const assetAccounts = [
    ...(goldAccounts.length ? [{
      id: "gold_online",
      name: "Emas",
      provider: goldProviders.join(" + "),
      balance: totalGoldBalance,
      meta: `Online + fisik · ${totalGoldGram.toFixed(1)}g`,
      href: "gold.html",
    }] : []),
    ...stockAccounts,
  ];

  if (liquidAccountsList) {
    liquidAccountsList.innerHTML = liquidAccounts.map(renderAccountRow).join("");
  }
  if (assetAccountsList) {
    assetAccountsList.innerHTML = assetAccounts.map(renderAccountRow).join("");
  }
  if (accountsTotal) {
    const total = accounts.reduce((sum, acc) => sum + (Number(acc.balance) || 0), 0);
    accountsTotal.textContent = `Rp ${formatIDR(total)}`;
  }
}

function initGold() {
  const state = getState();
  const accounts = ensureAccountsSeed(state.accounts);
  if (JSON.stringify(state.accounts || []) !== JSON.stringify(accounts)) setState({ accounts });

  const goldAccounts = accounts.filter((acc) => ["gold_online", "gold_physical"].includes(acc.id));
  const totalValue = goldAccounts.reduce((sum, acc) => sum + (Number(acc.balance) || 0), 0);
  const totalGram = goldAccounts.reduce((sum, acc) => sum + parseGoldGram(acc.meta), 0);
  const avgPrice = totalGram ? Math.round(totalValue / totalGram) : 0;

  const totalValueEl = document.querySelector("#goldTotalValue");
  if (totalValueEl) totalValueEl.textContent = `Rp ${formatIDR(totalValue)}`;

  const heroMetaEl = document.querySelector("#goldHeroMeta");
  if (heroMetaEl) heroMetaEl.textContent = `${totalGram.toFixed(1)}g total kepemilikan`;

  const totalGramEl = document.querySelector("#goldTotalGram");
  if (totalGramEl) totalGramEl.textContent = `${totalGram.toFixed(1)}g`;

  const avgPriceEl = document.querySelector("#goldAvgPrice");
  if (avgPriceEl) avgPriceEl.textContent = `Rp ${formatIDR(avgPrice)}`;

  const breakdownMetaEl = document.querySelector("#goldBreakdownMeta");
  if (breakdownMetaEl) breakdownMetaEl.textContent = `${goldAccounts.length} sumber`;

  const breakdownListEl = document.querySelector("#goldBreakdownList");
  if (breakdownListEl) {
    breakdownListEl.innerHTML = goldAccounts.map((acc) => {
      const label = acc.id === "gold_online" ? "On" : "Fi";
      const kind = acc.id === "gold_online" ? "Online" : "Fisik";
      const gram = parseGoldGram(acc.meta);
      return `
        <div class="vault-item">
          <span class="vault-icon">${label}</span>
          <div>
            <b>${acc.name}</b>
            <span>${acc.provider} · ${kind} · ${gram.toFixed(1)}g</span>
          </div>
          <em>Rp ${formatIDR(acc.balance)}</em>
        </div>
      `;
    }).join("");
  }

  const notesListEl = document.querySelector("#goldNotesList");
  if (notesListEl) {
    notesListEl.innerHTML = goldAccounts.map((acc) => {
      const label = acc.id === "gold_online" ? "Tr" : "An";
      const note = acc.id === "gold_online"
        ? "Likuid, gampang top up, cocok buat akumulasi rutin."
        : "Cocok buat simpan jangka panjang dan koleksi fisik.";
      return `
        <div class="vault-item">
          <span class="vault-icon">${label}</span>
          <div>
            <b>${acc.provider}</b>
            <span>${note}</span>
          </div>
          <em>${acc.id === "gold_online" ? "Online" : "Fisik"}</em>
        </div>
      `;
    }).join("");
  }
}

function initProfile() {
  const methodKey = getState().selectedMethod || "rule503020";
  const data = methods[methodKey];
  const ruleData = profileRules[methodKey];
  const badgeImg = document.querySelector("#badgeRoomLogoImg");
  if (badgeImg) badgeImg.src = profileBadges[methodKey] || profileBadges.rule503020;
  document.querySelector("#profileBadgeName").textContent = data.badge;
  document.querySelector("#profileBadgeCopy").textContent = data.copy;
  document.querySelector("#profileMethodName").textContent = data.method;
  document.querySelector("#profileMethodCopy").textContent = ruleData.summary;
  document.querySelector("#profileRuleGrid").innerHTML = ruleData.rules.map(([value, label, copy], index) => `
    <div class="rule-card ${index === 1 ? "coral" : index === 2 ? "mint" : ""}">
      <strong>${value}</strong><span>${label}</span><p>${copy}</p>
    </div>
  `).join("");
}

function initRetakeLinks() {
  document.querySelectorAll("[data-retake-quiz]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      resetQuiz();
      location.href = "quiz.html";
    });
  });
}

function applyTheme() {
  document.body.classList.toggle("light-mode", sessionStorage.getItem("plannerTheme") === "light");
}

function initSettings() {
  const darkToggle = document.querySelector("[data-setting='dark-mode']");
  if (!darkToggle) return;
  darkToggle.checked = sessionStorage.getItem("plannerTheme") !== "light";
  darkToggle.addEventListener("change", () => {
    sessionStorage.setItem("plannerTheme", darkToggle.checked ? "dark" : "light");
    applyTheme();
  });
}

function initFilterChips() {
  document.querySelectorAll(".filter-row").forEach((row) => {
    row.addEventListener("click", (event) => {
      const chip = event.target.closest(".filter-chip");
      if (!chip) return;
      row.querySelectorAll(".filter-chip").forEach((item) => item.classList.remove("active"));
      chip.classList.add("active");
    });
  });
}

function initSheets() {
  const openButtons = document.querySelectorAll("[data-open-sheet]");
  const sheets = document.querySelectorAll("[data-sheet]");
  if (!openButtons.length && !sheets.length) return;

  function closeSheets() {
    sheets.forEach((sheet) => {
      sheet.classList.remove("open");
      sheet.setAttribute("aria-hidden", "true");
    });
  }

  const pendingSheet = sessionStorage.getItem("openSheet");
  if (pendingSheet) {
    const sheet = document.querySelector(`[data-sheet="${pendingSheet}"]`);
    if (sheet) {
      closeSheets();
      sheet.classList.add("open");
      sheet.setAttribute("aria-hidden", "false");
    }
    sessionStorage.removeItem("openSheet");
  }

  openButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const sheet = document.querySelector(`[data-sheet="${button.dataset.openSheet}"]`);
      if (!sheet) return;
      closeSheets();
      sheet.classList.add("open");
      sheet.setAttribute("aria-hidden", "false");
    });
  });

  sheets.forEach((sheet) => {
    sheet.addEventListener("click", (event) => {
      if (event.target === sheet || event.target.closest("[data-close-sheet]")) {
        closeSheets();
      }
    });

    sheet.querySelectorAll(".category-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const group = chip.parentElement;
        group.querySelectorAll(".category-chip").forEach((item) => item.classList.remove("active"));
        chip.classList.add("active");
      });
    });

    const amount = sheet.querySelector(".amount-value");
    if (amount) {
      let rawAmount = "";
      sheet.querySelectorAll("[data-key]").forEach((key) => {
        key.addEventListener("click", () => {
          const value = key.dataset.key;
          if (value === "clear") rawAmount = "";
          else if (value === "back") rawAmount = rawAmount.slice(0, -1);
          else rawAmount = `${rawAmount}${value}`.replace(/^0+/, "");
          const number = Number(rawAmount || 0);
          amount.textContent = `Rp ${number.toLocaleString("id-ID")}`;
        });
      });
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeSheets();
  });
}

function initNavAdd() {
  document.querySelectorAll("[data-nav-add]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const target = button.dataset.sheetTarget || "transaction";
      const localSheet = document.querySelector(`[data-sheet="${target}"]`);
      if (localSheet) {
        localSheet.classList.add("open");
        localSheet.setAttribute("aria-hidden", "false");
        return;
      }
      sessionStorage.setItem("openSheet", target);
      location.href = "dashboard.html";
    });
  });
}

function initBudgetPage() {
  const state = getState();
  const methodKey = state.selectedMethod || "rule503020";
  const method = methods[methodKey];
  let budgets = Array.isArray(state.budgets) ? state.budgets : [];

  const monthlyIncome = typeof state.monthlyIncome === "number" ? state.monthlyIncome : 0;
  const incomeEl = document.querySelector("#budgetMonthlyIncome");
  if (incomeEl) incomeEl.textContent = `Rp ${formatIDR(monthlyIncome)}`;

  const summaryEl = document.querySelector("#budgetMethodSummary");
  if (summaryEl) summaryEl.textContent = `Metode kamu: ${method?.method || "—"}. Kamu bisa edit kategori & limit kapan aja.`;

  const listEl = document.querySelector("#budgetPageList");
  if (!listEl) return;

  const editButton = document.querySelector("#editMonthlyIncome");
  const saveButton = document.querySelector("#saveMonthlyIncome");
  const editRow = document.querySelector("#budgetIncomeEdit");
  const inputEl = document.querySelector("#budgetMonthlyIncomeInput");

  function renderList() {
    const spendRatios = [0.62, 0.38, 0.74, 0.45, 0.28];
    let totalLimit = 0;
    let totalSpent = 0;

    listEl.innerHTML = budgets.map((item, index) => {
      const ratio = spendRatios[index % spendRatios.length];
      const spent = roundTo(item.limit * ratio, 10000);
      const remaining = Math.max(0, item.limit - spent);
      const pct = Math.min(100, Math.max(0, Math.round((spent / Math.max(1, item.limit)) * 100)));
      totalLimit += item.limit;
      totalSpent += spent;
      return `
        <div class="budget-item budget-item-meter" style="--value: ${pct}%">
          <i>${index + 1}</i>
          <div>
            <strong>${item.name}</strong>
            <span>Limit Rp ${formatIDR(item.limit)} · Spent Rp ${formatIDR(spent)}</span>
            <div class="progress-track budget-meter"><i></i></div>
          </div>
          <em>Rp ${formatIDR(remaining)}</em>
        </div>
      `;
    }).join("");

    const totalsSpentEl = document.querySelector("#budgetTotalsSpent");
    if (totalsSpentEl) totalsSpentEl.textContent = `Rp ${formatIDR(totalSpent)}`;
    const totalsLimitEl = document.querySelector("#budgetTotalsLimit");
    if (totalsLimitEl) totalsLimitEl.textContent = `Rp ${formatIDR(totalLimit)}`;
  }

  function setEditing(enabled) {
    if (!editRow || !inputEl || !incomeEl) return;
    editRow.hidden = !enabled;
    incomeEl.hidden = enabled;
    if (enabled) {
      const currentIncome = Number(getState().monthlyIncome || 0);
      inputEl.value = currentIncome ? formatIDR(currentIncome) : "";
      inputEl.focus();
    }
  }

  function saveIncome() {
    if (!inputEl || !incomeEl || !editRow) return;
    const nextIncome = parseIDRString(inputEl.value);
    if (!nextIncome) return;
    budgets = generateInitialBudgets(methodKey, nextIncome);
    setState({ monthlyIncome: nextIncome, budgets });
    incomeEl.textContent = `Rp ${formatIDR(nextIncome)}`;
    setEditing(false);
    renderList();
  }

  if (editButton && editRow && inputEl) {
    editButton.addEventListener("click", () => setEditing(true));
  }
  if (saveButton) saveButton.addEventListener("click", saveIncome);
  if (inputEl) {
    inputEl.addEventListener("keydown", (event) => {
      if (event.key === "Enter") saveIncome();
      if (event.key === "Escape") setEditing(false);
    });
  }

  const addButton = document.querySelector("#addBudgetCategory");
  if (addButton) {
    addButton.addEventListener("click", () => {
      alert("Coming soon: tambah & edit kategori budget.");
    });
  }

  renderList();
}

const page = document.body.dataset.page;
applyTheme();
if (page === "onboarding") initOnboarding();
if (page === "auth") initAuth();
if (page === "quiz") initQuiz();
if (page === "result") initResult();
if (page === "budget-preview") initBudgetPreview();
if (page === "dashboard") initDashboard();
if (page === "accounts") initAccounts();
if (page === "gold") initGold();
if (page === "budget") initBudgetPage();
if (page === "profile") initProfile();
if (page === "settings") initSettings();
initRetakeLinks();
initFilterChips();
initSheets();
initNavAdd();
