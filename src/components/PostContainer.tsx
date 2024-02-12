import React from 'react';
import { IPost } from '../models/IPost';
import { postAPI } from '../services/PostService';
import PostItem from './PostItem';

const PostContainer = () => {
    const { data: posts, error, isLoading, refetch } = postAPI.useFetchAllPostsQuery(20, // автогенерация хуков RTKquery // limit из PostService.ts
        // {pollingInterval: 3000} // авто-отправка запроса: таймер (актуально по типу вэбсокета/чата)
    )
    let [ createPost, {error: createError, isLoading: createIsLoading} ] = postAPI.useCreatePostMutation(); // функция, дата_объект
    const [ updatePost, {} ] = postAPI.useUpdatePostMutation();
    const [ deletePost, {}] = postAPI.useDeletePostMutation();

    const handleCreate = async () => {
        const title = prompt();
        await createPost({ title, body: title } as IPost);
    }
    const handleRemove = (post: IPost) => {
        deletePost(post);
    }
    const handleUpdate = (post: IPost) => {
        updatePost(post);
    }

    return (
        <div>
            
            {createIsLoading && <h1>Идёт загрузка...</h1>}
            <button onClick={handleCreate}>ADD POST</button>
            <button onClick={() => refetch()}>REFETCH</button> {/* встроенная функция обновления/переотправки запроса */}


            {error && <h1>Произошла ошибка...</h1>}
            {isLoading && <h1>Идёт загрузка...</h1>}
            {posts && posts.map(post => <PostItem remove={handleRemove} update={handleUpdate} key={post.id} post={post}></PostItem>)}
        </div>
    );
};

export default PostContainer;