/**
 * 「Why Choose Beptard?」预览页的中英文文案。
 *
 * 页面是独立预览页：语言只在本页切换，不接入全站 i18n，也不持久化选择。
 * 英文是默认语言；两种语言必须保持同一结构，避免切到中文时缺字段。
 */

const en = {
  nav: {
    tagline: "Product overview",
    aria: "Page sections",
    languageAria: "Page language",
    sections: [
      { id: "easy-to-use", label: "Easy to Use" },
      { id: "connection-recovery", label: "Connection Recovery" },
      { id: "lower-latency", label: "Lower Latency" },
      { id: "more-than-acceleration", label: "More Than Acceleration" },
    ],
  },
  hero: {
    eyebrow: "Product overview",
    title: "Why Choose Beptard?",
    lead: "A closer look at how Beptard keeps setup simple, holds supported sessions together through short network drops, and reduces unnecessary waiting — without turning networking into homework.",
  },
  diagramHint: "Swipe sideways to see the full diagram.",
  sections: {
    easy: {
      label: "Easy to Use",
      title: "Built for Players, Not Network Engineers",
      intro:
        "Beptard handles the network details for you. There are no proxies, domain lists, routing rules, or nodes to configure.",
      steps: ["Install Beptard", "Choose a game", "Start acceleration"],
      summary:
        "Every game has its own switch, so only the titles you turn on are accelerated. Beptard applies game-specific rules to matching connections automatically, and some games can cache local resources so existing assets do not need to be downloaded again.",
    },
    recovery: {
      label: "Connection Recovery",
      title: "A Brief Network Drop Doesn't Have to End Your Game",
      intro:
        "On supported TCP game connections, Beptard can keep the logical session alive through a short transport interruption. The game-server connection stays open while the client establishes a new transport channel, then communication resumes where it left off.",
      diagram: {
        title: "Connection recovery comparison",
        withoutTitle: "Without Beptard / VPN / other service",
        withTitle: "With Beptard",
        withoutBadge: "Connection lost",
        withBadge: "TCP Resume · supported connections",
        client: "Game client",
        clientSub: "Player",
        clientStateWithout: "Reconnecting…",
        clientStateWith: "Game continues",
        server: "Game server",
        serverSub: "Game session",
        serverStateWithout: "Old session ended",
        serverStateWith: "Same session",
        local: "Beptard client",
        localSub: "Local agent",
        relay: "Beptard relay",
        relaySub: "Resume endpoint",
        direct: "Direct game connection",
        drop: "Network drop",
        reconnect: "Game reconnects with a new connection",
        reconnectNote: "New session · progress may be lost",
        transport: "Transport channel",
        interrupted: "Transport interrupted",
        detects: "Drop detected",
        kept: "Original server connection kept",
        recoveryWindow: "within the recovery window",
        newCarrier: "New transport channel",
        resumed: "Same logical session resumes",
        errorShotCaption: "Error screen",
        errorShotAlt: "KanColle communication error screen asking the player to reload the browser.",
        continueShotCaption: "Game continues",
        continueShotAlt: "KanColle game screen after the connection recovers and play continues.",
        legend: {
          active: "Active path",
          newCarrier: "New transport channel",
          kept: "Kept server connection",
          drop: "Interruption",
        },
      },
      steps: [
        "The game client connects to the game server through Beptard.",
        "A brief network interruption breaks the transport channel.",
        "Beptard detects the interrupted transport.",
        "The original game-server connection stays open within the recovery window.",
        "The client establishes a new transport channel.",
        "The logical connection resumes and game traffic continues.",
      ],
      caveat:
        "TCP Resume applies only to supported TCP game connections and a bounded recovery window. It cannot restore a connection that the game server has already closed, and it is not a guarantee against disconnects. Unsupported connections reconnect normally.",
    },
    latency: {
      label: "Lower Latency",
      title: "Faster Responses Through Protocol-Aware Optimization",
      intro:
        "Beptard does not just send game traffic over a different route. For supported games, it can understand the request, reuse connections, apply protocol-aware handling, or compress the response where supported — cutting unnecessary waiting and bytes.",
      diagram: {
        title: "Protocol-aware request comparison",
        withoutTitle: "Without Beptard / VPN / other service",
        withTitle: "With Beptard",
        badge: "Illustrative example",
        client: "Game client",
        clientSub: "Player",
        server: "Game server",
        serverSub: "Origin",
        request: "Request",
        fullResponse: "Full response",
        originalSize: "2125 KB",
        exampleTime: "Example time",
        withoutTime: "899 ms",
        normalRequest: "Normal request",
        beptard: "Beptard",
        mechanisms: ["Reuse connections", "Protocol-aware handling", "Compress responses"],
        optimizedResponse: "Optimized response",
        optimizedSize: "128 KB",
        protocolOptimization: "Protocol optimization · 85 B",
        separateRequest: "separate example request",
        generalTime: "140 ms",
        withTime: "80 ms",
        timeWithout: "Without Beptard / VPN",
        timeGeneral: "General optimization",
        timeProtocol: "Protocol optimization",
      },
      note: "Illustrative example only — these figures are conceptual, not benchmark results.",
      caveat:
        "Actual traffic and latency depend on the game, request type, protocol handling, and network conditions. 128 KB and 85 B are separate example outcomes for different requests, not two guaranteed results of the same response. The 140 ms and 80 ms examples represent general versus protocol-optimized handling, not guaranteed results. Connection reuse, compression, and transfer optimizations apply only where supported and eligible.",
    },
    more: {
      label: "More Than Acceleration",
      title: "More Than Just Acceleration",
      intro: "Beptard is built around Japanese games, with a few practical details beyond raw speed.",
      items: [
        {
          label: "Windows and Android",
          text: "Available on both Windows and Android.",
        },
        {
          label: "Japanese game focus",
          text: "Connection strategies tailored to each supported title.",
        },
        {
          label: "Scoped rules",
          text: "Acceleration rules apply only to matching game traffic.",
        },
        {
          label: "Title-specific features",
          text: "Some games have extra capabilities, such as KanColle's dedicated resource cache and related optimizations.",
        },
      ],
      next: {
        label: "What's next",
        title: "What's next for Beptard",
        intro: "Planned directions — not features available today.",
        items: [
          {
            label: "More game support",
            text: "The supported game catalog will continue to expand.",
          },
          {
            label: "Beyond Japanese games",
            text: "Chinese games and titles from other regions may be added in future updates.",
          },
          {
            label: "Remote cache",
            text: "On a cache miss, downloads will come from the nearest CDN instead of the Japan origin server. Example: an 11 GB Uma Musume update at around 1 MB/s could reach 10+ MB/s.",
          },
          {
            label: "More servers, smarter routing",
            text: "Additional nodes will improve automatic route selection.",
          },
        ],
      },
    },
  },
  cta: {
    label: "Get Beptard",
    title: "Use Beptard",
    price: "$2.99",
    priceNote: "Simple pricing",
    disabledButton: "Subscribe",
    disabledNote: "Checkout is not available in this preview.",
    discord: "Join Discord",
    discordNote: "Discord invite coming soon.",
    discordClicked: "Thanks — the Discord invite will be available soon.",
  },
};

