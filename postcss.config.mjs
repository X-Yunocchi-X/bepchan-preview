/**
 * PostCSS 配置：只挂 Tailwind v4 的官方 PostCSS 插件。
 *
 * Tailwind v4 是"CSS 优先"配置：主题、色板、断点都写在 `app/globals.css` 的
 * `@theme` 里，因此这里不需要、也没有 `tailwind.config.js`。
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
