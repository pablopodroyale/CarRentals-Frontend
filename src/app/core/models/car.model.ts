export interface Car {
    id: string;
    type: string;
    model: string;
    location: string;
    services: Service[];
  }

  export interface Service{
    date: Date;
  }