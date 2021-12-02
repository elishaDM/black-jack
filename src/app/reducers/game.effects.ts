import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import * as GameActions from './game.actions';
import { CardsService } from "./services/cards.service";
import { catchError, concatMap, map, mapTo, mergeMap, switchMap, tap } from 'rxjs/operators';
import { combineLatest, of } from "rxjs";
import { GameEngineService } from "./services/game.engine.service";

@Injectable()
export class CardsEffects {
    constructor(private actions$: Actions, private cardService: CardsService, private gameEngineService: GameEngineService) { }

    loadDeck$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(GameActions.startGame),
            concatMap(() => this.cardService.getDeck().pipe(
                map(deck => GameActions.deckLoadSuccess({ deck })),
                catchError(error => of(GameActions.deckLoadFail({ error })))
            ))
        )
    });

    
    humanMove$ = createEffect(() =>{
        return this.actions$.pipe(
            ofType(GameActions.addCardToPlayer, GameActions.setHumanPass),
            mergeMap(() => this.gameEngineService.checkWinner().pipe(
                tap(winner => console.log('HumanMove Effect')),
                map(winner => GameActions.haveWinner({ winner : winner})),
                map(winner => GameActions.setHumanMoved())
            ))
        )
    });

    computerMove$ = createEffect(() =>{
        return this.actions$.pipe(
            ofType(GameActions.addCardToComputer, GameActions.setComputerPass),
            mergeMap(() => this.gameEngineService.checkWinner().pipe(
            tap(winner => console.log('computerMove Effect')),
                map(winner => GameActions.haveWinner({ winner : winner})),
                map(winner => GameActions.setComputerMoved())
            ))
        )
    });

}