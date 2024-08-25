import React, { useEffect, useState } from "react";
import { BackButton, VolunteerParticipantToggle } from '../Components/Button';
import { RegistrationCard, RegistrationCardPar } from '../Components/RegistrationCard';
import { IoCalendarOutline, IoLocationOutline, IoPeopleOutline } from 'react-icons/io5';
import { TrainingCard } from '../Components/Cards';
import { useHistory } from "react-router-dom/cjs/react-router-dom";


export default function IndividualEventDetail(location) {
    const [eventDetails, setEventDetails] = useState({});
    let event_id = location.location.state;
    
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    };

    useEffect(() => {
        // fetching the event details from the backend
        let backend_base = 'http://localhost:8000/'
        fetch(backend_base + 'api/events/' + event_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(async (res) => {
            if (res.status == 200) {
                // if the fetch is successful update the eventDetails json object
                setEventDetails(await res.json().then(data => data[0]).then(data => data.fields));
            } else {
                // if the fetch is unsuccessful, display an error message
                alert("Internal Server Error");
            }
        })
    }, []);
    const [current_role, setRole] = useState('Volunteer');

    const handleRoleToggle = () => {
        setRole(prevRole => prevRole === 'Participant' ? 'Volunteer' : 'Participant');
    };

    const CheckRoleRegistration = () => {
        if (current_role === 'Participant') {
            return <RegistrationCardPar event_id={event_id} />;
        } else {
            return <RegistrationCard event_id={event_id} />;
        }
    }

    const CheckRoleTraining = () => {
        if (current_role === 'Participant') {
            return <div></div>
        } else {
            return <TrainingCard />;
        }
    }

    return (
        <div className="flex w-full h-screen">
            <div className="w-full m-[28px] font-poppins">
                <div className="flex justify-between mb-8">
                <BackButton onClick={goBack}/>
                <VolunteerParticipantToggle onClick={handleRoleToggle}/>
                </div>
                <div className="">
                    <img src="http://placehold.it/1200x300"></img>
                    <div className="flex mt-[16px] justify-between space-x-8">
                        <div className="text-[32px] font-semibold">
                            {eventDetails.event_name || 'Online Training Academy'}
                            <div className="text-[14px] font-medium mb-4 text-darkgray space-y-1">
                                 <div className="flex">
                                    <IoCalendarOutline className="h-5 w-5 mr-4" />
                                    Friday, 23 August 2024
                                </div>
                                <div className="flex">
                                    <IoLocationOutline className="h-5 w-5 mr-4" />
                                    {eventDetails.event_location || 'Carnavon Road, Tsim Sha Tsui'}
                                </div>
                                  <div className="flex">
                                    <IoPeopleOutline className="h-5 w-5 mr-4" />
                                    {eventDetails.participant_quota || '100 participants'}
                                </div>
                            </div>

                             <div className="text-[20px] font-semibold">
                                 Details
                            </div>

                            <div className="text-[12px] font-medium text-justify text-darkgray ">
                                {eventDetails.event_description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
                            </div>

                            <div className="mt-[16px]">
                                <img src="http://placehold.it/700x300"></img>
                            </div>
                            <div>
                                {CheckRoleTraining()}
                            </div>
                        </div>
                        <div className="w-full">
                            {CheckRoleRegistration()}
                        </div>
                    </div>
                    
                </div>
            </div>
            
        </div>
    );
}