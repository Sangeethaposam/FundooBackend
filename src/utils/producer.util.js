var amqp = require('amqplib/callback_api');
export const producer = (queue,msg) => {
amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    // var queue = 'hello';
    // var msg = 'Welcome to nodejs';

    channel.assertQueue(queue, {
      durable: false
    });

    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" Message Sent", msg);
  });
});
}
