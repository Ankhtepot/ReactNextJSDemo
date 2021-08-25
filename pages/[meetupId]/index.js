import MeetupDetail from '../../components/meetups/MeetpDetail';
import {MongoClient, ObjectId} from 'mongodb';
import Head from 'next/head';

function MeetupDetails(props) {

    return (
        <>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name="description" content={props.meetupData.description} />
            </Head>
            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </>
    );
}

export async function getStaticPaths() {
    const client = await MongoClient.connect(`mongodb+srv://petr:Dii90125@cluster0.ppnb4.mongodb.net/meetups?retryWrites=true&w=majority`);
    const db = client.db();

    const meetupCollection = db.collection('meetups');

    const result = await meetupCollection.find({}, { _id: 1 }).toArray();

    await client.close();

    return {
        fallback: false,
        paths: result.map(meetup => ({
            params: {
                meetupId: meetup._id.toString()
            }
        }))
    };
}

export async function getStaticProps(context) {
    const params = context.params;
    const meetupId = params.meetupId;

    const client = await MongoClient.connect(`mongodb+srv://petr:Dii90125@cluster0.ppnb4.mongodb.net/meetups?retryWrites=true&w=majority`);
    const db = client.db();

    const meetupCollection = db.collection('meetups');

    const selectedMeetup = await meetupCollection.findOne({ _id: ObjectId(meetupId) });

    await client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                image: selectedMeetup.image,
                address: selectedMeetup.address,
                description: selectedMeetup.description
            }
        }
    };
}

export default MeetupDetails;