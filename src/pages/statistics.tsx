import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, LineElement, Legend, RadialLinearScale, LinearScale, Point, PointElement } from 'chart.js';
import { Doughnut, Pie, PolarArea, Radar } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale, LinearScale, PointElement, LineElement);
import { trpc } from "../utils/trpc";
import { faker } from '@faker-js/faker';
import Header from '../components/head';
import Link from 'next/link';
import AppName from '../components/appName';


export default function GraphPage() {

  const hotels = trpc.hotel.getAll.useQuery();
  const hdata = hotels.isSuccess ? hotels.data : []

  const reviewsAvg = trpc.hotel.getAvgReviews.useQuery();
  const ravg = reviewsAvg.isSuccess ? reviewsAvg.data : []

  const labels: string[] = []
  const colorData: string[] = []
  const dataset: number[] = []

  {
    hotels.isSuccess &&
      hdata.map((hotel) => (
        labels.push(hotel.name) &&
        colorData.push(faker.color.rgb({ format: 'css' }))
      ))
  }

  {
    reviewsAvg.isSuccess &&
      ravg.map((review) => (
        dataset.push(review._avg.rating ? review._avg.rating : 0)
      ))
  }

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataset,
        backgroundColor: colorData,
        borderColor: colorData,
        borderWidth: 1,
      },
    ],
  }

  return (
    <>
      <Header />
      <main className="container mx-auto flex min-h-screen flex-col items-center p-4">
        <AppName />
        <h3 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          Review <span className="text-purple-300">Statistics</span>
        </h3>
        <div>
          <Link href="/">
            <a className="underline decoration-sky-500">Home</a>
          </Link>
          &emsp;
          <Link href="/hotels">
            <a className="underline decoration-pink-500">Hotels</a>
          </Link>
          &emsp;
          <Link href="/reviews">
            <a className="underline decoration-indigo-500">Reviews</a>
          </Link>
        </div>
        <br />
        <br />
        <div className='flex'>
          <div className="chart-container w-1/4 h-1/4">
            <Doughnut data={data} />
          </div>

          <div className="chart-container w-1/4 h-1/4">
            <Pie data={data} />
          </div>

          <div className="chart-container w-1/4 h-1/4">
            <PolarArea data={data} />
          </div>

          <div className="chart-container w-1/4 h-1/4">
            <Radar data={data} />
          </div>
        </div>
      </main>
    </>
  );
}






