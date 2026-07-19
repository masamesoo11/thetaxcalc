module.exports = [
"[project]/src/app/opengraph-image.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "alt",
    ()=>alt,
    "contentType",
    ()=>contentType,
    "default",
    ()=>Image,
    "runtime",
    ()=>runtime,
    "size",
    ()=>size
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-rsc] (ecmascript)");
;
const runtime = 'edge';
const alt = 'TheTaxCalc — Free 2026 Paycheck & Mortgage Calculator';
const size = {
    width: 1200,
    height: 630
};
const contentType = 'image/svg+xml';
async function Image() {
    const states = [
        'IL 4.95%',
        'TX 0%',
        'FL 0%',
        'CA 1-13.3%',
        'NY 4-10.9%'
    ];
    const stateBadges = states.map((s)=>`<rect x="0" y="0" width="130" height="40" rx="20" fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.3)" stroke-width="1"/>
     <text x="65" y="26" text-anchor="middle" fill="#10b981" font-family="sans-serif" font-weight="600" font-size="16">${s}</text>`).join('');
    const totalWidth = states.length * 130 + (states.length - 1) * 12;
    const startX = (1200 - totalWidth) / 2;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <radialGradient id="glow" cx="50%" cy="0%" r="60%">
        <stop offset="0%" style="stop-color:rgba(16,185,129,0.15)"/>
        <stop offset="100%" style="stop-color:transparent"/>
      </radialGradient>
    </defs>
    <rect width="1200" height="630" fill="#0a0f1e"/>
    <rect width="1200" height="630" fill="url(#glow)"/>

    <!-- Logo -->
    <rect x="540" y="80" width="64" height="64" rx="16" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.4)" stroke-width="2"/>
    <text x="572" y="122" text-anchor="middle" fill="#10b981" font-family="sans-serif" font-weight="900" font-size="36">T</text>
    <text x="644" y="120" fill="#10b981" font-family="sans-serif" font-weight="700" font-size="32">TheTaxCalc</text>

    <!-- Main Heading -->
    <text x="600" y="240" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-weight="900" font-size="56">Free 2026 Tax Calculators</text>

    <!-- Sub Heading -->
    <text x="600" y="300" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-family="sans-serif" font-weight="400" font-size="26">Paycheck · Mortgage · 401(k) · Capital Gains · Self-Employment</text>

    <!-- State badges -->
    <g transform="translate(${startX}, 350)">
      ${states.map((s, i)=>`<g transform="translate(${i * 142}, 0)">
          <rect width="130" height="40" rx="20" fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.3)" stroke-width="1"/>
          <text x="65" y="26" text-anchor="middle" fill="#10b981" font-family="sans-serif" font-weight="600" font-size="16">${s}</text>
        </g>`).join('')}
    </g>

    <!-- Bottom tagline -->
    <text x="600" y="470" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-family="sans-serif" font-weight="400" font-size="18">100% Free · No Sign-Up Required · Updated for 2026</text>
  </svg>`;
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"](svg, {
        headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': 'public, max-age=86400'
        }
    });
}
}),
"[project]/src/app/opengraph-image--metadata.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$opengraph$2d$image$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/opengraph-image.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$lib$2f$metadata$2f$get$2d$metadata$2d$route$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/lib/metadata/get-metadata-route.js [app-rsc] (ecmascript)");
;
;
const imageModule = {
    alt: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$opengraph$2d$image$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["alt"],
    contentType: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$opengraph$2d$image$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["contentType"],
    runtime: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$opengraph$2d$image$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["runtime"],
    size: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$opengraph$2d$image$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["size"]
};
async function __TURBOPACK__default__export__(props) {
    const { __metadata_id__: _, ...params } = await props.params;
    const imageUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$lib$2f$metadata$2f$get$2d$metadata$2d$route$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fillMetadataSegment"])("/", params, "opengraph-image", false);
    function getImageMetadata(imageMetadata, idParam) {
        const data = {
            alt: imageMetadata.alt,
            type: imageMetadata.contentType || 'image/png',
            url: imageUrl + (idParam ? '/' + idParam : '') + '?' + "8732b492ab3ce4ee"
        };
        const { size } = imageMetadata;
        if (size) {
            data.width = size.width;
            data.height = size.height;
        }
        return data;
    }
    return [
        getImageMetadata(imageModule, '')
    ];
}
}),
"[project]/src/app/opengraph-image--metadata.js [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/opengraph-image--metadata.js [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=src_app_0k3p96c._.js.map