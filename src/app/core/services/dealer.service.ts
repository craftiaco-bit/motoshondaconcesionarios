import { Injectable, signal } from '@angular/core';
import { Dealer } from '../models';

const WHATSAPP = '573159923447';
const PHONE = '3181269436';

@Injectable({ providedIn: 'root' })
export class DealerService {
  readonly dealers = signal<Dealer[]>([
    {
      id: 1,
      name: 'Pereira',
      address: 'CRA 12 No. 20 75',
      city: 'Pereira',
      phone: PHONE,
      whatsapp: WHATSAPP,
      hours: 'Lunes a viernes: 8am – 8pm\nSábados:9am- 6pm',
      featured: true,
    },
    {
      id: 2,
      name: 'Cúcuta',
      address: 'Calle 7 # 0 – 75',
      city: 'Cúcuta',
      phone: PHONE,
      whatsapp: WHATSAPP,
      hours: 'Lunes a viernes: 8am – 8pm\nSábados:9am- 6pm',
    },
    {
      id: 3,
      name: 'Popayán',
      address: 'Cra 17 No 7 75',
      city: 'Popayán',
      phone: PHONE,
      whatsapp: WHATSAPP,
      hours: 'Lunes a viernes: 8am – 8pm\nSábados:9am- 6pm',
    },
    {
      id: 4,
      name: 'Cali',
      address: 'Cra. 27 # 72 Y 32',
      city: 'Cali',
      phone: PHONE,
      whatsapp: WHATSAPP,
      hours: 'Lunes a viernes: 8am – 8pm\nSábados:9am- 6pm',
    },
    {
      id: 5,
      name: 'Bogotá',
      address: 'Ak. 9 #127 B-08',
      city: 'Bogotá',
      phone: PHONE,
      whatsapp: WHATSAPP,
      hours: 'Lunes a viernes: 8am – 8pm\nSábados:9am- 6pm',
    },
    {
      id: 6,
      name: 'Bucaramanga',
      address: 'CRA 27 #52-64',
      city: 'Bucaramanga',
      phone: PHONE,
      whatsapp: WHATSAPP,
      hours: 'Lunes a viernes: 8am – 8pm\nSábados:9am- 6pm',
    },
  ]);

  getById(id: number) {
    return this.dealers().find((d) => d.id === id) ?? null;
  }
}
