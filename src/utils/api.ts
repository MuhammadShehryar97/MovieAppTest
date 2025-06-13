import Config from 'react-native-config';

export async function fetchUpcomingMovies() {
  console.log(Config.BASE_API_URL, Config.API_KEY);
  const response = await fetch(`${Config.BASE_API_URL}movie/upcoming?api_key=${Config.API_KEY}`);
  return await response.json();
} 

export async function fetchMovieDetails(movie_id: string) {
  const response = await fetch(`${Config.BASE_API_URL}movie/${movie_id}?api_key=${Config.API_KEY}`)
  const data = await response.json();
  return data;
}

export async function fetchMovieTrailer(movie_id: string) {
  const response = await fetch(`${Config.BASE_API_URL}movie/${movie_id}/videos?api_key=${Config.API_KEY}`);
  const data = await response.json();
  return data;
} 

export async function searchMoviesByName(query: string) {
  const response = await fetch(`${Config.BASE_API_URL}search/movie?api_key=${Config.API_KEY}&query=${encodeURIComponent(query)}`);
  return await response.json();
}