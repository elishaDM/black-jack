import { on, createReducer, createFeatureSelector, createSelector } from '@ngrx/store'
import * as gameActions from './game.actions';
import { IGameState } from '../models/game.models';
import { state } from '@angular/animations';

const initialState: IGameState = {
    gameStarted: false,
    deck: [],
    computerCards: [],
    humanCards: [],
    computerScore: 0,
    humanScore: 0,
    isHumanMoved: false,
    isComputerMoved: false,
    winner: '',
    isComputerPass: false,
    isHumanPass: false,
    error: ''
}

const getGameFeatureState = createFeatureSelector<IGameState>('game');

export const getIsGameStarted = createSelector(
    getGameFeatureState,
    game => game.gameStarted
)

const getDeckFeatureState = createFeatureSelector<IGameState>('game');

export const getDeck = createSelector(
    getGameFeatureState,
    game => game.deck
)

export const getComputerHand = createSelector(
    getGameFeatureState,
    game => game.computerCards
)

export const getHumanHand = createSelector(
    getGameFeatureState,
    game => game.humanCards
)

export const getComputerScore = createSelector(
    getGameFeatureState,
    game => game.computerScore
)

export const getHumanScore = createSelector(
    getGameFeatureState,
    game => game.humanScore
)

export const getIsHumanMoved = createSelector(
    getGameFeatureState,
    game => game.isHumanMoved
)

export const getIsComputerMoved = createSelector(
    getGameFeatureState,
    game => game.isComputerMoved
)
export const getIsComputerPass = createSelector(
    getGameFeatureState,
    game => game.isComputerPass
)
export const getIsHumanPass = createSelector(
    getGameFeatureState,
    game => game.isHumanPass
)
export const getWinner = createSelector(
    getGameFeatureState,
    game => game.winner
)

export const getError = createSelector(
    getGameFeatureState,
    state => state.error
);

export const gameReducer = createReducer<IGameState>(
    initialState,
    on(gameActions.startGame, (state): IGameState => {
        return {
            ...state,
            gameStarted: true
        };

    }),
    on(gameActions.resetGame, (state): IGameState => {
        return {
            gameStarted: false,
            deck: [],
            computerCards: [],
            humanCards: [],
            computerScore: 0,
            humanScore: 0,
            isHumanMoved: false,
            isComputerMoved: false,
            winner: '',
            isComputerPass: false,
            isHumanPass: false,
            error: ''
        };
    }),
    on(gameActions.deckLoadSuccess, (state, action): IGameState => {
        return {
            ...state,
            deck: action.deck,
            error: ''
        };
    }),
    on(gameActions.deckLoadFail, (state, action): IGameState => {
        return {
            ...state,
            error: action.error
        };
    }),
    on(gameActions.addCardToComputer, (state): IGameState => {
        return {
            ...state,
            computerCards: [...state.computerCards, state.deck[state.deck.length - 1]],
            computerScore: state.computerScore + state.deck[state.deck.length - 1].value,
            deck: state.deck.filter(c => c.id != state.deck[state.deck.length - 1].id)
        }
    }),
    on(gameActions.addCardToPlayer, (state): IGameState => {
        return {
            ...state,
            humanCards: [...state.humanCards, state.deck[state.deck.length - 1]],
            humanScore: state.humanScore + state.deck[state.deck.length - 1].value,
            deck: state.deck.filter(c => c.id != state.deck[state.deck.length - 1].id)
        }
    }),
    on(gameActions.haveWinner, (state, action): IGameState => {
        return {
            ...state,
            winner: action.winner
        }
    }),
    on(gameActions.setHumanMoved, (state): IGameState => {
        return {
            ...state,
            isHumanMoved: true,
            isComputerMoved: false
        }
    }),
    on(gameActions.setComputerMoved, (state): IGameState => {
        return {
            ...state,
            isHumanMoved: false,
            isComputerMoved: true
        }
    }),
    on(gameActions.setComputerPass, (state): IGameState => {
        return {
            ...state,
            isComputerPass: true
        }
    }),
    on(gameActions.setHumanPass, (state): IGameState => {
        return {
            ...state,
            isHumanPass: true
        }
    })
);