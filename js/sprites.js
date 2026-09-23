/**
 * DARE TO BE DEL - Character Procedural Vector Sprite Renderer
 * SMA UNGGUL DEL (SUD) - Angkatan 15 Edition
 * 
 * Features:
 * - Seragam Putih Abu-abu SMA Unggul Del
 * - Pin Emas Berlogo "SUD" pada saku kemeja kiri
 * - Batch Berwarna Hijau Botol bertuliskan "15" pada lengan kemeja
 * - Karakter Siswa (Laut Pangaribuan) & Siswi (Biru Sinaga)
 * - Full States: Idle, Running, Jumping, Falling, Dead/Trolled, and Victory!
 */

class CharacterRenderer {
  constructor() {
    this.gender = 'boy'; // 'boy' = Laut Pangaribuan, 'girl' = Biru Sinaga
    this.playerName = 'Laut Pangaribuan';

    // Theme Color Palette: Biru, Putih, Ungu, Hijau Botol
    this.colorDelBlue = '#0284c7';
    this.colorDelCyan = '#38bdf8';
    this.colorWhite = '#ffffff';
    this.colorPurple = '#7c3aed';
    this.colorBottleGreen = '#064e3b'; // Hijau Botol pekat
    this.colorBottleGreenLight = '#047857'; // Hijau Botol terang
    this.colorGold = '#fbbf24';

    this.skinTone = '#ffd8b3';
    this.skinShadow = '#f0be92';
  }

  setGender(gender) {
    this.gender = gender;
    this.playerName = (gender === 'girl') ? 'Biru Sinaga' : 'Laut Pangaribuan';
  }

  setPlayerName(name) {
    this.playerName = name;
    this.gender = (name.toLowerCase().includes('biru') || name.toLowerCase().includes('devi') || name.toLowerCase() === 'girl') ? 'girl' : 'boy';
  }

