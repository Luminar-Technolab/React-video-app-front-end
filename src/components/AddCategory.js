import React ,{useEffect, useState} from 'react'
import { Modal,Form ,FloatingLabel,Button,Dropdown, Row ,Col } from 'react-bootstrap';
import { addCategoryData, deleteCategory, deleteVideo, getallcategories, getsinglevideo, updatecategory } from '../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Videocard from '../pages/Videocard';

function AddCategory() {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [category,setCategory] = useState({
    id:"",
    categoryName:""
  })
  const setCategoryForm = (e)=>{
    const {name,value} = e.target
    setCategory({...category,[name]:value})
  }
// console.log(category);
  const handleAddCategory =async (e)=>{
    e.preventDefault()
    const {id,categoryName} = category
    if(!id || !categoryName){
      toast.info("Please fill the form completely")
  }else{
      const data ={
        id,categoryName,items:[]
      }
      const result = await addCategoryData(data)
      console.log(result);
      // toast.success("Added new category")
      getCategory()
  }
  }
  const [allCategory,setAllCategory]=useState([])

  const getCategory =async ()=>{
    const {data} = await getallcategories()
    setAllCategory(data);
  }
  // console.log(allCategory);
  useEffect(()=>{
    getCategory()
  },[category])

  const handleRemoveCategory = async(e,id)=>{
    e.preventDefault()
    console.log(id);
    await deleteCategory(id)
    // toast.success("Category Successfully removed!!!")
    getCategory()
  }

  const dragOver =(e)=>{
    e.preventDefault()
    // console.log("Dragging over the board now!!");
  }

  const dropped = async (e,boardId)=>{
    console.log(boardId);
    let transferedCardId = e.dataTransfer.getData("cardId")
    console.log(`You have dropped the card with id: ${transferedCardId}, inside the board!!`);
    //call api to get data transferedCardId card from http://localhost:4000/videos
    let {data} = await getsinglevideo(transferedCardId)
    console.log("Card details:",data);
    //find details of the board from allCategory
    // console.log(allCategory);
    let selectedBoard = allCategory.find(item=>item.id==boardId)
    // console.log("Selected board:",selectedBoard);
    //logic insert video in category
    selectedBoard.items.push(data)
    //call api to insert video in category
    await updatecategory(boardId,selectedBoard)
    // await deleteVideo(transferedCardId)
    window.location.reload(false)
  }
  return (
    <>
        <div className='d-grid'>
          <button className='btn btn-info m-2' onClick={handleShow}>Add Categories</button>
        </div>

        {
          allCategory.map((item)=>(
            <div droppable onDragOver={e=>dragOver(e)} onDrop={e=>dropped(e,item?.id)} className='border rounded p-2 m-2 '>
             <div className='d-flex justify-content-between align-items-center'> 
              <h4> {item?.categoryName} </h4>
              <i onClick={e=>handleRemoveCategory(e,item?.id)} className="fa-solid fa-trash text-danger me-3"></i>
              </div>
              <Row>
                {
                  item?.items.map(card=>(
                    <Col className="ps-3 mb-3" sm={12}>
            <Videocard video={card} insideCard="true"
            />
          </Col>
                  ))
                }
              </Row>
            </div>
          ))
        }

                <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Category Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FloatingLabel
        controlId="floatingInputId"
        label="Id"
        className="mb-3"
      >
        <Form.Control type="number" name='id' placeholder="Id" onChange={setCategoryForm} />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInputName"
        label="Category Name"
        className="mb-3"
      >
        <Form.Control type="text" name='categoryName' placeholder="Category Name" onChange={setCategoryForm}/>
      </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <div onClick={handleClose}>
            <Button variant="primary" onClick={handleAddCategory}>
              Add
            </Button>
          </div>
        </Modal.Footer>

      </Modal>
    </>
  )
}

export default AddCategory