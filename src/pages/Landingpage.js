import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Landingpage() {
    const navigate = useNavigate()

  const handleMore = ()=>{
    navigate('/home')
  }
  return (
    <Row className='align-items-center mb-5'>
       <Col >
        </Col>
        <Col md={4}>
          <h1>
            Welcome to <span className='text-info'>Saspic.</span>
          </h1>
          <p style={{textAlign:'justify'}} className='mt-5 mb-3'><b>Where user can manage their favorite videos</b>. User can upload any youtube videos by copy and paste their URL. <b className='text-danger'>Saspic.</b> will allow to add and remove their uploaded videos and also arrange them in different categories by drag and drop. It's free, try it now!</p>
          <button onClick={handleMore} className='btn btn-info'>Click here to Know More</button>
        </Col>
        <Col >
        </Col>
        <Col md={6}>
          <img style={{height:'500px'}} className='img-fluid' src='https://adndigital.com.br/wp-content/uploads/2019/10/landing-page.png'/>
        </Col>
       </Row>
  )
}

export default Landingpage