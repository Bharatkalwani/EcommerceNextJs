'use client'

import useResponsive from "@/hooks/mediaQuery";

type Props = {}

const page = (props: Props) => {
    const screen = useResponsive()
    return (
        <>
            {screen === "mobile" && <p>Mobile view</p>}
            {screen === "tablet" && <p>Tablet view</p>}
            {screen === "desktop" && <p>Desktop view</p>}
        </>
    )
};

export default page;