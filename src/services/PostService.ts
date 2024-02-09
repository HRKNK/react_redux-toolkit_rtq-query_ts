import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IPost } from '../models/IPost';

export const postAPI = createApi({
    reducerPath: 'postAPI', // уникальное имя
    baseQuery: fetchBaseQuery({ // базовый url обращения
        baseUrl: 'http://localhost:5000'
    }),
    tagTypes: ['Post'],
    endpoints: (build) => ({
        fetchAllPosts: build.query<IPost[], number>({ // GET // query - получение данных
            query: (limit: number = 5) => ({
                url: '/posts', // сам эндпоинт
                params: {
                    _limit: limit,
                },
            }),
            providesTags: result => ['Post'], // эндпоинт работает с тегом POST
        }),

        createPost: build.mutation<IPost, IPost>({ // POST // mutation - мутация, изменение данных
            query: (post) => ({
                url: '/posts', // сам эндпоинт
                method: 'POST',
                body: post,
            }),
            invalidatesTags: ['Post'], // данные неактуальны для данного тэга
        }),

        updatePost: build.mutation<IPost, IPost>({ // POST
            query: (post) => ({
                url: `/posts/${post.id}`, // сам эндпоинт
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