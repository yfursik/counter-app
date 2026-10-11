import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SavedCounter } from '../models/saved-counter';
import { CounterService } from '../services/counter.service';
import { Tab2Page } from './tab2.page';

describe('Tab2Page', () => {
  const counters = signal<SavedCounter[]>([
    { id: 'a', name: 'Alfa', value: 2, createdAt: '2026-09-17T08:00:00.000Z' },
    { id: 'b', name: 'Beta', value: 9, createdAt: '2026-09-17T09:00:00.000Z' },
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CounterService,
          useValue: {
            counters: counters.asReadonly(),
            initialized: signal(true).asReadonly(),
            initialize: vi.fn().mockResolvedValue(undefined),
          },
        },
      ],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Tab2Page);

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should compute total and extremes', () => {
    const component = TestBed.createComponent(Tab2Page).componentInstance;

    expect(component.total()).toBe(11);
    expect(component.extremes()).toEqual({ min: 2, max: 9 });
  });

  it('should filter by name', () => {
    const component = TestBed.createComponent(Tab2Page).componentInstance;

    component.searchTerm.set('alf');

    expect(component.visibleCounters().map((counter) => counter.id)).toEqual(['a']);
  });
});
