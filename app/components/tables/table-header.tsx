interface tableHeaderProps {
    name: string;
    twClasses?: string;
}

export default function TableHeader(props: tableHeaderProps) {
    return (
        <th scope="col" className={`text-start font-light sm:text-sm ${props.twClasses}`}>
            <div className="flex">{props.name}</div>
        </th>
    )
}