import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Typography } from 'antd'
import { gunDogActions } from '../../store/actions'
import { httpRequest2API } from '../../utils'
import { LessonCard } from '.'
import { scopes } from '../../store'

const { Title, Paragraph } = Typography

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

  const [showAllTasks, setShowAllTasks] = useState({})

  return (
    <>
      { data?.length > 0 && data.map(item =>
        <section key={item.id} style={{ marginBottom: "1em" }}>
          <Title level={3} className="page-header" style={{ textAlign: "left", color: "rosybrown" }}>
            {item?.pupil.last_name + ' ' + item?.pupil.first_name}
            <span style={{ color: "gray", fontSize: ".9em", fontStyle: "italic" }}>
              { ', ' + item?.form_verbose}
              <br />
            </span>
            <span style={{ color: "cadetblue" }} onClick={() => setShowAllTasks({...showAllTasks, 
              [item.id]: !showAllTasks[item.id]
            })}>
              { !showAllTasks[item.id] ? <span>&rarr;</span> : <span>&larr;</span> }&nbsp;
              { !showAllTasks[item.id] ? 'показать' : 'скрыть' } все задания
            </span>
          </Title>
          <Paragraph style={{ fontSize: ".9em", fontStyle: "italic", color: "silver" }}>
            При заполнении "бумажных" дневников можно писать только названия пьес.
          </Paragraph>
          { item?.events.map(event =>
            <LessonCard key={event.id} data={event} showAllTasks={showAllTasks[item.id]} />
          )}        
        </section>
      )}
    </>
  )
}
