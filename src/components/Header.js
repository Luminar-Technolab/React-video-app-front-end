import React from 'react'
import { Navbar,Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <Navbar className="bg-primary">
    <Container>
      <Navbar.Brand  >
      <Link to={'/'} style={{textDecoration:'none'}} className='text-light'>
        <i class="fa-solid fa-cloud-arrow-up fa-shake me-2"></i>
          <span >Saspic.</span>
      </Link>
      </Navbar.Brand>
    </Container>
  </Navbar>
  )
}

export default Header