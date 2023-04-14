type GamerLayoutProps = {
  children?: React.ReactNode
}

const GamerLayout = ({ children }: GamerLayoutProps) => {
  return <>
    <h1>Gamer layout</h1>
  {children}
  </>
}

export default GamerLayout
