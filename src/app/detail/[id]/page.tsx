import { MovieService } from "@/service/MovieService";
import { MovieDetailComponent } from "./MovieDetailComponent";

type PageProps = {
    params: {
        id: string;
    };
};

export default async function Page({ params }: PageProps) {
    const idNumber = Number(params.id);
    const responseMovie = await MovieService.getMovieById(idNumber);
    return <MovieDetailComponent movieData={responseMovie?.payload} />
}
