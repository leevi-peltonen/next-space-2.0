
interface ModelFormProps<T extends object> {
    model: T
    onSubmit: (formData: FormData) => void
    title: string
}

function extractKeys<T extends object>(obj: T): (keyof T)[] {
    return Object.keys(obj) as (keyof T)[];
}


export default async function ModelForm<T extends object>({model, onSubmit, title}: ModelFormProps<T>) {
    return (
        <form
            action={onSubmit}
            className="text-black flex flex-col m-10"
        >
            <h1>Add new {title}</h1>
            {Object.keys(model).map(key => (
                <div key={key}
                    className="flex flex-col mb-4"
                >
                    {typeof model[key as keyof T] === 'string' ? 
                    (
                        <input
                            type="text"
                            name={key}
                            placeholder={key}
                        />
                    ) : typeof model[key as keyof T] === 'number' ?
                    (
                        <input
                            type="number"
                            name={key}
                            placeholder={key}
                        />
                    ) : 
                    (
                        <></>
                    )}
                </div>
            ))}
            <button
                type="submit"
                className="bg-primary text-white rounded-xl px-4 py-2 w-full"
            >Submit</button>
        </form>
    )
}