import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import {useRouter} from 'next/router';
import Head from 'next/head';

function NewMeetupPage() {
    const router = useRouter();

    async function addMeetupHandler(enteredMeetupData) {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        console.log(data);

        await router.push('/');
    }

    return (
        <>
            <Head>
                <title>Add a new meetup</title>
                <meta name="description" content='Add your new meetup and create amazing networking opportunities.' />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler}/>
        </>
    );
}

export default NewMeetupPage;