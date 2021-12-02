import { Component, Input, OnInit } from '@angular/core';
import { ICard } from 'src/app/models/game.models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {
  @Input() card: ICard;
  @Input() i: any = null;
  constructor() { }

  ngOnInit(): void {
  }

}
