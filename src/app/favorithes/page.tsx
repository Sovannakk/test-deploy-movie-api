'use client';

import { MovieService } from "@/service/MovieService";
import { Movie } from "@/types/Movie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaHeart, FaRegHeart, FaStar } from "react-icons/fa";

export default function FavoritesPage() {
    // const [, setFavorites] = useState<number[]>([]);

    const toggleFavorite = (movieId: number) => {
        setMovieData((prevList) =>
            prevList.map((movie) =>
                movie.movieId === movieId
                    ? { ...movie, isFavorite: !movie.isFavorite }
                    : movie
            )
        );
    };

    const router = useRouter();
    const handleBackClick = () => {
        router.push('/home');
    };
    const [showAll, setShowAll] = useState(false);
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

    console.log("frfref", movieData);
    useEffect(() => {
        dataMovie();
    }, []);

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white overflow-y-auto pb-20">
            {/* Header Section */}
            <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-purple-900/30">
                <div className="max-w-7xl mx-auto relative">
                    {/* Back Button */}
                    <button
                        onClick={handleBackClick}
                        className="absolute left-4 top-8 flex items-center gap-2 px-4 py-2 
                                 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300
                                 text-white/90 hover:text-white group"
                    >
                        <FaArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" />
                        <span>Back</span>
                    </button>
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
                            My Favorites
                        </h1>
                        <p className="mt-4 text-lg text-gray-300">
                            Your personally curated collection of favorite movies
                        </p>
                    </div>
                </div>
            </div>

            {/* Movies Grid Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 mt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {movieData
                        .filter((movie) => movie?.isFavorite)
                        .map((movie) => (
                            <div
                                key={movie.movieId}
                                className="group bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden 
                                         hover:transform hover:scale-[1.02] transition-all duration-300
                                         border border-gray-700/50 hover:border-purple-500/50 cursor-pointer"
                            >
                                <div className="relative">
                                    <img
                                        src={movie.poster}
                                        alt={movie.title}
                                        onClick={() => router.push(`/detail/${movie.movieId}`)}
                                        className="w-full h-72 object-cover brightness-90 group-hover:brightness-100 transition-all duration-300"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />

                                    {/* Favorite Button */}
                                    <button
                                        onClick={() => toggleFavorite(movie.movieId)}
                                        className="absolute top-4 right-4 p-3 bg-gray-900/80 rounded-full cursor-pointer
                                                 hover:bg-purple-600/80 transition-all duration-300
                                                 transform hover:scale-110"
                                    >
                                        {movie.isFavorite ? (
                                            <FaHeart className="text-red-500 w-5 h-5" />
                                        ) : (
                                            <FaRegHeart className="text-white w-5 h-5" />
                                        )}
                                    </button>
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 line-clamp-1 transition-colors duration-300">
                                            {movie.title}
                                        </h3>
                                        <div className="flex items-center bg-gray-700/50 px-2 py-1 rounded">
                                            <FaStar className="text-yellow-400 mr-1" />
                                            <span className="text-white">{movie.rating}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center text-gray-400 text-sm mb-4">
                                        <span>{movie.year}</span>
                                        <span className="mx-2">•</span>
                                        <span>{movie.duration}</span>
                                        <span className="mx-2">•</span>
                                        {/* <span>{movie.genre}</span> */}
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
                        ))}
                </div>

                {/* Empty State */}
                {movieData.filter(movie => movie.isFavorite).length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800/50 mb-6">
                            <FaHeart className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-300 mb-2">
                            No favorites yet
                        </h3>
                        <p className="text-gray-400">
                            Start adding movies to your favorites collection
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}