import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { bookId } = req.query;

    const client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      await client.connect();
      const database = client.db('Book-Universe');
      const collection = database.collection('books');

      // Find document by bookId
      const book = await collection.findOne({ bookId: parseInt(bookId, 10) });

      if (!book) {
        res.status(404).json({ message: 'Book not found!' });
        return;
      }

      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong!' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed!' });
  }
}
