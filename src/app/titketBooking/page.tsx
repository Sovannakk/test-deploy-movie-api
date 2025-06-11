'use client'
import { MovieService } from "@/service/MovieService";
import { Booking, EditFormRequest } from "@/types/Movie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    FaClock,
    FaEdit,
    FaEnvelope,
    FaSearch,
    FaTicketAlt,
    FaTrashAlt,
    FaUser,
} from "react-icons/fa";
const Page = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();
    const [bookingData, setBookingData] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ────── Delete & Edit modal state ──────
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [editForm, setEditForm] = useState({ fullName: "", email: "" });

    const fetchBookings = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await MovieService.getAllBooking();
            if (response && response.payload) {
                setBookingData(response.payload);
            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
            setError("Failed to load bookings. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    // ────── Helpers ──────
    const formatDate = (dateString?: string) => {
        if (!dateString) return "Date not available";
        try {
            return new Date(dateString).toLocaleDateString();
        } catch {
            return "Invalid date";
        }
    };


    const filteredBookings = bookingData.filter((booking) =>
        booking.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) {
        return (
            <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white/60">Loading bookings...</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                        <svg
                            className="w-8 h-8 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                    <p className="text-white/60">{error}</p>
                    <button
                        onClick={fetchBookings}
                        className="mt-4 px-6 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </main>
        );
    }

    const openDeleteModal = (booking: Booking) => {
        console.log("Delete id : ", booking.bookingId);
        setSelectedBooking(booking);
        setIsDeleteOpen(true);

    };

    const openEditModal = (booking: Booking) => {
        console.log("Id", booking.bookingId);
        setSelectedBooking(booking);
        setEditForm({ fullName: booking.fullName, email: booking.email });
        setIsEditOpen(true);
    };



    const handleEditSave = async () => {
        if (!selectedBooking) return;
        const id = selectedBooking.bookingId;
        console.log("ID", id);
        if (!id) return;
        const request: EditFormRequest = {
            fullName: editForm.fullName,
            email: editForm.email,
            totalPrice: selectedBooking.totalPrice,
            showId: selectedBooking.show.showId,
            seatIds: selectedBooking.seats.map((seat) => seat.seatId),

        }
        try {
            const res = await MovieService.updateBooking(id, request);

            if (res !== null) {
                // Update bookingData with the new edited form
                setBookingData(prev =>
                    prev.map(b =>
                        b.bookingId === id
                            ? { ...b, ...editForm }
                            : b
                    )
                );
                setIsEditOpen(false);
            } else {
                console.error("Update failed: No response received");
            }
        } catch (error) {
            console.error("Update failed:", error);
        }

    };


    const handleDelete = async () => {
        const id = selectedBooking?.bookingId as number;
        if (!id) return;
        const res = await MovieService.deleteBooking(id)
        console.log("data res", res);
        if (res.status === "OK") {
            setBookingData((prev) => prev.filter((b) => b.bookingId !== id));
            setIsDeleteOpen(false);
        } else {
            console.log("error")
        }

    }

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
                        className="inline-flex items-center mb-8 hover:opacity-80 transition-opacity cursor-pointer group"
                        onClick={() => router.push("/home")}
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
                        <span className="text-lg text-white/80 cursor-pointer">Back to Home</span>
                    </div>

                    {/* Header Content */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0 mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70">
                            My Bookings {filteredBookings.length}
                        </h1>

                        {/* Search Section */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            <div className="relative flex-grow md:flex-grow-0">
                                <input
                                    type="text"
                                    placeholder="Search by name..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full md:w-80 px-6 py-3.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl
                    focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20
                    placeholder-white/40 transition-all duration-300"
                                />
                                <FaSearch className="absolute right-4 top-4 text-white/40" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bookings Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBookings.length > 0 ? (
                            filteredBookings.map((booking) => (
                                <div
                                    key={booking.bookingId}
                                    className="group bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300 border border-white/10 hover:border-white/20 relative"
                                >
                                    {/* ── Action Buttons ── */}
                                    <div className="absolute top-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => openEditModal(booking)}
                                            className="p-2 rounded-full bg-white/10 hover:bg-green-500/20"
                                        >
                                            <FaEdit className="w-4 h-4 text-green-400" />
                                        </button>
                                        <button
                                            onClick={() => openDeleteModal(booking)}
                                            className="p-2 rounded-full bg-white/10 hover:bg-red-500/20"
                                        >
                                            <FaTrashAlt className="w-4 h-4 text-red-400" />
                                        </button>
                                    </div>

                                    {/* Booking Content */}
                                    <div className="p-6">
                                        {/* Booking ID and Price */}
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                                                    <FaTicketAlt className="w-6 h-6 text-blue-400" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white/90">
                                                        Booking #{booking.bookingId}
                                                    </h3>
                                                    <p className="text-white/60 text-sm">
                                                        {formatDate(booking.show.showDate)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="bg-green-500/20 px-4 py-2 rounded-full">
                                                <span className="text-green-400 font-medium">
                                                    ${booking.totalPrice}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Booking Details */}
                                        <div className="space-y-4">
                                            <div className="flex items-center text-white/80">
                                                <FaUser className="w-5 h-5 mr-3 text-white/60" />
                                                <span>{booking.fullName || "Name not available"}</span>
                                            </div>
                                            <div className="flex items-center text-white/80">
                                                <FaEnvelope className="w-5 h-5 mr-3 text-white/60" />
                                                <span>{booking.email || "Email not available"}</span>
                                            </div>
                                            <div className="flex items-center text-white/80">
                                                <FaClock className="w-5 h-5 mr-3 text-white/60" />
                                                <span>{booking.show.showTime || "Time not available"}</span>
                                            </div>
                                        </div>

                                        {/* Seat Information */}
                                        <div className="mt-6 pt-6 border-t border-white/10">
                                            <div className="flex items-center justify-between mb-3">
                                                <h4 className="text-white/60 text-sm">Seat Information</h4>
                                                <span className="text-white/40 text-sm">
                                                    {booking.seats.length || 0} seats
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {booking.seats?.map((seat) => (
                                                    <div
                                                        key={seat.seatId}
                                                        className="bg-white/10 px-3 py-1.5 rounded-lg text-sm hover:bg-white/20 transition-colors cursor-default"
                                                    >
                                                        Row {seat.row} - Seat {seat.number}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center py-20">
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                    <FaSearch className="w-8 h-8 text-white/20" />
                                </div>
                                <p className="text-xl text-white/40 font-medium">
                                    No bookings found matching your search.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ───────────────── Delete Confirmation Modal ───────────────── */}
            {isDeleteOpen && selectedBooking && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
                    <div className="bg-[#0a0a0a] rounded-2xl p-8 max-w-md w-full border border-white/10">
                        <h2 className="text-xl font-semibold text-white/90 mb-4">Delete Booking</h2>
                        <p className="text-white/70 mb-6">
                            Are you sure you want to delete booking <span className="font-semibold">#{selectedBooking.bookingId}</span>? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsDeleteOpen(false)}
                                className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/70"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-5 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ───────────────── Edit Booking Modal ───────────────── */}
            {isEditOpen && selectedBooking && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 overflow-y-auto">
                    <div className="bg-[#0a0a0a] rounded-2xl p-8 max-w-lg w-full border border-white/10">
                        <h2 className="text-xl font-semibold text-white/90 mb-6">Edit Booking #{selectedBooking.bookingId}</h2>
                        <div className="space-y-5">
                            <div>
                                <label className="block mb-2 text-white/70 text-sm">Full Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                                    value={editForm.fullName}
                                    onChange={(e) =>
                                        setEditForm((prev) => ({ ...prev, fullName: e.target.value }))
                                    }
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-white/70 text-sm">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                                    value={editForm.email}
                                    onChange={(e) =>
                                        setEditForm((prev) => ({ ...prev, email: e.target.value }))
                                    }
                                />
                            </div>
                            {/* More editable fields (e.g., seats) could be added here */}
                        </div>

                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                onClick={() => setIsEditOpen(false)}
                                className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/70"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEditSave}
                                className="px-5 py-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Page;