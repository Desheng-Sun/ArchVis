import "./index.css";

export default function ChartHeader({ chartName }) {
  return (
    <ul className="chartheader">
        <li class="item active">{chartName}</li>
        <li class="item"></li>
    </ul>
  );
}
