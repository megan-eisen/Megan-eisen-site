// ---------------------------------------------------------------------------
// Progressive-enhancement motion for both pages.
// Reimplements the design references' interactions idiomatically:
//   headline reveal, pointer-lean headline, scroll reveal, magnetic buttons,
//   square cursor ring, live world clocks, scroll-spy nav, chapter rail,
//   stat scramble, index-numeral drift, hero parallax.
//
// Everything decorative is gated behind prefers-reduced-motion and, where it
// only makes sense with a mouse, a (hover:hover) and (pointer:fine) check.
// Informational behavior (live clocks, scroll-spy, chapter rail) still runs
// with reduced motion; its own decorative bits (pulse, scale) are CSS and are
// disabled by the reduced-motion media query in global.css.
// ---------------------------------------------------------------------------

const reduced =
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
const fine =
  window.matchMedia?.('(hover: hover) and (pointer: fine)').matches ?? false;

// --- Headline reveal ("recal") ------------------------------------------------
function recal() {
  document.querySelectorAll<HTMLElement>('[data-recal]').forEach((h) => {
    const words = h.querySelectorAll<HTMLElement>('.rw');
    if (reduced) {
      words.forEach((w) => (w.style.opacity = '1'));
      return;
    }
    words.forEach((w, i) => {
      w.style.opacity = '0';
      try {
        const an = w.animate(
          [
            { opacity: 0, transform: 'translateY(-0.4em)', filter: 'blur(5px)' },
            { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' },
          ],
          { duration: 820, delay: 70 + i * 50, easing: 'cubic-bezier(.22,.92,.26,1)' }
        );
        an.onfinish = () => {
          w.style.opacity = '1';
          w.style.transform = 'none';
          w.style.filter = 'none';
        };
      } catch {
        w.style.opacity = '1';
      }
    });
    // Failsafe: never leave a headline invisible.
    window.setTimeout(() => {
      words.forEach((w) => {
        w.style.opacity = '1';
        w.style.transform = 'none';
        w.style.filter = 'none';
      });
    }, 2200);
  });
}

// --- Pointer-lean headline (magnetic words) ----------------------------------
function kinetic() {
  if (reduced || !fine) return;
  document.querySelectorAll<HTMLElement>('[data-kinetic]').forEach((box) => {
    const ws = [...box.querySelectorAll<HTMLElement>('.rw')];
    ws.forEach((w) => {
      w.style.transition = 'transform .35s cubic-bezier(.2,.8,.2,1)';
      w.style.willChange = 'transform';
    });
    box.addEventListener('pointermove', (e) => {
      ws.forEach((w) => {
        const r = w.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const dist = Math.hypot(dx, dy) || 1;
        const f = Math.max(0, 1 - dist / 440) * 13;
        w.style.transform = `translate(${(dx / dist) * f}px,${(dy / dist) * f}px)`;
      });
    });
    box.addEventListener('pointerleave', () => {
      ws.forEach((w) => (w.style.transform = 'none'));
    });
  });
}

// --- Scroll reveal ------------------------------------------------------------
function reveal() {
  if (reduced) return; // elements are visible by default; nothing to hide
  const show = (el: HTMLElement) => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  };
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          show(en.target as HTMLElement);
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: '0px 0px -4% 0px' }
  );
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    const r = el.getBoundingClientRect();
    // Already in view on load — don't hide it.
    if (r.top < (window.innerHeight || 800) * 0.97 && r.bottom > 0) {
      show(el);
      return;
    }
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition =
      'opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1)';
    io.observe(el);
    window.setTimeout(() => show(el), 1100); // failsafe
  });
}

// --- Magnetic buttons ---------------------------------------------------------
function magnetic() {
  if (reduced || !fine) return;
  document.querySelectorAll<HTMLElement>('[data-mag]').forEach((el) => {
    el.style.willChange = 'transform';
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.transition = 'transform .08s linear';
      el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.18}px,${
        (e.clientY - (r.top + r.height / 2)) * 0.3
      }px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transition = 'transform .4s cubic-bezier(.2,.9,.2,1)';
      el.style.transform = 'translate(0,0)';
    });
  });
}

