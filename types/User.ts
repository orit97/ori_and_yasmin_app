export interface Address {
    street: string;
    city: string;
    homeNumber: number;
  }
  
  export interface User {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthDate: Date; // Assuming birthDate is stored as a Date object
    address: Address;
    role: string; // This could be 'admin', 'user', etc.
  }
  