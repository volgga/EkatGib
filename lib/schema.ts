import { faq } from "@/lib/site-data";

const siteUrl = "https://gibadullina-psychology.ru";
const name = "Гибадуллина Екатерина Вахитовна";
const telephone = "+7 908 492-10-19";
const description =
  "Семейный психолог, медиатор и юридический психолог. Онлайн-консультации по всей России и из других стран.";

export const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#professional-service`,
    name,
    description,
    url: siteUrl,
    telephone,
    image: `${siteUrl}/og-image.png`,
    areaServed: {
      "@type": "Country",
      name: "Россия",
    },
    serviceType: [
      "семейный психолог",
      "медиатор",
      "юридический психолог",
    ],
    founder: {
      "@id": `${siteUrl}/#person`,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name,
    jobTitle: "Семейный психолог, медиатор, юридический психолог",
    telephone,
    url: siteUrl,
    image: `${siteUrl}/images/ekaterina-hero.webp`,
    worksFor: {
      "@id": `${siteUrl}/#professional-service`,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "Семейный психолог Екатерина Гибадуллина",
    url: siteUrl,
    inLanguage: "ru-RU",
    publisher: {
      "@id": `${siteUrl}/#person`,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteUrl}/#faq`,
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  },
];
