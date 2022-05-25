import { Fragment } from 'react'

const Input = ({ label, type, placeholder, onChange, value }) => {
    return (
        <Fragment>
            <div className="mb-4">
                <h1 className="font-normal mb-1">{label}</h1>
                <input
                    type={type}
                    name="username"
                    id="username"
                    className="border border-gray-200 w-2/3 focus:outline-none p-2 placeholder:font-extralight rounded-xl shadow-xl"
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                />
            </div>
        </Fragment>
    )
}

export default Input
