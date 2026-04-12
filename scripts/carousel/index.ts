#!/usr/bin/env node
/**
 * AyahGuide Carousel Exporter
 *
 * Usage:
 *   npx tsx scripts/carousel/index.ts <name>        # build from content file
 *   npx tsx scripts/carousel/index.ts alkahf-carousel.html   # export existing HTML
 *
 * Or via npm:
 *   npm run carousel -- musa-profile
 *   npm run carousel -- alkahf-carousel.html
 *
 * Output: exports/carousel/<name>/slide-1.png … slide-N.png
 */

import path from 'path';
import { exportCarousel } from './export';

async function main() {
  const name = process.argv[2];
  if (!name) {
    console.log('Usage: npx tsx scripts/carousel/index.ts <carousel-name>');
    console.log('');
    console.log('Available carousels:');
    console.log('  musa-profile        — Prophet Musa series (5 slides)');
    console.log('');
    console.log('You can also pass an existing HTML file:');
    console.log('  alkahf-carousel.html');
    process.exit(1);
  }

  // Support exporting existing HTML files directly
  if (name.endsWith('.html')) {
    const htmlPath = path.resolve(process.cwd(), name);
    const outputDir = path.join(process.cwd(), 'exports', 'carousel', path.basename(name, '.html'));
    console.log(`\nExporting: ${name}`);
    await exportCarousel(htmlPath, outputDir, true);
    console.log('\nDone! Drag the PNGs into Meta Business Suite to schedule.');
    return;
  }

  // Load from content directory
  const contentPath = path.resolve(__dirname, 'content', name);
  let mod: { buildHtml: () => string };

  try {
    mod = await import(contentPath);
  } catch (err) {
    console.error(`\nCould not load carousel: "${name}"`);
    console.error(`Expected: scripts/carousel/content/${name}.ts`);
    console.error('');
    console.error('Available: musa-profile');
    process.exit(1);
  }

  const html = mod.buildHtml();
  const outputDir = path.join(process.cwd(), 'exports', 'carousel', name);

  console.log(`\nBuilding "${name}" carousel...`);
  await exportCarousel(html, outputDir);
  console.log('\nDone! Drag the PNGs into Meta Business Suite to schedule.');
  console.log(`\nOpen in Finder: open ${outputDir}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
