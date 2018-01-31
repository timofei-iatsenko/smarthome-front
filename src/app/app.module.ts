import { HttpClientModule } from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FloorPlanComponent } from './components/floor-plan/floor-plan.component';
import { ButtonComponent } from './components/icon-button/icon-button.component';

import {HomeComponent} from './home/home.component';
import {ZoneControlComponent} from './controls/zone-control/zone-control.component';
import {TempControlComponent} from './controls/temp-control/temp-control.component';
import {ReconnectOverlayComponent} from './controls/reconnect-overlay/reconnect-overlay.component';
import {ZoneDirective} from './directives/zone.directive';
import {SettingsPanelComponent} from './settings/settings-panel/settings-panel.component';
import {StatusAreaComponent} from './controls/status-area/status-area.component';
import { InlineSVGModule } from 'ng-inline-svg';

// App is our top level component
import {AppComponent} from './app.component';

import '../styles.scss';
import {COMMON_DIRECTIVES} from './common/directives';


/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    HomeComponent,

    FloorPlanComponent,
    ZoneDirective,
    ZoneControlComponent,
    TempControlComponent,
    SettingsPanelComponent,
    StatusAreaComponent,
    ReconnectOverlayComponent,
    ButtonComponent,
    COMMON_DIRECTIVES
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    HttpClientModule,
    InlineSVGModule,
  ],
})
export class AppModule {}
