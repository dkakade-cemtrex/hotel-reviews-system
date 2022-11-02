import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import Link from 'next/link';
import Header from "../../components/head";
import AppName from "../../components/appName";

const Home: NextPage = () => {
  const hotels = trpc.hotel.getAll.useQuery();
  const hdata = hotels.isSuccess ? hotels.data : []

  return (
    <>
      <Header />
      <main className="container mx-auto flex min-h-screen flex-col items-center p-4">
        <AppName />
        <h3 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          All <span className="text-purple-300">Hotels</span>
        </h3>
        <div className="flex">
          <Link href="/">
            <a className="underline decoration-sky-500">Home</a>
          </Link>
          &emsp;
          <Link href="/statistics">
            <a className="underline decoration-pink-500">Statistics</a>
          </Link>
          &emsp;
          <Link href="/reviews">
            <a className="underline decoration-indigo-500">Reviews</a>
          </Link>
        </div>

        <div className="w-full items-center justify-center pt-6">
          <table className="border-collapse border border-slate-400 m-auto">
            <thead>
              <tr>
                <th className="border border-slate-300">Sr. No.</th>
                <th className="border border-slate-300">Name</th>
                <th className="border border-slate-300">Address</th>
              </tr>
            </thead>
            {
              hdata.map((hotel, index) => (
                <tr key={hotel.id}>
                  <td className="border border-slate-300">{index + 1}</td>
                  <td className="border border-slate-300">
                    <Link href={`/hotels/${hotel.id}`}>
                      <a className="text-green-600">{hotel.name}</a>
                    </Link>
                  </td>
                  <td className="border border-slate-300">{hotel.address}</td>
                </tr>
              ))}
          </table>

        </div>

        {/* <div className="w-full items-center justify-center pt-6 text-blue-500">
          <table className="border-collapse border border-slate-400">
            <thead>
              <tr>
                <th className="border border-slate-300">Hotel</th>
                <th className="border border-slate-300">Feedback</th>
                <th className="border border-slate-300">Ratings</th>
              </tr>
            </thead>
            {
              rdata.map((review) => (
                <tr key={review.id}>
                  <td className="border border-slate-300">{review.Hotel?.name}</td>
                  <td className="border border-slate-300">{review.feedback}</td>
                  <td className="border border-slate-300">{review.rating}</td>
                </tr>
              ))

            }
          </table>
        </div> */}


      </main>
    </>
  );
}

export default Home;