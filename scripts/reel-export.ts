#!/usr/bin/env tsx
/**
 * AyahGuide — Reel Export Script
 *
 * Renders an animated HTML reel frame-by-frame using Puppeteer,
 * then assembles the frames into an MP4 with ffmpeg.
 *
 * Usage:
 *   npm run reel -- <reel-name>
 *   npm run reel -- la-tahzan
 *
 * Output: exports/reel/<name>/<name>.mp4
 *
 * Requirements: ffmpeg must be in PATH (brew install ffmpeg)
 */

import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

const FPS        = 24;
const WIDTH      = 1080;
const HEIGHT     = 1920;
// TOTAL_MS is read from the HTML's window.TOTAL_MS after page load

async function main() {
  const name = process.argv[2];
  if (!name) {
    console.error('Usage: npm run reel -- <reel-name>');
    process.exit(1);
  }

  const htmlPath = path.join(__dirname, 'reel', `${name}.html`);
  if (!fs.existsSync(htmlPath)) {
    console.error(`No reel HTML found at: ${htmlPath}`);
    process.exit(1);
  }

  const framesDir = path.join(__dirname, '../exports/reel', name, 'frames');
  const outDir    = path.join(__dirname, '../exports/reel', name);
  fs.mkdirSync(framesDir, { recursive: true });

  // ── Launch Puppeteer ───────────────────────────────────────────────
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 });

  console.log('\n⏳ Loading HTML + fonts...');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

  // Confirm the animation control API is loaded
  const apiReady = await page.evaluate(() => typeof (window as any).setAnimTime === 'function');
  if (!apiReady) {
    console.error('setAnimTime not found — check the HTML file.');
    await browser.close();
    process.exit(1);
  }

  // Read total duration from the HTML itself
  const TOTAL_MS: number = await page.evaluate(() => (window as any).TOTAL_MS ?? 20000);
  const totalFrames = Math.ceil((TOTAL_MS / 1000) * FPS);
  console.log(`\n🎬 Building reel "${name}"`);
  console.log(`   ${totalFrames} frames at ${FPS}fps (${(TOTAL_MS/1000).toFixed(1)}s)`);

  // ── Capture frames ─────────────────────────────────────────────────
  console.log('\n📸 Capturing frames...');
  const msPerFrame = 1000 / FPS;

  for (let i = 0; i < totalFrames; i++) {
    const t = Math.round(i * msPerFrame);
    await page.evaluate((ms: number) => { (window as any).setAnimTime(ms); }, t);
    // One rAF tick to ensure layout is applied
    await page.evaluate(() => new Promise<void>(r => requestAnimationFrame(() => r())));

    const framePath = path.join(framesDir, `frame-${String(i).padStart(5, '0')}.png`);
    await page.screenshot({ path: framePath as `${string}.png` });

    if (i % 24 === 0 || i === totalFrames - 1) {
      const sec = (t / 1000).toFixed(1);
      process.stdout.write(`\r   frame ${i + 1}/${totalFrames}  t=${sec}s   `);
    }
  }
  console.log('\n');
  await browser.close();

  // ── Assemble with ffmpeg ───────────────────────────────────────────
  const outPath = path.join(outDir, `${name}.mp4`);
  console.log('🎞  Assembling MP4 with ffmpeg...');

  const ffmpegCmd = [
    'ffmpeg -y',
    `-framerate ${FPS}`,
    `-i "${path.join(framesDir, 'frame-%05d.png')}"`,
    '-c:v libx264',
    '-preset slow',
    '-crf 16',
    '-pix_fmt yuv420p',
    '-movflags +faststart',
    `"${outPath}"`,
  ].join(' ');

  try {
    execSync(ffmpegCmd, { stdio: 'pipe' });
    const stats = fs.statSync(outPath);
    const mb = (stats.size / 1024 / 1024).toFixed(1);
    console.log(`   ✓ ${outPath}`);
    console.log(`   ✓ ${mb} MB\n`);
  } catch (err: any) {
    console.error('ffmpeg failed:', err.message);
    process.exit(1);
  }

  // ── Optionally clean up frames ─────────────────────────────────────
  const keepFrames = process.argv.includes('--keep-frames');
  if (!keepFrames) {
    fs.rmSync(framesDir, { recursive: true });
    console.log('   (frames cleaned up — pass --keep-frames to retain)\n');
  }

  console.log(`✅ Reel ready: open "${outPath}"\n`);
  console.log(`   open "${outPath}"\n`);
}

main().catch(err => { console.error(err); process.exit(1); });
