
interface Props {
    src: string
    alt: string
    size: string
    classes?: string
}


const SpaceLogo = ({ src, alt, size, classes }: Props) => {
    return (
        <img className={`w-${size} h-${size} hover:opacity-100 ${!!classes && classes}`} src={src} alt={alt} />
    )
}

export default SpaceLogo