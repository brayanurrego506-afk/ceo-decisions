# CEO Decisions · Competitividad Sistémica

Juego educativo interactivo de alto impacto para una exposición universitaria sobre **Competitividad Sistémica de Colombia**. Los estudiantes asumen el rol de CEO de una empresa colombiana y toman 5 decisiones reales sobre instituciones de fomento (iNNpulsa, ProColombia, Colombia Productiva), enfrentando los dilemas auténticos que vive una microempresa colombiana al intentar competir globalmente.

**Audiencia:** 28 estudiantes de Administración de Empresas — Universidad Esumer.

---

## 🎯 Objetivos pedagógicos

Después de jugar, el estudiante puede responder:

1. **¿Qué es Colombia Productiva?** — Programa del MinCIT enfocado en aumentar productividad y sofisticación empresarial. Hoy integrado con iNNpulsa.
2. **¿Qué es ProColombia?** — Agencia oficial para promover exportaciones no minero-energéticas, turismo internacional e inversión extranjera.
3. **¿Por qué hacen más competitivas las empresas?** — Porque actúan en el nivel Meso de la Competitividad Sistémica: conectan empresas (Micro) con políticas públicas (Macro) y estrategias de país (Meta).

---

## 🎮 Cómo se juega

1. El estudiante elige modo: **☕ ¡Tinto o quiebra!** (sector cafetero) o **⚡ Protocolo Innova** (startup de datos)
2. Ingresa su nombre como CEO
3. Toma 5 decisiones con tres opciones cada una (A, B, C)
4. Cada decisión afecta 4 métricas: **capital, competitividad, reputación, mercados**
5. Al final, uno de 4 endings revela el destino: **leyenda, crecimiento, supervivencia o quiebra**

Cada decisión incluye un **dato real verificado** del ecosistema colombiano (Fábricas de Productividad, Macrorruedas ProColombia, Conpes 3866, etc.) que cierra el ciclo pedagógico: consecuencia + fuente + por qué pasó.

---

## 🛠 Stack técnico

- **Vite + React 19** — performance máxima, hot reload instantáneo
- **Three.js + R3F + Bloom** — partículas procedurales con shaders custom
- **Web Audio API** — ambient sonoro café (drone cálido C-mayor) vs tech (pulso electrónico)
- **canvas-confetti** — finales épicos
- **CSS variables** — dos paletas en `:root[data-mode="cafe|tech"]`

### Diseño visual

- **Tipografía**: Anton (hero), Barlow Condensed (sub), IBM Plex Mono (datos), IBM Plex Sans (cuerpo)
- **Modo café**: paleta espresso (#0D0400) + ámbar (#D4872A) + verde café (#2A6A2F) + crema (#F5E6C8)
- **Modo tech**: Branex — Void (#060B18) + Signal (#00D4AA) + Neural (#6C5CE7) + Pulse (#00CEFF)

---

## 🚀 Setup local

```bash
npm install
npm run dev
# http://localhost:5173
```

## 📦 Build

```bash
npm run build
npm run preview
```

## 🌐 Deploy en Vercel

Auto-deploy desde GitHub: solo push y Vercel detecta Vite automáticamente.

```bash
git push origin main
```

---

## 🖼 Imágenes en `public/images/`

```
entrepreneur.jpg  — CEO colombiano en Medellín (cap 1 café + name + intro)
puerto.jpg        — Puerto FEDECOF Colombian Coffee (cap 5 café + ending café)
reunion.jpg       — Global Business Strategy meeting (cap 2 café)
taza.jpg          — Taza café premium con vapor (cap 3 + 4 café)
datacenter.jpg    — Servidor Branex con datos (splash tech + cap 4 tech)
codigo.jpg        — Setup código de noche (cap 2 + 5 tech + name)
ceo_desk.jpg      — CEO mirando dashboard (cap 3 tech)
dashboard.jpg     — Dashboard Branex (cap 1 tech)
```

---

## 📚 Datos verificados

Todos los porcentajes y casos provienen de fuentes oficiales:

- **iNNpulsa Colombia** — Informe de Resultados 2022, Calidad para la Reindustrialización 2024
- **ProColombia** — Macrorruedas Madrid 2023, México 2024, BioExpo Nariño 2025, Colombia Investment Summit 2024
- **Colombia Productiva / Conpes 3866** — Política de Desarrollo Productivo
- **Confecámaras** — Estudio de Movilidad Empresarial 2024
- **Fedesarrollo** — Evaluación Fábricas de Productividad 2022
- **DANE + Federación Nacional de Cafeteros** — Cifras sector cafetero

---

Construido con disciplina por Brayan Urrego — Branex.
