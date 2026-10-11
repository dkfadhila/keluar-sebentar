# Visual direction and GPT Image assets

Generated with the built-in GPT Image tool on October 11, 2026. This is generated artwork, not documentation of an outdoor field trial. The original PNGs are preserved in `design/source/`; optimized assets are in `dist/assets/`.

The redesign uses an everyday doorstep, an open-door mark, ink blue and marigold, Bricolage Grotesque, and small IBM Plex Mono annotations. It replaces the original geometric landscape, arrow logo, serif headline, and rounded green card treatment. The core mission matching behavior is unchanged.

## Hero prompt (built-in tool; opaque background)

Use case: photorealistic-natural. Asset type: wide editorial photograph for the hero of Keluar Sebentar, an Indonesian app encouraging a short outdoor break. Create one landscape 3:2 photograph, no text. Scene: an ordinary modest Indonesian home doorstep in late afternoon. A slightly open faded blue wooden door at the left, a worn pair of blue rubber sandals on warm terracotta paving near the doorway, one simple pot with a leafy plant at the far right edge, subtle dappled leaf shadows on the wall and ground. A glimpse of a quiet leafy residential lane beyond the doorway. The door and sandals are the main subjects; no people. Composition intimate, off-center, grounded, photographed at knee height, plenty of physical texture. Style: candid 35mm film editorial photo, natural modest exposure, fine film grain, honest slightly imperfect surfaces, quiet nostalgic atmosphere. Palette dusty light blue, warm ochre terracotta, foliage olive, deep ink blue shadows. Not a luxury resort, no staged lifestyle advertising, no shiny product render, no surreal geometry, no oversaturated tropical scene, no extreme bokeh, no dramatic lens flare, no text, no lettering, no watermark. Make the space architecturally plausible and ordinary, with just a few restrained elements.

## Logo prompt (built-in tool; transparent background)

Use case: logo-brand. Asset type: primary brand symbol and favicon source for Keluar Sebentar, an Indonesian short outdoor break app. Create ONE isolated compact logo mark centered on an actual transparent background, no wordmark, no text. Concept: an open doorway and a small sun beyond it. A bold dark ink-blue rectangular doorframe with an open door leaf angled outward, with a simple round warm yellow sun visible through the opening. A very small dark blue sprout at the right foot of the threshold, integrated in the silhouette, only two leaves. The negative space inside the doorway should remain genuinely transparent except the sun. Style: confident simple graphic mark with the subtle irregularity of a hand-carved rubber stamp, slightly softened imperfect corners, flat two-color ink, no gradients or shadows. Dark ink blue #203c53, warm marigold #efb94e. High contrast, thick economical strokes, immediately legible at 32 pixels. Overall silhouette approximately square with balanced white space around it. Do not create multiple options, a mockup, sheet, app tile, background rectangle, border container, perspective room, 3D object, ornate illustration, lettering or watermark. Keep the doorway and sun as the main recognisable shapes. Transparent PNG alpha required.

## Asset preparation

`python design/build_assets.py` (Pillow required) only resizes, crops empty alpha margins, and converts file formats. It preserves the generated mark's transparency. The favicon is a size derivative of that mark. Apple/PWA icons have a solid off-white background; the primary logo and PNG favicon retain alpha.

Served assets:

- `dist/assets/porch.webp` — opaque hero, 1536×1024.
- `dist/assets/logo.png` — transparent logo, 512×512.
- `dist/favicon.ico` — 16/32/48/64 px browser favicon.
- `dist/assets/favicon-32.png` — PNG favicon.
- `dist/assets/apple-touch-icon.png` — 180 px Apple icon.
- `dist/assets/icon-192.png` and `icon-512.png` — install icons.

No runtime generation, API key, or paid inference service is needed by visitors. The static assets do not change the open-source AI inference path.
