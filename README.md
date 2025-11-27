---

# 🏏 Hand Cricket Game

A simple, text-based hand cricket game — playable either in the **Python terminal** or in a **retro-style web terminal** (via GitHub Pages).

---

## 📂 Project Structure

```
/
├── cricket.py        # Batting-only quick mode
├── c_match.py        # Full match engine (toss → innings → chase → summary)
├── docs/             # Web terminal version (for GitHub Pages)
│   ├── index.html
│   └── game.js
└── README.md
```

---

## 🎮 Play Online (Web Terminal)

A browser-based version lives inside the `/docs` folder and runs through GitHub Pages.

It features:

* Retro green terminal UI
* Blinking cursor
* Smooth scrolling
* Clear-screen animation
* Match history saved in browser storage
* Fully mobile-optimized input
* Exact same gameplay rules as the Python version

> Load at:
> `https://zxdr4gon.github.io/cricket/`

---

## 📦 Python Files

### **`cricket.py`**

Batting-only, single-innings version.
Includes:

* `intro()`
* `ask_overs()` / `ask_wickets()`
* `play_over_bf()` / `play_game_bf()`
* Terminal utilities (`effect`, `clear`)
* `choose_action()` helper

---

### **`c_match.py`**

Full match simulation with:

* Toss
* Bat / bowl decision
* First innings
* Target calculation
* Second innings with chase logic
* Automatic wicket / overs handling
* Match summary with:

  * Overs.balls formatting
  * Win margins
  * Tie detection

---

## ⚙️ Gameplay Features

* Adjustable **overs** (1–10)
* Adjustable **wickets** (1–10)
* Toss system
* Batting or bowling first
* Chase-aware scoring
* Ball-by-ball realistic hand cricket logic
* Ability to quit any prompt with `q`
* Clean match summary at the end

---

## 🧭 Controls

**Valid inputs:**

* Batting / bowling: `1`–`6`
* Overs / wickets: `1`–`10`
* Quit: `q`
* Web version special commands:

  * `history` — view match history
  * `clearhistory` — delete saved history
  * `play` — start new match after finishing

---

## ▶️ Running the Python Game

### 1. Clone

```bash
git clone https://github.com/zxdr4gon/cricket
cd cricket
```

### 2. Quick batting-only mode:

```bash
python cricket.py
```

### 3. Full match mode:

```bash
python c_match.py
```

(Use `python3` if needed.)

---

## 🎮 How the Game Works

* **Batting:**
  Enter a number (1–6).
  If your number matches the bowler → **you’re out**.
  Otherwise → you score that many runs.

* **Bowling:**
  Enter a number (1–6).
  If it matches the computer’s shot → **wicket**.
  Otherwise → computer scores.

* **In a chase:**
  You’ll see the required runs and remaining balls every ball.

Game ends when:

* Overs run out
* All wickets fall
* Or the target is chased

A final match summary displays the outcome.

---

## 🖥 Example (Python Terminal)

```
Enter the number of overs you want to play for (1-10)
>>> 2
Enter the number of wickets you want to have (1-10)
>>> 2
Please enter heads [1] or tails [2]
>>> 1
The coin landed on: tails
You have lost the toss!
The computer chose to bat first.

0-0 | 0.0
Your bowl (1-6): 3
My number is 5!
Computer scored 5 runs!
...
--- MATCH SUMMARY ---
First Innings: 42-2 (2.0 overs)
Second Innings: 38-2 (2.0 overs)
The computer wins by 5 runs.
```

---

## ✅ Requirements

* Python 3.x
* No external packages needed

---

If you'd like, I can also:

* Add screenshots/GIFs of the web terminal
* Add a “Quick Start” section for GitHub Pages
* Add badges & styling (shields.io)
* Add a gameplay diagram

Just say the word.
