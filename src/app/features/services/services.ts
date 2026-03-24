import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteConfigService } from '../../core/services/site-config.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-services',
  imports: [RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {
  protected readonly site = inject(SiteConfigService);
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.updateMetaTags({
      title: 'Servicio Técnico Honda Bogotá - Mantenimiento y Repuestos',
      description: 'Servicio técnico oficial Honda en Bogotá. Mantenimiento preventivo, repuestos originales y garantía Honda. Agenda tu cita hoy.',
      url: 'https://www.motoshondaconcesionarios.com/servicios',
    });
  }
}
