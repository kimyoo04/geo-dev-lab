import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/shared/lib'
import { MutationConfig } from '@/shared/lib/react-query'

import { getInfiniteCommentsQueryOptions } from './get-comments'

export const deleteComment = ({ commentId }: { commentId: string }) => {
  return api.delete(`/comments/${commentId}`)
}

type UseDeleteCommentOptions = {
  discussionId: string
  mutationConfig?: MutationConfig<typeof deleteComment>
}

export const useDeleteComment = ({ mutationConfig, discussionId }: UseDeleteCommentOptions) => {
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
    mutationFn: deleteComment,
  })
}
