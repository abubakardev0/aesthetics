import { useState } from 'react';
import Image from 'next/image';
import image from '../../common/components/home/image6.jpg';
import List from '../../common/utils/icons/List';
import Grid from '../../common/utils/icons/Grid';
function Artists() {
    const [displayOptions, setDisplayOptions] = useState('list');
    return (
        <>
            <section className="container mx-auto px-5 ">
                <h1 className="text-4xl font-semibold">Artists</h1>
                <p>Lorem Ipsum</p>
                <div className="my-4 flex justify-end space-x-5 text-lg">
                    <button
                        className={`${
                            displayOptions === 'list'
                                ? 'rounded-md bg-black '
                                : ''
                        } grid h-6 w-6 place-content-center md:h-10 md:w-10`}
                        onClick={() => setDisplayOptions('list')}
                    >
                        <List
                            className={`${
                                displayOptions === 'list'
                                    ? 'fill-white'
                                    : 'fill-black'
                            } h-4 w-4 md:h-8 md:w-8`}
                        />
                    </button>
                    <button
                        className={`${
                            displayOptions === 'grid'
                                ? 'rounded-md bg-black '
                                : ''
                        }  grid h-6 w-6 place-content-center md:h-10 md:w-10`}
                        onClick={() => setDisplayOptions('grid')}
                    >
                        <Grid
                            className={`${
                                displayOptions === 'grid'
                                    ? ' stroke-white'
                                    : ' stroke-black'
                            } h-4 w-4 stroke-2 md:h-8 md:w-8`}
                            fill="none"
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
        <ul className="grid-col-2 col-auto my-6 grid gap-3 text-gray-700 md:grid-cols-4 md:gap-5">
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
            <div className="flex flex-wrap justify-center gap-5">
                {usernames.map((username, index) => (
                    <div key={index}>
                        <Image
                            src={image}
                            alt={username}
                            height={200}
                            width={250}
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
