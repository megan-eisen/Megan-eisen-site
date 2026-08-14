// ---------------------------------------------------------------------------
// Friendlier email links. A plain mailto: hands off to the OS default mail app
// (often Apple Mail / Outlook desktop), which is jarring for people who live in
// Gmail or another webmail client. Instead:
//   [data-copy-email]  → copy the address to the clipboard + show a toast
//   [data-focus-form]  → scroll to and focus the on-site contact form
//   [data-compose]     → open a small chooser: Gmail / Outlook / Mail app / Copy
// The mailto: href is kept on each link as a no-JS fallback, and is the source
// of truth the chooser parses for recipient / subject / body.
// ---------------------------------------------------------------------------

const reduced =
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

let toastEl: HTMLElement | null = null;
let toastTimer: number | undefined;

function showToast(message: string) {
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.setAttribute('role', 'status');
    toastEl.setAttribute('aria-live', 'polite');
    toastEl.style.cssText =
      'position:fixed;left:50%;bottom:24px;transform:translateX(-50%) translateY(8px);' +
      'background:#14161A;color:#EFF2F6;padding:0.75rem 1.1rem;z-index:99999;' +
      "font:600 0.78rem/1 'Hanken Grotesk';letter-spacing:0.03em;white-space:nowrap;" +
      'box-shadow:0 12px 32px rgba(0,0,0,0.28);opacity:0;pointer-events:none;' +
      (reduced
        ? ''
        : 'transition:opacity .22s ease, transform .22s cubic-bezier(.2,.8,.2,1);');
    document.body.appendChild(toastEl);
  }
  toastEl.textContent = message;
  requestAnimationFrame(() => {
    if (!toastEl) return;
    toastEl.style.opacity = '1';
    toastEl.style.transform = 'translateX(-50%) translateY(0)';
  });
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    if (!toastEl) return;
    toastEl.style.opacity = '0';
    toastEl.style.transform = 'translateX(-50%) translateY(8px)';
  }, 2200);
}

