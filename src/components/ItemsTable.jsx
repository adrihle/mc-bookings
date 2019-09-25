import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import axios from 'axios'
var emitter = require('../config/global_emitter')

export default function MaterialTableDemo(props) {
  const [state, setState] = useState({
    columns: [
      { title: 'Item', field: 'item' },
      { title: 'Quantity', field: 'quantity', type: 'numeric' },
      { title: 'Description', field: 'description' },
      { title: 'Price', field: 'price', type: 'numeric' },
      {
        title: 'Location',
        field: 'location',
        lookup: { 34: 'Batman', 63: 'Back Store' },
      },
    ],
    data: []
  });

  useEffect(() => {
    setState({...state, data:[]})
      const user = {
          name: props.userSelected
      }
    axios.post('http://localhost:4000/getCustomerItems', user)
    .then(e => {
        if (e.data !== ''){
          setState({...state, data: e.data})
        }
    })
  },[props.userSelected])

  const handleUpdate = (data) => {
    const upload = {
      items: data,
      name: props.userSelected
    }
    axios.post('http://localhost:4000/updateItems', upload)
    .then((e) => {
      if (e.status === 200){
        emitter.emit('confirmMessage', 'Updated list correctly')
      }
    })
  }

  function addRow (newData) {
        const data = [...state.data];
        data.push(newData);
        handleUpdate(data)
        setState({ ...state, data });
  }


  return (
    <MaterialTable
      title={props.userSelected + '´s items ordered'}
      columns={state.columns}
      data={state.data}
      options={{
        headerStyle: {
          backgroundColor: '#01579b',
          color: '#FFF'
        },
        rowStyle: {
          opacity: 1,
          animationName: 'fadeInOpacity',
          animationIterationCount: 1,
          animationTimingFunction: 'ease-in',
          animationDuration: '2s'
        }
      }}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              addRow(newData)
            }, 600);
          }),
          onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              handleUpdate(data)
              setState({ ...state, data });
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              handleUpdate(data)
              setState({ ...state, data });
            }, 600);
          }),
      }}
    />
  );
}