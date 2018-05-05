import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  testNotification(){
    console.log("request recieved");
  }

  notifyInvalidOrder() {
    let error = new Notification("Feil:", {
      body: "Du kan ikke lagen en bestilling uten å være logget inn",
      icon: '../assets/icons/bike-21-512.png'
    });
    setTimeout(error.close.bind(error), 8000);
  }

  notifyEquipmentRecieved() {
    let validLogging = new Notification("Utstyr fra databasen er mottat", {
      body: "Her har du oversikt over alt utstyret vi kan tilby",
      icon: '../assets/icons/bike-21-512.png'
    });
    setTimeout(validLogging.close.bind(validLogging), 8000);
  }

  notifyUponSubmission() {
    let validLogging = new Notification("Du er logget inn", {
      body: "Nå kan du velge område og tidsrom du vil leie utstyr i",
      icon: '../assets/icons/bike-21-512.png'
    });
    setTimeout(validLogging.close.bind(validLogging), 8000);
  }

  notifyCustomerCreated(){
    let validCreation = new Notification("Brukeren er lagt", {
      body: "Nå kan du leie utstyr",
      icon: '../assets/icons/bike-21-512.png'
    });
    setTimeout(validCreation.close.bind(validCreation), 8000);
  }

  notifyOrderCompleted(orderId: string){
    let validCreation = new Notification("Bestilling lagret", {
      body: "med id: " + orderId,
      icon: '../assets/icons/bike-21-512.png'
    });
    setTimeout(validCreation.close.bind(validCreation), 8000);
  }

  notifyInvalidCredentials(){
    let validCreation = new Notification("Ugyldig logg inn", {
      body: "Vi finner ikke denne brukeren i databasen",
      icon: '../assets/icons/bike-21-512.png'
    });
    setTimeout(validCreation.close.bind(validCreation), 8000);
  }

  alertApiError(error: any[]){
    let errorMessage = new Notification("Feil:", {
      body: "" + error.toString(), 
      icon:'../assets/icons/bike-21-512.png'
    })
  }
}
