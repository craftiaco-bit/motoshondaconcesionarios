import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SiteConfigService } from '../../core/services/site-config.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  protected readonly site = inject(SiteConfigService);
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.updateMetaTags({
      title: 'Contacto - Concesionario Honda Bogotá',
      description: 'Contacta al concesionario Honda en Bogotá. WhatsApp, teléfono, correo y dirección. Av. 1 de Mayo #29-62, Antonio Nariño.',
      url: 'https://www.motoshondaconcesionarios.com/contacto',
    });
  }

  protected readonly formData = signal({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  protected readonly submitted = signal(false);

  onSubmit() {
    // TODO: integrate with API endpoint
    this.submitted.set(true);
  }

  updateField(field: string, value: string) {
    this.formData.update((data) => ({ ...data, [field]: value }));
  }
}
