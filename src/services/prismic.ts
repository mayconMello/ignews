import * as Prismic from '@prismicio/client'

export function getPrisimicClient() {
    const repositoryName = 'maycon-ignews';
    const endpoint = Prismic.getRepositoryEndpoint(
        repositoryName
    );
    const prismic = Prismic.createClient(
        endpoint,
        {
            accessToken: process.env.PRISMIC_ACCESS_TOKEN,
        }
    )

    return prismic
}