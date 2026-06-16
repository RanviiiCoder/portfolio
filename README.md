# Premium 3D Developer Portfolio - Ranveer Kumar Sharma

Welcome to the source code for my professional portfolio website. This single-page, high-performance web experience is designed to highlight my academic background, data science & machine learning experience, publications, and technical skills.

Live Demo: [https://ranviiicoder.github.io/](https://ranviiicoder.github.io/) (or custom domain [https://ranveer.dev](https://ranveer.dev))

---

## 🎨 Visual Theme & Aesthetics

The site features a **modern 3D dark-theme glassmorphism design** with purple and pink neon glowing backlights, inspired by high-end developer portfolios:
* **Custom 3D Avatar**: A Blender/Pixar-style rendered cartoon avatar of a developer working at a desk, featuring purple and pink ambient accent highlights.
* **Glassmorphic Components**: Elements utilize translucent backgrounds, thin borders, soft shadows, and CSS `backdrop-filter: blur(12px)` overlays.
* **Fluid Micro-Animations**: Smooth transitions on cards, buttons, custom social links, and navigation tags.
* **Scroll-Driven Viewport Reveals**: Leverages native CSS scroll timelines to animate elements as they enter the screen, providing smooth, hardware-accelerated animations.

---

## 🛠️ Technology Stack

This website is built with a pure, light-weight frontend stack to ensure maximum performance, zero asset overhead, and high Search Engine Optimization (SEO) scores:
* **HTML5**: Semantic tags layout (SEO optimized structure with single `<h1>`).
* **CSS3**: Layered stylesheet structure (`@layer reset, base, theme, components, utilities`) configuring custom design token variables, Outfit and Inter Google font typography, responsive grids, and scroll reveals.
* **Vanilla JavaScript**: Interactive layout controls, active page navigation scrollspy indicators, project category filters, form verification spinner state simulators, and an IntersectionObserver fallback for scroll reveals in older browsers.

---

## 📁 File Structure

```
├── avatar.png       # Generated Blender-style developer portrait 
├── index.html       # Primary semantic page structure 
├── styles.css       # Complete layered stylesheet and custom variables
├── script.js        # Dynamic filtering, scrollspy, and fallback transitions
└── README.md        # Project documentation
```

---

## 🚀 Running Locally

To run and preview the website locally, start a local server using Python (pre-installed on macOS/Linux):

1. Clone or navigate into the portfolio workspace:
   ```bash
   cd Portfolio
   ```
2. Run a local HTTP server:
   ```bash
   python3 -m http.server 8000
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

---

## 🌎 Deployment to custom domain (ranveer.dev)

This site is set up for automatic deployments via **GitHub Pages**. To connect it to your custom domain:

1. **DNS Setup**: Log in to your domain registrar (e.g., Squarespace, GoDaddy, Namecheap) and create:
   * **Four A Records** pointing to:
     * `185.199.108.153`
     * `185.199.109.153`
     * `185.199.110.153`
     * `185.199.111.153`
   * **A CNAME Record** with hostname `www` pointing to `RanviiiCoder.github.io`.
2. **GitHub Setup**: 
   * Update settings via GitHub CLI:
     ```bash
     gh api repos/RanviiiCoder/RanviiiCoder.github.io/pages --method PUT -f cname="ranveer.dev"
     ```
   * Or navigate to **Settings > Pages** in your GitHub repository and enter `ranveer.dev` in the custom domain field.

---

## 📑 Portfolio Sections

The portfolio is a fully responsive single-page application (SPA) with smooth anchor-based navigation across the following sections:

| Section | Description |
|---|---|
| **Hero** | Full-screen landing with name, tagline, CTA buttons, social links, and 3D avatar |
| **About Me** | Personal summary, contact info panel, and 4 animated stat cards |
| **Education** | M.Sc. AI & Data Analytics (Amity) + BCA (MMHAP) with SGPA/CGPA progression |
| **Technical Skills** | 6 categorized glassmorphic skill cards (Languages, Frameworks, Databases, Cloud, Viz, Concepts) |
| **Projects** | 4 filterable project cards with bullet-level details and tech tags |
| **Publications** | Dedicated highlight block for IEEE-indexed research paper (2026) |
| **Experience** | Vertical animated timeline with two internships |
| **Certifications & Awards** | 4 achievement cards for certifications and hackathon recognition |
| **Contact** | Glassmorphic floating-label form with loading states and success feedback |

---

## ✨ Features

- **Native Scroll-Driven Animations** — Hardware-accelerated CSS `animation-timeline: view()` reveals for all sections and cards, with graceful `IntersectionObserver` fallback for Firefox and older browsers.
- **Dynamic Project Filtering** — Category buttons instantly filter project cards: `All`, `Data Science & ML`, `Computer Vision`, `Smart Systems`.
- **Sticky Glassmorphic Nav** — Header transitions from transparent to a blurred opaque background on scroll, with active section highlighting via a JavaScript scrollspy.
- **Mobile Hamburger Menu** — Full-width slide-in navigation drawer for screens ≤ 768px, with keyboard accessibility via `aria-expanded`.
- **Floating Label Inputs** — CSS-only animated form labels that rise on focus or when text is present.
- **Form Validation Feedback** — Uses native HTML5 validation with `:user-invalid` (only flags errors after user interaction) and a simulated loading spinner on submit.
- **SEO Optimized** — Proper `<title>`, `<meta name="description">`, a single `<h1>`, and semantic landmark regions (`<header>`, `<main>`, `<section>`, `<footer>`).
- **Zero Dependencies** — No frameworks, no bundlers, no NPM packages. Pure HTML, CSS, and JS.
- **HTTPS by Default** — Served over GitHub Pages with automatic SSL enforcement.

---

## 🧠 Projects Showcase

### 1. Smart Grid Energy Optimization System *(M.Sc. Capstone)*
> **Tech:** Prophet, InfluxDB, Streamlit, Python, Time-Series Forecasting

Implemented a full-stack analytics platform for smart energy grids with synthetic IoT data pipelines. Achieved **94% forecasting accuracy** on 1M+ time-series records and **91% anomaly detection precision**, demonstrating potential energy savings of **23%** via predictive load balancing.

---

### 2. Movie Recommendation & Satellite Image Segmentation *(Infotact Solutions)*
> **Tech:** PyTorch, SVD, NCF, U-Net, ResNet/VGG, Focal Loss, Streamlit

Built a collaborative/content-based hybrid movie recommender on MovieLens 1M, and a U-Net image segmentation model for satellite flood imagery (FloodNet). Evaluated using IoU and Dice Coefficient metrics.

---

### 3. Real-time News Recommendation System *(M.Sc. Academic)*
> **Tech:** GPT4All, Llama 3.3B, News API, NLP, Streamlit

Local-LLM-powered news aggregator with semantic profiling and real-time API feeds. Built a concurrent-safe Python backend with Streamlit UI enabling personalized article recommendations.

---

### 4. Deep Fake Detection System *(AIIT)*
> **Tech:** OpenCV, TensorFlow, CNN, FaceForensics++

Trained a CNN classifier on 1000+ real/fake video samples achieving **92% classification accuracy**. Built a drag-and-drop UI for real-time video/image authenticity analysis.

---

## 🎓 Education

| Degree | Institution | Score | Period |
|---|---|---|---|
| M.Sc. in AI & Data Analytics | Amity University, Noida | 8.47 CGPA (Final) | Aug 2024 – Jun 2026 |
| BCA | MMHAP University, Patna | 77% | Sep 2020 – Oct 2023 |

**M.Sc. Semester Progression:** 7.84 → 8.10 → 8.15 → 8.47 SGPA/CGPA

---

## 🏆 Certifications & Awards

| Award | Issuer | Year |
|---|---|---|
| Deep Learning Engineer: PyTorch | Simplilearn | 2025 |
| Deep Learning Practitioner | Simplilearn | 2025 |
| Python & SQL | Skill Academy | 2022 |
| Smart India Hackathon 2025 — Grand Finalist | Government of India | 2025 |
| SEMICON INDIA 2024 Attendee | India Expo Mart | 2024 |
| Scout Guide Award | Bharat Scouts and Guides | 2018 |

---

## 📰 Research Publication

**AI-Enabled Communication Assistance for Hearing Impaired Individuals**
- **Published:** IEEE Conference Proceedings (2026) — indexed in [IEEE Xplore](https://ieeexplore.ieee.org/)
- **Summary:** Designed an edge-AI communication assistant using multimodal speech and visual processing with Bhashini AI models for multilingual accessibility, addressing challenges of noisy, code-switched environments.

---

## 📬 Contact

| Platform | Details |
|---|---|
| 📧 Email | [ranviii2000@gmail.com](mailto:ranviii2000@gmail.com) |
| 📱 Phone | [9234365451](tel:9234365451) |
| 💼 LinkedIn | [linkedin.com/in/ranveer-s-1710nafy](https://linkedin.com/in/ranveer-s-1710nafy) |
| 🌍 Location | Aurangabad, Maharashtra, India |

---

## 📝 License

This project is open-sourced under the [MIT License](https://opensource.org/licenses/MIT). You are free to fork and adapt this portfolio for your own personal use. Attribution is appreciated but not required.

---

<p align="center">
  Made with ❤️ by <strong>Ranveer Kumar Sharma</strong>
  <br/>
  M.Sc. AI & Data Analytics | Amity University, Noida
</p>
