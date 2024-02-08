import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      bookId,
      bookImg,
      bookName,
      bookCategory,
      bookLink,
      description,
      authorName,
      dateOfPublish,
    } = req.body;

    const client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      await client.connect();
      const database = client.db('Book-Universe');

      const collection = database.collection('books');

      await collection.insertOne({
        bookId,
        bookImg,
        bookName,
        bookCategory,
        bookLink,
        description,
        authorName,
        dateOfPublish,
      });

      res.status(201).json({ message: 'Book saved successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong!' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed!' });
  }
}
