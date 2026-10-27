import type { PageCopy } from "./content";

/**
 * 两张对比图的共用颜色与小部件。
 *
 * 颜色直接引用 globals.css 的主题变量，避免预览页再维护一套色板；
 * 图形只使用实线、虚线、箭头和小面积状态色，不做渐变、发光或动画。
 */
const COLOR = {
  ink: "var(--color-ink)",
  muted: "var(--color-muted)",
  line: "var(--color-line)",
  panel: "var(--color-panel)",
  panel2: "var(--color-panel-2)",
  accent: "var(--color-accent)",
  ok: "var(--color-ok)",
  warn: "var(--color-warn)",
} as const;

type RecoveryLabels = PageCopy["sections"]["recovery"]["diagram"];
type LatencyLabels = PageCopy["sections"]["latency"]["diagram"];

/** 每个 SVG 独立声明 marker，避免两张图在同一页面里复用同名 id。 */
function MarkerDefs({ prefix }: { prefix: string }) {
  return (
    <defs>
      {[
        ["accent", COLOR.accent],
        ["ok", COLOR.ok],
        ["warn", COLOR.warn],
        ["muted", COLOR.muted],
      ].map(([name, color]) => (
        <marker
          key={name}
          id={`${prefix}-${name}`}
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="7"
          markerHeight="7"
          orient="auto"
        >
          <path d="M0 0 L8 4 L0 8 Z" fill={color} />
        </marker>
      ))}
    </defs>
  );
}

/** 图中一个参与方节点（游戏客户端、优化层、服务器等）。 */
function Node({
  x,
  y,
  w,
  h,
  title,
  subtitle,
  status,
  statusColor = COLOR.warn,
  tone = "default",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  subtitle?: string;
  status?: string;
  statusColor?: string;
  tone?: "default" | "accent" | "ok";
}) {
  const stroke = tone === "accent" ? COLOR.accent : tone === "ok" ? COLOR.ok : COLOR.line;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="4"
        fill={COLOR.panel2}
        stroke={stroke}
        strokeWidth={tone === "default" ? 1 : 1.4}
      />
      <text
        x={x + w / 2}
        y={y + 28}
        textAnchor="middle"
        fill={COLOR.ink}
        fontSize="13.5"
        fontWeight="600"
      >
        {title}
      </text>
      {subtitle ? (
        <text x={x + w / 2} y={y + 47} textAnchor="middle" fill={COLOR.muted} fontSize="10.5">
          {subtitle}
        </text>
      ) : null}
      {status ? (
        <text
          x={x + w / 2}
          y={y + (subtitle ? 68 : 50)}
          textAnchor="middle"
          fill={statusColor}
          fontSize="10.5"
          fontWeight="500"
        >
          {status}
        </text>
      ) : null}
    </g>
  );
}

/** 图内右上角的小标签（Connection lost / Illustrative example 等）。 */
function Badge({
  x,
  y,
  w,
  text,
  color = COLOR.muted,
}: {
  x: number;
  y: number;
  w: number;
  text: string;
  color?: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="24" rx="3" fill="none" stroke={color} />
      <text x={x + w / 2} y={y + 16} textAnchor="middle" fill={color} fontSize="10.5">
        {text}
      </text>
    </g>
  );
}

