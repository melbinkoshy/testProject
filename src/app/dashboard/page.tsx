import { Button } from '@/components/ui/button'
import { auth } from '@/utils/auth'
import { headers } from 'next/headers'
import React from 'react'

const Dashboard = async () => {
  const session = await auth.api.getSession({
    headers : await headers()
  })

  const user = session?.user
  return (
    <div>Dashboard
      <ul>
        <li>name : {user?.name}</li>
        <li>email : {user?.email}</li>
      </ul>
      {
        session?(
          <form action={
            async ()=>{
              'use server'
              await auth.api.signOut(
                {
                  headers:await headers()
                }
              )
            }
          }>
            <Button type='submit'>Sign Out</Button>
          </form>
        ):<div>Sign in</div>
      }
    </div>
  )
}

export default Dashboard