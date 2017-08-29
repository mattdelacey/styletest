import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Kinvey } from 'kinvey-angular2-sdk';
import { AppModule } from './app.module';

Kinvey.initialize({
  appKey: 'kid_ZJk02vOUFg',
  appSecret: 'c1a32d5b3c474d0fa20a6f33fef396d5'
})
  .then((activeUser?: Kinvey.User) => {
		platformBrowserDynamic().bootstrapModule(AppModule);
  });
