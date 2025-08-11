# 🏏 Hand Cricket Game

A simple, text‑based hand cricket game you can play in the terminal.  
Play a quick batting-only over or a full match (with toss, chasing, wickets and match summary).

---

## 📂 Files
- **`cricket.py`** — Batting-only / standalone innings mode. Includes:
  - `intro()` — welcome & rules
  - `ask_overs()` / `ask_wickets()` — user input helpers
  - `play_over_bf()` / `play_game_bf()` — play one over / multiple overs (batting-focused)
  - utility functions: `effect()`, `clear()`, `choose_action()`, etc.
- **`c_match.py`** — Full match mode. Uses functions from `cricket.py` and implements:
  - Toss and choice handling
  - First and second innings logic (`play_game_1st`, `play_game_2nd`)
  - Per-over play with `play_over(...)`
  - Final match summary (winner, margin, tie handling)

---

## ⚙️ Features
- Adjustable **overs** (1–10)
- Adjustable **wickets** (1–10)
- Toss system to decide who bats/bowls first
- Batting-only quick mode (`cricket.py`) or full match (`c_match.py`)
- Chase-aware second innings (shows runs required and balls remaining)
- Real-time typing-style commentary (`effect()`)
- Input validation and ability to quit any prompt with `q`
- Match summary with overs.balls formatting and win/loss margins

---

## 🎮 How to Play (Rules)
- When **batting**, enter a number from **1–6**.
  - If your number **matches** the computer’s number → **you're out** (wicket).
  - If they don't match → you score that many runs.
- When **bowling**, enter a number from **1–6**.
  - If it matches the computer's bat number → you take a wicket.
  - Otherwise, the computer scores that many runs.
- Game ends when overs are completed or all wickets are lost.
- During a chase, the game shows runs required and balls remaining.
- At any text prompt, enter `q` to quit the game.

---

## ▶️ Running the Game
1. Clone your repo (replace `yourusername` / repo name as needed):
   ```bash
   git clone https://github.com/yourusername/cricket.git
   cd cricket

2. Run batting-only (quick innings):

python cricket.py


3. Run full match:

python c_match.py



> If you have both python and python3 installed, use python3 as needed.




---

## 🧭 Controls & Input
- Valid batting / bowling inputs: `1`, `2`, `3`, `4`, `5`, `6`
- Valid overs: `1`–`10`
- Valid wickets: `1`–`10`
- Quit at any input prompt: `q`

---

## 🧩 Code Structure (quick overview)
- `cricket.py`
  - Core I/O helpers and a standalone batting mode (`play_game_bf`)
  - Typing effect helper (`effect`) and clear screen helper (`clear`)
  - Inputs for overs/wickets and toss helper
- `c_match.py`
  - Imports helpers from `cricket.py`
  - Implements `play_over`, `play_game_1st`, `play_game_2nd` and the overall match flow
  - Prints match summary and decides result/winner

---

## 🖥 Example Gameplay (what you might see)

    Hello and welcome to this simple cricket game!

    -------------THE RULES-------------
    At the toss, you can choose to bat or bowl first.
    ...
    Enter the number of overs you want to play for (1-10)
    >>> 2
    Enter the number of wickets you want to have (1-10)
    >>> 2
    Please enter heads [1] or tails [2] (or q to quit)
    >>> 1
    The coin landed on: tails
    You have lost the toss!
    The computer chose to bat first.

    0-0 | 0.0
    Your shot (1-6): 4
    My number is 2!
    You've scored 4 runs!

    --- MATCH SUMMARY ---
    First Innings: 42-2 (2.0 overs) (target set: 43)
    Second Innings: 38-2 (2.0 overs)
    The target has been successfully defended! The computer wins this match!
    Defeat by 5 runs
    Better luck next time!

---

## ✅ Requirements
- Python 3.x (no external packages required)

---
