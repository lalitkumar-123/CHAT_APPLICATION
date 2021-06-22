import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {Form,Button} from 'react-bootstrap'
// import './Join.css'

function Join() 
{
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');

    return (
        <div style={{backgroundColor:"#1a1a1d", height:"100vh",display:"flex"}}>
            <Form style={{marginTop:"200px", width:"40%", marginLeft:"380px"}}>
                <Form.Group>
                    <Form.Label style={{color:"white"}}>Name</Form.Label>
                    <Form.Control type="text" onChange={(e)=>setName(e.target.value)} required></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label style={{color:"white"}}>Room</Form.Label>
                    <Form.Control type="text" onChange={(e)=>setRoom(e.target.value)} required></Form.Control>
                </Form.Group>
                <Link onClick={(e) => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&&room=${room}`}>
                    <Button type="submit" style={{marginTop:"5px"}}>JOIN</Button>
                </Link>
            </Form>
            </div>
    )
}

export default Join;


