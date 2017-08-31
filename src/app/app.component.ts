import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { OneSignal } from '@ionic-native/onesignal';
import { AlertController } from 'ionic-angular';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private _OneSignal: OneSignal, public alertCtrl: AlertController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      //  OneSignal Setup .

      this._OneSignal.startInit("1de94dd4-73ad-4817-b9b8-b5792c2f9c0e", "ionic-awesome-d0f40");
      this._OneSignal.inFocusDisplaying(this._OneSignal.OSInFocusDisplayOption.Notification);
      this._OneSignal.setSubscription(true);
      this._OneSignal.handleNotificationReceived().subscribe(() => {
        // handle received here how you wish.
        this.showAlert("Zira", "Push Notification Received");
      });
      this._OneSignal.handleNotificationOpened().subscribe(() => {
        // handle opened here how you wish.

      });
      this._OneSignal.endInit();

    });
  }


  showAlert(subject, message) {
    let alert = this.alertCtrl.create({
      title: subject,
      subTitle: message,
      buttons: [{
        text: 'Ok',
        handler: () => {
          console.log("Okay Clicked");
        }
      }]
    });
    alert.present();
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
