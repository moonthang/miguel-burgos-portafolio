"use client";

import React, { useState, useMemo } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/components/dev-portfolio";
import { ExternalLink, Calendar, Award, ArrowUpDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CiscoIcon = () => (
    <div className="w-10 h-10 bg-card flex items-center justify-center rounded-md overflow-hidden">
        <Image src="https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/cmddjy8sk2jwv07lutmi29a8e" alt="Cisco CCNA1" width={40} height={40} className="rounded-md object-cover"/>
    </div>
);

const CodigoFacilitoIcon = () => (
    <div className="w-10 h-10 bg-card flex items-center justify-center rounded-md overflow-hidden">
        <Image src="https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/resize=width:48,height:48,fit:crop/cmddk5yef3jwg07ljxgqng03d" alt="Código Facilito" width={40} height={40} className="rounded-md object-cover" />
    </div>
);

const AluraIcon = () => (
    <div className="w-10 h-10 bg-card flex items-center justify-center rounded-md overflow-hidden">
        <Image src="https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/resize=width:48,height:48,fit:crop/cmddk5ydt3r2507luxhbabdp8" alt="Alura Latam" width={40} height={40} className="rounded-md object-cover" />
    </div>
);

const OracleIcon = () => (
    <div className="w-10 h-10 bg-card flex items-center justify-center rounded-md overflow-hidden">
        <Image src="https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/resize=width:48,height:48,fit:crop/cmddk5ycu3jwa07lja3050u49" alt="Oracle" width={40} height={40} className="rounded-md object-cover" />
    </div>
);

const PlatziIcon = () => (
    <div className="w-10 h-10 bg-card flex items-center justify-center rounded-md overflow-hidden">
        <Image src="https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/resize=width:48,height:48,fit:crop/cmddjy8sk2dz607ljgdig33ko" alt="Platzi" width={40} height={40} className="rounded-md object-cover" />
    </div>
);

const UniversidadDelBosqueIcon = () => (
    <div className="w-10 h-10 bg-card flex items-center justify-center rounded-md overflow-hidden">
        <Image src="https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/resize=width:48,height:48,fit:crop/cmddjy8su2jx107lu4qh2gvco" alt="Universidad del Bosque" width={40} height={40} className="rounded-md object-cover" />
    </div>
);

const GoogleDigitalGarageIcon = () => (
    <div className="w-10 h-10 bg-card flex items-center justify-center rounded-md overflow-hidden">
        <Image src="https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/resize=width:48,height:48,fit:crop/cmdfcq50ejh8c07lp41lfysf1" alt="Google Digital Garage" width={40} height={40} className="rounded-md object-cover" />
    </div>
);

export const allCertificates = [
    {
      icon: <CiscoIcon />,
      certImage: "https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/cmddm8d3k9kmc07lu8hua60gi",
      aiHint: "network certificate",
      titleKey: 'certifications.ccna1.title',
      issuerKey: 'certifications.ccna1.issuer',
      dateKey: 'certifications.ccna1.date',
      link: 'https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/cmddm5i2p9grn07lue6k0qj4k'
    },
    {
      icon: <CodigoFacilitoIcon />,
      certImage: "https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/cmddn5cx3ba2n07luiw2176ss",
      aiHint: "data science certificate",
      titleKey: 'certifications.dataScienceAzure.title',
      issuerKey: 'certifications.dataScienceAzure.issuer',
      dateKey: 'certifications.dataScienceAzure.date',
      link: 'https://codigofacilito.com/certificates/41663e33-4141-4ace-a9dd-ad19343cfb13'
    },
    {
      icon: <OracleIcon />,
      certImage: "https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/cmdfdfgltk3h407k8whx53fwp",
      aiHint: "java certificate",
      titleKey: 'certifications.javaProgramming.title',
      issuerKey: 'certifications.javaProgramming.issuer',
      dateKey: 'certifications.javaProgramming.date',
      link: '#'
    },
    {
      icon: <OracleIcon />,
      certImage: "https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/cmdfdfglak3hc07lptrmwztct",
      aiHint: "java certificate",
      titleKey: 'certifications.javaFoundations.title',
      issuerKey: 'certifications.javaFoundations.issuer',
      dateKey: 'certifications.javaFoundations.date',
      link: '#'
    },
    {
      icon: <AluraIcon />,
      certImage: "https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/cmddn1oumb3jx07lufnpvwv9o",
      aiHint: "cloud certificate",
      titleKey: 'certifications.oracleCloud.title',
      issuerKey: 'certifications.oracleCloud.issuer',
      dateKey: 'certifications.oracleCloud.date',
      link: 'https://app.aluracursos.com/degree/certificate/93c9db22-018c-41fd-8a60-82bc6426db57?lang'
    },
    {
      icon: <AluraIcon />,
      certImage: "https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/cmddn1ov6av9z07ljdj5a5dqn",
      aiHint: "database certificate",
      titleKey: 'certifications.sqlMysql.title',
      issuerKey: 'certifications.sqlMysql.issuer',
      dateKey: 'certifications.sqlMysql.date',
      link: 'https://app.aluracursos.com/degree/certificate/0d450dcd-2b5c-4e7b-9be7-7661fd7bb565?lang'
    },
    {
      icon: <AluraIcon />,
      certImage: "https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/cmddn1oumb3jz07lu1hyzzvul",
      aiHint: "database certificate",
      titleKey: 'certifications.sqlServer.title',
      issuerKey: 'certifications.sqlServer.issuer',
      dateKey: 'certifications.sqlServer.date',
      link: 'https://app.aluracursos.com/degree/certificate/594c2731-0fe9-43ce-bc3c-a0c951eb6bbf?lang'
    },
    {
      icon: <AluraIcon />,
      certImage: "https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/cmddn1otsb3jl07luremwe3zb",
      aiHint: "ai certificate",
      titleKey: 'certifications.genAI.title',
      issuerKey: 'certifications.genAI.issuer',
      dateKey: 'certifications.genAI.date',
      link: 'https://app.aluracursos.com/degree/certificate/bd638fb5-ea13-4e60-802f-b1a355e8cab9?lang'
    },
    {
      icon: <AluraIcon />,
      certImage: "https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/cmddn1ouzav9u07ljrp3r9vfk",
      aiHint: "react certificate",
      titleKey: 'certifications.reactJs.title',
      issuerKey: 'certifications.reactJs.issuer',
      dateKey: 'certifications.reactJs.date',
      link: 'https://app.aluracursos.com/degree/certificate/adc07f3b-874d-4dff-898d-4f31d1b6cf25?lang'
    },
    {
      icon: <AluraIcon />,
      certImage: "https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/cmddn1otlav9507ljq03cqazx",
      aiHint: "frontend certificate",
      titleKey: 'certifications.frontend.title',
      issuerKey: 'certifications.frontend.issuer',
      dateKey: 'certifications.frontend.date',
      link: 'https://app.aluracursos.com/program/certificate/9cba626b-6e18-48e7-8a1e-0c12465ee808?lang'
    },
    {
      icon: <AluraIcon />,
      certImage: "https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/cmddn1otvb3jo07lutjfbwm7o",
      aiHint: "react certificate",
      titleKey: 'certifications.react.title',
      issuerKey: 'certifications.react.issuer',
      dateKey: 'certifications.react.date',
      link: 'https://app.aluracursos.com/degree/certificate/a58bdf0e-270f-41b6-9914-32b5c6bbbf36?lang'
    },
    {
      icon: <AluraIcon />,
      certImage: "https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/cmddn1oueav9i07ljaemp4q8n",
      aiHint: "frontend certificate",
      titleKey: 'certifications.oracleFrontend.title',
      issuerKey: 'certifications.oracleFrontend.issuer',
      dateKey: 'certifications.oracleFrontend.date',
      link: 'https://app.aluracursos.com/program/certificate/2c41ca81-0678-4c27-a270-6a38ea73df85?lang'
    },
    {
      icon: <AluraIcon />,
      certImage: "https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/cmddn1otwav9b07ljl540f0gy",
      aiHint: "javascript certificate",
      titleKey: 'certifications.logicJs.title',
      issuerKey: 'certifications.logicJs.issuer',
      dateKey: 'certifications.logicJs.date',
      link: 'https://app.aluracursos.com/degree/certificate/7c5df021-57b0-4cd4-ab35-c7f59f18da74?lang'
    },
    {
      icon: <AluraIcon />,
      certImage: "https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/cmddn1ovyb3k807luht8fdh2h",
      aiHint: "git github certificate",
      titleKey: 'certifications.gitGithub.title',
      issuerKey: 'certifications.gitGithub.issuer',
      dateKey: 'certifications.gitGithub.date',
      link: 'https://app.aluracursos.com/certificate/033303a4-13a8-4286-b184-469b3f3a1d1e?lang'
    },
    {
      icon: <OracleIcon />,
      certImage: "https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/cmdfdfgl8k3gm07k8m8uldm6r",
      aiHint: "database certificate",
      titleKey: 'certifications.databaseDesign.title',
      issuerKey: 'certifications.databaseDesign.issuer',
      dateKey: 'certifications.databaseDesign.date',
      link: '#'
    },
    {
      icon: <OracleIcon />,
      certImage: "https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/cmdfdfgluk3h707k81b54zx35",
      aiHint: "database certificate",
      titleKey: 'certifications.databaseFoundations.title',
      issuerKey: 'certifications.databaseFoundations.issuer',
      dateKey: 'certifications.databaseFoundations.date',
      link: '#'
    },
    {
      icon: <OracleIcon />,
      certImage: "https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/cmdfdfgldk3gr07k8w06kl37l",
      aiHint: "java certificate",
      titleKey: 'certifications.javaFundamentals.title',
      issuerKey: 'certifications.javaFundamentals.issuer',
      dateKey: 'certifications.javaFundamentals.date',
      link: '#'
    },
    {
      icon: <PlatziIcon />,
      certImage: "https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/cmdfdfgl6k3h607lprobgb951",
      aiHint: "git github certificate",
      titleKey: 'certifications.gitGithubPlatzi.title',
      issuerKey: 'certifications.gitGithubPlatzi.issuer',
      dateKey: 'certifications.gitGithubPlatzi.date',
      link: '#'
    },
    {
      icon: <UniversidadDelBosqueIcon />,
      certImage: "https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/cmdfdfglvk3hq07lpzggq9sfd",
      aiHint: "software certificate",
      titleKey: 'certifications.softwareDevelopment.title',
      issuerKey: 'certifications.softwareDevelopment.issuer',
      dateKey: 'certifications.softwareDevelopment.date',
      link: '#'
    },
    {
      icon: <UniversidadDelBosqueIcon />,
      certImage: "https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/cmdfdfgm3k3hf07k8ut7rmso0",
      aiHint: "programming certificate",
      titleKey: 'certifications.programmingFundamentals.title',
      issuerKey: 'certifications.programmingFundamentals.issuer',
      dateKey: 'certifications.programmingFundamentals.date',
      link: '#'
    },
    {
      icon: <UniversidadDelBosqueIcon />,
      certImage: "https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/cmdfdfgluk3ho07lp0wx4fxt7",
      aiHint: "programming certificate",
      titleKey: 'certifications.basicProgramming.title',
      issuerKey: 'certifications.basicProgramming.issuer',
      dateKey: 'certifications.basicProgramming.date',
      link: '#'
    },
    {
      icon: <GoogleDigitalGarageIcon />,
      certImage: "https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/cmdfdfglhk3hi07lpzcbhgx9d",
      aiHint: "marketing certificate",
      titleKey: 'certifications.digitalMarketing.title',
      issuerKey: 'certifications.digitalMarketing.issuer',
      dateKey: 'certifications.digitalMarketing.date',
      link: '#'
    },
    {
      icon: <CiscoIcon />,
      certImage: "https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/cmdfdfglok3gz07k8ofn8vltj",
      aiHint: "data science certificate",
      titleKey: 'certifications.introDataScience.title',
      issuerKey: 'certifications.introDataScience.issuer',
      dateKey: 'certifications.introDataScience.date',
      link: 'https://www.credly.com/badges/7cb6e88a-afce-456e-90b9-ea10fd0f80f2/public_url'
    }
  ];

const monthMap: Record<string, Record<string, number>> = {
  es: {'ene': 0, 'feb': 1, 'mar': 2, 'abr': 3, 'may': 4, 'jun': 5, 'jul': 6, 'ago': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dic': 11},
  en: {'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'may': 4, 'jun': 5, 'jul': 6, 'aug': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dec': 11},
};

const parseDate = (dateString: string, lang: 'es' | 'en', t: (key: string, options?: any) => string) => {
  const parts = t(dateString, { lng: lang }).toLowerCase().replace('.', '').split(' ');
  if (parts.length < 2) return new Date(0);
  
  const monthStr = parts[0].substring(0, 3);
  const month = monthMap[lang]?.[monthStr];
  const year = parseInt(parts[1], 10);
  
  if (month !== undefined && !isNaN(year)) {
    return new Date(year, month);
  }
  return new Date(0);
};


export default function CertificationsPage() {
  const { t, language } = useTranslation();
  const [sortOrder, setSortOrder] = useState('newest');
  const [issuerFilter, setIssuerFilter] = useState('all');

  const issuers = useMemo(() => {
    const issuerSet = new Set(allCertificates.map(cert => t(cert.issuerKey)));
    return ['all', ...Array.from(issuerSet)];
  }, [t]);

  const filteredAndSortedCertificates = useMemo(() => {
    let certificates = [...allCertificates];

    if (issuerFilter !== 'all') {
      certificates = certificates.filter(cert => t(cert.issuerKey) === issuerFilter);
    }

    const lang = language as 'es' | 'en';
    certificates.sort((a, b) => {
      const dateA = parseDate(a.dateKey, lang, t);
      const dateB = parseDate(b.dateKey, lang, t);

      if (sortOrder === 'newest') {
        return dateB.getTime() - dateA.getTime();
      } else {
        return dateA.getTime() - dateB.getTime();
      }
    });

    return certificates;
  }, [sortOrder, issuerFilter, t, language]);


  return (
    <div className="space-y-6">
        <Card className="shadow-lg">
            <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                        <Award className="w-6 h-6" />
                        {t('nav.certifications')}
                    </CardTitle>
                    <div className="flex flex-row items-center gap-4 w-full sm:w-auto">
                        <Select value={sortOrder} onValueChange={setSortOrder}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <div className="flex items-center gap-2">
                                    <ArrowUpDown className="h-4 w-4" />
                                    <SelectValue />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="newest">{t('certificationsPage.sortNewest')}</SelectItem>
                                <SelectItem value="oldest">{t('certificationsPage.sortOldest')}</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={issuerFilter} onValueChange={setIssuerFilter}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder={t('certificationsPage.filterPlaceholder')} />
                            </SelectTrigger>
                            <SelectContent>
                                {issuers.map(issuer => (
                                    <SelectItem key={issuer} value={issuer}>
                                        {issuer === 'all' ? t('certificationsPage.filterAll') : issuer}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {filteredAndSortedCertificates.map((cert, index) => (
                        <Card key={index} className="overflow-hidden group">
                            <div className="relative aspect-[4/3]">
                                <Image 
                                    src={cert.certImage} 
                                    alt={`Certificate for ${t(cert.titleKey)}`} 
                                    fill 
                                    style={{objectFit: 'cover'}} 
                                    className="transition-transform duration-300"
                                    data-ai-hint={cert.aiHint}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Button asChild variant="secondary" size="sm">
                                        <Link href={cert.link === '#' ? cert.certImage : cert.link} target="_blank">
                                            <ExternalLink className="mr-2 h-4 w-4" />
                                            {t('certificationsPage.showCredential')}
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                            <CardContent className="p-4">
                                <div className="flex items-start gap-4">
                                    {cert.icon}
                                    <div className="flex-grow">
                                        <p className="font-semibold">{t(cert.titleKey)}</p>
                                        <p className="text-sm text-muted-foreground">{t(cert.issuerKey)}</p>
                                        <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-2">
                                            <Calendar className="w-3 h-3" /> {t(cert.dateKey)}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    </div>
  );
}