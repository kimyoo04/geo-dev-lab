import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { api } from '@/shared/lib'
import { MutationConfig } from '@/shared/lib/react-query'
import { Comment } from '@/shared/types/api'

import { getInfiniteCommentsQueryOptions } from './get-comments'

export const createCommentInputSchema = z.object({
  discussionId: z.string().min(1, 'Required'),
  body: z.string().min(1, 'Required'),
})

export type CreateCommentInput = z.infer<typeof createCommentInputSchema>

export const createComment = ({ data }: { data: CreateCommentInput }): Promise<Comment> => {
  return api.post('/comments', data)
}

type UseCreateCommentOptions = {
  discussionId: string
  mutationConfig?: MutationConfig<typeof createComment>
}

export const useCreateComment = ({ mutationConfig, discussionId }: UseCreateCommentOptions) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getInfiniteCommentsQueryOptions(discussionId).queryKey,
      })
      onSuccess?.(...args)
    },
    ...restConfig,
    mutationFn: createComment,
  })
}
