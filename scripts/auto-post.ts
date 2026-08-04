#!/usr/bin/env tsx
/**
 * AyahGuide — Auto Post Orchestrator
 *
 * Picks the next carousel from queue.json, generates it, and posts it to Buffer.
 * Designed to be run by the launchd scheduler every other day.
 *
 * Usage:
 *   npm run auto-post
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

const ROOT       = path.join(__dirname, '..');
const QUEUE_PATH = path.join(__dirname, 'carousel/queue.json');

function getNextItem(): { name: string; title: string; pillar: string } | null {
  const queue = JSON.parse(fs.readFileSync(QUEUE_PATH, 'utf-8'));
  return queue.queue[0] ?? null;
}

function contentExists(name: string): boolean {
  return fs.existsSync(path.join(__dirname, 'carousel/content', `${name}.ts`));
}

function exportExists(name: string): boolean {
  const dir = path.join(ROOT, 'exports/carousel', name);
  if (!fs.existsSync(dir)) return false;
  return fs.readdirSync(dir).some(f => f.endsWith('.png'));
}

function run(cmd: string): void {
  console.log(`\n$ ${cmd}`);
  execSync(cmd, { cwd: ROOT, stdio: 'inherit' });
}

async function main(): Promise<void> {
  const next = getNextItem();

  if (!next) {
    console.log('Queue is empty — nothing to post.');
    process.exit(0);
  }

  console.log(`\n🎯 Next: ${next.title}`);
  console.log(`   Name: ${next.name} | Pillar: ${next.pillar}`);

  if (!contentExists(next.name)) {
    console.error(`\n⚠️  No content file for "${next.name}".`);
    console.error(`   Create: scripts/carousel/content/${next.name}.ts`);
    console.error('   Skipping this run.');
    process.exit(1);
  }

  if (!exportExists(next.name)) {
    console.log('\n🎨 Generating carousel...');
    run(`npm run carousel -- ${next.name}`);
  } else {
    console.log('\n♻️  Using existing exports.');
  }

  console.log('\n📤 Posting to Buffer...');
  run(`npm run post -- ${next.name}`);
}

main().catch(err => { console.error(err); process.exit(1); });
