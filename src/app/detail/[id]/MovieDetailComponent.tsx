'use client';
import { Movie } from "@/types/Movie";
import { useRouter } from "next/navigation";
import React from "react";
import {
    FaArrowLeft,
    FaClock,
    FaHeart,
    FaPlay,
    FaRegHeart,
    FaStar,
    FaTicketAlt,
    FaUser
} from "react-icons/fa";

interface MovieDetailComponent {
    movieData: Movie;
}
export const MovieDetailComponent: React.FC<MovieDetailComponent> = ({ movieData }) => {
    const router = useRouter();
    const movie = movieData;

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none" />

            {/* Hero Section */}
            <div className="relative h-[80vh] w-full">
                <div className="absolute inset-0">
                    <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
                </div>

                {/* Back Button */}
                <div className="absolute top-8 left-8 z-10">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors group"
                    >
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:-translate-x-1 transition-transform">
                            <FaArrowLeft className="w-5 h-5" />
                        </div>
                        <span className="text-lg">Back</span>
                    </button>
                </div>

                {/* Favorite Button */}
                <div className="absolute top-8 right-8 z-10">
                    <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-600/80 transition-all duration-300 transform hover:scale-110">
                        {movie.isFavorite ? (
                            <FaHeart className="text-red-500 w-5 h-5" />
                        ) : (
                            <FaRegHeart className="text-white/90 w-5 h-5" />
                        )}
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-64 relative z-10 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Movie Poster Card */}
                    <div className="lg:col-span-1">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                            <img
                                src={movie.poster}
                                alt={movie.title}
                                className="w-full h-[500px] object-cover"
                            />
                            <div className="p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <FaStar className="text-yellow-400 w-5 h-5" />
                                        <span className="text-lg font-semibold">{movie.rating}/5.0</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <FaClock className="text-white/60 w-5 h-5" />
                                        <span>{movie.duration} min</span>
                                    </div>
                                </div>
                                <button
                                    className="w-full py-4 bg-red-600 hover:bg-red-700 rounded-xl flex items-center justify-center space-x-2 transition-colors"
                                    onClick={() => router.push(`/detail/${movie.movieId}/watch`)}
                                >
                                    <FaPlay className="w-5 h-5" />
                                    <span className="font-semibold">Watch Now</span>
                                </button>
                                <button
                                    className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center space-x-2 transition-colors border border-white/10"
                                    onClick={() => router.push(`/detail/${movie.movieId}/booking`)}
                                >
                                    <FaTicketAlt className="w-5 h-5" />
                                    <span className="font-semibold">Book Tickets</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Movie Details */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>
                            <div className="flex flex-wrap items-center gap-4 text-lg text-white/80 mb-8">
                                <span className="px-4 py-1.5 bg-white/5 rounded-full">{movie.year}</span>
                                <span className="text-white/40">•</span>
                                <span className="px-4 py-1.5 bg-white/5 rounded-full">{movie.duration} min</span>
                                {movie.category?.name && (
                                    <>
                                        <span className="text-white/40">•</span>
                                        <span className="px-4 py-1.5 bg-white/5 rounded-full">{movie.category.name}</span>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                                <p className="text-white/70 leading-relaxed text-lg">{movie.overview}</p>
                            </div>

                            {movie.castMembers?.length > 0 && (
                                <div>
                                    <h2 className="text-2xl font-semibold mb-4">Cast</h2>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                        {movie.castMembers.map((cast, index) => (
                                            <div
                                                key={index}
                                                className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-colors"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                                        <FaUser className="w-5 h-5 text-white/60" />
                                                    </div>
                                                    <p className="text-white/90 font-medium">{cast.name}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {movie.directorName && (
                                <div>
                                    <h2 className="text-2xl font-semibold mb-4">Director</h2>
                                    <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                            <FaUser className="w-5 h-5 text-white/60" />
                                        </div>
                                        <p className="text-white/90 font-medium">{movie.directorName}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

