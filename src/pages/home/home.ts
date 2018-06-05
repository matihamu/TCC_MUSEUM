import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  tabBarElement: any;
  splash: Boolean;
  private db: SQLiteObject;

  constructor(platform: Platform, public navCtrl: NavController,) {

    this.tabBarElement = document.querySelector('.tabbar');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SqlitePage');
    this.tabBarElement.style.display = 'none';
    setTimeout(() => {
      this.splash = false;
      this.tabBarElement.style.display = 'flex';
    }, 4000);
  }
}
