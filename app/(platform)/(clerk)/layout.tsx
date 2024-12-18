const ClerkLayout = ({ children }: { 
    children: React.ReactNode;
}) => {
    const backgroundStyle = {
        backgroundImage: "url('/bg-img-lgn-sgn-page.jpg')", 
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100%", 
        height: "100vh", 
    };
    return (
        <div style={backgroundStyle} className="flex justify-center items-center">
            {children}
        </div>
    );
};
export default ClerkLayout;
