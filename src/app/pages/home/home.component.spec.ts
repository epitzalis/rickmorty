import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RickMortyApiService } from '@services/rick-morty-api.service';
import { throwError, of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [RickMortyApiService],
      declarations: [ HomeComponent ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('findCharacters call api service', () => {
    component.isLoading = true
    const service = TestBed.inject(RickMortyApiService);
    const spy = spyOn(service, 'findCharacters').and.callFake( () => of([]));
    component['findCharacters'](null);
    expect(spy).toHaveBeenCalled()
  });

  it('findCharacters disable loader when get the response', () => {
    component.isLoading = true
    const service = TestBed.inject(RickMortyApiService);
    spyOn(service, 'findCharacters').and.callFake( () => of([]));
    component['findCharacters'](null);
    expect(component.isLoading).toBeFalse()
  });

});
