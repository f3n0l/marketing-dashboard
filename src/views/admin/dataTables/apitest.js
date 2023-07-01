import React from "react";
import { useState, useEffect } from "react";

export default function Apitest() {
    const [data, setData] = useState("");

    useEffect(() => {
        fetch("/api")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setData(data.message);
            });
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <p>{!data ? "Loading..." : data}</p>
                {/* <h1>{data} a</h1> */}
            </header>
        </div>
    );
}
