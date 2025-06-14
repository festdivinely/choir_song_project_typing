import React from 'react'
import { images } from '../constants/images'


const footerComp = () => {
    return (
        <section className="relative flex items-center justify-center w-full h-[50%] bg-white">
            <div className='mt-25 w-full h-fit flex justify-center items-center'>
                <div className='flex flex-col justify-center items-center'>
                    <div className='flex justify-start items-start gap-1'>
                        <div className='w-fit h-fit mt-[-12px]' style={{
                            backgroundImage: `url(${images.chosenlogo.src})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            width: 50,
                            height: 50
                        }}></div>
                        <div className='flex flex-col justify-center items-center'>
                            <h2 className='text-xl'>The Lord's Chosen Charismatic</h2>
                            <h2>Revival Movement</h2>
                            <h2>Youth Choir Department</h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default footerComp