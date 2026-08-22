export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'cortes' | 'entradas' | 'bebidas';
  image: string;
  isPremium?: boolean;
}

export interface RoomType {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  maxAdults: number;
  maxKids: number;
  features: string[];
  image: string;
  availableCount: number;
}

export interface BookingDetails {
  checkIn: string;
  checkOut: string;
  roomType: string;
  guests: number;
}

export interface ToastType {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error' | 'loading';
}
