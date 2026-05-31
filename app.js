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

const budgetTemplates = {
  kakeibo: [["Food", "Daily log limit", "Rp 1.600.000"], ["Transport", "Commute tracker", "Rp 900.000"], ["Impulse", "Review weekly", "Rp 600.000"]],
  rule503020: [["Needs", "Rent, food, transport", "Rp 4.000.000"], ["Wants", "Fun money & lifestyle", "Rp 2.400.000"], ["Savings", "Goals and debt payoff", "Rp 1.600.000"]],
  zero: [["Bills", "Fixed commitments", "Rp 3.200.000"], ["Spending", "Flexible envelopes", "Rp 2.100.000"], ["Assigned", "Savings + investing", "Rp 2.700.000"]],
  sinking: [["Emergency", "Safety fund", "Rp 1.500.000"], ["Wedding", "Target fund", "Rp 2.000.000"], ["Lifestyle", "Monthly spending", "Rp 2.300.000"]],
  fire: [["Essentials", "Lean living", "Rp 3.000.000"], ["Invest", "Aggressive allocation", "Rp 3.500.000"], ["Buffer", "Cash reserve", "Rp 1.500.000"]],
};

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

function resetQuiz() {
  setState({ quizIndex: 0, scores: Object.fromEntries(Object.keys(methods).map((key) => [key, 0])), selectedMethod: "rule503020" });
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
  const scores = state.scores || Object.fromEntries(Object.keys(methods).map((key) => [key, 0]));
  let quizIndex = Number(state.quizIndex || 0);
  let selected = "";
  const back = document.querySelector("#quizBack");
  const bar = document.querySelector("#quizBar");
  const count = document.querySelector("#quizCount");
  const question = document.querySelector("#quizQuestion");
  const options = document.querySelector("#quizOptions");
  const next = document.querySelector("#quizNext");

  function render() {
    const current = questions[quizIndex];
    selected = "";
    back.hidden = quizIndex === 0;
    bar.style.width = `${((quizIndex + 1) / questions.length) * 100}%`;
    count.textContent = `Question ${quizIndex + 1}/5`;
    question.textContent = current.question;
    next.textContent = "Pilih jawaban dulu";
    options.innerHTML = current.options.map(([label, value, hint], index) => `
      <button class="option-card" type="button" data-value="${value}">
        <span class="option-mark">${index + 1}</span>
        <span class="option-text"><strong>${label}</strong><span>${hint}</span></span>
      </button>
    `).join("");
    setState({ quizIndex, scores });
  }

  options.addEventListener("click", (event) => {
    const option = event.target.closest(".option-card");
    if (!option) return;
    selected = option.dataset.value;
    options.querySelectorAll(".option-card").forEach((card) => card.classList.remove("selected"));
    option.classList.add("selected");
    next.textContent = quizIndex === questions.length - 1 ? "Lihat rekomendasi ->" : "Lanjut ->";
  });

  next.addEventListener("click", () => {
    if (!selected) return;
    scores[selected] += 1;
    if (quizIndex < questions.length - 1) {
      quizIndex += 1;
      render();
    } else {
      const selectedMethod = topMethod(scores);
      setState({ scores, selectedMethod });
      location.href = "result.html";
    }
  });

  back.addEventListener("click", () => {
    quizIndex = Math.max(0, quizIndex - 1);
    render();
  });

  render();
}

function renderResult(methodKey) {
  const data = methods[methodKey];
  document.querySelector("#profileMedal").dataset.logo = profileLogos[methodKey];
  document.querySelector("#resultBadge").textContent = data.badge;
  document.querySelector("#resultMethod").textContent = data.method;
  document.querySelector("#resultCopy").textContent = data.copy;
  document.querySelector("#methodGrid").innerHTML = Object.entries(methods).map(([key, item]) => `
    <button class="method-choice ${key === methodKey ? "active" : ""}" type="button" data-method="${key}">
      <span class="method-copy"><strong>${item.method}</strong><span>${item.badge}</span></span>
      <span class="method-logo" data-logo="${profileLogos[key]}" aria-hidden="true"><i></i></span>
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
  const methodKey = getState().selectedMethod || "rule503020";
  const data = methods[methodKey];
  document.querySelector("#budgetIntro").textContent = `Template awal dibuat otomatis untuk ${data.method}. Kamu masih bisa ubah semua limit setelah masuk dashboard.`;
  document.querySelector("#allocation").innerHTML = renderAllocation(methodKey);
  document.querySelector("#budgetList").innerHTML = budgetTemplates[methodKey].map(([name, hint, limit], index) => `
    <div class="budget-item">
      <i>${index + 1}</i>
      <div><strong>${name}</strong><span>${hint}</span></div>
      <em>${limit}</em>
    </div>
  `).join("");
}

const page = document.body.dataset.page;
if (page === "onboarding") initOnboarding();
if (page === "auth") initAuth();
if (page === "quiz") initQuiz();
if (page === "result") initResult();
if (page === "budget-preview") initBudgetPreview();
