"use client";

import { Button, Layout, Radio, theme } from "antd";
import Link from "next/link";
import { trainingModules } from "../api/Fields/fields";
import ViewDetails from "../components/layout/popover";
const { Header, Content, Footer } = Layout;

const App = () => {
  const links = [
    { name: "Dashboard", href: "/" },
    { name: "Functionnalities", href: "/" },
    { name: "Prices", href: "/" },
    { name: "About", href: "/" },
  ];
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


function handleChange(domains) {
  console.log(domains);
  
}

  return (
    <Layout className="min-h-screen ">
      <Header className="bg-black text-white flex items-center justify-between px-9">
        <h1 className="text-3xl text-white font-bold my-4">X-vice</h1>
        <nav className="md:flex gap-4 hidden">
          {links.map((link) => (
            <Link
              className="text-xl text-white font-semibold hover:text-white/30 grow "
              href={link.href}
              key={link.name}
            >
              {link.name}{" "}
            </Link>
          ))}
        </nav>
        <Button>Connexion</Button>
      </Header>
      <Content>
        <h1 className="text-2xl text-center mt-4">
          What domain do you want to learn ?
        </h1>
        <Radio.Group defaultValue='domain1' buttonStyle="solid" className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 text-center gap-5 lg:max-w-screen-xl md:max-w-screen-md max-w-sm  mx-auto mt-10">
          {trainingModules.map((module) => (
            <Radio.Button
            onChange={()=> handleChange(module.domain)}
            value={module.id}
              key={module.id}
              className=" text-md flex flex-col items-center gap-2 min-h-[220px] w-[300px] mx-4 my-4 justify-center rounded-lg "
            >
              <h1 className="text-2xl font-semibold">{module.domain} </h1>
              <p className="my-2">{module.description} </p>
              <ViewDetails domainId={module.id}/>
            </Radio.Button>
            
          ))}
        </Radio.Group>

      </Content>
      <Footer className="flex items-center justify-around gap-10 shadow-md shadow-black">
        <h1 className="text-3xl font-bold my-4">X-vice</h1>©
        {new Date().getFullYear()} Created by Regis KIKI
      </Footer>
    </Layout>
  );
};
export default App;
