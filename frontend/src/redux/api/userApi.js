import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setIsAuthencated, setUser } from '../slices/userSlice'


export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => '/getuser',
      transformResponse: (result) => result.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          let { data } = await queryFulfilled
          dispatch(setUser(data))
          dispatch(setIsAuthencated(true))
        } catch (error) {
          console.log(error)
        }
      }
    }),
  })
})

export const { useGetUserQuery } = userApi