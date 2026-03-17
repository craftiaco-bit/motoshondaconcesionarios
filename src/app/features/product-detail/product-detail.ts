import { Component, inject, signal, computed } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ProductService } from '../../core/services/product.service';
import { SiteConfigService } from '../../core/services/site-config.service';
import { ImageGallery } from '../../shared/components/image-gallery/image-gallery';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { Breadcrumb } from '../../shared/components/breadcrumb/breadcrumb';
import { WhatsappCta } from '../../shared/components/whatsapp-cta/whatsapp-cta';

@Component({
  selector: 'app-product-detail',
  imports: [KeyValuePipe, ImageGallery, ProductCard, Breadcrumb, WhatsappCta],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  protected readonly site = inject(SiteConfigService);

  protected readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')),
    { initialValue: '' }
  );

  protected readonly product = computed(() => {
    const s = this.slug();
    return s ? this.productService.getBySlug(s)() : null;
  });

  protected readonly relatedProducts = computed(() => {
    const s = this.slug();
    return s ? this.productService.getRelated(s, 4)() : [];
  });

  protected readonly parsedDescription = computed(() => {
    const p = this.product();
    if (!p) return { subtitle: '', body: '' };
    return ProductService.parseDescription(p.description);
  });

  protected readonly activeTab = signal<'description' | 'specs'>('description');

  protected readonly breadcrumbItems = computed(() => {
    const p = this.product();
    return [
      { label: 'Tienda', url: '/shop' },
      { label: p?.name ?? '...' },
    ];
  });
}
