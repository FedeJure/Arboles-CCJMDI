import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {  DetallePage } from '../../pages/detalle/detalle';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  
})

export class HomePage {
  //nombresArboles :string[]=['Roble','Magnolia','Aromo','Falso Alcanforero','Braquiquito','Grevillea','Ligustro','Aguaribay','Fresno','Ginkgo Biloba','Olivo','Alamo','Cerezo','Liquidambar','Aromo Frances','Jacaranda'];
  nombresArboles :string[]=['Daisaku Ikeda','Kaneko Ikeda','Maestro Josei Toda','Soka Gakkai','División Futuro','División de Jóvenes','Maestro Tsunesaburo Makiguchi','División Juvenil Masculina','Soka Gakkai de la Argentina','División Juvenil Femenina','Centro Internacional Daisaku Ikeda de Estudio para la Paz CIDIEP','CIDIEP','Dr. Francisco Delich','Dr. Roberto Agarie','Región Oeste','Familia Braun Billinghurst','Sr. Juan Luis Linares','Familia Tawara','Región 3','División de Estudiantes Secundarios','Grupo 70° Aniversario','Provincia de San Juan','Ciudad de Rosario','Provincia de Neuquén','Provincia de Córdoba','Provincia de Tucumán','Divisón Femenina','Familia Num','70° Aniversario del ingreso de Ikeda Sensei a la Soka Gakkai','Grupo País del Plata','Familia Montoneri - Pate','Grupo Dulce Melodía Kotekitai','Grupo Cosmopolita Ongakutai','Coordinadora Gran Argentina','Coordinadora Gran Argentina','Flia. James Frenkel','Hiromasa Ikeda'];
  
  //decrece para la izquierda y para arriva
  rangoGPS = {'longitudDerecha': -34.923840  ,'longitudIzquierda':-34.923809, 'latitudArriva':  -58.668049 , 'latitudAbajo':-58.668033};
  qrData = null;
  createdCode = null;
  scannedCode = null;
  detalleArbol: string = null;
  
  botonActivado = false;
  alert:AlertController;


  
  constructor(private barcodeScanner: BarcodeScanner, public navCtrl: NavController, public orientation:ScreenOrientation, private geolocation: Geolocation, private alertController:AlertController) {
		this.alert = alertController;
		this.orientation.lock(this.orientation.ORIENTATIONS.PORTRAIT).catch((error) =>{
		});
		
		//this.chequiarGPS();
	    this.botonActivado = true;
		/*
		const text = (<any>data).nombre_arbol;
		console.log(text);
		*/
		  

  }
 
 
  chequiarGPS(){
	  		this.geolocation.getCurrentPosition({
				timeout:2000,
				enableHighAccuracy: true
			}
			).then((resp) => {
			
			if (resp.coords.latitude <this.rangoGPS['latitudIzquierda'] || resp.coords.latitude > this.rangoGPS['latitudDerecha'] || resp.coords.longitude < this.rangoGPS['longitudArriva'] || resp.coords.longitude>this.rangoGPS['longitudAbajo']){
				this.noEstaEnZona();
				
			}
			else if (!resp.coords.latitude || !resp.coords.longitude){
				this.noGPSActivo()
			}
			else{
				this.botonActivado  = true;
				return;
			}

		}).catch((error) => {
			this.noGPSActivo()
			
		});
		
  }
 
