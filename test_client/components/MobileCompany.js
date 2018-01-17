import React from 'react';
import {default as isoFetch} from 'isomorphic-fetch';

import MobileClient from './MobileClient';

import './MobileCompany.css';

class MobileCompany extends React.PureComponent {

  constructor(props) {
    super(props);
    this.loadData();
  }

  state = {
    dataReady: false,
    name: "???",
    clients: [],
  };

  fetchError = (errorMessage) => {
    console.error(showStr);
  };

  fetchSuccess = (loadedData) => {
    console.log(loadedData);
    this.setState({
      dataReady:true,
      name:loadedData.companyName,
      clients:loadedData.clientsArr,
    });
  };

  loadData = (id, count) => {
// '/items/:item_id'
    isoFetch("http://127.0.0.1:8089/item/sfdsds", {
        method: 'post',
      body: JSON.stringify({
        count: count,
        name: dsdsd

      }),
        headers: {
            "Accept": "application/json",
        },
    })
        .then( (response) => {
            if (!response.ok) {
                let Err=new Error("fetch error " + response.status);
                Err.userMessage="Ошибка связи";
                throw Err;
            }
            else
                return response.json();
        })
        .then( (data) => {
            try {
                this.fetchSuccess(data);
            }
            catch ( error ){
                this.fetchError(error.message);
            }
        })
        .catch( (error) => {
            this.fetchError(error.userMessage||error.message);
        })
    ;

  };

  render() {
    console.log(this.state);
    if ( !this.state.dataReady )
      return <div>загрузка данных...</div>;

    let clientsCode=this.state.clients.map( client =>
      <MobileClient key={client.id} info={client}  />
    );

    return (
      <div className='MobileCompany'>
        <div className='MobileCompanyName'>Компания &laquo;{this.state.name}&raquo;</div>
        <div className='MobileCompanyClients'>
          {clientsCode}
        </div>
        <button>all items111</button>
        <button>one item</button>
        <button>add items</button>
        <button>delete items</button>
      </div>
    )
    ;

  }

}

export default MobileCompany;
