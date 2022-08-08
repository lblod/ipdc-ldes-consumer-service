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
    await fetch(JSON_ENDPOINT, options);
  } catch (e) {
    console.error(`Processing member failed: ${e}`);
  }
}
