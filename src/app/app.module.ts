import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './reducers';
import { gameReducer } from './reducers/game.reducers';
import { EffectsModule } from '@ngrx/effects';
import { CardsEffects } from './reducers/game.effects';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}, { }),
    StoreModule.forFeature('game', gameReducer),
    StoreDevtoolsModule.instrument({
      name: 'blackJack dev tools',
      maxAge: 25
    }),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([CardsEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
