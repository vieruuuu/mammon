import puppeteer from "puppeteer";

import { PUPPETEER_REVISIONS } from "puppeteer/vendor/puppeteer-core/puppeteer/revisions.js";
import ProgressBar from "https://deno.land/x/progress@v1.1.4/mod.ts";

const fetcher = puppeteer.createBrowserFetcher({ product: "chrome" });

const revisionInfo = fetcher.revisionInfo(PUPPETEER_REVISIONS.chromium);

export default async function downloadChrome() {
  if (revisionInfo.local) {
    return;
  }

  console.log("Downloading a version of Chromium, this could take a while...");

  let progressBar: ProgressBar;

  const newRevisionInfo = await fetcher.download(
    revisionInfo.revision,
    (current, total) => {
      if (!progressBar) {
        progressBar = new ProgressBar({
          total,
        });
      }

      if (!(progressBar as any).isCompleted) {
        progressBar.render(current);
      } else {
        console.log("Done downloading. Installing now.");
      }
    }
  );

  console.log(
    `Downloaded ${newRevisionInfo.product} ${newRevisionInfo.revision} to ${newRevisionInfo.executablePath} from ${newRevisionInfo.url}`
  );
}
