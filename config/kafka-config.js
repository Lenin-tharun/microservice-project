import { Kafka } from 'kafkajs';
import config from './env-config.js';

const kafka = new Kafka({
  clientId: 'project-microservice',
  brokers: Array.isArray(config.kafka.brokers) ? config.kafka.brokers : [config.kafka.broker],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'project-group' });

await producer.connect();
await consumer.connect();

export { kafka, producer, consumer };
 