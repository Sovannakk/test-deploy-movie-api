import Path from "@/constants/movie-url/Path";
import {
  BookingRequest,
  BookingResponse,
  CastResponse,
  CategoryResponse,
  EditFormRequest,
  LoginRequest,
  LoginResponse,
  MovieResponse,
  NormalMovieResponse,
  RegisterRequest,
  SeatRequest,
  SeatResponse,
  ShowRequest,
  ShowResponse,
} from "@/types/Movie";
import { RestService } from "./RestService";

export const MovieService = {
  getMovieAll: async (): Promise<MovieResponse> => {
    return await RestService.get<MovieResponse>(Path.movie.list(1, 1000000));
  },
  getCatgoryAll: async (): Promise<CategoryResponse> => {
    return await RestService.get<CategoryResponse>(
      Path.category.list(1, 1000000)
    );
  },

  getCategoryByName: async (
    categoryName: string,
    page: number,
    size: number
  ): Promise<MovieResponse> => {
    return await RestService.get<MovieResponse>(
      Path.movie.categoryByName(categoryName, page, size)
    );
  },

  getAllCast: async (): Promise<CastResponse> => {
    return await RestService.get<CastResponse>(Path.cast.list(1, 1000000));
  },

  getMovieById: async (id: number): Promise<NormalMovieResponse> => {
    return await RestService.get<NormalMovieResponse>(Path.movie.getById(id));
  },

  createShow: async (data: ShowRequest): Promise<ShowResponse> => {
    return await RestService.post(Path.show.create(), data);
  },

  createSeat: async (data: SeatRequest): Promise<SeatResponse> => {
    return await RestService.post(Path.seat.create(), data);
  },

  registerBook: async (data: BookingRequest): Promise<BookingResponse> => {
    return await RestService.post(Path.booking.register(), data);
  },

  FavoritesUpdate: async (
    id: number,
    status: boolean
  ): Promise<MovieResponse> => {
    return await RestService.patch(Path.favorites.update(id, status));
  },

  getAllBooking: async (): Promise<BookingResponse> => {
    return await RestService.get<BookingResponse>(
      Path.booking.list(1, 1000000)
    );
  },

  deleteBooking: async (id: number): Promise<BookingResponse> => {
    return await RestService.delete(Path.booking.delete(id));
  },

  updateBooking: async (
    id: number,
    data: EditFormRequest
  ): Promise<BookingResponse> => {
    return await RestService.put(Path.booking.update(id), data);
  },

  AuthService: async (data: RegisterRequest): Promise<Response> => {
    return await RestService.post(Path.auth.registerMovie(), data);
  },

  LoginService: async (data: LoginRequest): Promise<LoginResponse> => {
    return await RestService.post(Path.auth.login(), data);
  },
};
