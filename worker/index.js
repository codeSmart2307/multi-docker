const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});
const sub = redisClient.duplicate();

// Recursive solution to calculate the Fibonnaci value for a given index
const fib = (index) => {
    if (index < 2) return 1;
    return fib(index - 1) + fib(index - 2);
};

// Subscribe to a new message, calculate the Fibonnaci value and append it to the values object
sub.on('message', (channel, message) => {
    redisClient.hset('values', message, fib(parseInt(message)));
});
// Subscribe to all insert operations
sub.subscribe('insert');