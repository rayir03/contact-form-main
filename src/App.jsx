import { useEffect, useState } from "react"
import Form from "./components/Form"
import SuccessMsg from "./components/SuccessMsg"


function App() {
  const [ isSuccess, setIsSuccess ] = useState(false);


  function handleSuccess() {
    setIsSuccess(true);
    
  }

  useEffect(() => {
    if(isSuccess) {

      const timer = setTimeout( () => setIsSuccess(false), 3000 );
      return () => clearTimeout(timer);

    }
   }, [ isSuccess ] );


  return (
    <main>
      <h1>Contact Us</h1>
      <Form onSuccess = {handleSuccess} />
      {isSuccess && <SuccessMsg />}
    </main>
  )
}

export default App
