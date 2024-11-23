import { queryOptions, useQuery } from '@tanstack/react-query'

import { api } from '@/lib'
import { QueryConfig } from '@/lib/react-query'

import { User } from '@/types/database'

export const getUsers = (): Promise<{ data: User[] }> => {
  return api.get(`/users`)
}

export const getUsersQueryOptions = () => {
  return queryOptions({
    queryKey: ['users'],
    queryFn: getUsers,
  })
}

type UseUsersOptions = {
  queryConfig?: QueryConfig<typeof getUsersQueryOptions>
}

export const useUsers = ({ queryConfig }: UseUsersOptions = {}) => {
  return useQuery({
    ...getUsersQueryOptions(),
    ...queryConfig,
  })
}
