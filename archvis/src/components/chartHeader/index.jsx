import "./index.css";

export default function ChartHeader({ chartName }) {
  return (
    // <div className="chartheader">{chartName}</div>
    <ul class="nav">
        <li class="item active">{chartName}</li>
        <li class="item"></li>
    </ul>
  );
}
