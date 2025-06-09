import { Injectable } from '@nestjs/common';
const Razorpay = require('razorpay');

@Injectable()
export class RazorpayService {
  private razorpay: any;
  constructor() {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }

  async createOrder(amount: number, currency = 'INR') {
    const order = await this.razorpay.orders.create({
      amount: amount * 100, 
      currency,
    });
    return order;
  }
}
