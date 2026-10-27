/** Bepchan 独立预览页的英文文案。 */

export const copy = {
  nav: {
    title: "Bepchan",
    tagline: "Technical overview",
    aria: "Page sections",
    sections: [
      { id: "easy-to-use", label: "Easy to Use" },
      { id: "connection-recovery", label: "Connection Recovery" },
      { id: "lower-latency", label: "Lower Latency" },
      { id: "more-than-acceleration", label: "More Than Acceleration" },
    ],
  },
  hero: {
    eyebrow: "Technical overview",
    title: "Why Choose Bepchan?",
    lead: "A closer look at how Bepchan keeps setup simple, holds supported sessions together through short network drops, and reduces unnecessary waiting — without turning networking into homework.",
  },
  diagramHint: "Swipe sideways to see the full diagram.",
  sections: {
    easy: {
      label: "Easy to Use",
      title: "Built for Players, Not Network Engineers",
      intro:
        "Bepchan handles the network details for you. There are no proxies, domain lists, routing rules, or nodes to configure.",
      steps: ["Install Bepchan", "Choose a game", "Start acceleration"],
      summary:
        "Every game has its own switch, so only the titles you turn on are accelerated. Bepchan applies game-specific rules to matching connections automatically, and some games can cache local resources so existing assets do not need to be downloaded again.",
    },
    recovery: {
      label: "Connection Recovery",
      title: "A Brief Network Drop Doesn't Have to End Your Game",
      intro:
        "On supported TCP game connections, Bepchan can keep the logical session alive through a short transport interruption. The game-server connection stays open while the client establishes a new transport channel, then communication resumes where it left off.",
      diagram: {
        title: "Connection recovery comparison",
        withoutTitle: "Without Bepchan",
        withTitle: "With Bepchan",
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
        local: "Local client",
        localSub: "Local agent",
        relay: "Resume relay",
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
        "The game client connects to the game server through Bepchan.",
        "A brief network interruption breaks the transport channel.",
        "Bepchan detects the interrupted transport.",
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
        "Bepchan goes beyond routing game traffic. For supported games, it can understand the request, reuse connections, apply protocol-aware handling, or compress the response where supported — cutting unnecessary waiting and bytes.",
      diagram: {
        title: "Protocol-aware request comparison",
        withoutTitle: "Without Bepchan / VPN / other service",
        withTitle: "With Bepchan",
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
        optimizationLayer: "Bepchan",
        mechanisms: ["Reuse connections", "Protocol-aware handling", "Compress responses"],
        optimizedResponse: "Optimized response",
        optimizedSize: "128 KB",
        protocolOptimization: "Protocol optimization · 85 B",
        separateRequest: "separate example request",
        generalTime: "140 ms",
        withTime: "80 ms",
        timeWithout: "Without Bepchan / VPN",
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
      intro: "Bepchan focuses on Japanese games, with a few practical details beyond raw speed.",
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
        title: "What's next for Bepchan",
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
    title: "Join Us on Discord",
    discord: "Join Discord",
    discordNote: "Discord invite coming soon.",
    discordClicked: "Thanks — the Discord invite will be available soon.",
  },
};

export type PageCopy = typeof copy;
