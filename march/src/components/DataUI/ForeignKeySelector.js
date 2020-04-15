import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { gunDogActions } from '../../store/actions'
import { scopes, scopeFromModel } from '../../store'
import { httpRequest2API } from '../../utils'
import { CreateButton, EditButton } from '../Controls'
import { Row, Col, Typography } from 'antd'
import { CrudModal } from '.'
import { Select } from '../Controls'

export default ({
  field, 
  parentFormData,
  setValue, // callback function to parent form's field
  ...props
}) => {
  const [reload, setReload] = useState(false)  // reload trigger

  const model = field.to?.slice(
    field.to?.indexOf('.') + 1)
  const scope = scopeFromModel(model)

  const [selected, setSelected] = useState(parentFormData.data?.[field.name])
  console.log(selected)

  const token = useSelector(state => state.authContext.token)
  const listData = useSelector(state => state[scope].SHORTLIST.data)
  const createData = useSelector(state => state[scope].CREATE.data)
  const updateData = useSelector(state => state[scope].UPDATE.data)

  const dispatch = useDispatch()
  const [action, setAction] = useState({})
  const onActions = {
    onCreate: () => setAction({ type: "CREATE" }),
    onEdit: id => setAction({ type: "EDIT", id: id })
  }

  const clearCreated = () => {
    dispatch({ type: 'CREATE_' + scopes()[scope].index + '_CLEARED' })
  }
  const getData = id => {
    dispatch(gunDogActions[scope].RETRIEVE(httpRequest2API({
      endpoint: scopes()[scope].path + '/' + id,
      token
    })))
  }
  const getListData = () => {
    dispatch(gunDogActions[scope].SHORTLIST(httpRequest2API({
      endpoint: scopes()[scope].path + '/' + 'shortlist',
      token
    })))
  }
  useEffect(() => {
    if (createData?.id) {
      setValue(field, createData.id) // imperatively set parent form's field value
      setSelected(createData.id)
      clearCreated()
    }
    if (selected) { 
      getData(selected)
    }
    getListData()
  }, [createData, updateData, selected, scope, reload])

  const handleSelect = value => {
    setSelected(value)
    if (value) { getData(value) }
  }

  const disabled_editable = false
  
  return (
    <>
      <CrudModal 
        scope={scope} api_function="RETRIEVE"
        action={action} setAction={setAction}
        reload={reload} setReload={setReload}
      />
      <Select 
        listData={listData}
        onSelect={handleSelect}
        {...props}
      />
      { !props.disabled &&
        <CreateButton 
          onClick={onActions.onCreate}
          style={{ position: "absolute", margin: ".5rem" }}
        />
      }
      { (!props.disabled || disabled_editable) &&
        <EditButton 
          onClick={() => onActions.onEdit(selected)}
          style={{ position: "absolute", margin: ".5rem 0 .5rem " + 
            (disabled_editable ? ".5rem" : "5rem") }}  // reduce offset for disabled-editable fields
          disabled={!selected}
        />
      }
    </>
  )
}