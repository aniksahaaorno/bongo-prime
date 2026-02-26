export interface Order {
  _id: string;
  customerInfo: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
  };

  quantity: number;
  courierName: string;
  courierStatus: string;
  status: string;
  note: string;
  createdAt: string;
  grandTotal: number;
  orderStatus: string;

  products: any[];
}
