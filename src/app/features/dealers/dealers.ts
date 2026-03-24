import { Component, inject } from '@angular/core';
import { DealerService } from '../../core/services/dealer.service';
import { SiteConfigService } from '../../core/services/site-config.service';
import { SeoService } from '../../core/services/seo.service';
import { Breadcrumb } from '../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-dealers',
  imports: [Breadcrumb],
  templateUrl: './dealers.html',
  styleUrl: './dealers.css',
})
export class Dealers {
  protected readonly dealerService = inject(DealerService);
  protected readonly site = inject(SiteConfigService);
  private readonly seo = inject(SeoService);
  protected readonly dealers = this.dealerService.dealers;

  constructor() {
    this.seo.updateMetaTags({
      title: 'Concesionarios Honda Colombia - Bogotá, Cali, Medellín',
      description: 'Encuentra tu concesionario Honda más cercano en Colombia. Bogotá, Cali, Pereira, Cúcuta, Bucaramanga. Dirección, teléfono y horarios.',
      url: 'https://www.motoshondaconcesionarios.com/concesionarios-honda',
    });
  }
}
