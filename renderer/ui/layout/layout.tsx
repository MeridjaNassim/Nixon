import { FC, ReactNode } from 'react'
import { Layout as Lyt} from 'antd';

const { Header, Footer, Sider, Content } = Lyt;
const Layout: FC = ({ children }: { children: ReactNode }) => {
    return (
    <Lyt>

        <Content>{children}</Content>
      
    </Lyt>
    )
}
export default Layout