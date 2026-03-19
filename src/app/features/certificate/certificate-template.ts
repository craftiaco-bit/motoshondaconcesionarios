import { Component, input, inject, signal, effect, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Certificate } from '../../core/models/certificate.model';

@Component({
  selector: 'app-certificate-template',
  template: `
    <div class="cert-page" id="certificate-render">
      <!-- HONDA HEADER BAR -->
      <div class="header-bar">
        <div class="header-left">
          <img src="/Honda_Logo.svg.png" alt="Honda" class="header-honda-logo" />
          <span class="header-slogan">Come ride with us</span>
        </div>
      </div>

      <!-- WATERMARK -->
      <div class="watermark">
        <img src="/Honda_Logo.svg.png" alt="" />
      </div>

      <!-- TITLE -->
      <h1 class="cert-title">CERTIFICADO DE CUENTA</h1>

      <!-- BODY TEXT -->
      <div class="cert-body">
        <p class="body-text">
          <strong>HONDA-SUPER MOTOS,</strong> se permite informar que
          <strong>{{ data().personName }}</strong> identificado(a) con CC.
          <strong>{{ data().documentNumber }}</strong> se encuentra encargada y
          autorizado(a) del área de cartera de la compañía y figura como titular
          de la cuenta.
        </p>

        <!-- ACCOUNT INFO -->
        <div class="account-info">
          <p><strong>CUENTA:</strong> {{ data().accountBank }}</p>
          <p><strong>TIPO DE CUENTA:</strong> {{ data().accountType }}</p>
          <p><strong>No:</strong> {{ data().accountNumber }}</p>
        </div>
      </div>

      <!-- SIGNATURE -->
      <div class="signature-area">
        <div class="signature-line"></div>
        <p class="signer-name">{{ data().signerName }}</p>
        <p class="signer-role"><em>{{ data().signerRole }}</em></p>
      </div>

      <!-- FOOTER -->
      <div class="cert-footer">
        <div class="footer-left">
          <div class="gsm-badge">
            <span class="gsm-text">GSM</span>
            <span class="gsm-sub">Grupo Supermotos</span>
          </div>
        </div>
        <div class="footer-center">
          <p class="disclaimer">
            *Importante: este certificado solo hace referencia a los productos
            mencionados anteriormente.
          </p>
        </div>
      </div>

      <!-- QR -->
      <div class="qr-area">
        @if (qrSvg()) {
          <div class="qr-image" [innerHTML]="qrSvg()"></div>
          <span class="qr-label">Verificar<br/>certificado</span>
        }
      </div>
    </div>
  `,
  styles: `
    /* ========== RESET ========== */
    :host .cert-page :is(h1, h2, h3, h4, h5, h6) {
      letter-spacing: 0;
      line-height: 1.3;
      text-transform: none;
      margin: 0;
    }
    :host p { margin-block-end: 0; }

    /* ========== PAGE ========== */
    .cert-page {
      width: 816px;
      min-height: 1056px;
      margin: 0 auto;
      background: #f2f0ed;
      font-family: 'Poppins', Arial, sans-serif;
      color: #222;
      font-size: 16px;
      line-height: 1.6;
      display: flex;
      flex-direction: column;
      box-shadow: 0 2px 20px rgba(0,0,0,0.12);
      position: relative;
      overflow: hidden;
      padding: 0;
    }

    /* ========== WATERMARK ========== */
    .watermark {
      position: absolute;
      top: 45%;
      right: -40px;
      transform: translateY(-50%);
      z-index: 0;
      pointer-events: none;
    }
    .watermark img {
      width: 480px;
      height: auto;
      opacity: 0.07;
    }

    /* ========== HEADER BAR ========== */
    .header-bar {
      background: #D5150D;
      padding: 16px 40px;
      display: flex;
      align-items: center;
      z-index: 1;
    }
    .header-left {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .header-honda-logo {
      height: 40px;
      width: auto;
      filter: brightness(0) invert(1);
    }
    .header-slogan {
      font-family: 'Poppins', sans-serif;
      font-size: 16px;
      font-style: italic;
      color: #fff;
      font-weight: 400;
      letter-spacing: 0.5px;
    }

    /* ========== TITLE ========== */
    .cert-title {
      font-family: 'Oxanium', sans-serif;
      font-size: 46px;
      font-weight: 800;
      color: #D5150D;
      text-align: center;
      margin: 50px 0 40px;
      font-style: italic;
      letter-spacing: 1px;
      z-index: 1;
      position: relative;
    }

    /* ========== BODY ========== */
    .cert-body {
      flex: 1;
      padding: 0 70px;
      z-index: 1;
      position: relative;
    }
    .body-text {
      font-size: 20px;
      line-height: 2;
      text-align: justify;
      color: #222;
      margin: 0 0 40px;
    }

    /* ========== ACCOUNT INFO ========== */
    .account-info {
      padding-left: 60px;
    }
    .account-info p {
      font-size: 20px;
      font-weight: 700;
      color: #D5150D;
      margin: 6px 0;
      line-height: 1.6;
    }

    /* ========== SIGNATURE ========== */
    .signature-area {
      text-align: center;
      margin: 60px 0 30px;
      z-index: 1;
      position: relative;
    }
    .signature-line {
      width: 260px;
      height: 1px;
      background: #222;
      margin: 0 auto 6px;
    }
    .signer-name {
      font-family: 'Poppins', sans-serif;
      font-size: 16px;
      font-weight: 700;
      color: #222;
      margin: 0;
    }
    .signer-role {
      font-family: 'Poppins', sans-serif;
      font-size: 14px;
      color: #444;
      margin: 2px 0 0;
    }

    /* ========== FOOTER ========== */
    .cert-footer {
      margin-top: auto;
      padding: 20px 40px 24px;
      display: flex;
      align-items: flex-end;
      gap: 30px;
      z-index: 1;
      position: relative;
    }
    .gsm-badge {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    .gsm-text {
      font-family: 'Oxanium', sans-serif;
      font-size: 36px;
      font-weight: 900;
      color: #1A3A8F;
      line-height: 1;
      letter-spacing: 1px;
    }
    .gsm-sub {
      font-family: 'Poppins', sans-serif;
      font-size: 13px;
      font-weight: 700;
      color: #D5150D;
      letter-spacing: 0.3px;
    }
    .footer-center {
      flex: 1;
    }
    .disclaimer {
      font-size: 13px;
      font-style: italic;
      color: #555;
      text-align: center;
      margin: 0;
      line-height: 1.5;
    }

    /* ========== QR ========== */
    .qr-area {
      position: absolute;
      bottom: 20px;
      right: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      z-index: 2;
    }
    .qr-image { width: 80px; height: 80px; }
    .qr-image ::ng-deep svg { width: 100%; height: 100%; }
    .qr-label {
      font-size: 7px;
      text-align: center;
      color: #888;
      font-weight: 600;
      text-transform: uppercase;
      line-height: 1.3;
    }
  `,
})
export class CertificateTemplate {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly sanitizer = inject(DomSanitizer);
  readonly data = input.required<Certificate>();
  readonly qrSvg = signal<SafeHtml | null>(null);

  constructor() {
    effect(() => {
      const c = this.data();
      if (c && isPlatformBrowser(this.platformId)) {
        this.generateQR(c.id);
      }
    });
  }

  private async generateQR(id: string) {
    try {
      const mod = await import('qrcode');
      const toString = mod.toString ?? mod.default?.toString;
      if (!toString) return;
      const url = `${window.location.origin}/certi/${id}`;
      const svg: string = await toString(url, {
        type: 'svg',
        width: 160,
        margin: 1,
        color: { dark: '#222222', light: '#f2f0ed' },
      });
      this.qrSvg.set(this.sanitizer.bypassSecurityTrustHtml(svg));
    } catch (e) {
      console.error('QR generation failed:', e);
    }
  }
}
