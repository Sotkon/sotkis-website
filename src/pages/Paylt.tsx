import React, { useState } from 'react';
import { FeatureCarousel } from '../components/ui/FeatureCarousel';
import { AnimateOnScroll } from '../components/ui/AnimateOnScroll';
import { useLanguage } from '../contexts/LanguageContext';
import { payltTranslations } from '../translations/paylt';
import payltHeroImage from '../assets/SFS06471-copy.webp';

import logoPlayt from '../assets/logo-playtW.png';

import rebuiltIconBilling from '../assets/rebuilt-icon-0.webp';
import rebuiltIconMarketplace from '../assets/rebuilt-icon-1.webp';
import rebuiltIconAccessRestritor from '../assets/rebuilt-icon-4.webp';
import rebuiltIconDrs1 from '../assets/rebuilt-icon-5.webp';
import rebuiltIconDrs2 from '../assets/rebuilt-icon-6.webp';
import rebuiltIconAccess2 from '../assets/rebuilt-icon-7.webp';
import rebuiltIconAccess3 from '../assets/rebuilt-icon-8.webp';
import playtContentores from '../assets/playt-contentores.webp';
import playtConectar from '../assets/playt-conectar.webp';
import { MobileCarousel } from '../components/ui/MobileCarousel';
import bgAccessIndiferenciados from '../assets/Extend_the_background_202604241609.jpeg';

import softDashImg from '../assets/Software_DashboardsInterativos.mp4';
import softAppImg from '../assets/Software_AplicaçãoCidadão.webp';
import softMarketImg from '../assets/Software_marketplace-video.mp4';
import hardIotImg from '../assets/Hardware_sensoresnivel.mp4';
import hardAccessImg from '../assets/Hardware_controlosAcesso2.webp';
import hardRestrictorImg from '../assets/Hardware_retritorVolume.webp';
import hardDrsImg from '../assets/Hardware_sensoresDeteção.webp';
import techPolicyImg from '../assets/Software_PLAYT.webp';
import benefitMunicipioImg from '../assets/municipios-parallax-ggmsqEmY.webp';
import benefitCidadaoImg from '../assets/Cidadao_Beneficios.webp';

import './Paylt.css';

const REBUILT_TROPHY_SRC = "data:image/webp;base64,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";

