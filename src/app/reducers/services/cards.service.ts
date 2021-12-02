import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { ICard, IGameState } from '../../models/game.models'
import { getComputerScore, getHumanScore } from '../game.reducers';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  cards: ICard[] = [];

  constructor(private store: Store<IGameState>) {
    this.cards = this.shuffle(this.allCards);
  }

  getDeck(): Observable<ICard[]> {
    return of(this.cards);
  }
  humanScore$ = this.store.select(getHumanScore);
  computerScore$ = this.store.select(getComputerScore);

  shuffle(array: ICard[]) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return (array);
  }

  allCards: ICard[] = [
    { id: 0, value: 1, fileName: 'CLUB-1.svg' },
    { id: 1, value: 2, fileName: 'CLUB-2.svg' },
    { id: 2, value: 3, fileName: 'CLUB-3.svg' },
    { id: 3, value: 4, fileName: 'CLUB-4.svg' },
    { id: 4, value: 5, fileName: 'CLUB-5.svg' },
    { id: 5, value: 6, fileName: 'CLUB-6.svg' },
    { id: 6, value: 7, fileName: 'CLUB-7.svg' },
    { id: 7, value: 8, fileName: 'CLUB-8.svg' },
    { id: 8, value: 9, fileName: 'CLUB-9.svg' },
    { id: 9, value: 10, fileName: 'CLUB-10.svg' },
    { id: 10, value: 11, fileName: 'CLUB-11-JACK.svg' },
    { id: 11, value: 12, fileName: 'CLUB-12-QUEEN.svg' },
    { id: 12, value: 13, fileName: 'CLUB-13-KING.svg' },
    { id: 13, value: 1, fileName: 'DIAMOND-1.svg' },
    { id: 14, value: 2, fileName: 'DIAMOND-2.svg' },
    { id: 15, value: 3, fileName: 'DIAMOND-3.svg' },
    { id: 16, value: 4, fileName: 'DIAMOND-4.svg' },
    { id: 17, value: 5, fileName: 'DIAMOND-5.svg' },
    { id: 18, value: 6, fileName: 'DIAMOND-6.svg' },
    { id: 19, value: 7, fileName: 'DIAMOND-7.svg' },
    { id: 20, value: 8, fileName: 'DIAMOND-8.svg' },
    { id: 21, value: 9, fileName: 'DIAMOND-9.svg' },
    { id: 22, value: 10, fileName: 'DIAMOND-10.svg' },
    { id: 23, value: 11, fileName: 'DIAMOND-11-JACK.svg' },
    { id: 24, value: 12, fileName: 'DIAMOND-12-QUEEN.svg' },
    { id: 25, value: 13, fileName: 'DIAMOND-13-KING.svg' },
    { id: 26, value: 1, fileName: 'HEART-1.svg' },
    { id: 27, value: 2, fileName: 'HEART-2.svg' },
    { id: 28, value: 3, fileName: 'HEART-3.svg' },
    { id: 29, value: 4, fileName: 'HEART-4.svg' },
    { id: 30, value: 5, fileName: 'HEART-5.svg' },
    { id: 31, value: 6, fileName: 'HEART-6.svg' },
    { id: 32, value: 7, fileName: 'HEART-7.svg' },
    { id: 33, value: 8, fileName: 'HEART-8.svg' },
    { id: 34, value: 9, fileName: 'HEART-9.svg' },
    { id: 35, value: 10, fileName: 'HEART-10.svg' },
    { id: 36, value: 11, fileName: 'HEART-11-JACK.svg' },
    { id: 37, value: 12, fileName: 'HEART-12-QUEEN.svg' },
    { id: 38, value: 13, fileName: 'HEART-13-KING.svg' },
    { id: 39, value: 1, fileName: 'SPADE-1.svg' },
    { id: 40, value: 2, fileName: 'SPADE-2.svg' },
    { id: 41, value: 3, fileName: 'SPADE-3.svg' },
    { id: 42, value: 4, fileName: 'SPADE-4.svg' },
    { id: 43, value: 5, fileName: 'SPADE-5.svg' },
    { id: 44, value: 6, fileName: 'SPADE-6.svg' },
    { id: 45, value: 7, fileName: 'SPADE-7.svg' },
    { id: 46, value: 8, fileName: 'SPADE-8.svg' },
    { id: 47, value: 9, fileName: 'SPADE-9.svg' },
    { id: 48, value: 10, fileName: 'SPADE-10.svg' },
    { id: 49, value: 11, fileName: 'SPADE-11-JACK.svg' },
    { id: 50, value: 12, fileName: 'SPADE-12-QUEEN.svg' },
    { id: 51, value: 13, fileName: 'SPADE-13-KING.svg' }
  ]
}



