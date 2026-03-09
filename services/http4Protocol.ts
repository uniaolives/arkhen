/**
 * HTTP/4 (Hypertemporal Transfer Protocol)
 *
 * A typed protocol model for Orb-based temporal exchanges.
 * This module is intentionally transport-agnostic so it can be reused from
 * browser UIs, service adapters and simulation harnesses.
 */

export const HTTP4_VERSION = 'HTTP/4';
export const HTTP4_UPGRADE_TOKEN = 'h4c';

export type CausalDirection = 'RETROCAUSAL' | 'FORWARD' | 'BIDIRECTIONAL';
export type ParadoxPolicy = 'REJECT' | 'MERGE' | 'COLLAPSE';
export type TemporalStatus = 'ANCHORED' | 'PENDING' | 'COLLAPSED';

export interface TemporalCoordinate {
  iso8601: string;
}

export interface Http4Uti {
  scheme: 'http4';
  host: string;
  path: string;
  temporalCoordinate?: string;
  lambda?: number;
}

export interface Http4Request {
  method: Http4Method;
  path: string;
  host: string;
  headers?: Record<string, string>;
  body?: string;
}

export interface Http4Response {
  status: number;
  reason: string;
  headers?: Record<string, string>;
  body?: string;
}

export type Http4Method =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'OPTIONS'
  | 'TRACE'
  | 'ANCHOR'
  | 'HANDOVER'
  | 'COLLAPSE';

export const HTTP4_STATUS_TEXT: Record<number, string> = {
  101: 'Switching Protocols',
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  204: 'No Content',
  301: 'Moved Temporally',
  302: 'Temporal Redirect',
  400: 'Bad Temporal Request',
  403: 'Forbidden',
  404: 'Not Found In Timeline',
  408: 'Temporal Timeout',
  409: 'Conflict',
  410: 'Gone',
  418: "I'm a teapot",
  425: 'Too Early',
  429: 'Temporal Density Exceeded',
  451: 'Unavailable For Legal Reasons',
  500: 'Kuramoto Field Failure',
  503: 'Coherence Field Unstable',
  504: 'Wormhole Timeout',
  509: 'Temporal Bandwidth Exceeded',
};

export interface HandoverRequest {
  targetTime: TemporalCoordinate;
  lambdaThreshold: number;
  phiQ: number;
  paradoxPolicy: ParadoxPolicy;
  signature: string;
  payload: string;
}

export interface HandoverResult {
  temporalStatus: TemporalStatus;
  lambdaActual: number;
  paradoxRisk: number;
  timechainHash: string;
}

export function parseHttp4Uti(uti: string): Http4Uti {
  const url = new URL(uti);
  if (url.protocol !== 'http4:') {
    throw new Error(`Invalid UTI protocol: ${url.protocol}`);
  }

  const lambdaParam = url.searchParams.get('lambda');
  const temporalCoordinate = url.searchParams.get('t') ?? undefined;

  return {
    scheme: 'http4',
    host: url.host,
    path: url.pathname || '/',
    temporalCoordinate,
    lambda: lambdaParam ? Number(lambdaParam) : undefined,
  };
}

export function formatHttp4Request(request: Http4Request): string {
  const lines: string[] = [];
  lines.push(`${request.method} ${request.path} ${HTTP4_VERSION}`);
  lines.push(`Host: ${request.host}`);

  for (const [key, value] of Object.entries(request.headers ?? {})) {
    lines.push(`${key}: ${value}`);
  }

  lines.push('');

  if (request.body) {
    lines.push(request.body);
  }

  return lines.join('\n');
}

export function formatHttp4Response(response: Http4Response): string {
  const lines: string[] = [];
  const reason = response.reason || HTTP4_STATUS_TEXT[response.status] || 'Unknown';

  lines.push(`${HTTP4_VERSION} ${response.status} ${reason}`);

  for (const [key, value] of Object.entries(response.headers ?? {})) {
    lines.push(`${key}: ${value}`);
  }

  lines.push('');

  if (response.body) {
    lines.push(response.body);
  }

  return lines.join('\n');
}

export function buildUpgradeProbe(host: string): Http4Request {
  return {
    method: 'OPTIONS',
    path: '*',
    host,
    headers: {
      Upgrade: HTTP4_UPGRADE_TOKEN,
      Connection: 'Upgrade',
      'X-Temporal-Capabilities': 'retrocausal,mobius,tachyonic',
    },
  };
}

export function buildHandoverRequest(host: string, path: string, handover: HandoverRequest): Http4Request {
  return {
    method: 'HANDOVER',
    path,
    host,
    headers: {
      'Content-Type': 'application/x-orb+binary',
      'X-Target-Time': handover.targetTime.iso8601,
      'X-Lambda-Threshold': handover.lambdaThreshold.toFixed(3),
      'X-Phi-Q': handover.phiQ.toFixed(3),
      'X-Paradox-Policy': handover.paradoxPolicy,
      'X-PQC-Signature': handover.signature,
      'X-Causal-Direction': 'RETROCAUSAL',
    },
    body: handover.payload,
  };
}

export function evaluateParadoxRisk(targetUnixTime: number, lambdaThreshold: number, nowUnixTime = Math.floor(Date.now() / 1000)): number {
  const temporalDistance = Math.abs(targetUnixTime - nowUnixTime);
  const coherencePenalty = 1 - Math.min(Math.max(lambdaThreshold, 0), 1);
  const risk = temporalDistance * coherencePenalty * 0.00001;
  return Number(risk.toFixed(6));
}

export function buildHandoverResponse(result: HandoverResult): Http4Response {
  const status = result.paradoxRisk > 0.1 ? 409 : 200;

  return {
    status,
    reason: HTTP4_STATUS_TEXT[status],
    headers: {
      'Content-Type': 'application/x-orb+binary',
      'X-Temporal-Status': result.temporalStatus,
      'X-Lambda-Actual': result.lambdaActual.toFixed(3),
      'X-Paradox-Risk': result.paradoxRisk.toFixed(4),
      'X-Timechain-Hash': result.timechainHash,
    },
  };
}
