import { Member } from 'ldes-consumer';
import * as jsonld from 'jsonld';
import { JSON_ENDPOINT, LDES_ENDPOINT_HEADER_PREFIX } from '../config';
import { extractHeadersFromEnv } from '../utils/extractHeadersFromEnv';

export async function processMember(member: Member) {
  try {
    const fromRdf = await jsonld.fromRDF(member.quads);
    const doc = await jsonld.expand(fromRdf);

    const headers = extractHeadersFromEnv(LDES_ENDPOINT_HEADER_PREFIX);
    headers['Content-Type'] = 'application/ld+json';

    const options: RequestInit = {
      method: 'PUT',
      headers,
      body: JSON.stringify(doc),
    };
    console.log(options);
    const response = await fetch(JSON_ENDPOINT, options);
    if (!response.ok) {
      throw new Error(`HTTP status code: ${response.status}`);
    }
  } catch (e) {
    console.error(`Processing member failed: ${e}`);
  }
}
