import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  template: `
    <nav aria-label="Breadcrumb" class="text-sm text-text-light py-3">
      <ol class="flex items-center gap-1 flex-wrap">
        <li><a routerLink="/" class="hover:text-primary transition-colors">Inicio</a></li>
        @for (item of items(); track item.label) {
          <li class="flex items-center gap-1">
            <span class="mx-1">/</span>
            @if (item.url) {
              <a [routerLink]="item.url" class="hover:text-primary transition-colors">{{ item.label }}</a>
            } @else {
              <span class="text-text">{{ item.label }}</span>
            }
          </li>
        }
      </ol>
    </nav>
  `,
})
export class Breadcrumb {
  readonly items = input<BreadcrumbItem[]>([]);
}
