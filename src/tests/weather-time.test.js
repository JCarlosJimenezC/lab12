import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import '../modules/weather-time.js'

describe('WeatherTime', () => {
  let el

  beforeEach(() => {
    el = document.createElement('weather-time')
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

    it('renders [part="weather-card"]', () => {
      expect(el.shadowRoot.querySelector('[part="weather-card"]')).not.toBeNull()
    })

    it('renders [part="weather-icon"]', () => {
      expect(el.shadowRoot.querySelector('[part="weather-icon"]')).not.toBeNull()
    })

    it('renders [part="location"]', () => {
      expect(el.shadowRoot.querySelector('[part="location"]')).not.toBeNull()
    })

    it('renders [part="temperature"]', () => {
      expect(el.shadowRoot.querySelector('[part="temperature"]')).not.toBeNull()
    })

    it('renders [part="condition"]', () => {
      expect(el.shadowRoot.querySelector('[part="condition"]')).not.toBeNull()
    })
  })

  // ── Estado por defecto (sin atributos) ────────────────────────────────────

  describe('default state (no attributes)', () => {
    it('shows "Ubicación" as default location', () => {
      const location = el.shadowRoot.querySelector('[part="location"]')
      expect(location.textContent).toBe('Ubicación')
    })

    it('shows "25°C" as default temperature', () => {
      const temp = el.shadowRoot.querySelector('[part="temperature"]')
      expect(temp.textContent).toBe('25°C')
    })

    it('shows "Sunny" as default condition', () => {
      const condition = el.shadowRoot.querySelector('[part="condition"]')
      expect(condition.textContent).toBe('Sunny')
    })

    it('shows ☀️ as default icon', () => {
      const icon = el.shadowRoot.querySelector('[part="weather-icon"]')
      expect(icon.textContent).toBe('☀️')
    })
  })

  // ── Iconos por condición meteorológica ────────────────────────────────────

  describe('getWeatherIcon()', () => {
    const cases = [
      ['Sunny',  '☀️'],
      ['Cloudy', '☁️'],
      ['Rainy',  '🌧️'],
      ['Snowy',  '❄️'],
      ['Stormy', '⛈️'],
      ['Windy',  '💨'],
    ]

    cases.forEach(([condition, icon]) => {
      it(`shows ${icon} for "${condition}"`, () => {
        el.setAttribute('condition', condition)
        expect(el.shadowRoot.querySelector('[part="weather-icon"]').textContent).toBe(icon)
      })
    })

    it('shows 🌤️ for an unknown condition', () => {
      el.setAttribute('condition', 'Foggy')
      expect(el.shadowRoot.querySelector('[part="weather-icon"]').textContent).toBe('🌤️')
    })
  })

  // ── Atributos ─────────────────────────────────────────────────────────────

  describe('attributes', () => {
    it('renders the provided location', () => {
      el.setAttribute('location', 'San José')
      expect(el.shadowRoot.querySelector('[part="location"]').textContent).toBe('San José')
    })

    it('renders the provided temperature with °C suffix', () => {
      el.setAttribute('temperature', '28')
      expect(el.shadowRoot.querySelector('[part="temperature"]').textContent).toBe('28°C')
    })

    it('renders the provided condition text', () => {
      el.setAttribute('condition', 'Rainy')
      expect(el.shadowRoot.querySelector('[part="condition"]').textContent).toBe('Rainy')
    })

    it('re-renders when location changes', () => {
      el.setAttribute('location', 'Liberia')
      el.setAttribute('location', 'Cartago')
      expect(el.shadowRoot.querySelector('[part="location"]').textContent).toBe('Cartago')
    })

    it('re-renders when temperature changes', () => {
      el.setAttribute('temperature', '20')
      el.setAttribute('temperature', '35')
      expect(el.shadowRoot.querySelector('[part="temperature"]').textContent).toBe('35°C')
    })
  })
})
