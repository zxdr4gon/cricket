#🏏 Hand Cricket Game

A simple, text-based hand cricket game you can play in the terminal.
Test your batting or bowling skills against the computer in a quick over or a full match.

#📂 Files

cricket.py – Standalone batting-only mode. Play a single innings where you bat, and the computer bowls.

c_match.py – Full match mode. Includes both batting and bowling, toss, target chasing, and match summary.


🎮 How to Play

The rules are simple:

When batting, choose a number between 1–6.

If the number matches the computer’s number → you’re out!

Otherwise, you score that many runs.


When bowling, enter a number between 1–6.

If the number matches the computer’s → you take a wicket.

Otherwise, the computer scores that many runs.


Play continues until overs are completed or all wickets are lost.


▶️ Running the Game

1. Clone the repository:

git clone https://github.com/yourusername/cricket.git
cd cricket


2. Run batting-only mode:

python cricket.py


3. Run full match mode:

python c_match.py



⚙️ Features

Adjustable overs (1–10)

Adjustable wickets (1–10)

Toss system to decide batting/bowling order

Real-time commentary with typing effect

Match summary at the end

Option to quit anytime by entering q


🖥 Example Gameplay

Hello and welcome to this simple cricket game!

-------------THE RULES-------------
At the toss, you can choose to bat or bowl first.
...
Your shot (1-6): 4
My number is 2!
You've scored 4 runs!

📌 Requirements

Python 3.x
(No extra dependencies needed)


