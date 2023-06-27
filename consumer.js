var amqp = require('amqplib/callback_api');
const consumer = () => {
amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'Registration User';

    channel.assertQueue(queue, {
      durable: false
    });

    channel.consume(queue,function(msg) {
      console.log("Mail", msg.content.toString());
    }, {
        noAck: true
      });
  });
});
}