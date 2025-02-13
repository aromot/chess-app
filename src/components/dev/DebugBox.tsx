const DebugBox = ({
  title,
  children,
}: Readonly<{
  title?: string;
  children: unknown;
}>) => {
  return (
    <div>
      {title && <div>{title}</div>}
      <pre
        style={{ fontSize: 12 }}
        className="bg-gray-200 text-teal-950 rounded-md p-2"
      >
        {JSON.stringify(children, null, 2)}
      </pre>
    </div>
  );
};

export default DebugBox;
