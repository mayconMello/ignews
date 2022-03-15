import { GetStaticProps } from 'next'
import Head from 'next/head'
import { getPrisimicClient } from '../../services/prismic'
import styles from './styles.module.scss'
import { RichText } from 'prismic-dom'

type Post = {
    slug: string,
    title: string,
    excerpt: string,
    updatedAt: string
}

interface PostsProps {
    posts: Post[]
}

export default function Posts({ posts }: PostsProps) {
    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    {posts.map(post => (
                        <a href="#" key={post.slug}>
                            <time>{post.updatedAt}</time>
                            <strong>{post.title}</strong>
                            <p>{post.excerpt}</p>
                        </a>
                    ))}
                </div>
            </main>
        </>
    )
}


export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrisimicClient()

    const response = await prismic.getAllByType('post', {
        fetch: ['post.title', 'post.content'],
        pageSize: 100
    })

    console.log(JSON.stringify(response, null, 2))

    const posts = response.map(post => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: post.data.content.find(
                content => content.type === 'paragraph'
            )?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString(
                'pt-BR',
                {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                }
            )
        }
    })

    return {
        props: {
            posts
        }
    }
}