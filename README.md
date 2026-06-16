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