  /**
   * Draw 2D SMA Unggul Del Student Character on Canvas Context
   * @param {CanvasRenderingContext2D} ctx 
   * @param {number} x - Center X position
   * @param {number} y - Bottom Y position (feet on ground)
   * @param {number} facing - 1 for Right, -1 for Left
   * @param {string} state - 'idle', 'run', 'jump', 'fall', 'dead', 'win'
   * @param {number} animTime - Animation timer / ticks
   * @param {boolean} invertedGravity - True if gravity flipped
   */
  draw(ctx, x, y, facing = 1, state = 'idle', animTime = 0, invertedGravity = false) {
    ctx.save();
    ctx.translate(x, y);

    if (invertedGravity) {
      ctx.scale(1, -1);
    }
    ctx.scale(facing, 1);

    const isGirl = (this.gender === 'girl');

    if (state === 'dead') {
      this.drawDeadState(ctx, isGirl, animTime);
      ctx.restore();
      return;
    }

    // Animation physics & offsets
    let bodyBob = 0;
    let legOffset1 = 0;
    let legOffset2 = 0;
    let armAngle1 = 0;
    let armAngle2 = 0;
    let eyeType = 'normal';

    if (state === 'idle') {
      bodyBob = Math.sin(animTime * 0.08) * 1.5;
    } else if (state === 'run') {
      const runFreq = animTime * 0.32;
      bodyBob = Math.abs(Math.sin(runFreq)) * 3.5;
      legOffset1 = Math.sin(runFreq) * 11;
      legOffset2 = -Math.sin(runFreq) * 11;
      armAngle1 = -Math.sin(runFreq) * 0.65;
      armAngle2 = Math.sin(runFreq) * 0.65;
    } else if (state === 'jump') {
      bodyBob = -4;
      legOffset1 = -4;
      legOffset2 = -2;
      armAngle1 = -0.8;
      armAngle2 = 0.5;
      eyeType = 'focused';
    } else if (state === 'fall') {
      bodyBob = 2;
      legOffset1 = 5;
      legOffset2 = 2;
      armAngle1 = -1.3;
      armAngle2 = -1.3;
      eyeType = 'worried';
    } else if (state === 'win') {
      bodyBob = Math.abs(Math.sin(animTime * 0.2)) * 7;
      armAngle1 = -2.4;
      armAngle2 = 2.4;
      eyeType = 'happy';
    }

    // 1. Soft Dynamic Floor Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
    ctx.beginPath();
    const shadowScale = (state === 'jump' || state === 'fall') ? 0.7 : 1;
    ctx.ellipse(0, 0, 14 * shadowScale, 4 * shadowScale, 0, 0, Math.PI * 2);
    ctx.fill();

    // 2. SUD Student Backpack (Tas Ransel SMA Unggul Del) - Ungu & Hijau Botol Accents
    ctx.save();
    ctx.fillStyle = isGirl ? this.colorPurple : this.colorBottleGreen;
    ctx.beginPath();
    ctx.roundRect(-16, -34 + bodyBob, 8, 20, [4]);
    ctx.fill();
    // Reflective cyan stripe + gold buckle
    ctx.fillStyle = this.colorDelCyan;
    ctx.fillRect(-15, -28 + bodyBob, 6, 3);
    ctx.fillStyle = this.colorGold;
    ctx.fillRect(-15, -22 + bodyBob, 6, 2);
    ctx.restore();

    // 3. Legs & Shoes (Celana / Rok Abu-abu SMA)
    const pantColor = '#64748b'; // Abu-abu seragam SMA
    const shoeColor = '#0f172a'; // Black school sneakers
    const whiteSocks = this.colorWhite;

    if (isGirl) {
      // Biru Sinaga: Rok Abu-abu SMA + Kaki
      // Legs
      ctx.fillStyle = this.skinTone;
      ctx.fillRect(-6, -16, 4, 12 + legOffset1 * 0.4);
      ctx.fillRect(2, -16, 4, 12 + legOffset2 * 0.4);

      // White Socks & Black Shoes
      ctx.fillStyle = whiteSocks;
      ctx.fillRect(-7, -7, 6, 4);
      ctx.fillRect(1, -7, 6, 4);
      ctx.fillStyle = shoeColor;
      ctx.beginPath();
      ctx.roundRect(-8, -3, 8, 4, [1]);
      ctx.roundRect(0, -3, 8, 4, [1]);
      ctx.fill();

      // Pleated Abu-abu Skirt (Rok Lipit SMA)
      ctx.fillStyle = pantColor;
      ctx.beginPath();
      ctx.moveTo(-10, -22 + bodyBob);
      ctx.lineTo(10, -22 + bodyBob);
      ctx.lineTo(13, -12 + bodyBob);
      ctx.lineTo(-13, -12 + bodyBob);
      ctx.closePath();
      ctx.fill();

      // Subtle skirt hem line in Del Blue
      ctx.fillStyle = this.colorDelBlue;
      ctx.fillRect(-12, -13 + bodyBob, 24, 1.5);
    } else {
      // Laut Pangaribuan: Celana Panjang Abu-abu SMA
      ctx.fillStyle = pantColor;
      // Left leg
      ctx.beginPath();
      ctx.roundRect(-8, -20 + bodyBob, 6, 17 + legOffset1 * 0.3, [2]);
      ctx.fill();
      // Right leg
      ctx.beginPath();
      ctx.roundRect(2, -20 + bodyBob, 6, 17 + legOffset2 * 0.3, [2]);
      ctx.fill();

      // Shoes
      ctx.fillStyle = shoeColor;
      ctx.beginPath();
      ctx.roundRect(-9, -4 + legOffset1 * 0.3, 8, 5, [2]);
      ctx.roundRect(1, -4 + legOffset2 * 0.3, 8, 5, [2]);
      ctx.fill();
      // White sneaker sole
      ctx.fillStyle = this.colorWhite;
      ctx.fillRect(-9, 0 + legOffset1 * 0.3, 8, 1.5);
      ctx.fillRect(1, 0 + legOffset2 * 0.3, 8, 1.5);
    }

    // 4. Back Arm (Lengan Kiri Belakang)
    ctx.save();
    ctx.translate(-7, -32 + bodyBob);
    ctx.rotate(armAngle2);
    ctx.fillStyle = this.colorWhite;
    ctx.fillRect(-2, 0, 4, 10);
    ctx.fillStyle = this.skinTone;
    ctx.beginPath();
    ctx.arc(0, 11, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 5. Body & Seragam Putih SMA
    // Kemeja Putih Bersih
    ctx.fillStyle = this.colorWhite;
    ctx.beginPath();
    ctx.roundRect(-9, -36 + bodyBob, 18, 16, [4, 4, 2, 2]);
    ctx.fill();

    // Kerah Kemeja (Collar)
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.moveTo(-7, -36 + bodyBob);
    ctx.lineTo(0, -31 + bodyBob);
    ctx.lineTo(7, -36 + bodyBob);
    ctx.closePath();
    ctx.fill();

    // Dasi Biru / Ungu SMA Unggul Del
    ctx.fillStyle = isGirl ? this.colorPurple : this.colorDelBlue;
    ctx.beginPath();
    ctx.moveTo(-2, -32 + bodyBob);
    ctx.lineTo(2, -32 + bodyBob);
    ctx.lineTo(1.5, -23 + bodyBob);
    ctx.lineTo(0, -21 + bodyBob);
    ctx.lineTo(-1.5, -23 + bodyBob);
    ctx.closePath();
    ctx.fill();

    // =========================================================================
    // 6. DETAIL KHUSUS: PIN LOGO SUD & BATCH HIJAU BOTOL "15"
    // =========================================================================

    // A. Pin Berlogo SUD (Saku Dada Kiri)
    // Saku Putih
    ctx.fillStyle = '#f1f5f9';
    ctx.fillRect(2, -30 + bodyBob, 6, 6);
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 0.6;
    ctx.strokeRect(2, -30 + bodyBob, 6, 6);

    // Pin Emas Bulat Berlogo SUD
    ctx.fillStyle = this.colorGold;
    ctx.beginPath();
    ctx.arc(5, -27 + bodyBob, 2.5, 0, Math.PI * 2);
    ctx.fill();
    // Inner SUD Emblem Cyan
    ctx.fillStyle = this.colorDelBlue;
    ctx.beginPath();
    ctx.arc(5, -27 + bodyBob, 1.2, 0, Math.PI * 2);
    ctx.fill();

    // B. Batch Lengan Hijau Botol "15" (Angkatan 15 SMA Unggul Del)
    // Digambar pada kemeja bagian dada/bahu atas
    ctx.fillStyle = this.colorBottleGreen;
    ctx.beginPath();
    ctx.roundRect(-8.5, -34 + bodyBob, 7, 5, [1]);
    ctx.fill();
    ctx.strokeStyle = this.colorBottleGreenLight;
    ctx.lineWidth = 0.5;
    ctx.strokeRect(-8.5, -34 + bodyBob, 7, 5);

    // Teks bordir "15" warna emas/putih pada batch hijau botol
    ctx.fillStyle = this.colorGold;
    ctx.font = 'bold 3.5px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('15', -5, -30.2 + bodyBob);

    // 7. Neck & Head
    // Neck
    ctx.fillStyle = this.skinShadow;
    ctx.fillRect(-3, -39 + bodyBob, 6, 4);

    // Head Base
    ctx.fillStyle = this.skinTone;
    ctx.beginPath();
    ctx.arc(0, -44 + bodyBob, 9, 0, Math.PI * 2);
    ctx.fill();

    // 8. Facial Features & Eyes
    if (eyeType === 'normal') {
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(3, -44 + bodyBob, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = this.colorWhite;
      ctx.beginPath();
      ctx.arc(3.5, -44.5 + bodyBob, 0.8, 0, Math.PI * 2);
      ctx.fill();
      // Cheerful Smile
      ctx.strokeStyle = '#991b1b';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(2, -41 + bodyBob, 2.5, 0.1, Math.PI * 0.9);
      ctx.stroke();
    } else if (eyeType === 'happy') {
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(3, -44 + bodyBob, 2.5, Math.PI, 0);
      ctx.stroke();
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(2, -41 + bodyBob, 3, 0, Math.PI);
      ctx.fill();
    } else if (eyeType === 'worried') {
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(3, -44 + bodyBob, 2.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = this.colorWhite;
      ctx.beginPath();
      ctx.arc(3, -44 + bodyBob, 1.2, 0, Math.PI * 2);
      ctx.fill();
      // Blue sweat drop
      ctx.fillStyle = this.colorDelCyan;
      ctx.beginPath();
      ctx.arc(-5, -48 + bodyBob, 1.8, 0, Math.PI * 2);
      ctx.fill();
    } else if (eyeType === 'focused') {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(1, -45 + bodyBob, 4, 2);
    }

    // 9. Hair & Identity (Laut Pangaribuan vs Biru Sinaga)
    if (isGirl) {
      // Biru Sinaga (Siswi SUD): Rambut elegan dengan pita Ungu/Hijau Botol
      ctx.fillStyle = '#1e1b4b'; // Dark stylish hair
      // Back Ponytail
      ctx.beginPath();
      ctx.arc(-8, -45 + bodyBob + Math.sin(animTime * 0.2) * 1.5, 5, 0, Math.PI * 2);
      ctx.fill();
      // Ribbon Pita Hijau Botol & Ungu
      ctx.fillStyle = this.colorBottleGreenLight;
      ctx.beginPath();
      ctx.arc(-6, -48 + bodyBob, 2.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = this.colorPurple;
      ctx.beginPath();
      ctx.arc(-6, -48 + bodyBob, 1.4, 0, Math.PI * 2);
      ctx.fill();

      // Front Bangs & Top Hair
      ctx.fillStyle = '#1e1b4b';
      ctx.beginPath();
      ctx.arc(0, -47 + bodyBob, 9.5, Math.PI * 0.9, Math.PI * 2.1);
      ctx.fill();
      // Side hair lock
      ctx.beginPath();
      ctx.roundRect(-8, -48 + bodyBob, 5, 10, [2]);
      ctx.fill();
      // Bangs
      ctx.beginPath();
      ctx.moveTo(-6, -49 + bodyBob);
      ctx.lineTo(4, -46 + bodyBob);
      ctx.lineTo(8, -50 + bodyBob);
      ctx.closePath();
      ctx.fill();
    } else {
      // Laut Pangaribuan (Siswa SUD): Rambut rapi standar kedisiplinan asrama SUD
      ctx.fillStyle = '#090d16'; // Jet black hair
      ctx.beginPath();
      ctx.arc(0, -47 + bodyBob, 9.5, Math.PI * 0.85, Math.PI * 2.1);
      ctx.fill();
      // Top texture
      ctx.beginPath();
      ctx.moveTo(-5, -53 + bodyBob);
      ctx.lineTo(1, -57 + bodyBob);
      ctx.lineTo(5, -52 + bodyBob);
      ctx.lineTo(7, -49 + bodyBob);
      ctx.closePath();
      ctx.fill();
      ctx.fillRect(-7, -46 + bodyBob, 3, 5);
    }

    // 10. Front Arm (Lengan Kanan Depan)
    ctx.save();
    ctx.translate(6, -32 + bodyBob);
    ctx.rotate(armAngle1);
    ctx.fillStyle = this.colorWhite;
    ctx.fillRect(-2, 0, 4, 10);
    // Batch patch on sleeve
    ctx.fillStyle = this.colorBottleGreen;
    ctx.fillRect(-2, 2, 4, 3);
    ctx.fillStyle = this.skinTone;
    ctx.beginPath();
    ctx.arc(0, 11, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore();
  }

  /**
   * Comedic Dead/Trolled State Animation
   */
  drawDeadState(ctx, isGirl, animTime) {
    const spinAngle = animTime * 0.35;
    ctx.rotate(spinAngle);

    // Ghostly dizzy aura with bottle green + purple glow
    ctx.fillStyle = 'rgba(244, 63, 94, 0.4)';
    ctx.beginPath();
    ctx.arc(0, -20, 24, 0, Math.PI * 2);
    ctx.fill();

    // Body Seragam
    ctx.fillStyle = this.colorWhite;
    ctx.beginPath();
    ctx.roundRect(-8, -28, 16, 16, [4]);
    ctx.fill();

    // Pin SUD
    ctx.fillStyle = this.colorGold;
    ctx.beginPath();
    ctx.arc(3, -22, 2, 0, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.fillStyle = this.skinTone;
    ctx.beginPath();
    ctx.arc(0, -36, 9, 0, Math.PI * 2);
    ctx.fill();

    // Comedic "X_X" eyes
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2;
    // Left X
    ctx.beginPath();
    ctx.moveTo(-5, -39); ctx.lineTo(-1, -35);
    ctx.moveTo(-1, -39); ctx.lineTo(-5, -35);
    // Right X
    ctx.moveTo(1, -39); ctx.lineTo(5, -35);
    ctx.moveTo(5, -39); ctx.lineTo(1, -35);
    ctx.stroke();

    // Dizzy open mouth
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.ellipse(0, -31, 3, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Floating stars with SUD Colors
    const starColors = [this.colorDelCyan, this.colorGold, this.colorBottleGreenLight, this.colorPurple];
    for (let i = 0; i < 4; i++) {
      const angle = animTime * 0.15 + (i * Math.PI * 2 / 4);
      const sx = Math.cos(angle) * 18;
      const sy = -36 + Math.sin(angle) * 10;
      ctx.fillStyle = starColors[i];
      ctx.beginPath();
      ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

// Global Character Renderer Instance
window.CharacterRenderer = CharacterRenderer;