  scanCode() {


		/*

		this.scannedCode = "http://www.sgiar.org.ar/ccjmdi/arboles/arbol.php?id_arbol=37&token=12dfef".split('=',2)[1].split('&',2)[0];
		this.scannedCode --;	
		let nombreArbol:string = this.nombresArboles[this.scannedCode];		
		let especieArbol:string = HomePage.infoArboles[nombreArbol].split('_',3)[0];
		let detalleEspecie:string = HomePage.textosArboles[especieArbol].split('_',2)[1];
		
		this.navCtrl.push(DetallePage, {
				especie : especieArbol,
				detalle: detalleEspecie,
				homePage:this,
				nombre: nombreArbol});

			*/


    
		
	
			
		this.barcodeScanner.scan().then(barcodeData => {
			this.scannedCode = barcodeData.text.split('=',2)[1].split('&',2)[0];
			this.scannedCode --;	
			let nombreArbol:string = this.nombresArboles[this.scannedCode];		
			let especieArbol:string = HomePage.infoArboles[nombreArbol].split('_',3)[0];
			let detalleEspecie:string = HomePage.textosArboles[especieArbol].split('_',2)[1];
		
			this.navCtrl.push(DetallePage, {
				especie : especieArbol,
				detalle: detalleEspecie,
				homePage:this,
				nombre: nombreArbol});
				
	
			}, (err) => {
			});
	
	
	
	

  }
	noEstaEnZona(){
	let alert = this.alert.create({
		title: 'Ups!',
		subTitle: 'Esta aplicacion solo puede ser utilizada dentro del Centro Cultural de los Jovenes Maestro Daisaku Ikeda!',
		enableBackdropDismiss :false,
		buttons: [{
          text: 'Ok',
          handler: () => {
   
			this.chequiarGPS();
          }
        }]
    });
	
    alert.present();
  }
  
  noGPSActivo(){
	  let alert = this.alert.create({
		title: 'Ups!',
		subTitle: 'Activa la ubicacion en tu dispositivo antes de continuar!',
		enableBackdropDismiss :false,
		buttons: [{
          text: 'Ok',
          handler: () => {
            
			this.chequiarGPS();
          }
        }]
    });
	
    alert.present();
  }
  

  

