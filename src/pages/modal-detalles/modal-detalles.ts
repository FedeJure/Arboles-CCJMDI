import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';

/**
 * Generated class for the ModalDetallesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-detalles',
  templateUrl: 'modal-detalles.html',
})
export class ModalDetallesPage {
  
  nombre: any;
  informacion: any;
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public view:ViewController) {
	
  
  }

  ionViewDidLoad() {
    this.nombre = this.navParams.get('nombre');
	this.informacion = this.navParams.get('informacion');
  }
  
  close(){
	  this.view.dismiss();
  }

}
