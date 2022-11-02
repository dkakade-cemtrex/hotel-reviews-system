import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import Link from 'next/link';
import Header from "../../components/head";
import { useRouter } from 'next/router'
import AppName from "../../components/appName";

const Home: NextPage = () => {

    const router = useRouter()
    const { id } = router.query

    const hotelReviews = trpc.hotel.getReviews.useQuery({ id });
    const rdata = hotelReviews.isSuccess ? hotelReviews.data : []

    const hotelName = trpc.hotel.getHotel.useQuery({ id });
    const hdata = hotelName.isSuccess ? hotelName.data?.name.split(' ') : []

    return (
        <>
            <Header />
            <main className="container mx-auto flex min-h-screen flex-col items-center p-4">
                <AppName />
                <h3 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
                    {hdata &&
                        hdata.map((name, index) => {
                            return index === 0 ? (<span>{name}</span>) : (<span className="text-purple-300" key={index}>&nbsp;{name}&nbsp;</span>)
                        }
                        )

                    }
                </h3>
                <div>
                    <Link href="/">
                        <a className="underline decoration-sky-500">Home</a>
                    </Link> &emsp;
                    <Link href="/reviews">
                        <a className="underline decoration-pink-500">Reviews</a>
                    </Link>
                    &emsp;
                    <Link href="/statistics">
                        <a className="underline decoration-indigo-500">Statistics</a>
                    </Link>
                </div>


                <div className="w-full items-center justify-center pt-6 text-blue-500">
                    <table className="border-collapse border border-slate-400 m-auto">
                        <thead>
                            <tr>
                                <th className="border border-slate-300">Sr. No.</th>
                                <th className="border border-slate-300">Feedback</th>
                                <th className="border border-slate-300">Ratings</th>
                            </tr>
                        </thead>
                        {
                            rdata.map((review, index) => (
                                <tr key={review.id}>
                                    <td className="border border-slate-300">{index + 1}</td>
                                    <td className="border border-slate-300">{review.feedback}</td>
                                    <td className="border border-slate-300">{review.rating}</td>
                                </tr>
                            ))

                        }
                    </table>
                </div>


            </main>
        </>
    );
}

export default Home;