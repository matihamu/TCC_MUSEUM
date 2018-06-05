import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { DbProvider } from '../bdd/bdd';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {

  results: {};

  optionsScanner: BarcodeScannerOptions
  optionsBrowser: InAppBrowserOptions = {
    closebuttoncaption: 'Close',
  }

  private fixedURL: string = 'http://tcc.1click.pf/museum/index.php?mat=TONCODE&oeuvre=';
  private scannedData: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public barcodeScanner: BarcodeScanner, private dbService: DbProvider, public appCtrl: App, private inAppBrowser: InAppBrowser) {
  }

  ionViewWillEnter() {
    this.scan();

  }

  //QR Scanner
  private scan(): any {

    this.optionsScanner = {
      prompt: "Scan your barcode"
    };
    this.barcodeScanner.scan(this.optionsScanner)
      .then(barcodeData => {
        if (barcodeData.cancelled == true) {
          this.navCtrl.parent.select(0);
        } else {

          this.scannedData = barcodeData.text;
          console.log('Scanned code: ', this.scannedData);
          this.statutUpdate()
        }
      })

      .catch(err => {
        console.log('Error', err);
      });

  }
  
  //Met à jour le 'statut' d'une oeuvre si elle a été scanné
  private statutUpdate(): any {

    this.dbService.db.executeSql("UPDATE `oeuvres` SET statut = 'checkmark-circle-outline' WHERE qr_code=" + this.scannedData + ";", {})
      .then(() => {
        console.log('"Statut" updated');
        this.oeuvresPage();
        this.refreshHome();
      })
  }

  //Ouvre la page de l'oeuvre scanné
  private oeuvresPage(): void {
    let target = "_system";
    let URL = this.fixedURL + this.scannedData
    this.inAppBrowser.create(URL, target, this.optionsBrowser);
    console.log('URL: ' + this.fixedURL + this.scannedData);
  }

  //Refresh HomePage et PrimaryTabsPage
  public refreshHome() {
    this.appCtrl.getRootNavs()[0].setRoot('HomePage');
    this.appCtrl.getRootNavs()[0].setRoot('PrimaryTabsPage');
  }


}