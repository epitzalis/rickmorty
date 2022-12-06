export interface Character {
  name: string;
  status: string;
  species: string;
  image: string;
  location: { name: string }
  episode: string[];
  lastEpisodeName?: string;
}
