// game.js — Terminal-style Hand Cricket with enhancements

// ---------- DOM ----------
const term = document.getElementById("terminal");
const inputBox = document.getElementById("input-box");
const clearBtn = document.getElementById("clear-btn");
const wrap = document.getElementById("terminal-wrap");

// ---------- Cursor ----------
let cursorEl = document.createElement("span");
cursorEl.className = "cursor";

// Append cursor to terminal (always shown at bottom)
function ensureCursor() {
  // place at the end of terminal content
  if (!term.contains(cursorEl)) term.appendChild(cursorEl);
  scrollToBottom(true);
}
ensureCursor();

// ---------- Config lists ----------
const list1 = ["1","2","3","4","5","6"];
const list2 = ["1","2","3","4","5","6","7","8","9","10"];

// ---------- Utilities ----------
function smoothScrollToBottom() {
  term.scrollTo({ top: term.scrollHeight, behavior: "smooth" });
}

function scrollToBottom(jump=false) {
  // Some devices (mobile) handle smooth poorly; allow instant jump flag
  if (jump) term.scrollTop = term.scrollHeight;
  else smoothScrollToBottom();
}

function timestamp(){
  return new Date().toLocaleString();
}

// nice printing effect (instant, with small gap)
function effect(text) {
  // remove cursor, add text, then re-add cursor so cursor appears after the new text
  if (term.contains(cursorEl)) term.removeChild(cursorEl);

  // ensure trailing newline formatting
  term.innerText += String(text) + "\n\n";

  ensureCursor();
  scrollToBottom();
}

// fade-clear animation returns a Promise that resolves after cleared
function clearTermAnimated() {
  return new Promise((resolve) => {
    if (wrap.classList.contains("fade-out")) {
      // already animating — just clear
      term.innerText = "";
      ensureCursor();
      return resolve();
    }
    wrap.classList.add("fade-out");
    // after animation, clear and restore
    setTimeout(() => {
      term.innerText = "";
      wrap.classList.remove("fade-out");
      ensureCursor();
      resolve();
    }, 320);
  });
}

// ---------- Input handling ----------
let inputCallback = null;

// default inputmode is text; we'll tweak per prompt
function setInputModeFor(validList) {
  if (validList === list1 || validList === list2) {
    inputBox.setAttribute("inputmode", "numeric");
    inputBox.setAttribute("pattern", "[0-9]*");
    inputBox.type = "text"; // keep text to allow 'q', 'history'
  } else {
    inputBox.setAttribute("inputmode", "text");
    inputBox.removeAttribute("pattern");
    inputBox.type = "text";
  }
  // ensure mobile keyboard pops up and input visible
  setTimeout(()=> inputBox.focus(),50);
  // for mobile, scroll terminal so input is visible
  setTimeout(()=> scrollToBottom(true),120);
}

inputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && inputCallback) {
    const val = inputBox.value.trim();
    inputBox.value = "";
    // allow Ctrl+Enter or Shift+Enter? Not needed here.
    inputCallback(val);
  }
});

// clear button
clearBtn.addEventListener("click", () => {
  // animated clear
  clearTermAnimated();
});

// ---------- Local Storage: match history ----------
const HISTORY_KEY = "hand_cricket_history_v1";

function loadHistory(){
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch(e){ return []; }
}

function saveHistoryEntry(summary) {
  try {
    const arr = loadHistory();
    arr.unshift({ when: new Date().toISOString(), summary });
    // keep up to 50 matches
    localStorage.setItem(HISTORY_KEY, JSON.stringify(arr.slice(0,50)));
  } catch(e){
    console.warn("Could not save history:", e);
  }
}

function showHistory(){
  const arr = loadHistory();
  if (arr.length === 0) {
    effect("No matches saved yet.");
    return;
  }
  effect("=== Saved Matches ===");
  arr.forEach((it, idx) => {
    const ts = new Date(it.when).toLocaleString();
    effect(`${idx+1}) ${ts}\n${it.summary}\n---`);
  });
}

// clearing history
function clearHistory(){
  localStorage.removeItem(HISTORY_KEY);
  effect("Saved match history cleared.");
}

// ---------- Prompt wrapper ----------
function ask(promptText, validList = null) {
  return new Promise((resolve) => {
    effect(promptText);
    setInputModeFor(validList);

    inputCallback = function(value) {
      // special global commands
      if (!value) {
        // empty input is allowed for some prompts (like continue)
        if (validList === null) { inputCallback = null; resolve(""); return; }
      }

      // Echo player input on screen
      effect("> " + value);

      const lower = value.toLowerCase();

      if (lower === "q") {
        inputCallback = null;
        resolve(null);
        return;
      }

      if (lower === "history") {
        showHistory();
        // keep waiting: re-render prompt and keep callback active
        effect("(returned from history)"); // small marker
        // Re-show the same prompt (keeps user from getting stuck)
        effect(promptText);
        return;
      }

      if (lower === "clearhistory") {
        clearHistory();
        return;
      }

      if (validList && !validList.includes(value)) {
        effect("Invalid input. Please try again.");
        return;
      }

      inputCallback = null;
      resolve(value);
    };
  });
}

