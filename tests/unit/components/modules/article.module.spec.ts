jest.mock('vue', () => {
    return {
        axios: {
            get: jest.fn().mockImplementation(async (articleSlug) => {
                if (articleSlug.includes('dummy primary')) {
                    return {
                        data: {
                            article: {
                                author: {},
                                title: 'Lorem ipsum dolor sit amet',
                                description:
                                    'Lorem ipsum dolor sit amet.',
                                body:
                                    'Lorem ipsum dolor sit ametci',
                                tagList: ['lorem'],
                            },
                        },
                    };
                }
                if (articleSlug.includes('dummy secondary')) {
                    return {
                        data: {
                            comments: [
                                {
                                    id: 1,
                                    createdAt: '2019-11-01T14:43:41.235Z',
                                    updatedAt: '2019-11-01T14:43:41.235Z',
                                    body: 'Lorem ipsum dolor sit amet.',
                                    author: {
                                        username: 'sunilswami',
                                        bio: null,
                                        image: '',
                                        following: false,
                                    },
                                },
                                {
                                    id: 2,
                                    createdAt: '2019-11-01T14:43:41.235Z',
                                    updatedAt: '2019-11-01T14:43:41.235Z',
                                    body:
                                        'Lorem ipsum dolor sit amet,',
                                    author: {
                                        username: 'sunilswami',
                                        bio: null,
                                        image: '',
                                        following: false,
                                    },
                                },
                            ],
                        },
                    };
                }
                throw new Error('Article not existing');
            }),
            post: jest.fn().mockImplementation(async (articleSlug) => {
                if (articleSlug.includes('dummy slug')) {
                    return null;
                }
                if (articleSlug.includes('5611ee1b-0b95-417f-a917-86687176a627')) {
                    return {
                        data: {
                            article: {
                                author: {},
                                title: 'Lorem ipsum dolor sit amet',
                                description:
                                    'Lorem ipsum dolor sit amet',
                                body:
                                    'Lorem ipsum dolor sit amet',
                                tagList: ['lorem'],
                            },
                        },
                    };
                }
                throw new Error('Article not existing');
            }),
            delete: jest.fn().mockImplementation(async (articleSlug) => {
                if (articleSlug.includes('dummy slug')) {
                    return null;
                }
                if (articleSlug.includes('dummy slug non empty')) {
                    return {
                        data: {
                            article: {
                                author: {},
                                title: 'Lorem ipsum dolor sit amet',
                                description:
                                    'Lorem ipsum dolor sit amet',
                                body:
                                    'Lorem ipsum dolor sit amet',
                                tagList: ['lorem'],
                            },
                        },
                    };
                }
                throw new Error('Article does not exist');
            }),
        },
    };
});

describe('Article Module', () => {
       it('should return the comments from the fetch comments action', async () => {
        const articleSlug = 'dummy secondary';
    });

});
