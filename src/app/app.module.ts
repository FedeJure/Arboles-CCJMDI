import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DetallePage } from '../pages/detalle/detalle';
import { InfoPage } from '../pages/info/info';
import { ModalDetallesPage } from '../pages/modal-detalles/modal-detalles';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicImageViewerModule } from 'ionic-img-viewer';





@NgModule({
  declarations: [
	MyApp,
    HomePage,
  DetallePage,
  InfoPage,
	ModalDetallesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
	IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  DetallePage,
  InfoPage,
	ModalDetallesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
	  BarcodeScanner ,
	  ScreenOrientation,
	  Geolocation
  ]})
export class AppModule {}
