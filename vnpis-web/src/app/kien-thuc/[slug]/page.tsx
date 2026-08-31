export const dynamicParams = true;
import BlogPost, { generateMetadata as baseGenerateMetadata } from '@/app/blog/[slug]/page';

export const generateMetadata = baseGenerateMetadata;

export default BlogPost;
