import sgMail from '@sendgrid/mail';

import config from '../configs';

sgMail.setApiKey(config.SENDGRID_API_KEY);

export default class Mailer {
  static sendOrderCompletionMail(recipientEmail, recipientName, orderId, totalCost) {
    const msg = {
      to: recipientEmail,
      from: 'order@shopmate.com',
      subject: 'Your Order has Just Been Confirmed!',
      html: `
        <p>Hi ${recipientName},</p>

        <p>Thanks for confirming your order with us.
        We have just received payment of your order. Please find further details below</p>

        <table>
          <tr>
            <td>Order No:</td>
            <td><strong>${orderId}</strong></td>
          <tr>
          <tr>
            <td>Total Cost:</td>
            <td><strong>£${totalCost}</strong></td>
          <tr>
        </table>

        <p>We shall being processing the shipment immediately.

        <p>Yours,</p>
        <p>Shopmate</p>
      `,
    };

    sgMail.send(msg);
  }
}
