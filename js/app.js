/**
 * DARE TO BE DEL - Main Application State Coordinator
 * SMA UNGGUL DEL (SUD) - Angkatan 15 Edition
 * 
 * Features:
 * - 45 Levels across 3 Difficulty Modes (Easy, Medium, Hard)
 * - Single-Click Reset Button (Reset ke Level 1 & Waktu 00:00.0)
 * - Mode Selectors on Home Screen & In-Game Modal
 * - High-Performance 60fps Loop
 */

class App {
  constructor() {
    this.engine = null;
    this.currentScreen = 'home'; // 'home' | 'game'
    this.selectedGender = 'boy'; // 'boy' = Laut Pangaribuan, 'girl' = Biru Sinaga
    this.currentMode = 'easy'; // 'easy' | 'medium' | 'hard'

    this.selectedLevelIndex = 0;
    this.currentLevelIndex = 0;
    this.deaths = 0;
    this.elapsedSeconds = 0;
    this.timerInterval = null;
    this.lastFrameTime = 0;

    // Progression per difficulty mode
    this.unlockedLevels = { easy: 1, medium: 1, hard: 1 };
    this.completedLevels = { easy: [], medium: [], hard: [] };
    this.lastPlayedLevelIndex = { easy: 0, medium: 0, hard: 0 };

    // SMA Unggul Del & Asrama SUD Troll Quotes on Death
    this.deathQuotes = [
      "Waduh, belum submit tugas Diktat Olimpiade!",
      "Kena razia kerapian pamong asrama SUD!",
      "Kesandung saat lari apel pagi Angkatan 15!",
      "Panik gara-gara bel kurve asrama sudah berbunyi!",
      "Kepleset jalan turunan Danau Toba setelah gerimis!",
      "Lupa pasang Pin SUD dan Batch 15 di seragam!",
      "Kena tegur pamong karena dasi seragam miring!",
      "Ketinggalan barisan apel malam asrama!",
      "Baju dinas putih abu-abu belum disetrika licin!",
      "Salah masuk ruang belajar angkatan atas!"
    ];

    this.homeAnimTime = 0;
    this.init();
  }

  init() {
    this.loadSaveData();

    // Instantiate Engine
    this.engine = new GameEngine('gameCanvas');
    this.engine.charRenderer.setGender(this.selectedGender);
    this.engine.currentMode = this.currentMode;

    // Engine Event Callbacks
    this.engine.onPlayerDeath = (reason) => this.handlePlayerDeath(reason);
    this.engine.onLevelComplete = () => this.handleLevelComplete();

    // Setup UI Listeners & Controls
    this.initHomeScreenUI();
    this.initInGameUI();
    this.initMobileControls();
    this.initCharacterPreviews();
    this.startTimer();

    // Render Mode Tabs & Level Selection Grid
    this.updateHomeModeTabs();
    this.renderHomeLevelGrid();

    // Prevent any button from capturing Spacebar keypress
    document.addEventListener('click', () => {
      if (document.activeElement && typeof document.activeElement.blur === 'function') {
        document.activeElement.blur();
      }
    });

    // Start Master Animation & Game Loop
    this.mainLoop(performance.now());

    // Auto start BGM on first user interaction
    const startAudioOnce = () => {
      window.sound.startBGM();
      window.removeEventListener('pointerdown', startAudioOnce);
      window.removeEventListener('keydown', startAudioOnce);
    };
    window.addEventListener('pointerdown', startAudioOnce);
    window.addEventListener('keydown', startAudioOnce);
  }

  loadSaveData() {
    try {
      const saved = localStorage.getItem('daretobedel_save_v2');
      if (saved) {
        const data = JSON.parse(saved);
        this.deaths = data.deaths || 0;
        this.currentMode = data.currentMode || 'easy';
        this.unlockedLevels = data.unlockedLevels || { easy: 1, medium: 1, hard: 1 };
        this.completedLevels = data.completedLevels || { easy: [], medium: [], hard: [] };
        this.lastPlayedLevelIndex = data.lastPlayedLevelIndex || { easy: 0, medium: 0, hard: 0 };
        this.elapsedSeconds = data.elapsedSeconds || 0;

        if (data.gender) {
          this.selectedGender = data.gender;
        }

        const modeIdx = this.lastPlayedLevelIndex[this.currentMode] || 0;
        this.selectedLevelIndex = modeIdx;
        this.currentLevelIndex = modeIdx;
      }
    } catch (e) {
      console.warn("Could not load save data", e);
    }
  }

