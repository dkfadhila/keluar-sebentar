# Verification — October 11, 2026

## Automated checks

`node --test tests/*.test.mjs`: **4 passed, 0 failed**.

- Every one of the 48 filter combinations has at least one valid mission.
- No returned mission violates duration, energy, seated, or covered constraints.
- Vector ranking selects the nearest normalized vector.
- Malformed and non-finite embeddings throw errors instead of producing fake recommendations.
- All catalog IDs are unique; every mission contains three steps and pocket/reflection copy.

## Real browser checks

Tested in the Codex in-app Chromium browser, serving `dist/` on localhost:

1. Initial load displays a curated preview with matching disabled. Enable AI downloads the ONNX model and initializes the worker successfully.
2. `Saya ingin lihat tanaman dan daun dekat rumah` returns **Meet one ordinary leaf**, labeled **MATCHED BY LOCAL AI**. Alternatives include a plant-care mission and bird observation.
3. A conflicting query (`I want a long energetic walk and exercise`) with **5 minutes**, **seated**, and **covered** returns **Borrow a little sky** and two compatible alternatives. It does not select a walking mission.
4. The leave-screen button opens the quiet dialog with the mission name and duration. **I'm back** opens the optional reflection.
5. A clearly labeled test observation is saved and visible in the local journal. Erase removes it and hides the empty journal. Test data was cleaned up.
6. Desktop layout checked at 1280×900. Mobile layout checked at 390×844; document scrollWidth 375 px, so there is no horizontal overflow.
7. `demo-desktop.png` and `demo-mobile.png` capture the real model match.
8. Public GitHub Pages deployment succeeded. The public root URL returned HTTP 200 with the expected application title. The repository is public and its default branch is `main`.

## Visual redesign verification

The second design uses generated GPT Image assets: an opaque doorstep hero and a transparent open-door logo. The logo's alpha range is 0–255. The ICO contains 16, 32, 48 and 64 pixel sizes; Apple and PWA icons are also present. All local image/style references resolve to files.

The redesigned app was checked at 1280×900 and 390×844. At the mobile breakpoint, document scrollWidth is 375 px with viewport width 390 px, with no horizontal overflow. All four visible or dialog image references loaded successfully. Local AI initialization and the Indonesian leaf query still work with the updated interface, selecting **Meet one ordinary leaf**. All four automated tests still pass. Updated `demo-desktop.png` and `demo-mobile.png` capture the new interface with that real match.

## Not yet verified

- Offline AI on a disconnected device; no offline reliability claim is made.
- Outdoor field use; the dialog test is not an outdoor trial.
- Safari/Firefox, low-memory phones, screen-reader navigation, cache eviction, and network failure recovery.
- DEV submission: the article has not been published.

Model failure paths display an error and keep curated browsing available, but a forced failure was not exercised in this browser test.

## Post-deployment debug pass

On the public GitHub Pages origin, the redesigned model initialized successfully and the Indonesian leaf query returned **Meet one ordinary leaf**. Empty-query validation correctly focused the input and showed a message. Browser error/warning logs were empty at that point.

The embedded browser did not deliver a native download event for the original pocket-card button. The button now opens a readable card preview with a persistent explicit `.txt` download link and a copy action. The copy action shows feedback inside the modal; if clipboard access is denied, it selects the text for manual copying. Card contents, the download filename, and successful copy UI feedback were verified locally. Native file download and OS clipboard delivery could not be independently verified through the in-app browser automation bridge.

The redesigned leave/return dialogs, local reflection save/render/erase, and conflicting 5-minute/seated/covered filters were checked again. A labeled agent-authored test reflection was removed after verification. No outdoor trial was performed. All four automated tests still pass after the pocket-card fix.

A deployment check exposed an old browser-cached HTML document despite the server returning the updated document. CSS and application entrypoints now use versioned URLs. The service worker is versioned, registered with `updateViaCache: 'none'`, and revalidates same-origin shell requests instead of relying on HTTP freshness. Its shell cache was advanced to v4, with immediate worker activation after precaching.
