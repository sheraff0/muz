import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { gunDogActions } from '../../store/actions'
import { httpRequest2API } from '../../utils'
import { Table, CrudModal } from '.'
import { scopes } from '../../store'

export default ({
  scope,
  parent, // { field_name, id }
}) => {
  const api_function = parent?.id ? "PARTIAL_LIST" : "LIST"
  const [reload, setReload] = useState(false)  // reload trigger
  const dispatch = useDispatch()
  const token = useSelector(state => state.authContext.token)
  const createData = useSelector(state => state[scope].CREATE.data)
  const updateData = useSelector(state => state[scope].UPDATE.data)
  const destroyData = useSelector(state => state[scope].DESTROY_LIST.data)

  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  
  // FETCH TABLE DATA
  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  
  const getData = () => {
    dispatch(gunDogActions[scope][api_function](httpRequest2API({
      endpoint: scopes()[scope].path + (parent?.id ? "/partial_list" : ""),
      token,
      ...(parent?.id && {  // for related tables
        method: 'POST',
        body: { filter: {
          [parent.field_name]: parent.id
        }}
      })
    })))
  }
  useEffect(() => { 
    getData()
  }, [scope, reload, 
    createData, updateData, destroyData])
  
  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  
  // FRONTEND ACTIONS STATUS DEFINED
  // Used as callback for interaction between components
  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  
  const[action, setAction] = useState({})
  const onActions = {
    onCreate: () => setAction({ type: "CREATE" }),
    onEdit: id => setAction({ type: "EDIT", id: id }),
    onDelete: ids => setAction({ type: "DELETE", ids: ids }),
  }
  return (
    <>
      <CrudModal 
        scope={scope} parent={parent} api_function={api_function}
        action={action} setAction={setAction}
        setReload={setReload}
      /> 
      <Table 
        scope={scope} api_function={api_function}
        onActions={onActions}
      />
    </>
  )
}