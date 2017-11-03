import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
/*import { ProductPage } from '../pages/product/product';*/
import { SearchPage } from '../pages/search/search';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { RefPage } from '../pages/ref/ref';
import { AccountsPage } from '../pages/accounts/accounts';
/*import { RefDetailPage } from '../pages/refdetail/refdetail';

import { OfflinePage } from '../pages/offline/offline';
import { AccountDetailPage } from '../pages/accountdetail/accountdetail';
import { LoginPage } from '../pages/login/login';
import { TasksPage } from '../pages/tasks/tasks';
import { MapPage } from '../pages/map/map';
import { AllTasksPage } from '../pages/alltasks/alltasks';
import { ChatPage } from '../pages/chat/chat';
import { BrandData } from '../providers/brand-data';*/

import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    MyApp,
    
    
    HomePage,
    TabsPage,
    RefPage,
    AccountsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    AccountsPage,
    RefPage
  ],
  providers: [ {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
