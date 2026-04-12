import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import os from 'os';
import crypto from 'crypto';

export async function exportCarousel(
  htmlOrFile: string,
  outputDir: string,
  /** Pass true if htmlOrFile is a path to an existing .html file */
  isFilePath = false,
): Promise<void> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
  });

  let tmpFile: string | null = null;

  try {
    const page = await browser.newPage();
    // Wide/tall viewport so all slides render — each slide is 1080×1080
    await page.setViewport({ width: 1200, height: 6000, deviceScaleFactor: 1 });

    if (isFilePath) {
      await page.goto(`file://${path.resolve(htmlOrFile)}`, { waitUntil: 'networkidle0' });
    } else {
      // Write to a temp file so Google Fonts load correctly via file:// protocol bypass
      tmpFile = path.join(os.tmpdir(), `ayahguide-carousel-${crypto.randomBytes(4).toString('hex')}.html`);
      fs.writeFileSync(tmpFile, htmlOrFile, 'utf-8');
      await page.goto(`file://${tmpFile}`, { waitUntil: 'networkidle0' });
    }

    // Ensure web fonts are fully loaded
    await page.evaluate(() => (document as any).fonts.ready);
    await new Promise(r => setTimeout(r, 1800));

    fs.mkdirSync(outputDir, { recursive: true });

    // Try [data-slide] first (new template system), fall back to #slide-N (old HTML files)
    let slides = await page.$$('[data-slide]');
    if (slides.length === 0) {
      for (let i = 1; i <= 10; i++) {
        const el = await page.$(`#slide-${i}`);
        if (!el) break;
        slides.push(el);
      }
    }

    if (slides.length === 0) {
      throw new Error('No slides found. Make sure slides have [data-slide] or #slide-N IDs.');
    }

    console.log(`  Found ${slides.length} slide(s)`);

    for (let i = 0; i < slides.length; i++) {
      const outPath = path.join(outputDir, `slide-${i + 1}.png`);
      await slides[i].screenshot({ path: outPath });
      console.log(`  ✓ slide-${i + 1}.png`);
    }

    console.log(`\n  Saved to: ${outputDir}`);
  } finally {
    await browser.close();
    if (tmpFile && fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
  }
}
