import { InputForm, TextArea } from "./Input"
import { ButtonYellow, ButtonBlue } from "./Button"
import { BsTelephone } from "react-icons/bs";
import { IoAccessibilityOutline, IoCalendarOutline } from "react-icons/io5";
import { GiWorld } from "react-icons/gi";
import { FileUpload } from "./Input"


export const RegistrationCard = (event_id) => {
    function handleRegistration(e){
        e.preventDefault();
        console.log(event_id);
        console.log("reg entered", e.target);
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        console.log('this is data', formData);
        const requestBody = { 'event_id': event_id['event_id'], 'user_profile_id': 4, 'reason_joining': "", ...formData };
        e.preventDefault();
        // making a request to the endpoint
        fetch('http://localhost:8000/api/application/create/volunteers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
        }).then(async (res) => {
        if (res.status == 200) {
            window.location.href = '/'; // redirect to the home page
        } else {
            // if the fetch is unsuccessful, display an error message
            alert(await res.json().then(data => data.message));
        }
        })
  }
    return(
        <div className="font-poppins p-[32px] h-[54px] rounded-[8px] bg-black text-white w-[400px] h-auto">
         <form onSubmit={handleRegistration} id="volunteer-reg-form">
            <div className="font-[500] text-[20px]">
                Volunteer Registration
               
                 <div className=" mt-4">
            
                    <InputForm type="text" name="Phone Number" placeholder="Phone Number" > <BsTelephone className="w-4 h-4"/> </InputForm>
                    <InputForm type="text" name="Ethinicity" placeholder="Ethnicity" > <GiWorld className="w-5 h-5" /> </InputForm>
                    <InputForm type="text" name="Gender" placeholder="Gender" > <IoAccessibilityOutline className="w-5 h-5" /> </InputForm>
                    <InputForm type="text" name="Date of Birth" placeholder="Date of Birth" > <IoCalendarOutline className="w-5 h-5" /> </InputForm>
                    <div className="mt-4 mb-2 font-[500] text-[16px]" name="reason_joining"> Reason </div>
                    <TextArea name="reason"></TextArea>
                    <div className="mt-4 mb-2 font-[500] text-[16px]" name="cv_file"> Upload Files </div>
                    <FileUpload />
                    <button> Save </button>
                 
                </div>
                <div className="text-white flex justify-end text-[12px]">
                    Register as participant 
                </div>
                
            </div>
            
            {/* <div className="mt-4 flex justify-end" onClick={handleRegistration}>
                <ButtonYellow> Save </ButtonYellow>
            </div> */}
            </form>
        </div>
    )
}

export const RegistrationCardPar = () => {
    return(
        <div className="font-poppins p-[32px] h-[54px] rounded-[8px] bg-black text-white w-[400px] h-auto">
            <div className="font-[500] text-[20px] w-full">
                Participant Registration
                 <div className="w-full mt-4">
                    <InputForm type="text" name="Phone Number" placeholder="Phone Number" > <BsTelephone className="w-4 h-4"/> </InputForm>
                    <InputForm type="text" name="Ethinicity" placeholder="Ethnicity" > <GiWorld className="w-5 h-5" /> </InputForm>
                    <InputForm type="text" name="Gender" placeholder="Gender" > <IoAccessibilityOutline className="w-5 h-5" /> </InputForm>
                    <InputForm type="date" name="Date of Birth" placeholder="Date of Birth"> <IoCalendarOutline className="w-5 h-5" /> </InputForm>
                </div>
                <div className="text-white flex justify-end text-[12px]">
                    Register as participant 
                </div>
            </div>
            <div className="mt-4 flex justify-end">
                <ButtonBlue> Save </ButtonBlue>
            </div>
        </div>
    )
}