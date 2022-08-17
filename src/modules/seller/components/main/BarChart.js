import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    layout: { autoPadding: false },
    hover: { intersect: false },
    backdropPadding: 0,
    padding: 0,
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
        title: {
            display: true,
            position: 'left',
            text: 'Sale Analytics',
        },
        tooltip: {
            caretPadding: 10,
            caretPosition: 'right',
            caretX: 0,
            caretY: 0,
            intersect: false,
            mode: 'index',
            yAlign: 'center',
            position: 'average',
            displayColors: false,
            padding: 10,
            pointHitRadius: 5,
            pointRadius: 1,
            caretSize: 10,
            backgroundColor: '#CAD5E2',
            borderWidth: 1,
            bodyColor: '#1B98F5',
            titleColor: '#1B98F5',
        },
    },
    scales: {
        y: {
            ticks: {
                display: true,
            },
            grid: {
                drawBorder: false,
                borderWidth: 0,
                drawTicks: false,
                color: 'transparent',
                width: 0,
                backdropPadding: 0,
            },
            drawBorder: false,
            drawTicks: false,
        },
        x: {
            ticks: {
                display: true,
            },
            grid: {
                drawBorder: false,
                borderWidth: 0,
                drawTicks: false,
                display: false,
            },
        },
    },
    responsive: true,
    maintainAspectRatio: false,
};

const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export const data = {
    labels,
    datasets: [
        {
            label: 'This Year Sales',
            data: labels.map(() => Math.random() * 1000),
            backgroundColor: '#1B98F5',
            minBarLength: 50,
            borderRadius: 100,
            borderSkipped: false,
        },
    ],
};

export default function Chart() {
    return (
        <div className="h-96 w-full rounded-2xl border-2 bg-white p-4 drop-shadow-lg md:p-5">
            <Bar options={options} data={data} />;
        </div>
    );
}
