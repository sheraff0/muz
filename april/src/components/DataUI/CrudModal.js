import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { scopes } from '../../store'
import { gunDogActions } from '../../store/actions'
import { Modal, List, Typography } from 'antd'
import { Form } from '.'
import { dataItem, data2Submit, httpRequest2API } from '../../utils'

export default ({
  scope, parent, api_function,
  action, setAction,
  setReload,
  ...props
}) => {
  console.log(action)
  const data = useSelector(state => state[scope][api_function].data)

  const stopAction = () => setAction({})

  const token = useSelector(state => state.authContext.token)
  const dispatch = useDispatch()

  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  
  // FETCH FUNCTIONS
  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  
  const getObject = () => {
    dispatch(gunDogActions[scope].RETRIEVE(httpRequest2API({
      endpoint: scopes()[scope].path + '/' + action.id,
      token,
    })))
  }
  const createObject = object => {
    dispatch(gunDogActions[scope].CREATE(httpRequest2API({
      method: 'POST',
      endpoint: scopes()[scope].path,
      token,
      body: object
    })))
  }
  const updateObject = object => {
    dispatch(gunDogActions[scope].UPDATE(httpRequest2API({
      method: 'PUT',
      endpoint: scopes()[scope].path + '/' + action.id,
      token,
      body: object
    })))
  }
  const destroyObjects = ids => {
    dispatch(gunDogActions[scope].DESTROY_LIST(httpRequest2API({
      method: 'DELETE',
      endpoint: scopes()[scope].path + '/destroy_list',
      token,
      body: {ids: ids}
    })))
  }

  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  
  // ON FINISH
  // trigger respective fetch function
  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  
  const onFinish = values => {
    switch (action.type) {
      case 'CREATE':
        console.log(values)
        createObject(data2Submit(values)); break
      case 'EDIT':
        console.log(values)
        updateObject(data2Submit(values)); break
      case 'DELETE':
        destroyObjects(action.ids); break
    }
    stopAction()
  }

  useEffect(() => {
    if (action.type === 'EDIT') {
      getObject(action.id)
    }
  }, [action])

  return ( <> {
    ["CREATE", "EDIT"].includes(action.type) &&
      <Modal
        width="100%"
        visible={true}
        okButtonProps={{ disabled: true }}
        onCancel={() => {
          stopAction()
          setReload(x => !x)
        }}
      >
        <Form 
          scope={scope} parent={parent}
          api_function={api_function}
          id={action.id}
          onFinish={onFinish}
          {...props}
        />
      </Modal>
    } {
    action.type === 'DELETE' &&
      <Modal
        width="100%"
        visible={true}
        onOk={onFinish}
        onCancel={stopAction}
      >
        <List
          header={<span className="page-header alert">Внимание! Следующие записи будут уничтожены!</span>}
          dataSource={
            action.ids
              .filter(id => dataItem(data, id))
              .map(id => dataItem(data, id))
          }
          renderItem={item =>
            <List.Item>
              <Typography.Text mark>{item.id}</Typography.Text> {item.verbose_name}
            </List.Item>
          }
        />
      </Modal>
  } </> )
}