/** Section 2：上半部分失败重连，下半部分 TCP Resume；右侧附实际画面。 */
export function RecoveryDiagram({ labels }: { labels: RecoveryLabels }) {
  return (
    <svg
      viewBox="0 0 880 700"
      role="img"
      aria-labelledby="recovery-diagram-title"
      className="block h-auto w-full min-w-[860px] font-sans"
    >
      <title id="recovery-diagram-title">{labels.title}</title>
      <MarkerDefs prefix="recovery" />

      {/* 上半部分：普通连接 */}
      <rect x="1" y="1" width="878" height="278" rx="5" fill={COLOR.panel} stroke={COLOR.line} />
      <text x="24" y="40" fill={COLOR.ink} fontSize="16" fontWeight="600">
        {labels.withoutTitle}
      </text>
      <Badge x={716} y={20} w={140} text={labels.withoutBadge} color={COLOR.warn} />

      <Node
        x={24}
        y={78}
        w={140}
        h={88}
        title={labels.client}
        subtitle={labels.clientSub}
        status={labels.clientStateWithout}
      />
      <Node
        x={706}
        y={78}
        w={150}
        h={88}
        title={labels.server}
        subtitle={labels.serverSub}
        status={labels.serverStateWithout}
      />

      <line x1="174" y1="122" x2="420" y2="122" stroke={COLOR.accent} strokeWidth="2" />
      <text x="440" y="108" textAnchor="middle" fill={COLOR.muted} fontSize="11">
        {labels.direct}
      </text>

      <g stroke={COLOR.warn} strokeWidth="2.4" strokeLinecap="round">
        <line x1="430" y1="110" x2="450" y2="134" />
        <line x1="450" y1="110" x2="430" y2="134" />
      </g>
      <text x="440" y="154" textAnchor="middle" fill={COLOR.warn} fontSize="11" fontWeight="600">
        {labels.drop}
      </text>

      <path
        d="M99 166 C 260 228, 620 228, 781 166"
        fill="none"
        stroke={COLOR.warn}
        strokeWidth="1.6"
        strokeDasharray="6 5"
        markerEnd="url(#recovery-warn)"
      />
      <text x="440" y="240" textAnchor="middle" fill={COLOR.ink} fontSize="11.5">
        {labels.reconnect}
      </text>
      <text x="440" y="257" textAnchor="middle" fill={COLOR.muted} fontSize="10.5">
        {labels.reconnectNote}
      </text>

      {/* 下半部分：优化连接 */}
      <rect x="1" y="296" width="878" height="396" rx="5" fill={COLOR.panel} stroke={COLOR.line} />
      <text x="24" y="335" fill={COLOR.ink} fontSize="16" fontWeight="600">
        {labels.withTitle}
      </text>
      <Badge x={610} y={314} w={246} text={labels.withBadge} color={COLOR.accent} />

      <text x="229" y="367" textAnchor="middle" fill={COLOR.warn} fontSize="10.5" fontWeight="600">
        {labels.detects}
      </text>

      <Node
        x={16}
        y={382}
        w={126}
        h={94}
        title={labels.client}
        subtitle={labels.clientSub}
        status={labels.clientStateWith}
        statusColor={COLOR.ok}
      />
      <Node
        x={166}
        y={382}
        w={126}
        h={94}
        title={labels.local}
        subtitle={labels.localSub}
        tone="accent"
      />
      <Node
        x={536}
        y={382}
        w={126}
        h={94}
        title={labels.relay}
        subtitle={labels.relaySub}
        tone="accent"
      />
      <Node
        x={700}
        y={382}
        w={164}
        h={94}
        title={labels.server}
        subtitle={labels.serverSub}
        status={labels.serverStateWith}
        statusColor={COLOR.ok}
      />

      {/* 建立连接：客户端 → 本地客户端 → 传输通道 → 恢复中继 → 服务器 */}
      <line
        x1="142"
        y1="429"
        x2="166"
        y2="429"
        stroke={COLOR.accent}
        strokeWidth="1.8"
        markerEnd="url(#recovery-accent)"
      />
      <line x1="292" y1="429" x2="400" y2="429" stroke={COLOR.accent} strokeWidth="2" />
      <text x="414" y="415" textAnchor="middle" fill={COLOR.muted} fontSize="10.5">
        {labels.transport}
      </text>

      <g stroke={COLOR.warn} strokeWidth="2.4" strokeLinecap="round">
        <line x1="403" y1="418" x2="423" y2="440" />
        <line x1="423" y1="418" x2="403" y2="440" />
      </g>
      <text x="413" y="458" textAnchor="middle" fill={COLOR.warn} fontSize="10.5" fontWeight="600">
        {labels.interrupted}
      </text>

      <line
        x1="428"
        y1="429"
        x2="536"
        y2="429"
        stroke={COLOR.muted}
        strokeWidth="1.2"
        strokeDasharray="3 5"
        opacity="0.5"
      />
      <line
        x1="662"
        y1="429"
        x2="700"
        y2="429"
        stroke={COLOR.ok}
        strokeWidth="2"
        markerEnd="url(#recovery-ok)"
      />

      {/* 中继到服务器的原连接在恢复窗口内保留 */}
      <path
        d="M536 486 L536 496 L864 496 L864 486"
        fill="none"
        stroke={COLOR.ok}
        strokeWidth="1.2"
      />
      <text x="700" y="516" textAnchor="middle" fill={COLOR.ok} fontSize="10.5" fontWeight="600">
        {labels.kept}
      </text>
      <text x="700" y="531" textAnchor="middle" fill={COLOR.muted} fontSize="10">
        {labels.recoveryWindow}
      </text>

      {/* 客户端重新建立传输通道，逻辑会话继续 */}
      <path
        d="M229 476 C 229 548, 300 562, 414 562 S 599 548, 599 476"
        fill="none"
        stroke={COLOR.accent}
        strokeWidth="2"
        strokeDasharray="6 5"
        markerEnd="url(#recovery-accent)"
      />
      <text x="414" y="590" textAnchor="middle" fill={COLOR.accent} fontSize="11.5">
        {labels.newCarrier}
      </text>
      <text x="414" y="608" textAnchor="middle" fill={COLOR.ok} fontSize="10.5" fontWeight="600">
        {labels.resumed}
      </text>
    </svg>
  );
}

