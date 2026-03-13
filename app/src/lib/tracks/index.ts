import { Track } from '../types';
import { coreLangTrack } from './core-lang';
import { apisTrack } from './apis';
import { authSecurityTrack } from './auth-security';
import { sqlDataTrack } from './sql-data';
import { networkingTrack } from './networking';
import { debuggingTrack } from './debugging';
import { devToolsTrack } from './dev-tools';
import { aiLlmTrack } from './ai-llm';
import { enterpriseSupportTrack } from './enterprise-support';
import { complianceTrack } from './compliance';
import { softSkillsTrack } from './soft-skills';
import { openaiApiDeepTrack } from './openai-api-deep';
import { googleCloudTrack } from './google-cloud';
import { metaInfraTrack } from './meta-infra';
import { stripePaymentsTrack } from './stripe-payments';
import { awsServicesTrack } from './aws-services';

export const allTracks: Track[] = [
  coreLangTrack,
  apisTrack,
  authSecurityTrack,
  sqlDataTrack,
  networkingTrack,
  debuggingTrack,
  devToolsTrack,
  aiLlmTrack,
  enterpriseSupportTrack,
  complianceTrack,
  softSkillsTrack,
  openaiApiDeepTrack,
  googleCloudTrack,
  metaInfraTrack,
  stripePaymentsTrack,
  awsServicesTrack,
];

export const trackRegistry = new Map<string, Track>(
  allTracks.map(track => [track.id, track])
);

export function getTrack(id: string): Track | undefined {
  return trackRegistry.get(id);
}

export {
  coreLangTrack,
  apisTrack,
  authSecurityTrack,
  sqlDataTrack,
  networkingTrack,
  debuggingTrack,
  devToolsTrack,
  aiLlmTrack,
  enterpriseSupportTrack,
  complianceTrack,
  softSkillsTrack,
  openaiApiDeepTrack,
  googleCloudTrack,
  metaInfraTrack,
  stripePaymentsTrack,
  awsServicesTrack,
};
