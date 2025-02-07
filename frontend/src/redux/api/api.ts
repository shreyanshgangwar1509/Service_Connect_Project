import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { server } from '../../constants/config.ts';

const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/` }),
    tagTypes:["Chat","User","Message"],
    endpoints: (builder) => ({
        myChats: builder.query({
            query: () => ({
                url: "chat/my",
                credentials: "include",
            }),
            providesTags:["Chat"],
        }),
        searchUser: builder.query({
            query: (name) => ({
                url: `user/search?name=${name}`,
                credentials:"include",
            }),
            providesTags:["User"]
        }),
        sendFriendReuest: builder.mutation({
            query: (data) => ({
                url: 'user/send-request',
                method: "PUT",
                credentials: 'include',
                body:data,
            }),
            invalidatesTags:["User"]
        }),
        getNotification: builder.query({
            query: () => ({
                url: `user/notifications`,
                credentials:"include",
            }),
            keepUnusedDataFor:0 
        }),
        acceptFriendReuest: builder.mutation({
            query: (data) => ({
                url: `user/accept-request`,
                method: "PUT",
                body:data,
                credentials:"include",
            }),
            invalidatesTags:["Chat"] 
        }),
        chatDetails: builder.query({
            query: ({ chatId, populate = false }) => {
                
                let url = `chat/${chatId}`;
                if (populate) url+="?populate=true"
                
                return {
                    url,
                    credentials: "include",
                }
            },
            providesTags:["Chat"]
        }),
        getOldMessages: builder.query({
            query: ({ chatId, page = false }) => ({
                    url:`chat/message/${chatId}?page=${page}`,
                    credentials: "include",
            }),
            keepUnusedDataFor:0,
        }),
        sendAttachments: builder.mutation({
            query: (data) => ({
                url: `chat/message`,
                method: "POST",
                body:data,
                credentials:"include",
            }),
            
        }),
        myGroups: builder.query({
            query: () => ({
                url:`chat/my/groups`,
                credentials: "include",
            }),
            providesTags:["Chat"],
        }),
        availableFriends: builder.query({
            query: (chatId) => {
                
                let url = `user/friends`;

                if (chatId) url+=`?chatId=${chatId}`
                
                return {
                    url,
                    credentials: "include",
                }
            },
            providesTags:["Chat"]
        }),
        newGroup: builder.mutation({
            query: ({name,members}) => ({
                url: `chat/new`,
                method: "POST",
                body:{name,members},
                credentials:"include",
            }),
            providesTags:["Chat"]
            
        }),
        renameGroup: builder.mutation({
            query: ({chatId,name}) => ({
                url: `chat/${chatId}`,
                method: "PUT",
                body:{name},
                credentials:"include",
            }),
            invalidatesTags:["Chat"] 
        }),

        removeGroupMember: builder.mutation({
            query: ({chatId,userId}) => ({
                url: `chat/removemember`,
                method: "PUT",
                body:{chatId,userId},
                credentials:"include",
            }),
            invalidatesTags:["Chat"] 
        }),
        addGroupMembers: builder.mutation({
            query: ({chatId,members}) => ({
                url: `chat/addmembers`,
                method: "PUT",
                body:{chatId,members},
                credentials:"include",
            }),
            invalidatesTags:["Chat"] 
        }),
        deleteChat: builder.mutation({
            query: (chatId) => ({
                url: `chat/${chatId}`,
                method: "DELETE",
                
                credentials:"include",
            }),
            invalidatesTags:["Chat"] 
        }),
        leaveGroup: builder.mutation({
            query: (chatId) => ({
                url: `chat/leave/${chatId}`,
                method: "DELETE",
                
                credentials:"include",
            }),
            invalidatesTags:["Chat"] 
        }),

    }),
    
    
})

export default api
export const { useMyChatsQuery,
    useLazySearchUserQuery,
    useSendFriendReuestMutation,
    useGetNotificationQuery,
    useAcceptFriendReuestMutation,
    useChatDetailsQuery,
    useGetOldMessagesQuery,
    useSendAttachmentsMutation,
    useMyGroupsQuery,
    useAvailableFriendsQuery,
    useNewGroupMutation,
    useRenameGroupMutation,
    useRemoveGroupMemberMutation,
    useAddGroupMembersMutation,
    useDeleteChatMutation,
    useLeaveGroupMutation,
} = api;