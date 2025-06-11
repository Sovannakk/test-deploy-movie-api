import { MovieService } from "@/service/MovieService";
import { MovieDetailComponent } from "./MovieDetailComponent";

type PageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function Page({ params }: PageProps) {
    const { id } = await params;
    const responseMovie = await MovieService.getMovieById(Number(id));
    return <MovieDetailComponent movieData={responseMovie?.payload} />
}