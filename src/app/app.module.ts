import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';


import { IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { DetallePage } from '../pages/detalle/detalle';
import {ModalDetallesPage} from '../pages/modal-detalles/modal-detalles';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Geolocation } from '@ionic-native/geolocation';

import { HTTP } from '@ionic-native/http';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
	DetallePage,
	ModalDetallesPage,

	
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
	


  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
	DetallePage,
	ModalDetallesPage,

	
	
	
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
	BarcodeScanner ,
	ScreenOrientation,
	Geolocation,
	HTTP
  ]
})
export class AppModule {}
