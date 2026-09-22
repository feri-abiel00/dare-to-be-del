/**
 * DARE TO BE DEL - Level Definitions (45 Total Levels)
 * SMA UNGGUL DEL (SUD) - Angkatan 15 Edition
 * 
 * Contains:
 * - 15 Levels Easy   (Mudah & Santai, pengenalan rintangan & double jump)
 * - 15 Levels Medium (Sedang, jebakan troll khas Level Devil)
 * - 15 Levels Hard   (Sulit, hardcore troll, gravitasi terbalik & kontrol berantai, 100% solvable!)
 */

window.GAME_LEVELS = {
  // =========================================================================
  // EASY MODE (15 LEVELS) - Menyenangkan, Bersahabat & Edukatif
  // =========================================================================
  easy: [
    {
      id: 1,
      title: "Level 1: Gerbang Masuk SMA Unggul Del",
      hint: "Langkah pertama siswa baru, jalan lurus ke pintu!",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 346, width: 36, height: 54 },
      blocks: [
        { x: 0, y: 400, w: 800, h: 60 }
      ],
      spikes: [],
      traps: []
    },
    {
      id: 2,
      title: "Level 2: Melompati Selokan Gerbang",
      hint: "Tekan Spasi untuk melompati celah selokan kecil.",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 346, width: 36, height: 54 },
      blocks: [
        { x: 0, y: 400, w: 320, h: 60 },
        { x: 420, y: 400, w: 380, h: 60 }
      ],
      spikes: [
        { x: 350, y: 440, size: 20, dir: 'up' },
        { x: 380, y: 440, size: 20, dir: 'up' }
      ],
      traps: []
    },
    {
      id: 3,
      title: "Level 3: Latihan Double Jump (Lompat Tinggi)",
      hint: "Tekan Spasi 2 KALI di udara untuk melompat tinggi!",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 226, width: 36, height: 54 },
      blocks: [
        { x: 0, y: 400, w: 250, h: 60 },
        { x: 320, y: 340, w: 120, h: 20 },
        { x: 520, y: 280, w: 280, h: 60 }
      ],
      spikes: [],
      traps: []
    },
    {
      id: 4,
      title: "Level 4: Tangga Selasar Graha Del",
      hint: "Gunakan double jump untuk menaiki tangga tinggi.",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 166, width: 36, height: 54 },
      blocks: [
        { x: 0, y: 400, w: 200, h: 60 },
        { x: 260, y: 340, w: 100, h: 20 },
        { x: 420, y: 280, w: 100, h: 20 },
        { x: 580, y: 220, w: 220, h: 30 }
      ],
      spikes: [
        { x: 210, y: 440, size: 20, dir: 'up' },
        { x: 370, y: 440, size: 20, dir: 'up' }
      ],
      traps: []
    },
    {
      id: 5,
      title: "Level 5: Pintu Kelas yang Sabar",
      hint: "Pintu ini ramah dan menunggu kedatanganmu!",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 346, width: 36, height: 54 },
      blocks: [
        { x: 0, y: 400, w: 280, h: 60 },
        { x: 340, y: 370, w: 100, h: 20 },
        { x: 500, y: 400, w: 300, h: 60 }
      ],
      spikes: [
        { x: 290, y: 440, size: 20, dir: 'up' },
        { x: 450, y: 440, size: 20, dir: 'up' }
      ],
      traps: []
    },
    {
      id: 6,
      title: "Level 6: Rak Buku Perpustakaan SUD",
      hint: "Lompat antar rak buku tanpa terburu-buru.",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 346, width: 36, height: 54 },
      blocks: [
        { x: 0, y: 400, w: 180, h: 60 },
        { x: 240, y: 340, w: 80, h: 20 },
        { x: 380, y: 300, w: 80, h: 20 },
        { x: 520, y: 340, w: 80, h: 20 },
        { x: 660, y: 400, w: 140, h: 60 }
      ],
      spikes: [
        { x: 190, y: 440, size: 20, dir: 'up' },
        { x: 330, y: 440, size: 20, dir: 'up' },
        { x: 470, y: 440, size: 20, dir: 'up' },
        { x: 610, y: 440, size: 20, dir: 'up' }
      ],
      traps: []
    },
    {
      id: 7,
      title: "Level 7: Pijakan Koridor Asrama",
      hint: "Celah antar platform cukup lebar, manfaatkan double jump.",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 346, width: 36, height: 54 },
      blocks: [
        { x: 0, y: 400, w: 220, h: 60 },
        { x: 300, y: 370, w: 90, h: 20 },
        { x: 460, y: 370, w: 90, h: 20 },
        { x: 620, y: 400, w: 180, h: 60 }
      ],
      spikes: [
        { x: 230, y: 440, size: 20, dir: 'up' },
        { x: 400, y: 440, size: 20, dir: 'up' },
        { x: 560, y: 440, size: 20, dir: 'up' }
      ],
      traps: []
    },
    {
      id: 8,
      title: "Level 8: Rintangan Duri Tunggal",
      hint: "Lompati duri tunggal di tengah koridor.",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 346, width: 36, height: 54 },
      blocks: [
        { x: 0, y: 400, w: 800, h: 60 }
      ],
      spikes: [
        { x: 380, y: 380, size: 20, dir: 'up' },
        { x: 400, y: 380, size: 20, dir: 'up' }
      ],
      traps: []
    },
    {
      id: 9,
      title: "Level 9: Lari Santai Menuju Kantin SUD",
      hint: "Lompat santai melewati rintangan meja kantin.",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 346, width: 36, height: 54 },
      blocks: [
        { x: 0, y: 400, w: 240, h: 60 },
        { x: 300, y: 350, w: 200, h: 20 },
        { x: 560, y: 400, w: 240, h: 60 }
      ],
      spikes: [
        { x: 250, y: 440, size: 20, dir: 'up' },
        { x: 510, y: 440, size: 20, dir: 'up' }
      ],
      traps: []
    },
    {
      id: 10,
      title: "Level 10: Pijakan Tepi Danau Toba",
      hint: "Pemandangan indah Danau Toba menemani langkahmu.",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 286, width: 36, height: 54 },
      blocks: [
        { x: 0, y: 400, w: 180, h: 60 },
        { x: 230, y: 360, w: 80, h: 20 },
        { x: 360, y: 320, w: 80, h: 20 },
        { x: 490, y: 340, w: 80, h: 20 },
        { x: 620, y: 340, w: 180, h: 60 }
      ],
      spikes: [],
      traps: []
    },
    {
      id: 11,
      title: "Level 11: Jembatan Gantung Mini",
      hint: "Lompat melewati pulau platform kecil.",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 346, width: 36, height: 54 },
      blocks: [
        { x: 0, y: 400, w: 180, h: 60 },
        { x: 240, y: 380, w: 60, h: 20 },
        { x: 350, y: 360, w: 60, h: 20 },
        { x: 460, y: 380, w: 60, h: 20 },
        { x: 570, y: 400, w: 230, h: 60 }
      ],
      spikes: [
        { x: 190, y: 440, size: 20, dir: 'up' },
        { x: 305, y: 440, size: 20, dir: 'up' },
        { x: 415, y: 440, size: 20, dir: 'up' },
        { x: 525, y: 440, size: 20, dir: 'up' }
      ],
      traps: []
    },
    {
      id: 12,
      title: "Level 12: Menuju Laboratorium Komputer",
      hint: "Platform tinggi bisa dicapai dengan double jump.",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 186, width: 36, height: 54 },
      blocks: [
        { x: 0, y: 400, w: 200, h: 60 },
        { x: 260, y: 320, w: 100, h: 20 },
        { x: 420, y: 260, w: 100, h: 20 },
        { x: 580, y: 240, w: 220, h: 30 }
      ],
      spikes: [],
      traps: []
    },
    {
      id: 13,
      title: "Level 13: Apel Pagi Hari Pertama",
      hint: "Berbaris rapi dan melangkah mantap.",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 346, width: 36, height: 54 },
      blocks: [
        { x: 0, y: 400, w: 300, h: 60 },
        { x: 360, y: 370, w: 80, h: 20 },
        { x: 500, y: 400, w: 300, h: 60 }
      ],
      spikes: [
        { x: 310, y: 440, size: 20, dir: 'up' },
        { x: 450, y: 440, size: 20, dir: 'up' }
      ],
      traps: []
    },
    {
      id: 14,
      title: "Level 14: Selasar Menuju Asrama Angkatan 15",
      hint: "Tinggal sedikit lagi menuju kelulusan tahap awal!",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 346, width: 36, height: 54 },
      blocks: [
        { x: 0, y: 400, w: 220, h: 60 },
        { x: 270, y: 360, w: 80, h: 20 },
        { x: 400, y: 330, w: 80, h: 20 },
        { x: 530, y: 360, w: 80, h: 20 },
        { x: 660, y: 400, w: 140, h: 60 }
      ],
      spikes: [
        { x: 230, y: 440, size: 20, dir: 'up' },
        { x: 360, y: 440, size: 20, dir: 'up' },
        { x: 490, y: 440, size: 20, dir: 'up' },
        { x: 620, y: 440, size: 20, dir: 'up' }
      ],
      traps: []
    },
    {
      id: 15,
      title: "Level 15: Ujian Masuk Siswa Baru SUD (Kelulusan Easy)",
      hint: "Kombinasi melompat dan double jump untuk mencapai pintu emas!",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 166, width: 40, height: 60, isFinal: true },
      blocks: [
        { x: 0, y: 400, w: 180, h: 60 },
        { x: 240, y: 340, w: 90, h: 20 },
        { x: 390, y: 280, w: 90, h: 20 },
        { x: 540, y: 220, w: 90, h: 20 },
        { x: 670, y: 220, w: 130, h: 30 }
      ],
      spikes: [
        { x: 190, y: 440, size: 20, dir: 'up' },
        { x: 340, y: 440, size: 20, dir: 'up' },
        { x: 490, y: 440, size: 20, dir: 'up' }
      ],
      traps: []
    }
  ],

  // =========================================================================
  // MEDIUM MODE (15 LEVELS) - Jebakan Troll Klasik Level Devil
  // =========================================================================
  medium: [
    {
      id: 1,
      title: "Level 1: Pijakan Pertama yang Menipu",
      hint: "Hati-hati, pijakan kecil di tengah bisa runtuh!",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 346, width: 36, height: 54 },
      blocks: [
        { x: 0, y: 400, w: 300, h: 60 },
        { x: 380, y: 400, w: 420, h: 60 },
        { x: 320, y: 370, w: 40, h: 20 }
      ],
      spikes: [
        { x: 300, y: 440, size: 20, dir: 'up' },
        { x: 340, y: 440, size: 20, dir: 'up' }
      ],
      traps: [
        {
          type: 'fake_step_drop',
          targetBlockIdx: 2,
          triggerX: 290,
          triggered: false,
          action: (level) => {
            level.blocks[2].y += 8;
          }
        }
      ]
    },
    {
      id: 2,
      title: "Level 2: Koridor Asrama Amblas",
      hint: "Langkah cepat sebelum jembatan runtuh ke bawah!",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 346, width: 36, height: 54 },
      blocks: [
        { x: 0, y: 400, w: 220, h: 60 },
        { x: 230, y: 400, w: 70, h: 20, isDropping: false, id: 'drop1' },
        { x: 310, y: 400, w: 70, h: 20, isDropping: false, id: 'drop2' },
        { x: 390, y: 400, w: 70, h: 20, isDropping: false, id: 'drop3' },
        { x: 470, y: 400, w: 70, h: 20, isDropping: false, id: 'drop4' },
        { x: 550, y: 400, w: 250, h: 60 },
        { x: 330, y: 270, w: 120, h: 20 }
      ],
      spikes: [
        { x: 230, y: 450, size: 20, dir: 'up' },
        { x: 290, y: 450, size: 20, dir: 'up' },
        { x: 350, y: 450, size: 20, dir: 'up' },
        { x: 410, y: 450, size: 20, dir: 'up' },
        { x: 470, y: 450, size: 20, dir: 'up' }
      ],
      traps: [
        {
          type: 'step_collapse',
          update: (level, player) => {
            level.blocks.forEach(b => {
              if (b.id && b.id.startsWith('drop')) {
                if (Math.abs(player.x - (b.x + b.w / 2)) < 45 && Math.abs(player.y - b.y) < 20) {
                  b.isDropping = true;
                }
                if (b.isDropping) b.y += 6;
              }
            });
          }
        }
      ]
    },
    {
      id: 3,
      title: "Level 3: Pintu Ruang Kelas Kabur",
      hint: "Kejar pintunya sampai terpojok ke dinding!",
      spawn: { x: 60, y: 380 },
      door: { x: 500, y: 346, width: 36, height: 54, escaped: false },
      blocks: [
        { x: 0, y: 400, w: 800, h: 60 },
        { x: 0, y: 0, w: 20, h: 460 },
        { x: 780, y: 0, w: 20, h: 460 }
      ],
      spikes: [],
      traps: [
        {
          type: 'runaway_door',
          update: (level, player) => {
            const door = level.door;
            const dist = door.x - player.x;
            if (dist > 0 && dist < 120 && door.x < 720) {
              door.x += 4.8;
              window.sound.playTrap();
            } else if (door.x >= 720 && player.x > 620) {
              if (!door.escaped) {
                door.x = 100;
                door.escaped = true;
                window.sound.playTrap();
              }
            }
          }
        }
      ]
    },
    {
      id: 4,
      title: "Level 4: Duri Jatuh di Selasar Graha Del",
      hint: "Perhatikan langit-langit atap selasar!",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 346, width: 36, height: 54 },
      blocks: [
        { x: 0, y: 400, w: 800, h: 60 },
        { x: 0, y: 0, w: 800, h: 30 }
      ],
      spikes: [
        { x: 220, y: 30, size: 22, dir: 'down', falling: false, triggerX: 180 },
        { x: 360, y: 30, size: 22, dir: 'down', falling: false, triggerX: 310 },
        { x: 500, y: 30, size: 22, dir: 'down', falling: false, triggerX: 450 },
        { x: 640, y: 30, size: 22, dir: 'down', falling: false, triggerX: 590 }
      ],
      traps: [
        {
          type: 'falling_spikes',
          update: (level, player) => {
            level.spikes.forEach(s => {
              if (player.x > s.triggerX && !s.falling) {
                s.falling = true;
                window.sound.playTrap();
              }
              if (s.falling && s.y < 378) s.y += 9.5;
            });
          }
        }
      ]
    },
    {
      id: 5,
      title: "Level 5: Pijakan yang Menghindar",
      hint: "Platformnya pintar, selalu amblas saat didekati!",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 346, width: 36, height: 54 },
      blocks: [
        { x: 0, y: 400, w: 180, h: 60 },
        { x: 260, y: 380, w: 90, h: 20, isDodging: true, origY: 380 },
        { x: 440, y: 380, w: 90, h: 20, isDodging: true, origY: 380 },
        { x: 620, y: 400, w: 180, h: 60 }
      ],
      spikes: [
        { x: 190, y: 440, size: 20, dir: 'up' },
        { x: 360, y: 440, size: 20, dir: 'up' },
        { x: 540, y: 440, size: 20, dir: 'up' }
      ],
      traps: [
        {
          type: 'dodge_platforms',
          update: (level, player) => {
            level.blocks.forEach(b => {
              if (b.isDodging) {
                const dist = Math.hypot(player.x - (b.x + b.w / 2), player.y - b.y);
                if (dist < 70 && player.vy > 0) {
                  b.y = b.origY + 70;
                } else if (dist > 140) {
                  b.y = b.origY;
                }
              }
            });
          }
        }
      ]
    },
    {
      id: 6,
      title: "Level 6: Patroli Diktat Sains SUD 15",
      hint: "Lompati buku diktat yang berpatroli!",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 346, width: 36, height: 54 },
      hazards: [
        { x: 260, y: 370, w: 32, h: 32, vx: 3.2, minX: 200, maxX: 400, type: 'exam_book' },
        { x: 540, y: 370, w: 32, h: 32, vx: -4, minX: 450, maxX: 660, type: 'exam_book' }
      ],
      blocks: [
        { x: 0, y: 400, w: 800, h: 60 },
        { x: 320, y: 290, w: 80, h: 20 },
        { x: 500, y: 290, w: 80, h: 20 }
      ],
      spikes: [],
      traps: [
        {
          type: 'moving_hazards',
          update: (level, player) => {
            level.hazards.forEach(h => {
              h.x += h.vx;
              if (h.x <= h.minX || h.x >= h.maxX) h.vx *= -1;
              if (Math.abs(player.x - (h.x + h.w / 2)) < 22 && Math.abs(player.y - (h.y + h.h)) < 24) {
                player.die("Tertabrak buku Diktat Sains tebal!");
              }
            });
          }
        }
      ]
    },
    {
      id: 7,
      title: "Level 7: Server Ujian CBT SUD Berkedip",
      hint: "Hafalkan ritme muncul dan hilangnya pijakan server!",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 346, width: 36, height: 54 },
      blocks: [
        { x: 0, y: 400, w: 160, h: 60 },
        { x: 200, y: 360, w: 80, h: 20, phase: 0, active: true },
        { x: 340, y: 320, w: 80, h: 20, phase: 1, active: false },
        { x: 480, y: 360, w: 80, h: 20, phase: 0, active: true },
        { x: 640, y: 400, w: 160, h: 60 }
      ],
      spikes: [
        { x: 170, y: 440, size: 20, dir: 'up' },
        { x: 310, y: 440, size: 20, dir: 'up' },
        { x: 450, y: 440, size: 20, dir: 'up' },
        { x: 590, y: 440, size: 20, dir: 'up' }
      ],
      traps: [
        {
          type: 'blinking_blocks',
          timer: 0,
          update: (level) => {
            this.timer = (this.timer || 0) + 1;
            const phase = Math.floor(this.timer / 60) % 2;
            level.blocks.forEach(b => {
              if (b.phase !== undefined) b.active = (b.phase === phase);
            });
          }
        }
      ]
    },
    {
      id: 8,
      title: "Level 8: Tiga Pintu Lab SMA Tipuan",
      hint: "Pintu pertama jebakan duri, pintu kedua melempar ke awal!",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 346, width: 36, height: 54 },
      fakeDoors: [
        { x: 300, y: 346, width: 36, height: 54, triggered: false, type: 'spike_trap' },
        { x: 520, y: 346, width: 36, height: 54, triggered: false, type: 'teleport_back' }
      ],
      blocks: [
        { x: 0, y: 400, w: 800, h: 60 }
      ],
      spikes: [],
      traps: [
        {
          type: 'fake_doors_check',
          update: (level, player) => {
            level.fakeDoors.forEach(fd => {
              if (Math.abs(player.x - (fd.x + fd.width / 2)) < 20 && Math.abs(player.y - (fd.y + fd.height)) < 15) {
                if (fd.type === 'spike_trap') {
                  window.sound.playDeath();
                  player.die("Pintu pertama berisi jebakan duri rahasia!");
                } else if (fd.type === 'teleport_back') {
                  window.sound.playTrap();
                  player.x = level.spawn.x;
                  player.y = level.spawn.y;
                  if (window.showTrollToast) window.showTrollToast("🌀 Pintu kedua melemparmu kembali ke awal!");
                }
              }
            });
          }
        }
      ]
    },
    {
      id: 9,
      title: "Level 9: Selasar SUD Basah Gerimis Danau Toba",
      hint: "Lantai sangat licin, jaga momentum lompatanmu!",
      slippery: true,
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 346, width: 36, height: 54 },
      blocks: [
        { x: 0, y: 400, w: 260, h: 60 },
        { x: 320, y: 400, w: 200, h: 60 },
        { x: 580, y: 400, w: 220, h: 60 }
      ],
      spikes: [
        { x: 265, y: 440, size: 20, dir: 'up' },
        { x: 285, y: 440, size: 20, dir: 'up' },
        { x: 525, y: 440, size: 20, dir: 'up' },
        { x: 545, y: 440, size: 20, dir: 'up' }
      ],
      traps: []
    },
    {
      id: 10,
      title: "Level 10: Gerbang Portal Asrama SUD",
      hint: "Pintu teleportasi berpindah 3 kali saat disentuh.",
      spawn: { x: 60, y: 380 },
      door: { x: 300, y: 256, width: 36, height: 54, teleportsLeft: 3 },
      doorTargets: [
        { x: 560, y: 206 },
        { x: 200, y: 346 },
        { x: 740, y: 346 }
      ],
      blocks: [
        { x: 0, y: 400, w: 800, h: 60 },
        { x: 260, y: 310, w: 100, h: 20 },
        { x: 520, y: 260, w: 100, h: 20 }
      ],
      spikes: [],
      traps: [
        {
          type: 'multi_teleport_door',
          update: (level, player) => {
            const door = level.door;
            if (door.teleportsLeft > 0) {
              if (Math.abs(player.x - (door.x + door.width / 2)) < 24 && Math.abs(player.y - (door.y + door.height)) < 20) {
                const target = level.doorTargets[3 - door.teleportsLeft];
                door.x = target.x;
                door.y = target.y;
                door.teleportsLeft--;
                window.sound.playTrap();
                if (window.showTrollToast) window.showTrollToast("⚡ Pintu asrama berpindah lagi!");
              }
            }
          }
        }
      ]
    },
    {
      id: 11,
      title: "Level 11: Razia Sorot Pamong Asrama",
      hint: "Hindari sorotan lampu piket pamong!",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 346, width: 36, height: 54 },
      searchlights: [
        { x: 320, angle: 0, speed: 0.045, range: 125 },
        { x: 560, angle: Math.PI, speed: 0.045, range: 125 }
      ],
      blocks: [
        { x: 0, y: 400, w: 800, h: 60 },
        { x: 280, y: 280, w: 80, h: 20 },
        { x: 520, y: 280, w: 80, h: 20 }
      ],
      spikes: [],
      traps: [
        {
          type: 'searchlight_check',
          update: (level, player) => {
            level.searchlights.forEach(sl => {
              sl.angle += sl.speed;
              const beamX = sl.x + Math.sin(sl.angle) * sl.range;
              if (Math.abs(player.x - beamX) < 30 && player.y > 340) {
                player.die("Kena razia lampu sorot pamong asrama!");
              }
            });
          }
        }
      ]
    },
    {
      id: 12,
      title: "Level 12: Lompat Tinggi di Atas Duri",
      hint: "Gunakan double jump untuk melompati deretan duri panjang.",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 346, width: 36, height: 54 },
      blocks: [
        { x: 0, y: 400, w: 200, h: 60 },
        { x: 330, y: 320, w: 140, h: 20 },
        { x: 600, y: 400, w: 200, h: 60 }
      ],
      spikes: [
        { x: 210, y: 440, size: 20, dir: 'up' },
        { x: 240, y: 440, size: 20, dir: 'up' },
        { x: 270, y: 440, size: 20, dir: 'up' },
        { x: 480, y: 440, size: 20, dir: 'up' },
        { x: 510, y: 440, size: 20, dir: 'up' },
        { x: 540, y: 440, size: 20, dir: 'up' }
      ],
      traps: []
    },
    {
      id: 13,
      title: "Level 13: Pijakan Bergerak Melintasi Koridor",
      hint: "Tunggu platform bergerak mendekat sebelum melompat.",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 346, width: 36, height: 54 },
      blocks: [
        { x: 0, y: 400, w: 180, h: 60 },
        { x: 240, y: 360, w: 80, h: 20, vx: 2, minX: 200, maxX: 400, isMoving: true },
        { x: 480, y: 360, w: 80, h: 20, vx: -2, minX: 440, maxX: 620, isMoving: true },
        { x: 640, y: 400, w: 160, h: 60 }
      ],
      spikes: [
        { x: 190, y: 440, size: 20, dir: 'up' },
        { x: 330, y: 440, size: 20, dir: 'up' },
        { x: 470, y: 440, size: 20, dir: 'up' },
        { x: 610, y: 440, size: 20, dir: 'up' }
      ],
      traps: [
        {
          type: 'moving_platforms',
          update: (level) => {
            level.blocks.forEach(b => {
              if (b.isMoving) {
                b.x += b.vx;
                if (b.x <= b.minX || b.x >= b.maxX) b.vx *= -1;
              }
            });
          }
        }
      ]
    },
    {
      id: 14,
      title: "Level 14: Jebakan Pijakan Amblas Cepat",
      hint: "Jangan berhenti! Lari dan lompat tanpa ragu.",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 346, width: 36, height: 54 },
      blocks: [
        { x: 0, y: 400, w: 160, h: 60 },
        { x: 200, y: 380, w: 60, h: 20, isDropping: false, id: 'm_d1' },
        { x: 300, y: 350, w: 60, h: 20, isDropping: false, id: 'm_d2' },
        { x: 400, y: 320, w: 60, h: 20, isDropping: false, id: 'm_d3' },
        { x: 500, y: 350, w: 60, h: 20, isDropping: false, id: 'm_d4' },
        { x: 600, y: 400, w: 200, h: 60 }
      ],
      spikes: [
        { x: 170, y: 440, size: 20, dir: 'up' },
        { x: 270, y: 440, size: 20, dir: 'up' },
        { x: 370, y: 440, size: 20, dir: 'up' },
        { x: 470, y: 440, size: 20, dir: 'up' },
        { x: 570, y: 440, size: 20, dir: 'up' }
      ],
      traps: [
        {
          type: 'chain_collapse',
          update: (level, player) => {
            level.blocks.forEach(b => {
              if (b.id && b.id.startsWith('m_d')) {
                if (Math.abs(player.x - (b.x + b.w / 2)) < 35 && Math.abs(player.y - b.y) < 20) {
                  b.isDropping = true;
                }
                if (b.isDropping) b.y += 5.5;
              }
            });
          }
        }
      ]
    },
    {
      id: 15,
      title: "Level 15: Ujian Tengah Semester SUD 15 (Boss Medium)",
      hint: "Gabungan lantai amblas, duri jatuh, dan platform menghindar!",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 166, width: 40, height: 60, isFinal: true },
      blocks: [
        { x: 0, y: 400, w: 160, h: 60 },
        { x: 220, y: 360, w: 70, h: 20, isDropping: false, id: 'drop_m1' },
        { x: 350, y: 300, w: 80, h: 20 },
        { x: 490, y: 260, w: 80, h: 20, isDodging: true, origY: 260 },
        { x: 630, y: 220, w: 170, h: 30 }
      ],
      spikes: [
        { x: 170, y: 440, size: 20, dir: 'up' },
        { x: 300, y: 440, size: 20, dir: 'up' },
        { x: 440, y: 440, size: 20, dir: 'up' },
        { x: 350, y: 40, size: 22, dir: 'down', falling: false, triggerX: 320 }
      ],
      traps: [
        {
          type: 'boss_medium',
          update: (level, player) => {
            const b1 = level.blocks[1];
            if (Math.abs(player.x - (b1.x + b1.w / 2)) < 40 && Math.abs(player.y - b1.y) < 20) {
              b1.isDropping = true;
            }
            if (b1.isDropping) b1.y += 6;

            const s = level.spikes[3];
            if (player.x > s.triggerX && !s.falling) {
              s.falling = true;
              window.sound.playTrap();
            }
            if (s.falling && s.y < 290) s.y += 10;

            const b3 = level.blocks[3];
            const dist = Math.hypot(player.x - (b3.x + b3.w / 2), player.y - b3.y);
            if (dist < 60 && player.vy > 0) {
              b3.y = b3.origY + 60;
            } else if (dist > 120) {
              b3.y = b3.origY;
            }
          }
        }
      ]
    }
  ],

  // =========================================================================
  // HARD MODE (15 LEVELS) - Hardcore Troll Platformer (100% Solvable)
  // =========================================================================
  hard: [
    {
      id: 1,
      title: "Level 1: Gravitasi Lab Sains Terbalik",
      hint: "Sentuh kristal ungu untuk membalik gravitasi ke langit-langit!",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 60, width: 36, height: 54 },
      invertedGravity: false,
      crystals: [
        { x: 380, y: 340, radius: 12, collected: false }
      ],
      blocks: [
        { x: 0, y: 400, w: 420, h: 60 },
        { x: 380, y: 40, w: 420, h: 40 },
        { x: 200, y: 280, w: 100, h: 20 },
        { x: 500, y: 150, w: 120, h: 20 }
      ],
      spikes: [
        { x: 440, y: 380, size: 20, dir: 'up' },
        { x: 480, y: 380, size: 20, dir: 'up' },
        { x: 520, y: 380, size: 20, dir: 'up' }
      ],
      traps: [
        {
          type: 'gravity_crystal',
          update: (level, player) => {
            level.crystals.forEach(c => {
              if (!c.collected && Math.hypot(player.x - c.x, (player.y - 20) - c.y) < 25) {
                c.collected = true;
                level.invertedGravity = true;
                window.sound.playGravity();
              }
            });
          }
        }
      ]
    },
    {
      id: 2,
      title: "Level 2: Tombol Panik Ujian Coding (Kontrol Terbalik)",
      hint: "Saat tombol aktif, kontrol terbalik: Kiri jadi Kanan!",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 346, width: 36, height: 54 },
      reversedControls: false,
      blocks: [
        { x: 0, y: 400, w: 300, h: 60 },
        { x: 360, y: 400, w: 100, h: 60 },
        { x: 520, y: 400, w: 280, h: 60 }
      ],
      spikes: [
        { x: 300, y: 440, size: 20, dir: 'up' },
        { x: 460, y: 440, size: 20, dir: 'up' }
      ],
      traps: [
        {
          type: 'reverse_controls',
          update: (level, player) => {
            if (player.x > 320 && !level.reversedControls) {
              level.reversedControls = true;
              window.sound.playTrap();
              if (window.showTrollToast) window.showTrollToast("⚠️ KONTROL TERBALIK! (KIRI = KANAN)");
            }
          }
        }
      ]
    },
    {
      id: 3,
      title: "Level 3: Lampu Asrama Padam (Mode Senter)",
      hint: "Gunakan cahaya sentermu untuk melihat duri tersembunyi.",
      darknessMode: true,
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 346, width: 36, height: 54 },
      blocks: [
        { x: 0, y: 400, w: 200, h: 60 },
        { x: 260, y: 370, w: 80, h: 20 },
        { x: 380, y: 330, w: 80, h: 20 },
        { x: 500, y: 370, w: 80, h: 20 },
        { x: 620, y: 400, w: 180, h: 60 }
      ],
      spikes: [
        { x: 210, y: 440, size: 20, dir: 'up' },
        { x: 345, y: 440, size: 20, dir: 'up' },
        { x: 465, y: 440, size: 20, dir: 'up' },
        { x: 585, y: 440, size: 20, dir: 'up' }
      ],
      traps: []
    },
    {
      id: 4,
      title: "Level 4: Gravitasi + Duri Langit Kombinasi",
      hint: "Balik gravitasi sambil menghindari duri yang berjatuhan!",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 60, width: 36, height: 54 },
      invertedGravity: false,
      crystals: [
        { x: 300, y: 340, radius: 12, collected: false }
      ],
      blocks: [
        { x: 0, y: 400, w: 340, h: 60 },
        { x: 320, y: 40, w: 480, h: 40 },
        { x: 460, y: 180, w: 100, h: 20 }
      ],
      spikes: [
        { x: 500, y: 380, size: 20, dir: 'up' },
        { x: 560, y: 380, size: 20, dir: 'up' },
        { x: 420, y: 40, size: 22, dir: 'down', falling: false, triggerX: 380 }
      ],
      traps: [
        {
          type: 'grav_and_spike',
          update: (level, player) => {
            level.crystals.forEach(c => {
              if (!c.collected && Math.hypot(player.x - c.x, (player.y - 20) - c.y) < 25) {
                c.collected = true;
                level.invertedGravity = true;
                window.sound.playGravity();
              }
            });
            const s = level.spikes[2];
            if (player.x > s.triggerX && !s.falling) {
              s.falling = true;
              window.sound.playTrap();
            }
            if (s.falling && s.y < 280) s.y += 9;
          }
        }
      ]
    },
    {
      id: 5,
      title: "Level 5: Portal Teleportasi 5 Titik",
      hint: "Sentuh portal berkali-kali sampai titik akhir terbuka!",
      spawn: { x: 60, y: 380 },
      door: { x: 260, y: 286, width: 36, height: 54, teleportsLeft: 4 },
      doorTargets: [
        { x: 440, y: 226 },
        { x: 620, y: 346 },
        { x: 180, y: 346 },
        { x: 740, y: 346 }
      ],
      blocks: [
        { x: 0, y: 400, w: 800, h: 60 },
        { x: 220, y: 340, w: 90, h: 20 },
        { x: 400, y: 280, w: 90, h: 20 }
      ],
      spikes: [],
      traps: [
        {
          type: 'teleport_5',
          update: (level, player) => {
            const door = level.door;
            if (door.teleportsLeft > 0) {
              if (Math.abs(player.x - (door.x + door.width / 2)) < 24 && Math.abs(player.y - (door.y + door.height)) < 20) {
                const target = level.doorTargets[4 - door.teleportsLeft];
                door.x = target.x;
                door.y = target.y;
                door.teleportsLeft--;
                window.sound.playTrap();
              }
            }
          }
        }
      ]
    },
    {
      id: 6,
      title: "Level 6: Jembatan Runtuh + Kontrol Terbalik",
      hint: "Saat kontrol terbalik di tengah jembatan yang amblas!",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 346, width: 36, height: 54 },
      reversedControls: false,
      blocks: [
        { x: 0, y: 400, w: 180, h: 60 },
        { x: 200, y: 400, w: 80, h: 20, isDropping: false, id: 'h_drop1' },
        { x: 300, y: 400, w: 80, h: 20, isDropping: false, id: 'h_drop2' },
        { x: 400, y: 400, w: 80, h: 20, isDropping: false, id: 'h_drop3' },
        { x: 500, y: 400, w: 80, h: 20, isDropping: false, id: 'h_drop4' },
        { x: 600, y: 400, w: 200, h: 60 }
      ],
      spikes: [
        { x: 200, y: 450, size: 20, dir: 'up' },
        { x: 300, y: 450, size: 20, dir: 'up' },
        { x: 400, y: 450, size: 20, dir: 'up' },
        { x: 500, y: 450, size: 20, dir: 'up' }
      ],
      traps: [
        {
          type: 'collapse_and_reverse',
          update: (level, player) => {
            if (player.x > 320 && !level.reversedControls) {
              level.reversedControls = true;
              window.sound.playTrap();
              if (window.showTrollToast) window.showTrollToast("⚠️ KONTROL TERBALIK DI ATAS JEMBATAN!");
            }
            level.blocks.forEach(b => {
              if (b.id && b.id.startsWith('h_drop')) {
                if (Math.abs(player.x - (b.x + b.w / 2)) < 40 && Math.abs(player.y - b.y) < 20) {
                  b.isDropping = true;
                }
                if (b.isDropping) b.y += 6;
              }
            });
          }
        }
      ]
    },
    {
      id: 7,
      title: "Level 7: Selasar Gelap Gulita + Lampu Pamong",
      hint: "Gelap gulita ditambah lampu razia malam yang berputar!",
      darknessMode: true,
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 346, width: 36, height: 54 },
      searchlights: [
        { x: 360, angle: 0, speed: 0.05, range: 130 },
        { x: 560, angle: Math.PI, speed: 0.05, range: 130 }
      ],
      blocks: [
        { x: 0, y: 400, w: 800, h: 60 }
      ],
      spikes: [],
      traps: [
        {
          type: 'dark_searchlight',
          update: (level, player) => {
            level.searchlights.forEach(sl => {
              sl.angle += sl.speed;
              const beamX = sl.x + Math.sin(sl.angle) * sl.range;
              if (Math.abs(player.x - beamX) < 30 && player.y > 340) {
                player.die("Tertangkap lampu sorot pamong dalam gelap!");
              }
            });
          }
        }
      ]
    },
    {
      id: 8,
      title: "Level 8: Pijakan Memori Heap Menghindar Beruntun",
      hint: "Gunakan double jump untuk mengatasi platform yang kabur ke bawah!",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 346, width: 36, height: 54 },
      blocks: [
        { x: 0, y: 400, w: 160, h: 60 },
        { x: 220, y: 380, w: 80, h: 20, isDodging: true, origY: 380 },
        { x: 360, y: 380, w: 80, h: 20, isDodging: true, origY: 380 },
        { x: 500, y: 380, w: 80, h: 20, isDodging: true, origY: 380 },
        { x: 640, y: 400, w: 160, h: 60 }
      ],
      spikes: [
        { x: 170, y: 440, size: 20, dir: 'up' },
        { x: 310, y: 440, size: 20, dir: 'up' },
        { x: 450, y: 440, size: 20, dir: 'up' },
        { x: 590, y: 440, size: 20, dir: 'up' }
      ],
      traps: [
        {
          type: 'hard_dodge',
          update: (level, player) => {
            level.blocks.forEach(b => {
              if (b.isDodging) {
                const dist = Math.hypot(player.x - (b.x + b.w / 2), player.y - b.y);
                if (dist < 65 && player.vy > 0) {
                  b.y = b.origY + 65;
                } else if (dist > 130) {
                  b.y = b.origY;
                }
              }
            });
          }
        }
      ]
    },
    {
      id: 9,
      title: "Level 9: Labirin Duri Udara (Double Jump Matrix)",
      hint: "Wajib double jump presisi di antara deretan duri!",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 346, width: 36, height: 54 },
      blocks: [
        { x: 0, y: 400, w: 180, h: 60 },
        { x: 260, y: 300, w: 60, h: 20 },
        { x: 420, y: 240, w: 60, h: 20 },
        { x: 580, y: 300, w: 60, h: 20 },
        { x: 680, y: 400, w: 120, h: 60 }
      ],
      spikes: [
        { x: 190, y: 440, size: 20, dir: 'up' },
        { x: 330, y: 440, size: 20, dir: 'up' },
        { x: 490, y: 440, size: 20, dir: 'up' },
        { x: 280, y: 40, size: 22, dir: 'down' },
        { x: 440, y: 40, size: 22, dir: 'down' }
      ],
      traps: []
    },
    {
      id: 10,
      title: "Level 10: Hujan Diktat Sains & Duri Langit",
      hint: "Patroli buku kalkulus berkecepatan tinggi!",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 346, width: 36, height: 54 },
      hazards: [
        { x: 240, y: 370, w: 32, h: 32, vx: 4.5, minX: 180, maxX: 420, type: 'exam_book' },
        { x: 500, y: 370, w: 32, h: 32, vx: -5.0, minX: 420, maxX: 680, type: 'exam_book' }
      ],
      blocks: [
        { x: 0, y: 400, w: 800, h: 60 },
        { x: 300, y: 280, w: 80, h: 20 },
        { x: 500, y: 280, w: 80, h: 20 }
      ],
      spikes: [
        { x: 380, y: 40, size: 22, dir: 'down', falling: false, triggerX: 350 }
      ],
      traps: [
        {
          type: 'moving_and_falling',
          update: (level, player) => {
            level.hazards.forEach(h => {
              h.x += h.vx;
              if (h.x <= h.minX || h.x >= h.maxX) h.vx *= -1;
              if (Math.abs(player.x - (h.x + h.w / 2)) < 22 && Math.abs(player.y - (h.y + h.h)) < 24) {
                player.die("Tertabrak buku Diktat Sains berkecepatan tinggi!");
              }
            });
            const s = level.spikes[0];
            if (player.x > s.triggerX && !s.falling) {
              s.falling = true;
              window.sound.playTrap();
            }
            if (s.falling && s.y < 378) s.y += 10;
          }
        }
      ]
    },
    {
      id: 11,
      title: "Level 11: Server Berkedip Cepat + Gravitasi Berganti",
      hint: "Pijakan berkedip cepat setiap detik!",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 346, width: 36, height: 54 },
      blocks: [
        { x: 0, y: 400, w: 160, h: 60 },
        { x: 200, y: 360, w: 80, h: 20, phase: 0, active: true },
        { x: 340, y: 320, w: 80, h: 20, phase: 1, active: false },
        { x: 480, y: 360, w: 80, h: 20, phase: 0, active: true },
        { x: 640, y: 400, w: 160, h: 60 }
      ],
      spikes: [
        { x: 170, y: 440, size: 20, dir: 'up' },
        { x: 310, y: 440, size: 20, dir: 'up' },
        { x: 450, y: 440, size: 20, dir: 'up' },
        { x: 590, y: 440, size: 20, dir: 'up' }
      ],
      traps: [
        {
          type: 'fast_blinking',
          timer: 0,
          update: (level) => {
            this.timer = (this.timer || 0) + 1;
            const phase = Math.floor(this.timer / 40) % 2; // Fast rhythm!
            level.blocks.forEach(b => {
              if (b.phase !== undefined) b.active = (b.phase === phase);
            });
          }
        }
      ]
    },
    {
      id: 12,
      title: "Level 12: Pintu Tipuan 5 Arah + Lantai Amblas",
      hint: "Hanya satu pintu asli, sisanya melemparmu kembali!",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 346, width: 36, height: 54 },
      fakeDoors: [
        { x: 220, y: 346, width: 36, height: 54, type: 'teleport_back' },
        { x: 380, y: 346, width: 36, height: 54, type: 'spike_trap' },
        { x: 540, y: 346, width: 36, height: 54, type: 'teleport_back' }
      ],
      blocks: [
        { x: 0, y: 400, w: 800, h: 60 }
      ],
      spikes: [],
      traps: [
        {
          type: 'hard_fake_doors',
          update: (level, player) => {
            level.fakeDoors.forEach(fd => {
              if (Math.abs(player.x - (fd.x + fd.width / 2)) < 20 && Math.abs(player.y - (fd.y + fd.height)) < 15) {
                if (fd.type === 'spike_trap') {
                  window.sound.playDeath();
                  player.die("Pintu jebakan duri rahasia!");
                } else if (fd.type === 'teleport_back') {
                  window.sound.playTrap();
                  player.x = level.spawn.x;
                  player.y = level.spawn.y;
                  if (window.showTrollToast) window.showTrollToast("🌀 Pintu palsu melemparmu kembali ke awal!");
                }
              }
            });
          }
        }
      ]
    },
    {
      id: 13,
      title: "Level 13: Lorong Angin Danau Toba (Super Licin)",
      hint: "Sangat licin dengan celah duri sempit!",
      slippery: true,
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 346, width: 36, height: 54 },
      blocks: [
        { x: 0, y: 400, w: 200, h: 60 },
        { x: 280, y: 400, w: 160, h: 60 },
        { x: 500, y: 400, w: 140, h: 60 },
        { x: 680, y: 400, w: 120, h: 60 }
      ],
      spikes: [
        { x: 210, y: 440, size: 20, dir: 'up' },
        { x: 240, y: 440, size: 20, dir: 'up' },
        { x: 450, y: 440, size: 20, dir: 'up' },
        { x: 645, y: 440, size: 20, dir: 'up' }
      ],
      traps: []
    },
    {
      id: 14,
      title: "Level 14: Razia Total Pamong Malam (Double Searchlights)",
      hint: "Dua lampu sorot cepat berpatroli serentak!",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 346, width: 36, height: 54 },
      searchlights: [
        { x: 260, angle: 0, speed: 0.06, range: 130 },
        { x: 520, angle: Math.PI * 0.7, speed: 0.06, range: 130 }
      ],
      blocks: [
        { x: 0, y: 400, w: 800, h: 60 },
        { x: 240, y: 260, w: 80, h: 20 },
        { x: 500, y: 260, w: 80, h: 20 }
      ],
      spikes: [],
      traps: [
        {
          type: 'double_searchlight',
          update: (level, player) => {
            level.searchlights.forEach(sl => {
              sl.angle += sl.speed;
              const beamX = sl.x + Math.sin(sl.angle) * sl.range;
              if (Math.abs(player.x - beamX) < 30 && player.y > 330) {
                player.die("Tertangkap razia lampu sorot pamong!");
              }
            });
          }
        }
      ]
    },
    {
      id: 15,
      title: "Level 15: Kelulusan Paripurna Angkatan 15 (Final Hardcore)",
      hint: "Ujian pamungkas: Gravitasi terbalik, duri jatuh, dan platform amblas!",
      spawn: { x: 60, y: 380 },
      door: { x: 740, y: 60, width: 40, height: 60, isFinal: true },
      invertedGravity: false,
      crystals: [
        { x: 320, y: 340, radius: 12, collected: false }
      ],
      blocks: [
        { x: 0, y: 400, w: 160, h: 60 },
        { x: 200, y: 380, w: 70, h: 20, isDropping: false, id: 'final_drop1' },
        { x: 300, y: 350, w: 80, h: 20 },
        { x: 460, y: 80, w: 340, h: 40 },
        { x: 420, y: 200, w: 80, h: 20 }
      ],
      spikes: [
        { x: 170, y: 440, size: 20, dir: 'up' },
        { x: 270, y: 440, size: 20, dir: 'up' },
        { x: 500, y: 440, size: 20, dir: 'up' },
        { x: 380, y: 40, size: 22, dir: 'down', falling: false, triggerX: 330 }
      ],
      traps: [
        {
          type: 'ultimate_hard_boss',
          update: (level, player) => {
            level.crystals.forEach(c => {
              if (!c.collected && Math.hypot(player.x - c.x, (player.y - 20) - c.y) < 25) {
                c.collected = true;
                level.invertedGravity = true;
                window.sound.playGravity();
              }
            });
            const b1 = level.blocks[1];
            if (Math.abs(player.x - (b1.x + b1.w / 2)) < 35 && Math.abs(player.y - b1.y) < 20) {
              b1.isDropping = true;
            }
            if (b1.isDropping) b1.y += 6;

            const s = level.spikes[3];
            if (player.x > s.triggerX && !s.falling) {
              s.falling = true;
              window.sound.playTrap();
            }
            if (s.falling && s.y < 280) s.y += 10;
          }
        }
      ]
    }
  ]
};
