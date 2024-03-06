import React, { HTMLAttributes, SVGAttributes } from 'react'


const Chevron = (props: HTMLAttributes<SVGElement> & SVGAttributes<SVGElement>) => {
    return (
        <svg viewBox="0 0 25 18" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M12.5 12.75C12.2891 12.75 12.1016 12.6797 11.9609 12.5391L7.46094 8.03906C7.15625 7.75781 7.15625 7.26562 7.46094 6.98438C7.74219 6.67969 8.23438 6.67969 8.51562 6.98438L12.5 10.9453L16.4609 6.98438C16.7422 6.67969 17.2344 6.67969 17.5156 6.98438C17.8203 7.26562 17.8203 7.75781 17.5156 8.03906L13.0156 12.5391C12.875 12.6797 12.6875 12.75 12.5 12.75Z" fill="inherit" fill-opacity="0.5" />
        </svg>

    )
}

export default Chevron