
import random
from cricket import effect, list1, ask_overs, ask_wickets, toss, choose_action, clear, intro


def play_over(score, wickets, over_num, total_wickets, user_batting, chasing, maxovers=None, target=None):
    # user_batting: True if user is batting, False if computer is batting
    balls_played = 0
    over = over_num
    for i in range(1, 7):
        #Displaying the score
        effect(f"\n{score}-{total_wickets-wickets} | {over_num-1}.{i-1}\n")
        if chasing:
            effect(f"{target - score} runs required in {(maxovers * 6) - ((over_num - 1) * 6 + i - 1)} balls\n")

        
        if user_batting:
            # User inputs shot, computer randomly bowls
            while True:
                shot = input("Your shot (1-6): ")
                if shot in list1:
                    shot = int(shot)
                    break

                effect("Invalid input. Please enter a number between 1 and 6.")

            bowl = random.randint(1, 6)
            effect(f'My number is {bowl}!')
            balls_played += 1
            
            if shot == bowl:
                effect("Your out! Wicket for me!")
                wickets-=1
                if wickets==0:
                    effect("You have been all out!")
                    return score, total_wickets, True, balls_played

            else:
                effect(f"You've scored {shot} run{'s' if shot != 1 else ''}!")
                score+=shot

            if chasing:
                if score >= target:
                    effect("The target has been chased down.")
                    return score, total_wickets-wickets, False, balls_played

        else:
            # Computer randomly bats, user inputs bowl
            shot = random.randint(1, 6)
            while True:
                bowl = input("Your bowl (1-6): ")
                if bowl in list1:
                    bowl = int(bowl)
                    break

                effect("Invalid input. Please enter a number between 1 and 6.")

            effect(f'My number is {shot}!')
            balls_played += 1
            if shot == bowl:
                effect("Wicket! Bowled 'em!")
                wickets-=1
                if wickets==0:
                    effect("I've been all out! :(")
                    return score, total_wickets, True, balls_played

            else:
                effect(f"Computer scored {shot} run{'s' if shot != 1 else ''}!")
                score+=shot

            if chasing:
                if score >= target:
                    effect("The target has been chased down.")
                    return score, total_wickets-wickets, False, balls_played

    return score, total_wickets-wickets, False, balls_played

def play_game_1st(over, total_wickets, user_batting):
    total, w_lost, overnum = 0, 0, 1
    total_balls = 0

    chasing = False

    for i in range(1, over + 1):
        total1, w_lost1, all_out, ball_played = play_over(total, total_wickets-w_lost, overnum, total_wickets, user_batting, chasing)
        total=total1
        w_lost=w_lost1
        overnum += 1
        total_balls += ball_played
        if all_out:
            break
    overs = total_balls // 6
    balls = total_balls % 6
    effect(f"\nFirst Inning's score: {total}-{w_lost} | {overs}.{balls}")
    return total, w_lost, total_balls, user_batting

def play_game_2nd(over1, target1, user_batting, total_wickets=10):
    effect(f"Target to win is {target1}!")
    total, w_lost, overnum = 0, 0, 1
    total_balls = 0
    for i in range(1, over1 + 1):
        total1, w_lost1, all_out, ball_played = play_over(total, total_wickets-w_lost, overnum, total_wickets, user_batting, True, over1, target1)
        total = total1
        w_lost = w_lost1
        overnum += 1
        total_balls += ball_played
        if all_out:
            break
        if total >= target1:
            break
    overs = total_balls // 6
    balls = total_balls % 6
    effect(f"\nSecond Inning's score: {total}-{w_lost} | {overs}.{balls}")
    
    return total, w_lost, total_balls, (total >= target1)

if __name__ == "__main__":
    
    start = intro()

    #To check if the user quit
    if start is None:
        effect("Game exited.")
        exit()

    clear()

    ask_overs_ = ask_overs()

    #To check if the user quit
    if ask_overs_ is None:
        effect("Game exited.")
        exit()

    ask_wickets_ = ask_wickets()

    #To check if the user quit
    if ask_wickets_ is None:
        effect("Game exited.")
        exit()

        # Determine toss result
    toss_winner = toss()  # 'user' or 'computer'
    action = choose_action(toss_winner)  # 'bat' or 'bowl'

    # Figure out who actually bats first
    if toss_winner == 'user':
        user_batting_first = True if action == 'bat' else False
    else:  # computer won toss
        user_batting_first = False if action == 'bat' else True


    target, first_wickets_lost, first_balls, _ = play_game_1st(ask_overs_, ask_wickets_, user_batting_first)





    chasing_runs, chasing_wickets, chasing_balls, chased = play_game_2nd(ask_overs_, target + 1, not user_batting_first, ask_wickets_)

    # Calculate overs.balls for second innings
    overs = chasing_balls // 6
    balls = chasing_balls % 6

    first_overs = first_balls // 6
    first_balls_rem = first_balls % 6

    #Printing the match summary

    effect("\n--- MATCH SUMMARY ---")


    effect(f"First Innings: {target}-{first_wickets_lost} ({first_overs}.{first_balls_rem} overs) (target set: {target + 1})")

    effect(f"Second Innings: {chasing_runs}-{chasing_wickets} ({overs}.{balls} overs)")

    # Tie check
    if chasing_runs == target and not chased:
        effect("It's a tie!")

    #To check who won, player or the computer
    elif user_batting_first:
        if chased:
            effect("The target has been chased down! The computer wins!")
            effect(f"Defeat by {ask_wickets_ - chasing_wickets} wicket{'s' if ask_wickets_ - chasing_wickets != 1 else ''}!")
            effect("Better luck next time!")
        else:
            runs_margin = (target + 1) - chasing_runs
            effect("Congratulations! You win the match!")
            effect(f"Victory by {runs_margin} run{'s' if runs_margin != 1 else ''}!")

    else:
        if chased:
            effect("Congratulations! You win the match!")
            effect(f"Victory by {ask_wickets_ - chasing_wickets} wicket{'s' if ask_wickets_ - chasing_wickets != 1 else ''}!")
        else:
            runs_margin = (target + 1) - chasing_runs
            effect("The target has been successfully defended! The computer wins this match! ")
            effect(f"Defeat by {runs_margin} run{'s' if runs_margin != 1 else ''}!")
            effect("Better luck next time!")