export const Paylt: React.FC = () => {
  const { language } = useLanguage();
  const t = payltTranslations[language];
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  const tAny = t as any;

  // Software Carousel Features — order: Cidadão (image), Dashboard (video), Marketplace (video), PAYT (photo)
  const softwareFeatures = [
    { id: '1', label: tAny.software.features[1].label, description: tAny.software.features[1].description, image: softAppImg, isVideo: false },
    { id: '2', label: tAny.software.features[0].label, description: tAny.software.features[0].description, image: softDashImg, isVideo: true },
    { id: '3', label: tAny.software.features[2].label, description: tAny.software.features[2].description, image: softMarketImg, isVideo: true },
    { id: '4', label: tAny.software.features[3].label, description: tAny.software.features[3].description, image: techPolicyImg, isVideo: false },
  ];

  // Hardware Carousel Features
  const hardwareImages = [hardIotImg, hardAccessImg, hardRestrictorImg, hardDrsImg];
  const hardwareFeatures = tAny.hardware.features.map((f: { label: string; description: string }, i: number) => ({
    id: String(i + 1),
    label: f.label,
    description: f.description,
    image: hardwareImages[i],
    isVideo: i === 0
  }));

  // Benefits Features — independent imports so changes to software/dashboards don't leak here
  const benefitsImages = [benefitMunicipioImg, benefitCidadaoImg];
  const benefitsFeatures = tAny.benefits.features.map((f: { label: string; description: string }, i: number) => ({
    id: String(i + 1),
    label: f.label,
    description: f.description,
    image: benefitsImages[i]
  }));

  return (
    <div className="paylt">
      <section className="paylt__hero paylt__hero--simple">
        <img
          src={payltHeroImage}
          alt="SOTKIS Paylt"
          className="paylt__hero-image"
        />
        <div className="paylt__hero-overlay"></div>
        <div className="paylt__hero-content container">
          <div className="paylt__hero-text-content">
            <div className="paylt__hero-scheme" aria-label="SOTKIS ecosystem">
              <div className="paylt__hero-scheme-items">
                <div className="paylt__hero-scheme-pill">Hardware</div>
                <span className="paylt__hero-scheme-plus">+</span>
                <div className="paylt__hero-scheme-pill">Software</div>
                <span className="paylt__hero-scheme-plus">+</span>
                <div className="paylt__hero-scheme-pill paylt__hero-scheme-pill--dark">App Cidadão</div>
              </div>
              <div className="paylt__hero-scheme-arrow">
                <svg width="40" height="2" viewBox="0 0 40 2" fill="none">
                  <line x1="0" y1="1" x2="40" y2="1" stroke="#94C11F" strokeWidth="2" />
                </svg>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M0 0L10 5L0 10V0Z" fill="#94C11F" />
                </svg>
              </div>
              <div className="paylt__hero-scheme-logo">
                <img src={logoPlayt} alt="P(L)AYT" />
              </div>
            </div>
            <h2 className="paylt__scheme-heading paylt__scheme-heading--hero">
              Todas as soluções <span className="paylt__scheme-heading-pill">SOTKIS</span> num único ecossistema
            </h2>
            <button className="paylt__hero-button" onClick={() => setIsVideoModalOpen(true)}>
              <span>{tAny.video?.button || 'Play Video'}</span>
              <div className="paylt__hero-button-icon">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </section>


      <section className="paylt__intro section">
        <div className="container">
          <div className="paylt__intro-content">
            <AnimateOnScroll animation="fadeSlideUp" delay={0} duration={0.8}>
              <h2>{t.intro.title}</h2>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fadeSlideUp" delay={150} duration={0.8}>
              <p>
                {t.intro.text1}
              </p>
            </AnimateOnScroll>
            {t.intro.text2 && (
              <AnimateOnScroll animation="fadeSlideUp" delay={300} duration={0.8}>
                <p>{t.intro.text2}</p>
              </AnimateOnScroll>
            )}
            <AnimateOnScroll animation="fadeSlideUp" delay={450} duration={0.8}>
              <p>
                {t.intro.text3}
              </p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>


      {/* Como Funciona Section — Rebuilt */}
      <section className="paylt__how-it-works-section paylt__how-it-works-section--rebuilt section">
        <div className="container">
          <AnimateOnScroll animation="fadeSlideUp" delay={0} duration={0.8}>
            <h2 className="paylt__section-title">Uma solução para todo o tipo de contentores!</h2>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fadeBlur" delay={200} duration={1}>
            <div className="paylt__rebuilt">
              <div className="paylt__rebuilt-badge">Como Funciona</div>
              <div className="paylt__rebuilt-header">
                <div className="paylt__rebuilt-header-col">
                  <div className="paylt__rebuilt-header-icon"><img src={rebuiltIconBilling} alt="" /></div>
                  <div className="paylt__rebuilt-header-text">
                    <strong>Faturação por deposição</strong>
                    <span>de resíduos indiferenciados</span>
                  </div>
                </div>
                <div className="paylt__rebuilt-header-col">
                  <div className="paylt__rebuilt-header-icon"><img src={rebuiltIconMarketplace} alt="" /></div>
                  <div className="paylt__rebuilt-header-text">
                    <strong>Trocar pontos em compras marketplace</strong>
                  </div>
                </div>
              </div>
              <div className="paylt__rebuilt-pills">
                <div className="paylt__rebuilt-pill-wrap">
                  <div className="paylt__rebuilt-pill">1 ABERTURA = REGISTO</div>
                </div>
                <div className="paylt__rebuilt-pill-wrap">
                  <img src="data:image/webp;base64,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" alt="" className="paylt__rebuilt-trophy" aria-hidden="true" />
                  <div className="paylt__rebuilt-pill">1 EMBALAGEM = 1 PONTO</div>
                </div>
                <div className="paylt__rebuilt-pill-wrap">
                  <img src="data:image/webp;base64,UklGRhALAABXRUJQVlA4WAoAAAAQAAAAbQAAggAAQUxQSCECAAABoFbbTl7RioRIQAISIgEJSKgEHCABCZUQCUiohEjIj55DSwj3+70RERMAc+MBg/GAQTrAZVYaYKWBS2kr+gdAIGshrnUqGRMNS7E5VfqffafGrWCErYzvRpzKJ750NHDJ5o/VaU40PEuVRe/cMs4KBM+RKJc7UXghRHgYquj4SXOeYqosOt7bEceeYtUXORoJpevL0tJbJPpuMYC561Rp4Y1DX2echEV0PtOjphM7zsAiapNprOrUju9lUbsNB7JObm8FVtOSvgSZpcc7SdR6ww+nThd8o+qCPQIAqcH6DFmXlATAFgSfYNdVc1CTxwPsui7b6GPY1X0cwa7+pxHWDZaBqjus35Jukb8E2QvrVpJusnxA2UvRXdINZRt4K7rLDgCAso18y7pLwVvfRgEAiLpLwVvdRoJ730WFe9BNMnzMm+j4qe2hwde+A8nwXTfYAnyP7kkLMEoecTwai6p2LgQPD5dgYvFINqN/JF0zskc8gzw6ZwSPygzwKE9hh+KU6o/A1OTPOQf9OebA6U6YdHjTYTJ6c8yC05kwLflywvzLFTKQPWGweDlCJrIfDDbZjWgkelHBavHhQjPQXSCwG8WBCpbzegy262odjUFbSyKYbytJhAXbOhJhybbKFWHRskZHWDbJAg1h4cDWJMPih5jiAMuH086VwEViG1LATTrnXQeCp6FeU84E/sba35GWEZxGKiePdC45wAaJiAKsDwBWUDggyAgAADAqAJ0BKm4AgwA+XSiQRSOioZbaFuA4BcS2AGk3E24vJn7p+Tnss1h+y/kDh3aY8xfmv/b/b38KvVz5gH6h/7nqg+YD9mP91/oPeA/rnq3/0vqD/0f/c9aB6AH8V/wHppfsz8H/7cfuJ7Rn/69gD//7Cn/evwW/S/qgLI5YP6JXez6uiuiah5IfrLgAehApHIbzv1bf3ulUzCzNoEZXlcxRzKzLPdHhzR2ySP1GLzOjT/XGXacHNgfa5WvPIWIkwgYAjIYX/2444XpjCli/HjFphhMIGGJf1JG+GlcmOwQ+e5wPii3E7gJ5iGfOsKLhkqQwjaFsKaRMhKh35S27aJb8Cr/Y9EYo6LFa2a63LIgV1JvhxtgD0vIVo3tBIr9YzkdhQsasx9YPfU7sV4s1lukyQW6JLUkf5LrzTXHzh30ZsOoHI7Z7nWWJO2Y0CEfl7voVEr/pkJSd/AAA/v21RElU4fmo53OMTEMdwDnA22Rjq7eUK5aAi8qrRNNo+tCzZH3UOoTSjChuMo5V0EMOP6/0/lNbxKci2ozCH3I023Bi0CtwpwHm/SbX/x1vLP1tQC4be4aexMgfoQa0cVbEZ9f+7MwXdJ/lhaoRSwm9ROwkEqqQFjOfG+bPnSlfznURxg/rQiAzXTbm5UwS54VErnNAm6yeHYSc6PCjP0AgDPBX1ZbCJ8lZIxcTqFVAynI2r+v/IoG3BUxQa5iTR9sGVBvpDyosRbe640fANAVKuopiTPOLYAwDSFoOfQjEe9C+q4HqLtIk8Ahzv8iLz0tn5F+VKIPcWBdSrrFbygbqK26xN0gOm/zkgpru5Cyxabgm9ocUvzahABl5PYz6+s3/rINqPvB79XRrnSxYLt1NlqFJDPSyp4nhTh9UxhvI3XQvHp1aIhprse2uUL9exdatdMMqEKQ1ph4Nq5wzXCt6/j3D/ik7iSPLee7Lpb2NEkE71MJv5qoZgVFzVeWdWkx+eYMum75IDi2daHUaZtWF+/ssOz9JpMnMbyQLh2+onQTX7Jn+bctayj8mbbbPmrZqx+p4bblzqmoaawGoLd+93D43XKWu8YfKFVL0/o6gW5hhwpiifwjxgReNcYPD5VCuno6DWHxOdDz9l7cXkzZ2cpib+5TTRQLijPqsN1J9nf2NRlHNQ7/Il5p/WNR9toy7bOTA+WHuFulB6nH/aDfT/5rAkXUtyeCREVKB9AcZM244cd3BcmJSLY/6r2LDVzDKVmpejh9wG+8iguIOs332DBY2FTM67WTdJkQqjYWoPnp/089FTrVkOO+va/BFT0m32lb13lqoLQyfHJ3P5Zp/ffLeO+rdqEf9Gc6NssHRe1ex4JDZpC6bJIzr1hSpORLjtAQLPvBELBpsso0ZCrqxNKLGbrujW0upMDB8j7RLN9d9JpE9epxrkoONfzULa1/oA8DFoHtLjE1/+F/jkzjZ5H8I+Uea2heLrLDM99eTHpdVR285ZiD5uD4d67WiFdKgRhCvUMPqt4ZJZ+sjc8JKsBIoWbW6OStriMBkzX8Xr6MTSWnVjtmz3jWFiOQ+m0onVIHqTmKdeYq68Loq9M05E8PR/vrxauMuLNU1/uxlBNPU3eEi1mkWcG11YQBbusMbDJM7oKNNQaDdLTtf/vhbdmnP1I07n4i2BHMiV2xv96DZQ5nvUdZjvWvILIRW58lk63DtTUze1Bbm/sUtB+of4avP1PpA1G1t97wZj89xFUZzCBx8+W1496saLKKL32mQrQqPlrwI/tJH7BbR6k7YbdKXMH7zmytokWTWn2v5+gZB3u6EvwVscKjlPFk0LornSUm5UFi2mE2liNyzEQpOaAGUN3Q4kNADkL53IidlDcX75f5gpn+tMknkgmQAJB2ZHQfXUAu7qsbAr26RMUkKPvQH3R2CG0r3g/lF/Uqd/ad8T7xEHckQYcmtyoWiRx+RupcveDseV4Osn165Yj02QNo45FmEtZNJLtPjAmOxamLo+vscTFURHmmqi6sGevWfC++HwpjAdvm12RESynUjv8FQwLp6qZTYRkkcbjw09773vswikuQnaLIBwSf3v/8IFDAFMhenlaUu+2qr5oMfdBZDedJ2jyJcRgLB9GSG7yvoATA5tc+YoCuCnrhLy1h6TbNGKLfE7j0Mzca1FFHf/50lKyG/GPz8rdLaBOKv51RAcxvghxrSP0dxe9OhH5//gB4OGNJ0vS2VoNlD+GysS2AGl/39Rb766amN5KRIfvJfZX0E9TRK6Uta4SmAF2Rb0hRUsbkC4jf7sSMOJncbZUV9d1cWhZw6bbIylyDyJRUUJsjtDitE5f7vLaxYOy3JgVnPv/rjCizaHH7aVYnCyGPDybnPhAKIl0rCfbTFWSTmsdsy1fsxBz09rr1sCSy4RE0ufkmgVKhvsZo0OPOI6tk9xIEyqHuevTRGEHrSwxPK0ZKsX5SI6LOYazZvBfI+x40/112qUd/uGpTUsJvsiSAKDYJ1tykthsR1y8FzhwSSjfTnkfxxygeV1YG0Iqz5ufblJ9ZrGVppPn38BSDlst+xtugmuA/xtyHdjuN5QF+LERCaQQYDzvi4UtUkDwvBec4kmAjPzZu3Qtok6m6ADlh50xAxe6YeRV6u6LP1d/vvjqacEkO0wnpsF8qPFD6Ami8wfQJ+LaUoWjJs2I7vzb0TNfnfLVoFwloy5Y/noFLrshZHMQ1W5kCHI0/KqcpH8/Mmo6a/Tgnb8z01qWvUU31NfXPIieLo5KZjdVPMut16htGRTX5FlKlZ1ZO9ctf9lVJFY84A+kP2iYO7GfS6h6yoPRQV+rY+WU5W9Yy9N6op5MwS2cW7MH6N6jR5dxCk6dfAkyFwW4Ocg/MfTlxC6MfOIAVI7BkdN5o5/C2PgrCD2hLg6//6DIADn/H3l6Eq1r//6N0WLj9Qex/h3eFgfWfPe4JAiasW2x4KalT9X0F7gYOvL+5y3lvEF2NwLPGX/8Ef//9GEaW7/CwpqS3PtX6xNA1OAAAAAAA=" alt="" className="paylt__rebuilt-trophy" aria-hidden="true" />
                  <div className="paylt__rebuilt-pill">1 ABERTURA = 1 PONTO</div>
                </div>
              </div>
              <div className="paylt__rebuilt-details">
                <div className="paylt__rebuilt-detail">
                  <p><strong>Restrição de volume</strong></p>
                  <p className="paylt__rebuilt-detail-sub">(30 a 100 Litros)</p>
                </div>
                <div className="paylt__rebuilt-detail">
                  <p><strong>Pontos</strong> por deposição individual de embalagens <strong>de vidro</strong></p>
                </div>
                <div className="paylt__rebuilt-detail">
                  <p><strong>Pontos</strong> por deposição individual de embalagens de <strong>plástico e metal</strong></p>
                </div>
                <div className="paylt__rebuilt-detail">
                  <p><strong>Pontos</strong> por abertura para depósito de <strong>papel e cartão</strong></p>
                </div>
                <div className="paylt__rebuilt-detail">
                  <p><strong>Pontos</strong> por abertura para depósito de <strong>resíduos orgânicos</strong></p>
                </div>
              </div>
              <div className="paylt__rebuilt-icons">
                <div className="paylt__rebuilt-icon-col">
                  <div className="paylt__rebuilt-icon"><img src={rebuiltIconAccessRestritor} alt="" /></div>
                  <p className="paylt__rebuilt-icon-label">SOTKIS <strong>ACCESS</strong></p>
                  <p className="paylt__rebuilt-icon-sub">c/restritor de volume</p>
                </div>
                <div className="paylt__rebuilt-icon-col">
                  <div className="paylt__rebuilt-icon"><img src={rebuiltIconDrs1} alt="" /></div>
                  <p className="paylt__rebuilt-icon-label">SOTKIS <strong>DRS</strong></p>
                </div>
                <div className="paylt__rebuilt-icon-col">
                  <div className="paylt__rebuilt-icon"><img src={rebuiltIconDrs2} alt="" /></div>
                  <p className="paylt__rebuilt-icon-label">SOTKIS <strong>DRS</strong></p>
                </div>
                <div className="paylt__rebuilt-icon-col">
                  <div className="paylt__rebuilt-icon"><img src={rebuiltIconAccess2} alt="" /></div>
                  <p className="paylt__rebuilt-icon-label">SOTKIS <strong>ACCESS</strong></p>
                </div>
                <div className="paylt__rebuilt-icon-col">
                  <div className="paylt__rebuilt-icon"><img src={rebuiltIconAccess3} alt="" /></div>
                  <p className="paylt__rebuilt-icon-label">SOTKIS <strong>ACCESS</strong></p>
                </div>
                <div className="paylt__rebuilt-icon-col paylt__rebuilt-icon-col--access-methods">
                  <img src={playtConectar} alt="Identificação RFID e Bluetooth" className="paylt__rebuilt-conectar" />
                </div>
              </div>
              <div className="paylt__rebuilt-containers">
                <img src={playtContentores} alt="Contentores P(L)AYT" />
              </div>
            </div>
          </AnimateOnScroll>

          {/* Mobile/Tablet Carousel — hidden on desktop via CSS */}
          <AnimateOnScroll animation="fadeBlur" delay={200} duration={1}>
            <div className="paylt__rebuilt-carousel-wrapper">
              <div className="paylt__rebuilt-badge">Como Funciona</div>
              <MobileCarousel mobileBreakpoint={1024}>

                {/* Slide 1: ACCESS c/restritor — indiferenciados */}
                <div className="paylt__rebuilt-slide">
                  <div className="paylt__rebuilt-slide-content">
                    <div className="paylt__rebuilt-slide-header">
                      <div className="paylt__rebuilt-slide-header-icon"><img src={rebuiltIconBilling} alt="" /></div>
                      <div className="paylt__rebuilt-slide-header-text">
                        <strong>Faturação por deposição</strong>
                        <span>de resíduos indiferenciados</span>
                      </div>
                    </div>
                    <div className="paylt__rebuilt-slide-pill-wrap">
                      <div className="paylt__rebuilt-pill">1 ABERTURA = REGISTO</div>
                    </div>
                    <div className="paylt__rebuilt-slide-detail">
                      <p><strong>Restrição de volume</strong></p>
                      <p className="paylt__rebuilt-detail-sub">(30 a 100 Litros)</p>
                    </div>
                    <div className="paylt__rebuilt-slide-icon">
                      <div className="paylt__rebuilt-slide-icon-img"><img src={rebuiltIconAccessRestritor} alt="" /></div>
                      <p className="paylt__rebuilt-slide-icon-label">SOTKIS <strong>ACCESS</strong></p>
                      <p className="paylt__rebuilt-slide-icon-sub">c/restritor de volume</p>
                    </div>
                  </div>
                  <img src={bgAccessIndiferenciados} className="paylt__rebuilt-slide-end-img" alt="" aria-hidden="true" />
                </div>

                {/* Slide 2: DRS vidro */}
                <div className="paylt__rebuilt-slide">
                  <div className="paylt__rebuilt-slide-content">
                    <div className="paylt__rebuilt-slide-header">
                      <div className="paylt__rebuilt-slide-header-icon"><img src={rebuiltIconMarketplace} alt="" /></div>
                      <div className="paylt__rebuilt-slide-header-text">
                        <strong>Trocar pontos em compras marketplace</strong>
                      </div>
                    </div>
                    <div className="paylt__rebuilt-slide-pill-wrap">
                      <img src={REBUILT_TROPHY_SRC} className="paylt__rebuilt-slide-trophy" alt="" aria-hidden="true" />
                      <div className="paylt__rebuilt-pill">1 EMBALAGEM = 1 PONTO</div>
                    </div>
                    <div className="paylt__rebuilt-slide-detail">
                      <p><strong>Pontos</strong> por deposição individual de embalagens <strong>de vidro</strong></p>
                    </div>
                    <div className="paylt__rebuilt-slide-icon">
                      <div className="paylt__rebuilt-slide-icon-img"><img src={rebuiltIconDrs1} alt="" /></div>
                      <p className="paylt__rebuilt-slide-icon-label">SOTKIS <strong>DRS</strong></p>
                    </div>
                  </div>
                </div>

                {/* Slide 3: DRS plástico e metal */}
                <div className="paylt__rebuilt-slide">
                  <div className="paylt__rebuilt-slide-content">
                    <div className="paylt__rebuilt-slide-pill-wrap">
                      <img src={REBUILT_TROPHY_SRC} className="paylt__rebuilt-slide-trophy" alt="" aria-hidden="true" />
                      <div className="paylt__rebuilt-pill">1 ABERTURA = 1 PONTO</div>
                    </div>
                    <div className="paylt__rebuilt-slide-detail">
                      <p><strong>Pontos</strong> por deposição individual de embalagens de <strong>plástico e metal</strong></p>
                    </div>
                    <div className="paylt__rebuilt-slide-icon">
                      <div className="paylt__rebuilt-slide-icon-img"><img src={rebuiltIconDrs2} alt="" /></div>
                      <p className="paylt__rebuilt-slide-icon-label">SOTKIS <strong>DRS</strong></p>
                    </div>
                  </div>
                </div>

                {/* Slide 4: ACCESS papel e cartão */}
                <div className="paylt__rebuilt-slide">
                  <div className="paylt__rebuilt-slide-content">
                    <div className="paylt__rebuilt-slide-detail">
                      <p><strong>Pontos</strong> por abertura para depósito de <strong>papel e cartão</strong></p>
                    </div>
                    <div className="paylt__rebuilt-slide-icon">
                      <div className="paylt__rebuilt-slide-icon-img"><img src={rebuiltIconAccess2} alt="" /></div>
                      <p className="paylt__rebuilt-slide-icon-label">SOTKIS <strong>ACCESS</strong></p>
                    </div>
                  </div>
                </div>

                {/* Slide 5: ACCESS resíduos orgânicos */}
                <div className="paylt__rebuilt-slide">
                  <div className="paylt__rebuilt-slide-content">
                    <div className="paylt__rebuilt-slide-detail">
                      <p><strong>Pontos</strong> por abertura para depósito de <strong>resíduos orgânicos</strong></p>
                    </div>
                    <div className="paylt__rebuilt-slide-icon">
                      <div className="paylt__rebuilt-slide-icon-img"><img src={rebuiltIconAccess3} alt="" /></div>
                      <p className="paylt__rebuilt-slide-icon-label">SOTKIS <strong>ACCESS</strong></p>
                    </div>
                  </div>
                </div>

                {/* Slide 6: Métodos de acesso */}
                <div className="paylt__rebuilt-slide paylt__rebuilt-slide--access-methods">
                  <div className="paylt__rebuilt-slide-content paylt__rebuilt-slide-content--centered">
                    <img src={playtConectar} alt="Identificação RFID e Bluetooth" className="paylt__rebuilt-slide-conectar" />
                  </div>
                </div>

              </MobileCarousel>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Componentes da Solução Section */}
      <section className="paylt__componentes-section">
        {/* Benefits Carousel */}
        <FeatureCarousel
          title={tAny.benefits.title}
          features={benefitsFeatures}
          imagePosition="right"
          backgroundColor="#F4FBFC"
          variant="full-background"
        />

        {/* Hardware Carousel */}
        <FeatureCarousel
          title={tAny.hardware.title}
          subtitle={tAny.hardware.subtitle}
          features={hardwareFeatures}
          imagePosition="left"
          backgroundColor="#F4FBFC"
          variant="full-background"
        />

        {/* Software Carousel */}
        <FeatureCarousel
          title={tAny.software.title}
          subtitle={tAny.software.subtitle}
          features={softwareFeatures}
          imagePosition="right"
          backgroundColor="#F4FBFC"
          variant="full-background"
        />
      </section>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="paylt__video-modal" onClick={closeVideoModal}>
          <div className="paylt__video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="paylt__video-modal-close" onClick={closeVideoModal} aria-label="Close video">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="paylt__video-modal-iframe-wrapper">
              <iframe
                width="853"
                height="480"
                src="https://www.youtube.com/embed/M0Gr6pVUz4E?controls=1&rel=0&modestbranding=1"
                title="SOTKON Intelligent Systems - We present Sotkis"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="paylt__video-modal-iframe"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
