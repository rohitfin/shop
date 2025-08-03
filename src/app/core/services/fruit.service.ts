import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FruitService {

  constructor() { }

  
  getFruits(){

    let banana = {
      id: 1,
      name: "Banana",
      price: 60,
      imageURL: "https://www.bbassets.com/media/uploads/p/l/60000054_9-fresho-banana-poovan.jpg"
    }
    let apple = {
      id: 2,
      name: "Apple",
      price: 270,
      imageURL: "https://www.bbassets.com/media/uploads/p/l/40134281_22-fresho-baby-apple-shimla.jpg"
    }
    let guava = {
      id: 3,
      name: "Guava",
      price: 100,
      imageURL: "https://www.bbassets.com/media/uploads/p/l/40189531_4-fresho-guava-thai.jpg"
    }
    let sugarcane = {
      id: 4,
      name: "Sugarcane",
      price: 100,
      imageURL: "https://www.bbassets.com/media/uploads/p/l/10000592_11-fresho-sugarcane.jpg"
    }
    let pineapple = {
      id: 5,
      name: "Pineapple",
      price: 100,
      imageURL: "https://www.bbassets.com/media/uploads/p/l/10000156_30-fresho-pineapple.jpg"
    }

    const myObervable = of([banana, apple, guava, sugarcane, pineapple]);
    return myObervable;

  }

  getVegetable(){

    let potato = {
      id: 1,
      name: "Potato",
      price: 30,
      imageURL: "https://www.bbassets.com/media/uploads/p/m/40023476_6-fresho-potato-organically-grown.jpg"
    }
    let cauliflower = {
      id: 2,
      name: "Cauliflower",
      price: 50,
      imageURL: "https://www.bbassets.com/media/uploads/p/m/10000074_20-fresho-cauliflower.jpg"
    }
    let radish = {
      id: 3,
      name: "Radish",
      price: 40,
      imageURL: "https://www.bbassets.com/media/uploads/p/m/10000164_16-fresho-radish-white.jpg"
    }
    let chilli = {
      id: 4,
      name: "Green Chilli",
      price: 80,
      imageURL: "https://www.bbassets.com/media/uploads/p/m/50000513_4-fresho-chilli-green-organically-grown.jpg"
    }
    let cucumber = {
      id: 5,
      name: "Cucumber",
      price: 60,
      imageURL: "https://www.bbassets.com/media/uploads/p/m/30007400_4-fresho-cucumber.jpg"
    }
    let brinjal = {
      id: 6,
      name: "Brinjal",
      price: 60,
      imageURL: "https://www.bbassets.com/media/uploads/p/m/10000058_21-fresho-brinjal-varikatri.jpg"
    }
    let carrot = {
      id: 7,
      name: "Carrot",
      price: 60,
      imageURL: "https://www.bbassets.com/media/uploads/p/m/10000070_16-fresho-carrot-orange.jpg"
    }

    const myObervable = of([potato, cauliflower, radish, chilli, cucumber, brinjal, carrot]);
    return myObervable;

  }



  
}