// --- Square cursor ring -------------------------------------------------------
function cursorRing() {
  if (reduced || !fine || document.getElementById('fxring')) return;
  const ring = document.createElement('div');
  ring.id = 'fxring';
  ring.style.cssText =
    'position:fixed;left:0;top:0;width:30px;height:30px;border:1.5px solid #2422E8;' +
    'pointer-events:none;z-index:99998;transform:translate(-50%,-50%);opacity:0;' +
    'transition:width .28s cubic-bezier(.2,.8,.2,1),height .28s cubic-bezier(.2,.8,.2,1),' +
    'border-color .28s ease,background-color .28s ease,opacity .3s ease;';
  document.body.appendChild(ring);

  let tx = innerWidth / 2,
    ty = innerHeight / 2,
    rx = tx,
    ry = ty,
    started = false;
  const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

  addEventListener('mousemove', (e) => {
    tx = e.clientX;
    ty = e.clientY;
    if (!started) {
      started = true;
      rx = tx;
      ry = ty;
      ring.style.opacity = '1';
    }
  });
  addEventListener('mouseout', (e) => {
    if (!(e as MouseEvent).relatedTarget) ring.style.opacity = '0';
  });

  const hov = 'a,button,[data-mag],input,textarea';
  document.addEventListener('mouseover', (e) => {
    const t = (e.target as Element)?.closest?.(hov);
    if (t) {
      ring.style.width = '50px';
      ring.style.height = '50px';
      ring.style.borderColor = '#0AFFFB';
      ring.style.backgroundColor = 'rgba(10,255,251,0.10)';
    }
  });
  document.addEventListener('mouseout', (e) => {
    const t = (e.target as Element)?.closest?.(hov);
    if (t) {
      ring.style.width = '30px';
      ring.style.height = '30px';
      ring.style.borderColor = '#2422E8';
      ring.style.backgroundColor = 'transparent';
    }
  });

  const tick = () => {
    rx = lerp(rx, tx, 0.2);
    ry = lerp(ry, ty, 0.2);
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// --- Live world clocks --------------------------------------------------------
function clocks() {
  const clockEls = document.querySelectorAll<HTMLElement>('[data-clock]');
  if (!clockEls.length) return;

  const time = (tz: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(new Date());
    } catch {
      return '--:--';
    }
  };
  const hour = (tz: string) => {
    try {
      return (
        parseInt(
          new Intl.DateTimeFormat('en-US', {
            timeZone: tz,
            hour: '2-digit',
            hour12: false,
          }).format(new Date()),
          10
        ) || 0
      );
    } catch {
      return 12;
    }
  };
  const tick = () => {
    clockEls.forEach((el) => {
      el.textContent = time(el.getAttribute('data-clock')!);
    });
    document.querySelectorAll<HTMLElement>('[data-dot]').forEach((d) => {
      const h = hour(d.getAttribute('data-dot')!);
      const awake = h >= 7 && h < 23; // 07:00–23:00 = awake
      const home = d.getAttribute('data-home') === 'true';
      if (home) {
        d.style.background = 'var(--cy)';
        d.style.animation = reduced ? 'none' : 'pdot 2.2s ease-out infinite';
      } else {
        d.style.background = awake ? 'var(--cy)' : '#B9C0C9';
        d.style.animation = 'none';
        d.style.opacity = awake ? '1' : '0.85';
      }
    });
  };
  tick();
  window.setInterval(tick, 1000);
}

// --- Scroll-spy nav (Megan) ---------------------------------------------------
function scrollSpy() {
  const links = [...document.querySelectorAll<HTMLElement>('.nav .spy')];
  if (!links.length) return;
  const set = (id: string) => {
    links.forEach((a) => {
      const on = a.getAttribute('data-spy') === id;
      a.style.color = on ? 'var(--ink)' : 'var(--mut)';
      a.style.borderBottomColor = on ? 'var(--ind)' : 'transparent';
    });
  };
  const secs = links
    .map((a) => document.getElementById(a.getAttribute('data-spy')!))
    .filter(Boolean) as HTMLElement[];
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) set((en.target as HTMLElement).id);
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );
  secs.forEach((s) => io.observe(s));
}

