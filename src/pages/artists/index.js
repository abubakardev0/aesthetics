import { useState } from 'react';
import Image from 'next/image';
import image from '../../common/components/home/image6.jpg';
import List from '../../common/utils/icons/List';
import Grid from '../../common/utils/icons/Grid';
function Artists() {
    const [displayOptions, setDisplayOptions] = useState('list');
    return (
        <>
            <section className="container mx-auto">
                <h1 className="text-4xl font-semibold">Artists</h1>
                <p>Lorem Ipsum</p>
                <div className="flex justify-end space-x-5 text-lg">
                    <button
                        className={`${
                            displayOptions === 'list'
                                ? 'rounded-md bg-black '
                                : ''
                        } grid h-10 w-10 place-content-center`}
                        onClick={() => setDisplayOptions('list')}
                    >
                        <List
                            className={`${
                                displayOptions === 'list'
                                    ? 'fill-white'
                                    : 'fill-black'
                            } mt-2 h-8 w-8`}
                        />
                    </button>
                    <button
                        className={`${
                            displayOptions === 'grid'
                                ? 'rounded-md bg-black '
                                : ''
                        }w-10 h-10`}
                        onClick={() => setDisplayOptions('grid')}
                    >
                        <Grid
                            className={`${
                                displayOptions === 'grid'
                                    ? 'fill-white'
                                    : 'fill-black'
                            } mt-1 h-10 w-10`}
                        />
                    </button>
                </div>
                {displayOptions === 'list' && <ArtistList />}
                {displayOptions === 'grid' && <ArtistGrid />}
            </section>
        </>
    );
}

export default Artists;

function ArtistList() {
    const usernames = [
        'John Doe',
        'James Vince',
        'Robert Alan',
        'Alan Walker',
        'Asim Kamal',
        'Qasim Zahid',
        'Waleed Pasha',
        'Ali Muhammad',
        'Hasham King',
        'Abdulllah Khan',
    ];
    return (
        <ul className="col-auto my-6 grid list-inside list-disc grid-cols-4 gap-5 text-gray-700 marker:text-gray-700">
            {usernames.map((username, index) => (
                <li
                    key={index}
                    className="w-fit cursor-pointer border-gray-700 text-lg font-medium underline-offset-4 transition-all delay-300 visited:text-blue-500 hover:underline"
                >
                    {username}
                </li>
            ))}
        </ul>
    );
}

function ArtistGrid() {
    const usernames = [
        'John Doe',
        'James Vince',
        'Robert Alan',
        'Alan Walker',
        'Asim Kamal',
        'Qasim Zahid',
        'Waleed Pasha',
        'Ali Muhammad',
        'Hasham King',
        'Abdulllah Khan',
    ];
    return (
        <>
            <div className="col-auto my-6 grid grid-cols-4 gap-5">
                {usernames.map((username, index) => (
                    <div key={index}>
                        <Image
                            src={image}
                            height={250}
                            width={300}
                            className="object-cover"
                        />
                        <h2 className="text-lg font-medium text-gray-700">
                            {username}
                        </h2>
                    </div>
                ))}
            </div>
        </>
    );
}
