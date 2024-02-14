import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { bookId } = req.body;

    const client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      await client.connect();
      const database = client.db('Book-Universe');
      const collection = database.collection('books');

      // Find and delete document by bookId
      const result = await collection.deleteOne({
        bookId: parseInt(bookId, 10),
      });

      if (result.deletedCount === 0) {
        res.status(404).json({ message: 'Book not found!' });
        return;
      }

      res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong!' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed!' });
  }
}
