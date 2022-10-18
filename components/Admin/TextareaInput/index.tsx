function TextAreaInput({
  className,
  ...props
}: JSX.IntrinsicElements['textarea']) {
  return (
    <textarea
      className={`rounded-xl block mb-2 px-3 py-2 w-full h-36 border ${className}`}
      placeholder="Enter something"
      {...props}
    />
  );
}

export default TextAreaInput;
