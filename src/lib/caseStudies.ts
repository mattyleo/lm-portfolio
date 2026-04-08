import type { LucideIcon } from "lucide-react";
import { Server, Shield, BarChart3, Headphones } from "lucide-react";

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  highlights: string[];
  stack: string[];
  body: {
    problem: string[];
    approach: string[];
    outcome: string[];
  };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "infrastrutture-virtualizzazione",
    title: "Infrastrutture & Virtualizzazione",
    subtitle: "Proxmox, ZFS/Ceph, backup e migrazioni",
    icon: Server,
    highlights: [
      "Riduzione downtime e tempi di ripristino",
      "Standardizzazione VM e backup PBS",
      "Hardening e documentazione",
    ],
    stack: ["Proxmox", "ZFS", "Ceph", "PBS", "Linux", "Windows Server"],
    body: {
      problem: [
        "Infrastruttura eterogenea e poco documentata",
        "Backup non verificati e restore lenti",
      ],
      approach: [
        "Assessment + piano migrazione",
        "Backup strategy con retention e test restore",
        "Hardening e procedure operative",
      ],
      outcome: [
        "Maggiore affidabilità e tempi di recovery ridotti",
        "Ambiente più leggibile e mantenibile",
      ],
    },
  },
  {
    slug: "reti-sicurezza",
    title: "Reti Aziendali & Sicurezza",
    subtitle: "VLAN, routing, Wi-Fi enterprise, firewall e VPN",
    icon: Shield,
    highlights: [
      "Segmentazione per reparti e magazzini",
      "VPN e policy coerenti",
      "Riduzione superfici di attacco",
    ],
    stack: ["VLAN", "Routing", "Fortinet", "UniFi", "IPsec/OpenVPN"],
    body: {
      problem: [
        "Rete piatta con rischio laterale elevato",
        "Accessi remoti non standardizzati",
      ],
      approach: [
        "Design VLAN + regole a castello",
        "Wi-Fi enterprise e SSID per profili",
        "VPN con policy e logging",
      ],
      outcome: [
        "Rete più sicura e controllabile",
        "Migliore esperienza utente e meno incidenti",
      ],
    },
  },
  {
    slug: "monitoring-logging",
    title: "Monitoring & Logging",
    subtitle: "Elastic Stack, dashboard e alerting utili",
    icon: BarChart3,
    highlights: [
      "Visibilità centralizzata eventi e performance",
      "Alert su eventi critici",
      "Dashboard operative",
    ],
    stack: ["Elasticsearch", "Kibana", "Beats/Agent", "Windows Logs"],
    body: {
      problem: [
        "Log distribuiti e difficili da correlare",
        "Nessun alerting affidabile",
      ],
      approach: [
        "Centralizzazione log e parsing",
        "Dashboard per use-case (login, USB, rete)",
        "Alerting con soglie e contesto",
      ],
      outcome: [
        "Riduzione tempi di diagnosi",
        "Migliore postura di sicurezza",
      ],
    },
  },
  {
    slug: "consulenza-assistenza",
    title: "Consulenza & Assistenza IT",
    subtitle: "Analisi, remediation e supporto continuativo",
    icon: Headphones,
    highlights: [
      "Interventi rapidi e documentati",
      "Standard e checklist",
      "Riduzione ricorrenze",
    ],
    stack: ["IT Ops", "Troubleshooting", "Documentation"],
    body: {
      problem: [
        "Incidenti ricorrenti e processi non definiti",
        "Poco controllo su cambiamenti e configurazioni",
      ],
      approach: [
        "Analisi root-cause e remediation",
        "Procedure e documentazione",
        "Piano di miglioramento continuo",
      ],
      outcome: [
        "Meno interruzioni e più prevedibilità",
        "Supporto più scalabile",
      ],
    },
  },
];

function normalizeSlug(input: string) {
  return decodeURIComponent(input).trim().toLowerCase();
}

export function getCaseStudy(slug: string) {
  const s = normalizeSlug(slug);
  return caseStudies.find((c) => c.slug === s);
}
