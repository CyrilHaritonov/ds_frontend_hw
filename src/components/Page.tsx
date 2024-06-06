import React, { ReactChild, ReactFragment, ReactPortal, forwardRef } from "react";

type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;

interface props {
    children: ReactNode
}

const Page = forwardRef<HTMLDivElement, props>(({children}, ref) => {
    return (
        <div style={{
            height: "100vh",
            width: "100%",
        }} ref={ref}>
            {children}
        </div>
    );
})

export default Page;