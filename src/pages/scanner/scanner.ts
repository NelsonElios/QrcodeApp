import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import {QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner";
//import {Subscription} from "rxjs/Subscription";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {ToastController, Toast} from "ionic-angular";

//import {HomePage} from "../home/home";


/**
 * Generated class for the ScannerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



@IonicPage()
@Component({
  selector: 'page-scanner',
  templateUrl: 'scanner.html',
})
export class ScannerPage {

  infos: string ;
  //toast: Toast;
  constructor(public navCtrl: NavController, public navParams: NavParams, public barScanner: BarcodeScanner,private toastController: ToastController/*public qrcodestatus: QRScannerStatus*/ ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScannerPage');
  }

  scan() {

    this.infos = '';
    this.barScanner.scan().then(
      (qrData) => {
        this.infos = qrData.text;
      //  this.barScanner.;
       // this.navParams.get("" + this.infos);
       // hide camera preview
      },
      (error) => {
        //console.log('echec du scan du code qr')
        let toast= this.toastController.create({
          message: 'Oups ! Scan impossible. Précision: ',
          duration: 3000
        });
        toast.present();
        },
    );

    //this.navCtrl.push(HomePage,this.navParams);


  }


}
