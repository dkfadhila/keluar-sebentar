---
title: "Keluar Sebentar: open-source AI that gives you a reason to close the tab"
published: false
tags: devchallenge, hf26challenge
---

*This is a submission for the [Hacktoberfest Open-Source AI Challenge Week 1: Touch Grass](https://dev.to/challenges/hacktoberfest-week1-2026-10-05).*

## What I Built

“Keluar sebentar” means “step out for a moment” in Indonesian. That is the entire ambition of this project.

An outdoor app can accidentally become another reason to keep looking at a screen: routes to optimize, species to identify, miles to log. I wanted a smaller interaction. Tell it what would feel good, give it five or ten minutes, get one mission, and leave.

Keluar Sebentar uses an open multilingual embedding model running in your browser to match your words to twelve outdoor activities. You can ask for a quiet moment, a short walk, birds, plants, or a little creativity. Your time, energy, seated preference, and need for a covered spot filter the catalog before the model's similarity scores choose a match.

You might get “Meet one ordinary leaf”: find a plant near home, notice its edge and veins, and return with one detail in mind. No photo, identification, or account needed. A balcony, porch, or familiar neighborhood can be enough.

## Demo

[Try Keluar Sebentar in your browser](https://dkfadhila.github.io/keluar-sebentar/). No login or API key is required. Enable the local AI and wait for the first model download before matching a mission.

![Real browser AI matching an Indonesian query to an outdoor mission](https://raw.githubusercontent.com/dkfadhila/keluar-sebentar/main/demo-desktop.png)

Try this exact query: **“Saya ingin lihat tanaman dan daun dekat rumah.”** In the browser test, the real model selected **“Meet one ordinary leaf.”** This result was not a canned response: the worker embedded the Indonesian query, compared it with the filtered mission embeddings, and returned the top matches.

The screen labels the result **MATCHED BY LOCAL AI**. Before model loading, you can browse a **CURATED PREVIEW** instead; that mode is deliberately labeled differently.

After choosing a mission, download a small text pocket card or press **Take this outside**. There is no countdown or performance target. On return, you may keep one observation locally, or skip recording altogether.

## Code

[Source code, setup instructions, and tests on GitHub](https://github.com/dkfadhila/keluar-sebentar).

The application is a static HTML/CSS/JavaScript project with no build step. Run it with Python's HTTP server, or host the `dist` directory. The code, mission library, and test suite are included under the MIT license. The doorstep hero and transparent door logo were generated with GPT Image; their original files and exact prompts are included in the repository. The doorstep is illustrative artwork, not a photo from a field trial.

## How I Built It

The core is [multilingual MiniLM](https://huggingface.co/Xenova/paraphrase-multilingual-MiniLM-L12-v2), using ONNX weights with [Transformers.js](https://github.com/huggingface/transformers.js). The runtime is pinned to version 3.8.1 and runs quantized q8 inference on the CPU through WebAssembly, inside a web worker.

At model initialization, it embeds the mission descriptions with mean pooling and normalization. For each request, it embeds the user's words in the same vector space. It first excludes activities that exceed the selected time or energy, or fail an access preference. A normalized dot product then ranks the remaining missions.

That separation matters. A model may consider a walking activity semantically relevant, but it cannot override a request for a seated break. The recommendation is an inspected activity from a fixed catalog, rather than a generated route or an invented nearby park.

I kept the interface intentionally finite: one recommended card, two alternatives, and a button to leave. The local reflection journal has no streaks or leaderboard. Error states never silently substitute a curated preview for an AI result.

AI coding assistance helped create the implementation, mission copy, and this draft. The catalog and ranking code are openly inspectable. Automated tests cover all 48 combinations of the hard filters, ranking behavior, malformed vectors, and catalog integrity. Real browser inference verified the Indonesian leaf example. I have not yet completed an outdoor field trial, so I am not claiming a wellbeing improvement or an offline reliability result from one.

## Why Does Open Innovation Matter?

Here, openness changes where the personal part of the interaction happens. A sentence about being tired, lonely, or overwhelmed does not need to go to an inference server. The weights arrive in the browser; the words stay there.

There is no per-request inference bill or secret API key. The open model can be replaced, the mission catalog can be translated or adapted, and the hard constraints can be inspected independently of the model. Someone building for a different neighborhood or access need can change the actual behavior, not only rewrite a prompt to a remote service.

There are tradeoffs. The first model download is substantial, around 120 MB of weights plus supporting resources. Browser caches can disappear. Semantic similarity is imperfect, and a tiny catalog will not fit every intention. The current app does not know the weather or whether a path is accessible. It asks you to choose a safe, familiar place.

For this small purpose, those boundaries are useful: the AI helps choose what to notice, then lets the world do the rest.
