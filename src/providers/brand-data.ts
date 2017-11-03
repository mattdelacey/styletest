import { Injectable } from '@angular/core';


@Injectable()
export class BrandData {
  mybrand = {};
  mytest = "";
  

  constructor(
 
  ) {}

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
}