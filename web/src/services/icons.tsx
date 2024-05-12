export const getListIcon = (color: "#000000", width = "20", height = "20") => {
  return (
    <svg
      viewBox="0 0 20 20"
      fill={color}
      width={width}
      height={height}
      stroke={color}
      strokeWidth="0"
    >
      <circle cx="4.5" cy="4.5" r="1.5" fill={color}></circle>
      <circle cx="4.5" cy="10" r="1.5" fill={color}></circle>
      <circle cx="4.5" cy="15.5" r="1.5" fill={color}></circle>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 4.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0Zm-2 0a1.5 1.5 0 1 1 3.001.001A1.5 1.5 0 0 1 3 4.5ZM7.5 4h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1Zm-3 5.5a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1Zm0-1a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 4.5 8.5Zm3 1h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1Zm-3 5.5a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1Zm0-1a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 4.5 14Zm3 1h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1Z"
        fill={color}
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm1.75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1 0-1.5ZM4.5 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm3.25-2.25h8.5a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1 0-1.5ZM4.5 17a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm3.25-2.25h8.5a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1 0-1.5Z"
        fill={color}
      ></path>
    </svg>
  );
};

export const getTrashIcon = (
  color = "#fefefe",
  width = "20",
  height = "20",
) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={width}
      height={height}
      viewBox="0,0,256,256"
    >
      <g
        fill={color}
        fillRule="nonzero"
        stroke="none"
        strokeWidth="1"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        strokeDasharray=""
        strokeDashoffset="0"
      >
        <g transform="scale(8,8)">
          <path d="M15,4c-0.52344,0 -1.05859,0.18359 -1.4375,0.5625c-0.37891,0.37891 -0.5625,0.91406 -0.5625,1.4375v1h-6v2h1v16c0,1.64453 1.35547,3 3,3h12c1.64453,0 3,-1.35547 3,-3v-16h1v-2h-6v-1c0,-0.52344 -0.18359,-1.05859 -0.5625,-1.4375c-0.37891,-0.37891 -0.91406,-0.5625 -1.4375,-0.5625zM15,6h4v1h-4zM10,9h14v16c0,0.55469 -0.44531,1 -1,1h-12c-0.55469,0 -1,-0.44531 -1,-1zM12,12v11h2v-11zM16,12v11h2v-11zM20,12v11h2v-11z"></path>
        </g>
      </g>
    </svg>
  );
};
