import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { DataServiceProvider } from '../../providers/data-service/data-service';
// home page content for thze scann of the Qrcode
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //visitors: any[] = [];
  //selectedVisitor: any;
  products: any[] = [];
  selectedProduct: any;
  productFound:boolean = false;

  constructor(public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    private toast: Toast,
    public dataService: DataServiceProvider) {
      this.dataService.getProducts()
        .subscribe((response)=> {
            this.products = response
            console.log(this.products);
        });
  }

  scan() {
    this.selectedProduct = {};
    this.barcodeScanner.scan().then((barcodeData) => {
      this.selectedProduct = this.products.find(product => product.name === barcodeData.text); //product.plu
      if(this.selectedProduct !== undefined) {
        this.productFound = true;
        console.log(this.selectedProduct);
      } else {
        this.selectedProduct = {};
        this.productFound = false;
        this.toast.show('Product not found', '2000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }
    }, (err) => {
      this.toast.show(err, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

}
