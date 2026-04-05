# using the above learnt knowledge can i build this
# Create a Python program that simulates a simple AI agent that can learn to play tic-tac-toe.
# The program must Define the game board, Check if a player has won, Check if the game is a tie, Main game loop, Call the main game loop,       
import random

board = ["-", "-", "-",
         "-", "-", "-",
         "-", "-", "-"]


def display_board():
    print(f'{board[0]} | {board[1]} | {board[2]}')
    print(f'{board[3]} | {board[4]} | {board[5]}')
    print(f'{board[6]} | {board[7]} | {board[8]}')


display_board()


def win():
    if board[0] == board[1] == board[2] and board[0] != '-':
        print(f'{board[0]} wins !')
        return True
    elif board[3] == board[4] == board[5] and board[3] != '-':
        print(f'{board[3]} wins !')
        return True
    elif board[6] == board[7] == board[8] and board[6] != '-':
        print(f'{board[6]} wins !')
        return True
    elif board[0] == board[3] == board[6] and board[0] != '-':
        print(f'{board[0]} wins !')
        return True
    elif board[1] == board[4] == board[7] and board[1] != '-':
        print(f'{board[1]} wins !')
        return True
    elif board[2] == board[5] == board[8] and board[2] != '-':
        print(f'{board[2]} wins !')
        return True
    elif board[0] == board[4] == board[8] and board[0] != '-':
        print(f'{board[0]} wins !')
        return True
    elif board[2] == board[4] == board[6] and board[2] != '-':
        print(f'{board[2]} wins !')
        return True
    else:
        return False


def tie():
    if '-' not in board:
        print('This is a tie ')
        return True
    return False


user = 'X'
while True:
    if user == 'X':
        valid_move = True
        while valid_move:
            number = int(input('Enter a number from 1-9: '))
            index = number - 1

            if board[index] == '-':
                board[index] = user
                break
            else:
                print('Spot is occupied, Try another number ')
                continue
    else:
        user = 'O'
        valid_move = True
        while valid_move:
            com_choice = random.randint(0, 8)

            if board[com_choice] == '-':
                board[com_choice] = user
                break
            else:
                print('Spot is occupied, Try another number ')
                continue
    display_board()
    if win() == True:
        break
    elif tie() == True:
        break
    if user == 'X':
        user = 'O'
    else:
        user = 'X'
