import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ModalController } from 'ionic-angular';
import {HomePage} from '../../pages/home/home';
import {ModalDetallesPage} from '../../pages/modal-detalles/modal-detalles';

import { HTTP } from '@ionic-native/http';


/**
 * Generated class for the DetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html',
})
export class DetallePage {
	navParam :NavParams;
	nombreEspecie:string= 'nombre especie del arbol';
	detalleArbol:string = "detalle del arbol";
	homePage: HomePage;
	nombre: string = 'nombre del arbol';
	http:HTTP;
	fechaPlantacion:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alert:AlertController, private modal : ModalController, private Http:HTTP) {
	this.navParam = navParams;
	this.http = this.Http;
	
	this.nombreEspecie = this.navParam.get('especie');
	  this.detalleArbol = this.navParam.get('detalle');
	  this.homePage = this.navParam.get('homePage');
	  this.nombre = this.navParam.get('nombre');
	  this.fechaPlantacion = HomePage.infoArboles[this.nombre].split('_',3)[1];
	
  }


  ionViewDidLoad() {
	 
	  this.nombreEspecie = this.navParam.get('especie');
	  this.detalleArbol = this.navParam.get('detalle');
	  this.homePage = this.navParam.get('homePage');
	  this.nombre = this.navParam.get('nombre');
	  
	  
	
  }
  scanCode(){
	  this.navCtrl.pop();
	this.homePage.scanCode();


  }
  mostrarInformacion(){
	  /*let popup =this.alert.create({
		  title: "Información extra",
		  message:HomePage.textosArboles['Roble'],
		  buttons: ['Ok']
	  });
	  popup.present();*/
	  let info:string = HomePage.infoArboles[this.nombre].split('_',3)[2];

	  const modal = this.modal.create(ModalDetallesPage,{
		  nombre: this.nombre,
		  informacion:  info
	  });
	  modal.present();
  }
  
  tieneCantidadDeImagenes(numero:string){
	  let cantidad:string = HomePage.textosArboles[this.nombreEspecie].split('_',2)[0];
	  if (numero <= cantidad){
		  return true;
	  }
	  return false;
  }
  
  
  

}
