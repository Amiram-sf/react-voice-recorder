import { FC, ReactNode } from "react"

interface IIsShow {
    isShow?: boolean,
    children?: ReactNode
}

export const IsShow: FC<IIsShow> = ({
    isShow = true,
    children
}) => {
    if (!isShow) return null
    return (
        <>
            {children}
        </>
    )
}