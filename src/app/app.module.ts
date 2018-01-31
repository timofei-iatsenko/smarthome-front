import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {HomeComponent} from './home/home';
import {ZoneControlComponent} from './controls/zone-control/zone-control.component';
import {TempControlComponent} from './controls/temp-control/temp-control.component';
import {ReconnectOverlayComponent} from './controls/reconnect-overlay/reconnect-overlay.component';
import {ZoneDirective} from './directives/zone.directive';
import {SettingsPanelComponent} from './settings/settings-panel/settings-panel.component';
import {StatusAreaComponent} from './controls/status-area/status-area.component';

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

    ZoneDirective,
    ZoneControlComponent,
    TempControlComponent,
    SettingsPanelComponent,
    StatusAreaComponent,
    ReconnectOverlayComponent,

    COMMON_DIRECTIVES
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
})
export class AppModule {}
