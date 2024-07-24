const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#1B4242] flex h-full  w-full justify-center items-center  ">
      {children}
    </div>
  );
};

export default AuthLayout;
