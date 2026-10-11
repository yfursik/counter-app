import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { CounterService } from '../services/counter.service';

type SortMode = 'newest' | 'name' | 'value';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    DatePipe,
    IonButton,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonNote,
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonSpinner,
    IonTitle,
    IonToolbar,
  ],
})
export class Tab2Page implements OnInit {
  readonly counterService = inject(CounterService);

  readonly searchTerm = signal('');
  readonly sortMode = signal<SortMode>('newest');

  readonly total = computed(() =>
    this.counterService
      .counters()
      .reduce((sum, counter) => sum + counter.value, 0),
  );

  readonly visibleCounters = computed(() => {
    const term = this.searchTerm().trim().toLocaleLowerCase('cs');
    const items = this.counterService
      .counters()
      .filter((counter) => counter.name.toLocaleLowerCase('cs').includes(term));

    switch (this.sortMode()) {
      case 'name':
        return [...items].sort((a, b) => a.name.localeCompare(b.name, 'cs'));
      case 'value':
        return [...items].sort((a, b) => b.value - a.value);
      default:
        return [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }
  });

  async ngOnInit(): Promise<void> {
    await this.counterService.initialize();
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLIonSearchbarElement;
    this.searchTerm.set(target.value ?? '');
  }

  onSortChange(event: Event): void {
    const detail = (event as CustomEvent<{ value: SortMode }>).detail;
    this.sortMode.set(detail.value);
  }

  async remove(id: string): Promise<void> {
    await this.counterService.remove(id);
  }

  async clear(): Promise<void> {
    await this.counterService.clear();
  }
}
