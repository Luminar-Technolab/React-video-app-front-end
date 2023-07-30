import React,{useEffect, useState} from 'react'
import { Modal,Button,FloatingLabel,Form } from 'react-bootstrap'
import uuid from 'react-native-uuid';
import { uploadvideo } from '../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Add() {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [videoUploadData,setvideoUploadData] = useState({
    id:uuid.v4(),
    caption:"",
    image:"",
    url:""
  })

  const [videoURL,setVideoURL] = useState("")

  const extractVideoLink = (e)=>{
    let str = e.target.value
    if(str.includes("v=")){
      let index = str.indexOf("v=")
      let url = str.substring(index+2,index+13)
      setVideoURL(`https://www.youtube.com/embed/${url}`)
    }else{
      alert("Please Paste correct youtube link")
    }
  }
  const setVideodata = (e)=>{
    const {name,value} = e.target
    setvideoUploadData({...videoUploadData,[name]:value})
  }


const handleAdd =async (e)=>{
    e.preventDefault()
    const {id,caption,image} = videoUploadData
    if(!id || !caption || !image || !videoURL){
        toast.info("Please fill the form completely")
    }else{
        const data ={
          id,caption,image,url:videoURL
        }
        const result = await uploadvideo(data)
        console.log(result);
        toast.success("Video uploaded successfully")
        setTimeout(() => {
          window.location.reload(false)
        }, 3000);
    }
}
  return (
    <>
    <div onClick={handleShow} style={{width:'100px',height:'100px',borderRadius:'50%'}} className='border d-flex justify-content-center align-items-center bg-secondary'><i class="fa-solid fa-plus fa-3x text-light"></i></div>

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload A Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
      <FloatingLabel
        controlId="floatingInputname"
        label="Video Caption"
        className="mb-3"
      >
        <Form.Control name="caption" type="text" placeholder="Video Caption" onChange={setVideodata}/>
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInputimg"
        label="Video Cover Image URL"
        className="mb-3"
      >
        <Form.Control name='image' type="text" placeholder="Uploading Video Cover Image" onChange={setVideodata}/>
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInputurl"
        label="Youtube Video URL"
        className="mb-3"
      >
        <Form.Control type="text" name='url' placeholder="Uploading Video URL" onChange={extractVideoLink}/>
      </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
         <div onClick={handleClose}> <Button onClick={handleAdd}  variant="success">Add</Button></div>
        </Modal.Footer>
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

export default Add

