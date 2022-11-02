import Head from "next/head";
import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { useState } from "react";
import Header from "../components/head";
import AppName from "../components/appName";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const [frating, setRating] = useState({
    rating: 0,
    feedback: '',
    hotelId: ''
  })

  const mutation = trpc.hotel.review.useMutation();
  const [errorMessage, setErrorMessage] = useState('');

  const handleReview = (e: any) => {
    e.preventDefault();
    if (!frating.feedback && !frating.hotelId) {
      setErrorMessage('All fields are compulsory.');
      console.log("error if======>", errorMessage)
    }else if(frating.feedback && frating.hotelId && sessionData?.user){
      mutation.mutate({ feedback: frating.feedback, rating: frating.rating, hotelId: frating.hotelId, userId: sessionData?.user?.id });
      setErrorMessage('');
    }
    // {
    //   frating.feedback === "" &&
    //     setErrorMessage('All fields are compulsory.');
    // }
    // {
    //   frating.hotelId === "" &&
    //     setErrorMessage('All fields are compulsory.');
    // }
    // {
    //   frating.feedback && frating.rating && sessionData?.user &&
    //     mutation.mutate({ feedback: frating.feedback, rating: frating.rating, hotelId: frating.hotelId, userId: sessionData?.user?.id });
    //   setErrorMessage('submit');
    //   console.log("error======>", errorMessage)
    // }

  };

  const hotels = trpc.hotel.getAll.useQuery();
  const hdata = hotels.isSuccess ? hotels.data : []


  return (
    <>
      <Header />
      <main className="container mx-auto flex min-h-screen flex-col items-center p-4">
        <AppName />
        <h3 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          Submit <span className="text-purple-300">Reviews</span>
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
          <Link href="/statistics">
            <a className="underline decoration-indigo-500">Statistics</a>
          </Link>
        </div>

        <div className="w-full items-center justify-center pt-6 text-2xl text-red-500">

          {mutation.error && <p>Something went wrong! <br /> {mutation.error.message}</p>}
          <div className="text-blue-500">
            {mutation.data ? <p>{mutation.data.submit}</p> : <p></p>}
          </div>
          <br />
        </div>


        <form>
          <div className="flex flex-col shadow-2xl p-4">
            <div>
              Select Hotel :
              <select onChange={(e) => setRating({
                ...frating, hotelId: e.target.value
              })} className="p-2">
                <option value="" key=''>--Select Hotel--</option>
                {hotels.isSuccess &&
                  hdata.map((hotel) => (
                    <option key={hotel.id} value={hotel.id}>{hotel.name}</option>
                  ))
                }
              </select>
            </div>
            <br />

            <label>
              Feedback:
              <input type="text" onChange={(e) => setRating({
                ...frating, feedback: e.target.value
              })} placeholder="Enter feedback" className="bg-gray-100 rounded p-2" required />
            </label><br />

            <label>
              rating:
              <input type="number" onChange={(e) => setRating({
                ...frating, rating: parseFloat(e.target.value)
              })} placeholder="Enter rating 0-5" className="bg-gray-100 rounded p-2" required />
            </label>
            <br />

            {errorMessage && (
              <p className="text-red-500"> {errorMessage} </p>
            )}

            <button
              type="submit"
              className="bg-blue-500 rounded m-2 text-white p-2"
              onClick={handleReview}
            >
              Create Review
            </button>
          </div>
        </form>


      </main>
    </>
  );
}

export default Home;

