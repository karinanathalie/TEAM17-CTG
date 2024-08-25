import { Input } from "@mui/material"
import { InputForm, TextArea } from "./Input"
import { ButtonFull2, ButtonFull, ButtonYellow, ButtonFullRoleBased, ButtonBlue } from "./Button"
import { BsTelephone, BsCalendar2Date } from "react-icons/bs";
import { IoAccessibilityOutline, IoCalendarOutline } from "react-icons/io5";
import { GiWorld } from "react-icons/gi";
import { FileUpload } from "./Input"


export const RegistrationCard = () => {
    return(
        <div className="font-poppins p-[32px] h-[54px] rounded-[8px] bg-black text-white w-[400px] h-auto">
            <div className="font-[500] text-[20px] w-full">
                Volunteer Registration
                 <div className="w-full mt-4">
                    <InputForm type="text" name="Phone Number" placeholder="Phone Number" > <BsTelephone className="w-4 h-4"/> </InputForm>
                    <InputForm type="text" name="Ethinicity" placeholder="Ethnicity" > <GiWorld className="w-5 h-5" /> </InputForm>
                    <InputForm type="text" name="Gender" placeholder="Gender" > <IoAccessibilityOutline className="w-5 h-5" /> </InputForm>
                    <InputForm type="text" name="Date of Birth" placeholder="Date of Birth" > <IoCalendarOutline className="w-5 h-5" /> </InputForm>
                    <div className="mt-4 mb-2 font-[500] text-[16px]"> Reason </div>
                    <TextArea name="reason"></TextArea>
                    <div className="mt-4 mb-2 font-[500] text-[16px]"> Upload Files </div>
                    <FileUpload />
                </div>
                <div className="text-white flex justify-end text-[12px]">
                    Register as participant 
                </div>
            </div>
            <div className="mt-4 flex justify-end">
                <ButtonYellow> Save </ButtonYellow>
            </div>
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