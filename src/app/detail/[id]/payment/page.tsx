'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaArrowLeft, FaStar } from 'react-icons/fa';

const PaymentPage = () => {
    const router = useRouter();
    const [rating, setRating] = useState<number>(0);
    const [hoverRating, setHoverRating] = useState<number>(0);
    const [paymentMethod, setPaymentMethod] = useState<string>('credit');
    const [isProcessing, setIsProcessing] = useState(false);

    const params = useParams();
    const id = params?.id as string;

    const movieId = Number(id);
    // const movie: Movie | undefined = featuredMovies.find((m) => m.id === movieId);

    // if (!movie) {
    //     return <div className="text-white p-10">Movie not found.</div>;
    // }

    // console.log(movie);

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Here you would typically integrate with a real payment processor
        alert('Payment successful! You can now watch the movie.');
        router.push(`/detail/${movieId}/watch`);
    };

    // if (!movie) return null;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <button
                    onClick={() => router.back()}
                    className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors group mb-8"
                >
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:-translate-x-1 transition-transform">
                        <FaArrowLeft className="w-5 h-5" />
                    </div>
                    <span className="text-lg">Back</span>
                </button>

                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                    <h1 className="text-3xl font-bold mb-2">Complete Your Purchase</h1>
                    {/* <p className="text-white/60 mb-8">You're about to watch: {movie.title}</p> */}

                    <div className="space-y-8">
                        {/* Rating Section */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Rate this Movie</h2>
                            <div className="flex items-center space-x-2">
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
                        </div>

                        {/* Payment Section */}
                        <form onSubmit={handlePayment} className="space-y-6">
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
                                <div className="space-y-4">
                                    <label className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="credit"
                                            checked={paymentMethod === 'credit'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-5 h-5 text-blue-500"
                                        />
                                        <span>Credit Card</span>
                                    </label>
                                    <label className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="paypal"
                                            checked={paymentMethod === 'paypal'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-5 h-5 text-blue-500"
                                        />
                                        <span>PayPal</span>
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center space-x-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? 'Processing...' : 'Pay $4.99'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;