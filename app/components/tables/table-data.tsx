interface Props {
    value: string;
    twClasses?: string;
}

export default function TableData({ value, twClasses }: Props) {
    return (
        <td className={`text-start ${twClasses}`}>{value}</td>
    )
}