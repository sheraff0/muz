import React from 'react'
import { Modal, Typography } from 'antd'
import notes from '../../img/Notes.svg'
import audio from '../../img/Audio.svg'
import video from '../../img/Video.svg'
import website from '../../img/Website.svg'

const { Paragraph } = Typography

const SOURCE_TYPE_ICONS = () => ({
  1: notes,
  2: audio,
  3: video,
  4: website,
})

export default ({
  task,
  sources,
  setShowSources
}) => {
  console.log(sources)
  const hideModal = () => setShowSources(false)
  return (
    <>
      <Modal
        width="80%"
        visible={true}
        onOk={hideModal}
        onCancel={hideModal}
      >
        <Paragraph style={{ fontSize: "1.2em" }}>{ task.verbose_name }</Paragraph>
        { sources.map(source => {
          return (
            <section key={source.id}>
              <Paragraph 
                className="page-header"
                style={{ fontSize: "1.3em" }}
              >
                <span style={{ fontStyle: "italic" }}>{source.source?.source_title}&nbsp;</span>
                { source.source?.source_type &&
                  <img style={{ height: "1.5em" }} src={SOURCE_TYPE_ICONS()[source.source.source_type]} />
                }
                { source.source?.url &&
                  <a href={source.source.url} target="_blank"
                    style={{ color: "darkcyan" }}
                  >&nbsp;&rarr;&nbsp;открыть</a>
                }
                { source.source?.source_description && <>
                  <br /><span style={{ fontStyle: "none", color: "grey", fontSize: ".9em" }}>
                    {source.source.source_description}
                  </span>
                </>}
                { source.source_fragment && <>
                  <br /><span style={{ fontStyle: "italic", color: "darkviolet" }}>
                    {source.source_fragment}
                  </span>
                </>}
              </Paragraph>
            </section>
          )
        })}
      </Modal>
    </>
  )
}