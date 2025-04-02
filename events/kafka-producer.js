/*import { Kafka, Partitioners } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'project-service',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,  // ✅ Fix the warning
});

await producer.connect();

export const sendProjectCreatedEvent = async (project) => {
  try {
    await producer.send({
      topic: 'project-created',
      messages: [{ value: JSON.stringify(project) }],
    });
    console.log('✅ Project Created Event Sent:', project);
  } catch (error) {
    console.error('❌ Error sending Kafka event:', error);
  }
};

export default producer; // ✅ Still exporting producer if needed*/
