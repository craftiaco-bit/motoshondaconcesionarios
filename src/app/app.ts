import { Component, inject, computed } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { MainLayout } from './layouts/main-layout/main-layout';

/** Routes that render without any layout (no header, footer, whatsapp button) */
const BARE_ROUTES = ['/factu/', '/invoice/', '/certi/'];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainLayout],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly router = inject(Router);

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects)
    ),
    { initialValue: this.router.url }
  );

  readonly showLayout = computed(() => {
    const url = this.currentUrl();
    return !BARE_ROUTES.some((prefix) => url.startsWith(prefix));
  });
}
