
import { Department } from './types';

export const DEPARTMENTS: Department[] = [
  { id: "production", name: "Production" },
  { id: "qualite", name: "Qualité" },
  { id: "logistique", name: "Logistique" },
  { id: "maintenance", name: "Maintenance" },
  { id: "administration", name: "Administration" },
  { id: "rh", name: "Ressources Humaines" },
  { id: "commercial", name: "Commercial" },
  { id: "finance", name: "Finances" },
  { id: "achats", name: "Achats" }
];

export const ABSENCE_TYPES = [
  "Maladie",
  "Personnel",
  "Formation",
  "Accident de travail",
  "Maternité",
  "Paternité",
  "Congé annuel",
  "Congé sans solde",
  "Autre"
];

export const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

export const SHORT_MONTHS = [
  "Jan", "Fév", "Mar", "Avr", "Mai", "Juin",
  "Juil", "Août", "Sept", "Oct", "Nov", "Déc"
];
