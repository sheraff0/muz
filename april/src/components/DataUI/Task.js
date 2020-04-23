import React, { useState } from 'react'
import { SourcesModal } from '.'
import { EditButton } from '../Controls'

export default ({
  task,
  sources,
}) => {
  const [showSources, setShowSources] = useState(false)
  return (
    <section style={{ margin: "0 0 .3em.2em", fontSize: ".9em" }}>
      { task.verbose_name }
      { sources.length > 0 && <>
        <EditButton style={{ marginLeft: ".5em", fontSize: ".9em" }} text="Источники"
          onClick={() => setShowSources(true)} />
        { showSources &&
          <SourcesModal 
            task={task} sources={sources} 
            setShowSources={setShowSources}
          />
        }
      </>}
    </section>
  )
}