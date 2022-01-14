export const Loader = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  return (
    <>
      <div className="lds-dual-ring"></div>
      <style jsx>{`
        .lds-dual-ring {
          display: inline-block;
          width: ${width}px;
          height: ${height}px;
        }
        .lds-dual-ring:after {
          content: " ";
          display: block;
          width: ${width - 16}px;
          height: ${height - 16}px;
          margin: 8px;
          border-radius: 50%;
          border: 6px solid #ed2553;
          border-color: #ed2553 transparent #ed2553 transparent;
          animation: lds-dual-ring 1.2s linear infinite;
        }
        @keyframes lds-dual-ring {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};
