import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { SiteConfigService } from '../../../core/services/site-config.service';

@Component({
  selector: 'app-whatsapp-cta',
  imports: [],
  templateUrl: './whatsapp-cta.html',
  styleUrl: './whatsapp-cta.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhatsappCta {
  protected readonly site = inject(SiteConfigService);
}
