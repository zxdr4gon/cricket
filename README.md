# 🏏 Hand Cricket Game

A simple, text-based hand cricket game you can play in the terminal.  
Test your batting or bowling skills against the computer in a quick over or a full match.

## 📂 Files
- **`cricket.py`** – Standalone batting-only mode. Play a single innings where you bat, and the computer bowls.  
- **`c_match.py`** – Full match mode. Includes both batting and bowling, toss, target chasing, and match summary.

## 🎮 How to Play
The rules are simple:
- When **batting**, choose a number between 1–6.
  - If the number matches the computer’s number → you’re out!
  - Otherwise, you score that many runs.
- When **bowling**, enter a number between 1–6.
  - If the number matches the computer’s → you take a wicket.
  - Otherwise, the computer scores that many runs.
- Play continues until overs are completed or all wickets are lost.

## ▶️ Running the Game
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cricket.git
   cd cricket
