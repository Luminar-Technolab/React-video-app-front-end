import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Add from './Add'
import View from './View'
import AddCategory from '../components/AddCategory'

function Home() {

  
  return (
    <>
        <h1 className='text-info ms-5 mb-5'>All Uploaded Videos</h1>

 
        <div className='container-fluid   '>
        <Row className='mt-5'>
            <Col lg={1} >
                <Add 
               />
            </Col>
            <Col lg={7} className=' ms-5 ' >
            <View 
             
            />
            </Col>
            <Col  >
            <AddCategory 
            
            />
            </Col>
        </Row>
        </div>
    </>
  )
}

export default Home