import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  weight: number;
  height: number;

  constructor(private toastController: ToastController) {}

  isFormValid() {
    return (this.height && this.weight && this.height > 0 && this.weight > 0);
  }

  onCalculate() {
    const imc = this.weight / (this.height * this.height);
    this.showMessage(this.interIMC(imc));
  }

  interIMC(imc: number) {
    if(imc < 18.5){
      return `${imc} - MAGREZA,warning`
    }else if(imc < 25.0){
      return `${imc} - NORMAL,success`
    }else if(imc < 30.0) {
      return `${imc} - SOBREPESO GRAU I,warning`
    }else if(imc < 40.0) {
      return `${imc} - OBESIDADE GRAU II,danger`
    }else{
      return `${imc} - OBESIDADE GRAVE GRAU III,danger`
    }
  }

  async showMessage(msg: string) {
    const previousToast = await this.toastController.getTop();
    if (previousToast) {
      await this.toastController.dismiss();
    }
    let dados = msg.split(',')
    const toast = await this.toastController.create(
      {
        message: dados[0],
        color: dados[1],
        buttons: [
          {
            icon: 'close'
          }
        ]
      }
    );
    toast.present();
  }
}
