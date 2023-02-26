import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IPost } from '../models/IPost';

export const postAPI = createApi({
    reducerPath: 'postAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000'
    }),
    tagTypes: ['Post'],
    endpoints: (build) => ({
        fetchAllPosts: build.query<IPost[], number>({ // GET
            query: (limit: number = 5) => ({
                url: '/posts',
                params: {
                    _limit: limit,
                },
            }),
            providesTags: result => ['Post'], // эндпоинт работает с тегом POST
        }),

        createPost: build.mutation<IPost, IPost>({ // POST
            query: (post) => ({
                url: '/posts',
                method: 'POST',
                body: post,
            }),
            invalidatesTags: ['Post'], // данные неактуальны для данного тэга
        }),

        updatePost: build.mutation<IPost, IPost>({ // POST
            query: (post) => ({
                url: `/posts/${post.id}`,
                method: 'PUT',
                body: post,
            }),
            invalidatesTags: ['Post'], // данные неактуальны для данного тэга
        }),

        deletePost: build.mutation<IPost, IPost>({ // POST
            query: (post) => ({
                url: `/posts/${post.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Post'], // данные неактуальны для данного тэга
        }),
    }),
});