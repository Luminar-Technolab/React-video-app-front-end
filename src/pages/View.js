import React, { useEffect, useState } from "react";
import { getvideos } from "../services/allApi";
import { Row,Col } from "react-bootstrap";
import Videocard from "./Videocard";

function View({handleDragEnter,handleDragEnd}) {
  const [allvideos, setallvideos] = useState([]);
  const getAllVideos = async () => {
    const { data } = await getvideos();
    setallvideos(data);
  };
  useEffect(() => {
    getAllVideos();
  },[]);
  return (
    <div className="border rounded p-2">
      <Row>
        {allvideos.map((item) => (
          <Col className="ps-3 mb-3" sm={12} md={6} >
            <Videocard video={item} 
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default View;
