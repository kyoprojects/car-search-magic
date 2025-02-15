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
  thumbnail: string;
}

export const carBrands: CarBrand[] = [
  {
    id: 'porsche',
    name: 'Porsche',
    logo: 'https://1000logos.net/wp-content/uploads/2018/02/Porsche-Logo.png'
  },
  {
    id: 'bmw',
    name: 'BMW',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/2048px-BMW.svg.png'
  },
  {
    id: 'mercedes',
    name: 'Mercedes-Benz',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png'
  },
  {
    id: 'audi',
    name: 'Audi',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/2560px-Audi-Logo_2016.svg.png'
  }
];

export const popularModels: CarModel[] = [
  {
    id: '911',
    name: '911 GT3 RS',
    brand: 'Porsche',
    year: 2023,
    type: 'Sports Car',
    thumbnail: 'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'taycan',
    name: 'Taycan Turbo S',
    brand: 'Porsche',
    year: 2023,
    type: 'Electric',
    thumbnail: 'https://ev-database.org/img/auto/Porsche_Taycan_Turbo_S/Porsche_Taycan_Turbo_S-01@2x.jpg'
  },
  {
    id: 'm3',
    name: 'M3 Competition',
    brand: 'BMW',
    year: 2023,
    type: 'Sports Sedan',
    thumbnail: 'https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'rs6',
    name: 'RS6 Avant',
    brand: 'Audi',
    year: 2023,
    type: 'Sports Wagon',
    thumbnail: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=300&q=80'
  }
];
