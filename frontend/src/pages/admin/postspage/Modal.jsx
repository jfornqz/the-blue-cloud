import { Fragment, useCallback } from 'react'

import { DELETE_POST_BY_ID } from '../../../graphql/mutation'

import { useMutation } from '@apollo/client'

const Modal = ({ setIsOpen, editPost }) => {

    const [deletePostById] = useMutation(DELETE_POST_BY_ID)

    const handleOnClick = useCallback(async () => {
        try {
            await deletePostById({ variables: { id: editPost } } )
            setIsOpen(false)
        } catch {
            console.log('error')
        }
    }, [])

    return (
        <Fragment>
            <div className='w-full h-full top-0 absolute bg-gray-200 bg-opacity-50 flex justify-center items-center left-0'>
                <div className='w-1/4 h-1/6 bg-white flex justify-center items-center space-x-5'>
                    <button className='p-3 bg-green-400 text-white rounded-lg font-bold w-1/4' onClick={handleOnClick}>
                        Confirm
                    </button>
                    <button
                        className='p-3 bg-gray-300 text-black rounded-lg font-bold w-1/4'
                        onClick={() => setIsOpen(false)}>
                        Cancel
                    </button>

                </div>

            </div>
        </Fragment>
    )
}

export default Modal