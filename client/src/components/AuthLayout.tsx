import React, { ReactNode } from "react";

interface IProtected {
    children: ReactNode,
}

const Protected:React.FC<IProtected> = ({children}) => {

    return (
        <>
            {children}
        </>
    )
}

export default Protected;