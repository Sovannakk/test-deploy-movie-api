'use client'
import { MovieService } from "@/service/MovieService";
import { Movie } from "@/types/Movie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaFilter, FaHeart, FaRegHeart, FaSearch, FaStar } from "react-icons/fa";
const Page = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const [movieData, setMovieData] = useState<Movie[]>([]);

    const dataMovie = async () => {
        try {
            const responseMovie = await MovieService.getMovieAll();
            console.log(responseMovie.payload);
            if (responseMovie && responseMovie.payload) {
                setMovieData(responseMovie.payload)
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    }

    useEffect(() => {
        dataMovie();
    }, []);
    const filterDataMovie = movieData.filter((movie) =>
        movie.category.name === "comedy" &&
        movie.category.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    const [showAll, setShowAll] = useState(false);

    const toggleFavorite = (movieId: number) => {
        setMovieData((prevList) =>
            prevList.map((movie) =>
                movie.movieId === movieId
                    ? { ...movie, isFavorite: !movie.isFavorite }
                    : movie
            )
        );
    };
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Gradient Background */}
            <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none" />

            {/* Content Container */}
            <div className="relative">
                {/* Header Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Back Button */}
                    <div
                        className="inline-flex items-center mb-16 hover:opacity-80 transition-opacity cursor-pointer group"
                        onClick={() => router.push('/home')}
                    >
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-3 group-hover:-translate-x-1 transition-transform">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 19.5L8.25 12l7.5-7.5"
                                />
                            </svg>
                        </div>
                        <span className="text-lg text-white/80">Back to Home</span>
                    </div>

                    {/* Header Content */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0 mb-16">
                        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70">
                            Comedy Movies
                        </h1>

                        {/* Search and Filter Section */}
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
                            <div className="relative flex-grow md:flex-grow-0">
                                <input
                                    type="text"
                                    placeholder="Search movies..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full md:w-80 px-6 py-3.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl
                                    focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20
                                    placeholder-white/40 transition-all duration-300"
                                />
                                <FaSearch className="absolute right-4 top-4 text-white/40" />
                            </div>
                            <button className="flex items-center justify-center px-6 py-3.5 bg-white/5 backdrop-blur-xl 
                                border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300
                                focus:outline-none focus:ring-1 focus:ring-white/20">
                                <FaFilter className="mr-2 text-white/80" />
                                <span className="text-white/80">Filter</span>

                            </button>
                        </div>
                    </div>
                </div>

                {/* Movies Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filterDataMovie.length > 0 ? (
                            filterDataMovie.map((movie: Movie) => (
                                <div key={movie.movieId}
                                    // onClick={() => router.push(`/detail/${movie.id}`)}
                                    className="group bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden 
                                    hover:transform hover:scale-[1.02] transition-all duration-300
                                    border border-white/10 hover:border-white/20 cursor-pointer">
                                    <div className="relative">
                                        <img
                                            width={30}
                                            height={30}
                                            src={movie.poster}
                                            alt={movie.title}
                                            onClick={() => router.push(`/detail/${movie.movieId}`)}
                                            className="w-full h-[300px] object-cover brightness-90 group-hover:brightness-100 transition-all duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                                        <button
                                            className="absolute top-4 right-4 p-3 bg-black/40 backdrop-blur-xl rounded-full
                                            transition-all duration-300 transform hover:scale-110"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                toggleFavorite(movie.movieId)
                                            }}
                                        >
                                            {movie.isFavorite ? (
                                                <FaHeart className="text-red-500 w-5 h-5" />
                                            ) : (
                                                <FaRegHeart className="text-white/90 w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-xl font-bold text-white/90 leading-tight">{movie.title}</h3>
                                            <div className="flex items-center bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-xl">
                                                <FaStar className="text-yellow-400 mr-1.5 w-4 h-4" />
                                                <span className="font-medium text-white/90">{movie.rating}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-white/60 text-sm mb-4 font-medium">
                                            <span>{movie.year}</span>
                                            <span className="mx-2">•</span>
                                            <span>{movie.duration}</span>
                                            <span className="mx-2">•</span>
                                            {/* <span className="text-red-400/90">{movie.genre}</span> */}
                                        </div>
                                        <div>
                                            <p className={`text-white/50 text-sm leading-relaxed ${showAll ? "" : "line-clamp-2"}`}>
                                                {movie.overview}
                                            </p>

                                            {movie.overview.length > 100 && ( // only show button if description is long
                                                <button
                                                    onClick={() => setShowAll(!showAll)}
                                                    className="mt-2 text-blue-400 hover:underline text-sm"
                                                >
                                                    {showAll ? "Show less" : "Show more"}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center py-20">
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                    <FaSearch className="w-8 h-8 text-white/20" />
                                </div>
                                <p className="text-xl text-white/40 font-medium">No movies found matching your search.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Page
