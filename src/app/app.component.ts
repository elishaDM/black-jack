import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICard, IGameState } from './models/game.models';
import { getComputerHand, getComputerScore, getDeck, getError, getHumanHand, getHumanScore, getIsComputerMoved, getIsComputerPass, getWinner, getIsGameStarted, getIsHumanMoved, getIsHumanPass } from './reducers/game.reducers';
import * as gameActions from './reducers/game.actions';
import { Observable, Subscription } from 'rxjs';
import { first, take, tap } from 'rxjs/operators';
import { CardsService } from './reducers/services/cards.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isGameStarted: boolean = false;
  deck$: Observable<ICard[]>;
  errorMessage$: Observable<string>;
  deckSubscription: Subscription;
  computerHand$: Observable<ICard[]>;
  humanHand$: Observable<ICard[]>;
  humanScore$: Observable<number>;
  computerScore$: Observable<number>;
  computerScoreSubscriprion: Subscription;
  humanScoreSubscriprion: Subscription;
  computerScore: number;
  humanScore: number;
  isComputerPass$: Observable<boolean>;
  isHumanPass$: Observable<boolean>;
  isComputerPassSubscription: Subscription;
  isComputerPass: boolean;
  isHumanPassSubscription: Subscription;
  isHumanPass: boolean;
  isHumanMoved$: Observable<boolean>;
  isComputerMoved$: Observable<boolean>;
  isHumanMovedSubscription: Subscription;
  isHumanMoved: boolean;
  winner: string = '';
  isHumanWin: boolean;
  isComputerMovedSubscription: Subscription;
  isComputerMoved: boolean;
  isGameStartedSubscription: Subscription;
  deckSize: number = 0;
  winner$: Observable<string>;
  winnerSubscription: Subscription;
  winString: string;

  constructor(private store: Store<IGameState>, private cardService: CardsService) { }
  ngOnDestroy(): void {
    this.deckSubscription.unsubscribe();
    this.isComputerPassSubscription.unsubscribe();
    this.isHumanPassSubscription.unsubscribe();
    this.winnerSubscription.unsubscribe();

    this.isHumanMovedSubscription.unsubscribe();
    this.isComputerMovedSubscription.unsubscribe();

  }
  ngOnInit() {
    this.errorMessage$ = this.store.select(getError);
    debugger

    this.isGameStartedSubscription = this.store.select(getIsGameStarted).subscribe(
      isGameStarted => {
        this.isGameStarted = isGameStarted;
      }
    );

    this.deck$ = this.store.select(getDeck);
    this.humanScore$ = this.store.select(getHumanScore);
    this.computerScore$ = this.store.select(getComputerScore);
    this.computerHand$ = this.store.select(getComputerHand);
    this.humanHand$ = this.store.select(getHumanHand);
    this.isComputerPass$ = this.store.select(getIsComputerPass);
    this.isHumanPass$ = this.store.select(getIsHumanPass);
    this.isHumanMoved$ = this.store.select(getIsHumanMoved);
    this.isComputerMoved$ = this.store.select(getIsComputerMoved);
    this.winner$ = this.store.select(getWinner);

    //this.store.dispatch(gameActions.deckLoad());


    this.deckSubscription = this.deck$.subscribe(deck => {
      if (deck.length == 52) {
        this.deckSize = deck.length;
        debugger
        this.stratCards();
      }
    });

    this.isComputerPassSubscription = this.isComputerPass$.subscribe(isComputerPass => {
      this.isComputerPass = isComputerPass;
    });

    this.isHumanPassSubscription = this.isHumanPass$.subscribe(isHumanPass => {
      this.isHumanPass = isHumanPass;
    });

    this.winnerSubscription = this.winner$.subscribe(winner => {
      this.winner = winner;
      if (this.winner.length > 0) this.winAlert();
    });

    this.computerScoreSubscriprion = this.computerScore$.subscribe(compScore => {
      this.computerScore = compScore;
    });

    this.isHumanMovedSubscription = this.isHumanMoved$.subscribe(isHumanMoved => {
      this.isHumanMoved = isHumanMoved;

      if (this.deckSize > 0 && isHumanMoved) {
        if (this.winner.length == 0) {
          if (this.computerScore < 16) {
            this.store.dispatch(gameActions.addCardToComputer());
          }
          else {
            //debugger;
            this.store.dispatch(gameActions.setComputerPass());
          }
        }
      }
    });

    this.isComputerMovedSubscription = this.isComputerMoved$.subscribe(isComputerMoved => {
      this.isComputerMoved = isComputerMoved;
    });
   
  }

  title = 'black-jack';

  humanPass() {
    this.store.dispatch(gameActions.setHumanPass());
    //this.store.dispatch(
    //  gameActions.setHumanMoved());
    /* if (this.computerScore < 16 && !this.isComputerWin && !this.isHumanWin)
      this.store.dispatch(gameActions.addCardToComputer());
    else
       this.store.dispatch(gameActions.setComputerPass());*/
  }

  startGame() {
    //this.store.dispatch(gameActions.deckLoad());
    this.store.dispatch(gameActions.startGame());
  }

  stratCards() {
    this.store.dispatch(gameActions.addCardToPlayer());
    //this.store.dispatch(gameActions.addCardToComputer());
    this.store.dispatch(gameActions.addCardToPlayer());
    this.store.dispatch(gameActions.addCardToComputer());
  }

  winAlert() {
    if (this.winner.length > 0) {
      debugger;
      const winner = this.isHumanWin ? 'You' : 'Computer';
      this.winString = winner + " won. Click here to start a new game";
    }
  }

  resetGame() {
    this.cardService.getDeck();
    this.store.dispatch(gameActions.resetGame());
    this.store.dispatch(gameActions.startGame());
  }

  getCard() {
    if (this.winner.length == 0)
      this.store.dispatch(
        gameActions.addCardToPlayer());
  }

  checkWin() {

  }
}