async function copyEmail(email: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(email);
    return true;
  } catch {
    // Fallback for older browsers / non-secure contexts.
    try {
      const ta = document.createElement('textarea');
      ta.value = email;
      ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

// --- Compose chooser (Gmail / Outlook / Mail app / Copy) --------------------

interface Compose {
  to: string;
  subject: string;
  body: string;
  mailto: string;
}

function parseMailto(href: string): Compose {
  const raw = href.replace(/^mailto:/i, '');
  const [addr, query = ''] = raw.split('?');
  const params = new URLSearchParams(query);
  return {
    to: decodeURIComponent(addr),
    subject: params.get('subject') ?? '',
    body: params.get('body') ?? '',
    mailto: href,
  };
}

function gmailUrl(c: Compose): string {
  const p = new URLSearchParams({ view: 'cm', fs: '1', to: c.to, su: c.subject, body: c.body });
  return `https://mail.google.com/mail/?${p.toString()}`;
}

function outlookUrl(c: Compose): string {
  // office.com covers Microsoft 365 / work accounts. Personal Outlook.com users
  // are redirected by Microsoft; the Mail-app option covers Outlook desktop.
  const p = new URLSearchParams({ to: c.to, subject: c.subject, body: c.body });
  return `https://outlook.office.com/mail/deeplink/compose?${p.toString()}`;
}

let openMenu: HTMLElement | null = null;
let menuAnchor: HTMLElement | null = null;

function closeMenu() {
  openMenu?.remove();
  openMenu = null;
  menuAnchor = null;
  document.removeEventListener('keydown', onMenuKey, true);
  document.removeEventListener('click', onOutside, true);
  window.removeEventListener('scroll', closeMenu, true);
  window.removeEventListener('resize', closeMenu, true);
}

function onOutside(e: Event) {
  if (openMenu && !openMenu.contains(e.target as Node)) closeMenu();
}
function onMenuKey(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    const a = menuAnchor;
    closeMenu();
    a?.focus();
  }
}

function menuItem(label: string): HTMLElement {
  const base =
    "display:block;width:100%;text-align:left;background:transparent;border:none;cursor:pointer;" +
    "padding:0.6rem 0.9rem;font:600 0.78rem/1.1 'Hanken Grotesk';color:#14161A;text-decoration:none;white-space:nowrap;";
  const el = document.createElement(label === 'Copy address' || label === 'Mail app' ? 'button' : 'a');
  el.textContent = label;
  el.setAttribute('role', 'menuitem');
  el.style.cssText = base;
  el.addEventListener('mouseenter', () => {
    el.style.background = '#14161A';
    el.style.color = '#EFF2F6';
  });
  el.addEventListener('mouseleave', () => {
    el.style.background = 'transparent';
    el.style.color = '#14161A';
  });
  return el;
}

function openChooser(anchor: HTMLElement, c: Compose) {
  closeMenu();
  const menu = document.createElement('div');
  menu.setAttribute('role', 'menu');
  menu.style.cssText =
    'position:fixed;z-index:99999;background:#EFF2F6;border:1px solid #14161A;' +
    'box-shadow:0 14px 36px rgba(0,0,0,0.20);min-width:200px;padding:0.3rem 0;';

  const heading = document.createElement('div');
  heading.textContent = 'Open in';
  heading.style.cssText =
    "font:600 0.5rem/1 'Hanken Grotesk';letter-spacing:0.18em;text-transform:uppercase;" +
    'color:#7B818B;padding:0.55rem 0.9rem 0.5rem;';
  menu.appendChild(heading);

  const gmail = menuItem('Gmail') as HTMLAnchorElement;
  gmail.href = gmailUrl(c);
  gmail.target = '_blank';
  gmail.rel = 'noopener noreferrer';
  gmail.addEventListener('click', () => closeMenu());

  const outlook = menuItem('Outlook') as HTMLAnchorElement;
  outlook.href = outlookUrl(c);
  outlook.target = '_blank';
  outlook.rel = 'noopener noreferrer';
  outlook.addEventListener('click', () => closeMenu());

  const mail = menuItem('Mail app');
  mail.addEventListener('click', () => {
    window.location.href = c.mailto;
    closeMenu();
  });

  const copy = menuItem('Copy address');
  copy.addEventListener('click', async () => {
    const ok = await copyEmail(c.to);
    showToast(ok ? `Copied · ${c.to}` : c.to);
    closeMenu();
  });

  [gmail, outlook, mail, copy].forEach((i) => menu.appendChild(i));
  document.body.appendChild(menu);

  // Position under the anchor, clamped to the viewport.
  const r = anchor.getBoundingClientRect();
  const mw = menu.offsetWidth;
  const mh = menu.offsetHeight;
  let left = Math.min(r.left, window.innerWidth - mw - 8);
  left = Math.max(8, left);
  let top = r.bottom + 8;
  if (top + mh + 8 > window.innerHeight) top = Math.max(8, r.top - mh - 8);
  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;

  openMenu = menu;
  menuAnchor = anchor;
  (menu.querySelector('[role="menuitem"]') as HTMLElement | null)?.focus();

  // Defer listener attach so the opening click doesn't immediately close it.
  window.setTimeout(() => {
    document.addEventListener('keydown', onMenuKey, true);
    document.addEventListener('click', onOutside, true);
    window.addEventListener('scroll', closeMenu, true);
    window.addEventListener('resize', closeMenu, true);
  }, 0);
}

export function initEmailLinks() {
  document.querySelectorAll<HTMLAnchorElement>('[data-compose]').forEach((el) => {
    if ((el as any).__compose) return;
    (el as any).__compose = true;
    el.addEventListener('click', (e) => {
      e.preventDefault();
      if (openMenu && menuAnchor === el) {
        closeMenu();
        return;
      }
      openChooser(el, parseMailto(el.getAttribute('href') || ''));
    });
  });

  document.querySelectorAll<HTMLAnchorElement>('[data-copy-email]').forEach((el) => {
    if ((el as any).__copy) return;
    (el as any).__copy = true;
    el.addEventListener('click', async (e) => {
      const email = el.getAttribute('data-copy-email');
      if (!email) return;
      e.preventDefault();
      const ok = await copyEmail(email);
      if (ok) {
        showToast(`Copied · ${email}`);
      } else {
        // Couldn't copy — fall back to the mailto so the click still does something.
        window.location.href = el.getAttribute('href') || `mailto:${email}`;
      }
    });
  });

  document.querySelectorAll<HTMLElement>('[data-focus-form]').forEach((el) => {
    if ((el as any).__focus) return;
    (el as any).__focus = true;
    el.addEventListener('click', (e) => {
      const form = document.getElementById('contact-form');
      if (!form) return; // page without a form — let the href fallback run
      e.preventDefault();
      form.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
      const field = form.querySelector<HTMLElement>('input, textarea');
      window.setTimeout(() => field?.focus({ preventScroll: true }), reduced ? 0 : 320);
    });
  });
}
