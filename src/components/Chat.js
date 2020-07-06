import React, { Component, memo, useState, useEffect } from 'react';
// import { Widget, addResponseMessage } from 'react-chat-widget';
import { Input, Card, Fab } from "@material-ui/core";
// import 'react-chat-widget/lib/styles.css';

var socket = new WebSocket("ws://localhost:2021/auth/ws");
socket.onopen = function (e) {
    // alert("[open] Connection established");
    // alert("Sending to server");

    socket.send("My name is John");
};

socket.onmessage = function (event) {
    // alert(`[message] Data received from server: ${event.data}`);
};

socket.onclose = function (event) {
    if (event.wasClean) {
        alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        alert('[close] Connection died');
    }
};

socket.onerror = function (error) {
    alert(`[error] ${error.message}`);
};

const App = memo((_) => {
    let [open, setOpen] = useState(true);
    let [value, setValue] = useState('');
    let [messages, setMessages] = useState([]);



    // useEffect(() => {
    //     let socket = new WebSocket("ws://localhost:2021/auth/ws");
    //     socket.onopen = function (e) {
    //         // alert("[open] Connection established");
    //         // alert("Sending to server");

    //         socket.send("My name is John");
    //     };

    //     socket.addEventListener("message", (event) => {
    //         // setMessages([...messages, `${event.data}`])
    //     })

    //     socket.onmessage = function (event) {
    //         // alert(`[message] Data received from server: ${event.data}`);
    //     };

    //     socket.onclose = function (event) {
    //         if (event.wasClean) {
    //             alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    //         } else {
    //             // e.g. server process killed or network down
    //             // event.code is usually 1006 in this case
    //             alert('[close] Connection died');
    //         }
    //     };

    //     socket.onerror = function (error) {
    //         alert(`[error] ${error.message}`);
    //     };

    // }, [])

    socket.addEventListener("message", (event) => {
        event.data && setMessages([...messages, `${event.data}`])
    })


    // socket.onmessage = (event) => {
    //     console.log(event.data);

    //     setMessages([...messages, `${event.data}`])
    // }

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Fab style={{ right: 20, donw: 0, position: 'fixed' }} onClick={_ => setOpen(!open)}></Fab>


            <Card style={{ justifyContent: 'center', alignSelf: 'right', width: '30%', display: open ? 'none' : '' }}>

                {
                    messages.map((v, i) => <div key={i}> <a>{v}</a> </div>)
                }

                <Input
                    onBlur={_ => socket.send(value)}
                    onSubmit={_ => socket.send(value)}
                    onChange={e => setValue(e.target.value)} style={{ width: '100%' }}></Input>
            </Card>
        </div>
    );
})


export default App;