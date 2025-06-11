'use client';
import { MovieService } from '@/service/MovieService';
import { Movie } from '@/types/Movie';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { FaArrowLeft, FaStar } from 'react-icons/fa';

const WatchPage = () => {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;
    const movieId = parseInt(id, 10);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [watches, setWatch] = useState<Movie[]>([]);
    const [isWatching, setIsWatching] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [videoError, setVideoError] = useState<string | null>(null);

    const fetchMovies = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await MovieService.getMovieAll();
            if (res && res.payload) {
                setWatch(res.payload);
            } else {
                setError("Failed to load movie data");
            }
        } catch (error) {
            setError("An error occurred while loading the movie");
            console.error("Error loading movie:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isNaN(movieId)) {
            setError("Invalid movie ID");
            return;
        }
        fetchMovies();
    }, [fetchMovies, movieId]);

    const movie = watches.find((m) => m.movieId === movieId);


    const handleVideo = useCallback(() => {
        setIsWatching(true);
        setVideoError(null);
    }, []);

    const handleRatingSubmit = useCallback(() => {
        alert('Thank you for rating the movie!');
    }, []);

    const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        const videoElement = e.target as HTMLVideoElement;
        console.error("Video playback error:", {
            error: videoElement.error,
            networkState: videoElement.networkState,
            readyState: videoElement.readyState
        });

        let errorMessage = "Failed to play video";
        if (videoElement.error) {
            switch (videoElement.error.code) {
                case MediaError.MEDIA_ERR_ABORTED:
                    errorMessage = "Video playback was aborted";
                    break;
                case MediaError.MEDIA_ERR_NETWORK:
                    errorMessage = "Network error occurred while loading video";
                    break;
                case MediaError.MEDIA_ERR_DECODE:
                    errorMessage = "Video format is not supported";
                    break;
                case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                    errorMessage = "Video source is not supported";
                    break;
            }
        }
        setVideoError(errorMessage);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p>Loading movie...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 mb-4">{error}</p>
                    <button
                        onClick={() => router.back()}
                        className="text-white/60 hover:text-white transition-colors"
                    >
                        Go back
                    </button>
                </div>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <p className="mb-4">Movie not found</p>
                    <button
                        onClick={() => router.back()}
                        className="text-white/60 hover:text-white transition-colors"
                    >
                        Go back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Video Player */}
            <div className="relative aspect-video bg-gray-900">
                {!isWatching ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button
                            onClick={handleVideo}
                            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl flex items-center space-x-2 transition-colors"
                        >
                            <span className="text-xl">▶</span>
                            <span className="font-semibold">Start Watching</span>
                        </button>
                    </div>
                ) : (
                    <div className="absolute inset-0">
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                            {movie.thriller ? (
                                <>
                                    <video
                                        controls
                                        autoPlay
                                        className="w-full h-full object-contain"
                                        src={movie.thriller}
                                        onError={handleVideoError}
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                    {videoError && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                                            <div className="text-center">
                                                <p className="text-red-500 mb-4">{videoError}</p>
                                                <button
                                                    onClick={() => setIsWatching(false)}
                                                    className="text-white/60 hover:text-white transition-colors"
                                                >
                                                    Go back
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center">
                                    <p className="text-white/60 mb-4">Video not available</p>
                                    <button
                                        onClick={() => setIsWatching(false)}
                                        className="text-white/60 hover:text-white transition-colors"
                                    >
                                        Go back
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Movie Info and Rating */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-white/60 hover:text-white mb-8 transition-colors"
                >
                    <FaArrowLeft className="mr-2" />
                    Back to Movie
                </button>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Movie Info */}
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
                        <div className="flex items-center space-x-4 text-white/60 mb-6">
                            <span>{movie.year}</span>
                            <span>•</span>
                            <span>{movie.duration}</span>
                            <span>•</span>
                        </div>
                        <p className="text-white/80 leading-relaxed">{movie.overview}</p>
                    </div>

                    {/* Rating Section */}
                    <div className="md:w-80">
                        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
                            <h2 className="text-xl font-semibold mb-4">Rate this Movie</h2>
                            <div className="flex items-center space-x-2 mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        className="focus:outline-none"
                                    >
                                        <FaStar
                                            className={`w-8 h-8 ${star <= (hoverRating || rating)
                                                ? 'text-yellow-400'
                                                : 'text-white/20'
                                                }`}
                                        />
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={handleRatingSubmit}
                                disabled={rating === 0}
                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Submit Rating
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WatchPage;