/** Section 3：普通完整响应与协议感知路径的示意对比。 */
export function LatencyDiagram({ labels }: { labels: LatencyLabels }) {
  return (
    <svg
      viewBox="0 0 880 650"
      role="img"
      aria-labelledby="latency-diagram-title"
      className="block h-auto w-full min-w-[860px] font-sans"
    >
      <title id="latency-diagram-title">{labels.title}</title>
      <MarkerDefs prefix="latency" />

      {/* 上半部分：普通连接 */}
      <rect x="1" y="1" width="878" height="282" rx="5" fill={COLOR.panel} stroke={COLOR.line} />
      <text x="24" y="40" fill={COLOR.ink} fontSize="16" fontWeight="600">
        {labels.withoutTitle}
      </text>
      <Badge x={706} y={18} w={150} text={labels.badge} color={COLOR.warn} />

      <Node x={24} y={82} w={140} h={82} title={labels.client} subtitle={labels.clientSub} />
      <Node x={716} y={82} w={140} h={82} title={labels.server} subtitle={labels.serverSub} />

      <line
        x1="164"
        y1="112"
        x2="716"
        y2="112"
        stroke={COLOR.accent}
        strokeWidth="1.4"
        markerEnd="url(#latency-accent)"
      />
      <text x="440" y="100" textAnchor="middle" fill={COLOR.muted} fontSize="10.5">
        {labels.request}
      </text>

      <line
        x1="716"
        y1="146"
        x2="164"
        y2="146"
        stroke={COLOR.muted}
        strokeWidth="3.5"
        markerEnd="url(#latency-muted)"
      />
      {[500, 548, 596, 644].map((x) => (
        <rect
          key={x}
          x={x}
          y="134"
          width="34"
          height="24"
          rx="2"
          fill={COLOR.panel2}
          stroke={COLOR.muted}
          strokeWidth="1"
        />
      ))}
      <text x="440" y="178" textAnchor="middle" fill={COLOR.ink} fontSize="11.5">
        {labels.fullResponse}
      </text>
      <text x="440" y="200" textAnchor="middle" fill={COLOR.ink} fontSize="16" fontWeight="600">
        {labels.originalSize}
      </text>

      <text x="164" y="232" fill={COLOR.muted} fontSize="10.5">
        {labels.exampleTime}
      </text>
      <rect x="164" y="240" width="552" height="8" rx="1" fill={COLOR.line} />
      <text x="716" y="266" textAnchor="end" fill={COLOR.ink} fontSize="12" fontWeight="600">
        {labels.withoutTime}
      </text>

      {/* 下半部分：优化连接 */}
      <rect x="1" y="300" width="878" height="340" rx="5" fill={COLOR.panel} stroke={COLOR.line} />
      <text x="24" y="338" fill={COLOR.ink} fontSize="16" fontWeight="600">
        {labels.withTitle}
      </text>
      <Badge x={706} y={318} w={150} text={labels.badge} color={COLOR.warn} />

      <Node x={24} y={372} w={140} h={82} title={labels.client} subtitle={labels.clientSub} />
      <Node x={716} y={372} w={140} h={82} title={labels.server} subtitle={labels.serverSub} />

      <g>
        <rect
          x="340"
          y="352"
          width="204"
          height="120"
          rx="4"
          fill={COLOR.panel2}
          stroke={COLOR.accent}
          strokeWidth="1.4"
        />
        <text x="442" y="378" textAnchor="middle" fill={COLOR.ink} fontSize="13.5" fontWeight="600">
          {labels.optimizationLayer}
        </text>
        {labels.mechanisms.map((mechanism, index) => (
          <text
            key={mechanism}
            x="442"
            y={402 + index * 20}
            textAnchor="middle"
            fill={COLOR.muted}
            fontSize="11"
          >
            {mechanism}
          </text>
        ))}
      </g>

      <line
        x1="164"
        y1="392"
        x2="340"
        y2="392"
        stroke={COLOR.accent}
        strokeWidth="1.4"
        markerEnd="url(#latency-accent)"
      />
      <text x="252" y="382" textAnchor="middle" fill={COLOR.muted} fontSize="10.5">
        {labels.request}
      </text>

      <line
        x1="544"
        y1="392"
        x2="716"
        y2="392"
        stroke={COLOR.accent}
        strokeWidth="1.4"
        markerEnd="url(#latency-accent)"
      />
      <text x="630" y="380" textAnchor="middle" fill={COLOR.muted} fontSize="10.5">
        {labels.normalRequest}
      </text>

      {/* 服务器仍返回完整响应，压缩发生在优化层 */}
      <line
        x1="716"
        y1="430"
        x2="544"
        y2="430"
        stroke={COLOR.muted}
        strokeWidth="3"
        markerEnd="url(#latency-muted)"
      />
      <text x="630" y="410" textAnchor="middle" fill={COLOR.muted} fontSize="10.5">
        {labels.fullResponse} · {labels.originalSize}
      </text>

      <line
        x1="340"
        y1="430"
        x2="164"
        y2="430"
        stroke={COLOR.accent}
        strokeWidth="2.2"
        markerEnd="url(#latency-accent)"
      />
      {[225, 247, 269].map((x) => (
        <rect
          key={x}
          x={x}
          y="424"
          width="12"
          height="12"
          rx="1"
          fill={COLOR.panel2}
          stroke={COLOR.accent}
          strokeWidth="1"
        />
      ))}
      <text x="252" y="452" textAnchor="middle" fill={COLOR.ink} fontSize="10.5">
        {labels.optimizedResponse}
      </text>
      <text x="252" y="470" textAnchor="middle" fill={COLOR.ink} fontSize="13" fontWeight="600">
        {labels.optimizedSize}
      </text>

      <path
        d="M442 472 L442 508 L94 508 L94 454"
        fill="none"
        stroke={COLOR.accent}
        strokeWidth="1.6"
        strokeDasharray="5 4"
        markerEnd="url(#latency-accent)"
      />
      <rect x="384" y="503" width="10" height="10" rx="1" fill={COLOR.panel2} stroke={COLOR.accent} />
      <text x="248" y="498" textAnchor="middle" fill={COLOR.accent} fontSize="11.5" fontWeight="600">
        {labels.protocolOptimization}
      </text>
      <text x="248" y="526" textAnchor="middle" fill={COLOR.muted} fontSize="10">
        {labels.separateRequest}
      </text>

      <text x="164" y="546" fill={COLOR.muted} fontSize="10.5">
        {labels.exampleTime}
      </text>

      <text x="164" y="566" fill={COLOR.muted} fontSize="10.5">
        {labels.timeWithout}
      </text>
      <rect x="300" y="560" width="416" height="8" rx="1" fill={COLOR.line} />
      <text x="724" y="566" fill={COLOR.ink} fontSize="11" fontWeight="600">
        {labels.withoutTime}
      </text>

      <text x="164" y="590" fill={COLOR.muted} fontSize="10.5">
        {labels.timeGeneral}
      </text>
      <rect x="300" y="584" width="65" height="8" rx="1" fill={COLOR.muted} />
      <text x="373" y="590" fill={COLOR.ink} fontSize="11" fontWeight="600">
        {labels.generalTime}
      </text>

      <text x="164" y="614" fill={COLOR.muted} fontSize="10.5">
        {labels.timeProtocol}
      </text>
      <rect x="300" y="608" width="37" height="8" rx="1" fill={COLOR.accent} />
      <text x="345" y="614" fill={COLOR.accent} fontSize="11" fontWeight="600">
        {labels.withTime}
      </text>
    </svg>
  );
}
