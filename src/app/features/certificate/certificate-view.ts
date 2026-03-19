import { Component, inject, computed, PLATFORM_ID, ElementRef, viewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { CertificateService } from '../../core/services/certificate.service';
import { CertificateTemplate } from './certificate-template';

@Component({
  selector: 'app-certificate-view',
  imports: [CertificateTemplate, RouterLink],
  template: `
    @if (certificate()) {
      <!-- Action Bar -->
      <div class="bg-white border-b shadow-sm sticky top-0 z-50 print:hidden">
        <div class="max-w-[850px] mx-auto flex items-center justify-between px-4 py-3">
          <a routerLink="/certi" class="text-sm text-gray-600 hover:text-[#D5150D] flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Nuevo certificado
          </a>
          <div class="flex gap-2">
            <button
              class="px-4 py-2 bg-[#D5150D] text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
              (click)="exportPDF()"
            >
              Descargar PDF
            </button>
            <button
              class="px-4 py-2 bg-gray-700 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
              (click)="exportJPG()"
            >
              Descargar JPG
            </button>
            <button
              class="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              (click)="copyLink()"
            >
              {{ linkCopied ? 'Copiado!' : 'Copiar link' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Template -->
      <div class="bg-gray-100 py-8 print:bg-white print:py-0 overflow-x-auto">
        <div #templateContainer class="mx-auto w-fit">
          <app-certificate-template [data]="certificate()!" />
        </div>
      </div>
    } @else {
      <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="text-center">
          <h2 class="font-[Oxanium] text-2xl font-bold text-gray-400 mb-4">
            Certificado no encontrado
          </h2>
          <a routerLink="/certi" class="text-[#D5150D] font-semibold hover:underline">
            Crear nuevo certificado
          </a>
        </div>
      </div>
    }
  `,
})
export class CertificateView {
  private readonly route = inject(ActivatedRoute);
  private readonly certificateService = inject(CertificateService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly templateContainer = viewChild<ElementRef>('templateContainer');

  private readonly routeId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id') ?? ''))
  );

  readonly certificate = computed(() => {
    const id = this.routeId();
    if (!id) return null;
    return this.certificateService.getById(id)();
  });

  linkCopied = false;

  private getElement(): HTMLElement | null {
    const container = this.templateContainer()?.nativeElement as HTMLElement;
    if (!container) return null;
    return container.querySelector('.cert-page') ?? container;
  }

  /** Convert ALL images to inline data URLs so html2canvas can render them reliably */
  private async inlineAllImages(container: HTMLElement): Promise<Array<{ img: HTMLImageElement; originalSrc: string }>> {
    const allImages = Array.from(container.querySelectorAll('img'));
    const restored: Array<{ img: HTMLImageElement; originalSrc: string }> = [];

    for (const img of allImages) {
      const originalSrc = img.src;
      try {
        const w = (img.naturalWidth || img.clientWidth || 260) * 2;
        const h = (img.naturalHeight || img.clientHeight || 80) * 2;
        const pngDataUrl = await this.imgToDataUrl(img.src, w, h);
        img.src = pngDataUrl;
        restored.push({ img, originalSrc });
      } catch {
        // keep original if conversion fails
      }
    }

    return restored;
  }

  private imgToDataUrl(src: string, width: number, height: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width || img.naturalWidth || 520;
        canvas.height = height || img.naturalHeight || 160;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('no context');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  async exportPDF() {
    if (!isPlatformBrowser(this.platformId)) return;
    const element = this.getElement();
    if (!element) return;

    const original = element.style.minHeight;
    element.style.minHeight = 'unset';

    // Rasterize SVG signatures before capture
    const restored = await this.inlineAllImages(element);

    const html2canvas = (await import('html2canvas-pro')).default;
    const { jsPDF } = await import('jspdf');

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#f5f3f0',
    });

    // Restore original SVG sources
    for (const r of restored) r.img.src = r.originalSrc;
    element.style.minHeight = original;

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    // Letter landscape: 279.4 × 215.9 mm
    const imgWidth = 279.4;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const pdf = new jsPDF('l', 'mm', 'letter');
    pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
    pdf.save(`certificado-cuenta-${this.certificate()?.personName?.replace(/\s+/g, '-') ?? 'honda'}.pdf`);
  }

  async exportJPG() {
    if (!isPlatformBrowser(this.platformId)) return;
    const element = this.getElement();
    if (!element) return;

    const original = element.style.minHeight;
    element.style.minHeight = 'unset';

    // Rasterize SVG signatures before capture
    const restored = await this.inlineAllImages(element);

    const html2canvas = (await import('html2canvas-pro')).default;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#f5f3f0',
    });

    // Restore original SVG sources
    for (const r of restored) r.img.src = r.originalSrc;
    element.style.minHeight = original;

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `certificado-cuenta-${this.certificate()?.personName?.replace(/\s+/g, '-') ?? 'honda'}.jpg`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 'image/jpeg', 0.95);
  }

  copyLink() {
    if (!isPlatformBrowser(this.platformId)) return;
    navigator.clipboard.writeText(window.location.href);
    this.linkCopied = true;
    setTimeout(() => (this.linkCopied = false), 2000);
  }
}
