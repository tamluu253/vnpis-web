import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface BaseMetadata {
  title: string;
  description: string;
  date: string;
  slug: string;
  author?: string;
  image?: string;
  category?: string;
  tags?: string[];
  [key: string]: any;
}

export interface MarkdownDocument<T = BaseMetadata> {
  metadata: T;
  contentHtml: string;
  contentMarkdown: string;
}

const contentDirectory = path.join(/*turbopackIgnore: true*/ process.cwd(), 'content');

/**
 * Lấy tất cả các file markdown trong một thư mục cụ thể (vd: 'pillars', 'articles')
 */
export function getAllSlugs(contentType: string): string[] {
  const dirPath = path.join(contentDirectory, contentType);
  
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(dirPath);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}

export function getDocumentMetadataBySlug<T = BaseMetadata>(
  contentType: string,
  slug: string
): T | null {
  const cleanSlug = slug.replace(/\.md$/, '').replace(/\.html$/, '');
  let fullPath = path.join(contentDirectory, contentType, `${cleanSlug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    const candidates = [
      path.join(contentDirectory, 'articles', `${cleanSlug}.md`),
      path.join(contentDirectory, 'pillars', `${cleanSlug}.md`),
      path.join(contentDirectory, 'case-studies', `${cleanSlug}.md`),
      path.join(contentDirectory, `${cleanSlug}.md`),
    ];
    const found = candidates.find(c => fs.existsSync(c));
    if (!found) return null;
    fullPath = found;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  return {
    slug,
    ...(matterResult.data as Omit<T, 'slug'>),
  } as T;
}

/**
 * Đọc nội dung và metadata của một file markdown cụ thể
 */
export async function getDocumentBySlug<T = BaseMetadata>(
  contentType: string,
  slug: string
): Promise<MarkdownDocument<T> | null> {
  const cleanSlug = slug.replace(/\.md$/, '').replace(/\.html$/, '');
  
  let fullPath = path.join(contentDirectory, contentType, `${cleanSlug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    // Try fallbacks in articles, pillars, case-studies, root content
    const candidates = [
      path.join(contentDirectory, 'articles', `${cleanSlug}.md`),
      path.join(contentDirectory, 'pillars', `${cleanSlug}.md`),
      path.join(contentDirectory, 'case-studies', `${cleanSlug}.md`),
      path.join(contentDirectory, `${cleanSlug}.md`),
    ];
    const found = candidates.find(c => fs.existsSync(c));
    if (!found) {
      return null;
    }
    fullPath = found;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // Dùng gray-matter để parse phần frontmatter và content
  const matterResult = matter(fileContents);
  
  // Dùng remark để convert markdown sang HTML
  const processedContent = await remark()
    .use(html, { sanitize: false }) // Disable sanitize để cho phép render HTML nhúng nếu cần
    .process(matterResult.content);
    
  const contentHtml = processedContent.toString();
  
  let mediaExt: string | null = null;
  const mediaDir = path.join(process.cwd(), 'public', 'media', 'blog');
  if (fs.existsSync(path.join(mediaDir, `${slug}.jpg`))) mediaExt = 'jpg';
  else if (fs.existsSync(path.join(mediaDir, `${slug}.png`))) mediaExt = 'png';
  else if (fs.existsSync(path.join(mediaDir, `${slug}.mp4`))) mediaExt = 'mp4';

  return {
    metadata: {
      slug,
      mediaExt,
      ...(matterResult.data as Omit<T, 'slug'>),
    } as T,
    contentHtml,
    contentMarkdown: matterResult.content,
  };
}

/**
 * Lấy danh sách tất cả documents của một loại (để làm trang danh sách)
 */
export function getAllDocumentsMeta<T = BaseMetadata>(contentType: string): T[] {
  const slugs = getAllSlugs(contentType);
  
  const documents = slugs.map((slug) => {
    const fullPath = path.join(contentDirectory, contentType, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    
    let mediaExt: string | null = null;
    const mediaDir = path.join(process.cwd(), 'public', 'media', 'blog');
    if (fs.existsSync(path.join(mediaDir, `${slug}.jpg`))) mediaExt = 'jpg';
    else if (fs.existsSync(path.join(mediaDir, `${slug}.png`))) mediaExt = 'png';
    else if (fs.existsSync(path.join(mediaDir, `${slug}.mp4`))) mediaExt = 'mp4';

    return {
      slug,
      mediaExt,
      ...(matterResult.data as Omit<T, 'slug'>),
    } as T;
  });
  
  // Sắp xếp theo ngày giảm dần (mới nhất lên trước)
  return documents.sort((a, b) => {
    if ((a as any).date < (b as any).date) {
      return 1;
    } else {
      return -1;
    }
  });
}
