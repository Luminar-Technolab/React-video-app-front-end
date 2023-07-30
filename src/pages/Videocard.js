import React,{useEffect, useState} from 'react'
import { Card,Modal } from 'react-bootstrap';
import { deleteVideo } from '../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Videocard({video,insideCard}) {
    const [show, setShow] = useState(false);
    
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const removeItem = async (id)=>{
   const result=await deleteVideo(id)
   console.log(result);
   if(result.status===200){
    window.location.reload(false)
  }
  }

  //dargStarted
  const dargStarted =(e,id)=>{
    // console.log("Drag started!!! source card id :",id);
    e.dataTransfer.setData("cardId",id)
  }

  return (
    <>
        <Card  className='shadow'
        draggable
        onDragStart={e=>dargStarted(e,video?.id)}
        >
          <Card.Img onClick={handleShow} style={{height:'180px'}} variant="top" src={video?.image} fluid/>
          <Card.Body>
            <Card.Title className='d-flex justify-content-between'>
                <span>{video?.caption}</span>
{
  insideCard?"":
                <i onClick={()=> removeItem(video?.id)} className="fa-solid fa-trash text-danger"></i>
}
            </Card.Title>
            
          </Card.Body>
        </Card>
    
    <Modal show={show} onHide={handleClose}  backdrop="static"
        keyboard={false}>
    <Modal.Header closeButton>
      <Modal.Title>{video?.caption}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <iframe width={'100%'} height={'400px'} src={`${video?.url}?autoplay=1`} title={video?.caption} frameborder="0" allow="autoplay"  allowfullscreen></iframe>
    </Modal.Body>
    </Modal>
    <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
    </>
  )
}

export default Videocard
