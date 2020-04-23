import React, { useState, useEffect } from 'react'
import { Typography } from 'antd'
import Task from './Task'

const { Paragraph } = Typography

const EVENT_TYPE_COLORS = {
  1: "forestgreen",
  2: "orange",
  3: "crimson",
  4: "crimson",
  5: "skyblue",
  6: "skyblue",
  7: "skyblue",
  8: "crimson",
}

const headerStyle = { 
  textAlign: "left", margin: "0 1em", width: "unset",
}

export default ({
  data,
  showAllTasks,
}) => {
  const [showTask, setShowTask] = useState(false)
  useEffect(() => {
    setShowTask(false)
  }, [showAllTasks])
  return (
    <>
      <Paragraph key="h1" className="page-header " style={headerStyle}>
        { data.event?.event_date_formatted }
        &nbsp;
        <span style={{ color: "darkviolet", fontStyle: "italic", fontSize: ".9em" }}>
          { data.event?.event_time_formatted }
          &nbsp;&nbsp;&ndash;&nbsp;&nbsp;
        </span>
        <span style={{ color: EVENT_TYPE_COLORS[data.event?.event_type] }}>
          { data.event?.event_type_verbose }
        </span>
        { data.event?.subject === 2 &&
          <span style={{ color: "grey", fontSize: ".9em" }}>&nbsp;(ансамбль)</span>
        }
        { !showTask && data.event?.tasks?.length > 0 && !showAllTasks &&
          <span style={{ color: "royalblue" }} onClick={() => setShowTask(true)}>
            &nbsp;&rarr;&nbsp;задание
          </span>
        }
      </Paragraph>
      { (showTask || showAllTasks) &&
        <Paragraph key="p1" style={{ marginLeft: "1.5em" }}>
          { data.event?.tasks && data.event.tasks.map(task => {
            // Set of (List of unique) sources related to current task
            const sources = Array.from(new Set([
              ...(task.sources || []),
              ...(task.opus?.sources || []),
              ...(task.opus?.composer?.sources || []),
              ...(task.drill?.sources || []),
            ].map(JSON.stringify))).map(JSON.parse)
            .sort((a, b) => a.source?.source_type - b.source?.source_type)
            return (
              <Task key={task.id} task={task} sources={sources} />
            )
          })}
        </Paragraph>
      }
    </>
  )
}
