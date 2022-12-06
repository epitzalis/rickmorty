import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RickMortyApiService } from './rick-morty-api.service';
import { Character } from '@models/character.model';

const response: { results: Character[] } = {
  results: [
    {
      name: "Ghost in a Jar",
      status: "Dead",
      species: "Alien",
      location: {
        name: "Earth (Replacement Dimension)",
      },
      image: "https://rickandmortyapi.com/api/character/avatar/141.jpeg",
      episode: [
        "https://rickandmortyapi.com/api/episode/15"
      ],
    },
    {
      name: "Hole in the Wall Where the Men Can See it All",
      status: "unknown",
      species: "unknown",
      location: {
        name: "Interdimensional Cable",
      },
      image: "https://rickandmortyapi.com/api/character/avatar/157.jpeg",
      episode: [
        "https://rickandmortyapi.com/api/episode/8"
      ],
    },
  ]
}


describe('RickMortyApiService', () => {
  let service: RickMortyApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(RickMortyApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('findCharacters return a list of results', () => {
    const url = 'https://rickandmortyapi.com/api'
    service.findCharacters(null).subscribe((resp: Character[]) => {
        expect(resp).toEqual(response.results);
    });
    const reqCharacter = httpMock.expectOne(`${url}/character`);
    expect(reqCharacter.request.method).toBe('GET');
    reqCharacter.flush(response);
  });
});