  // nombre especia :  cantidad de fotos; detalle especie
  static textosArboles = {
	'Aromo': '3_Aromo es un árbol proveniente de Australia y Tansania. Crece hasta los 10 a 12 metros de altura. Se caracterizan por tener flores de color amarillo intenso muy perfumadas. Por tal motivo de sus flores se extrae esencia para perfumería. Son de las primeras especies en florecer al inicio de la primavera. Es una especie muy adaptada a condiciones de aridez.',
	'Roble': '2_El Roble es un árbol de lento y constante crecimiento que puede alcanzar los 25 metros de altura. Su madera, de tipo dura, es una de las más apreciadas. Para todos los pueblos que han conocido al roble, este árbol es sinónimo de fuerza.',
	'Magnolia': '3_La Magnolia es un árbol que conserva su follaje todo el año, puede llegar a más de 35 m de altura, ramificado desde la extrema base. Sus grandes hojas color verde intenso brillante forman una espesa frondosidad sobre la que destacan sus flores blanco marfil.',
	'Falso Alcanforero': '2_El falso Alcanfor o Alcanforero es una árbol de gran porte originario de los Himalayas. Sus hojas persistentes, de color verde brillante, se tornan rojizas en el momento de recambio parcial. Sus hojas tienen un moderado olor alcanforado. Su crecimiento es medianamente rápido; con los años, se transforma en un árbol de gran tamaño.',
	'Braquiquito':'3_Es un árbol de talla pequeña o mediana que se distribuye de forma natural en Australia en zonas costeras húmedas. Es un árbol que tiene múltiples usos. Las semillas se pueden comer después de tostarlas.​ La madera es suave y esponjosa y ha sido usada para hacer escudos, y la corteza para fibra. Las hojas son usadas como forraje de emergencia para el ganado en los periodos de sequía.',
	'Gravillea':'2_Grevillea es un árbol que conserva su follaje durante todo el año, de rápido crecimiento, de 18 a 35 metros de altura con hojas verde oscuras delicadamente dentadas y compuestas de fronda de helecho. Sus flores son doradas naranjas en primavera, de ahí que se lo conoce también como Pno de Oro. La Grevillea robusta es usada en la elaboración de instrumentos musicales incluyendo guitarras.',
	'Ligustro':'2_El Ligustro es un árbol mediano, de 6 a 9 metros de altura. De porte erguido, follaje denso y compacto, a veces ramificado desde la base. Tronco erecto, corteza lisa castaño grisácea. Hojas perdurables, grandes de color verde brillante en la parte superior y claro en la inferior. Flores blancas y perfumadas. Florese a fines de primavera.',
	'Aguaribay':'3_Es un arból nativo de Argentina  de porte mediano o grande, alcanzando los 10 a 15 m de altura; el fuste es grueso. Es una especie tolerante a la sequía. Se trata de una planta ampliamente utilizada por la medicina tradicional. ',
	'Fresno':'2_El Fresno tiene un tamaño mediano ya que alcanza una altura de entre 8 a 12 metros. El tronco es recto y duro con forma cilíndrica, es muy usado como árbol urbano ya que da mucha sombra y se adapta bien a las ciudades; es bastante resistente al frio y al viento, pero no tolera el calor intenso y los climas muy secos. Las hojas son en forma de lanza de color verde oscuro.',
	'Fresno1':'2_Conocido también como fresno blanco americano, es un árbol que puede alcanzar hasta 35 m de altura. Es nativo del este de Norteamérica.  Se atribuye ciertas propiedades medicinales. Por ejemplo, las raíces son utilizadas como astringentes y las semillas se han usado para la obesidad.',
	'Ginkgo biloba':'2_El Ginkgo es de porte mediano, puede alcanzar 35 metros de altura. Es un árbol único en el mundo, sin parientes vivos. La especie Ginkgo biloba constituye uno de los mejores ejemplos de relicto o fósil viviente conocidos. Por eso se lo conoce también como Árbol de la Vida, además de sus propiedades medicinales.',
	'Olivo':'1_El olivo es un árbol pequeño que conserva su follaje todo el año,longevo, que puede alcanzar hasta 15 m de altura, con copa ancha y tronco grueso, de aspecto retorcido. Su corteza es de color gris o plateado. Tiene las hojas opuestas, de 2 a 8 cm de largo, ligeramente puntiagudas, enteras y verdes grises oscuras. Las flores son hermafroditas y su fruto es la aceituna.',
	'Alamo':'Árbol caducifolio corpulento de forma redondeada y rápido crecimiento, de hasta 30 m de altura y 1 m de diámetro, de forma ancha y columnar, de grueso tronco y sistema radical fuerte, con numerosas raíces secundarias largas que emiten multitud de renuevos. Corteza lisa, blanquecina, gris, fisurada, más oscura en la base, con las cicatrices negruzcas de antiguas ramas.',
	'Cerezo':'2_El Cerezo es conocido como Sakura de flor japonés, es una especie nativa del Japón, Corea y China. Se cultiva ampliamente como árbol ornamental por su bella floración, en países de todo el mundo. Las flores surgen en primavera, formando grupos racimosos de 2 a 5, al mismo tiempo que aparecen las nuevas hojas. Varían en color desde blanco a rosado.',
	'Liquidambar':'El liquidámbar es uno de los árboles más bonitos y representativos del otoño en los países donde se dan las cuatro estaciones Los llamativos colores que brinda, convierten al liquidámbar en un árbol muy buscado para decorar plazas y jardines.  Tiene una altura promedio  de 10 a 40 metros y una anchura de unos 10 metros. Al principio, el liquidámbar tarda bastante en desarrollarse, pero luego del tercer o cuarto año de sembrado el proceso se hace mucho más rápido. Cuando llega a la edad madura se estanca.',
	'Aromo Frances':'El Aromo Frances es un árbol de tamaño mediano, de rápido crecimiento. Presenta el follaje muy recortado, con aspecto ligero y plumoso, grisáceo al igual que el tronco. Las flores, amarillas y muy fragantes, aparecen en abundancia a fines del invierno.',
	'Jacaranda':'2_Es un árbol nativo de Argentina que puede alcanzar los 30 metros de altura.  Florece dos veces por año, en primavera y otoño, produciendo inflorescencias racimosas de flores de color azul violáceo y forma tubular . Es un arbol caristico de la ciudad capital de Argentina.',
	'Ombú':'1_El Ombú es una planta de gran porte, y es confundido en muchas ocasiones con un árbol, sin embargo, se trata de una planta herbácea.  El ombú crece de manera silvestre en la región de la llanura pampeana de Argentina y es vinculada con la frondosa sobra que ofrece. En los años coloniales los gauchos solían construir sus viviendas al amparo de su enorme copa. Es utilizado muchas veces como punto referencia en las vastas llanuras pampeanas.'

	}

  
  //  'nombreArbol' : 'especie_detalleArbo_detallePersona'
  static infoArboles ={
	  'Daisaku Ikeda': 'Roble_21/08/16_Daisaku Ikeda es un lider budista, entusiasta pacifista, escritor, poeta, educador y fundador de varias instituciones dedicadas a fomentar la cultura, la educacion y los estudios sobre la paz alrededor del mundo. Es el tercer presidente de la Soka Gakkai y presidente fundador de la Soka Gakkai Internacional (SGI).',
	  'Kaneko Ikeda':'Magnolia_21/08/16_',
	  'Maestro Josei Toda':'Aromo_21/08/2016_Josei Toda (1900-1958) fue un educador, editor y empresario quien, como segundo presidente de la Soka Gakkai, reconstruyó dicha organización budista luego de la Segunda Guerra Mundial, convirtiéndola en un dinámico movimiento de base civil.',
	  'Soka Gakkai':'Falso Alcanforero_21/08/2016_',
	  'División Futuro':'Braquiquito_23/11/2014_',
	  'División de Jóvenes':'Grevillea_21/08/2016_',
	  'Maestro Tsunesaburo Makiguchi':'Ligustro_21/08/2016_Tsunesaburo Makiguchi (1871-1944) fue un educador, escritor y filósofo. Fundó la Soka Kyoiku Gakkai (antecesora de la Soka Gakkai) en 1930. Como educador, Makiguchi se opuso férreamente a las autoridades represivas del Japón y a la prácticas pedagógicas de la época, con el ideal de introducir en la enseñanza enfoques más humanísticos y centrados en el bienestar del ser humano. A raíz de ello, fue forzado a retirarse antes de tiempo de la carrera educativa, y posteriormente, fue enviado a prisión por oponerse a la política del régimen militarista. Murió en presidio a causa de la desnutrición, a la edad de setenta y tres años. Sus teorías educativas humanísticas han adquirido reconocimiento internacional de manera póstuma.',
	  'División Juvenil Masculina':'Aguaribay_30/8/2015_',
	  'Soka Gakkai de la Argentina':'Ginkgo_21/08/2016_',
	  'División Juvenil Femenina':'Magnolia_30/8/2015_',
	  'Centro Internacional Daisaku Ikeda de Estudio para la Paz CIDIEP':'Fresno_28/8/2015_',
	  'Dr. Francisco Delich':'Ginkgo biloba_28/8/2015_',
	  'Dr. Roberto Agarie':'Roble_28/8/2015_',
	  'Región Oeste':'Ligustro__',
	  'Familia Braun Billinghurst':'Ginkgo biloba_14/5/2016_',
	  'Sr. Juan Luis Linares':'Fresno_30/1/2015_',
	  'Familia Tawara':'Ginkgo biloba_21/2/2016_',
	  'Región 3':'Ligustro__',
	  'División de Estudiantes Secundarios':'Olivo_21/2/2016_',
	  'Grupo 70° Aniversario':'Ligustro_23/11/2014_',
	  'Provincia de San Juan':'Alamo_7/12/2014_',
	  'Ciudad de Rosario':'Alamo_7/12/2014_',
	  'Provincia de Neuquén':'Alamo_7/12/2014_',
	  'Provincia de Córdoba':'Alamo_7/12/2014_',
	  'Provincia de Tucumán':'Alamo_7/12/2014_',
	  'Divisón Femenina':'Cerezo_24/1/2016_',
	  'Familia Num':'Ginkgo biloba_15/05/2017_',
	  '70° Aniversario del ingreso de Ikeda Sensei a la Soka Gakkai':'Aromo_06/08/2017_',
	  'Grupo País del Plata':'Aromo_16/09/2017_',
	  'Familia Montoneri - Pate':'Ligustro_23/09/2017_',
	  'Grupo Dulce Melodía Kotekitai':'Magnolia_24/09/2017_',
	  'Grupo Cosmopolita Ongakutai':'Olivo_24/09/2017_',
	  'Coordinadora Gran Argentina':'Roble_04/11/17_',
	  'Flia. James Frenkel':'Jacaranda_04/02/2018_',
	  'Hiromasa Ikeda':'Ombú_25/02/2018'
  }

 
}

