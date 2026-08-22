import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Copy, Download, Check, Code, FileCode } from 'lucide-react';
import { SOCIAL_CONFIG } from '../imagesConfig';

interface HtmlExporterProps {
  isOpen: boolean;
  onClose: () => void;
  showToast: (msg: string, type: 'success' | 'info' | 'error' | 'loading') => void;
  steakImage: string;
  suiteImage: string;
  heroImage: string;
}

export default function HtmlExporter({
  isOpen,
  onClose,
  showToast,
  steakImage,
  suiteImage,
  heroImage,
}: HtmlExporterProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Single file index.html with style and script embedded! Exactly as requested.
  const standaloneHtmlCode = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Las Cabañitas - Hotel de Montaña & Steakhouse Premium</title>
  
  <!-- Google Fonts: Playfair Display & Plus Jakarta Sans -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">
  
  <!-- FontAwesome for Premium Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

  <style>
    /* CSS Variables based on Natural Tones: Gold (#C5A059), Charcoal (#121212), Surface (#1C1C1C), Cream (#F5F2ED), Muted (#A0A0A0) */
    :root {
      --color-gold-50: #faf9f5;
      --color-gold-100: #f1ede1;
      --color-gold-500: #C5A059; /* Natural Tones Gold */
      --color-gold-600: #b28c49;
      --color-gold-700: #9a783b;

      --color-forest-50: #1c1c1c;
      --color-forest-100: #2a2a2a;
      --color-forest-500: #C5A059; /* Gold accent */
      --color-forest-600: #b28c49;
      --color-forest-900: #121212;

      --color-wood-50: #121212; /* Charcoal base */
      --color-wood-100: #1c1c1c; /* Surface */
      --color-wood-500: #C5A059; /* Gold */
      --color-wood-800: #2c2c2c;
      --color-wood-950: #121212;

      --color-charcoal-50: #121212;
      --color-charcoal-100: #1c1c1c;
      --color-charcoal-500: #A0A0A0; /* Muted text */
      --color-charcoal-800: #1c1c1c; /* Surface */
      --color-charcoal-900: #F5F2ED; /* Cream text */
      --color-charcoal-950: #121212;
      
      --font-serif: "Georgia", serif;
      --font-sans: "Helvetica Neue", Arial, sans-serif;
    }

    /* Reset & Base Styles */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    html {
      scroll-behavior: smooth;
    }
    body {
      font-family: var(--font-sans);
      background-color: #121212;
      color: var(--color-charcoal-900);
      overflow-x: hidden;
      line-height: 1.6;
    }
    h1, h2, h3, h4, .font-serif {
      font-family: var(--font-serif);
      font-weight: 700;
    }
    a {
      text-decoration: none;
      color: inherit;
    }
    button, input, select, textarea {
      font-family: inherit;
    }

    /* Layout Containers */
    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    .section-padding {
      padding: 100px 0;
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: var(--color-wood-50);
    }
    ::-webkit-scrollbar-thumb {
      background: var(--color-gold-500);
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--color-gold-700);
    }

    /* Navbar Styling */
    header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1000;
      transition: all 0.3s ease;
      background-color: transparent;
      padding: 24px 0;
    }
    header.scrolled {
      background-color: rgba(33, 22, 16, 0.96); /* wood-950 */
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      padding: 14px 0;
      border-b: 1px solid rgba(234, 160, 35, 0.1);
    }
    .nav-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      user-select: none;
    }
    .logo svg {
      height: 40px;
      width: auto;
    }
    .logo-text {
      display: flex;
      flex-direction: column;
    }
    .logo-title {
      font-family: var(--font-serif);
      font-size: 1.15rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      line-height: 1;
      color: var(--color-forest-500);
      text-transform: uppercase;
    }
    header.scrolled .logo-title {
      color: var(--color-gold-500);
    }
    .logo-subtitle {
      font-size: 8px;
      font-weight: 600;
      letter-spacing: 0.3em;
      line-height: 1;
      color: var(--color-wood-500);
      text-transform: uppercase;
      margin-top: 4px;
    }
    header.scrolled .logo-subtitle {
      color: var(--color-wood-100);
    }
    .nav-menu {
      display: none;
      align-items: center;
      gap: 32px;
      list-style: none;
    }
    .nav-link {
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: white;
      transition: color 0.2s ease;
    }
    .nav-link:hover {
      color: var(--color-gold-100);
    }
    header.scrolled .nav-link {
      color: var(--color-wood-100);
    }
    header.scrolled .nav-link:hover {
      color: var(--color-gold-500);
    }
    .nav-cta {
      display: none;
      background-color: var(--color-gold-500);
      color: var(--color-wood-950);
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .nav-cta:hover {
      background-color: var(--color-gold-600);
      transform: translateY(-1px);
    }
    .menu-toggle {
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
      display: block;
    }
    header.scrolled .menu-toggle {
      color: var(--color-gold-500);
    }

    /* Mobile Drawer */
    .mobile-drawer {
      position: fixed;
      top: 0;
      right: -100%;
      width: 80%;
      max-width: 320px;
      height: 100vh;
      background-color: var(--color-wood-950);
      z-index: 2000;
      box-shadow: -10px 0 30px rgba(0, 0, 0, 0.25);
      transition: right 0.4s ease;
      padding: 40px;
      display: flex;
      flex-direction: column;
      gap: 40px;
    }
    .mobile-drawer.open {
      right: 0;
    }
    .drawer-close {
      align-self: flex-end;
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
    }
    .drawer-menu {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .drawer-link {
      font-size: 1.1rem;
      font-weight: 600;
      color: white;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .drawer-link i {
      color: var(--color-gold-500);
      width: 20px;
    }
    .drawer-cta {
      background-color: var(--color-gold-500);
      color: var(--color-wood-950);
      padding: 16px;
      border: none;
      border-radius: 12px;
      font-size: 0.9rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      cursor: pointer;
      width: 100%;
      text-align: center;
    }

    /* Hero Section */
    .hero {
      position: relative;
      height: 100vh;
      min-height: 600px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-wood-950);
      overflow: hidden;
      color: white;
      text-align: center;
    }
    .hero-bg {
      position: absolute;
      inset: 0;
      z-index: 1;
      opacity: 0.4;
    }
    .hero-bg img {
      width: 100%;
      height: 100%;
      object-cover: cover;
    }
    .hero-overlay {
      position: absolute;
      inset: 0;
      z-index: 2;
      background: linear-gradient(to top, var(--color-wood-950) 0%, rgba(33, 22, 16, 0.4) 60%, var(--color-wood-950) 100%);
    }
    .hero-content {
      position: relative;
      z-index: 10;
      max-width: 800px;
      padding: 0 20px;
    }
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 16px;
      background-color: rgba(234, 160, 35, 0.1);
      border: 1px solid rgba(234, 160, 35, 0.3);
      border-radius: 50px;
      color: var(--color-gold-500);
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      margin-bottom: 24px;
    }
    .hero-badge i {
      animation: pulse 1.8s infinite;
    }
    .hero-title {
      font-size: 2.2rem;
      line-height: 1.15;
      margin-bottom: 16px;
      letter-spacing: -0.01em;
    }
    .hero-title span {
      color: var(--color-gold-500);
    }
    .hero-desc {
      font-size: 0.95rem;
      color: var(--color-wood-100);
      margin-bottom: 40px;
      max-width: 650px;
      margin-left: auto;
      margin-right: auto;
    }
    .hero-ctas {
      display: flex;
      flex-direction: column;
      gap: 16px;
      align-items: center;
      justify-content: center;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 16px 32px;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      cursor: pointer;
      transition: all 0.3s ease;
      width: 100%;
    }
    .btn-primary {
      background-color: var(--color-gold-500);
      color: var(--color-wood-950);
      border: none;
      box-shadow: 0 4px 15px rgba(234, 160, 35, 0.25);
    }
    .btn-primary:hover {
      background-color: var(--color-gold-600);
      box-shadow: 0 6px 20px rgba(234, 160, 35, 0.35);
    }
    .btn-secondary {
      background-color: rgba(44, 27, 24, 0.6);
      color: white;
      border: 1px solid rgba(130, 90, 66, 0.3);
      backdrop-filter: blur(5px);
    }
    .btn-secondary:hover {
      background-color: rgba(44, 27, 24, 0.8);
      border-color: var(--color-gold-500);
    }
    .hero-scroll-down {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10;
      color: rgba(255, 255, 255, 0.4);
      font-size: 1.2rem;
      animation: bounce 1.8s infinite;
    }

    /* Section Headers */
    .section-header {
      text-align: center;
      max-width: 700px;
      margin: 0 auto 60px auto;
    }
    .section-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: var(--color-forest-500);
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      margin-bottom: 12px;
    }
    .section-title {
      font-size: 2.2rem;
      color: var(--color-charcoal-900);
      margin-bottom: 16px;
    }
    .section-desc {
      font-size: 0.95rem;
      color: var(--color-charcoal-500);
    }

    /* Habitaciones (Rooms) Grid Section */
    .rooms-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 32px;
      margin-bottom: 60px;
    }
    .room-card {
      background-color: var(--color-wood-50);
      border: 1px solid var(--color-wood-100);
      border-radius: 20px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: all 0.3s ease;
    }
    .room-card:hover {
      border-color: var(--color-gold-500);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
      transform: translateY(-3px);
    }
    .room-img-container {
      position: relative;
      aspect-ratio: 4/3;
      background-color: var(--color-charcoal-950);
      overflow: hidden;
    }
    .room-img-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    .room-card:hover .room-img-container img {
      transform: scale(1.05);
    }
    .room-price-badge {
      position: absolute;
      top: 16px;
      right: 16px;
      background-color: rgba(33, 22, 16, 0.85);
      backdrop-filter: blur(5px);
      padding: 8px 16px;
      border-radius: 8px;
      color: white;
      border: 1px solid rgba(234, 160, 35, 0.2);
    }
    .room-price-badge span {
      font-size: 0.7rem;
      color: var(--color-gold-500);
      font-weight: 600;
      text-transform: uppercase;
      display: block;
    }
    .room-price-badge .price {
      font-family: var(--font-sans);
      font-weight: 800;
      font-size: 1.1rem;
      color: var(--color-gold-500);
    }
    .room-body {
      padding: 30px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .room-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 12px;
    }
    .badge-pill {
      background-color: var(--color-wood-100);
      border: 1px solid rgba(130, 90, 66, 0.1);
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 0.65rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--color-wood-800);
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .badge-pill-forest {
      background-color: var(--color-forest-50);
      border-color: rgba(45, 90, 39, 0.1);
      color: var(--color-forest-600);
    }
    .room-title {
      font-size: 1.3rem;
      color: var(--color-charcoal-900);
      margin-bottom: 10px;
    }
    .room-text {
      font-size: 0.85rem;
      color: var(--color-charcoal-500);
      margin-bottom: 24px;
    }
    .room-features {
      list-style: none;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      padding-top: 20px;
      border-top: 1px solid var(--color-wood-100);
    }
    .room-feature-item {
      font-size: 0.75rem;
      color: var(--color-charcoal-800);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .room-feature-item i {
      color: var(--color-gold-500);
    }

    /* Reserva Form Box */
    .booking-card {
      background-color: var(--color-wood-950);
      color: white;
      border-radius: 30px;
      border: 1px solid rgba(234, 160, 35, 0.1);
      padding: 40px;
      position: relative;
      overflow: hidden;
      margin-top: 60px;
    }
    .booking-card-bg-glow {
      position: absolute;
      top: 0;
      right: 0;
      width: 300px;
      height: 300px;
      background-color: rgba(234, 160, 35, 0.05);
      filter: blur(80px);
      border-radius: 50%;
      pointer-events: none;
    }
    .booking-inner {
      display: grid;
      grid-template-columns: 1fr;
      gap: 40px;
      align-items: center;
      position: relative;
      z-index: 10;
    }
    .booking-pitch {
      max-width: 420px;
    }
    .booking-pitch-tag {
      color: var(--color-gold-500);
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      margin-bottom: 12px;
      display: block;
    }
    .booking-pitch-title {
      font-size: 1.8rem;
      margin-bottom: 16px;
    }
    .booking-pitch-desc {
      color: var(--color-wood-100);
      font-size: 0.85rem;
      margin-bottom: 24px;
    }
    .booking-pitch-points {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .booking-point {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--color-wood-50);
    }
    .booking-point-num {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: rgba(234, 160, 35, 0.15);
      border: 1px solid rgba(234, 160, 35, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-gold-500);
      font-weight: 700;
    }
    .booking-form-box {
      background-color: rgba(255, 255, 255, 0.98);
      border-radius: 20px;
      padding: 30px;
      color: #121212;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    }
    .form-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
      margin-bottom: 24px;
    }
    .form-field {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .form-label {
      font-size: 0.65rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #3f3f46;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .form-label i {
      color: var(--color-gold-500);
    }
    .form-input {
      padding: 12px 16px;
      background-color: #f4f4f5;
      border: 1px solid #d4d4d8;
      border-radius: 12px;
      font-size: 0.85rem;
      color: #18181b;
      outline: none;
      transition: all 0.2s ease;
      width: 100%;
    }
    .form-input::placeholder {
      color: #a1a1aa;
    }
    .form-input:focus {
      border-color: var(--color-gold-500);
      background-color: white;
    }
    .form-input option {
      color: #18181b;
      background-color: white;
    }
    select.form-input {
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23825a42'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 16px center;
      background-size: 16px;
      padding-right: 40px;
    }
    
    /* Result card */
    .quote-result {
      background-color: white;
      border: 1px solid var(--color-gold-100);
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
      display: none;
      color: #121212;
    }
    .quote-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background-color: rgba(45, 90, 39, 0.1);
      color: var(--color-forest-600);
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 0.65rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 20px;
    }
    .quote-title {
      font-size: 1.4rem;
      margin-bottom: 4px;
      color: #111827;
    }
    .quote-subtitle {
      font-size: 0.7rem;
      color: #71717a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 24px;
    }
    .quote-details {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 24px;
      padding-bottom: 20px;
      border-bottom: 1px solid #e4e4e7;
    }
    .quote-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.8rem;
    }
    .quote-row .label {
      color: #4b5563;
      font-weight: 500;
    }
    .quote-row .val {
      font-weight: 700;
      color: #111827;
    }
    .quote-row-total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 16px;
    }
    .quote-total-label .label {
      font-weight: 700;
      color: #111827;
      font-size: 0.85rem;
    }
    .quote-total-label .sub {
      font-size: 0.65rem;
      color: #6b7280;
      display: block;
    }
    .quote-total-val {
      font-family: var(--font-sans);
      font-weight: 800;
      font-size: 1.8rem;
      color: var(--color-forest-500);
    }
    .quote-actions {
      display: flex;
      gap: 12px;
    }

    /* Restaurante (Steakhouse) Menu Section */
    .bg-restaurant {
      background-color: var(--color-wood-50);
      border-top: 1px solid var(--color-wood-100);
      border-bottom: 1px solid var(--color-wood-100);
    }
    .tabs-wrapper {
      display: flex;
      justify-content: center;
      margin-bottom: 48px;
    }
    .tabs-container {
      display: inline-flex;
      background-color: var(--color-wood-100);
      padding: 6px;
      border-radius: 12px;
      border: 1px solid rgba(130, 90, 66, 0.1);
    }
    .tab-btn {
      background: none;
      border: none;
      padding: 12px 24px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--color-charcoal-500);
      cursor: pointer;
      border-radius: 8px;
      transition: all 0.3s ease;
    }
    .tab-btn.active {
      background-color: var(--color-wood-950);
      color: var(--color-gold-500);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    .menu-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 32px;
    }
    .menu-card {
      background-color: white;
      border-radius: 16px;
      border: 1px solid var(--color-wood-100);
      overflow: hidden;
      display: none;
      flex-direction: column;
      transition: all 0.3s ease;
      color: #121212;
    }
    .menu-card.show {
      display: flex;
    }
    .menu-card:hover {
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
      transform: translateY(-2px);
    }
    .menu-img-box {
      position: relative;
      aspect-ratio: 4/3;
      background-color: var(--color-charcoal-900);
      overflow: hidden;
    }
    .menu-img-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    .menu-card:hover .menu-img-box img {
      transform: scale(1.05);
    }
    .menu-badge {
      position: absolute;
      top: 12px;
      left: 12px;
      background-color: var(--color-gold-500);
      color: var(--color-wood-950);
      font-size: 0.6rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      padding: 4px 10px;
      border-radius: 4px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .menu-content {
      padding: 24px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .menu-header-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 8px;
    }
    .menu-dish-title {
      font-size: 1.1rem;
      color: #111827;
    }
    .menu-price {
      font-family: var(--font-sans);
      font-weight: 700;
      font-size: 1rem;
      color: var(--color-forest-500);
      background-color: var(--color-forest-50);
      padding: 2px 10px;
      border-radius: 6px;
    }
    .menu-desc {
      font-size: 0.75rem;
      color: #4b5563;
      margin-bottom: 20px;
    }
    .menu-actions {
      display: flex;
      gap: 10px;
    }
    .btn-sm {
      padding: 10px 16px;
      font-size: 0.7rem;
      border-radius: 8px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .btn-sm-primary {
      background-color: var(--color-gold-500);
      color: var(--color-wood-950);
      border: none;
      flex-grow: 1;
    }
    .btn-sm-primary:hover {
      background-color: var(--color-gold-600);
    }
    .btn-sm-icon {
      background-color: #f4f4f5;
      color: var(--color-wood-950);
      border: 1px solid #e4e4e7;
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .btn-sm-icon:hover {
      background-color: var(--color-wood-100);
    }

    /* Contact Section */
    .contact-wrapper {
      display: grid;
      grid-template-columns: 1fr;
      gap: 60px;
      align-items: flex-start;
    }
    .contact-info-col {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .contact-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      border-top: 1px solid var(--color-wood-100);
      padding-top: 30px;
    }
    .contact-item {
      display: flex;
      gap: 16px;
      padding: 16px;
      background-color: white;
      border: 1px solid var(--color-wood-100);
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.01);
      color: #121212;
    }
    .contact-item-icon {
      width: 40px;
      height: 40px;
      background-color: rgba(234, 160, 35, 0.1);
      color: var(--color-gold-600);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      flex-shrink: 0;
    }
    .contact-item-body h4 {
      font-size: 0.85rem;
      margin-bottom: 4px;
      color: #111827;
    }
    .contact-item-body p {
      font-size: 0.75rem;
      color: #4b5563;
    }
    .contact-form-box {
      background-color: white;
      border: 1px solid var(--color-wood-100);
      border-radius: 24px;
      padding: 40px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
      color: #121212;
    }
    .contact-form-box .form-grid {
      margin-bottom: 20px;
    }
    textarea.form-input {
      resize: none;
    }

    /* Footer */
    footer {
      background-color: var(--color-wood-950);
      color: white;
      padding: 80px 0 40px 0;
      border-top: 1px solid rgba(234, 160, 35, 0.1);
    }
    .footer-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 40px;
      margin-bottom: 60px;
    }
    .footer-brand {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .footer-brand p {
      font-size: 0.8rem;
      color: var(--color-wood-100);
      line-height: 1.7;
    }
    .footer-col-title {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: var(--color-gold-500);
      border-bottom: 1px solid var(--color-wood-800);
      padding-bottom: 12px;
      margin-bottom: 20px;
    }
    .footer-links {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .footer-link {
      font-size: 0.8rem;
      color: var(--color-wood-100);
      display: flex;
      align-items: center;
      gap: 10px;
      transition: color 0.2s ease;
    }
    .footer-link:hover {
      color: white;
    }
    .footer-link i {
      color: var(--color-gold-500);
      font-size: 0.8rem;
    }
    .footer-social-text {
      font-size: 0.75rem;
      color: var(--color-wood-100);
      margin-bottom: 12px;
    }
    .social-icons-row {
      display: flex;
      gap: 10px;
    }
    .social-btn {
      width: 36px;
      height: 36px;
      background-color: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--color-wood-800);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-wood-100);
      transition: all 0.2s ease;
    }
    .social-btn:hover {
      color: var(--color-gold-500);
      border-color: rgba(234, 160, 35, 0.3);
      background-color: rgba(255, 255, 255, 0.08);
    }
    .footer-bottom {
      border-top: 1px solid var(--color-wood-800);
      padding-top: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      text-align: center;
    }
    .footer-bottom p {
      font-size: 0.7rem;
      color: var(--color-charcoal-500);
    }
    .footer-bottom i {
      color: var(--color-gold-500);
    }

    /* Elegant Floating Toast Component */
    .toast-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 360px;
      width: calc(100% - 48px);
    }
    .toast {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      border-radius: 12px;
      background-color: rgba(10, 23, 9, 0.95); /* forest-900 */
      color: var(--color-forest-50);
      border: 1px solid rgba(45, 90, 39, 0.3);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
      backdrop-filter: blur(5px);
      animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .toast.toast-error {
      background-color: rgba(69, 10, 10, 0.95);
      border-color: rgba(239, 68, 68, 0.3);
      color: #fef2f2;
    }
    .toast.toast-loading {
      background-color: rgba(33, 22, 16, 0.95);
      border-color: rgba(234, 160, 35, 0.3);
      color: var(--color-gold-50);
    }
    .toast-content {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 0.8rem;
      font-weight: 500;
    }
    .toast-content i {
      font-size: 1.1rem;
    }
    .toast-content .fa-spinner {
      color: var(--color-gold-500);
    }
    .toast-close {
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.4);
      cursor: pointer;
      font-size: 1rem;
      transition: color 0.2s ease;
      margin-left: 12px;
    }
    .toast-close:hover {
      color: white;
    }

    /* Keyframes Animations */
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.95); }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0) translateX(-50%); }
      50% { transform: translateY(-8px) translateX(-50%); }
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(30px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes slideOut {
      from { opacity: 1; transform: translateY(0) scale(1); }
      to { opacity: 0; transform: translateY(20px) scale(0.95); }
    }

    /* Responsive Media Queries */
    @media (min-width: 600px) {
      .hero-title { font-size: 3.5rem; }
      .hero-ctas { flex-direction: row; }
      .btn { width: auto; }
      .form-grid { grid-template-columns: 1fr 1fr; }
      .rooms-grid { grid-template-columns: repeat(2, 1fr); }
      .menu-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (min-width: 1024px) {
      .nav-menu { display: flex; }
      .nav-cta { display: block; }
      .menu-toggle { display: none; }
      .rooms-grid { grid-template-columns: repeat(3, 1fr); }
      .booking-inner { grid-template-columns: 5fr 7fr; }
      .menu-grid { grid-template-columns: repeat(4, 1fr); }
      .contact-wrapper { grid-template-columns: 5fr 7fr; }
      .footer-grid { grid-template-columns: repeat(12, 1fr); }
      .footer-brand { grid-column: span 4; }
      .footer-links { grid-column: span 3; }
      .footer-legal { grid-column: span 3; }
      .footer-social { grid-column: span 2; }
      .footer-bottom { flex-direction: row; text-align: left; }
    }
  </style>
</head>
<body>

  <!-- Elegant Top Header -->
  <header id="main-header">
    <div class="container nav-wrapper">
      <a href="#inicio" class="logo">
        <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Yellow Sun -->
          <circle cx="200" cy="90" r="60" fill="#EAA023" />
          
          <!-- Mountain Silhouette Line -->
          <path d="M40 180 C 120 120, 180 150, 240 110 C 300 80, 320 120, 360 140" stroke="#2D5A27" stroke-width="6" stroke-linecap="round" />
          
          <!-- Cabin Roofs -->
          <path d="M60 170 L95 130 L130 170" stroke="#825A42" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
          <rect x="80" y="155" width="8" height="10" fill="#825A42" rx="1" />
          <rect x="92" y="155" width="8" height="10" fill="#825A42" rx="1" />
          
          <path d="M140 165 L175 120 L210 165" stroke="#825A42" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
          <line x1="160" y1="140" x2="160" y2="125" stroke="#825A42" stroke-width="6" />
          <line x1="157" y1="125" x2="163" y2="125" stroke="#825A42" stroke-width="4" />
          <rect x="160" y="150" width="8" height="10" fill="#825A42" rx="1" />
          <rect x="172" y="150" width="8" height="10" fill="#825A42" rx="1" />

          <path d="M220 170 L255 130 L290 170" stroke="#825A42" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
          <line x1="275" y1="145" x2="275" y2="135" stroke="#825A42" stroke-width="6" />
          <line x1="272" y1="135" x2="278" y2="135" stroke="#825A42" stroke-width="4" />
          <rect x="240" y="155" width="8" height="10" fill="#825A42" rx="1" />
          <rect x="252" y="155" width="8" height="10" fill="#825A42" rx="1" />
        </svg>
        <div class="logo-text">
          <span class="logo-title">Las Cabañitas</span>
          <span class="logo-subtitle">Hotel de Montaña</span>
        </div>
      </a>

      <!-- Desktop Links -->
      <ul class="nav-menu">
        <li><a href="#inicio" class="nav-link">Inicio</a></li>
        <li><a href="#habitaciones" class="nav-link">Habitaciones</a></li>
        <li><a href="#restaurante" class="nav-link">Restaurante</a></li>
        <li><a href="#contacto" class="nav-link">Contacto</a></li>
      </ul>

      <button class="nav-cta" onclick="scrollToBooking()">Reservar Ahora</button>

      <button class="menu-toggle" id="menu-toggle-btn">
        <i class="fa-solid fa-bars"></i>
      </button>
    </div>
  </header>

  <!-- Mobile Navigation Drawer -->
  <div class="mobile-drawer" id="mobile-drawer">
    <button class="drawer-close" id="drawer-close-btn">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <ul class="drawer-menu">
      <li><a href="#inicio" class="drawer-link" onclick="closeDrawer()"><i class="fa-solid fa-compass"></i> Inicio</a></li>
      <li><a href="#habitaciones" class="drawer-link" onclick="closeDrawer()"><i class="fa-solid fa-bed"></i> Habitaciones</a></li>
      <li><a href="#restaurante" class="drawer-link" onclick="closeDrawer()"><i class="fa-solid fa-fire-burner"></i> Restaurante</a></li>
      <li><a href="#contacto" class="drawer-link" onclick="closeDrawer()"><i class="fa-solid fa-envelope"></i> Contacto</a></li>
    </ul>
    <button class="drawer-cta" onclick="scrollToBookingMobile()">Reservar Ahora</button>
  </div>

  <!-- Hero Section -->
  <section class="hero" id="inicio">
    <div class="hero-bg">
      <img src="${heroImage}" alt="Mountain Landscape background" referrerpolicy="no-referrer">
    </div>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <div class="hero-badge">
        <i class="fa-solid fa-sparkles"></i> Experiencia Boutique de Montaña
      </div>
      <h1 class="hero-title">Donde la Cumbre de la Montaña <span>Se Une al Fuego</span></h1>
      <p class="hero-desc">Las Cabañitas fusiona el descanso rústico con nuestro Steakhouse Premium. Despierta rodeado de picos majestuosos y culmina tu jornada con el mejor corte de autor a la leña.</p>
      <div class="hero-ctas">
        <button class="btn btn-primary" onclick="scrollToBooking()"><i class="fa-solid fa-calendar-days"></i> Reservar Estadía</button>
        <button class="btn btn-secondary" onclick="scrollToMenu()"><i class="fa-solid fa-utensils"></i> Explorar Restaurante</button>
      </div>
    </div>
    <a href="#habitaciones" class="hero-scroll-down">
      <i class="fa-solid fa-chevron-down"></i>
    </a>
  </section>

  <!-- Habitaciones Section -->
  <section class="section-padding" id="habitaciones">
    <div class="container">
      <div class="section-header">
        <div class="section-badge"><i class="fa-solid fa-location-dot"></i> Vistas Majestuosas, Lujo Orgánico</div>
        <h2 class="section-title">Nuestros Refugios Premium</h2>
        <p class="section-desc">Cabañas diseñadas con materiales endémicos de la cordillera para fundirse en el paisaje, ofreciendo confort superior y calidez inigualable.</p>
      </div>

      <div class="rooms-grid">
        <!-- Room 1 -->
        <div class="room-card" onclick="selectRoom('r1')">
          <div class="room-img-container">
            <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=600" alt="Suite Ejecutiva Rústica" referrerpolicy="no-referrer">
            <div class="room-price-badge">
              <span>Desde</span>
              <div class="price">$220 <span style="font-size:10px; color:white; font-weight:normal;">/ Noche</span></div>
            </div>
          </div>
          <div class="room-body">
            <div>
              <div class="room-badges">
                <span class="badge-pill"><i class="fa-solid fa-users"></i> Hasta 2 pers</span>
                <span class="badge-pill badge-pill-forest"><i class="fa-solid fa-bed"></i> Lujo</span>
              </div>
              <h3 class="room-title">Suite Ejecutiva Rústica</h3>
              <p class="room-text">Diseño vanguardista con muros de piedra tallada, chimenea central, jacuzzi exterior y terraza con vistas panorámicas al amanecer cordillerano.</p>
            </div>
            <ul class="room-features">
              <li class="room-feature-item"><i class="fa-solid fa-circle-check"></i> Chimenea</li>
              <li class="room-feature-item"><i class="fa-solid fa-circle-check"></i> Jacuzzi</li>
              <li class="room-feature-item"><i class="fa-solid fa-circle-check"></i> Terraza</li>
              <li class="room-feature-item"><i class="fa-solid fa-circle-check"></i> Desayuno</li>
            </ul>
          </div>
        </div>

        <!-- Room 2 -->
        <div class="room-card" onclick="selectRoom('r2')">
          <div class="room-img-container">
            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600" alt="Cabaña Forest Deluxe" referrerpolicy="no-referrer">
            <div class="room-price-badge">
              <span>Desde</span>
              <div class="price">$290 <span style="font-size:10px; color:white; font-weight:normal;">/ Noche</span></div>
            </div>
          </div>
          <div class="room-body">
            <div>
              <div class="room-badges">
                <span class="badge-pill"><i class="fa-solid fa-users"></i> Hasta 3 pers</span>
                <span class="badge-pill badge-pill-forest"><i class="fa-solid fa-bed"></i> Confort</span>
              </div>
              <h3 class="room-title">Cabaña Forest Deluxe</h3>
              <p class="room-text">Inundada de ventanales corredizos, cama king suspendida, baño de mármol de carrara con regadera de lluvia y bar de destilados locales.</p>
            </div>
            <ul class="room-features">
              <li class="room-feature-item"><i class="fa-solid fa-circle-check"></i> Cama King</li>
              <li class="room-feature-item"><i class="fa-solid fa-circle-check"></i> Bar Privado</li>
              <li class="room-feature-item"><i class="fa-solid fa-circle-check"></i> Fogata</li>
              <li class="room-feature-item"><i class="fa-solid fa-circle-check"></i> Baño de Lujo</li>
            </ul>
          </div>
        </div>

        <!-- Room 3 -->
        <div class="room-card" onclick="selectRoom('r3')">
          <div class="room-img-container">
            <img src="${suiteImage}" alt="Master Suite Imperial" referrerpolicy="no-referrer">
            <div class="room-price-badge">
              <span>Desde</span>
              <div class="price">$450 <span style="font-size:10px; color:white; font-weight:normal;">/ Noche</span></div>
            </div>
          </div>
          <div class="room-body">
            <div>
              <div class="room-badges">
                <span class="badge-pill"><i class="fa-solid fa-users"></i> Hasta 4 pers</span>
                <span class="badge-pill badge-pill-forest"><i class="fa-solid fa-star"></i> Imperial</span>
              </div>
              <h3 class="room-title">Master Suite "Imperial"</h3>
              <p class="room-text">Nuestra obra maestra. Dos niveles de confort, fogata al aire libre, cava privada de vinos, telescopio profesional y mayordomo 24/7.</p>
            </div>
            <ul class="room-features">
              <li class="room-feature-item"><i class="fa-solid fa-circle-check"></i> Cava Privada</li>
              <li class="room-feature-item"><i class="fa-solid fa-circle-check"></i> Telescopio</li>
              <li class="room-feature-item"><i class="fa-solid fa-circle-check"></i> Mayordomo</li>
              <li class="room-feature-item"><i class="fa-solid fa-circle-check"></i> Sauna Seco</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Tarificador Booking Card -->
      <div class="booking-card" id="booking-area">
        <div class="booking-card-bg-glow"></div>
        <div class="booking-inner">
          <div class="booking-pitch">
            <span class="booking-pitch-tag">Tarificador Interactivo</span>
            <h3 class="booking-pitch-title">Verifica Disponibilidad</h3>
            <p class="booking-pitch-desc">Selecciona las fechas planeadas, el refugio de tu elección y cotiza tu estadía de inmediato sin cargos sorpresa.</p>
            <div class="booking-pitch-points">
              <div class="booking-point">
                <div class="booking-point-num">1</div> Garantía de mejor tarifa en canal oficial
              </div>
              <div class="booking-point">
                <div class="booking-point-num">2</div> Bebida de cortesía en el Steakhouse
              </div>
            </div>
          </div>

          <!-- The interactive Booking Form -->
          <div id="booking-form-wrapper">
            <form id="booking-form" class="booking-form-box" onsubmit="processBooking(event)">
              <div class="form-grid">
                <div class="form-field">
                  <label class="form-label"><i class="fa-solid fa-calendar-days"></i> Fecha Entrada (Check-in)</label>
                  <input type="date" required id="book-checkin" class="form-input">
                </div>
                <div class="form-field">
                  <label class="form-label"><i class="fa-solid fa-calendar-days"></i> Fecha Salida (Check-out)</label>
                  <input type="date" required id="book-checkout" class="form-input">
                </div>
              </div>
              <div class="form-grid">
                <div class="form-field">
                  <label class="form-label"><i class="fa-solid fa-bed"></i> Tipo de Refugio</label>
                  <select id="book-room" class="form-input">
                    <option value="r1">Suite Ejecutiva Rústica ($220 USD / Noche)</option>
                    <option value="r2">Cabaña Forest Deluxe ($290 USD / Noche)</option>
                    <option value="r3" selected>Master Suite Imperial ($450 USD / Noche)</option>
                  </select>
                </div>
                <div class="form-field">
                  <label class="form-label"><i class="fa-solid fa-users"></i> Número de Huéspedes</label>
                  <input type="number" min="1" max="6" value="2" required id="book-guests" class="form-input">
                </div>
              </div>
              <button type="submit" class="btn btn-primary" style="width: 100%;">
                Ver Disponibilidad <i class="fa-solid fa-arrow-right"></i>
              </button>
            </form>

            <!-- Dynamic Quote Result panel -->
            <div id="quote-result" class="quote-result">
              <div class="quote-badge"><i class="fa-solid fa-sparkles"></i> Disponible</div>
              <h4 class="quote-title">Resumen de Estadía</h4>
              <p class="quote-subtitle">Tu experiencia exclusiva en Las Cabañitas</p>
              
              <div class="quote-details">
                <div class="quote-row">
                  <span class="label">Refugio Seleccionado:</span>
                  <span class="val" id="res-room-name">-</span>
                </div>
                <div class="quote-row">
                  <span class="label">Fechas:</span>
                  <span class="val" id="res-dates">-</span>
                </div>
                <div class="quote-row">
                  <span class="label">Noches Totales:</span>
                  <span class="val" id="res-nights">-</span>
                </div>
                <div class="quote-row">
                  <span class="label">Huéspedes:</span>
                  <span class="val" id="res-guests">-</span>
                </div>
                <div class="quote-row-total">
                  <div class="quote-total-label">
                    <span class="label">Precio Total Estimado</span>
                    <span class="sub">Impuestos incluidos</span>
                  </div>
                  <div class="quote-total-val" id="res-total-price">$0</div>
                </div>
              </div>

              <div class="quote-actions">
                <button type="button" class="btn btn-secondary" onclick="resetBookingForm()" style="flex:1;">Modificar</button>
                <button type="button" class="btn btn-primary" onclick="confirmBooking()" style="flex:1;">Solicitar Pre-Reserva</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Restaurante (Steakhouse) Section -->
  <section class="section-padding bg-restaurant" id="restaurante">
    <div class="container">
      <div class="section-header">
        <div class="section-badge"><i class="fa-solid fa-fire"></i> Fuego & Parrilla de Altura</div>
        <h2 class="section-title">El Steakhouse Premium</h2>
        <p class="section-desc">Seleccionamos cortes de res con estándares de marmoleo excepcionales, madurados en seco y asados sobre leña seleccionada para impregnar notas salvajes inolvidables.</p>
      </div>

      <!-- Tab Controls -->
      <div class="tabs-wrapper">
        <div class="tabs-container">
          <button class="tab-btn active" onclick="switchMenuCategory('cortes')">Cortes Premium</button>
          <button class="tab-btn" onclick="switchMenuCategory('entradas')">Entradas de Autor</button>
          <button class="tab-btn" onclick="switchMenuCategory('bebidas')">Bebidas & Elixir</button>
        </div>
      </div>

      <!-- Menu Cards Grid -->
      <div class="menu-grid">
        <!-- Cortes Premium -->
        <div class="menu-card show" data-category="cortes">
          <div class="menu-img-box">
            <img src="${steakImage}" alt="Tomahawk Cabañitas Gold" referrerpolicy="no-referrer">
            <div class="menu-badge"><i class="fa-solid fa-award"></i> Insignia</div>
          </div>
          <div class="menu-content">
            <div>
              <div class="menu-header-row">
                <h3 class="menu-dish-title">Tomahawk Gold</h3>
                <span class="menu-price">$115</span>
              </div>
              <p class="menu-desc">1.2kg de corte tomahawk prime madurado por 45 días, asado lentamente sobre brasas de encino y mantequilla de romero montañés.</p>
            </div>
            <div class="menu-actions">
              <button class="btn-sm btn-sm-primary" onclick="addDishToRoom('Tomahawk Gold')">Agregar</button>
              <button class="btn-sm btn-sm-icon" onclick="showDishDetails('Tomahawk Cabañitas Gold', '1.2kg de corte tomahawk prime madurado por 45 días, asado lentamente sobre brasas de encino y mantequilla de romero montañés. Un corte de gran marmoleo y jugosidad incomparable que satisface los paladares de los carnívoros más rigurosos.')"><i class="fa-solid fa-circle-info"></i></button>
            </div>
          </div>
        </div>

        <div class="menu-card show" data-category="cortes">
          <div class="menu-img-box">
            <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600" alt="Ribeye Black Angus" referrerpolicy="no-referrer">
          </div>
          <div class="menu-content">
            <div>
              <div class="menu-header-row">
                <h3 class="menu-dish-title">Ribeye Black Angus</h3>
                <span class="menu-price">$48</span>
              </div>
              <p class="menu-desc">400g de corte sumamente veteado y jugoso, asado a la parrilla con sal ahumada y chimichurri rústico de la casa.</p>
            </div>
            <div class="menu-actions">
              <button class="btn-sm btn-sm-primary" onclick="addDishToRoom('Ribeye Black Angus')">Agregar</button>
              <button class="btn-sm btn-sm-icon" onclick="showDishDetails('Ribeye Black Angus', '400g de corte sumamente veteado y jugoso, asado a la parrilla con sal ahumada y chimichurri rústico de la casa.')"><i class="fa-solid fa-circle-info"></i></button>
            </div>
          </div>
        </div>

        <div class="menu-card show" data-category="cortes">
          <div class="menu-img-box">
            <img src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=600" alt="New York Strip Dry Aged" referrerpolicy="no-referrer">
          </div>
          <div class="menu-content">
            <div>
              <div class="menu-header-row">
                <h3 class="menu-dish-title">New York Strip</h3>
                <span class="menu-price">$44</span>
              </div>
              <p class="menu-desc">350g de corte curado por 30 días, asado en leña de cerezo, con costra dorada crujiente y mantequilla trufada.</p>
            </div>
            <div class="menu-actions">
              <button class="btn-sm btn-sm-primary" onclick="addDishToRoom('New York Strip')">Agregar</button>
              <button class="btn-sm btn-sm-icon" onclick="showDishDetails('New York Strip', '350g de corte curado por 30 días, asado en leña de cerezo, con costra dorada crujiente y mantequilla trufada.')"><i class="fa-solid fa-circle-info"></i></button>
            </div>
          </div>
        </div>

        <div class="menu-card show" data-category="cortes">
          <div class="menu-img-box">
            <img src="https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=600" alt="Vacío Rústico" referrerpolicy="no-referrer">
          </div>
          <div class="menu-content">
            <div>
              <div class="menu-header-row">
                <h3 class="menu-dish-title">Vacío Rústico</h3>
                <span class="menu-price">$36</span>
              </div>
              <p class="menu-desc">500g de vacío tierno, marinado en hierbas aromáticas y aceite de oliva antes de sellar a la brasa.</p>
            </div>
            <div class="menu-actions">
              <button class="btn-sm btn-sm-primary" onclick="addDishToRoom('Vacío Rústico')">Agregar</button>
              <button class="btn-sm btn-sm-icon" onclick="showDishDetails('Vacío Rústico', '500g de vacío tierno, marinado en hierbas aromáticas y aceite de oliva antes de sellar a la brasa para conservar la totalidad de sus jugos.')"><i class="fa-solid fa-circle-info"></i></button>
            </div>
          </div>
        </div>

        <!-- Entradas -->
        <div class="menu-card" data-category="entradas">
          <div class="menu-img-box">
            <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600" alt="Carpaccio de Res" referrerpolicy="no-referrer">
          </div>
          <div class="menu-content">
            <div>
              <div class="menu-header-row">
                <h3 class="menu-dish-title">Carpaccio de Res</h3>
                <span class="menu-price">$18</span>
              </div>
              <p class="menu-desc">Láminas de filete de res, emulsión de trufa negra, lascas de parmesano de 24 meses y alcaparras crujientes.</p>
            </div>
            <div class="menu-actions">
              <button class="btn-sm btn-sm-primary" onclick="addDishToRoom('Carpaccio de Res')">Agregar</button>
              <button class="btn-sm btn-sm-icon" onclick="showDishDetails('Carpaccio de Res', 'Láminas finas de filete de res premium, emulsión de trufa negra, lascas de parmesano reggiano de 24 meses y alcaparras fritas.')"><i class="fa-solid fa-circle-info"></i></button>
            </div>
          </div>
        </div>

        <div class="menu-card" data-category="entradas">
          <div class="menu-img-box">
            <img src="https://images.unsplash.com/photo-1560684352-8497838a2229?auto=format&fit=crop&q=80&w=600" alt="Mollejas Crujientes" referrerpolicy="no-referrer">
          </div>
          <div class="menu-content">
            <div>
              <div class="menu-header-row">
                <h3 class="menu-dish-title">Mollejas Crujientes</h3>
                <span class="menu-price">$16</span>
              </div>
              <p class="menu-desc">Mollejas de ternera de doble cocción, crujientes por fuera y cremosas por dentro, con alioli y limón amarillo ahumado.</p>
            </div>
            <div class="menu-actions">
              <button class="btn-sm btn-sm-primary" onclick="addDishToRoom('Mollejas Crujientes')">Agregar</button>
              <button class="btn-sm btn-sm-icon" onclick="showDishDetails('Mollejas Crujientes', 'Mollejas de ternera de doble cocción, crujientes por fuera y cremosas por dentro, con alioli de ajo asado y limón amarillo ahumado.')"><i class="fa-solid fa-circle-info"></i></button>
            </div>
          </div>
        </div>

        <div class="menu-card" data-category="entradas">
          <div class="menu-img-box">
            <img src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=600" alt="Chorizo con Provoleta" referrerpolicy="no-referrer">
          </div>
          <div class="menu-content">
            <div>
              <div class="menu-header-row">
                <h3 class="menu-dish-title">Chorizo & Provoleta</h3>
                <span class="menu-price">$14</span>
              </div>
              <p class="menu-desc">Chorizo artesanal curado de la casa asado sobre provoleta fundida en hierro, orégano y ají molido.</p>
            </div>
            <div class="menu-actions">
              <button class="btn-sm btn-sm-primary" onclick="addDishToRoom('Chorizo & Provoleta')">Agregar</button>
              <button class="btn-sm btn-sm-icon" onclick="showDishDetails('Chorizo & Provoleta', 'Chorizo artesanal curado de la casa asado sobre una provoleta fundida en hierro fundido, salpicado con orégano fresco y un toque de ají molido.')"><i class="fa-solid fa-circle-info"></i></button>
            </div>
          </div>
        </div>

        <div class="menu-card" data-category="entradas">
          <div class="menu-img-box">
            <img src="https://images.unsplash.com/photo-1628102476629-f8cf3116f50a?auto=format&fit=crop&q=80&w=600" alt="Empanadas Criollas" referrerpolicy="no-referrer">
          </div>
          <div class="menu-content">
            <div>
              <div class="menu-header-row">
                <h3 class="menu-dish-title">Empanadas de Barro</h3>
                <span class="menu-price">$12</span>
              </div>
              <p class="menu-desc">Dos empanadas tradicionales rellenas de lomo de res cortado a cuchillo, horneadas a la leña en horno de arcilla.</p>
            </div>
            <div class="menu-actions">
              <button class="btn-sm btn-sm-primary" onclick="addDishToRoom('Empanadas de Barro')">Agregar</button>
              <button class="btn-sm btn-sm-icon" onclick="showDishDetails('Empanadas de Barro', 'Dos empanadas tradicionales de masa fina rellenas de lomo de res cortado a cuchillo, cebollín y huevo de campo, horneadas al horno de barro.')"><i class="fa-solid fa-circle-info"></i></button>
            </div>
          </div>
        </div>

        <!-- Bebidas -->
        <div class="menu-card" data-category="bebidas">
          <div class="menu-img-box">
            <img src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=600" alt="Malbec Reserva" referrerpolicy="no-referrer">
            <div class="menu-badge"><i class="fa-solid fa-wine-glass"></i> Exclusivo</div>
          </div>
          <div class="menu-content">
            <div>
              <div class="menu-header-row">
                <h3 class="menu-dish-title">Malbec Reserva</h3>
                <span class="menu-price">$15</span>
              </div>
              <p class="menu-desc">Copa de vino tinto robusto mendocino, con notas de ciruela pasa, chocolate negro y barrica tostada de roble.</p>
            </div>
            <div class="menu-actions">
              <button class="btn-sm btn-sm-primary" onclick="addDishToRoom('Malbec Reserva')">Agregar</button>
              <button class="btn-sm btn-sm-icon" onclick="showDishDetails('Gran Malbec Reserva', 'Copa de vino tinto robusto mendocino, con notas de ciruela pasa, chocolate negro y barrica tostada de roble. Ideal para maridar con cortes de alto grado graso.')"><i class="fa-solid fa-circle-info"></i></button>
            </div>
          </div>
        </div>

        <div class="menu-card" data-category="bebidas">
          <div class="menu-img-box">
            <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600" alt="Cocktail Fuego de Montaña" referrerpolicy="no-referrer">
          </div>
          <div class="menu-content">
            <div>
              <div class="menu-header-row">
                <h3 class="menu-dish-title">Fuego de Montaña</h3>
                <span class="menu-price">$14</span>
              </div>
              <p class="menu-desc">Mezcal artesanal con chile ancho, jarabe de jengibre natural, jugo de lima fresca y sal de gusano cordillerana.</p>
            </div>
            <div class="menu-actions">
              <button class="btn-sm btn-sm-primary" onclick="addDishToRoom('Fuego de Montaña')">Agregar</button>
              <button class="btn-sm btn-sm-icon" onclick="showDishDetails('Cocktail Fuego de Montaña', 'Mezcal artesanal con chile ancho, jarabe de jengibre natural, jugo de lima fresca y sal de gusano cordillerana.')"><i class="fa-solid fa-circle-info"></i></button>
            </div>
          </div>
        </div>

        <div class="menu-card" data-category="bebidas">
          <div class="menu-img-box">
            <img src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=600" alt="Gin de los Andes" referrerpolicy="no-referrer">
          </div>
          <div class="menu-content">
            <div>
              <div class="menu-header-row">
                <h3 class="menu-dish-title">Gin de los Andes</h3>
                <span class="menu-price">$13</span>
              </div>
              <p class="menu-desc">Ginebra artesanal con botánicos de altura local, agua tónica premium, romero tatemado y enebro fresco.</p>
            </div>
            <div class="menu-actions">
              <button class="btn-sm btn-sm-primary" onclick="addDishToRoom('Gin de los Andes')">Agregar</button>
              <button class="btn-sm btn-sm-icon" onclick="showDishDetails('Gin Silvestre de los Andes', 'Ginebra artesanal destilada con botánicos de altura local, agua tónica premium, romero tatemado y enebro fresco.')"><i class="fa-solid fa-circle-info"></i></button>
            </div>
          </div>
        </div>

        <div class="menu-card" data-category="bebidas">
          <div class="menu-img-box">
            <img src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600" alt="Limonada Lavanda" referrerpolicy="no-referrer">
          </div>
          <div class="menu-content">
            <div>
              <div class="menu-header-row">
                <h3 class="menu-dish-title">Limonada Lavanda</h3>
                <span class="menu-price">$8</span>
              </div>
              <p class="menu-desc">Limones exprimidos, infusión fría de flores de lavanda silvestre orgánica de nuestro huerto y menta fresca.</p>
            </div>
            <div class="menu-actions">
              <button class="btn-sm btn-sm-primary" onclick="addDishToRoom('Limonada Lavanda')">Agregar</button>
              <button class="btn-sm btn-sm-icon" onclick="showDishDetails('Limonada de Lavanda & Menta', 'Limones exprimidos al momento, infusión fría de flores de lavanda silvestre orgánica de nuestro huerto y menta fresca.')"><i class="fa-solid fa-circle-info"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Contacto Section -->
  <section class="section-padding" id="contacto">
    <div class="container contact-wrapper">
      <div class="contact-info-col">
        <div>
          <div class="section-badge"><i class="fa-solid fa-bell-concierge"></i> Conserjería Directa</div>
          <h2 class="section-title">Planifica Tu Escape</h2>
          <p class="section-desc">¿Tienes solicitudes especiales para tu estancia o deseas reservar catas privadas en el Steakhouse? Nuestros conserjes asistirán cada detalle de tu viaje.</p>
        </div>

        <div class="contact-list">
          <div class="contact-item">
            <div class="contact-item-icon"><i class="fa-solid fa-map-location-dot"></i></div>
            <div class="contact-item-body">
              <h4>Ubicación Exclusiva</h4>
              <p>Camino del Viento, Km 34, Cajón Superior de los Andes, Chile</p>
            </div>
          </div>

          <div class="contact-item">
            <div class="contact-item-icon"><i class="fa-solid fa-phone-volume"></i></div>
            <div class="contact-item-body">
              <h4>Teléfono Conserjería</h4>
              <p>WhatsApp &amp; Central: +56 2 2490 8500</p>
            </div>
          </div>

          <div class="contact-item">
            <div class="contact-item-icon"><i class="fa-solid fa-envelope-open-text"></i></div>
            <div class="contact-item-body">
              <h4>Correos Electrónicos</h4>
              <p>conserjeria@lascabanitas.com | info@lascabanitas.com</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact form -->
      <div class="contact-form-box">
        <h3 class="room-title">Formulario de Contacto</h3>
        <p class="section-desc" style="margin-bottom: 24px; font-size: 0.8rem;">Solicita tarifas corporativas, eventos exclusivos o traslados privados.</p>
        
        <form id="contact-form" onsubmit="processContact(event)">
          <div class="form-field" style="margin-bottom: 20px;">
            <label class="form-label"><i class="fa-solid fa-user"></i> Nombre Completo</label>
            <input type="text" required id="contact-name" placeholder="Ej. Rodrigo Rodríguez" class="form-input">
          </div>
          <div class="form-grid">
            <div class="form-field">
              <label class="form-label"><i class="fa-solid fa-envelope"></i> Correo Electrónico</label>
              <input type="email" required id="contact-email" placeholder="correo@ejemplo.com" class="form-input">
            </div>
            <div class="form-field">
              <label class="form-label"><i class="fa-solid fa-phone"></i> Teléfono</label>
              <input type="tel" required id="contact-phone" placeholder="Ej. +56 9 1234 5678" class="form-input">
            </div>
          </div>
          <div class="form-field" style="margin-bottom: 20px;">
            <label class="form-label"><i class="fa-solid fa-bookmark"></i> Asunto</label>
            <input type="text" required id="contact-subject" placeholder="Ej. Reserva para Evento Especial / Petición Especial" class="form-input">
          </div>
          <div class="form-field" style="margin-bottom: 24px;">
            <label class="form-label"><i class="fa-solid fa-message"></i> Mensaje o Petición</label>
            <textarea id="contact-message" rows="4" placeholder="Cuéntanos tus planes..." required class="form-input"></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">
            Enviar Consulta <i class="fa-solid fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="logo">
            <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="200" cy="90" r="60" fill="#EAA023" />
              <path d="M40 180 C 120 120, 180 150, 240 110 C 300 80, 320 120, 360 140" stroke="#2D5A27" stroke-width="6" stroke-linecap="round" />
              <path d="M60 170 L95 130 L130 170" stroke="#825A42" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
              <rect x="80" y="155" width="8" height="10" fill="#825A42" rx="1" />
              <rect x="92" y="155" width="8" height="10" fill="#825A42" rx="1" />
              <path d="M140 165 L175 120 L210 165" stroke="#825A42" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
              <line x1="160" y1="140" x2="160" y2="125" stroke="#825A42" stroke-width="6" />
              <line x1="157" y1="125" x2="163" y2="125" stroke="#825A42" stroke-width="4" />
              <rect x="160" y="150" width="8" height="10" fill="#825A42" rx="1" />
              <rect x="172" y="150" width="8" height="10" fill="#825A42" rx="1" />
              <path d="M220 170 L255 130 L290 170" stroke="#825A42" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
              <line x1="275" y1="145" x2="275" y2="135" stroke="#825A42" stroke-width="6" />
              <line x1="272" y1="135" x2="278" y2="135" stroke="#825A42" stroke-width="4" />
              <rect x="240" y="155" width="8" height="10" fill="#825A42" rx="1" />
              <rect x="252" y="155" width="8" height="10" fill="#825A42" rx="1" />
            </svg>
            <div class="logo-text">
              <span class="logo-title" style="color:var(--color-gold-500)">Las Cabañitas</span>
              <span class="logo-subtitle" style="color:var(--color-wood-100)">Hotel de Montaña</span>
            </div>
          </div>
          <p>Un santuario de descanso rústico-contemporáneo y excelencia gastronómica en plena Cordillera de los Andes.</p>
        </div>

        <div class="footer-links">
          <h4 class="footer-col-title">Explorar el Refugio</h4>
          <ul class="footer-links">
            <li><a href="#inicio" class="footer-link"><i class="fa-solid fa-angle-right"></i> Inicio</a></li>
            <li><a href="#habitaciones" class="footer-link"><i class="fa-solid fa-angle-right"></i> Cabañas &amp; Suites</a></li>
            <li><a href="#restaurante" class="footer-link"><i class="fa-solid fa-angle-right"></i> Steakhouse &amp; Menú</a></li>
            <li><a href="#contacto" class="footer-link"><i class="fa-solid fa-angle-right"></i> Conserjería</a></li>
          </ul>
        </div>

        <div class="footer-legal">
          <h4 class="footer-col-title">Políticas &amp; Legal</h4>
          <ul class="footer-links">
            <li><a href="#politicas" class="footer-link"><i class="fa-solid fa-shield"></i> Cancelación</a></li>
            <li><a href="#garantia" class="footer-link"><i class="fa-solid fa-shield"></i> Mejor Tarifa</a></li>
            <li><a href="#privacidad" class="footer-link"><i class="fa-solid fa-shield"></i> Privacidad</a></li>
          </ul>
        </div>

        <div class="footer-social">
          <h4 class="footer-col-title">Conectar</h4>
          <p class="footer-social-text">Sigue nuestro viaje en redes:</p>
          <div class="social-icons-row">
            <a href="${SOCIAL_CONFIG.instagram}" class="social-btn" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-instagram"></i></a>
            <a href="${SOCIAL_CONFIG.facebook}" class="social-btn" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="${SOCIAL_CONFIG.tripadvisor}" class="social-btn" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-tripadvisor"></i></a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2026 Las Cabañitas Hotel de Montaña &amp; Restaurante. Todos los derechos reservados.</p>
        <p>Hecho con <i class="fa-solid fa-heart text-gold-500"></i>.</p>
      </div>
    </div>
  </footer>

  <!-- Toast Floating Notification Container -->
  <div class="toast-container" id="toast-container"></div>

  <!-- Vanilla JS Interactive logic -->
  <script>
    // Handle Navbar scrolled style
    window.addEventListener('scroll', function() {
      const header = document.getElementById('main-header');
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

    // Mobile Navigation Drawer Toggle
    const mobileDrawer = document.getElementById('mobile-drawer');
    document.getElementById('menu-toggle-btn').addEventListener('click', function() {
      mobileDrawer.classList.add('open');
    });
    document.getElementById('drawer-close-btn').addEventListener('click', function() {
      mobileDrawer.classList.remove('open');
    });
    function closeDrawer() {
      mobileDrawer.classList.remove('open');
    }

    // Scroll helpers
    function scrollToBooking() {
      document.getElementById('booking-area').scrollIntoView({ behavior: 'smooth' });
    }
    function scrollToBookingMobile() {
      closeDrawer();
      scrollToBooking();
    }
    function scrollToMenu() {
      document.getElementById('restaurante').scrollIntoView({ behavior: 'smooth' });
    }

    // Quick room select helper to populate booking form
    function selectRoom(roomId) {
      const roomSelect = document.getElementById('book-room');
      roomSelect.value = roomId;
      scrollToBooking();
      showToast('Cabaña seleccionada. Modifica las fechas para calcular.', 'info');
    }

    // Interactive Tab Filter for Steakhouse Menu
    function switchMenuCategory(category) {
      // Toggle button active classes
      const tabButtons = document.querySelectorAll('.tab-btn');
      tabButtons.forEach(btn => {
        if (btn.textContent.toLowerCase().includes(category.substring(0, 3))) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      // Show/Hide corresponding menu cards
      const cards = document.querySelectorAll('.menu-card');
      cards.forEach(card => {
        if (card.getAttribute('data-category') === category) {
          card.classList.add('show');
        } else {
          card.classList.remove('show');
        }
      });
    }

    // Floating Custom Toast trigger
    function showToast(message, type = 'success') {
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      toast.className = 'toast';
      if (type === 'error') toast.classList.add('toast-error');
      if (type === 'loading') toast.classList.add('toast-loading');

      // Set icons based on type
      let icon = '<i class="fa-solid fa-circle-check" style="color: #eaa023;"></i>';
      if (type === 'error') icon = '<i class="fa-solid fa-triangle-exclamation" style="color: #fca5a5;"></i>';
      if (type === 'loading') icon = '<i class="fa-solid fa-spinner fa-spin"></i>';
      if (type === 'info') icon = '<i class="fa-solid fa-circle-info" style="color: #60a5fa;"></i>';

      toast.innerHTML = \`
        <div class="toast-content">
          \${icon}
          <span>\${message}</span>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
      \`;

      container.appendChild(toast);

      // Auto dismiss after 4 seconds (unless loading)
      if (type !== 'loading') {
        setTimeout(() => {
          toast.style.animation = 'slideOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
          setTimeout(() => toast.remove(), 300);
        }, 4000);
      }
      return toast;
    }

    // Quick room details alert (can be upgraded to modal)
    function showDishDetails(title, description) {
      showToast(\`\${title}: \${description}\`, 'info');
    }

    // Add Dish to Room order mock trigger
    function addDishToRoom(dishName) {
      showToast(\`"\${dishName}" agregado a tu orden de habitación. Ingresa a la sección de restaurante para enviarlo a cocina.\`, 'success');
    }

    // Form: Booking check-in / check-out availability processing
    let currentQuoteData = null;
    function processBooking(event) {
      event.preventDefault();
      const checkinVal = document.getElementById('book-checkin').value;
      const checkoutVal = document.getElementById('book-checkout').value;
      const roomId = document.getElementById('book-room').value;
      const guests = document.getElementById('book-guests').value;

      if (!checkinVal || !checkoutVal) {
        showToast('Por favor introduce fechas de entrada y salida válidas.', 'error');
        return;
      }

      const dateIn = new Date(checkinVal);
      const dateOut = new Date(checkoutVal);
      const today = new Date();
      today.setHours(0,0,0,0);

      if (dateIn < today) {
        showToast('La fecha de Check-in no puede ser menor a hoy.', 'error');
        return;
      }
      if (dateOut <= dateIn) {
        showToast('La fecha de salida debe ser posterior a la de entrada.', 'error');
        return;
      }

      // Loader toast
      const loadToast = showToast('Consultando disponibilidad y cotizando tarifas...', 'loading');

      setTimeout(() => {
        loadToast.remove();
        
        // Compute prices
        const timeDiff = Math.abs(dateOut.getTime() - dateIn.getTime());
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        let roomName = "Master Suite Imperial";
        let basePrice = 450;
        if (roomId === 'r1') { roomName = "Suite Ejecutiva Rústica"; basePrice = 220; }
        if (roomId === 'r2') { roomName = "Cabaña Forest Deluxe"; basePrice = 290; }

        const total = nights * basePrice;

        currentQuoteData = {
          roomName,
          nights,
          checkinVal,
          checkoutVal,
          guests,
          total
        };

        // Render result
        document.getElementById('res-room-name').textContent = roomName;
        document.getElementById('res-dates').textContent = \`\${checkinVal} al \${checkoutVal}\`;
        document.getElementById('res-nights').textContent = \`\${nights} noches\`;
        document.getElementById('res-guests').textContent = \`\${guests} personas\`;
        document.getElementById('res-total-price').textContent = \`$\${total} USD\`;

        // Swap view
        document.getElementById('booking-form').style.display = 'none';
        document.getElementById('quote-result').style.display = 'block';

        showToast('¡Disponibilidad confirmada y tarifa cotizada!', 'success');
      }, 1800);
    }

    function resetBookingForm() {
      document.getElementById('booking-form').style.display = 'block';
      document.getElementById('quote-result').style.display = 'none';
      currentQuoteData = null;
    }

    function confirmBooking() {
      const loadToast = showToast('Procesando solicitud de reserva...', 'loading');
      setTimeout(() => {
        loadToast.remove();
        showToast(\`¡Reserva solicitada con éxito! Recibirás un correo de confirmación de tu pre-reserva de la cabaña "\${currentQuoteData.roomName}" en instantes.\`, 'success');
        resetBookingForm();
        document.getElementById('booking-form').reset();
      }, 2000);
    }

    // Form: General Contact submission
    function processContact(event) {
      event.preventDefault();
      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const phone = document.getElementById('contact-phone').value;
      const subject = document.getElementById('contact-subject').value;
      const message = document.getElementById('contact-message').value;

      if (!name || !email || !phone || !subject || !message) {
        showToast('Por favor completa todos los campos del formulario.', 'error');
        return;
      }

      const loadToast = showToast('Enviando tu consulta a conserjería...', 'loading');

      setTimeout(() => {
        loadToast.remove();
        showToast(\`¡Gracias \${name}! Tu mensaje ha sido enviado con éxito. Un agente de conserjería te responderá a la brevedad.\`, 'success');
        document.getElementById('contact-form').reset();
      }, 2000);
    }
  </script>
</body>
</html>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(standaloneHtmlCode);
    setCopied(true);
    showToast('¡Código HTML copiado al portapapeles!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([standaloneHtmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'las_cabanitas_landing_page.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('¡Archivo HTML descargado con éxito!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-wood-950 border border-gold-500/20 rounded-3xl max-w-4xl w-full h-[85vh] flex flex-col justify-between shadow-2xl relative overflow-hidden"
      >
        {/* Glow background */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="p-6 border-b border-wood-900 flex items-center justify-between shrink-0 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-500 border border-gold-500/20">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-white">Descargar Código Fuente Standalone</h3>
              <p className="text-xs text-wood-300 font-sans">Landing page autocontenida en un único archivo indexado HTML + CSS + JS</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-wood-900 rounded-full text-wood-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Code View Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-charcoal-950/80 font-mono text-xs text-wood-100 select-all relative z-10">
          <pre className="whitespace-pre-wrap leading-relaxed max-w-full">
            <code>{standaloneHtmlCode}</code>
          </pre>
        </div>

        {/* Modal Footer with Actions */}
        <div className="p-6 border-t border-wood-900 bg-wood-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 relative z-10">
          <div className="flex items-center gap-2 text-xs text-wood-300">
            <Code className="w-4 h-4 text-gold-500" />
            <span>Código 100% optimizado para producción, responsive e interactivo con Vanilla JS</span>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-initial px-6 py-3 border border-gold-500/30 text-gold-500 hover:bg-gold-500/10 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  ¡Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copiar Código
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 sm:flex-initial px-6 py-3 bg-gold-500 hover:bg-gold-600 text-wood-950 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 shadow-md"
            >
              <Download className="w-4 h-4" />
              Descargar index.html
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
