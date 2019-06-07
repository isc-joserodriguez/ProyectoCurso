import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BattleRoutingModule } from './battle-routing.module';
import { BattleComponent } from './battle.component';

@NgModule({
  declarations: [BattleComponent],
  imports: [
    CommonModule,
    BattleRoutingModule
  ]
})
export class BattleModule { }
