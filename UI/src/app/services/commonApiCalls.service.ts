import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class CommonApiCalls {
    public equipmentList: any[] = new Array();
    public placesList: any[] = new Array();
    constructor(private httpClient: HttpClient) { }

    fetchEquipment(): any[] {
        let equipmentEndpoint = environment.ApiUrl + "/bike";
        this.httpClient.get(equipmentEndpoint, environment.httpOptions)
            .subscribe(
                (data: any[]) => {
                    this.equipmentList.push(data);
                }
            );
        console.log(this.equipmentList);
        return this.equipmentList;
    }

    fetchPlaces(): any[] {
        let placesUrl = environment.ApiUrl + "/place";
        this.httpClient.get(placesUrl, environment.httpOptions)
            .subscribe(
                (data: any[]) => {
                    console.log(data);
                    this.placesList.push(data);
                }
            );
        console.log(this.placesList);
        return this.placesList;
    }
}