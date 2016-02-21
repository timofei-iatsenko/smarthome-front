/*
 * Providers provided by Angular
 */
import {provide} from 'angular2/core';
import {bootstrap, ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {MDirective, XLinkDirective, WavesDirective } from './app/common/directives';

/*
 * App Component
 * our top level component that holds all of our components
 */
import {App} from './app/app';
import {PLATFORM_DIRECTIVES} from 'angular2/core';
/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
document.addEventListener('DOMContentLoaded', function main() {
  bootstrap(App, [
    ...('production' === process.env.ENV ? [] : ELEMENT_PROBE_PROVIDERS),
    ...HTTP_PROVIDERS,
    ...ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    provide(PLATFORM_DIRECTIVES, {useValue: MDirective, multi: true}),
    provide(PLATFORM_DIRECTIVES, {useValue: XLinkDirective, multi: true}),
    provide(PLATFORM_DIRECTIVES, {useValue: WavesDirective, multi: true}),
  ])
  .catch(err => console.error(err));
});
