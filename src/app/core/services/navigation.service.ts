import { Injectable, signal } from '@angular/core';
import { NavLink } from '../models';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  readonly links = signal<NavLink[]>([
    { text: 'Inicio', routerLink: '/' },
    { text: 'Concesionarios Honda', routerLink: '/concesionarios-honda' },
    { text: 'Tienda', routerLink: '/shop' },
    { text: 'Servicios', routerLink: '/servicios' },
    { text: 'Contacto', routerLink: '/contacto' },
  ]);

  readonly mobileMenuOpen = signal(false);

  toggleMobileMenu() {
    this.mobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }
}
