import fs from 'fs'
import path from 'path'
import type { Course, CourseModule } from '@/data/courses'

const COURSES_DIR = path.join(process.cwd(), 'content', 'courses')

/** Raw module HTML (a body fragment starting with its own <h1>). */
export function loadModuleHtml(course: Course, mod: CourseModule): string | null {
  const file = path.join(COURSES_DIR, course.slug, `module-${mod.number}.html`)
  try {
    const html = fs.readFileSync(file, 'utf-8')
    // Drop inline styles on Arabic lines so globals.css governs both themes
    return html.replace(/(<p class="arabic"[^>]*?) style="[^"]*"/g, '$1')
  } catch {
    return null
  }
}

/** Honest reading-time estimate from the module body (200 wpm). */
export function moduleMinutes(html: string): number {
  const text = html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(5, Math.round(words / 200))
}

export function courseMinutes(course: Course): number {
  let total = 0
  for (const mod of course.modules) {
    const html = loadModuleHtml(course, mod)
    if (html) total += moduleMinutes(html)
  }
  return total
}
