import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useFirestore } from '@/context/FirestoreContext'
import Loader from './Loader'

interface LoaderProps {
  children: React.ReactNode
}

const LoaderHandler: React.FC<LoaderProps> = ({ children }) => {
  const { userLoading } = useAuth()
  const { dataLoading } = useFirestore()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userLoading || dataLoading) setLoading(true)
    else
      setTimeout(() => {
        setLoading(false)
      }, 1500)
  }, [userLoading, dataLoading])

  return <>{loading ? <Loader /> : children}</>
}

export default LoaderHandler