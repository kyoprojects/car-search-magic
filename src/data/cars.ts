export interface CarBrand {
  id: string;
  name: string;
  logo: string;
}

export interface CarModel {
  id: string;
  name: string;
  brand: string;
  year: number;
  type: string;
}

export const carBrands: CarBrand[] = [
  {
    id: "porsche",
    name: "Porsche",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Porsche_logo.svg/2560px-Porsche_logo.svg.png",
  },
  {
    id: "bmw",
    name: "BMW",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/2048px-BMW.svg.png",
  },
  {
    id: "mercedes",
    name: "Mercedes-Benz",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png",
  },
  {
    id: "audi",
    name: "Audi",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/2560px-Audi-Logo_2016.svg.png",
  },
];

export const popularModels: CarModel[] = [
  {
    id: "911",
    name: "911 GT3 RS",
    brand: "Porsche",
    year: 2023,
    type: "Sports Car",
  },
  {
    id: "taycan",
    name: "Taycan Turbo S",
    brand: "Porsche",
    year: 2023,
    type: "Electric",
  },
  {
    id: "m3",
    name: "M3 Competition",
    brand: "BMW",
    year: 2023,
    type: "Sports Sedan",
  },
  {
    id: "rs6",
    name: "RS6 Avant",
    brand: "Audi",
    year: 2023,
    type: "Sports Wagon",
  },
];