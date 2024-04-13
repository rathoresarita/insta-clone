import { create } from 'zustand'

const usePostStore=create((set)=>({
    post:[],
    createPost:(post)=>set(state =>({posts:[post, ...state.post]})),
    //DELETEPOSt

    deletePost: (id)=>set(state=>({
        posts:state.posts.filter(post=>post.id !==id)
    })

    ),
    //aDDCOMENT


    addComment: (postId, comment) =>
		set((state) => ({
			posts: state.posts.map((post) => {
				if (post.id === postId) {
					return {
						...post,
						comments: [...post.comments, comment],
					};
				}
				return post;
			}),
		})),
    //setPosts
    setPosts:(posts)=>set({posts})


}))

    export default usePostStore