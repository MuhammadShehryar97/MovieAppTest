export default interface MovieInterface {
    id: string;
    title: string;
    backdrop_path: string;
    release_date: string;
    overview: string;
    genres: { id: number; name: string }[];
    homepage: string;
};