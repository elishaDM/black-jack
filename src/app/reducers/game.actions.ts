import { Action, createAction, props} from '@ngrx/store'
import { ICard } from '../models/game.models';

export const startGame = createAction(
    '[Game] Start'
);

export const deckLoad = createAction(
    '[Game] Deck load'
)

export const deckLoadSuccess = createAction(
    '[Game] Deck load success',
    props<{deck: ICard[]}>()
)

export const deckLoadFail = createAction(
    '[Game] Deck load fail',
    props<{error: string}>()
)

export const addCardToComputer = createAction(
    '[Game] Add card to Computer'
)

export const addCardToPlayer = createAction(
    '[Game] Add card to Player'
)

export const setComputerPass = createAction(
    '[Game] Computer Pass'
);

export const setHumanPass = createAction(
    '[Game] Human Pass'
);

export const setHumanMoved = createAction(
    '[Game] Human Moved'
);
export const setComputerMoved = createAction(
    '[Game] Computer Moved'
);

export const resetGame = createAction(
    '[Game] Reset'
)

export const haveWinner = createAction(
    '[Game] Player WIN',
    props<{winner: string}>()
)
