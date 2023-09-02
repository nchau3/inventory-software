export default function ActiveBadge(props: { is_active: boolean }) {
  const buttonColor = props.is_active ? "bg-green-400" : "bg-gray-200";
  return (
    <div className={`h-fit w-fit rounded-lg p-1 text-xs ${buttonColor}`}>
      {props.is_active ? "ACTIVE" : "INACTIVE"}
    </div>
  );
}
