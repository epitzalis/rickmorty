import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpParamsOptions } from '@angular/common/http'
import { Observable, switchMap } from 'rxjs';
import { map } from 'rxjs';
import { Character } from '@models/character.model';
import { Episode } from '@models/episode.model';
import { forkJoin } from 'rxjs';
import { CharacterSearch } from '@models/character-search.model';


@Injectable({
  providedIn: 'root'
})
export class RickMortyApiService {

  private readonly URL: string = 'https://rickandmortyapi.com/api'

  private readonly NUMBER_CHARACTERS: number = 5

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  public findCharacters(search: CharacterSearch): Observable<Character[]> {
    const params = new HttpParams({
      fromObject: { ...search },
    })
    return this.httpClient.get<{ results: Character[] }>(`${this.URL}/character`, { params })
      .pipe(
        switchMap(resp => {
          const characters = resp.results.slice(0, this.NUMBER_CHARACTERS)
          return forkJoin(this.getEpisodesRequest(characters)).pipe(
            map((episodes: Episode[]) => {
              return this.unifyCharacters(characters, episodes)
            })
          )
        })
      )
  }

  private findEpisode(episode: string): Observable<Episode> {
    return this.httpClient.get<Episode>(`${this.URL}/episode/${episode}`)
  }

  private getEpisodesRequest(characters: Character[]): Observable<Episode>[] {
    return characters.map((character: Character) => {
      const lastEpisodeId = character.episode.at(-1)?.split("/")?.pop()
      return this.findEpisode(lastEpisodeId)
    })
  }

  private unifyCharacters(characters: Character[], episodes: Episode[]): Character[] {
    return characters.map((item: Character, index: number) => {
      return {
        ...item,
        lastEpisodeName: episodes.at(index)?.name
      }
    })
  }

}
