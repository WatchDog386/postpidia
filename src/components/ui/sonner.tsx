import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        style: {
          background: "#1c1c1c",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "#f1f1f1",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
