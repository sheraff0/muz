import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { gunDogActions } from '../../store/actions'
import { httpRequest2API } from '../../utils'
import { LessonCard } from '.'
import { scopes } from '../../store'

export default ({
  pupilForm
}) => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.authContext.token)

  const getData = () => {
    dispatch(gunDogActions.diary.LIST(httpRequest2API({
      endpoint: scopes().diary.path,
      token,
    })))
  }
  useEffect(() => { 
    getData()
  }, [])

  const data = useSelector(state => state.diary.LIST.data)
  console.log(data)
  return (
    <LessonCard />
  )
}
