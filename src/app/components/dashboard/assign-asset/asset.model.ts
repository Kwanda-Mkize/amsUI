export interface Asset {
  id: number;
  name: string;
  category: 'Laptop' | 'Headphones' | 'Mouse' | 'Monitor' | 'Router';
  ram: string;
  processor: string;
  hardDrive: string;
  location: {
    country: string;
    city: string;
  };
}
