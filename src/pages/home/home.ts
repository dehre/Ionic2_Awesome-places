import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from "ionic-angular";
import { Place } from "../../models/place";
import { PlacesService } from "../../services/places.service";
import { AddPlacePage } from "../add-place/add-place";
import { PlacePage } from "../place/place";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  private addPlacePage = AddPlacePage;
  private places:Place[] = [];

  constructor(
    private navCtrl:NavController,
    private modalCtrl:ModalController,
    private placesService:PlacesService
  ){}

  ngOnInit(){
    this.placesService.fetchPlaces()
      .then((places: Place[]) => {
        this.places = places
      });
  }

  ionViewWillEnter(){
    this.places = this.placesService.loadPlaces();
  }

  onOpenPlace(place:Place,index:number){
    const modal = this.modalCtrl.create(PlacePage,{place,index});
    modal.present();
  }

}
