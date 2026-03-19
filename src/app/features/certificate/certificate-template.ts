import { Component, input } from '@angular/core';
import { Certificate } from '../../core/models/certificate.model';

@Component({
  selector: 'app-certificate-template',
  template: `
    <div class="cert-page" id="certificate-render">
      <!-- WATERMARK centered -->
      <div class="watermark">
        <img src="/Honda_Logo.svg.png" alt="" />
      </div>

      <!-- HEADER -->
      <div class="header">
        <div class="header-top">
          <div class="header-brand">
            <img src="/Honda_Logo.svg.png" alt="Honda" class="header-logo" />
          </div>
          <div class="header-info">
            <span class="header-city">HONDA BOGOTÁ</span>
            <span class="header-slogan">Come ride with us</span>
          </div>
        </div>
        <div class="header-stripe"></div>
      </div>

      <!-- TITLE -->
      <div class="title-section">
        <div class="title-line-left"></div>
        <h1 class="cert-title">CERTIFICADO DE CUENTA</h1>
        <div class="title-line-right"></div>
      </div>

      <!-- BODY -->
      <div class="body">
        <p class="body-text">
          <strong>HONDA-SUPER MOTOS,</strong> se permite informar que
          <strong>{{ data().personName }}</strong>
          identificado(a) con CC. <strong>{{ data().documentNumber }}</strong>
          se encuentra encargada y autorizado(a) del área de cartera de la
          compañía y figura como titular de la cuenta.
        </p>

        <div class="account-block">
          <p class="account-line"><span class="account-label">CUENTA:</span> {{ data().accountBank }}</p>
          <p class="account-line"><span class="account-label">TIPO DE CUENTA:</span> {{ data().accountType }}</p>
          <p class="account-line"><span class="account-label">No:</span> {{ data().accountNumber }}</p>
        </div>
      </div>

      <!-- SIGNATURE -->
      <div class="signature">
        <!-- Digital signature SVG -->
        <svg class="sig-svg" viewBox="0 0 300 80" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M40 55 C50 30, 65 20, 80 35 C90 45, 85 55, 75 50 C65 45, 70 30, 85 28
               C100 26, 110 40, 120 38 C130 36, 125 25, 135 22
               C145 19, 155 35, 160 30 C165 25, 158 20, 168 22
               C178 24, 185 40, 195 35 C205 30, 200 20, 215 25
               C225 28, 220 42, 230 38 C240 34, 245 28, 260 32"
            fill="none"
            stroke="#1a1a6e"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M130 18 C132 50, 140 60, 145 55"
            fill="none"
            stroke="#1a1a6e"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M195 20 C198 48, 205 55, 210 50"
            fill="none"
            stroke="#1a1a6e"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
        <div class="sig-line"></div>
        <p class="sig-name">{{ data().signerName }}</p>
        <p class="sig-role"><em>{{ data().signerRole }}</em></p>
      </div>

      <!-- FOOTER -->
      <div class="footer">
        <div class="footer-line"></div>
        <p class="footer-text">
          *Importante: este certificado solo hace referencia a los productos mencionados anteriormente.
        </p>
        <div class="footer-bottom">
          <span class="footer-address">Av. 1 de Mayo #29-62, Antonio Nariño, Bogotá</span>
          <span class="footer-dot">&bull;</span>
          <span class="footer-phone">Tel: 315 992 3447</span>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host .cert-page :is(h1,h2,h3,h4,h5,h6) {
      letter-spacing: 0; line-height: 1.3; text-transform: none; margin: 0;
    }
    :host p { margin: 0; }

    /* ===== PAGE ===== */
    .cert-page {
      width: 1056px;
      height: 816px;
      margin: 0 auto;
      background: #f5f3f0;
      font-family: 'Poppins', Arial, sans-serif;
      color: #222;
      display: flex;
      flex-direction: column;
      box-shadow: 0 4px 24px rgba(0,0,0,0.14);
      position: relative;
      overflow: hidden;
    }

    /* ===== WATERMARK centered ===== */
    .watermark {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 0;
      pointer-events: none;
    }
    .watermark img { width: 480px; height: auto; opacity: 0.05; }

    /* ===== HEADER ===== */
    .header { flex-shrink: 0; z-index: 1; }
    .header-top {
      background: #D5150D;
      padding: 20px 56px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .header-brand { display: flex; align-items: center; }
    .header-logo {
      height: 44px;
      width: auto;
      filter: brightness(0) invert(1);
    }
    .header-info {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    .header-city {
      font-family: 'Oxanium', sans-serif;
      font-size: 22px;
      font-weight: 800;
      color: #fff;
      letter-spacing: 3px;
      text-transform: uppercase;
    }
    .header-slogan {
      font-size: 12px;
      font-style: italic;
      color: rgba(255,255,255,0.8);
      font-weight: 400;
      letter-spacing: 0.5px;
      margin-top: 2px;
    }
    .header-stripe {
      height: 6px;
      background: linear-gradient(90deg, #222 0%, #222 50%, #D5150D 50%, #D5150D 100%);
    }

    /* ===== TITLE ===== */
    .title-section {
      display: flex;
      align-items: center;
      gap: 24px;
      padding: 36px 56px 0;
      z-index: 1;
      position: relative;
    }
    .title-line-left, .title-line-right {
      flex: 1;
      height: 2px;
      background: linear-gradient(90deg, transparent, #D5150D);
    }
    .title-line-right {
      background: linear-gradient(90deg, #D5150D, transparent);
    }
    .cert-title {
      font-family: 'Oxanium', sans-serif;
      font-size: 40px;
      font-weight: 800;
      color: #D5150D;
      text-align: center;
      white-space: nowrap;
      letter-spacing: 2px;
    }

    /* ===== BODY ===== */
    .body {
      flex: 1;
      padding: 36px 80px 0;
      z-index: 1;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .body-text {
      font-size: 21px;
      line-height: 2.1;
      text-align: justify;
      color: #222;
      margin: 0 0 36px;
    }

    .account-block {
      text-align: center;
    }
    .account-line {
      font-size: 22px;
      font-weight: 700;
      color: #D5150D;
      line-height: 1.8;
    }
    .account-label {
      color: #222;
      font-weight: 800;
    }

    /* ===== SIGNATURE ===== */
    .signature {
      text-align: center;
      padding: 24px 0 0;
      z-index: 1;
      position: relative;
    }
    .sig-svg {
      width: 220px;
      height: 60px;
      display: block;
      margin: 0 auto -6px;
    }
    .sig-line {
      width: 300px;
      height: 1.5px;
      background: #222;
      margin: 0 auto 8px;
    }
    .sig-name {
      font-size: 16px;
      font-weight: 700;
      color: #222;
    }
    .sig-role {
      font-size: 14px;
      color: #555;
      margin-top: 2px;
    }

    /* ===== FOOTER ===== */
    .footer {
      flex-shrink: 0;
      padding: 20px 56px 24px;
      z-index: 1;
      position: relative;
    }
    .footer-line {
      height: 2px;
      background: linear-gradient(90deg, #D5150D, #222);
      margin-bottom: 12px;
    }
    .footer-text {
      font-size: 11px;
      font-style: italic;
      color: #777;
      text-align: center;
      line-height: 1.5;
      margin-bottom: 6px;
    }
    .footer-bottom {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
    }
    .footer-address, .footer-phone {
      font-size: 11px;
      color: #888;
      font-weight: 500;
    }
    .footer-dot {
      color: #D5150D;
      font-size: 14px;
    }
  `,
})
export class CertificateTemplate {
  readonly data = input.required<Certificate>();
}
