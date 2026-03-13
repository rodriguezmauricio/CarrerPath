import { Company } from '../types';
import { anthropic } from './anthropic';
import { openai } from './openai';
import { google } from './google';
import { meta } from './meta';
import { stripe } from './stripe';
import { aws } from './aws';

export const allCompanies: Company[] = [
  anthropic,
  openai,
  google,
  meta,
  stripe,
  aws,
];

export const companyRegistry = new Map<string, Company>(
  allCompanies.map(company => [company.id, company])
);

export function getCompany(id: string): Company | undefined {
  return companyRegistry.get(id);
}

export { anthropic, openai, google, meta, stripe, aws };
