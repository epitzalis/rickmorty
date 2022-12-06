import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { FiltersComponent } from './filters.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

const routerSpy = { navigate: jasmine.createSpy('navigate') };

const activatedRouteMock = {
  snapshot: {
    queryParams: {
      name: 'rick',
      gender: 'female',
    }
  }
};

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltersComponent ],
      imports: [
        TranslateModule.forRoot(),
        MatSelectModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('filter get query params', () => {
    expect(component).toBeTruthy();
  });

  it('form is initialized with the values of the queryParams', () => {
    expect(component.form.get('name').value)
          .toBe(activatedRouteMock.snapshot.queryParams.name)
    expect(component.form.get('gender').value)
          .toBe(activatedRouteMock.snapshot.queryParams.gender)
    expect(component.form.get('status').value)
          .toBe('')
  });

  it('filter do a navigation', () => {
    component["filter"]()
    expect(routerSpy.navigate).toHaveBeenCalled()
  });
});
