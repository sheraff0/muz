import React from 'react'
import { Diary } from '../DataUI'

import { scopes } from '../../store'

export default () => [{
  path: "/diary",
  render: () =>
    <Diary />
}]