import { Component, inject, signal } from '@angular/core';
import { SiteConfigService } from '../../../core/services/site-config.service';

@Component({
  selector: 'app-whatsapp-button',
  templateUrl: './whatsapp-button.html',
  styleUrl: './whatsapp-button.css',
})
export class WhatsappButton {
  protected readonly site = inject(SiteConfigService);
  protected readonly expanded = signal(false);

  toggle() {
    this.expanded.update((v) => !v);
  }
}
