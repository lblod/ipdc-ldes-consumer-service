import { Member } from 'ldes-consumer';
import * as jsonld from 'jsonld';
import { JSON_ENDPOINT } from '../config';
export async function processMember(member: Member) {
  try {
    const fromRdf = await jsonld.fromRDF(member.quads);
    const doc = await jsonld.expand(fromRdf);
    const options: RequestInit = {
      method: 'PUT',
      headers: { 'Content-type': 'application/ld+json' },
      body: JSON.stringify(doc),
    };
    const response = await fetch(JSON_ENDPOINT, options);
    if (!response.ok) {
      throw new Error(`HTTP status code: ${response.status}`);
    }
  } catch (e) {
    console.error(`Processing member failed: ${e}`);
  }
}
