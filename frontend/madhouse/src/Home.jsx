import {React, useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PaystackPop from "@paystack/inline-js"
import axios from "axios"
import {useForm} from "react-hook-form";

 

function Home () {
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [amount, setAmount] = useState("")
    const [phonenumber, setphoneNumber] = useState("")
    const {register, handleSubmit, formState: {errors}, getValues} = useForm();
    


    const onSubmit = (data) => {
       setFullname(getValues("fullname"))
       setEmail(getValues("email"))
       setAmount(getValues("amount"))
       setphoneNumber(getValues("phonenumber"))

    
            const paystack = new PaystackPop();
            
          
            paystack.newTransaction({
            
                key: "pk_test_d85db65eb3bf360fa0fa5e18906368bc69469a5c",
                email,
                amount: amount * 100,
    
                onSuccess(transaction){
                    let reference = `${transaction.reference}`;
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

<form onSubmit={handleSubmit(onSubmit)}>


<Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },}}noValidateautoComplete="off">
 <TextField  id="fullname" label="Full Name"  name="fullname" variant="outlined"  {...register('fullname', { required: 'Hey, you forgot to enter your name!' })}/>
</Box>
{errors.fullname && <span>{errors.fullname.message}</span>}


<Box
 component="form"
 sx={{'& > :not(style)': { m: 1, width: '25ch' },}}noValidate autoComplete="off" >
 <TextField type="email" id="email" label="Email" name='email' variant="outlined"   {...register("email", {required: "Dont keep us hanging..", pattern: {value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message:"Oops, please enter a valid email"} })}/>
</Box>
{errors.email && <span>{errors.email.message}</span>}

<Box
 component="form"
 sx={{'& > :not(style)': { m: 1, width: '25ch' },}}noValidateautoComplete="off">
 <TextField id="outlined-basic" label="Amount" name='amount' variant="outlined"  {...register("amount",{required: "We need an amount"})} />

</Box>
{errors.amount && <span>{errors.amount.message}</span>} 
<Box
 component="form"
 sx={{'& > :not(style)': { m: 1, width: '25ch' },}}noValidateautoComplete="off">
 <TextField id="outlined-basic"name='number' label="Phone Number" variant="outlined" {...register("phonenumber",{required: false})} />
</Box>

<br></br>
<Button variant="outlined" endIcon={<ConfirmationNumberIcon/>} >
   <button style={{backgroundColor:"white", border: "0px"}}>
    Get Ticket
   </button>
</Button>
 


</form>

</div>
</>
  )
}


export default Home