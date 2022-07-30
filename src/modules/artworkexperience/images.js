import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpg';
import image4 from './images/image4.jpg';
import image5 from './images/image5.jpg';
import image6 from './images/image6.jpg';
import image7 from './images/image7.jpg';
import image8 from './images/image8.jpg';
import image9 from './images/image9.jpg';
import image10 from './images/image10.jpg';
import image11 from './images/image11.jpg';
import image12 from './images/image12.jpg';

const imgObj = [
    {
        id: 1,
        image: image1,
        artist: 'Aida Bugg',
        title: 'Indus Flow',
        height: image1.height,
        width: image1.width,
        date: '09, 11, 2021',
        price: getNumberwithComma(100000),
    },
    {
        id: 2,
        image: image2,
        artist: 'Bernerdo Santos',
        title: 'Hayreddin Ship',
        height: image2.height,
        width: image2.width,
        date: '13, 05, 2022',
        price: getNumberwithComma(90000),
    },
    {
        id: 3,
        image: image3,
        artist: 'Asim Zahid',
        title: 'Peaceful Evening',
        height: image3.height,
        width: image3.width,
        date: '09, 02, 2022',
        price: getNumberwithComma(50000),
    },
    {
        id: 4,
        image: image4,
        artist: 'Qasim Ali',
        title: 'Abstraxtion',
        height: image4.height,
        width: image4.width,
        date: '09, 06, 2021',
        price: getNumberwithComma(29000),
    },
    {
        id: 5,
        image: image5,
        artist: 'Tabish Ali',
        title: 'Day in Beach',
        height: image5.height,
        width: image5.width,
        date: '28, 02, 2021',
        price: getNumberwithComma(120000),
    },
    {
        id: 6,
        image: image6,
        artist: 'Ali Pasha',
        title: 'Vase in the case',
        height: image6.height,
        width: image6.width,
        date: '10, 04, 2022',
        price: getNumberwithComma(45000),
    },
    {
        id: 7,
        image: image7,
        artist: 'Aida Bugg',
        title: 'Child play',
        height: image7.height,
        width: image7.width,
        date: '16, 12, 2021',
        price: getNumberwithComma(36000),
    },
    {
        id: 8,
        image: image8,
        artist: 'Waleed Tariq',
        title: 'The Art of Painting',
        height: image8.height,
        width: image8.width,
        date: '22, 03, 2021',
        price: getNumberwithComma(57000),
    },

    {
        id: 9,
        image: image9,
        artist: 'Kamal Baig',
        title: 'Dust off winter',
        height: image9.height,
        width: image9.width,
        date: '08, 03, 2022',
        price: getNumberwithComma(65000),
    },
    {
        id: 10,
        image: image10,
        artist: 'Europenea',
        title: 'Beautiful Day in forest',
        height: image9.height,
        width: image9.width,
        date: '08, 03, 2022',
        price: getNumberwithComma(65000),
    },
    {
        id: 11,
        image: image11,
        artist: 'Boston Public',
        title: 'Brimingham Palace',
        height: image9.height,
        width: image9.width,
        date: '08, 03, 2022',
        price: getNumberwithComma(65000),
    },
    {
        id: 12,
        image: image12,
        artist: 'Mikita Yo',
        title: 'Country Man',
        height: image9.height,
        width: image9.width,
        date: '08, 03, 2022',
        price: getNumberwithComma(65000),
    },
];

export default imgObj;

function getNumberwithComma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
