// ---------------------------------------------------------------------------
// Friendlier email links. A plain mailto: hands off to the OS default mail app
// (often Apple Mail / Outlook desktop), which is jarring for people who live in
// Gmail or another webmail client. Instead:
//   [data-copy-email]  → copy the address to the clipboard + show a toast
//   [data-focus-form]  → scroll to and focus the on-site contact form
// The mailto: href is kept on each link as a no-JS fallback.
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

export function initEmailLinks() {
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
