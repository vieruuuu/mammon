import { encode } from "std/encoding/base64.ts";

const decoder = new TextDecoder("utf-8");
const stealthFile = await Deno.readFile("./scripts/stealth.min.js");
const stealthScript = decoder.decode(stealthFile);

const encoder = new TextEncoder();

const stealthTsFile = `
import { decode } from "std/encoding/base64.ts";

export default decode(\`${encode(stealthScript)}\`);
`;

Deno.writeFile("./lib/stealth.ts", encoder.encode(stealthTsFile));
