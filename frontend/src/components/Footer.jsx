const Footer = ({compltedTaskCount = 0, activeTaskCount = 0}) => {
    return <>
        {compltedTaskCount + activeTaskCount > 0 && (
            <div className="text-center">
                <p className="text-sm text-muted-foreground">
                    {
                        compltedTaskCount > 0 && (
                            <>Tuyet voi! Ban da hoan thanh {compltedTaskCount} viec
                            {
                                activeTaskCount > 0 && `, con ${activeTaskCount} viec nua thoi. Co len!`
                            }
                            </>
                        )
                    }

                    {compltedTaskCount === 0 && activeTaskCount > 0 && (
                        <>Hay bat dau lam {activeTaskCount} nhiem vu nao!</>
                    )}
                </p>
            </div>
        )}
    </>;
}

export default Footer;