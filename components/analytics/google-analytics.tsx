"use client"

import Script from "next/script"

const GA_TRACKING_ID = "G-2RD99G2DC0"

export default function GoogleAnalytics() {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  )
}

// Hook para rastrear eventos personalizados
export const useGoogleAnalytics = () => {
  const trackEvent = (action: string, category: string, label?: string, value?: number) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
      })
    }
  }

  const trackFormSubmission = (formName: string) => {
    trackEvent("form_submit", "engagement", formName)
  }

  const trackButtonClick = (buttonName: string, section?: string) => {
    trackEvent("click", "engagement", `${section ? section + "_" : ""}${buttonName}`)
  }

  const trackSectionView = (sectionName: string) => {
    trackEvent("view_section", "engagement", sectionName)
  }

  const trackDownload = (fileName: string) => {
    trackEvent("download", "engagement", fileName)
  }

  return {
    trackEvent,
    trackFormSubmission,
    trackButtonClick,
    trackSectionView,
    trackDownload,
  }
}

// Declaração de tipos para o gtag
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void
  }
}
