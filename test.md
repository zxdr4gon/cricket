# 🏏 Hand Cricket — Retro Terminal Edition

[![Python Version](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/)
[![Platform](https://img.shields.io/badge/platform-Terminal%20%7C%20Web-brightgreen.svg)]()
[![License](https://img.shields.io/badge/license-MIT-green.svg)]()

> A nostalgic schoolyard classic modernized with a dual-engine architecture: a fully-featured Python CLI engine and an immersive, responsive, retro green-screen web terminal.

---

## 🌐 Play Online Instantly

The web version runs entirely in your browser via GitHub Pages. It features a custom asynchronous command loop, vintage CRT typography, and fully mobile-optimized touch controls.

🔗 **[Live Demo: Play in your Browser](https://zxdr4gon.github.io/cricket/)** (Shortlink: `https://bit.ly/cterminal`)

---

## 📂 Project Structure

```text
/
├── cricket.py        # Batting-only single-innings quick mode
├── c_match.py        # Full-match simulation engine (Toss ➔ 2 Innings ➔ Chase Logic)
├── docs/             # Web implementation deployed via GitHub Pages
│   ├── index.html    # CRT terminal layout & theme styling
│   └── game.js       # Asynchronous JS command interpreter & engine bridge
└── README.md         # Project documentation
---

## ✨ Features

### 📦 Core Engine & Mechanics

* **Configurable Settings:** Fully customizable match dynamics. Play anything from a lightning-fast 1-over shootout with 1 wicket up to a grueling 10-over thriller with a full 10-wicket roster.
* **Authentic Cricket Math:** Automatically converts raw delivery counts into official cricket notation (e.g., 11 balls faced is cleanly formatted and displayed as `1.5` overs).
* **Dynamic Target Tracking:** In the second innings, the scoreboard automatically updates after *every single delivery*, computing precisely how many runs are required from how many remaining balls.
* **Edge-Case Handlers:** Built-in safeguards for exact ties, immediate walk-off victories upon hitting the target, and instant all-out terminations.

### 🐍 Python Terminal Enhancements

* **Visual Polish:** Implements a custom text-streaming `effect()` function to mimic vintage 80s computing runtimes.
* **Cross-Platform Clear Screen:** Automatically detects operating systems (`Windows`/`NT` vs. `POSIX`/`Linux`/`macOS`) to clear the active viewport flawlessly using the correct commands (`cls` vs `clear`).
* **Robust Form Sanitization:** Strict input verification loops prevent game crashes due to typos or numbers outside the `1–6` boundary.

### 🌐 Web Terminal Exclusives

* **Retro Aesthetics:** Styled like a retro monospace terminal terminal with an active blinking block cursor and smooth auto-scrolling log.
* **Persistent Session Cache:** Integrates directly with the browser's `localStorage` to keep a running ledger of your historical matches, complete with custom timestamps.
* **Virtual Command Prompt:** Features a CLI-like interactive prompt (`Command Mode`) capable of routing system actions natively based on input terms.

---

## 🎮 How the Game Works

The game cleanly maps the real-world mechanics of hand cricket into software routines:

1. **The Toss:** You choose **Heads (1)** or **Tails (2)**. The winner elects to **Bat** or **Bowl** first.
2. **Batting:** You enter a hidden number between `1` and `6`. The computer simultaneously generates a random number between `1` and `6`.
* *If the numbers match:* **You are OUT!** A wicket falls.
* *If the numbers differ:* Your selected number is added directly to your score as runs.


3. **Bowling:** You choose a number to predict the computer's choice. If your numbers match, you claim a wicket! Otherwise, the computer scores its number.
4. **The Target:** The second innings target is strictly defined as $Innings~1~Total + 1$. The match ends immediately if the chasing team eclipses this target, runs out of wickets, or consumes all allowed deliveries.

---

## 🚀 Running the Python Version Locally

### 1. Installation

Clone the repository to your desktop machine using Git:

```bash
git clone [https://github.com/zxdr4gon/cricket.git](https://github.com/zxdr4gon/cricket.git)
cd cricket

```

### 2. Execution Modes

#### Mode A: Quick Batting Practice

To play a swift, simplified single-innings game where you focus purely on setting the highest score possible against the machine:

```bash
python cricket.py

```

#### Mode B: The Full Match Engine

To experience the definitive simulation including coin toss, tactical choices, bowling innings, and a dynamic scoreboard chase:

```bash
python c_match.py

```

*(Note: Use `python3` instead of `python` if required by your environment setup).*

---

## 🖥️ Web Terminal Commands

When the match completes on the web terminal version, the console switches gears into an interactive **Command Mode**. You can execute the following actions directly from the text input field:

| Command | Action |
| --- | --- |
| `play` *(or Enter)* | Re-initializes the game engine and loads the over/wicket setup prompt. |
| `history` | Fetches, formats, and outputs all historical match records from browser storage. |
| `clearhistory` | Instantly purges all saved match summaries from your local browser cache. |
| `q` | Soft-quits the command loop interface. |

---

## 🛠️ Technical Deep Dive

### The Cricket Logic Layer

The core delivery state handling is powered by precise loop trackers. Take a look at how target calculation and standard-cricket formatting coordinate cleanly during runtime:

```python
# Converts raw ball counters into standard over decimals
overs = total_balls // 6
balls = total_balls % 6
print(f"Current Over: {overs}.{balls}")

```

### Async IO Management (JavaScript)

To avoid blocking the browser's main UI thread during sequential turn choices, the web front-end treats user feedback loops as interceptable `Promises` using explicit `async/await` structures tied to standard DOM event handlers.

---

## 👥 Credits & Authorship

Developed with 🏏 passion by **Syed Zainulabideen Mahdi** ([@zxdr4gon](https://www.google.com/search?q=https://github.com/zxdr4gon)).

Feel free to open an Issue or pull request if you want to contribute alternative interfaces, feature expansions, or game enhancements!

---

## 📄 License

This project is licensed under the MIT License - see the local repository details for permissions.

```

```