/** 页面文案结构（英文为基准形状，中文按同一结构校验）。 */
export type PageCopy = typeof en;

const zh: PageCopy = {
  nav: {
    tagline: "产品概览",
    aria: "页面章节",
    languageAria: "页面语言",
    sections: [
      { id: "easy-to-use", label: "简单易用" },
      { id: "connection-recovery", label: "连接恢复" },
      { id: "lower-latency", label: "更低延迟" },
      { id: "more-than-acceleration", label: "不止加速" },
    ],
  },
  hero: {
    eyebrow: "产品概览",
    title: "为什么选择 Beptard？",
    lead: "从简单的上手方式，到短暂断线后的连接恢复，再到减少不必要等待的协议优化——Beptard 把网络细节处理好，让玩家专注于游戏本身。",
  },
  diagramHint: "左右滑动查看完整示意图。",
  sections: {
    easy: {
      label: "简单易用",
      title: "为玩家而做，而不是为网络工程师",
      intro: "Beptard 替你处理网络细节：不用配置代理、域名列表、分流规则或节点。",
      steps: ["安装 Beptard", "选择游戏", "开始加速"],
      summary:
        "每款游戏都有独立开关，只加速你开启的游戏。Beptard 会按游戏规则自动处理匹配的连接；部分游戏还支持本地资源缓存，已经下载过的资源不需要再次获取。",
    },
    recovery: {
      label: "连接恢复",
      title: "短暂网络中断，不必让游戏就此结束",
      intro:
        "对于受支持的 TCP 游戏连接，Beptard 能在短暂传输中断期间保留逻辑会话。游戏服务器连接继续保留，客户端重新建立传输通道，随后双方从原来的进度继续通信。",
      diagram: {
        title: "连接恢复对比",
        withoutTitle: "未使用 Beptard / VPN / 其他服务",
        withTitle: "使用 Beptard",
        withoutBadge: "连接中断",
        withBadge: "TCP 恢复 · 受支持的连接",
        client: "游戏客户端",
        clientSub: "玩家",
        clientStateWithout: "重新连接中…",
        clientStateWith: "游戏继续",
        server: "游戏服务器",
        serverSub: "游戏会话",
        serverStateWithout: "原会话已结束",
        serverStateWith: "同一会话",
        local: "Beptard 客户端",
        localSub: "本地代理",
        relay: "Beptard 中继",
        relaySub: "恢复端点",
        direct: "游戏直连",
        drop: "网络中断",
        reconnect: "游戏需要重新建立连接",
        reconnectNote: "新会话 · 进度可能丢失",
        transport: "传输通道",
        interrupted: "传输中断",
        detects: "检测到中断",
        kept: "保留原服务器连接",
        recoveryWindow: "在恢复窗口内",
        newCarrier: "新的传输通道",
        resumed: "同一逻辑会话恢复",
        errorShotCaption: "报错画面",
        errorShotAlt: "舰队 Collection 的通信错误画面，提示玩家重新加载浏览器。",
        continueShotCaption: "游戏继续",
        continueShotAlt: "连接恢复后，舰队 Collection 的游戏画面仍在继续。",
        legend: {
          active: "活动路径",
          newCarrier: "新传输通道",
          kept: "保留的服务器连接",
          drop: "中断",
        },
      },
      steps: [
        "游戏客户端通过 Beptard 与游戏服务器建立连接。",
        "短暂网络中断切断了传输通道。",
        "Beptard 检测到传输中断。",
        "在恢复窗口内，原来的游戏服务器连接继续保留。",
        "客户端重新建立传输通道。",
        "恢复原来的逻辑连接，游戏通信继续。",
      ],
      caveat:
        "TCP 恢复仅适用于受支持的 TCP 游戏连接，并受恢复窗口限制。服务器已经关闭的连接无法恢复，也不能保证永不掉线；不支持的连接会按普通方式重新连接。",
    },
    latency: {
      label: "更低延迟",
      title: "协议感知优化，让响应更快",
      intro:
        "Beptard 不只是把游戏流量换一条线路。对部分受支持的游戏，它能理解请求内容，复用连接、进行协议感知处理，或在返回客户端前压缩响应，从而减少不必要的等待和数据量。",
      diagram: {
        title: "协议感知请求对比",
        withoutTitle: "未使用 Beptard / VPN / 其他服务",
        withTitle: "使用 Beptard",
        badge: "示意数据",
        client: "游戏客户端",
        clientSub: "玩家",
        server: "游戏服务器",
        serverSub: "源站",
        request: "请求",
        fullResponse: "完整响应",
        originalSize: "2125 KB",
        exampleTime: "示例耗时",
        withoutTime: "899 ms",
        normalRequest: "普通请求",
        beptard: "Beptard",
        mechanisms: ["复用连接", "协议感知处理", "压缩响应"],
        optimizedResponse: "优化后响应",
        optimizedSize: "128 KB",
        protocolOptimization: "协议优化 · 85 B",
        separateRequest: "另一请求的独立示例",
        generalTime: "140 ms",
        withTime: "80 ms",
        timeWithout: "未使用 Beptard / VPN",
        timeGeneral: "普通优化",
        timeProtocol: "协议优化",
      },
      note: "仅为示意，不是性能测试结果。",
      caveat:
        "实际传输量与延迟取决于游戏、请求类型、协议处理和网络条件。128 KB 与 85 B 是不同请求的独立示例结果，不是同一响应必然出现的两个阶段。140 ms 与 80 ms 分别示意普通优化与协议优化，也不是保证值。连接复用、压缩与传输优化只在受支持且符合条件时生效。",
    },
    more: {
      label: "不止加速",
      title: "不止是加速",
      intro: "Beptard 面向日本游戏，在延迟之外还有一些实际会用到的细节。",
      items: [
        {
          label: "Windows 与 Android",
          text: "同时支持 Windows 与 Android。",
        },
        {
          label: "专注日本游戏",
          text: "为每一款受支持的游戏提供对应的连接策略。",
        },
        {
          label: "规则作用范围明确",
          text: "仅对匹配的游戏流量应用加速规则。",
        },
        {
          label: "游戏专属功能",
          text: "部分游戏还有额外能力，例如舰队 Collection 的专属资源缓存与相关优化。",
        },
      ],
      next: {
        label: "后续计划",
        title: "Beptard 接下来会做什么",
        intro: "以下是计划中的方向，不代表当前已经可用。",
        items: [
          {
            label: "更多游戏支持",
            text: "继续扩展支持的游戏范围。",
          },
          {
            label: "不止日本游戏",
            text: "后续可能支持中国游戏及其他地区的游戏。",
          },
          {
            label: "远端缓存",
            text: "后续缓存未命中时，将不再回源日本服务器，而是从最近的 CDN 获取资源。例如赛马娘 11 GB 更新，正常约 1 MB/s，使用后可能达到 10+ MB/s。",
          },
          {
            label: "更多服务器与自动选路",
            text: "增加更多服务器节点，持续优化自动选路。",
          },
        ],
      },
    },
  },
  cta: {
    label: "获取 Beptard",
    title: "使用 Beptard",
    price: "$2.99",
    priceNote: "简单定价",
    disabledButton: "订阅",
    disabledNote: "预览阶段暂未开放购买。",
    discord: "加入 Discord",
    discordNote: "Discord 邀请链接即将开放。",
    discordClicked: "感谢关注，Discord 邀请链接即将开放。",
  },
};

export type Lang = "en" | "zh";

/** 两种语言共用当前选择；默认英文。 */
export const copy: Record<Lang, PageCopy> = { en, zh };
