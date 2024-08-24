import { Input } from "@mui/material"
import { InputForm, TextArea } from "./Input"
import { ButtonFull2, ButtonFull, ButtonYellow } from "./Button"
import { FileUpload } from "./Input"


export const RegistrationCard = () => {
    return(
        <div className="font-poppins p-[32px] h-[54px] rounded-[8px] bg-black text-white w-[400px] h-auto">
            <div className="font-[500] text-[20px] w-full">
                Volunteer Registration
                 <div className="w-full mt-4">
                    <InputForm type="text" name="Phone Number" placeholder="Phone Number" > A </InputForm>
                    <InputForm type="text" name="Ethinicity" placeholder="Ethnicity" > A </InputForm>
                    <InputForm type="text" name="Gender" placeholder="Gender" > A </InputForm>
                    <InputForm type="text" name="Date of Birth" placeholder="Date of Birth" > A </InputForm>
                    <div className="mt-4 mb-2 font-[500] text-[16px]"> Reason </div>
                    <TextArea name="reason"></TextArea>
                    <FileUpload />
                </div>
                <div className="text-white flex justify-end text-[12px]">
                    Register as volunteer 
                </div>
            </div>
            <div className="mt-4 flex justify-end">
                <ButtonYellow> Save </ButtonYellow>
            </div>
        </div>
    )
}