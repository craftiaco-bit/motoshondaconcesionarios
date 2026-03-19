import { Component, input } from '@angular/core';
import { Certificate } from '../../core/models/certificate.model';

@Component({
  selector: 'app-certificate-template',
  template: `
    <div class="cert-page" id="certificate-render">
      <!-- WATERMARK wing -->
      <div class="watermark">
        <img src="/Honda_Logo.svg.png" alt="" />
      </div>

      <!-- HONDA HEADER BAR -->
      <div class="header-bar">
        <div class="header-inner">
          <img src="/Honda_Logo.svg.png" alt="Honda" class="header-logo" />
          <span class="header-slogan">Come ride with us</span>
        </div>
      </div>

      <!-- CONTENT -->
      <div class="content">
        <!-- TITLE -->
        <h1 class="cert-title">CERTIFICADO DE CUENTA</h1>

        <!-- BODY CARD -->
        <div class="body-card">
          <p class="body-text">
            <strong>HONDA-SUPER MOTOS,</strong> se permite informar que
            <strong>{{ data().personName }}</strong>
            identificado(a) con CC. <strong>{{ data().documentNumber }}</strong>
            se encuentra encargada y autorizado(a) del área de cartera de la
            compañía y figura como titular de la cuenta.
          </p>

          <!-- ACCOUNT DATA -->
          <div class="account-block">
            <p class="account-line"><strong>CUENTA:</strong> {{ data().accountBank }}</p>
            <p class="account-line"><strong>TIPO DE CUENTA:</strong> {{ data().accountType }}</p>
            <p class="account-line"><strong>No:</strong> {{ data().accountNumber }}</p>
          </div>
        </div>

        <!-- SIGNATURE -->
        <div class="signature-block">
          <div class="sig-line"></div>
          <p class="sig-name">{{ data().signerName }}</p>
          <p class="sig-role"><em>{{ data().signerRole }}</em></p>
        </div>
      </div>

      <!-- FOOTER -->
      <div class="footer">
        <div class="footer-gsm">
          <span class="gsm-text">GSM</span>
          <span class="gsm-sub">Grupo Supermotos</span>
        </div>
        <p class="footer-disclaimer">
          *Importante: este certificado solo hace referencia a los productos
          mencionados anteriormente.
        </p>
      </div>
    </div>
  `,
  styles: `
    /* ===== RESET ===== */
    :host .cert-page :is(h1,h2,h3,h4,h5,h6) {
      letter-spacing: 0; line-height: 1.3; text-transform: none; margin: 0;
    }
    :host p { margin: 0; }

    /* ===== PAGE — Letter landscape 11×8.5in ===== */
    .cert-page {
      width: 1056px;
      height: 816px;
      margin: 0 auto;
      background: #f0edea;
      font-family: 'Poppins', Arial, sans-serif;
      color: #222;
      display: flex;
      flex-direction: column;
      box-shadow: 0 4px 24px rgba(0,0,0,0.14);
      position: relative;
      overflow: hidden;
    }

    /* ===== WATERMARK ===== */
    .watermark {
      position: absolute;
      top: 50%;
      right: -20px;
      transform: translateY(-50%);
      z-index: 0;
      pointer-events: none;
    }
    .watermark img {
      width: 520px;
      height: auto;
      opacity: 0.06;
    }

    /* ===== HEADER BAR ===== */
    .header-bar {
      background: #D5150D;
      padding: 14px 48px;
      z-index: 1;
      flex-shrink: 0;
    }
    .header-inner {
      display: flex;
      align-items: center;
      gap: 18px;
    }
    .header-logo {
      height: 36px;
      width: auto;
      filter: brightness(0) invert(1);
    }
    .header-slogan {
      font-size: 15px;
      font-style: italic;
      color: #fff;
      font-weight: 400;
      letter-spacing: 0.5px;
    }

    /* ===== CONTENT ===== */
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 0 72px;
      z-index: 1;
      position: relative;
    }

    /* ===== TITLE ===== */
    .cert-title {
      font-family: 'Oxanium', sans-serif;
      font-size: 44px;
      font-weight: 800;
      color: #D5150D;
      text-align: center;
      margin: 36px 0 32px;
      font-style: italic;
      letter-spacing: 1px;
    }

    /* ===== BODY CARD ===== */
    .body-card {
      background: rgba(255,255,255,0.55);
      border-radius: 6px;
      padding: 32px 44px;
    }
    .body-text {
      font-size: 19px;
      line-height: 2;
      text-align: justify;
      color: #222;
      margin: 0 0 28px;
    }

    /* ===== ACCOUNT ===== */
    .account-block {
      padding-left: 48px;
    }
    .account-line {
      font-size: 19px;
      font-weight: 700;
      color: #D5150D;
      line-height: 1.7;
    }

    /* ===== SIGNATURE ===== */
    .signature-block {
      text-align: center;
      margin-top: auto;
      padding: 28px 0 0;
    }
    .sig-line {
      width: 280px;
      height: 1.5px;
      background: #222;
      margin: 0 auto 6px;
    }
    .sig-name {
      font-size: 15px;
      font-weight: 700;
      color: #222;
    }
    .sig-role {
      font-size: 13px;
      color: #444;
      margin-top: 1px;
    }

    /* ===== FOOTER ===== */
    .footer {
      flex-shrink: 0;
      padding: 16px 48px 20px;
      display: flex;
      align-items: flex-end;
      gap: 40px;
      z-index: 1;
      position: relative;
    }
    .footer-gsm {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
    }
    .gsm-text {
      font-family: 'Oxanium', sans-serif;
      font-size: 34px;
      font-weight: 900;
      color: #1A3A8F;
      line-height: 1;
      letter-spacing: 1px;
    }
    .gsm-sub {
      font-size: 12px;
      font-weight: 700;
      color: #D5150D;
    }
    .footer-disclaimer {
      flex: 1;
      font-size: 12px;
      font-style: italic;
      color: #666;
      text-align: center;
      line-height: 1.5;
    }
  `,
})
export class CertificateTemplate {
  readonly data = input.required<Certificate>();
}
