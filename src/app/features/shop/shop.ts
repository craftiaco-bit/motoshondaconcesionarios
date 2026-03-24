import { Component, inject, signal, computed } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { SeoService } from '../../core/services/seo.service';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { Breadcrumb } from '../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-shop',
  imports: [ProductCard, Breadcrumb],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class Shop {
  protected readonly productService = inject(ProductService);
  private readonly seo = inject(SeoService);
  protected readonly products = this.productService.products;

  constructor() {
    this.seo.updateMetaTags({
      title: 'Catálogo Motos Honda - Precios y Modelos 2026',
      description: 'Explora todos los modelos de motos Honda disponibles en Bogotá. Precios actualizados, fichas técnicas y financiación. CB 190, Wave 110, NX 190, Navi.',
      url: 'https://www.motoshondaconcesionarios.com/shop',
    });
  }

  protected readonly currentPage = signal(1);
  protected readonly pageSize = 12;

  protected readonly totalPages = computed(() =>
    Math.ceil(this.products().length / this.pageSize)
  );

  protected readonly paginatedProducts = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.products().slice(start, start + this.pageSize);
  });

  protected readonly pages = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1)
  );

  goToPage(page: number) {
    this.currentPage.set(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
