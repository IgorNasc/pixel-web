import * as React from "react";

type Props = {
    title: string,
    description: string,
    children?: React.JSX.Element
}

export default function PageTitlesSection({ title, description, children }: Props) {
    return (
        <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <div className="flex items-center gap-2">
                {children}
            </div>
        </div>
    )
}