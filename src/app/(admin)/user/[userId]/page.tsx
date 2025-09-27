import React from 'react'
import UserDetails from '@/components/user/user-details'

type PageProps = {
  params: Promise<{ userId: string }>
}

export default async function Page(props: Readonly<PageProps>) {
  const params = await props.params
  const userId = params.userId

  return <UserDetails userId={userId} />
}