// ---------- Game logic (converted & preserved) ----------

async function intro() {
  await clearTermAnimated();
  effect('\n\nHello and welcome to this simple cricket game!\n\nYou can play a 1 over blitz with 2 wickets in hand or an 8 over thriller with all 10 wickets!\n\n-------------THE RULES-------------\nAt the toss, you can choose to bat or bowl first.\n\nWhen you are batting, enter a number (1-6), and the computer randomly chooses a number. If both numbers match, you\'re out, otherwise you get your number of runs added to your score.\n\nWhen you are bowling, matching numbers gets you a wicket, otherwise its runs for the computer.\n-----------------------------------\n\nHave fun & Hope you enjoy!!!\n\nPress ENTER to continue, or \'q\' to quit.');
  const x = await ask("");
  return x === null ? null : "";
}

async function ask_overs() {
  effect('Enter the number of overs you want to play for (1-10)');
  while (1) {
    const overs = await ask(">>>", list2);
    if (overs === null) return null;
    return parseInt(overs,10);
  }
}

async function ask_wickets() {
  effect('Enter the number of wickets you want to have (1-10)');
  while (1) {
    const w = await ask(">>>", list2);
    if (w === null) return null;
    return parseInt(w,10);
  }
}

async function toss() {
  effect("Please enter heads [1] or tails [2] (or q to quit)");
  while (1) {
    const choice = await ask(">>>", ["1","2"]);
    if (choice === null) return null;
    const coin = ['heads','tails'];
    const userPick = parseInt(choice,10)-1;
    const tossRes = coin[Math.floor(Math.random()*2)];
    effect(`The coin landed on: ${tossRes}`);
    if (tossRes === coin[userPick]) { effect("You have won the toss!"); return true; }
    else { effect("You have lost the toss!"); return false; }
  }
}

async function choose_action(toss_res) {
  if (toss_res) {
    effect("Do you want to bat or bowl first?");
    while (1) {
      const decision = await ask("Enter 'bat' or 'bowl':");
      if (decision === null) return null;
      const d = decision.toLowerCase().trim();
      if (["bat","bowl"].includes(d)) { effect(`You chose to ${d} first.`); return d; }
      effect("Invalid choice. Please type 'bat' or 'bowl'.");
    }
  } else {
    const d = Math.random() < 0.5 ? "bat" : "bowl";
    effect(`The computer chose to ${d} first.`);
    return d;
  }
}

async function play_over(score, wicketsLeft, overNum, totalWickets, userBatting, chasing, maxovers=null, target=null) {
  let ballsPlayed = 0;
  for (let i=1;i<=6;i++){
    effect(`\n${score}-${totalWickets-wicketsLeft} | ${overNum-1}.${i-1}`);
    if (chasing) {
      effect(`${target - score} runs required in ${(maxovers * 6) - ((overNum - 1) * 6 + i - 1)} balls`);
    }

    if (userBatting) {
      // user inputs shot
      while (1) {
        const shot = await ask("Your shot (1-6):", list1);
        if (shot === null) return [score,totalWickets,true,ballsPlayed]; // quit
        const shotN = parseInt(shot,10);
        const bowl = Math.floor(Math.random()*6)+1;
        effect(`My number is ${bowl}!`);
        ballsPlayed++;
        if (shotN === bowl) {
          effect("Your out! Wicket for me!");
          wicketsLeft -= 1;
          if (wicketsLeft === 0) { effect("You have been all out!"); return [score,totalWickets,true,ballsPlayed]; }
        } else {
          effect(`You've scored ${shotN} run${shotN!==1?'s':''}!`);
          score += shotN;
        }
        if (chasing && score >= target) {
          effect("The target has been chased down.");
          return [score, totalWickets - wicketsLeft, false, ballsPlayed];
        }
        break;
      }
    } else {
      // computer bats
      while (1) {
        const bowlVal = await ask("Your bowl (1-6):", list1);
        if (bowlVal === null) return [score,totalWickets,true,ballsPlayed];
        const bowlN = parseInt(bowlVal,10);
        const shot = Math.floor(Math.random()*6)+1;
        effect(`My number is ${shot}!`);
        ballsPlayed++;
        if (shot === bowlN) {
          effect("Wicket! Bowled 'em!");
          wicketsLeft -= 1;
          if (wicketsLeft===0) { effect("I've been all out! :("); return [score,totalWickets,true,ballsPlayed]; }
        } else {
          effect(`Computer scored ${shot} run${shot!==1?'s':''}!`);
          score += shot;
        }
        if (chasing && score >= target) {
          effect("The target has been chased down.");
          return [score, totalWickets - wicketsLeft, false, ballsPlayed];
        }
        break;
      }
    }
  }
  return [score, totalWickets - wicketsLeft, false, ballsPlayed];
}

