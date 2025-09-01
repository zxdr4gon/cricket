# Hand Cricket game

import time
import random
import os

list1 = [str(i) for i in range(1,7)]
list2 = [str(i) for i in range(1,11)]

def clear():
    os.system('cls' if os.name == 'nt' else 'clear')

def effect(text, delay=0.04):
    
    print(text)
    print()

def intro():
    clear()
    print('\n'*3)
    effect('''Hello and welcome to this simple cricket game!
\nYou can play a 1 over blitz with 2 wickets in hand or even a 8 over thriller with all 10 wickets!
There are hundreds of possibilities!
\n\033[1m-------------THE RULES-------------\033[0m
At the toss, you can choose to bat or bowl first.

The rules are simple, when you are batting, you enter a number (1-6), 
and the computer randomly chooses a number. If both numbers match, 
you're out, otherwise you get your number of runs added to your score.
The same when your bowling, matching numbers gets you a wicket, otherwise 
its runs for the computer.
\033[1m-----------------------------------\033[0m
\nHave fun & Hope you enjoy!!!\n
\033[1m-----------------------------------\033[0m
''')
    intro_op = input("\nEnter to continue, 'q' to quit.")
    return None if intro_op.lower() == 'q' else ''


def ask_overs():
    effect('Enter the number of overs you want to play for (1-10)')
    
    while True:
        overs = input('>>> ')
        if overs in list2:
            overs=int(overs)
            break
        if overs=='q':
            return None
        else:
            effect('Input is not a valid integer.\nPlease Enter a valid integer between 1 & 10')
            overs = input('>>> ')
            continue
    return int(overs)

def ask_wickets():
    effect('Enter the number of wickets you want to have (1-10)')
    
    while True:
        wickets = input('>>> ')
        if wickets in list2:
            return int(wickets)
        if wickets=='q':
            return None
        else:
            effect('Input is not a valid integer.\nPlease Enter a valid integer between 1 & 10')
            wickets = input('>>> ')
            continue
    
def toss():
    coin = ['heads', 'tails']
    effect('Please enter heads [1] or tails [2] (or q to quit)')
    
    while True:
        choice = input('>>> ').strip().lower()
        if choice == 'q':
            return None
        elif choice in ['1', '2']:
            choice = int(choice) - 1
            break
        else:
            effect('Invalid input.\nPlease enter either 1 (heads) or 2 (tails), or q to quit.')
    
    toss_res = random.choice(coin)
    effect(f"The coin landed on: {toss_res}")

    if toss_res == coin[choice]:
        effect("You have won the toss!")
        return True
    else:
        effect("You have lost the toss!")
        return False

"""Play one over (standalone, user bats only). Lines 75 - 124"""
def play_over_bf(score,wickets,over_num, total_wickets):
    
    over = over_num
    balls_played = 0
    for i in range(1,7):
        effect(f"\n{score}-{total_wickets-wickets} | {over-1}.{i-1}\n")
        number = input('Enter a number (1-6)\n>>> ')
        while True:
            if number in list1:
                number = int(number)
                break
            if number == 'q':
                return score, total_wickets-wickets, True, balls_played
            else:
                effect('Input is not a valid integer.\nPlease Enter a valid integer between 1 & 6')
                number = input('>>> ')
                continue


        ai_num = random.randrange(1,7)
        effect(f'My number is {ai_num}!')
        balls_played += 1
        if number == ai_num:
            effect("Your out! Wicket for me!")
            wickets-=1
            if wickets==0:
                effect("You have been all out!")
                return score, total_wickets, True, balls_played

        else:
            effect(f"You've scored {number} runs!")
            score+=number

    return score, total_wickets-wickets, False, balls_played

def play_game_bf(over, total_wickets =10):
    total, w_lost, overnum = 0, 0, 1
    total_balls = 0
    for i in range(1, over + 1):
        total1, w_lost1, all_out, ball_played = play_over_bf(total, total_wickets-w_lost, overnum, total_wickets)
        total=total1
        w_lost=w_lost1
        overnum += 1
        total_balls += ball_played
        if all_out:
            break
    overs = total_balls // 6
    balls = total_balls % 6
    effect(f"\nYour score: {total}-{w_lost} | {overs}.{balls}")
    return total

def choose_action(toss_res):
    if toss_res:
        effect("Do you want to bat or bowl first?")
        while True:
            decision = input("Enter 'bat' or 'bowl': ").strip().lower()
            if decision in ['bat', 'bowl']:
                effect(f"You chose to {decision} first.")
                return decision
            else:
                effect("Invalid choice. Please type 'bat' or 'bowl'.")
    else:
        decision = random.choice(['bat', 'bowl'])
        effect(f"The computer chose to {decision} first.")
        return decision

def innings1():
    clear()
    overs = ask_overs()
    wickets = ask_wickets()
    score1 = play_game_bf(overs, wickets)
    return score1


    
if __name__ == "__main__":
    score = innings1()
