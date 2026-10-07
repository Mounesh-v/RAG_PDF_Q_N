export const NotesStack = ({ className = "" }) => (
  <svg
    viewBox="0 0 240 284"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    {/* botanical sprig behind the stack */}
    <path
      d="M34 256C32 220 38 192 34 160"
      stroke="#7D8050"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M34 216C21 212 13 200 14 187C28 189 34 201 34 216Z"
      fill="#BDB96A"
      fillOpacity="0.45"
      stroke="#7D8050"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <ellipse
      cx="33"
      cy="154"
      rx="7"
      ry="10"
      fill="#C1BFFF"
      stroke="#A5A1F8"
      strokeWidth="1.4"
      transform="rotate(-12 33 154)"
    />

    {/* stacked sheets */}
    <g strokeWidth="1.6" strokeLinejoin="round">
      <rect
        x="52"
        y="86"
        width="150"
        height="172"
        rx="10"
        fill="#FFFDF5"
        stroke="#D8C8F5"
        transform="rotate(-7 127 172)"
      />
      <rect
        x="58"
        y="78"
        width="150"
        height="172"
        rx="10"
        fill="#F3EEFF"
        stroke="#D8C8F5"
        transform="rotate(3 133 164)"
      />
      <rect
        x="64"
        y="70"
        width="150"
        height="172"
        rx="10"
        fill="#FFFDF5"
        stroke="#55515E"
      />
    </g>

    {/* written lines on the top sheet */}
    <g strokeLinecap="round">
      <path d="M82 98h62" stroke="#CF6DFC" strokeWidth="4" />
      <path d="M82 120h112" stroke="#BDB96A" strokeWidth="3" />
      <path d="M82 138h104" stroke="#D8C8F5" strokeWidth="3" />
      <path d="M82 156h112" stroke="#D8C8F5" strokeWidth="3" />
      <path d="M82 174h70" stroke="#D8C8F5" strokeWidth="3" />
      <path d="M82 202h14" stroke="#BDB96A" strokeWidth="3" />
      <path d="M104 202h90" stroke="#BDB96A" strokeWidth="3" />
      <path d="M82 222h14" stroke="#D8C8F5" strokeWidth="3" />
      <path d="M104 222h74" stroke="#D8C8F5" strokeWidth="3" />
    </g>

    {/* bookmark ribbon */}
    <path
      d="M190 70v42l-9-8-9 8V70"
      fill="#CF6DFC"
      fillOpacity="0.85"
      stroke="#9F44DE"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />

    {/* book beneath the stack */}
    <rect
      x="46"
      y="256"
      width="168"
      height="20"
      rx="7"
      fill="#BDB96A"
      stroke="#55515E"
      strokeWidth="1.6"
    />
    <path
      d="M60 266h140"
      stroke="#FFFDF5"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.7"
    />
  </svg>
);

export const DeskScene = ({ className = "" }) => (
  <svg
    viewBox="0 0 244 284"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    {/* window with warm light */}
    <g strokeWidth="1.6" strokeLinejoin="round">
      <rect
        x="20"
        y="26"
        width="94"
        height="112"
        rx="12"
        fill="#FFFDF5"
        stroke="#55515E"
      />
      <rect
        x="30"
        y="36"
        width="74"
        height="92"
        rx="7"
        fill="#FDFBD4"
        stroke="#BDB96A"
      />
      <path d="M67 36v92M30 82h74" stroke="#BDB96A" strokeWidth="1.4" />
    </g>

    {/* light rays */}
    <g
      stroke="#CF6DFC"
      strokeWidth="1.8"
      strokeLinecap="round"
      opacity="0.65"
    >
      <path d="M124 54l18-7" />
      <path d="M124 78l20 1" />
      <path d="M124 102l18 8" />
    </g>

    {/* desk */}
    <path
      d="M12 246h226"
      stroke="#55515E"
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    {/* open notebook */}
    <g strokeWidth="1.6" strokeLinejoin="round">
      <path
        d="M28 198c18-9 40-9 56 0v48c-16-9-38-9-56 0z"
        fill="#FFFDF5"
        stroke="#55515E"
      />
      <path
        d="M84 198c16-9 38-9 56 0v48c-18-9-40-9-56 0z"
        fill="#FFFDF5"
        stroke="#55515E"
      />
      <path d="M84 198v48" stroke="#55515E" strokeWidth="1.4" />
      <path
        d="M38 212c12-5 26-5 36 0M38 226c12-5 26-5 36 0"
        stroke="#D8C8F5"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M94 212c12-5 26-5 36 0M94 226c12-5 26-5 36 0"
        stroke="#D8C8F5"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </g>

    {/* book stack */}
    <g strokeWidth="1.6" strokeLinejoin="round">
      <rect
        x="136"
        y="226"
        width="60"
        height="20"
        rx="5"
        fill="#C1BFFF"
        stroke="#55515E"
      />
      <rect
        x="139"
        y="207"
        width="56"
        height="19"
        rx="5"
        fill="#BDB96A"
        stroke="#55515E"
      />
      <rect
        x="143"
        y="188"
        width="52"
        height="19"
        rx="5"
        fill="#FFFDF5"
        stroke="#55515E"
      />
      <path
        d="M152 197h30"
        stroke="#CF6DFC"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </g>

    {/* lavender stems */}
    <g stroke="#7D8050" strokeWidth="1.6" strokeLinecap="round">
      <path d="M214 216c-4-24-3-42 0-58" />
      <path d="M222 216c1-22 3-38 8-52" />
      <path d="M206 216c-6-20-9-34-8-46" />
    </g>
    <g strokeWidth="1.4">
      <ellipse
        cx="213"
        cy="154"
        rx="6.5"
        ry="9.5"
        fill="#C1BFFF"
        stroke="#A5A1F8"
        transform="rotate(-8 213 154)"
      />
      <ellipse
        cx="210"
        cy="172"
        rx="6.5"
        ry="9.5"
        fill="#C1BFFF"
        stroke="#A5A1F8"
        transform="rotate(-14 210 172)"
      />
      <ellipse
        cx="231"
        cy="168"
        rx="6.5"
        ry="9.5"
        fill="#CF6DFC"
        stroke="#9F44DE"
        transform="rotate(12 231 168)"
      />
      <ellipse
        cx="199"
        cy="174"
        rx="6.5"
        ry="9.5"
        fill="#CF6DFC"
        stroke="#9F44DE"
        transform="rotate(-16 199 174)"
      />
    </g>

    {/* vase */}
    <path
      d="M202 216c-8 7-12 17-9 24 2 5 9 6 21 6s19-1 21-6c3-7-1-17-9-24z"
      fill="#FFFDF5"
      stroke="#55515E"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M203 224h29"
      stroke="#BDB96A"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
