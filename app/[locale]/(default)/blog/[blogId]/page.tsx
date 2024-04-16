import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';

import {
  BlogPostAuthor,
  BlogPostBanner,
  BlogPostDate,
  BlogPostImage,
  BlogPostTitle,
} from '@bigcommerce/components/blog-post-card';
import { Tag, TagContent } from '@bigcommerce/components/tag';
import { getBlogPost } from '~/client/queries/get-blog-post';
import { BcImage } from '~/components/bc-image';
import { Link } from '~/components/link';
import { SharingLinks } from '~/components/sharing-links';
import { LocaleType } from '~/i18n';
import { StrapiBlocksClientRenderer } from '~/integrations/strapi/client-components';
import { getNewsPost } from '~/integrations/strapi/data-fetcher';

interface Props {
  params: {
    blogId: string;
    locale: LocaleType;
  };
}

export async function generateMetadata({ params: { blogId } }: Props): Promise<Metadata> {
  const blogPost = await getBlogPost(+blogId);

  const title = blogPost?.seo.pageTitle ?? 'Blog';

  return {
    title,
  };
}

export default async function BlogPostPage({ params: { blogId, locale } }: Props) {
  unstable_setRequestLocale(locale);
  const blogPost = await getNewsPost({ blogId, locale });

  if (!blogPost || !blogPost.isVisibleInNavigation) {
    return notFound();
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-2 text-3xl font-black lg:text-5xl">{blogPost.name}</h1>

      <div className="mb-8 flex">
        <BlogPostDate className="mb-0">
          {new Intl.DateTimeFormat('en-US').format(new Date(blogPost.publishedDate.utc))}
        </BlogPostDate>
        {blogPost.author ? <BlogPostAuthor>, by {blogPost.author}</BlogPostAuthor> : null}
      </div>

      {blogPost.thumbnailImage ? (
        <BlogPostImage className="mb-6 h-40 sm:h-80 lg:h-96">
          <BcImage
            alt={blogPost.thumbnailImage.altText}
            className="h-full w-full object-cover object-center"
            height={900}
            src={blogPost.thumbnailImage.url}
            width={900}
          />
        </BlogPostImage>
      ) : (
        <BlogPostBanner className="mb-6 h-40 sm:h-80 lg:h-96">
          <BlogPostTitle variant="inBanner">
            <span className="text-primary">{blogPost.name}</span>
          </BlogPostTitle>
          <BlogPostDate variant="inBanner">
            <span className="text-primary">
              {new Intl.DateTimeFormat('en-US').format(new Date(blogPost.publishedDate.utc))}
            </span>
          </BlogPostDate>
        </BlogPostBanner>
      )}

      <div className="mb-10 space-y-4 text-base">
        <StrapiBlocksClientRenderer content={blogPost.content} />
      </div>
      <div className="mb-10 flex">
        {blogPost.tags.map((tag) => (
          <Link className="me-3 block cursor-pointer" href={`/blog/tag/${tag}`} key={tag}>
            <Tag>
              <TagContent>{tag}</TagContent>
            </Tag>
          </Link>
        ))}
      </div>
      <SharingLinks
        blogPostId={blogId}
        blogPostImageUrl={blogPost.thumbnailImage?.url}
        blogPostTitle={blogPost.seo.pageTitle}
        vanityUrl={blogPost.vanityUrl}
      />
    </div>
  );
}

export const runtime = 'edge';
