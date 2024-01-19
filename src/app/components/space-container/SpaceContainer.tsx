
interface Props {
    children: React.ReactNode;
    classes?: string;
}
const SpaceContainer = ({ children, classes }: Props) => {
    return (
        <div className={"bg-transparent p-4 text-white rounded-xl grid justify-center items-center min-h-96 mx-auto mt-20 w-full " + classes}>
            {children}
        </div>
    )
}

export default SpaceContainer;