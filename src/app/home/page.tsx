import HomeComponent from "@/components/HomeComponent";
import { MovieService } from "@/service/MovieService";


export default async function Home() {
    const responseMovieAll = await MovieService.getMovieAll();
    const responseCategory = await MovieService.getCatgoryAll();
    const responseBooking = await MovieService.getAllBooking();
    return (
        <>
            <HomeComponent responseMovieAll={responseMovieAll} responseCategory={responseCategory} responseBooking={responseBooking} />
        </>
    );
}