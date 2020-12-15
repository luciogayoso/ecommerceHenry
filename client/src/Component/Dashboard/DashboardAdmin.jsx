import React, {useState} from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import ListCategory from '../FormCategory/ListCategory'
import FormularioAdmin from '../formProductAdmin/formProductAdmin'
import ListUser from '../User/ListUser'
import OdersAdmin from '../Order/OdersAdmin'
import style from './DashboardAdmin.module.css';


export default function DashboardAdmin(){

    const [key, setKey] = useState('home');

    return (
        <Container fluid>
          <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="products" title="Products" >
          <FormularioAdmin/>
        </Tab>
        <Tab eventKey="categories" title="Categories">
          <ListCategory />
        </Tab>
        <Tab eventKey="user" title="Users">
           <ListUser />
        </Tab>
        <Tab eventKey="orders" title="Orders">
          <OdersAdmin />
        </Tab>
      </Tabs>

        </Container>
     
    );
  }
  


