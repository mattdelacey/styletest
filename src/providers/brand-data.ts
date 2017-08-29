import { Injectable } from '@angular/core';


@Injectable()
export class BrandData {
  mybrand = {};
  mytest = "";
  

  constructor(
 
  ) {}

  /*hasFavorite(sessionName: string): boolean {
    return (this._favorites.indexOf(sessionName) > -1);
  };*/

  setBrand(newbrand): void {
    this.mybrand = newbrand;
  };

  getBrand() {
    return this.mybrand;
  }

  setTest(newtest) {
    this.mytest = newtest;
  }

  getTest() {
    return this.mytest;
  }

  /*removeFavorite(sessionName: string): void {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  };*/
}