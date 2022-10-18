function TextInput({ className, ...props }: JSX.IntrinsicElements['input']) {
  return (
    <input
      className={`rounded-xl px-3 w-full py-2 border ${className}`}
      placeholder="Enter something"
      type="text"
      {...props}
    />
  );
}

export default TextInput;
