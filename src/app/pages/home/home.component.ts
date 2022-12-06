import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterSearch } from '@models/character-search.model';
import { RickMortyApiService } from '@services/rick-morty-api.service';
import { Character } from '@models/character.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public characters: Character[];

  public isLoading: boolean;

  constructor(
    private readonly rickMortyApiService: RickMortyApiService,
    private readonly activateRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((resp: CharacterSearch) => {
      this.findCharacters(resp);
    })
  }

  private findCharacters(params: CharacterSearch): void {
    this.isLoading = true;
    this.rickMortyApiService.findCharacters(params).subscribe(
      {
        next: resp => {
          this.characters = resp
          this.isLoading = false;
        },
        error: () => {
          this.characters = []
          this.isLoading = false;
        }
      }
    );
  }

}