  saveData() {
    try {
      this.lastPlayedLevelIndex[this.currentMode] = this.currentLevelIndex;
      const data = {
        deaths: this.deaths,
        currentMode: this.currentMode,
        unlockedLevels: this.unlockedLevels,
        completedLevels: this.completedLevels,
        lastPlayedLevelIndex: this.lastPlayedLevelIndex,
        elapsedSeconds: this.elapsedSeconds,
        gender: this.selectedGender
      };
      localStorage.setItem('daretobedel_save_v2', JSON.stringify(data));
    } catch (e) {
      console.warn("Could not save data", e);
    }
  }

  // Single Button: Reset ke Level 1 dan Reset Waktu (00:00.0)
  resetLevelAndTimer() {
    window.sound.playReset();
    this.currentLevelIndex = 0;
    this.selectedLevelIndex = 0;
    this.elapsedSeconds = 0;
    this.deaths = 0;
    this.lastPlayedLevelIndex[this.currentMode] = 0;

    const elTimer = document.getElementById('hudTimer');
    if (elTimer) elTimer.textContent = '00:00.0';

    this.saveData();

    if (this.currentScreen === 'game') {
      this.loadLevel(0);
      this.showTrollToast("🔄 Level direset ke Level 1 & Stopwatch Waktu 00:00.0!");
    } else {
      this.renderHomeLevelGrid();
      this.showTrollToast("🔄 Progress direset ke Level 1 & Waktu 00:00.0!");
    }
    this.updateStatsHUD();
  }

