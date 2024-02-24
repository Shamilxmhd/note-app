import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { getNoteAPI, removeANoteAPI } from '../Services/allAPI';

function Notes({noteResponse,setAddNotes}) {
    const [allNotes,setAllNotes]=useState([])

    useEffect(()=>{
        getAllNotes()
    },[noteResponse,setAddNotes])
    const getAllNotes=async()=>{
        const result=await getNoteAPI()
        if(result.status===200){
            console.log(result.data);
            setAllNotes(result.data)
        }else{
            console.log("api failed");
            setAllNotes([])
        }
    }
    console.log(allNotes);

    const removeNote=async(id)=>{
        await removeANoteAPI(id)
        getAllNotes()
        setAddNotes({title:"",notes:""})

    }
    return (
        <div  className='container mt-4 pe-4'>
            <Row className='ps-3'>
                {
                    allNotes?.length>0?allNotes.map(notes=>(
                        <Col sm={12} md={6} xl={12} className=''>
                    <Card className='mb-4 w-100 shadow '>
                        <Card.Body>
                            <div className='d-flex justify-content-between'>
                                <Card.Title className='mt-2 ms-2 text-primary w-100 text-wrap fs-3'>{notes.id}</Card.Title>
                                
                            </div>
                            <hr />
                            <Card.Text className='mt-4 text-wrap fs-6 '>
                                {notes.title}
                            </Card.Text>
                            <Card.Text className='mt-4 text-wrap fs-6 '>
                                {notes.content}
                            </Card.Text>
                            <Card.Text className='mt-4 text-wrap fs-6 '>
                                {notes.category}
                            </Card.Text>
                            <Card.Text className='mt-4 text-wrap fs-6 '>
                                {notes.tags}
                            </Card.Text>

                        </Card.Body>
                    </Card>
                </Col>
                    )):<div style={{height:'100vh'}} className='text-center'>
                        <img width={'100%'}  src="https://media.tenor.com/8QBZ9ZJDKywAAAAe/no-content.png" alt="" />
                    </div>
                }
            </Row>
        </div>
    )
}

export default Notes