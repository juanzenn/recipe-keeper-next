interface NavigationContainerProps {
  children?: string | React.ReactNode;
  className?: string;
}

export default function NavigationContainer({
  children,
  className,
}: NavigationContainerProps) {
  return (
    <section
      className={`w-full px-4 flex justify-between items-center text-white bg-primary-500 rounded-md shadow-sm ${className}`}>
      {children}
    </section>
  );
}
