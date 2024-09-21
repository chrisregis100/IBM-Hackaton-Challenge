"use client";
import { Button, Modal } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { trainingModules } from "../../api/Fields/fields";

const ViewDetails = ({ domainId }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [details, setDetails] = useState([]);

  const showModal = (id) => {
    const domain = trainingModules.find((d) => d.id === id);
    setDetails([ domain]);
    console.log(details);
    
    setOpen(true);
    localStorage.setItem("domain", JSON.stringify(domain));
    console.log(domain);
  };

  const handleOk = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      setOpen(false);
      const domain = JSON.parse(localStorage.getItem("domain"));

      console.log(domain.id);
      const moduleName = domain.domain;
      console.log(moduleName);

      router.push("/choosefield/" + domain.id);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        className="bg-black hover:bg-white/30"
        onClick={() => showModal(domainId)}
      >
        View Modules
      </Button>
      <Modal
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Start Evaluation Test
          </Button>,
        ]}
      >
        {details.map((detail) => (
          <div key={detail.id}>
            <h1 className="text-xl text-center font-bold space-y-2 mb-2">
              {detail.domain}{" "}
            </h1>
            {detail.modules.map((module) => (
              <div className="text-center space-y-2" key={module.id}>
                <h1 className="text-lg font-semibold text-center">
                  {module.title}{" "}
                </h1>
                {module.content.map((content) => (
                  <div key={content}>{content} </div>
                ))}
              </div>
            ))}
           
          </div>
        ))}
      </Modal>
    </>
  );
};

export default ViewDetails;
