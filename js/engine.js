/**
 * DARE TO BE DEL - Game Physics & Rendering Engine
 * SMA UNGGUL DEL (SUD) - Angkatan 15 Edition
 * Features:
 * - Double Jump / Super High Jump on double-tap Space
 * - Precision 2D Platforming Physics & Collisions
 * - Fast & fair level reload on player death
 * - Smooth 60fps rendering without memory leaks
 */

class Particle {
  constructor(x, y, vx, vy, color, size, life) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.size = size;
    this.maxLife = life;
    this.life = life;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.15; // Gravity
    this.life--;
  }

  draw(ctx) {
    const alpha = Math.max(0, this.life / this.maxLife);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class Player {
  constructor(x, y, engine) {
    this.engine = engine;
    this.spawnX = x;
    this.spawnY = y;
    this.x = x;
    this.y = y;
    this.w = 18;
    this.h = 44;
    this.vx = 0;
    this.vy = 0;
    this.facing = 1; // 1: Right, -1: Left
    this.isGrounded = false;
    this.coyoteTime = 0;
    this.jumpBuffer = 0;
    this.jumpsLeft = 2; // Supports Double Jump / High Jump!
    this.isDead = false;
    this.isWon = false;
    this.state = 'idle'; // 'idle', 'run', 'jump', 'fall', 'dead', 'win'
    this.animTime = 0;
    this.deathTimer = 0;
    this.winTimer = 0;
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
    this.spawnX = x;
    this.spawnY = y;
    this.vx = 0;
    this.vy = 0;
    this.facing = 1;
    this.isGrounded = false;
    this.coyoteTime = 0;
    this.jumpBuffer = 0;
    this.jumpsLeft = 2;
    this.isDead = false;
    this.isWon = false;
    this.state = 'idle';
    this.animTime = 0;
    this.deathTimer = 0;
    this.winTimer = 0;
  }

  die(reason = "Kena jebakan!") {
    if (this.isDead || this.isWon) return;
    this.isDead = true;
    this.state = 'dead';
    this.deathTimer = 36; // Fast ~0.6s respawn
    window.sound.playDeath();
    this.engine.shake(10);

    // Spawn burst particles
    for (let i = 0; i < 22; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      const colors = ['#f43f5e', '#ffffff', '#7c3aed', '#38bdf8', '#064e3b', '#10b981', '#fbbf24'];
      this.engine.particles.push(new Particle(
        this.x, this.y - 20,
        Math.cos(angle) * speed, Math.sin(angle) * speed - 2.5,
        colors[Math.floor(Math.random() * colors.length)],
        2 + Math.random() * 2.5,
        25 + Math.random() * 15
      ));
    }

    if (this.engine.onPlayerDeath) {
      this.engine.onPlayerDeath(reason);
    }
  }

  win() {
    if (this.isWon || this.isDead) return;
    this.isWon = true;
    this.state = 'win';
    this.vx = 0;
    this.vy = 0;
    this.winTimer = 50;
    window.sound.playSuccess();

    // Victory confetti
    for (let i = 0; i < 30; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.5;
      const speed = 3 + Math.random() * 6;
      const colors = ['#38bdf8', '#ffffff', '#fbbf24', '#10b981', '#a78bfa', '#064e3b'];
      this.engine.particles.push(new Particle(
        this.x, this.y - 20,
        Math.cos(angle) * speed, Math.sin(angle) * speed,
        colors[Math.floor(Math.random() * colors.length)],
        2.5 + Math.random() * 2,
        35 + Math.random() * 20
      ));
    }

    if (this.engine.onLevelComplete) {
      this.engine.onLevelComplete();
    }
  }

  update(input, level) {
    this.animTime++;

    if (this.isDead) {
      this.deathTimer--;
      if (this.deathTimer <= 0) {
        this.engine.respawnPlayer();
      }
      return;
    }

    if (this.isWon) {
      return;
    }

    const inverted = !!level.invertedGravity;
    const reversed = !!level.reversedControls;
    const slippery = !!level.slippery;

    // Movement Constants
    const accel = slippery ? 0.35 : 0.85;
    const friction = slippery ? 0.96 : 0.72;
    const maxSpeed = 4.8;
    const gravity = inverted ? -0.48 : 0.48;
    const normalJumpForce = inverted ? 9.8 : -9.8;
    const highJumpForce = inverted ? 12.2 : -12.2; // Powerful Super High Jump!

    // Horizontal Input
    let moveDir = 0;
    if (input.left) moveDir -= 1;
    if (input.right) moveDir += 1;

    if (reversed) {
      moveDir *= -1;
    }

    if (moveDir !== 0) {
      this.vx += moveDir * accel;
      if (Math.abs(this.vx) > maxSpeed) {
        this.vx = Math.sign(this.vx) * maxSpeed;
      }
      this.facing = moveDir > 0 ? 1 : -1;
    } else {
      this.vx *= friction;
      if (Math.abs(this.vx) < 0.1) this.vx = 0;
    }

    // Jump Buffering & Grounded check
    if (input.jumpJustPressed) {
      this.jumpBuffer = 6;
      input.jumpJustPressed = false;
    }
    if (this.jumpBuffer > 0) this.jumpBuffer--;

    if (this.isGrounded) {
      this.coyoteTime = 6;
      this.jumpsLeft = 2; // Reset available jumps when on ground
    } else if (this.coyoteTime > 0) {
      this.coyoteTime--;
    }

    // Jump Execution (First Jump or Double-Jump / Super High Jump!)
    if (this.jumpBuffer > 0) {
      if (this.coyoteTime > 0) {
        // 1st Normal Ground Jump
        this.vy = normalJumpForce;
        this.jumpBuffer = 0;
        this.coyoteTime = 0;
        this.isGrounded = false;
        this.jumpsLeft = 1;
        window.sound.playJump();

        // Normal jump dust
        for (let i = 0; i < 4; i++) {
          this.engine.particles.push(new Particle(
            this.x + (Math.random() - 0.5) * 12,
            inverted ? this.y - this.h : this.y,
            (Math.random() - 0.5) * 2,
            inverted ? 1.5 : -1.5,
            'rgba(255, 255, 255, 0.65)',
            2, 12
          ));
        }
      } else if (this.jumpsLeft > 0) {
        // 2nd Super High Jump (Double Jump in Mid-Air!)
        this.vy = highJumpForce;
        this.jumpBuffer = 0;
        this.jumpsLeft = 0;
        this.isGrounded = false;
        window.sound.playHighJump();

        // Super High Jump glowing shockwave particles
        for (let i = 0; i < 12; i++) {
          const pAngle = (i / 12) * Math.PI * 2;
          const pSpeed = 2.5 + Math.random() * 2;
          this.engine.particles.push(new Particle(
            this.x,
            inverted ? this.y - this.h : this.y - 10,
            Math.cos(pAngle) * pSpeed,
            Math.sin(pAngle) * pSpeed * 0.5 + (inverted ? 2 : -2),
            i % 2 === 0 ? '#38bdf8' : '#fbbf24',
            2.5, 18
          ));
        }
      }
    }

    // Variable jump height release
    if (!input.jump) {
      if (!inverted && this.vy < -3) this.vy *= 0.5;
      if (inverted && this.vy > 3) this.vy *= 0.5;
    }

    // Apply Gravity
    this.vy += gravity;
    if (Math.abs(this.vy) > 13) this.vy = Math.sign(this.vy) * 13;

    // Execute Collisions
    this.moveAndCollide(level, inverted);

    // Fall out of screen check
    if ((!inverted && this.y > 490) || (inverted && this.y < -30)) {
      this.die("Jatuh ke luar area!");
    }

    // Determine Animation State
    if (!this.isGrounded) {
      if (!inverted) {
        this.state = (this.vy < 0) ? 'jump' : 'fall';
      } else {
        this.state = (this.vy > 0) ? 'jump' : 'fall';
      }
    } else {
      this.state = (Math.abs(this.vx) > 0.4) ? 'run' : 'idle';
    }
  }

  moveAndCollide(level, inverted) {
    // 1. Move X
    this.x += this.vx;
    const playerBoxX = {
      left: this.x - this.w / 2,
      right: this.x + this.w / 2,
      top: this.y - this.h,
      bottom: this.y
    };

    level.blocks.forEach(block => {
      if (block.active === false) return;
      if (this.checkOverlap(playerBoxX, block)) {
        if (this.vx > 0) {
          this.x = block.x - this.w / 2;
          this.vx = 0;
        } else if (this.vx < 0) {
          this.x = block.x + block.w + this.w / 2;
          this.vx = 0;
        }
      }
    });

    // 2. Move Y
    this.y += this.vy;
    this.isGrounded = false;
    const playerBoxY = {
      left: this.x - this.w / 2,
      right: this.x + this.w / 2,
      top: this.y - this.h,
      bottom: this.y
    };

    level.blocks.forEach(block => {
      if (block.active === false) return;
      if (this.checkOverlap(playerBoxY, block)) {
        if (!inverted) {
          if (this.vy > 0) { // Landing on top
            this.y = block.y;
            this.vy = 0;
            this.isGrounded = true;
          } else if (this.vy < 0) { // Hitting ceiling
            this.y = block.y + block.h + this.h;
            this.vy = 0;
          }
        } else {
          // Inverted Gravity
          if (this.vy < 0) { // Landing on ceiling
            this.y = block.y + block.h + this.h;
            this.vy = 0;
            this.isGrounded = true;
          } else if (this.vy > 0) { // Hitting bottom floor
            this.y = block.y;
            this.vy = 0;
          }
        }
      }
    });

    // 3. Spike Collisions
    if (level.spikes) {
      level.spikes.forEach(spike => {
        const spikeBox = {
          x: spike.x,
          y: spike.y,
          w: spike.size,
          h: spike.size
        };
        const pBox = {
          x: this.x - this.w / 2 + 3,
          y: this.y - this.h + 6,
          w: this.w - 6,
          h: this.h - 8
        };
        if (pBox.x < spikeBox.x + spikeBox.w &&
            pBox.x + pBox.w > spikeBox.x &&
            pBox.y < spikeBox.y + spikeBox.h &&
            pBox.y + pBox.h > spikeBox.y) {
          this.die("Kena duri tajam!");
        }
      });
    }

    // 4. Goal Door Reach
    if (level.door) {
      const d = level.door;
      const distDoor = Math.hypot(this.x - (d.x + d.width / 2), (this.y - 20) - (d.y + d.height / 2));
      if (distDoor < 34) {
        this.win();
      }
    }
  }

  checkOverlap(p, b) {
    return (p.left < b.x + b.w && p.right > b.x && p.top < b.y + b.h && p.bottom > b.y);
  }
}

class GameEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d', { alpha: false });
    this.width = 800;
    this.height = 460;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // Cached Offscreen Darkness Canvas
    this.darkCanvas = document.createElement('canvas');
    this.darkCanvas.width = this.width;
    this.darkCanvas.height = this.height;
    this.darkCtx = this.darkCanvas.getContext('2d');

    this.charRenderer = new window.CharacterRenderer();
    this.player = new Player(60, 380, this);
    this.currentMode = 'easy'; // 'easy' | 'medium' | 'hard'
    this.currentLevel = null;
    this.levelData = null;
    this.particles = [];
    this.screenShake = 0;

    this.input = {
      left: false,
      right: false,
      jump: false,
      jumpJustPressed: false
    };

    this.onPlayerDeath = null;
    this.onLevelComplete = null;

    this.initControls();
  }

  initControls() {
    window.addEventListener('keydown', (e) => {
      if (document.activeElement && typeof document.activeElement.blur === 'function') {
        document.activeElement.blur();
      }

      if (e.code === 'Space' || e.code === 'KeyW' || e.code === 'ArrowUp') {
        e.preventDefault();
        if (!this.input.jump) {
          this.input.jumpJustPressed = true;
        }
        this.input.jump = true;
      }
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
        e.preventDefault();
        this.input.left = true;
      }
      if (e.code === 'KeyD' || e.code === 'ArrowRight') {
        e.preventDefault();
        this.input.right = true;
      }
      if (e.code === 'KeyR') {
        e.preventDefault();
        this.reloadCurrentLevel();
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.code === 'Space' || e.code === 'KeyW' || e.code === 'ArrowUp') {
        e.preventDefault();
        this.input.jump = false;
      }
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
        e.preventDefault();
        this.input.left = false;
      }
      if (e.code === 'KeyD' || e.code === 'ArrowRight') {
        e.preventDefault();
        this.input.right = false;
      }
    });
  }

  loadLevel(index, mode = 'easy') {
    this.currentMode = mode;
    const modeLevels = window.GAME_LEVELS[mode] || window.GAME_LEVELS['easy'];
    const rawLevel = modeLevels[index];
    if (!rawLevel) return;

    this.levelData = JSON.parse(JSON.stringify(rawLevel));
    this.levelData.traps = rawLevel.traps ? rawLevel.traps.map(t => Object.assign({}, t)) : [];

    this.currentLevel = this.levelData;
    this.particles = [];
    this.player.reset(this.currentLevel.spawn.x, this.currentLevel.spawn.y);
  }

  reloadCurrentLevel() {
    if (this.currentLevel) {
      const modeLevels = window.GAME_LEVELS[this.currentMode] || window.GAME_LEVELS['easy'];
      const idx = modeLevels.findIndex(lvl => lvl.id === this.currentLevel.id);
      if (idx !== -1) {
        this.loadLevel(idx, this.currentMode);
      }
    }
  }

  respawnPlayer() {
    if (!this.currentLevel) return;
    this.reloadCurrentLevel();
  }

  shake(intensity = 8) {
    this.screenShake = intensity;
  }

  update() {
    if (!this.currentLevel) return;

    if (this.screenShake > 0) {
      this.screenShake *= 0.88;
      if (this.screenShake < 0.5) this.screenShake = 0;
    }

    this.player.update(this.input, this.currentLevel);

    if (this.currentLevel.traps) {
      this.currentLevel.traps.forEach(trap => {
        if (trap.update) {
          trap.update(this.currentLevel, this.player);
        }
        if (trap.triggerX && this.player.x > trap.triggerX && !trap.triggered) {
          trap.triggered = true;
          if (trap.action) trap.action(this.currentLevel, this.player);
          window.sound.playTrap();
        }
      });
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      if (this.particles[i].life <= 0) {
        this.particles.splice(i, 1);
      }
    }
    if (this.particles.length > 50) {
      this.particles.splice(0, this.particles.length - 50);
    }
  }

  render() {
    const ctx = this.ctx;
    ctx.save();
    ctx.clearRect(0, 0, this.width, this.height);

    if (this.screenShake > 0) {
      const ox = (Math.random() - 0.5) * this.screenShake * 2;
      const oy = (Math.random() - 0.5) * this.screenShake * 2;
      ctx.translate(ox, oy);
    }

    if (!this.currentLevel) {
      ctx.restore();
      return;
    }

    // 1. Campus Scenery Background
    this.drawBackground(ctx);

    // 2. Draw Level Blocks
    this.drawBlocks(ctx);

    // 3. Draw Hazards & Spikes
    this.drawSpikes(ctx);
    this.drawHazards(ctx);

    // 4. Draw Crystals (if any)
    this.drawCrystals(ctx);

    // 5. Draw Exit Door
    this.drawDoor(ctx);

    // 6. Draw Player
    this.charRenderer.draw(
      ctx,
      this.player.x,
      this.player.y,
      this.player.facing,
      this.player.state,
      this.player.animTime,
      this.currentLevel.invertedGravity
    );

    // 7. Draw Particles
    this.particles.forEach(p => p.draw(ctx));

    // 8. Darkness Flashlight Mode
    if (this.currentLevel.darknessMode) {
      this.drawDarkness(ctx);
    }

    // 9. Searchlight Beam Mode
    if (this.currentLevel.searchlights) {
      this.drawSearchlights(ctx);
    }

    ctx.restore();
  }

  drawBackground(ctx) {
    const bgGrad = ctx.createLinearGradient(0, 0, 0, this.height);
    bgGrad.addColorStop(0, '#0a1329');
    bgGrad.addColorStop(0.6, '#061320');
    bgGrad.addColorStop(1, '#030812');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < this.width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0); ctx.lineTo(x, this.height);
      ctx.stroke();
    }
    for (let y = 0; y < this.height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y); ctx.lineTo(this.width, y);
      ctx.stroke();
    }

    // Campus Blackboard Banner
    ctx.fillStyle = 'rgba(6, 78, 59, 0.4)';
    ctx.fillRect(70, 75, 270, 56);
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.35)';
    ctx.lineWidth = 2;
    ctx.strokeRect(70, 75, 270, 56);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px "Space Grotesk", Outfit, sans-serif';
    ctx.fillText('🏫 SMA UNGGUL DEL', 85, 96);
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 10px "Space Grotesk", sans-serif';
    const modeLabel = this.currentMode.toUpperCase();
    ctx.fillText(`Mode: ${modeLabel} • Angkatan 15`, 85, 114);
  }

  drawBlocks(ctx) {
    const blocks = this.currentLevel.blocks;
    if (!blocks) return;

    blocks.forEach((b) => {
      if (b.active === false) return;

      ctx.fillStyle = '#131e36';
      ctx.fillRect(b.x, b.y, b.w, b.h);

      ctx.fillStyle = '#0284c7';
      ctx.fillRect(b.x, b.y, b.w, 4);
      ctx.fillStyle = '#10b981';
      ctx.fillRect(b.x, b.y + 3, b.w, 1.5);

      ctx.fillStyle = '#080e1c';
      ctx.fillRect(b.x, b.y + b.h - 2, b.w, 2);

      ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.lineWidth = 1;
      ctx.strokeRect(b.x, b.y, b.w, b.h);
    });
  }

  drawSpikes(ctx) {
    const spikes = this.currentLevel.spikes;
    if (!spikes) return;

    spikes.forEach(s => {
      ctx.save();
      ctx.fillStyle = '#f43f5e';
      ctx.strokeStyle = '#ffe4e6';
      ctx.lineWidth = 1;

      ctx.beginPath();
      if (s.dir === 'down') {
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + s.size, s.y);
        ctx.lineTo(s.x + s.size / 2, s.y + s.size);
      } else {
        ctx.moveTo(s.x, s.y + s.size);
        ctx.lineTo(s.x + s.size, s.y + s.size);
        ctx.lineTo(s.x + s.size / 2, s.y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    });
  }

  drawHazards(ctx) {
    const hazards = this.currentLevel.hazards;
    if (!hazards) return;

    hazards.forEach(h => {
      if (h.type === 'exam_book') {
        ctx.save();
        ctx.translate(h.x + h.w / 2, h.y + h.h / 2);

        ctx.fillStyle = '#7c3aed';
        ctx.beginPath();
        ctx.roundRect(-h.w / 2, -h.h / 2, h.w, h.h, [3]);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-h.w / 2 + 4, -h.h / 2 + 3, h.w - 8, h.h - 6);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 8px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('DIKTAT', 0, -2);
        ctx.fillText('SUD 15', 0, 8);

        ctx.restore();
      }
    });
  }

  drawCrystals(ctx) {
    const crystals = this.currentLevel.crystals;
    if (!crystals) return;

    crystals.forEach(c => {
      if (c.collected) return;
      ctx.save();
      const pulse = Math.sin(Date.now() * 0.008) * 3;
      ctx.translate(c.x, c.y);

      ctx.fillStyle = 'rgba(124, 58, 237, 0.4)';
      ctx.beginPath();
      ctx.arc(0, 0, c.radius + 6 + pulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#a78bfa';
      ctx.beginPath();
      ctx.moveTo(0, -c.radius);
      ctx.lineTo(c.radius, 0);
      ctx.lineTo(0, c.radius);
      ctx.lineTo(-c.radius, 0);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();
    });
  }

  drawDoor(ctx) {
    const door = this.currentLevel.door;
    if (!door) return;

    ctx.save();
    ctx.fillStyle = 'rgba(16, 185, 129, 0.3)';
    ctx.beginPath();
    ctx.roundRect(door.x - 4, door.y - 4, door.width + 8, door.height + 8, [8]);
    ctx.fill();

    ctx.fillStyle = '#064e3b';
    ctx.beginPath();
    ctx.roundRect(door.x, door.y, door.width, door.height, [6, 6, 0, 0]);
    ctx.fill();

    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.roundRect(door.x + 3, door.y + 3, door.width - 6, door.height - 3, [4, 4, 0, 0]);
    ctx.fill();

    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(door.x + door.width - 9, door.y + door.height / 2, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 9px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SUD', door.x + door.width / 2, door.y + 18);

    ctx.restore();

    if (this.currentLevel.fakeDoors) {
      this.currentLevel.fakeDoors.forEach(fd => {
        ctx.save();
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.roundRect(fd.x, fd.y, fd.width, fd.height, [6, 6, 0, 0]);
        ctx.fill();

        ctx.fillStyle = '#0369a1';
        ctx.beginPath();
        ctx.roundRect(fd.x + 3, fd.y + 3, fd.width - 6, fd.height - 3, [4, 4, 0, 0]);
        ctx.fill();

        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(fd.x + fd.width - 9, fd.y + fd.height / 2, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    }
  }

  drawDarkness(ctx) {
    if (!this.darkCanvas || !this.darkCtx) return;
    const dCtx = this.darkCtx;
    dCtx.globalCompositeOperation = 'source-over';
    dCtx.clearRect(0, 0, this.width, this.height);
    dCtx.fillStyle = 'rgba(4, 8, 16, 0.96)';
    dCtx.fillRect(0, 0, this.width, this.height);

    dCtx.globalCompositeOperation = 'destination-out';
    const grad = dCtx.createRadialGradient(
      this.player.x, this.player.y - 20, 20,
      this.player.x, this.player.y - 20, 140
    );
    grad.addColorStop(0, 'rgba(0, 0, 0, 1)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    dCtx.fillStyle = grad;
    dCtx.beginPath();
    dCtx.arc(this.player.x, this.player.y - 20, 140, 0, Math.PI * 2);
    dCtx.fill();

    if (this.currentLevel.door) {
      const d = this.currentLevel.door;
      const doorGrad = dCtx.createRadialGradient(
        d.x + d.width / 2, d.y + d.height / 2, 5,
        d.x + d.width / 2, d.y + d.height / 2, 60
      );
      doorGrad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
      doorGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      dCtx.fillStyle = doorGrad;
      dCtx.beginPath();
      dCtx.arc(d.x + d.width / 2, d.y + d.height / 2, 60, 0, Math.PI * 2);
      dCtx.fill();
    }

    ctx.drawImage(this.darkCanvas, 0, 0);
  }

  drawSearchlights(ctx) {
    const sls = this.currentLevel.searchlights;
    if (!sls) return;

    ctx.save();
    sls.forEach(sl => {
      const beamX = sl.x + Math.sin(sl.angle) * sl.range;
      const grad = ctx.createRadialGradient(beamX, 390, 10, beamX, 390, 50);
      grad.addColorStop(0, 'rgba(244, 63, 94, 0.45)');
      grad.addColorStop(1, 'rgba(244, 63, 94, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(beamX, 390, 45, 18, 0, 0, Math.PI * 2);
      ctx.fill();

      // Beam Cone
      ctx.fillStyle = 'rgba(244, 63, 94, 0.15)';
      ctx.beginPath();
      ctx.moveTo(sl.x, 30);
      ctx.lineTo(beamX - 45, 390);
      ctx.lineTo(beamX + 45, 390);
      ctx.closePath();
      ctx.fill();
    });
    ctx.restore();
  }
}

// Global GameEngine Exposure
window.GameEngine = GameEngine;
