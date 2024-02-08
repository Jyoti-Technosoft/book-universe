import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      await client.connect();
      const database = client.db('Book-Universe');
      const collection = database.collection('books');

      const booksCursor = await collection.find(); // Get the cursor

      const books = await booksCursor.toArray(); // Convert cursor to array

      if (books) {
        res.status(200).json({ books });
      }
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong!' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed!' });
  }
}
