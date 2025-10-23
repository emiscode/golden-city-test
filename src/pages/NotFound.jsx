import React from 'react'

const NotFound = () => {
    return (
        <div className='min-h-screen page-bg flex items-center justify-center'>
            <div className="text-center">
                <h1 className='text-4xl md:text-5xl font-bold mb-6'>Page not found</h1>
	            <p className='text-xl text-muted'>Error 404: The page your're looking for does not exist!</p>
            </div>
        </div>
    )
}

export default NotFound;
