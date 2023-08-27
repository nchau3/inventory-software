interface tableHeaderProps {
    name: string;
    twClasses?: string;
}

export default function TableHeader(props: tableHeaderProps) {
    return (
        <th scope="col" className={`text-start ${props.twClasses}`}>{props.name}</th>
    )
}