// --- Chapter rail (fixed section dots, desktop only) --------------------------
function chapterRail() {
  if (window.innerWidth < 980) return;
  const secs = [...document.querySelectorAll<HTMLElement>('section[id]')].filter(
    (s) => s.id && s.id !== 'top'
  );
  if (secs.length < 2) return;

  const rail = document.createElement('div');
  rail.style.cssText =
    'position:fixed;right:16px;top:50%;transform:translateY(-50%);z-index:300;' +
    'display:flex;flex-direction:column;gap:11px;align-items:flex-end;';
  secs.forEach((s) => {
    const a = document.createElement('a');
    a.href = '#' + s.id;
    a.style.cssText = 'display:flex;align-items:center;gap:9px;text-decoration:none;';
    a.innerHTML =
      '<span class="rlab" style="font:600 0.5rem/1 Hanken Grotesk;letter-spacing:0.16em;' +
      'text-transform:uppercase;color:#7B818B;opacity:0;transform:translateX(4px);' +
      'transition:opacity .2s,transform .2s;white-space:nowrap;">' +
      s.id +
      '</span><span class="rdot" style="width:8px;height:8px;background:#B9C0C9;' +
      'transition:background .25s,transform .25s;"></span>';
    a.addEventListener('mouseenter', () => {
      const l = a.querySelector<HTMLElement>('.rlab')!;
      l.style.opacity = '1';
      l.style.transform = 'translateX(0)';
    });
    a.addEventListener('mouseleave', () => {
      const l = a.querySelector<HTMLElement>('.rlab')!;
      l.style.opacity = '0';
      l.style.transform = 'translateX(4px)';
    });
    rail.appendChild(a);
  });
  document.body.appendChild(rail);

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          const id = (en.target as HTMLElement).id;
          rail.querySelectorAll<HTMLElement>('a').forEach((a) => {
            const on = a.getAttribute('href') === '#' + id;
            const d = a.querySelector<HTMLElement>('.rdot')!;
            d.style.background = on ? '#2422E8' : '#B9C0C9';
            d.style.transform = on ? 'scale(1.6)' : 'scale(1)';
          });
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  secs.forEach((s) => io.observe(s));
}

// --- Stat scramble (numerals resolve as they scroll in) -----------------------
function scramble() {
  const targets = document.querySelectorAll<HTMLElement>('[data-count]');
  if (!targets.length) return;
  targets.forEach((el) => {
    if (!el.getAttribute('data-target')) {
      el.setAttribute('data-target', (el.textContent ?? '').trim());
    }
  });
  if (reduced) return; // leave final text in place

  const glyphs = 'ABCDEFGHKMNPRSTVXZ0123456789$%';
  const skip = new Set([' ', '.', ',', '-', ' ', '→']);
  const run = (el: HTMLElement) => {
    const final = (el.getAttribute('data-target') || el.textContent || '').trim();
    const dur = 760;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const rev = p * final.length;
      let out = '';
      for (let i = 0; i < final.length; i++) {
        const c = final[i];
        if (skip.has(c)) {
          out += c;
          continue;
        }
        out += i < rev - 0.4 ? c : glyphs[Math.floor(Math.random() * glyphs.length)];
      }
      el.textContent = out;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = final;
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          run(en.target as HTMLElement);
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  targets.forEach((el) => io.observe(el));
}

// --- Index-numeral parallax drift (Óptimo oversized section numbers) ----------
function numDrift() {
  if (reduced) return;
  const els = [...document.querySelectorAll<HTMLElement>('section [aria-hidden="true"]')];
  if (!els.length) return;
  const on = () => {
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      const off = (r.top + r.height / 2 - window.innerHeight / 2) * -0.05;
      el.style.transform = `translateY(${off.toFixed(1)}px)`;
    });
  };
  window.addEventListener('scroll', on, { passive: true });
  on();
}

// --- Hero portrait parallax (Megan) -------------------------------------------
function heroParallax() {
  if (reduced) return;
  const img = document.querySelector<HTMLElement>('[data-par]');
  if (!img) return;
  const on = () => {
    const r = img.getBoundingClientRect();
    const off = (r.top - window.innerHeight / 2) * -0.03;
    img.style.transform = `translateY(${off}px)`;
  };
  window.addEventListener('scroll', on, { passive: true });
  on();
}

export function initMotion() {
  recal();
  kinetic();
  reveal();
  magnetic();
  cursorRing();
  clocks();
  scrollSpy();
  chapterRail();
  scramble();
  numDrift();
  heroParallax();
}
