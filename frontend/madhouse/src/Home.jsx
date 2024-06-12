import {React, useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PaystackPop from "@paystack/inline-js"
import axios from "axios"
import {useForm} from "react-hook-form";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function Home () {
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [amount, setAmount] = useState("")
    const [phonenumber, setphoneNumber] = useState("")
    const {register, handleSubmit, formState: {errors}, getValues} = useForm();
    const [visible, setVisible] = useState(false);
    const [ticketNo, setticketNo] = useState("");


    const onSubmit = (data) => {
       setFullname(getValues("fullname"))
       setEmail(getValues("email"))
       setAmount(getValues("amount"))
       setphoneNumber(getValues("phonenumber"))

    
            const paystack = new PaystackPop();
            
          
            paystack.newTransaction({
            
                key: "pk_live_06f1c4249dc2edcecbd72e8505f17c069eae4add",
                email,
                amount: amount * 100,
    
                onSuccess(transaction){
                    let reference = `${transaction.reference}`;
                    if(reference == null){
                        console.log("notify failed")

                    }
                    else{                
                            return toast(`${fullname}, this is your ticket reference: ${reference}`);
                           
                    }
                    
                    axios.post("https://mad-house-ticketing-server.vercel.app/Ticket", {fullname, reference, email, amount, phonenumber}).then((res) => {
                        console.log(res)
                    }).catch((err)=>{ 
                        console.log(err)
                    })   
                }
            })
            
    }





  
  




  return (
    <>
     <div className='form-card'>

<form className="form"onSubmit={handleSubmit(onSubmit)}>

<h3>Madhouse 1.0</h3>

<Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },}}noValidateautoComplete="off">
 <TextField  id="fullname" label="Full Name"  name="fullname" variant="outlined"  {...register('fullname', { required: 'Hey, you forgot to enter your name!' })}/>
</Box>
{errors.fullname && <span id='errors-info'>{errors.fullname.message}</span>}


<Box
 component="form"
 sx={{'& > :not(style)': { m: 1, width: '25ch' },}}noValidate autoComplete="off" >
 <TextField type="email" id="email" label="Email" name='email' variant="outlined"   {...register("email", {required: "Dont keep us hanging..", pattern: {value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message:"Oops, please enter a valid email"} })}/>
</Box>
{errors.email && <span id='errors-info' >{errors.email.message}</span>}

<Box
 component="form"
 sx={{'& > :not(style)': { m: 1, width: '25ch' },}}noValidateautoComplete="off">
 <TextField id="outlined-basic" label="Amount" name='amount' variant="outlined"  {...register("amount",{required: "You broke or something?"})} />

</Box>
{errors.amount && <span id='errors-info'>{errors.amount.message}</span>} 
<Box
 component="form"
 sx={{'& > :not(style)': { m: 1, width: '25ch' },}}noValidateautoComplete="off">
 <TextField id="outlined-basic"name='number' label="Phone Number" variant="outlined" {...register("phonenumber",{required: false})} />
</Box>

<br></br>
<Button variant="contained" endIcon={<ConfirmationNumberIcon/>} style={{zIndex:"1"}} >
    
   <button style={{backgroundColor:"#1976d2", border: "0px",paddingLeft:"0px", paddingRight: "0px", color:"white"}}>
   Get Ticket
   </button>
</Button>


<div className='modal'>

    <div className='overlay'> 
      <div className='content'></div>
    </div>

</div>
<ToastContainer
position="top-center"
autoClose={20000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition: Bounce
/>
      

{/* <Modal isOpen={true} onRequestClose={true}>

<h2>Transaction Successful</h2>
<p>{fullname}, Your ticket reference is {ticketNo}</p>
<button className='' style={{background:"none", color:"white"}}>close</button>

</Modal> */}



</form>

</div>
</>
  )
}


export default Home