import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IGameState } from 'src/app/models/game.models';
import { getComputerScore, getHumanScore, getIsComputerPass, getIsHumanPass, getWinner } from '../game.reducers';
import * as gameActions from '../game.actions';

@Injectable({
  providedIn: 'root'
})
export class GameEngineService {
  humanScore$: Observable<number>;
  computerScore$: Observable<number>;
  computerScoreSubscriprion: Subscription;
  humanScoreSubscriprion: Subscription;
  humanScore: number = 0;
  computerScore: number = 0;
  humanScoreSubscription: Subscription;
  isComputerPass$: Observable<boolean>;
  isHumanPass$: Observable<boolean>;
  isComputerPassSubscription: Subscription;
  isComputerPass: boolean = false;
  isHumanPassSubscription: Subscription;
  isHumanPass: boolean = false;
  haveWinner$: Observable<string>;
  isHaveWinnerSubscription: Subscription;
  winner: string = '';

  ngOnDestroy(): void {
    this.humanScoreSubscription.unsubscribe();
    this.computerScoreSubscriprion.unsubscribe();
  }

  constructor(private store: Store<IGameState>) {
    debugger
    this.humanScore$ = this.store.select(getHumanScore);
    this.computerScore$ = this.store.select(getComputerScore);
    this.isComputerPass$ = this.store.select(getIsComputerPass);
    this.isHumanPass$ = this.store.select(getIsHumanPass);
    this.haveWinner$ = this.store.select(getWinner);

    this.humanScoreSubscription = this.humanScore$.subscribe(hs => {
      this.humanScore = hs;
      debugger;
      if (hs > 21)
        this.store.dispatch(gameActions.haveWinner({ winner: 'computer' }));
    });

    this.computerScoreSubscriprion = this.computerScore$.subscribe(cs => {
      this.computerScore = cs;
      if (cs > 21)
        this.store.dispatch(gameActions.haveWinner({ winner: 'human' }));
    });

    this.isComputerPassSubscription = this.isComputerPass$.subscribe(isComputerPass => {
      this.isComputerPass = isComputerPass;
    });

    this.isHumanPassSubscription = this.isHumanPass$.subscribe(isHumanPass => {
      this.isHumanPass = isHumanPass;
    });

    this.isHaveWinnerSubscription = this.haveWinner$.subscribe(winner => {
      this.winner = winner;
    });
  }

  checkWinner() {

    let winner: string = '';
    if (this.winner == '') {
      if (
        (//this.humanScore == 21 ||
          this.computerScore > 21) ||
        (this.isComputerPass && this.humanScore > this.computerScore))
        winner = 'human';

      else if (
        (//this.computerScore == 21 ||
          this.humanScore > 21) ||
        (this.isHumanPass && this.humanScore < this.computerScore))
        winner = 'computer';
    }
    debugger
    return of(winner);
  }

}


