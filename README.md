# Keluar Sebentar

**Take five. Go outside.** A browser-local open-source AI that matches a short outdoor mission to your mood, time, energy, and access preferences. Built from scratch on October 11, 2026 for Hacktoberfest Week 1: Touch Grass.

[Live demo](https://dkfadhila.github.io/keluar-sebentar/) · [Public repository](https://github.com/dkfadhila/keluar-sebentar)

## Run locally

```sh
python -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:4173. Python 3 is sufficient; there is no install/build step. Any static hosting service can serve `dist/`. Use HTTPS or localhost for the service worker. GitHub Pages can serve it using the included Actions workflow.

1. Choose **Enable open-source AI**. First use downloads approximately 120 MB of model weights plus tokenizer/runtime files from Hugging Face and jsDelivr. It can take a few minutes.
2. Wait for **Local AI ready**. Try `Saya ingin lihat tanaman dan daun dekat rumah` or `I want to listen to birds somewhere quiet`.
3. Set your time, energy, and preferences; choose **Find a mission**.
4. Open **Download a pocket card** for a readable preview, an explicit `.txt` download, or **Copy the card**. Choose **Take this outside** when ready. The app deliberately has no timer, route tracking, or streak.
5. On return, optionally save one observation. The last five saved observations are visible in the local journal; up to 50 are retained. Erase them in **The model, privacy & limitations**.

Curated browsing works without the model. It is explicitly labeled **CURATED PREVIEW**, and does not claim to be AI inference.

## How the AI works

- Model: [Xenova/paraphrase-multilingual-MiniLM-L12-v2](https://huggingface.co/Xenova/paraphrase-multilingual-MiniLM-L12-v2), ONNX conversion of [Sentence Transformers multilingual MiniLM](https://huggingface.co/sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2).
- Runtime: [Transformers.js](https://github.com/huggingface/transformers.js), pinned to 3.8.1, CPU WebAssembly, q8 weights, in a module worker.
- Each of the 12 original, human-readable missions has an English/Indonesian semantic description. On load, the worker embeds them with mean pooling and normalization. It embeds the user's query with the same pipeline.
- Hard constraints remove incompatible activities before ranking. The normalized dot product selects the top three. Similarity is a ranking score, not a probability or medical assessment.
- The AI is retrieval, not text generation. It does not invent routes, weather, plant identities, or destinations.
- Model/network failure displays an error; it never disguises a rules-based result as AI.

Mission text was authored with AI coding assistance and remains editable in `dist/missions.js`. “Human-readable” describes the inspectable catalog, not an unaided authorship claim.

## Privacy and offline limits

No application backend, analytics, geolocation, API key, or inference API. Queries and embeddings stay in browser memory. Reflections use localStorage on the current origin and are not encrypted. CDN/model hosts receive normal download metadata such as IP address, but no mood text. Google Fonts is used for typography with system fallbacks.

The service worker caches the static application and downloaded jsDelivr resources. Transformers.js caches model resources in the browser. After a successful first load and cache population, offline use may work, but caches can be evicted and private browsing may restrict them. **Do not assume offline AI availability without testing on your target browser.** Reload online before leaving if needed; exported text cards need no model or connection.

## Verification

```sh
node --test tests/*.test.mjs
```

Four tests cover all 48 combinations of time/energy/access filters, ranking, malformed embeddings, and catalog integrity. Real browser inference was verified on October 11, 2026: the Indonesian leaf query selected **Meet one ordinary leaf**. Browser UI checks and further results are recorded in `TESTING.md`. No outdoor field trial is claimed.

## Submission

`SUBMISSION.md` follows the official DEV template and includes the public repository and demo links. `SUBMIT-ID.md` gives the final DEV publication steps in Bahasa Indonesia. The article must still be published on DEV to enter the challenge.

## Credits and licensing

Application code: MIT, see LICENSE. Hero artwork and transparent door logo were generated with the built-in GPT Image tool. Original PNGs, exact prompts, and asset preparation are preserved in `design/`; see [asset notes](design/ASSETS.md). The generated doorstep scene is illustrative, not evidence of an outdoor field trial. Browser, Apple, and PWA icons derive from the same door mark. Transformers.js: Apache-2.0. Multilingual MiniLM base model: Apache-2.0 as declared on the upstream model card; model downloads remain governed by their upstream terms. Bricolage Grotesque and IBM Plex Mono are served by Google Fonts under their font licenses. No images or code were copied from another contest entry.

## Challenge window

Deadline: October 11, 2026, 11:59 PM PDT = October 12, 2026, 13:59 WIB. Any commits made after that deadline must be explicitly documented here before using this repository as an entry.
