import React, {useState} from 'react'

export default function alerts({type, msg}) {

  const [appear, setAppear] = useState(true);

  setTimeout(() => {
    setAppear(false);
  }, 5000)

    return (
      <>
      {appear && 
        <div id="setAlert" className={"text-center alert alert-" + type} role="alert">
          {msg}
        </div>
      }
      </> 
    )
}
