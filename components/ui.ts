/**
 * 按钮与面板的**共用样式类**。
 *
 * # 为什么集中在这里
 *
 * "主按钮 / 次按钮 / 未配置（禁用）"三态在整站至少出现 6 次
 * （下载页两处、首页三处、导航一处）。如果每处各写一遍 Tailwind 类名，
 * 迟早会出现"同一件事两种蓝色"。这里定义一次，各处引用。
 */

/** 所有按钮/按钮样式的链接共用。 */
const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-[5px] border px-4 py-[7px] text-sm font-medium leading-6 transition-colors";

/** 主按钮：Beptard 蓝底。整站的"主要动作"（下载、购买）用它。 */
export const buttonPrimary = `${buttonBase} border-transparent bg-accent text-accent-ink hover:bg-[#4ab9ee]`;

/** 次按钮：深底描边。用于并列的次要动作。 */
export const buttonSecondary = `${buttonBase} border-line bg-panel-2 text-ink hover:border-[#4d4d4d] hover:bg-[#303030]`;

/** 未配置（禁用）：仍然可见，但不可点 —— 绝不编一个假地址让用户点到 404。 */
export const buttonDisabled = `${buttonBase} border-line bg-panel-2 text-muted opacity-60 cursor-not-allowed`;

/** 内容面板（一块深色区域 + 细边框）。 */
export const panel = "border border-line bg-panel";

/** 次级文字。 */
export const mutedText = "text-muted";

/** 内容区块统一的上下留白。 */
export const sectionSpacing = "py-8 sm:py-10";

/** 表格单元格。 */
export const cell = "border-b border-line-soft px-3 py-2 align-middle";

/** 表头单元格。 */
export const headCell =
  "border-b border-line bg-panel-2 px-3 py-2 text-left text-[13px] font-semibold text-muted whitespace-nowrap";
