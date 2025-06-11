import { MovieService } from "@/service/MovieService";
import { MovieDetailComponent } from "./MovieDetailComponent";
interface PageProps {
    params: { id: number };
}
export default async function Page({ params }: PageProps) {
    const { id } = await params;
    const responseMovie = await MovieService.getMovieById(id);
    return <MovieDetailComponent movieData={responseMovie?.payload} />
}
