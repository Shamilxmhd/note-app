import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import TextField from '@mui/material/TextField';
import Notes from './Notes';
import { addNoteAPI } from '../Services/allAPI';

function Home() {
    const [addNotes, setAddNotes] = useState({ id: '', title: '', content: '', category: '', tags: '' })
    const [noteResponse, setNoteResponse] = useState()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleNote = async () => {
        const { id, title, content, category, tags } = addNotes
        if (!id || !title || !content || !category || !tags) {
            alert("Fill all the Notes")
        } else {
            const result = await addNoteAPI(addNotes)
            console.log(result);
            if (result.status >= 200 && result.status < 300) {
                handleClose()
                setAddNotes({ id: '', title: '', content: '', category: '', tags: '' })
                setNoteResponse(result.data)

            } else {
                console.log(result.message);
                console.log(err)
                console.log(err.response)
            }
        }

    }

    console.log(addNotes);

    return (
        <div style={{ width: '600px', height: '100%' }} className='border shadow rounded '>
            <Form className="d-flex mt-5 w-50 ms-5">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
            </Form>
            <div className=' p-2 m-2 d-flex justify-content-between'>
                
                <button className='btn btn-info rounded-3 border w-100'><h5 className='mt-2 fw-bolder'>NOTES </h5></button>
                <button onClick={handleShow} className='btn  '><img width={'30px'} src="https://cdn-icons-png.flaticon.com/512/1004/1004733.png" alt="" /></button>
                
            </div>
            <div>
                <Modal centered
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title className='text-center w-100'>ADD NOTE</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3 " controlId="formBasicEmail">
                                <TextField className='w-100' id="outlined-basic" label="Title" variant="outlined" onChange={e => setAddNotes({ ...addNotes, id: e.target.value })} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <TextField className='w-100'
                                    id="outlined-multiline-static"
                                    label="Notes" onChange={e => setAddNotes({ ...addNotes, title: e.target.value })}
                                    multiline
                                    rows={2}
                                />
                                <TextField className='w-100'
                                    id="outlined-multiline-static"
                                    label="Notes" onChange={e => setAddNotes({ ...addNotes, content: e.target.value })}
                                    multiline
                                    rows={2}
                                />
                                <TextField className='w-100'
                                    id="outlined-multiline-static"
                                    label="Notes" onChange={e => setAddNotes({ ...addNotes, category: e.target.value })}
                                    multiline
                                    rows={2}
                                />
                                <TextField className='w-100'
                                    id="outlined-multiline-static"
                                    label="Notes" onChange={e => setAddNotes({ ...addNotes, tags: e.target.value })}
                                    multiline
                                    rows={2}
                                />
                            </Form.Group>

                        </Form>
                        <div className='w-100 text-center'>
                            <Button onClick={handleNote} className='w-25 fw-bolder border shadow' variant="info" >
                                ADD
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
            <Notes noteResponse={noteResponse} setAddNotes={setAddNotes} />
        </div>
    )
}

export default Home