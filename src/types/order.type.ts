import Product from './product.type';

export const enum CurrentStatus {
  ACTIVE = 'active',
  COMPLETE = 'complete',
}
export interface OrderItem extends Product {
  quantity: number;
}
export interface Order {
  id?: number;
  currentStatus?: CurrentStatus;
  userId: string | number | undefined;
  products?: OrderItem[];
}
