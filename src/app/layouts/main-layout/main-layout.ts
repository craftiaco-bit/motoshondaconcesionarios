import { Component } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';
import { WhatsappButton } from '../../shared/components/whatsapp-button/whatsapp-button';

@Component({
  selector: 'app-main-layout',
  imports: [Header, Footer, WhatsappButton],
  template: `
    <app-header />
    <main class="min-h-screen">
      <ng-content />
    </main>
    <app-footer />
    <app-whatsapp-button />
  `,
  styles: `:host { display: block; }`,
})
export class MainLayout {}
