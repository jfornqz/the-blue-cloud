import { Fragment, useCallback, useState } from 'react'

import Input from './Input'

import { useUserStorage } from '../../contexts/UserContext'

const LoginPage = () => {
    const { handleOnLogin } = useUserStorage()

    return (
        <Fragment>
            <div className="w-full h-full flex">
                <div className="w-1/2 h-full"></div>

                <div className="w-1/2 h-full flex justify-center items-center bg-cyan-100">
                    <div className="w-1/2 h-1/3">
                        <div className="flex flex-col h-full space-y-5">
                            <h1 className="text-4xl font-semibold">Sign In</h1>

                            <form
                                className="w-full grow"
                                onSubmit={handleOnLogin}
                            >
                                <Input
                                    label="E-mail"
                                    type="text"
                                    placeholder="Enter your e-mail"
                                    id="username"
                                />
                                <Input
                                    label="Password"
                                    type="password"
                                    placeholder="Enter your password"
                                    id="password"
                                />
                                <button
                                    type="submit"
                                    className="w-2/3 h-12 max-h-12 shadow-xl rounded-xl bg-white mt-3 hover:bg-gray-100 transition duration-150"
                                >
                                    Log in
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default LoginPage
