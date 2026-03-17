import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavigationService } from '../../../core/services/navigation.service';
import { SiteConfigService } from '../../../core/services/site-config.service';
import { WhatsappCta } from '../whatsapp-cta/whatsapp-cta';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, WhatsappCta],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  protected readonly nav = inject(NavigationService);
  protected readonly site = inject(SiteConfigService);
  protected readonly currentYear = new Date().getFullYear();
}
