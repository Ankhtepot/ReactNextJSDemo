import MeetupList from '../components/meetups/MeetupList';
import {MongoClient} from 'mongodb';
import Head from 'next/head';

// const DUMMY_MEETUPS = [
//     {
//         id: 'm1',
//         title: 'first meetup',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG/1280px-Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG',
//         address: 'Some address 5, 456123 Some City'
//     },
//     {
//         id: 'm2',
//         title: 'second meetup',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG/1280px-Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG',
//         address: 'Some address 10, 456123 Some City'
//     }
// ];

function HomePage(props) {
    return (
        <>
            <Head>
                <title>React meetups</title>
                <meta name="description" content='Browse a large list of highly active React meetups!' />
            </Head>
            <MeetupList meetups={props.meetups}/>
        </>
    );
}

// For dynamic refresh
// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;
//     // fetch data from an API
//
//     return {
//         props: DUMMY_MEETUPS
//     }
// }

// For refresh each xx seconds
export async function getStaticProps() {
    // fetch data from an API
    const client = await MongoClient.connect(`mongodb+srv://petr:Dii90125@cluster0.ppnb4.mongodb.net/meetups?retryWrites=true&w=majority`);
    const db = client.db();

    const meetupCollection = db.collection('meetups');

    const result = await meetupCollection.find().toArray();

    await client.close();

    return {
        props: {
            meetups: result.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 10
    };
}

export default HomePage;