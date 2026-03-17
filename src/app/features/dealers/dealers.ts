import { Component, inject } from '@angular/core';
import { DealerService } from '../../core/services/dealer.service';
import { SiteConfigService } from '../../core/services/site-config.service';
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
  protected readonly dealers = this.dealerService.dealers;
}
