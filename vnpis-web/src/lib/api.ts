import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const contentDirectory = path.join(process.cwd(), 'content')

export function getPostSlugs() {
  const slugs: string[] = [];
  const dirs = ['articles', 'pillars', 'case-studies', ''];
  dirs.forEach((d) => {
    const p = path.join(contentDirectory, d);
    if (fs.existsSync(p)) {
      const files = fs.readdirSync(p);
      files.forEach((f) => {
        if (f.endsWith('.md')) {
          slugs.push(f.replace(/\.md$/, ''));
        }
      });
    }
  });
  return Array.from(new Set(slugs));
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '').replace(/\.html$/, '');
  
  let fullPath = path.join(contentDirectory, `${realSlug}.md`);
  if (!fs.existsSync(fullPath)) {
    const candidates = [
      path.join(contentDirectory, 'articles', `${realSlug}.md`),
      path.join(contentDirectory, 'pillars', `${realSlug}.md`),
      path.join(contentDirectory, 'case-studies', `${realSlug}.md`),
    ];
    const found = candidates.find(c => fs.existsSync(c));
    if (!found) return null;
    fullPath = found;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items: Record<string, any> = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .filter(Boolean)
    // sort posts by date in descending order if there's a date
    .sort((post1: any, post2: any) => ((post1.date && post2.date && post1.date > post2.date) ? -1 : 1))
  return posts
}

export async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}
