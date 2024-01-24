
import { Credentials } from "@/app/models/auth"
import toast from "react-hot-toast"
import { useRef } from "react"

interface Props {
    submitText?: string
    submitAction?: (x: Credentials) => void
    isRegister: boolean
}

const SpaceForm = ({isRegister, submitText, submitAction}: Props) => {
    const username = useRef<HTMLInputElement | null>(null)
    const password = useRef<HTMLInputElement | null>(null)
    const confirmPassword = useRef<HTMLInputElement | null>(null)

    /**
     * Disables default form submission and calls the submit action
     * @param e Form event
     * @returns void
     */

    const submitWrapper = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const _username = username.current?.value
        const _password = password.current?.value

        if(!_username || !_password) return toast.error('Please fill in all fields')

        if(isRegister) {
            const _confirmPassword = confirmPassword.current?.value
            if(!_confirmPassword) return toast.error('Please fill in all fields')
            if(_password !== _confirmPassword) return toast.error('Passwords do not match')
        }

        if(!submitAction) return console.error('No submit action provided')
        submitAction({ username: _username, password: _password })
    }

    return (
        <form
            className="bg-secondary min-h-full flex flex-col items-center justify-center shadow-md rounded-xl px-8 py-8 w-96"
            onSubmit={(e) => submitWrapper(e)}
        >
            <h1 className="text-2xl mb-4 ">{submitText}</h1>
            <input
                ref={username}
                name="username"
                type="text"
                placeholder="Username"
                className="bg-white text-black rounded-xl px-4 py-2 mb-4 w-full"
            />
            <input
                ref={password}
                autoComplete="off"
                name="password"
                type="password"
                placeholder="Password"
                className="bg-white text-black rounded-xl px-4 py-2 mb-4 w-full"
            />
            {isRegister && (
                <input
                    ref={confirmPassword}
                    autoComplete="off"
                    type="password"
                    placeholder="Confirm password"
                    className="bg-white text-black rounded-xl px-4 py-2 mb-4 w-full"
                />
            )}
            <div className="flex flex-row items-start mb-4 w-full">
                <button
                    className="bg-primary text-white rounded-xl px-4 py-2 w-full"
                    type="submit"
                >
                    {submitText}
                </button>    
            </div>
        </form>
    )
}

export default SpaceForm