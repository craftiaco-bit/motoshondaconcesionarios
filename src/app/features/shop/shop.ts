import { Component, inject, signal, computed } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
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
  protected readonly products = this.productService.products;

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