  // ==========================================
  // HOME SCREEN LOGIC
  // ==========================================
  initHomeScreenUI() {
    // Mode Switcher Tabs on Home Screen
    document.querySelectorAll('.mode-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetMode = btn.getAttribute('data-mode');
        if (targetMode && this.currentMode !== targetMode) {
          window.sound.playSelect();
          this.currentMode = targetMode;
          this.engine.currentMode = targetMode;
          this.selectedLevelIndex = this.lastPlayedLevelIndex[targetMode] || 0;
          this.currentLevelIndex = this.selectedLevelIndex;
          this.updateHomeModeTabs();
          this.renderHomeLevelGrid();
          this.saveData();
        }
      });
    });

    // Character Select Cards on Home Screen
    const cardLuhut = document.getElementById('cardLuhut');
    const cardDevi = document.getElementById('cardDevi');

    if (cardLuhut && cardDevi) {
      const updateSelection = (gender) => {
        this.selectedGender = gender;
        this.engine.charRenderer.setGender(gender);
        cardLuhut.classList.toggle('active', gender === 'boy');
        cardDevi.classList.toggle('active', gender === 'girl');
        window.sound.playSelect();
        this.saveData();
        this.updateActivePlayerHUD();
      };

      cardLuhut.addEventListener('click', () => updateSelection('boy'));
      cardDevi.addEventListener('click', () => updateSelection('girl'));

      cardLuhut.classList.toggle('active', this.selectedGender === 'boy');
      cardDevi.classList.toggle('active', this.selectedGender === 'girl');
    }

    // Play Button from Home Screen
    const btnStartPlay = document.getElementById('btnStartPlay');
    if (btnStartPlay) {
      btnStartPlay.addEventListener('click', () => {
        window.sound.playClick();
        this.switchToGame(this.selectedLevelIndex);
      });
    }

    // Reset Button from Home Screen (Single Combined Reset Button)
    const btnHomeReset = document.getElementById('btnHomeReset');
    if (btnHomeReset) {
      btnHomeReset.addEventListener('click', () => {
        this.resetLevelAndTimer();
      });
    }

    // How to Play Modal Trigger
    const btnHowToPlay = document.getElementById('btnHowToPlay');
    const howToModal = document.getElementById('howToModal');
    if (btnHowToPlay && howToModal) {
      btnHowToPlay.addEventListener('click', () => {
        window.sound.playClick();
        howToModal.classList.add('active');
      });
    }
  }

  updateHomeModeTabs() {
    document.querySelectorAll('.mode-tab-btn').forEach(btn => {
      const m = btn.getAttribute('data-mode');
      btn.classList.toggle('active', m === this.currentMode);
    });

    const badgeCount = document.getElementById('badgeLevelCount');
    if (badgeCount) {
      const modeCount = (window.GAME_LEVELS[this.currentMode] || []).length || 15;
      badgeCount.textContent = `${modeCount} LEVEL (${this.currentMode.toUpperCase()})`;
    }

    const descEl = document.getElementById('modeDescription');
    if (descEl) {
      if (this.currentMode === 'easy') {
        descEl.innerHTML = '🟢 <strong>Mode Easy:</strong> 15 Level ramah pemula, platform stabil, pengenalan Double Jump & rintangan dasar.';
      } else if (this.currentMode === 'medium') {
        descEl.innerHTML = '🟡 <strong>Mode Medium:</strong> 15 Level jebakan troll Level Devil klasik (lantai amblas, duri jatuh, pintu kabur).';
      } else {
        descEl.innerHTML = '🔴 <strong>Mode Hard:</strong> 15 Level hardcore (gravitasi terbalik, kontrol terbalik, kegelapan senter, & pamong searchlight).';
      }
    }
  }

  renderHomeLevelGrid() {
    const grid = document.getElementById('homeLevelGrid');
    if (!grid) return;

    const modeLevels = window.GAME_LEVELS[this.currentMode] || window.GAME_LEVELS['easy'];
    const unlockedCount = this.unlockedLevels[this.currentMode] || 1;
    const completedList = this.completedLevels[this.currentMode] || [];

    grid.innerHTML = '';
    modeLevels.forEach((lvl, idx) => {
      const card = document.createElement('div');
      card.className = 'home-level-card';
      const isUnlocked = (idx + 1) <= unlockedCount;
      const isCompleted = completedList.includes(idx + 1);
      const isSelected = (idx === this.selectedLevelIndex);

      if (isCompleted) card.classList.add('completed');
      if (!isUnlocked) card.classList.add('locked');
      if (isSelected) card.classList.add('selected');

      card.innerHTML = `
        <div class="level-num">${lvl.id}</div>
        <div class="level-info">
          <div class="level-name">${lvl.title.replace(`Level ${lvl.id}: `, '')}</div>
          <div class="level-status">${isCompleted ? '⭐ Lulus' : isUnlocked ? '🔓 Terbuka' : '🔒 Terkunci'}</div>
        </div>
      `;

      if (isUnlocked) {
        card.addEventListener('click', () => {
          window.sound.playSelect();
          this.selectedLevelIndex = idx;
          this.currentLevelIndex = idx;
          this.saveData();
          document.querySelectorAll('.home-level-card').forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
        });
      }

      grid.appendChild(card);
    });
  }

  switchToGame(levelIdx = 0) {
    if (document.activeElement && typeof document.activeElement.blur === 'function') {
      document.activeElement.blur();
    }
    this.currentScreen = 'game';
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('game-wrapper').classList.remove('hidden');

    this.engine.charRenderer.setGender(this.selectedGender);
    this.loadLevel(levelIdx);
    this.updateActivePlayerHUD();
  }

  switchToHome() {
    this.currentScreen = 'home';
    document.getElementById('game-wrapper').classList.add('hidden');
    document.getElementById('home-screen').classList.remove('hidden');

    this.updateHomeModeTabs();
    this.renderHomeLevelGrid();
  }

  updateActivePlayerHUD() {
    const elBadge = document.getElementById('hudPlayerBadge');
    if (elBadge) {
      const isBoy = this.selectedGender === 'boy';
      const modeTag = this.currentMode.toUpperCase();
      elBadge.innerHTML = isBoy 
        ? `👦 <span>Laut Pangaribuan [${modeTag}]</span>` 
        : `👧 <span>Biru Sinaga [${modeTag}]</span>`;
    }
  }

  // ==========================================
  // IN-GAME UI & MODALS
  // ==========================================
  initInGameUI() {
    const btnHome = document.getElementById('btnHome');
    const btnSound = document.getElementById('btnSound');
    const btnLevelSelect = document.getElementById('btnLevelSelect');
    const btnCharSelect = document.getElementById('btnCharSelect');
    const btnRestart = document.getElementById('btnRestart');
    const btnHudResetAll = document.getElementById('btnHudResetAll');

    if (btnHome) {
      btnHome.addEventListener('click', () => {
        window.sound.playClick();
        this.switchToHome();
      });
    }

    if (btnSound) {
      btnSound.addEventListener('click', () => {
        const isMuted = window.sound.toggleMute();
        btnSound.innerHTML = isMuted ? '🔇' : '🔊';
      });
    }

    if (btnRestart) {
      btnRestart.addEventListener('click', () => {
        window.sound.playClick();
        this.engine.reloadCurrentLevel();
      });
    }

    // Single Button in HUD: Reset ke Level 1 & Waktu
    if (btnHudResetAll) {
      btnHudResetAll.addEventListener('click', () => {
        this.resetLevelAndTimer();
      });
    }

    if (btnLevelSelect) {
      btnLevelSelect.addEventListener('click', () => {
        window.sound.playClick();
        this.openLevelSelectModal();
      });
    }

    if (btnCharSelect) {
      btnCharSelect.addEventListener('click', () => {
        window.sound.playClick();
        this.openCharModal();
      });
    }

    // Modal Close Buttons
    document.querySelectorAll('.modal-close, .btn-close-modal').forEach(btn => {
      btn.addEventListener('click', () => {
        window.sound.playClick();
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
      });
    });

    // In-game Character Switchers
    const btnBoy = document.getElementById('btnCharBoy');
    const btnGirl = document.getElementById('btnCharGirl');
    if (btnBoy && btnGirl) {
      btnBoy.addEventListener('click', () => {
        window.sound.playClick();
        this.selectedGender = 'boy';
        this.engine.charRenderer.setGender('boy');
        btnBoy.classList.add('active');
        btnGirl.classList.remove('active');
        this.updateCharModalPreview();
        this.updateActivePlayerHUD();
        this.saveData();
      });
      btnGirl.addEventListener('click', () => {
        window.sound.playClick();
        this.selectedGender = 'girl';
        this.engine.charRenderer.setGender('girl');
        btnGirl.classList.add('active');
        btnBoy.classList.remove('active');
        this.updateCharModalPreview();
        this.updateActivePlayerHUD();
        this.saveData();
      });
    }

    // In-Game Modal Mode Switcher Tabs
    document.querySelectorAll('.modal-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const m = btn.getAttribute('data-mode');
        if (m) {
          window.sound.playSelect();
          this.currentMode = m;
          this.engine.currentMode = m;
          this.renderModalLevelGrid();
        }
      });
    });

    // In-Game Modal Reset Button
    const btnModalReset = document.getElementById('btnModalReset');
    if (btnModalReset) {
      btnModalReset.addEventListener('click', () => {
        this.resetLevelAndTimer();
        this.renderModalLevelGrid();
      });
    }

    // Victory Modal Buttons
    const btnPlayAgain = document.getElementById('btnPlayAgain');
    if (btnPlayAgain) {
      btnPlayAgain.addEventListener('click', () => {
        window.sound.playClick();
        document.getElementById('victoryModal').classList.remove('active');
        this.loadLevel(0);
      });
    }

    const btnVictoryHome = document.getElementById('btnVictoryHome');
    if (btnVictoryHome) {
      btnVictoryHome.addEventListener('click', () => {
        window.sound.playClick();
        document.getElementById('victoryModal').classList.remove('active');
        this.switchToHome();
      });
    }

    this.updateStatsHUD();
  }

  initMobileControls() {
    const btnLeft = document.getElementById('btnTouchLeft');
    const btnRight = document.getElementById('btnTouchRight');
    const btnJump = document.getElementById('btnTouchJump');

    const handleTouch = (btn, key, isPressed) => {
      if (!btn) return;
      if (key === 'jump' && isPressed) {
        if (!this.engine.input.jump) this.engine.input.jumpJustPressed = true;
      }
      this.engine.input[key] = isPressed;
      btn.classList.toggle('active', isPressed);
    };

    if (btnLeft) {
      btnLeft.addEventListener('touchstart', (e) => { e.preventDefault(); handleTouch(btnLeft, 'left', true); });
      btnLeft.addEventListener('touchend', (e) => { e.preventDefault(); handleTouch(btnLeft, 'left', false); });
      btnLeft.addEventListener('mousedown', () => handleTouch(btnLeft, 'left', true));
      btnLeft.addEventListener('mouseup', () => handleTouch(btnLeft, 'left', false));
      btnLeft.addEventListener('mouseleave', () => handleTouch(btnLeft, 'left', false));
    }

    if (btnRight) {
      btnRight.addEventListener('touchstart', (e) => { e.preventDefault(); handleTouch(btnRight, 'right', true); });
      btnRight.addEventListener('touchend', (e) => { e.preventDefault(); handleTouch(btnRight, 'right', false); });
      btnRight.addEventListener('mousedown', () => handleTouch(btnRight, 'right', true));
      btnRight.addEventListener('mouseup', () => handleTouch(btnRight, 'right', false));
      btnRight.addEventListener('mouseleave', () => handleTouch(btnRight, 'right', false));
    }

    if (btnJump) {
      btnJump.addEventListener('touchstart', (e) => { e.preventDefault(); handleTouch(btnJump, 'jump', true); });
      btnJump.addEventListener('touchend', (e) => { e.preventDefault(); handleTouch(btnJump, 'jump', false); });
      btnJump.addEventListener('mousedown', () => handleTouch(btnJump, 'jump', true));
      btnJump.addEventListener('mouseup', () => handleTouch(btnJump, 'jump', false));
      btnJump.addEventListener('mouseleave', () => handleTouch(btnJump, 'jump', false));
    }
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.elapsedSeconds += 0.1;
      const elTimer = document.getElementById('hudTimer');
      if (elTimer) {
        const mins = Math.floor(this.elapsedSeconds / 60).toString().padStart(2, '0');
        const secs = Math.floor(this.elapsedSeconds % 60).toString().padStart(2, '0');
        const ms = Math.floor((this.elapsedSeconds * 10) % 10);
        elTimer.textContent = `${mins}:${secs}.${ms}`;
      }
    }, 100);
  }

  loadLevel(index) {
    const modeLevels = window.GAME_LEVELS[this.currentMode] || window.GAME_LEVELS['easy'];
    if (index >= modeLevels.length) {
      this.showVictoryModal();
      return;
    }

    this.currentLevelIndex = index;
    this.selectedLevelIndex = index;
    this.engine.loadLevel(index, this.currentMode);

    const levelData = modeLevels[index];
    this.showLevelBanner(levelData.title, levelData.hint);
    this.updateStatsHUD();
    this.saveData();
  }

  showLevelBanner(title, hint) {
    const banner = document.getElementById('levelBanner');
    if (!banner) return;
    banner.querySelector('.title').textContent = title;
    banner.querySelector('.hint').textContent = hint;

    banner.classList.add('show');
    clearTimeout(this.bannerTimeout);
    this.bannerTimeout = setTimeout(() => {
      banner.classList.remove('show');
    }, 2800);
  }

  showTrollToast(msg) {
    const toast = document.getElementById('trollToast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }

  handlePlayerDeath(reason) {
    this.deaths++;
    this.updateStatsHUD();
    this.saveData();

    const randomQuote = this.deathQuotes[Math.floor(Math.random() * this.deathQuotes.length)];
    this.showTrollToast(`${reason} (${randomQuote})`);
  }

  handleLevelComplete() {
    const completedList = this.completedLevels[this.currentMode];
    if (!completedList.includes(this.currentLevelIndex + 1)) {
      completedList.push(this.currentLevelIndex + 1);
    }
    if (this.unlockedLevels[this.currentMode] < this.currentLevelIndex + 2) {
      this.unlockedLevels[this.currentMode] = this.currentLevelIndex + 2;
    }
    this.saveData();

    setTimeout(() => {
      this.loadLevel(this.currentLevelIndex + 1);
    }, 1200);
  }

  updateStatsHUD() {
    const elLevel = document.getElementById('hudLevel');
    const elDeaths = document.getElementById('hudDeaths');
    const modeLevels = window.GAME_LEVELS[this.currentMode] || window.GAME_LEVELS['easy'];
    const modeTag = this.currentMode.toUpperCase();

    if (elLevel) elLevel.textContent = `${modeTag} ${this.currentLevelIndex + 1} / ${modeLevels.length}`;
    if (elDeaths) elDeaths.textContent = this.deaths;
    this.updateActivePlayerHUD();
  }

  openLevelSelectModal() {
    const modal = document.getElementById('levelSelectModal');
    if (!modal) return;
    this.renderModalLevelGrid();
    modal.classList.add('active');
  }

  renderModalLevelGrid() {
    const grid = document.getElementById('levelGrid');
    if (!grid) return;

    document.querySelectorAll('.modal-mode-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-mode') === this.currentMode);
    });

    const modeLevels = window.GAME_LEVELS[this.currentMode] || window.GAME_LEVELS['easy'];
    const unlockedCount = this.unlockedLevels[this.currentMode] || 1;
    const completedList = this.completedLevels[this.currentMode] || [];

    grid.innerHTML = '';
    modeLevels.forEach((lvl, idx) => {
      const card = document.createElement('div');
      card.className = 'level-card';
      const isUnlocked = (idx + 1) <= unlockedCount;
      const isCompleted = completedList.includes(idx + 1);

      if (isCompleted) card.classList.add('completed');
      if (!isUnlocked) card.classList.add('locked');

      card.innerHTML = `<span>${lvl.id}</span>`;

      if (isUnlocked) {
        card.addEventListener('click', () => {
          window.sound.playClick();
          document.getElementById('levelSelectModal').classList.remove('active');
          this.loadLevel(idx);
        });
      }
      grid.appendChild(card);
    });
  }

  openCharModal() {
    const modal = document.getElementById('charModal');
    if (!modal) return;
    const btnBoy = document.getElementById('btnCharBoy');
    const btnGirl = document.getElementById('btnCharGirl');
    if (btnBoy && btnGirl) {
      btnBoy.classList.toggle('active', this.selectedGender === 'boy');
      btnGirl.classList.toggle('active', this.selectedGender === 'girl');
    }
    this.updateCharModalPreview();
    modal.classList.add('active');
  }

  initCharacterPreviews() {
    this.canvasLuhut = document.getElementById('canvasLuhutPreview');
    this.canvasDevi = document.getElementById('canvasDeviPreview');
    this.canvasModal = document.getElementById('charPreviewCanvas');

    this.rendererLuhut = new window.CharacterRenderer();
    this.rendererLuhut.setGender('boy');

    this.rendererDevi = new window.CharacterRenderer();
    this.rendererDevi.setGender('girl');

    if (this.canvasLuhut) {
      this.ctxLuhut = this.canvasLuhut.getContext('2d');
      this.canvasLuhut.width = 120;
      this.canvasLuhut.height = 120;
    }
    if (this.canvasDevi) {
      this.ctxDevi = this.canvasDevi.getContext('2d');
      this.canvasDevi.width = 120;
      this.canvasDevi.height = 120;
    }
    if (this.canvasModal) {
      this.ctxModal = this.canvasModal.getContext('2d');
      this.canvasModal.width = 120;
      this.canvasModal.height = 120;
    }
  }

  renderHomePreviews() {
    this.homeAnimTime++;

    if (this.ctxLuhut && this.canvasLuhut) {
      this.ctxLuhut.clearRect(0, 0, 120, 120);
      this.rendererLuhut.draw(this.ctxLuhut, 60, 95, 1, 'idle', this.homeAnimTime, false);
    }
    if (this.ctxDevi && this.canvasDevi) {
      this.ctxDevi.clearRect(0, 0, 120, 120);
      this.rendererDevi.draw(this.ctxDevi, 60, 95, 1, 'idle', this.homeAnimTime, false);
    }
  }

  updateCharModalPreview() {
    if (!this.ctxModal || !this.canvasModal) return;
    this.ctxModal.clearRect(0, 0, 120, 120);
    this.engine.charRenderer.draw(this.ctxModal, 60, 95, 1, 'idle', Date.now() * 0.05, false);
  }

  showVictoryModal() {
    const modal = document.getElementById('victoryModal');
    if (!modal) return;
    window.sound.playFanfare();
    document.getElementById('finalDeaths').textContent = this.deaths;
    document.getElementById('finalTime').textContent = document.getElementById('hudTimer').textContent;
    document.getElementById('victoryModeLabel').textContent = `Mode ${this.currentMode.toUpperCase()}`;
    modal.classList.add('active');
  }

  mainLoop(timestamp = 0) {
    if (!this.lastFrameTime) this.lastFrameTime = timestamp;
    const elapsed = timestamp - this.lastFrameTime;

    if (elapsed >= 15) {
      this.lastFrameTime = timestamp - (elapsed % 16.6);

      if (this.currentScreen === 'game') {
        this.engine.update();
        this.engine.render();

        const charModal = document.getElementById('charModal');
        if (charModal && charModal.classList.contains('active')) {
          this.updateCharModalPreview();
        }
      } else {
        this.renderHomePreviews();
      }
    }

    requestAnimationFrame((t) => this.mainLoop(t));
  }
}

// Global exposure
window.showTrollToast = (msg) => {
  if (window.app) window.app.showTrollToast(msg);
};

// Start application when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
