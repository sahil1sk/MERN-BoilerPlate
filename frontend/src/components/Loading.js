import React from 'react'
import './app.css';

export default function loading({msg}) {
    return (
        <div id="setLoading">
            <div className="text-center">
                <div className="spinner-border text-secondary" style={{width:"4rem", height:"4rem"}} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <br/>
                <span>{msg}</span>
            </div>
        </div>
    )
}

                
                