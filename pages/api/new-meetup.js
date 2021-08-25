import { MongoClient } from 'mongodb';
// /api/bew-meetup

// /POST /api/new-meetup
async function handler(req, res) {
    if (req.method === "POST") {
        const data = req.body;

        const client = await MongoClient.connect(`mongodb+srv://petr:Dii90125@cluster0.ppnb4.mongodb.net/meetups?retryWrites=true&w=majority`);
        const db = client.db();

        const meetupCollection = db.collection('meetups');

        const result = await meetupCollection.insertOne(data);

        console.log(result);

        await client.close();

        res.status(201).json({message: 'Meetup inserted!'});
    }
}

export default handler;