import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Genders } from '@enums/gender.enum';
import { Statuses } from '@enums/status.enum';
import { CharacterSearch } from '@models/character-search.model';
import { debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {

  public form: FormGroup

  public readonly GENDERS: string[] = Object.values(Genders)

  public readonly STATUSES: string[] = Object.values(Statuses)

  private valueChangesSubscription: Subscription

  private readonly DEBOUNCE_TIME = 1000

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.subscribeFormChanges()
  }

  ngOnDestroy(): void {
    this.valueChangesSubscription.unsubscribe()
  }


  private initForm(): void {
    const queryParams = <CharacterSearch>this.activateRoute.snapshot.queryParams
    this.form = this.formBuilder.group({
      name: [queryParams?.name ?? ''],
      status: [queryParams?.status ?? ''],
      gender: [queryParams?.gender ?? ''],
    })
  }

  private subscribeFormChanges(): void {
    this.valueChangesSubscription = this.form.valueChanges.pipe(
      debounceTime(this.DEBOUNCE_TIME),
    ).subscribe(() => {
      this.filter()
    })
  }

  private filter(): void {
    const queryParams = Object.entries(this.form.value)
        .reduce((acc, [prev, current]) => (!current ? acc : (acc[prev] = current, acc)), {});
    this.router.navigate([''], { queryParams })
  }

}
