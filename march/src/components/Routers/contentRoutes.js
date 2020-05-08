import React from 'react'
import { CrudCombo } from '../DataUI'

import { scopes } from '../../store'

const selectedScopes = [
  'pupil',
  'pupilForm',
  'event',
  'person',
  'source',
]

export default () =>
  selectedScopes.map(scope => ({
    path: "/" + scopes()[scope].path,
    render: () =>
      <CrudCombo scope={scope} />
  }))