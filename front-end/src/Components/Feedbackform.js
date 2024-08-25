import react, { Component } from 'react';

import { ButtonFull } from './Button';
import StarRatingBar from './StarRating';

export const FeedBackForm = (event_id) => {
    function handleSubmission(event) {
        event.preventDefault();
        console.log('Feedback submitted');
    }

    return(
        <form onSubmit={handleSubmission} className='flex flex-col justify-start px-[20px] py-[10px] rounded-[16px] w-full h-full bg-pastelyellow'>
            <div className='font-semibold'>
                Event Feedback
            </div>
            <input className='border border-gray mt-[10px] px-[10px] w-full rounded-[6px] bg-lightgray' type='text' placeholder='Event Name'>
            </input>
            <div className='flex mt-[10px] space-x-[10px]'>
                <textarea className='border border-gray px-[10px] w-full h-[90px] rounded-[6px] bg-lightgray' type='text' placeholder='Write a Review'>
                </textarea>
                <div className='flex flex-col justify-end'>
                    <div className='flex flex-col font-medium'>
                        <div className='font-medium'>
                            Rating:
                        </div>
                        <div className='flex'>
                            <StarRatingBar />
                        </div>
                    </div>
                    <ButtonFull>Submit</ButtonFull>
                </div>
            </div>
        </form>
    );
};