async function play_game_1st(over, total_wickets, user_batting) {
  let total = 0, w_lost = 0, overnum = 1, total_balls = 0;
  for (let i=1;i<=over;i++){
    const res = await play_over(total, total_wickets - w_lost, overnum, total_wickets, user_batting, false);
    const [total1, w_lost1, all_out, ball_played] = res;
    total = total1; w_lost = w_lost1; overnum++; total_balls += ball_played;
    if (all_out) break;
  }
  const overs = Math.floor(total_balls/6);
  const balls = total_balls % 6;
  effect(`\nFirst Inning's score: ${total}-${w_lost} | ${overs}.${balls}`);
  return [total, w_lost, total_balls, user_batting];
}

async function play_game_2nd(over1, target1, user_batting, total_wickets=10) {
  effect(`Target to win is ${target1}!`);
  let total=0, w_lost=0, overnum=1, total_balls=0;
  for (let i=1;i<=over1;i++){
    const res = await play_over(total, total_wickets - w_lost, overnum, total_wickets, user_batting, true, over1, target1);
    const [total1, w_lost1, all_out, ball_played] = res;
    total = total1; w_lost = w_lost1; overnum++; total_balls += ball_played;
    if (all_out) break;
    if (total >= target1) break;
  }
  const overs = Math.floor(total_balls/6);
  const balls = total_balls % 6;
  effect(`\nSecond Inning's score: ${total}-${w_lost} | ${overs}.${balls}`);
  return [total, w_lost, total_balls, (total >= target1)];
}

// ---------- Main ----------
async function main() {
  const start = await intro();
  if (start === null) { effect("Game exited."); return; }

  const askOvers_ = await ask_overs();
  if (askOvers_ === null) { effect("Game exited."); return; }

  const askWickets_ = await ask_wickets();
  if (askWickets_ === null) { effect("Game exited."); return; }

  const toss_winner = await toss();
  if (toss_winner === null) { effect("Game exited."); return; }

  const action = await choose_action(toss_winner);
  if (action === null) { effect("Game exited."); return; }

  const user_batting_first = toss_winner ? (action === 'bat') : (action !== 'bat');

  // first innings
  const [target, first_wickets_lost, first_balls] = await play_game_1st(askOvers_, askWickets_, user_batting_first);

  // second innings
  const [chasing_runs, chasing_wickets, chasing_balls, chased] = await play_game_2nd(askOvers_, target + 1, !user_batting_first, askWickets_);

  // summary build
  const first_overs = Math.floor(first_balls/6);
  const first_balls_rem = first_balls % 6;
  const overs2 = Math.floor(chasing_balls/6);
  const balls2 = chasing_balls % 6;

  effect("\n--- MATCH SUMMARY ---");
  effect(`First Innings: ${target}-${first_wickets_lost} (${first_overs}.${first_balls_rem} overs) (target set: ${target + 1})`);
  effect(`Second Innings: ${chasing_runs}-${chasing_wickets} (${overs2}.${balls2} overs)`);

  let resultText = "";

  if (chasing_runs === target && !chased) {
    resultText = "It's a tie!";
    effect(resultText);
  } else if (user_batting_first) {
    if (chased) {
      resultText = `The target has been chased down. The computer wins! Defeat by ${askWickets_ - chasing_wickets} wicket(s)!`;
      effect(resultText);
      effect("Better luck next time!");
    } else {
      const runs_margin = (target + 1) - chasing_runs;
      resultText = `Congratulations! You win the match! Victory by ${runs_margin} run(s)!`;
      effect(resultText);
    }
  } else {
    if (chased) {
      resultText = `Congratulations! You win the match! Victory by ${askWickets_ - chasing_wickets} wicket(s)!`;
      effect(resultText);
    } else {
      const runs_margin = (target + 1) - chasing_runs;
      resultText = `The target has been successfully defended! The computer wins this match! Defeat by ${runs_margin} run(s)!`;
      effect(resultText);
      effect("Better luck next time!");
    }
  }

  // Save match snapshot to history (store final summary + small snapshot)
  const summarySnapshot = `First: ${target}-${first_wickets_lost} (${first_overs}.${first_balls_rem}) | Second: ${chasing_runs}-${chasing_wickets} (${overs2}.${balls2})\nResult: ${resultText}`;
  saveHistoryEntry(summarySnapshot);
  effect(`(Match saved to history at ${new Date().toLocaleString()})`);

  // after match, allow the user to type commands (history) or start again by refreshing or pressing q
  await commandLoop();
}

async function commandLoop() {
    effect("\n=== Command Mode ===");
    effect("Type:");
    effect("  play — start a new match");
    effect("  history — view past matches");
    effect("  clearhistory — delete saved matches");
    effect("  q — quit\n");

    while (true) {
        const cmd = await ask("Command:");
        if (cmd === null) return; // q

        const c = cmd.toLowerCase();

        if (c === "play" || c === "") {
            await main(); // start new match
            return;
        }
        if (c === "history") {
            showHistory();
            continue;
        }
        if (c === "clearhistory") {
            clearHistory();
            continue;
        }

        effect("Unknown command. Try again.");
    }
}


// Start
main();
