import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import './warning-badge.js'

describe('WarningBadge', () => {
  let el

  beforeEach(() => {
    el = document.createElement('warning-badge')
    document.body.appendChild(el)
  })

  afterEach(() => {
    el.remove()
  })

  // ── Estructura del Shadow DOM ──────────────────────────────────────────────

  describe('Shadow DOM structure', () => {
    it('creates a shadow root', () => {
      expect(el.shadowRoot).not.toBeNull()
    })

    it('renders [part="badge"]', () => {
      expect(el.shadowRoot.querySelector('[part="badge"]')).not.toBeNull()
    })

    it('renders [part="icon"]', () => {
      expect(el.shadowRoot.querySelector('[part="icon"]')).not.toBeNull()
    })

    it('renders [part="message"]', () => {
      expect(el.shadowRoot.querySelector('[part="message"]')).not.toBeNull()
    })
  })

  // ── Estado por defecto (sin atributos) ────────────────────────────────────

  describe('default state (no attributes)', () => {
    it('shows "Sesión por expirar" as default message', () => {
      const message = el.shadowRoot.querySelector('[part="message"]')
      expect(message.textContent).toBe('Sesión por expirar')
    })

    it('shows "!" icon when session is not active', () => {
      const icon = el.shadowRoot.querySelector('[part="icon"]')
      expect(icon.textContent).toBe('!')
    })

    it('does not apply pulsing class by default', () => {
      const badge = el.shadowRoot.querySelector('[part="badge"]')
      expect(badge.classList.contains('pulsing')).toBe(false)
    })

    it('uses red color (#ff6b6b) for non-active session', () => {
      const style = el.shadowRoot.querySelector('style')
      expect(style.textContent).toContain('#ff6b6b')
    })
  })

  // ── Atributo message ──────────────────────────────────────────────────────

  describe('message attribute', () => {
    it('renders the provided message text', () => {
      el.setAttribute('message', 'Acceso denegado')
      const message = el.shadowRoot.querySelector('[part="message"]')
      expect(message.textContent).toBe('Acceso denegado')
    })

    it('shows "✓" icon when message includes "activa"', () => {
      el.setAttribute('message', 'Sesión activa')
      const icon = el.shadowRoot.querySelector('[part="icon"]')
      expect(icon.textContent).toBe('✓')
    })

    it('shows "!" icon when message does not include "activa"', () => {
      el.setAttribute('message', 'Sesión expirada')
      const icon = el.shadowRoot.querySelector('[part="icon"]')
      expect(icon.textContent).toBe('!')
    })

    it('uses green color (#4CAF50) when message includes "activa"', () => {
      el.setAttribute('message', 'Sesión activa')
      const style = el.shadowRoot.querySelector('style')
      expect(style.textContent).toContain('#4CAF50')
    })

    it('uses red color (#ff6b6b) when message does not include "activa"', () => {
      el.setAttribute('message', 'Sesión expirada')
      const style = el.shadowRoot.querySelector('style')
      expect(style.textContent).toContain('#ff6b6b')
    })

    it('updates message when attribute changes a second time', () => {
      el.setAttribute('message', 'Primera advertencia')
      el.setAttribute('message', 'Segunda advertencia')
      const message = el.shadowRoot.querySelector('[part="message"]')
      expect(message.textContent).toBe('Segunda advertencia')
    })
  })

  // ── Atributo pulsing ──────────────────────────────────────────────────────

  describe('pulsing attribute', () => {
    it('adds pulsing class when attribute is set', () => {
      el.setAttribute('pulsing', '')
      const badge = el.shadowRoot.querySelector('[part="badge"]')
      expect(badge.classList.contains('pulsing')).toBe(true)
    })

    it('removes pulsing class when attribute is removed', () => {
      el.setAttribute('pulsing', '')
      el.removeAttribute('pulsing')
      const badge = el.shadowRoot.querySelector('[part="badge"]')
      expect(badge.classList.contains('pulsing')).toBe(false)
    })

    it('renders with pulsing class when element is created with pulsing attribute', () => {
      const pulsingEl = document.createElement('warning-badge')
      pulsingEl.setAttribute('pulsing', '')
      document.body.appendChild(pulsingEl)
      const badge = pulsingEl.shadowRoot.querySelector('[part="badge"]')
      expect(badge.classList.contains('pulsing')).toBe(true)
      pulsingEl.remove()
    })
  })
})
