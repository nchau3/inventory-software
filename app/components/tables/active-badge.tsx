export default function ActiveBadge(props: { is_active: boolean }) {
    const buttonColor = props.is_active ? "bg-green-400" : "bg-gray-200";
    return (
        <div className={`h-fit w-fit text-xs p-1 rounded-lg ${buttonColor}`}>
            {props.is_active ? "ACTIVE" : "INACTIVE"}
        </div>
    )
}