import { TestBed } from '@angular/core/testing';
import { ToastController } from '@ionic/angular';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SavedCounter } from '../models/saved-counter';
import { CounterService } from '../services/counter.service';
import { Tab1Page } from './tab1.page';

describe('Tab1Page', () => {
  const addMock = vi.fn();
  const presentMock = vi.fn();
  const createMock = vi.fn();

  const counter: SavedCounter = {
    id: 'first',
    name: 'První',
    value: 1,
    createdAt: '2026-09-17T08:00:00.000Z',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    addMock.mockResolvedValue(undefined);
    presentMock.mockResolvedValue(undefined);
    createMock.mockResolvedValue({ present: presentMock });

    TestBed.configureTestingModule({
      providers: [
        { provide: CounterService, useValue: { add: addMock } },
        { provide: ToastController, useValue: { create: createMock } },
      ],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Tab1Page);

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should pass the saved counter to the service and show a toast', async () => {
    const fixture = TestBed.createComponent(Tab1Page);

    await fixture.componentInstance.onSaved(counter);

    expect(addMock).toHaveBeenCalledWith(counter);
    expect(createMock).toHaveBeenCalledTimes(1);
    expect(presentMock).toHaveBeenCalledTimes(1);
  });
});
