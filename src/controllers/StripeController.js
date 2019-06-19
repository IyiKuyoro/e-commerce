import ResponseHelper from '../helpers/ResponseHelper';
import OrderService from '../services/OrderService';
import config from '../configs';
import RedisClient from '../helpers/RedisClient';

const stripe = require('stripe')(config.STRIPE_SK);

class Helper {
  static generatePaymentResponse(intent) {
    let response;
    if (intent.status === 'requires_action' && intent.next_action.type === 'use_stripe_sdk') {
      response = {
        requires_action: true,
        payment_intent_client_secret: intent.client_secret,
      };
    } else if (intent.status === 'succeeded') {
      response = {
        success: true,
      };
    } else {
      response = {
        error: 'Invalid PaymentIntent status',
      };
    }

    return response;
  }

  static async changeOrderStatusToPaid(orderId) {
    await OrderService.payOrder(orderId);
  }
}

export default class StripeController {
  static async charge(req, res) {
    try {
      let intent;
      const orderDetails = await OrderService.getShortDetails(req.params.orderId);
      const grandTotal =
        +orderDetails.total_amount +
        +orderDetails.shipping_cost +
        (+orderDetails.tax_percentage / 100) * +orderDetails.total_amount;

      if (req.body.paymentMethodId) {
        intent = await stripe.paymentIntents.create({
          payment_method: req.body.paymentMethodId,
          amount: (grandTotal * 100).toFixed(0),
          currency: 'gbp',
          confirmation_method: 'manual',
          confirm: true,
        });
      } else if (req.body.paymentIntentId) {
        intent = await stripe.paymentIntents.confirm(req.body.paymentIntentId);
      }

      const stripePayload = Helper.generatePaymentResponse(intent);

      if (stripePayload.success) {
        RedisClient.del(`order:${req.params.orderId}`);
        await Helper.changeOrderStatusToPaid(req.params.orderId);
      }

      ResponseHelper.successWithData({ stripeResponse: stripePayload }, res);
    } catch (error) {
      ResponseHelper.paymentError(error, res);
    }
  }
}
