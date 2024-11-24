'use client'

import { useUsers } from '@/features/user/api/get-users'

import { Spinner } from '@/shared/components/ui/spinner'
import { Table } from '@/shared/components/ui/table'
import { formatDate } from '@/shared/utils/format'

import { DeleteUser } from './delete-user'

export const UsersList = () => {
  const usersQuery = useUsers()

  if (usersQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  const users = usersQuery.data?.data

  if (!users) return null

  return (
    <Table
      data={users}
      columns={[
        {
          title: 'First Name',
          field: 'firstName',
        },
        {
          title: 'Last Name',
          field: 'lastName',
        },
        {
          title: 'Email',
          field: 'email',
        },
        {
          title: 'Role',
          field: 'role',
        },
        {
          title: 'Created At',
          field: 'createdAt',
          Cell({ entry: { createdAt } }) {
            return <span>{formatDate(createdAt)}</span>
          },
        },
        {
          title: '',
          field: 'id',
          Cell({ entry: { id } }) {
            return <DeleteUser id={id} />
          },
        },
      ]}
    />
  )
}
